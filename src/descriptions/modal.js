new class ModalPermission extends Root {

	constructor() {
		super('modal')

		this.state = 'granted'

		// Detect if modals is disabled by sandbox attribute
		let sandbox = (frameElement || {}).sandbox || []
		if(sandbox.length && !frameElement.sandbox.contains('allow-modals'))
			this.state = 'disabled'
	}

	query(resolve){
		resolve(new PermissionStatus(this.state))
	}

	request(resolve, reject, opts){
		let {modal, body, value} = opts
		let immediately = now()
		let result = window[modal](body, value)

		if (now() - immediately < 5 && !result && result !== ''){
			this.state = 'denied'
			return this.denied(reject)
		}

		this.state = 'granted'

		if(result === null)
			return this.dismissed(reject)

		resolve(result)

	}
}
