new class ModalPermission extends Root {

	constructor() {
		super('modal')

		this.state = 'granted'
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
