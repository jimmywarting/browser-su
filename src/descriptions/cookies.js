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
		? resolve(document.cookie)
		: this.denied(reject)
	}
}
