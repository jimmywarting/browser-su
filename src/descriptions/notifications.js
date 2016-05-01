new class NotificationPermission extends Root {

	constructor() {
		super('notifications')
	}

	request(resolve, reject) {
		const cb = state => ({
			default: () => this.dissmissed(reject),
			denied: () => this.denied(reject),
			granted: () => resolve()
		})[state]()

		const req = Notification.requestPermission(cb)
		req.then && req.then(cb)
	}
}
