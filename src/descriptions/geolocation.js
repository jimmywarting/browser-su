new class GeolocationPermission extends Root {

	constructor() {
		super('geolocation')

		this.enableHighAccurary = false
		this.state = 'unknown'
	}

	request(resolve, reject, opts) {
		silence
		fetch('http://freegeoip.net/json/')
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


		// in chrome when you dissmissed the dialog it throws denied error
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
						.then(PermissionStatus => {
							iframe.remove(resolve(success))
							({ /* Swich */
								prompt: () => (this.state = 'temporary disabled', this.dissmissed(reject)),
								denied: () => (this.state = 'denied', this.denied(reject))
							})[PermissionStatus.state]()
						})
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
				this.query().then(PermissionStatus => {
					this.state = PermissionStatus.state == 'prompt'
						? 'temporary disabled'
						: 'denied'

					if(PermissionStatus.state == 'prompt')
						return this.dissmissed(reject)
					this.request(resolve, reject, opts)
				})
			}
		})
	}
}
