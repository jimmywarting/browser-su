new class BackgroundSyncPermission extends Root {

	constructor() {
		super('backgroundSync')
	}

	request(resolve, reject, opts){
		// navigator.serviceWorker.getRegistrations().then(workers => {
		// 	if(!workers.length) {
		// 		throw new DOMError('PermissionDeniedError', 'Background sync requires at least one service worker to be running')
		// 	}
		// 	navigator.serviceWorker.ready.then( serviceWorkerRegistration =>
		// 		serviceWorkerRegistration.sync.register('myFirstSync');
		// 		.then( subscription => {
		// 			const key = subscription.getKey && subscription.getKey('p256dh')
		// 			const auth = subscription.getKey && subscription.getKey('auth')
		//
		// 			resolve({
		// 				endpoint: subscription.endpoint,
		// 				key: key || new ArrayBuffer(),
		// 				auth: auth || new ArrayBuffer()
		// 			})
		// 		})
		// 	)
		// })
	}
}
