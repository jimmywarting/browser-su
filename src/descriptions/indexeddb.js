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

		var request = indexedDB.open("myDatabase", { version: 1, storage: "persistent" })
		let db = indexedDB.open(opts.name)
		db.onerror = () => resolve(true)
		db.onsuccess = () => resolve(false)
	}

	request(resolve, reject, opts) {
		let db = indexedDB.open(opts.database, opts)
		db.onerror = () => resolve(true)
		db.onsuccess = () => resolve(false)
	}
}
