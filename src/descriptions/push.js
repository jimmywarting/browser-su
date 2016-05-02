new class PushPermission extends Root {

	constructor() {
		super('push')
	}

	request(resolve, reject, opts){
		navigator.serviceWorker.getRegistrations().then(workers => {
			if(!workers.length)
				throw new PermissionError('Missing', 'Push requires at least one service worker to be running')

			navigator.serviceWorker.ready.then( serviceWorkerRegistration =>
				serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
				.then( subscription => {
					const key = subscription.getKey && subscription.getKey('p256dh')
					const auth = subscription.getKey && subscription.getKey('auth')

					resolve({
						endpoint: subscription.endpoint,
						key: key || new ArrayBuffer(),
						auth: auth || new ArrayBuffer()
					})
				})
			)
		})
	}
}
