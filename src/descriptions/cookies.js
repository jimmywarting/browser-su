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

	query(resolve, reject) {
		let state = navigator.cookieEnabled ? 'enable' : 'denied'
		let permission = new PermissionStatus(state)
		return Promise.resolve(permission)
	}

	request(resolve, reject) {
		navigator.cookieEnabled
		? resolve(getCookies())
		: this.denied(reject)
	}
}
