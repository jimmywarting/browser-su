function getCookies(){
	const str = document.cookie
	const cookies = {}

	if(!str) return cookies

	for (let pair of str.split(";")){
		let cookie = pair.split("=")
		cookies[cookie[0]] = unescape(cookie[1])
	}

	return cookies
}

new class CookiePermission extends Root {

	constructor() {
		super('cookie')
	}

	query(resolve, reject, opts) {

		let enabled = navigator.cookieEnabled

		if(opts.thirdParty && enabled) {
			function receiveMessage(evt) {
				if (evt.data === 'EnabledthirdParty::false' || evt.data === 'EnabledthirdParty::true') {
					let state = ~evt.data.indexOf('true') ? 'enable' : 'denied'
					let permission = new PermissionStatus(state)

					iframe.remove()
					resolve(permission)
				}
			}

			let iframe = document.createElement('iframe')
			iframe.src = 'https://jimmywarting.github.io/browser-su/start'
			iframe.hidden = true
			window.addEventListener("message", receiveMessage, false)
			document.body.appendChild(iframe)
		} else {
			let state = enabled ? 'enable' : 'denied'
			let permission = new PermissionStatus(state)

			resolve(permission)
		}

	}

	request(resolve, reject) {
		navigator.cookieEnabled
		? resolve(getCookies())
		: this.denied(reject)
	}
}
