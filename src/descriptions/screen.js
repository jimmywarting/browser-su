new class Screen extends Root {

	constructor() {
        super('screen')

		this.URL = 'https://addons.mozilla.org/firefox/downloads/file/434253/enable_screen_capturing_in_firefox-1.1.001-fx.xpi'

		if(insecure) {
			this.warn('getUserMedia')
			this.query = () => new PermissionStatus('denied')
			this.request = (r, reject) => reject(new PermissionError('insecure', 'Only works on https'))
		} else {
			this.query = isFF ? this.ffQuery : this.chromeQuery
			this.request = isFF ? this.ffRequest : this.chromeRequest
		}
	}

	isInstalled(){
		return this.installed || (this.installed = new Promise(resolve => {
			var image = document.createElement('img');
			image.src = 'chrome-extension://ajhifddimkapgcifgcodmmfdlknahffk/icon.png';
			image.onload = () => resolve(1)
			image.onerror = () => resolve(0)
		}))
	}

	/*******************************************
	 *                  Chrome                 *
	 *******************************************/

	chromeQuery(resolve, reject, opts) {
		// TODO
		resolve(new PermissionStatus('unknown'))
	}

	chromeRequest(resolve, reject, opts){
		let iframe = document.createElement('iframe')
		iframe.onload = () => {
			once(window, 'message', evt => {
				iframe.remove()
				su.request({
					name: 'userMedia',
					video: {
						mandatory: {
							chromeMediaSource: 'desktop',
							maxWidth: screen.width > 1920 ? screen.width : 1920,
							maxHeight: screen.height > 1080 ? screen.height : 1080,
							chromeMediaSourceId: evt.data.chromeMediaSourceId
						}
					}
				}).then(resolve, reject)
			})
			iframe.contentWindow.postMessage({ captureSourceId: true }, '*')
		}
		iframe.src = 'https://www.webrtc-experiment.com/getSourceId/'
		iframe.hidden = true
		document.body.appendChild(iframe)
	}


	/*******************************************
	 *                 firefox                 *
	 *******************************************/

	ffQuery(resolve, reject, opts) {
		// isInstalled.then()

		// ask addon to check if screen capturing enabled for specific domains
		window.postMessage({
			checkIfScreenCapturingEnabled: true,
			domains: [location.host]
		}, "*");
		let t
		let listener = evt => {
			let msg = evt.data
			if(evt.origin != location.origin || !msg || msg.isScreenCapturingEnabled === undefined)
			return
			removeEventListener('message', listener, false)
			this.installed = true
			clearTimeout(t)
			let state = msg.domains.length == 1 && msg.domains[0] == location.host && msg.isScreenCapturingEnabled
			resolve(new PermissionStatus(state ? 'granted' : 'prompt'))
		}
		// watch addon's response
		// addon will return "isScreenCapturingEnabled=true|false"
		addEventListener('message', listener)
		t = setTimeout(() => {
			removeEventListener('message', listener, false)
			resolve(new PermissionStatus('prompt'))
			this.installed = this.installed || false
		}, 2000)
	}

	ffRequest(resolve, reject, opts) {
		// Querying first is the best thing when not installed
		// The confirm dialog will halt the executeion and interfear with
		// the timeout
		su.query({name: 'screen'}).then(permission => {
			if(permission.state == 'granted') {

				// Granted, so don't ask for a new permission.
				// Best thing would be if the addon could check it already
				// has been granted before showing a comfirm... but it dosen't
				su.request({name: 'userMedia', video: {
					mozMediaSource: 'window',
					mediaSource: 'window'
				}}).then(resolve, () => this.dismissed(reject))

			} else if(this.installed) {
				// The addon is installed! woho!
				postMessage({
					enableScreenCapturing: true,
					domains: [location.host]
				}, "*")

				let listener = evt => {
					let msg = evt.data

					if(evt.origin != location.origin || !msg || msg.enabledScreenCapturing === undefined)
						return

					// The addon don't deal with denile only dissmiss
					if(msg.reason == 'user-rejected'){
						this.dismissed(reject)
					}

					removeEventListener('message', listener, false)
				}
				// watch addon's response
				// addon will return "enabledScreenCapturing=true" for success
				// else "enabledScreenCapturing=false" for failure (i.e. user rejection)
				addEventListener("message", listener, false);
			} else {
				// Buu! not installed :(
				InstallTrigger.install({
					'Foo': {
						// URL: 'https://addons.mozilla.org/en-US/firefox/addon/enable-screen-capturing/',
						URL: this.URL,
						toString: () => this.URL
					}
				})
				console.warn("Need to reopen the window after it has been installed, not just refresh")
				// Could maybe use a new iframe instead?
			}
		})
	}

}
