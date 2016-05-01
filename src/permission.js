"use strict"

// create a one-time event
function once(node, types, callback) {
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

const iframed = !window.opener && !!(window.top && window != window.top || window.parent && window != window.parent);
const now = window.performance && performance.now || Date.now || (C => +new Date)
const PermissionName = {}
class PermissionError extends Error {
	constructor(name, msg) {
		super(msg)
		this.name = name
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

	dissmissed(reject){
		reject(new PermissionError('DismissedError', 'User dissmissed access to ' + this.name))
	}

	denied(reject){
		reject(new PermissionError('DeniedError', 'User blocked access to ' + this.name))
	}

	unsupported(){
		throw new PermissionError('UnsupportedError', 'This client dose not seem to have ' + this.name + ' support')
	}
}

class PermissionStatus {
	constructor(state){
		this.state = state || 'prompt'
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
