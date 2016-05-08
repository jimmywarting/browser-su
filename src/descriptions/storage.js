const store = storage => {
	return navigator[storage == 'persistent'
		? 'webkitPersistentStorage'
		: 'webkitTemporaryStorage']
}

new class StoragePermission extends Root {

	constructor() {
		super('fs')
		this.supported = navigator.webkitPersistentStorage
	}

	query(resolve, reject, opts){
		if(opts.storage === undefined)
			throw new TypeError(`Failed to execute the 'query' property from 'su': required member storage is undefined.`)

		if(!/^(persistent|temporary)$/.test(opts.storage))
			throw new TypeError(`Failed to execute the 'query' property from 'su': The provided value '${opts.storage}' is not a valid enum storage.`)

		store(opts.storage).queryUsageAndQuota((used, granted) => {
			var status = new PermissionStatus(granted >= ~~opts.quota ? 'granted' : 'prompt')
			status.used = used
			status.granted = granted
			webkitRequestFileSystem(opts.storage == 'persistent', 0, fs => {
				status.root = fs
				resolve(status)
			}, e => {
				status.state = 'denied'
				resolve(status)
			})
		})
	}

	request(resolve, reject, opts) {
		store(opts.storage).requestQuota(opts.quota, () => {
			this.query(permission => {
				resolve({
					used: permission.used,
					granted: permission.granted,
					root: permission.root
				})
			}, this.denied, opts)
		}, reject)
	}
}
