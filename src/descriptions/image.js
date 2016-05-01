new class ImagePermission extends Root {

	constructor() {
		super('image')

		this.state = 'unknown'
	}

	query(resolve, reject) {
		if(this.state == 'granted')
			return resolve(new PermissionStatus('granted'))

		if(this.state == 'denied')
			return resolve(new PermissionStatus('granted'))

		this.request(granted => {
			resolve(new PermissionStatus('granted'))
		}, rejected => {
			resolve(new PermissionStatus('denied'))
		})
	}

	request(resolve, reject) {
		if(this.state == 'granted')
			return resolve()

		if(this.state == 'denied')
			return this.denied(reject)

		let buffer = new Uint8Array([71,73,70,56,57,97,1,0,1,0,128,0,0,0,0,0,255,255,255,33,249,4,1,0,0,0,0,44,0,0,0,0,1,0,1,0,0,2,1,68,0,59])
		let blob = new Blob([buffer], {type: 'image/gif'})
		let img = new Image
		img.onload = () => {resolve(); this.state = 'granted'}
		img.onerror = () => {this.denied(reject); this.state = 'denied'}
		// img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
		img.src = URL.createObjectURL(blob)
		document.body.appendChild(img)
		img.remove()
		setTimeout(() => this.denied(reject), 500)
	}
}
