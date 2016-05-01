new class StoragePermission extends Root {

	constructor() {
		super('storage')
	}

	query(resolve, reject, opts){
		if(opts.type === undefined)
			throw new TypeError(`Failed to execute the 'query' property from 'Permissions': required member type is undefined.`)

		if(!/^(persistent|temporary)$/.test(opts.type))
			throw new TypeError(`Failed to execute the 'query' property from 'Permissions': The provided value '${opts.type}' is not a valid enum type.`)

		let storage = opts.type == 'persistent'
			? 'webkitPersistentStorage'
			: 'webkitTemporaryStorage'

		navigator[storage].queryUsageAndQuota((usedBytes, grantedBytes) =>
			resolve({
				state: grantedBytes ? "granted" : "prompt",
				used: usedBytes,
				granted: grantedBytes
			})
		)
	}

	request(resolve, reject, opts) {
		grantedBytes = navigator.webkitPersistentStorage.requestQuota(opts.quota, grantedBytes => {
			console.log(grantedBytes, f)
		});
	}
}
