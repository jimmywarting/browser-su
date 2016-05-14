"use strict"

const iframed = !window.opener && !!(window.top && window != window.top || window.parent && window != window.parent);
const now = window.performance && performance.now || Date.now || (C => +new Date)
const PermissionName = {}
const isFF = "MozAppearance" in document.documentElement.style
const isSafari = /constructor/i.test(window.HTMLElement)
const isBlink = !!window.webkitRequestFileSystem
const insecure = location.protocol == 'http:' && location.hostname != 'localhost'

// create a one-time event
const once = (node, types, callback) => {
	var map = types.split(' ').map( name => {
		let cb = evt => {
			for(let x of map) node.removeEventListener(x[1], x[0])
			// call handler
			callback(evt)
		}
		node.addEventListener(name, cb, false)
		return [cb, name]
	})
}

/* Could be useful to check...
new Promise(resolve => {
	let db,
	on = () => resolve(true),
	off = () => resolve(false),
    tryls = () => {
        try {
            localStorage.length ? off() : (localStorage.x = 1, localStorage.removeItem("x"), off())
        } catch (e) {
			// Safari only enables cookie in private mode
			// if cookie is disabled then all client side storage is disabled
			// if all client side storage is disabled, then there is no point
			// in using private mode
            navigator.cookieEnabled ? on() : off()
        }
    }

    isBlink ?
		webkitRequestFileSystem(0, 0, off, on)
	: isFF ?
		(db = indexedDB.open("test"), db.onerror = on, db.onsuccess = off)
	: isSafari ?
		tryls()
	: !window.indexedDB && (window.PointerEvent || window.MSPointerEvent) ?
		on()
	: off()
}).then(isPrivateMode => {
    console.log(isPrivateMode)
})
*/


class PermissionError extends Error {
	constructor(name, msg) {
		super(msg)
		this.name = 'Request' + name + 'Error'
	}
}

class Root {
	constructor(name){
		this.name = name
		PermissionName[name] = this
	}

	query(resolve, reject, opts) {
		return navigator.permissions.query(opts || {name:this.name}).then(resolve, reject)
	}

	dismissed(reject){
		reject(new PermissionError('Dismissed', 'User dismissed access to ' + this.name))
	}

	denied(reject){
		reject(new PermissionError('Denied', 'User blocked access to ' + this.name))
	}

	set supported(isSupported) {
		!isSupported && (this.query = this.request = () => {
			throw new PermissionError('Unsupported', 'This client dose not seem to have ' + this.name + ' support')
		})
	}

	warn(what){
		let query = this.query
		let request = this.request

		this.query = (...args) => {
			console.warn(what + ' are deprecated on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.')
			this.query = query
			this.request = request
			query.apply(this, args)
		}

		this.request = (...args) => {
			console.warn(what + ' are deprecated on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See https://goo.gl/rStTGz for more details.')
			this.request = request
			this.query = query
			request.apply(this, args)
		}
	}


}

class PermissionStatus {
	constructor(state){
		var eventTarget = document.createDocumentFragment();

		['addEventListener', 'dispatchEvent', 'removeEventListener']
		.forEach(method =>
			Object.defineProperty(this, method, { value: eventTarget[method] } )
		)

		// convert default to prompt
		this.state = state !== 'default' && state || 'prompt'
		this.onchange = null
	}
}

function validate(args, o){
	o = args[0]

	if(!(0 in args))
		throw new TypeError(`Failed to execute 'query' on 'Permissions': 1 argument required, but only 0 present.`)

	if(typeof o !== 'object')
		throw new TypeError(`Failed to execute 'query' on 'Permissions': parameter 1 ('permission') is not an object.`)

	if(o.name === undefined)
		throw new TypeError(`Failed to read the 'query' property from 'Permissions': required member name is undefined.`)

	if(!PermissionName[o.name])
		throw new TypeError(`Failed to read the 'query' property from 'Permissions': The provided value '${args[0]}' is not a valid enum value of type PermissionName.`)
}

const permissions = {
	query: (...opts) => new Promise((resolve, reject) => {
		validate(opts)
		opts = opts[0]
    	PermissionName[opts.name].query(resolve, reject, opts)
	}),
	request: (...opts) => new Promise((resolve, reject) => {
		validate(opts)
		opts = opts[0]
    	PermissionName[opts.name].request(resolve, reject, opts)
	}),
	revoke: (...opts) => new Promise((resolve, reject) => {
		validate(opts)
		// We have yet no access to revoke any permission for the user
		// But we could tell them how to do it or make a "soft-lock"
	})
}

window.su = permissions
