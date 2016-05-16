// Chrome is the only one with PermissionDismissedError on error callback on
// getUserMedia this is where i got the idea of dismiss/denied wish is two
// diffrent things. A dismiss means the user closed the permission but didn't
// denied access. That means that you are able to ask for permission again while
// a denied is more persistent and can't be asked again

new class UserMedia extends Root {

	constructor() {
        super('userMedia')

		if(insecure)
			this.warn('getUserMedia')

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
		// Don't work property find a better way!
		// if(isFF) // Firefox door hanger is bad...
			// once(window, 'focus click', () => this.dismissed(reject))

        if(navigator.mediaDevices.getUserMedia)
            navigator.mediaDevices.getUserMedia(opts).then(resolve, reject)
        else
            this.getUserMedia(opts, resolve, reject)
	}
}
