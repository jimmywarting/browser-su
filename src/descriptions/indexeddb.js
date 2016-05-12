new class IndexDB extends Root {

	constructor() {
		super('indexedDB')

		if(!window.indexedDB) {
			// ie10+ and Edge supports indexedDB
			// but are removed in private mode, in that
			// case we should set this to be supported
			// but the state should be denied.

			// ie10+ and edge is the only one that has, pointer event
			// and the indexedDB removed at the same time
			if( window.PointerEvent || window.MSPointerEvent ) {
				this.state = 'denied'
			} else {
				this.supported = false
			}
		}
	}

	query(resolve, reject, opts) {
		// Firefox supports temporary, persistent and default...
		// it behaves as persistent storage for installed Firefox OS apps,
		// and temporary storage for any other type of use.
		// http://mzl.la/1s1FJvU

		if(!navigator.cookieEnabled || this.state == 'denied')
			return resolve(new PermissionStatus('denied'))

		if (opts.storage) {
			try {
				indexedDB.open('su:x', {storage: 'temporary'})
				resolve(new PermissionStatus(opts.storage === 'persistent' ? 'prompt' : 'granted'))
			} catch (err) {
				reject(new PermissionError('Unsupported', 'This client dose not seem be able to select storage type'))
			}
		} else {
			let db = indexedDB.open('su:x')
			db.onerror = err => resolve(new PermissionStatus('denied'))
			db.onsuccess = () => resolve(new PermissionStatus('granted'))
		}

	}

	request(resolve, reject, opts) {
		var db = indexedDB.open(opts.database, opts.storage ? opts : opts.version)
		db.onerror = err => reject(err)
		db.onsuccess = () => resolve(db.result)
	}
}
