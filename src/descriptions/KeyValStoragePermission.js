class KeyValStoragePermission extends Root {

	constructor(name) {
		super(name)

		this.storage = window[name]
		this.state = this.storage.length ? 'granted' : (x=>{
			try {
				this.storage.x = 1
				this.storage.removeItem('x')
				return 'granted'
			} catch(e) {
				return 'denied'
			}
		})()
	}

	query(resolve, reject){
		let i = this.storage.length
		let used = 0
		while(i--){
			let key = this.storage.key(i)
			used += key.length + this.storage.getItem(key).length
		}

		resolve({
			state: this.state,
			used: used * 2,
			granted: 'unknown'
		})
	}
}

new KeyValStoragePermission('localStorage')
new KeyValStoragePermission('sessionStorage')



// var bytes =  "0".repeat(10000000);
// var i = 0
// var added = 0
//
// while(bytes.length > 1 && i < 100){
// 	i++
// 	try{
// 		localStorage[String.fromCharCode(i)] = bytes
// 		added += bytes.length+1
// 	} catch(e) {
// 		bytes = bytes.substr(bytes.length - bytes.length / 10)
// 	}
// }
// console.log(added)
