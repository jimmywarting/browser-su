new class FullScreenPermission extends Root {

	constructor() {
		super('fullscreen')

		this.supported = false

		var apis = {
			// http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
			w3: {
				enabled: 'fullscreenEnabled',
				element: 'fullscreenElement',
				request: 'requestFullscreen',
				exit:    'exitFullscreen',
				events: {
					change: 'fullscreenchange',
					error:  'fullscreenerror'
				}
			},
			webkit: {
				enabled: 'webkitFullscreenEnabled',
				element: 'webkitCurrentFullScreenElement',
				request: 'webkitRequestFullscreen',
				exit:    'webkitExitFullscreen',
				events: {
					change: 'webkitfullscreenchange',
					error:  'webkitfullscreenerror'
				}
			},
			moz: {
				enabled: 'mozFullScreenEnabled',
				element: 'mozFullScreenElement',
				request: 'mozRequestFullScreen',
				exit:    'mozCancelFullScreen',
				events: {
					change: 'mozfullscreenchange',
					error:  'mozfullscreenerror'
				}
			},
			ms: {
				enabled: 'msFullscreenEnabled',
				element: 'msFullscreenElement',
				request: 'msRequestFullscreen',
				exit:    'msExitFullscreen',
				events: {
					change: 'MSFullscreenChange',
					error:  'MSFullscreenError'
				}
			}
		},
		w3 = apis.w3;


		// Loop through each vendor's specific API
		for (let vendor in apis) {
			// Check if document has the "enabled" property
			if (apis[vendor].enabled in document) {
				// It seems this browser support the fullscreen API
				this.api = apis[vendor];
				this.supported = true
				break;
			}
		}
	}

	query() {

	}

	request(resolve, reject, opts) {
		if(!this.supported) this.unsupported()

		if('event' in window && (!event || !event.isTrusted))
			throw new Error("Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.")

		let events = this.api.events

		if(this.state === 'denied')
			throw this.denied(reject)

        once(document, events.change + ' ' + events.error, evt => {
			if(evt.type === events.change) resolve()
			if(evt.type === events.error) this.dissmissed(reject)
		})

		opts.element[this.api.request]()
	}

	get state() {
		return document[this.api.enabled] ? 'unknown' : 'denied'
	}
}
