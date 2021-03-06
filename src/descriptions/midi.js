new class MidiPermission extends Root {

	constructor() {
		super('midi')

		this.supported = navigator.requestMIDIAccess
	}

	request(resolve, reject, opts) {
		navigator.requestMIDIAccess(opts).then(resolve, err =>
		this.query(PermissionStatus =>

		PermissionStatus.state == 'prompt'
		? this.dismissed(reject)
		: this.denied(reject), undefined, opts))
	}
}
