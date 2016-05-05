// Safari's push is works very differently from the w3 standard
// Otherwice it would have been merged with push and have opts for pushId & Service URL
new class PushSafariPermission extends Root {

	constructor() {
		super('push-safari')
		this.supported = ((window.safari || {}).pushNotification || {}).permission

	}

	static str2ab(str) {
		let buf = new ArrayBuffer(str.length*2) // 2 bytes for each char
		let bufView = new Uint16Array(buf)

		for (let i in str)
			bufView[i] = str.charCodeAt(i);

		return buf;
	}

	query(resolve, reject, opts) {
		let state = window.safari.pushNotification.permission(opts.pushId)
		let permission = new PermissionStatus(state.permission)

		permission.endpoint = 'gateway.push.apple.com:2195'
		permission.key = PushSafariPermission.str2ab(permission.deviceToken)

		resolve(permission)
	}

	// You can never dissmiss the dialog in safari, pressing esc denies
	// and there is no dissmiss button or click outside
	request(resolve, reject, opts) {
		window.safari.pushNotification.requestPermission(
			opts.serviceUrl,
			opts.pushId,
			opts.data || {},
			permissionData => this.query(resolve, () => this.denied(reject), opts)
		)
	}
}
