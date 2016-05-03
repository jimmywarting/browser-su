/**
 * [description]
 *
 * @since 0.1.0
 */
new class GeolocationPermission extends Root {

	constructor() {
		super('geolocation')

		this.enableHighAccurary = false
		this.state = 'unknown'

		if(!navigator.permissions)
			this.query = resolve => resolve(new PermissionStatus(this.state))
	}

	request(resolve, reject, opts) {
		/*
		Some fallback/silence method that can be used
		that I'm looking into

		fetch('https://freegeoip.net/json')
		.then(res => res.json())
		.then(json => console.log(json))

		iframe = document.createElement('iframe')
		script = document.createElement('script')
		script.src = 'https://www.google.com/jsapi'
		script.onload = () => console.log(iframe.contentWindow.google.loader.ClientLocation), iframe.remove()
		iframe.hidden = true
		iframe.onload = () => iframe.contentDocument.body.appendChild(script)
		document.body.appendChild(iframe)

		fetch('https://ipinfo.io', {headers: {Accept: 'application/json'}})
		.then(res => res.json())
		.then(json => console.log(json))
		*/

		// in chrome when you dismissed the dialog it throws denied error
		// but the fact is that you can still request a new permission if
		// you just reload the page, a workaround is to create a new iframe
		// and ask from that window
		if(this.state === 'temporary disabled'){
			let iframe = document.createElement('iframe')
			iframe.hidden = true
			iframe.onload = () => {
				let nav = iframe.contentWindow.navigator
				nav.geolocation.getCurrentPosition(
					success => iframe.remove(resolve(success)),
					error => {
						nav.permissions.query({name: 'geolocation'})
						.then(PermissionStatus =>
							iframe.remove({ /* Swich */
								prompt: () => (this.state = 'temporary disabled', this.dismissed(reject)),
								denied: () => (this.state = 'denied', this.denied(reject))
							}[PermissionStatus.state]())
						)
					}
				)
			}
      		return document.body.appendChild(iframe)
		}

		if(this.state === 'denied'){
			return this.denied(reject)
		}

		navigator.geolocation.getCurrentPosition(resolve, err => {
			if(err.code == 1 && window.chrome && window.chrome.webstore){
				this.query(PermissionStatus => {
					this.state = PermissionStatus.state == 'prompt'
						? 'temporary disabled'
						: 'denied'

					if(PermissionStatus.state == 'prompt')
						return this.dismissed(reject)
					this.request(resolve, reject, opts)
				})
			}
			({ /* Swich */
				2: () => (this.state = 'granted', reject(new PermissionError('Unavailable', 'Possition is unavailable'))),
				3: () => (this.state = 'granted', reject(new PermissionError('Timeout', 'Timeout expired')))
			})[PermissionStatus.state]()
		}, opts)
	}
}
