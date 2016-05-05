const store = type => {
	return navigator[type == 'persistent'
		? 'webkitPersistentStorage'
		: 'webkitTemporaryStorage']
}

new class StoragePermission extends Root {

	constructor() {
		super('storage')
		this.supported = navigator.webkitPersistentStorage
	}

	query(resolve, reject, opts){
		if(opts.type === undefined)
			throw new TypeError(`Failed to execute the 'query' property from 'su': required member type is undefined.`)

		if(!/^(persistent|temporary)$/.test(opts.type))
			throw new TypeError(`Failed to execute the 'query' property from 'su': The provided value '${opts.type}' is not a valid enum type.`)

		store(opts.type).queryUsageAndQuota((usedBytes, grantedBytes) => {
			var status = new PermissionStatus(grantedBytes >= ~~opts.quota ? 'granted' : 'prompt')
			status.used = usedBytes
			status.granted = grantedBytes
			webkitRequestFileSystem(opts.type == 'persistent', 0, fs => {
				status.root = fs
				resolve(status)
			}, e => {
				status.state = 'denied'
				resolve(status)
			})
		})
	}

	request(resolve, reject, opts) {
		grantedBytes = store(opts.type).requestQuota(opts.quota, grantedBytes => {
			webkitRequestFileSystem(opts.type == 'persistent', opts.quota || 0, (e)=>{console.log(e)}, (e)=>{console.log(e)})
			console.log(grantedBytes, f)
		});
	}
}
