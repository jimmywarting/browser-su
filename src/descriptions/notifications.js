new class NotificationPermission extends Root {

	constructor() {
		super('notifications')

		if(!navigator.permissions)
			this.query = resolve => resolve(new PermissionStatus(Notification.permission))
	}

	request(resolve, reject) {
		const cb = state => ({
			default: () => this.dismissed(reject),
			denied: () => this.denied(reject),
			granted: () => resolve()
		})[state]()

		const req = Notification.requestPermission(cb)
		req.then && req.then(cb)
	}
}
