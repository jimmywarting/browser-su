new class PushPermission extends Root {

	constructor() {
		super('push')

		if(!(this.supported = 'PushManager' in window)) return

		// Could we do better? like checking if we have a subscription...?
		// It would not work without ssl, so we could disabled it then
		// chrome in jsfiddle reports denied while firefox reports unknown
		if(!navigator.permissions)
			this.query = resolve => resolve(new PermissionStatus(
				location.protocol == 'https:' ||
				document.location.hostname == "localhost"
					? 'unknown'
					: 'denied'
			))
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
