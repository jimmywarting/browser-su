!function(e){"use strict"
function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t,n){var r=t.split(" ").map(function(t){var o=function(t){var o=!0,i=!1,u=void 0
try{for(var s,a=r[Symbol.iterator]();!(o=(s=a.next()).done);o=!0){var c=s.value
e.removeEventListener(c[1],c[0])}}catch(l){i=!0,u=l}finally{try{!o&&a["return"]&&a["return"]()}finally{if(i)throw u}}n(t)}
return e.addEventListener(t,o,!1),[o,t]})}function i(e,t){if(t=e[0],!(0 in e))throw new TypeError("Failed to execute 'query' on 'Permissions': 1 argument required, but only 0 present.")
if("object"!==(void 0===t?"undefined":u(t)))throw new TypeError("Failed to execute 'query' on 'Permissions': parameter 1 ('permission') is not an object.")
if(void 0===t.name)throw new TypeError("Failed to read the 'query' property from 'Permissions': required member name is undefined.")
if(!c[t.name])throw new TypeError("Failed to read the 'query' property from 'Permissions': The provided value '"+e[0]+"' is not a valid enum value of type PermissionName.")}var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=(!e.opener&&!!(e.top&&e!=e.top||e.parent&&e!=e.parent),e.performance&&performance.now||Date.now||function(e){return+new Date}),c={},l=function(e){function o(e,r){t(this,o)
var i=n(this,Object.getPrototypeOf(o).call(this,r))
return i.name=e,i}return r(o,e),o}(Error),d=function(){function e(n){t(this,e),this.name=n,c[n]=this}return s(e,[{key:"query",value:function(e){return navigator.permissions.query(e||{name:this.name})}},{key:"dissmissed",value:function(e){e(new l("DismissedError","User dissmissed access to "+this.name))}},{key:"denied",value:function(e){e(new l("DeniedError","User blocked access to "+this.name))}},{key:"unsupported",value:function(){throw new l("UnsupportedError","This client dose not seem to have "+this.name+" support")}}]),e}(),h=function p(e){t(this,p),this.state=e||"prompt",this.onchange=null},m={query:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n]
return new Promise(function(e,n){i(t),t=t[0],c[t.name].query(e,n,t)})},request:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n]
return new Promise(function(e,n){i(t),t=t[0],c[t.name].request(e,n,t)})},revoke:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n]
return new Promise(function(e,n){i(t)})}}
e.su=m,new(function(e){function o(){return t(this,o),n(this,Object.getPrototypeOf(o).call(this,"BackgroundSync"))}return r(o,e),s(o,[{key:"request",value:function(e,t,n){}}]),o}(d))
var y=function(o){function i(r){t(this,i)
var o=n(this,Object.getPrototypeOf(i).call(this,r))
return o.storage=e[r],o.state=o.storage.length?"granted":function(e){try{return o.storage.x=1,o.storage.removeItem("x"),"granted"}catch(t){return"denied"}}(),o}return r(i,o),s(i,[{key:"query",value:function(e,t){for(var n=this.storage.length,r=0;n--;){var o=this.storage.key(n)
r+=o.length+this.storage.getItem(o).length}e({state:this.state,used:2*r,granted:"unknown"})}}]),i}(d)
new y("localStorage"),new y("sessionStorage"),new(function(e){function o(){return t(this,o),n(this,Object.getPrototypeOf(o).call(this,"cookie"))}return r(o,e),s(o,[{key:"query",value:function(e,t){var n=navigator.cookieEnabled?"enable":"denied",r=new h(n)
return Promise.resolve(r)}},{key:"request",value:function(e,t){navigator.cookieEnabled?e(document.cookie):this.denied(t)}}]),o}(d)),new(function(i){function u(){t(this,u)
var e=n(this,Object.getPrototypeOf(u).call(this,"fullscreen"))
e.supported=!1
var r={w3:{enabled:"fullscreenEnabled",element:"fullscreenElement",request:"requestFullscreen",exit:"exitFullscreen",events:{change:"fullscreenchange",error:"fullscreenerror"}},webkit:{enabled:"webkitFullscreenEnabled",element:"webkitCurrentFullScreenElement",request:"webkitRequestFullscreen",exit:"webkitExitFullscreen",events:{change:"webkitfullscreenchange",error:"webkitfullscreenerror"}},moz:{enabled:"mozFullScreenEnabled",element:"mozFullScreenElement",request:"mozRequestFullScreen",exit:"mozCancelFullScreen",events:{change:"mozfullscreenchange",error:"mozfullscreenerror"}},ms:{enabled:"msFullscreenEnabled",element:"msFullscreenElement",request:"msRequestFullscreen",exit:"msExitFullscreen",events:{change:"MSFullscreenChange",error:"MSFullscreenError"}}}
r.w3
for(var o in r)if(r[o].enabled in document){e.api=r[o],e.supported=!0
break}return e}return r(u,i),s(u,[{key:"query",value:function(){}},{key:"request",value:function(t,n,r){var i=this
if(this.supported||this.unsupported(),"event"in e&&(!event||!event.isTrusted))throw Error("Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.")
var u=this.api.events
if("denied"===this.state)throw this.denied(n)
o(document,u.change+" "+u.error,function(e){e.type===u.change&&t(),e.type===u.error&&i.dissmissed(n)}),r.element[this.api.request]()}},{key:"state",get:function(){return document[this.api.enabled]?"unknown":"denied"}}]),u}(d)),new(function(o){function i(){t(this,i)
var e=n(this,Object.getPrototypeOf(i).call(this,"geolocation"))
return e.enableHighAccurary=!1,e.state="unknown",e}return r(i,o),s(i,[{key:"request",value:function(t,n,r){var o=this
if("temporary disabled"===this.state){var i=function(){var e=document.createElement("iframe")
return e.hidden=!0,e.onload=function(){var r=e.contentWindow.navigator
r.geolocation.getCurrentPosition(function(n){return e.remove(t(n))},function(i){r.permissions.query({name:"geolocation"}).then(function(r){e.remove(t(success))({prompt:function(){return o.state="temporary disabled",o.dissmissed(n)},denied:function(){return o.state="denied",o.denied(n)}})[r.state]()})})},{v:document.body.appendChild(e)}}()
if("object"===(void 0===i?"undefined":u(i)))return i.v}return"denied"===this.state?this.denied(n):void navigator.geolocation.getCurrentPosition(t,function(i){1==i.code&&e.chrome&&e.chrome.webstore&&o.query().then(function(e){return o.state="prompt"==e.state?"temporary disabled":"denied","prompt"==e.state?o.dissmissed(n):void o.request(t,n,r)})})}}]),i}(d)),new(function(e){function o(){t(this,o)
var e=n(this,Object.getPrototypeOf(o).call(this,"image"))
return e.state="unknown",e}return r(o,e),s(o,[{key:"query",value:function(e,t){return"granted"==this.state?e(new h("granted")):"denied"==this.state?e(new h("granted")):void this.request(function(t){e(new h("granted"))},function(t){e(new h("denied"))})}},{key:"request",value:function(e,t){var n=this
if("granted"==this.state)return e()
if("denied"==this.state)return this.denied(t)
var r=new Uint8Array([71,73,70,56,57,97,1,0,1,0,128,0,0,0,0,0,255,255,255,33,249,4,1,0,0,0,0,44,0,0,0,0,1,0,1,0,0,2,1,68,0,59]),o=new Blob([r],{type:"image/gif"}),i=new Image
i.onload=function(){e(),n.state="granted"},i.onerror=function(){n.denied(t),n.state="denied"},i.src=URL.createObjectURL(o),document.body.appendChild(i),i.remove(),setTimeout(function(){return n.denied(t)},500)}}]),o}(d)),new(function(e){function o(){return t(this,o),n(this,Object.getPrototypeOf(o).call(this,"midi"))}return r(o,e),s(o,[{key:"request",value:function(e,t,n){var r=this
navigator.requestMIDIAccess(n).then(e,function(e){return r.query(n).then(function(e){return"prompt"==e.state?r.dissmissed(t):r.denied(t)})})}}]),o}(d)),new(function(o){function i(){t(this,i)
var e=n(this,Object.getPrototypeOf(i).call(this,"modal"))
return e.state="granted",e}return r(i,o),s(i,[{key:"query",value:function(){}},{key:"request",value:function(t,n,r){var o=r.modal,i=r.body,u=r.value,s=a(),c=e[o](i,u)
return a()-s<5&&!c&&""!==c?(this.state="denied",this.denied(n)):(this.state="granted",null===c?this.dissmissed(n):void t(c))}}]),i}(d)),new(function(e){function o(){return t(this,o),n(this,Object.getPrototypeOf(o).call(this,"notifications"))}return r(o,e),s(o,[{key:"request",value:function(e,t){var n=this,r=function(r){return{"default":function(){return n.dissmissed(t)},denied:function(){return n.denied(t)},granted:function(){return e()}}[r]()},o=Notification.requestPermission(r)
o.then&&o.then(r)}}]),o}(d)),new(function(i){function u(){t(this,u)
var e=n(this,Object.getPrototypeOf(u).call(this,"PointerLock"))
return e.state="unknown",e}return r(u,i),s(u,[{key:"query",value:function(e,t){var n=new h(this.state)
return Promise.resolve(n)}},{key:"request",value:function(t,n,r){var i=this
if("event"in e&&(!event||!event.isTrusted))throw Error("Failed to execute 'requestPointerLock' on 'Element': API can only be initiated by a user gesture.")
var u=a()
o(document,"pointerlockchange pointerlockerror",function(e){return"pointerlockchange"===e.type&&document.pointerLockElement?t(i.state="granted"):void(a()-u<10?(i.state="denied",i.denied(n)):(i.state="prompt",i.dissmissed(n)))}),r.element.requestPointerLock()}}]),u}(d)),new(function(e){function o(){return t(this,o),n(this,Object.getPrototypeOf(o).call(this,"push"))}return r(o,e),s(o,[{key:"request",value:function(e,t,n){navigator.serviceWorker.getRegistrations().then(function(t){if(!t.length)throw new DOMError("PermissionDeniedError","Push requires at least one service worker to be running")
navigator.serviceWorker.ready.then(function(t){return t.pushManager.subscribe({userVisibleOnly:!0}).then(function(t){var n=t.getKey&&t.getKey("p256dh"),r=t.getKey&&t.getKey("auth")
e({endpoint:t.endpoint,key:n||new ArrayBuffer,auth:r||new ArrayBuffer})})})})}}]),o}(d)),new(function(e){function o(){return t(this,o),n(this,Object.getPrototypeOf(o).call(this,"storage"))}return r(o,e),s(o,[{key:"query",value:function(e,t,n){if(void 0===n.type)throw new TypeError("Failed to execute the 'query' property from 'Permissions': required member type is undefined.")
if(!/^(persistent|temporary)$/.test(n.type))throw new TypeError("Failed to execute the 'query' property from 'Permissions': The provided value '"+n.type+"' is not a valid enum type.")
var r="persistent"==n.type?"webkitPersistentStorage":"webkitTemporaryStorage"
navigator[r].queryUsageAndQuota(function(t,n){return e({state:n?"granted":"prompt",used:t,granted:n})})}},{key:"request",value:function(e,t,n){grantedBytes=navigator.webkitPersistentStorage.requestQuota(n.quota,function(e){console.log(e,f)})}}]),o}(d))}(self)
