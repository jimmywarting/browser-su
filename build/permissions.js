!function(e){"use strict"
function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e,t){if(t=e[0],!(0 in e))throw new TypeError("Failed to execute 'query' on 'Permissions': 1 argument required, but only 0 present.")
if("object"!==(void 0===t?"undefined":o(t)))throw new TypeError("Failed to execute 'query' on 'Permissions': parameter 1 ('permission') is not an object.")
if(void 0===t.name)throw new TypeError("Failed to read the 'query' property from 'Permissions': required member name is undefined.")
if(!u[t.name])throw new TypeError("Failed to read the 'query' property from 'Permissions': The provided value '"+e[0]+"' is not a valid enum value of type PermissionName.")}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=(!e.opener&&!!(e.top&&e!=e.top||e.parent&&e!=e.parent),e.performance&&performance.now||Date.now||function(e){return+new Date}),u={},c="MozAppearance"in document.documentElement.style,d=(/constructor/i.test(e.HTMLElement),!!e.webkitRequestFileSystem,function(e,t,n){var r=t.split(" ").map(function(t){var i=function(t){var i=!0,o=!1,a=void 0
try{for(var s,u=r[Symbol.iterator]();!(i=(s=u.next()).done);i=!0){var c=s.value
e.removeEventListener(c[1],c[0])}}catch(d){o=!0,a=d}finally{try{!i&&u["return"]&&u["return"]()}finally{if(o)throw a}}n(t)}
return e.addEventListener(t,i,!1),[i,t]})}),l=function(e){function i(e,r){t(this,i)
var o=n(this,Object.getPrototypeOf(i).call(this,r))
return o.name="Request"+e+"Error",o}return r(i,e),i}(Error),f=function(){function e(n){t(this,e),this.name=n,u[n]=this}return a(e,[{key:"query",value:function(e,t,n){return navigator.permissions.query(n||{name:this.name}).then(e,t)}},{key:"dismissed",value:function(e){e(new l("Dismissed","User dismissed access to "+this.name))}},{key:"denied",value:function(e){e(new l("Denied","User blocked access to "+this.name))}},{key:"supported",set:function(e){var t=this
!e&&(this.query=this.request=function(){throw new l("Unsupported","This client dose not seem to have "+t.name+" support")})}}]),e}(),h=function g(e){var n=this
t(this,g)
var r=document.createDocumentFragment();["addEventListener","dispatchEvent","removeEventListener"].forEach(function(e){return Object.defineProperty(n,e,{value:r[e]})}),this.state="default"!==e&&e||"prompt",this.onchange=null},m={query:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n]
return new Promise(function(e,n){i(t),t=t[0],u[t.name].query(e,n,t)})},request:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n]
return new Promise(function(e,n){i(t),t=t[0],u[t.name].request(e,n,t)})},revoke:function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n]
return new Promise(function(e,n){i(t)})}}
e.su=m,new(function(e){function i(){return t(this,i),n(this,Object.getPrototypeOf(i).call(this,"BackgroundSync"))}return r(i,e),a(i,[{key:"request",value:function(e,t,n){}}]),i}(f))
var p=function(i){function o(r){t(this,o)
var i=n(this,Object.getPrototypeOf(o).call(this,r))
return i.storage=e[r],i.state=i.storage.length?"granted":function(e){try{return i.storage.x=1,i.storage.removeItem("x"),"granted"}catch(t){return"denied"}}(),i}return r(o,i),a(o,[{key:"query",value:function(e,t){for(var n=this.storage.length,r=0;n--;){var i=this.storage.key(n)
r+=i.length+this.storage.getItem(i).length}var o=new h(this.state)
o.used=2*r,e(o)}}]),o}(f)
new p("localStorage"),new p("sessionStorage")
var v=function(){var e=document.cookie,t={}
if(!e)return t
var n=!0,r=!1,i=void 0
try{for(var o,a=e.split(";")[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value,u=s.split("=")
t[u[0]]=unescape(u[1])}}catch(c){r=!0,i=c}finally{try{!n&&a["return"]&&a["return"]()}finally{if(r)throw i}}return t}
new!function(i){function o(){return t(this,o),n(this,Object.getPrototypeOf(o).call(this,"cookie"))}return r(o,i),a(o,[{key:"query",value:function(t,n,r){var i=navigator.cookieEnabled
if(r.thirdParty&&i)!function(){var n=function(e){if("EnabledthirdParty::false"===e.data||"EnabledthirdParty::true"===e.data){var n=~e.data.indexOf("true")?"granted":"denied",i=new h(n)
r.remove(),t(i)}},r=document.createElement("iframe")
r.src="https://jimmywarting.github.io/browser-su/start",r.hidden=!0,e.addEventListener("message",n,!1),document.body.appendChild(r)}()
else{var o=i?"granted":"denied",a=new h(o)
t(a)}}},{key:"request",value:function(e,t){navigator.cookieEnabled?e(v()):this.denied(t)}}]),o}(f),new(function(i){function o(){t(this,o)
var e=n(this,Object.getPrototypeOf(o).call(this,"fullscreen")),r={w3:{enabled:"fullscreenEnabled",element:"fullscreenElement",request:"requestFullscreen",exit:"exitFullscreen",events:{change:"fullscreenchange",error:"fullscreenerror"}},webkit:{enabled:"webkitFullscreenEnabled",element:"webkitCurrentFullScreenElement",request:"webkitRequestFullscreen",exit:"webkitExitFullscreen",events:{change:"webkitfullscreenchange",error:"webkitfullscreenerror"}},moz:{enabled:"mozFullScreenEnabled",element:"mozFullScreenElement",request:"mozRequestFullScreen",exit:"mozCancelFullScreen",events:{change:"mozfullscreenchange",error:"mozfullscreenerror"}},ms:{enabled:"msFullscreenEnabled",element:"msFullscreenElement",request:"msRequestFullscreen",exit:"msExitFullscreen",events:{change:"MSFullscreenChange",error:"MSFullscreenError"}}}
r.w3
for(var i in r)if(r[i].enabled in document){e.api=r[i]
break}return e.supported=e.api,e}return r(o,i),a(o,[{key:"query",value:function(e){var t=new h(this.state)
e(t)}},{key:"request",value:function(t,n,r){var i=this
if(this.supported||this.unsupported(),"event"in e&&(!event||!event.isTrusted))throw Error("Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.")
var o=this.api.events
if("denied"===this.state)throw this.denied(n)
d(document,o.change+" "+o.error,function(e){e.type===o.change&&t(),e.type===o.error&&i.dismissed(n)}),r.element[this.api.request]()}},{key:"state",get:function(){return document[this.api.enabled]?"unknown":"denied"}}]),o}(f)),new(function(i){function s(){t(this,s)
var e=n(this,Object.getPrototypeOf(s).call(this,"geolocation"))
return e.enableHighAccurary=!1,e.state="unknown",e.supported=navigator.geolocation,navigator.permissions||(e.query=function(t){return t(new h(e.state))}),e}return r(s,i),a(s,[{key:"request",value:function(t,n,r){var i=this
if("temporary disabled"===this.state){var a=function(){var e=document.createElement("iframe")
return e.hidden=!0,e.onload=function(){var r=e.contentWindow.navigator
r.geolocation.getCurrentPosition(function(n){return e.remove(t(n))},function(t){r.permissions.query({name:"geolocation"}).then(function(t){return e.remove({prompt:function(){return i.state="temporary disabled",i.dismissed(n)},denied:function(){return i.state="denied",i.denied(n)}}[t.state]())})})},{v:document.body.appendChild(e)}}()
if("object"===(void 0===a?"undefined":o(a)))return a.v}return"denied"===this.state?this.denied(n):(c&&d(e,"focus click",function(){i.dismissed(n)}),void navigator.geolocation.getCurrentPosition(t,function(o){1==o.code&&e.chrome&&e.chrome.webstore&&i.query(function(e){return i.state="prompt"==e.state?"temporary disabled":"denied","prompt"==e.state?i.dismissed(n):void i.request(t,n,r)}),{2:function(){return i.state="granted",n(new l("Unavailable","Possition is unavailable"))},3:function(){return i.state="granted",n(new l("Timeout","Timeout expired"))}}[h.state]()},r))}}]),s}(f)),new(function(e){function i(){t(this,i)
var e=n(this,Object.getPrototypeOf(i).call(this,"image"))
return e.state="unknown",e}return r(i,e),a(i,[{key:"query",value:function(e,t){return"granted"==this.state?e(new h("granted")):"denied"==this.state?e(new h("granted")):void this.request(function(t){e(new h("granted"))},function(t){e(new h("denied"))})}},{key:"request",value:function(e,t){var n=this
if("granted"==this.state)return e()
if("denied"==this.state)return this.denied(t)
var r=new Uint8Array([71,73,70,56,57,97,1,0,1,0,128,0,0,0,0,0,255,255,255,33,249,4,1,0,0,0,0,44,0,0,0,0,1,0,1,0,0,2,1,68,0,59]),i=new Blob([r],{type:"image/gif"}),o=new Image
o.onload=function(){e(),n.state="granted"},o.onerror=function(){n.denied(t),n.state="denied"},o.src=URL.createObjectURL(i),document.body.appendChild(o),o.remove(),setTimeout(function(){return n.denied(t)},500)}}]),i}(f)),new(function(i){function o(){t(this,o)
var r=n(this,Object.getPrototypeOf(o).call(this,"indexedDB"))
return e.indexedDB||(e.PointerEvent||e.MSPointerEvent?r.state="denied":r.supported=!1),r}return r(o,i),a(o,[{key:"query",value:function(e,t,n){var r=(indexedDB.open("myDatabase",{version:1,storage:"persistent"}),indexedDB.open(n.name))
r.onerror=function(){return e(!0)},r.onsuccess=function(){return e(!1)}}},{key:"request",value:function(e,t,n){var r=indexedDB.open(n.database,n)
r.onerror=function(){return e(!0)},r.onsuccess=function(){return e(!1)}}}]),o}(f)),new(function(e){function i(){t(this,i)
var e=n(this,Object.getPrototypeOf(i).call(this,"midi"))
return e.supported=navigator.requestMIDIAccess,e}return r(i,e),a(i,[{key:"request",value:function(e,t,n){var r=this
navigator.requestMIDIAccess(n).then(e,function(e){return r.query(function(e){return"prompt"==e.state?r.dismissed(t):r.denied(t)},void 0,n)})}}]),i}(f)),new(function(i){function o(){t(this,o)
var e=n(this,Object.getPrototypeOf(o).call(this,"modal"))
e.state="granted"
var r=(frameElement||{}).sandbox||[]
return r.length&&!frameElement.sandbox.contains("allow-modals")&&(e.state="disabled"),e}return r(o,i),a(o,[{key:"query",value:function(e){e(new h(this.state))}},{key:"request",value:function(t,n,r){var i=r.modal,o=r.body,a=r.value,u=s(),c=e[i](o,a)
return s()-u<5&&!c&&""!==c?(this.state="denied",this.denied(n)):(this.state="granted",null===c?this.dismissed(n):void t(c))}}]),o}(f)),new(function(e){function i(){t(this,i)
var e=n(this,Object.getPrototypeOf(i).call(this,"notifications"))
return navigator.permissions||(e.query=function(e){return e(new h(Notification.permission))}),e}return r(i,e),a(i,[{key:"request",value:function(e,t){var n=this,r=function(r){return{"default":function(){return n.dismissed(t)},denied:function(){return n.denied(t)},granted:function(){return e()}}[r]()},i=Notification.requestPermission(r)
i.then&&i.then(r)}}]),i}(f)),new(function(i){function o(){t(this,o)
var e=n(this,Object.getPrototypeOf(o).call(this,"pointerlock"))
e.state="unknown"
var r=(frameElement||{}).sandbox||[]
return r.length&&!frameElement.sandbox.contains("allow-pointer-lock")&&(e.state="disabled"),e}return r(o,i),a(o,[{key:"query",value:function(e,t){var n=new h(this.state)
e(n)}},{key:"request",value:function(t,n,r){var i=this
if("event"in e&&(!event||!event.isTrusted))throw Error("Failed to execute 'requestPointerLock' on 'Element': API can only be initiated by a user gesture.")
var o=s()
d(document,"pointerlockchange pointerlockerror",function(e){return"pointerlockchange"===e.type&&document.pointerLockElement?t(i.state="granted"):void(s()-o<10?(i.state="denied",i.denied(n)):(i.state="prompt",i.dismissed(n)))}),r.element.requestPointerLock()}}]),o}(f)),new(function(i){function o(){t(this,o)
var r=n(this,Object.getPrototypeOf(o).call(this,"push"))
return(r.supported="PushManager"in e)?(navigator.permissions||(r.query=function(e){return e(new h("https:"==location.protocol||"localhost"==document.location.hostname?"unknown":"denied"))}),r):n(r)}return r(o,i),a(o,[{key:"request",value:function(e,t,n){navigator.serviceWorker.getRegistrations().then(function(t){if(!t.length)throw new l("Missing","Push requires at least one service worker to be running")
navigator.serviceWorker.ready.then(function(t){return t.pushManager.subscribe({userVisibleOnly:!0}).then(function(t){var n=t.getKey&&t.getKey("p256dh"),r=t.getKey&&t.getKey("auth")
e({endpoint:t.endpoint,key:n||new ArrayBuffer,auth:r||new ArrayBuffer})})})})}}]),o}(f)),new(function(i){function o(){t(this,o)
var r=n(this,Object.getPrototypeOf(o).call(this,"push-safari"))
return r.supported=((e.safari||{}).pushNotification||{}).permission,r}return r(o,i),a(o,[{key:"query",value:function(t,n,r){var i=e.safari.pushNotification.permission(r.pushId),a=new h(i.permission)
a.endpoint="gateway.push.apple.com:2195",a.key=o.str2ab(a.deviceToken),t(a)}},{key:"request",value:function(t,n,r){var i=this
e.safari.pushNotification.requestPermission(r.serviceUrl,r.pushId,r.data||{},function(e){return i.query(t,function(){return i.denied(n)},r)})}}],[{key:"str2ab",value:function(e){var t=new ArrayBuffer(2*e.length),n=new Uint16Array(t)
for(var r in e)n[r]=e.charCodeAt(r)
return t}}]),o}(f))
var y=function(e){return navigator["persistent"==e?"webkitPersistentStorage":"webkitTemporaryStorage"]}
new!function(e){function i(){t(this,i)
var e=n(this,Object.getPrototypeOf(i).call(this,"fs"))
return e.supported=navigator.webkitPersistentStorage,e}return r(i,e),a(i,[{key:"query",value:function(e,t,n){if(void 0===n.storage)throw new TypeError("Failed to execute the 'query' property from 'su': required member storage is undefined.")
if(!/^(persistent|temporary)$/.test(n.storage))throw new TypeError("Failed to execute the 'query' property from 'su': The provided value '"+n.storage+"' is not a valid enum storage.")
y(n.storage).queryUsageAndQuota(function(t,r){var i=new h(r>=~~n.quota?"granted":"prompt")
i.used=t,i.granted=r,webkitRequestFileSystem("persistent"==n.storage,0,function(t){i.root=t,e(i)},function(t){i.state="denied",e(i)})})}},{key:"request",value:function(e,t,n){var r=this
y(n.storage).requestQuota(n.quota,function(){r.query(function(t){e({used:t.used,granted:t.granted,root:t.root})},r.denied,n)},t)}}]),i}(f)}(self)
