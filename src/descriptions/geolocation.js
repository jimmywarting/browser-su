/**
 * [description]
 *
 * @since 0.1.0
 */
new class GeolocationPermission extends Root {

	constructor() {
		super('geolocation')

		if(insecure)
			this.warn('getCurrentPosition() and watchPosition()')

		this.enableHighAccurary = false
		this.state = 'unknown'
		this.supported = navigator.geolocation

		if(!navigator.permissions)
			this.query = resolve => resolve(new PermissionStatus(this.state))
	}

	request(resolve, reject, opts) {

		/*
		fallback/silence method that can be used that I'm looking into
		think this is more accurate then freegeoip or any other geoIP service

		fetch("https://www.googleapis.com/geolocation/v1/geolocate?key=%GOOGLE-API-KEY%", {
			method: 'POST'
		})
		.then(res => res.json())
		.then(e=>console.log(e))
		*/

		// in chrome when you dismissed the dialog it throws denied error
		// but the fact is that you can still request a new permission if
		// you just reload the page, a workaround is to create a new iframe
		// and ask from that window
		//
		// other browsers (like safari) behaves the same so this could be used
		// But we have no way of distinguish dissmiss from denied
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

		if(isFF) // Firefox door hanger is bad...
			once(window, 'focus click', () => this.dismissed(reject))

		navigator.geolocation.getCurrentPosition(resolve, err => {
			if(err.code == 1 && navigator.permissions){
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
				1: () => (this.state = 'denied', this.denied(reject)),
				2: () => (this.state = 'granted', reject(new PermissionError('Unavailable', 'Possition is unavailable'))),
				3: () => (this.state = 'granted', reject(new PermissionError('Timeout', 'Timeout expired')))
			})[PermissionStatus.state]()
		}, opts)
	}
}
