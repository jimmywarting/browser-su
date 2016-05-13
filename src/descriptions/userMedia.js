new class UserMedia extends Root {

	constructor() {
        super('user-media')

        if(!navigator.mediaDevices.getUserMedia) {
            this.supported = this.getUserMedia = (navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia).bind(navigator)
        }
	}

	query(resolve, reject, opts) {
        // TODO: can we figure out some stuff like already granted?
        resolve(new PermissionStatus('unknown'))
	}

	request(resolve, reject, opts) {
        if(navigator.mediaDevices.getUserMedia)
            navigator.mediaDevices.getUserMedia(opts).then(resolve, reject)
        else
            this.getUserMedia(opts, resolve, reject)
	}
}
