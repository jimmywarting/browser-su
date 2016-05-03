new class StoragePermission extends Root {

	constructor() {
		super('storage')

		if(!navigator.webkitPersistentStorage)
			this.query = resolve => resolve(new PermissionStatus('unsupported'))
	}

	query(resolve, reject, opts){
		if(opts.type === undefined)
			throw new TypeError(`Failed to execute the 'query' property from 'su': required member type is undefined.`)

		if(!/^(persistent|temporary)$/.test(opts.type))
			throw new TypeError(`Failed to execute the 'query' property from 'su': The provided value '${opts.type}' is not a valid enum type.`)

		StoragePermission.store(opts.type).queryUsageAndQuota((usedBytes, grantedBytes) => {
			var status = new PermissionStatus(grantedBytes >= opts.quota ? 'granted' : 'prompt')
			status.used = usedBytes
			status.granted = grantedBytes
			resolve(status)
		})
	}

	request(resolve, reject, opts) {
		grantedBytes = StoragePermission.store(opts.type).requestQuota(opts.quota, grantedBytes => {
			webkitRequestFileSystem(opts.type == 'persistent', (e)=>{console.log(e)}, (e)=>{console.log(e)})
			console.log(grantedBytes, f)
		});
	}

	static store(type) {
		return navigator[type == 'persistent'
			? 'webkitPersistentStorage'
			: 'webkitTemporaryStorage']
	}
}
