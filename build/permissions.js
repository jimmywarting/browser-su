;(function(window){
"use strict";

// create a one-time event

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function once(node, types, callback) {
	var map = types.split(' ').map(function (name) {
		var cb = function cb(evt) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var x = _step.value;
					node.removeEventListener(x[1], x[0]);
				} // call handler
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			callback(evt);
		};
		node.addEventListener(name, cb, false);
		return [cb, name];
	});
}

var iframed = !window.opener && !!(window.top && window != window.top || window.parent && window != window.parent);
var now = window.performance && performance.now || Date.now || function (C) {
	return +new Date();
};
var PermissionName = {};

var PermissionError = function (_Error) {
	_inherits(PermissionError, _Error);

	function PermissionError(name, msg) {
		_classCallCheck(this, PermissionError);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PermissionError).call(this, msg));

		_this.name = 'Request' + name + 'Error';
		return _this;
	}

	return PermissionError;
}(Error);

var Root = function () {
	function Root(name) {
		_classCallCheck(this, Root);

		this.name = name;
		PermissionName[name] = this;
	}

	_createClass(Root, [{
		key: 'query',
		value: function query(resolve, reject, opts) {
			return navigator.permissions.query(opts || { name: this.name }).then(resolve, reject);
		}
	}, {
		key: 'dismissed',
		value: function dismissed(reject) {
			reject(new PermissionError('Dismissed', 'User dismissed access to ' + this.name));
		}
	}, {
		key: 'denied',
		value: function denied(reject) {
			reject(new PermissionError('Denied', 'User blocked access to ' + this.name));
		}
	}, {
		key: 'unsupported',
		value: function unsupported() {
			throw new PermissionError('Unsupported', 'This client dose not seem to have ' + this.name + ' support');
		}
	}]);

	return Root;
}();

var PermissionStatus = function PermissionStatus(state) {
	_classCallCheck(this, PermissionStatus);

	this.state = state || 'prompt';
	this.onchange = null;
};

function validate(args, o) {
	o = args[0];

	if (!(0 in args)) throw new TypeError('Failed to execute \'query\' on \'Permissions\': 1 argument required, but only 0 present.');

	if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== 'object') throw new TypeError('Failed to execute \'query\' on \'Permissions\': parameter 1 (\'permission\') is not an object.');

	if (o.name === undefined) throw new TypeError('Failed to read the \'query\' property from \'Permissions\': required member name is undefined.');

	if (!PermissionName[o.name]) throw new TypeError('Failed to read the \'query\' property from \'Permissions\': The provided value \'' + args[0] + '\' is not a valid enum value of type PermissionName.');
}

var permissions = {
	query: function query() {
		for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
			opts[_key] = arguments[_key];
		}

		return new Promise(function (resolve, reject) {
			validate(opts);
			opts = opts[0];
			PermissionName[opts.name].query(resolve, reject, opts);
		});
	},
	request: function request() {
		for (var _len2 = arguments.length, opts = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
			opts[_key2] = arguments[_key2];
		}

		return new Promise(function (resolve, reject) {
			validate(opts);
			opts = opts[0];
			PermissionName[opts.name].request(resolve, reject, opts);
		});
	},
	revoke: function revoke() {
		for (var _len3 = arguments.length, opts = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
			opts[_key3] = arguments[_key3];
		}

		return new Promise(function (resolve, reject) {
			validate(opts);
			// We have yet no access to revoke any permission for the user
			// But we could tell them how to do it or make a "soft-lock"
		});
	}
};

window.su = permissions;

new (function (_Root) {
	_inherits(BackgroundSyncPermission, _Root);

	function BackgroundSyncPermission() {
		_classCallCheck(this, BackgroundSyncPermission);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BackgroundSyncPermission).call(this, 'BackgroundSync'));
	}

	_createClass(BackgroundSyncPermission, [{
		key: 'request',
		value: function request(resolve, reject, opts) {
			// navigator.serviceWorker.getRegistrations().then(workers => {
			// 	if(!workers.length) {
			// 		throw new DOMError('PermissionDeniedError', 'Background sync requires at least one service worker to be running')
			// 	}
			// 	navigator.serviceWorker.ready.then( serviceWorkerRegistration =>
			// 		serviceWorkerRegistration.sync.register('myFirstSync');
			// 		.then( subscription => {
			// 			const key = subscription.getKey && subscription.getKey('p256dh')
			// 			const auth = subscription.getKey && subscription.getKey('auth')
			//
			// 			resolve({
			// 				endpoint: subscription.endpoint,
			// 				key: key || new ArrayBuffer(),
			// 				auth: auth || new ArrayBuffer()
			// 			})
			// 		})
			// 	)
			// })
		}
	}]);

	return BackgroundSyncPermission;
}(Root))();

var KeyValStoragePermission = function (_Root2) {
	_inherits(KeyValStoragePermission, _Root2);

	function KeyValStoragePermission(name) {
		_classCallCheck(this, KeyValStoragePermission);

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(KeyValStoragePermission).call(this, name));

		_this3.storage = window[name];
		_this3.state = _this3.storage.length ? 'granted' : function (x) {
			try {
				_this3.storage.x = 1;
				_this3.storage.removeItem('x');
				return 'granted';
			} catch (e) {
				return 'denied';
			}
		}();
		return _this3;
	}

	_createClass(KeyValStoragePermission, [{
		key: 'query',
		value: function query(resolve, reject) {
			var i = this.storage.length;
			var used = 0;
			while (i--) {
				var key = this.storage.key(i);
				used += key.length + this.storage.getItem(key).length;
			}

			resolve({
				state: this.state,
				used: used * 2,
				granted: 'unknown'
			});
		}
	}]);

	return KeyValStoragePermission;
}(Root);

new KeyValStoragePermission('localStorage');
new KeyValStoragePermission('sessionStorage');

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

function getCookies() {
	var str = document.cookie;
	var cookies = {};

	if (!str) return cookies;

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = str.split(";")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var pair = _step2.value;

			var cookie = pair.split("=");
			cookies[cookie[0]] = unescape(cookie[1]);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return cookies;
}

new (function (_Root3) {
	_inherits(CookiePermission, _Root3);

	function CookiePermission() {
		_classCallCheck(this, CookiePermission);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CookiePermission).call(this, 'cookie'));
	}

	_createClass(CookiePermission, [{
		key: 'query',
		value: function query(resolve, reject, opts) {

			var enabled = navigator.cookieEnabled;

			if (opts.thirdParty && enabled) {
				(function () {
					var receiveMessage = function receiveMessage(evt) {
						if (evt.data === 'EnabledthirdParty::false' || evt.data === 'EnabledthirdParty::true') {
							var state = ~evt.data.indexOf('true') ? 'granted' : 'denied';
							var permission = new PermissionStatus(state);

							iframe.remove();
							resolve(permission);
						}
					};

					var iframe = document.createElement('iframe');
					iframe.src = 'https://jimmywarting.github.io/browser-su/start';
					iframe.hidden = true;
					window.addEventListener("message", receiveMessage, false);
					document.body.appendChild(iframe);
				})();
			} else {
				var state = enabled ? 'granted' : 'denied';
				var permission = new PermissionStatus(state);

				resolve(permission);
			}
		}
	}, {
		key: 'request',
		value: function request(resolve, reject) {
			navigator.cookieEnabled ? resolve(getCookies()) : this.denied(reject);
		}
	}]);

	return CookiePermission;
}(Root))();

new (function (_Root4) {
	_inherits(FullScreenPermission, _Root4);

	function FullScreenPermission() {
		_classCallCheck(this, FullScreenPermission);

		var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(FullScreenPermission).call(this, 'fullscreen'));

		_this5.supported = false;

		var apis = {
			// http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
			w3: {
				enabled: 'fullscreenEnabled',
				element: 'fullscreenElement',
				request: 'requestFullscreen',
				exit: 'exitFullscreen',
				events: {
					change: 'fullscreenchange',
					error: 'fullscreenerror'
				}
			},
			webkit: {
				enabled: 'webkitFullscreenEnabled',
				element: 'webkitCurrentFullScreenElement',
				request: 'webkitRequestFullscreen',
				exit: 'webkitExitFullscreen',
				events: {
					change: 'webkitfullscreenchange',
					error: 'webkitfullscreenerror'
				}
			},
			moz: {
				enabled: 'mozFullScreenEnabled',
				element: 'mozFullScreenElement',
				request: 'mozRequestFullScreen',
				exit: 'mozCancelFullScreen',
				events: {
					change: 'mozfullscreenchange',
					error: 'mozfullscreenerror'
				}
			},
			ms: {
				enabled: 'msFullscreenEnabled',
				element: 'msFullscreenElement',
				request: 'msRequestFullscreen',
				exit: 'msExitFullscreen',
				events: {
					change: 'MSFullscreenChange',
					error: 'MSFullscreenError'
				}
			}
		},
		    w3 = apis.w3;

		// Loop through each vendor's specific API
		for (var vendor in apis) {
			// Check if document has the "enabled" property
			if (apis[vendor].enabled in document) {
				// It seems this browser support the fullscreen API
				_this5.api = apis[vendor];
				_this5.supported = true;
				break;
			}
		}
		return _this5;
	}

	_createClass(FullScreenPermission, [{
		key: 'query',
		value: function query(resolve) {
			var permission = new PermissionStatus(this.state);
			resolve(permission);
		}
	}, {
		key: 'request',
		value: function request(resolve, reject, opts) {
			var _this6 = this;

			if (!this.supported) this.unsupported();

			if ('event' in window && (!event || !event.isTrusted)) throw new Error("Failed to execute 'requestFullscreen' on 'Element': API can only be initiated by a user gesture.");

			var events = this.api.events;

			if (this.state === 'denied') throw this.denied(reject);

			once(document, events.change + ' ' + events.error, function (evt) {
				if (evt.type === events.change) resolve();
				if (evt.type === events.error) _this6.dismissed(reject);
			});

			opts.element[this.api.request]();
		}
	}, {
		key: 'state',
		get: function get() {
			return document[this.api.enabled] ? 'unknown' : 'denied';
		}
	}]);

	return FullScreenPermission;
}(Root))();

/**
 * [description]
 *
 * @since 0.1.0
 */
new (function (_Root5) {
	_inherits(GeolocationPermission, _Root5);

	function GeolocationPermission() {
		_classCallCheck(this, GeolocationPermission);

		var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(GeolocationPermission).call(this, 'geolocation'));

		_this7.enableHighAccurary = false;
		_this7.state = 'unknown';

		if (!navigator.permissions) _this7.query = function (resolve) {
			return resolve(new PermissionStatus(_this7.state));
		};
		return _this7;
	}

	_createClass(GeolocationPermission, [{
		key: 'request',
		value: function request(resolve, reject, opts) {
			var _this8 = this;

			/*
   Some fallback/silence method that can be used
   that I'm looking into
   	fetch('https://freegeoip.net/json')
   .then(res => res.json())
   .then(json => console.log(json))
   	iframe = document.createElement('iframe')
   script = document.createElement('script')
   script.src = 'https://www.google.com/jsapi'
   script.onload = () => console.log(iframe.contentWindow.google.loader.ClientLocation), iframe.remove()
   iframe.hidden = true
   iframe.onload = () => iframe.contentDocument.body.appendChild(script)
   document.body.appendChild(iframe)
   	fetch('https://ipinfo.io', {headers: {Accept: 'application/json'}})
   .then(res => res.json())
   .then(json => console.log(json))
   */

			// in chrome when you dismissed the dialog it throws denied error
			// but the fact is that you can still request a new permission if
			// you just reload the page, a workaround is to create a new iframe
			// and ask from that window
			if (this.state === 'temporary disabled') {
				var _ret2 = function () {
					var iframe = document.createElement('iframe');
					iframe.hidden = true;
					iframe.onload = function () {
						var nav = iframe.contentWindow.navigator;
						nav.geolocation.getCurrentPosition(function (success) {
							return iframe.remove(resolve(success));
						}, function (error) {
							nav.permissions.query({ name: 'geolocation' }).then(function (PermissionStatus) {
								return iframe.remove({ /* Swich */
									prompt: function prompt() {
										return _this8.state = 'temporary disabled', _this8.dismissed(reject);
									},
									denied: function denied() {
										return _this8.state = 'denied', _this8.denied(reject);
									}
								}[PermissionStatus.state]());
							});
						});
					};
					return {
						v: document.body.appendChild(iframe)
					};
				}();

				if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
			}

			if (this.state === 'denied') {
				return this.denied(reject);
			}

			navigator.geolocation.getCurrentPosition(resolve, function (err) {
				if (err.code == 1 && window.chrome && window.chrome.webstore) {
					_this8.query(function (PermissionStatus) {
						_this8.state = PermissionStatus.state == 'prompt' ? 'temporary disabled' : 'denied';

						if (PermissionStatus.state == 'prompt') return _this8.dismissed(reject);
						_this8.request(resolve, reject, opts);
					});
				}
				({ /* Swich */
					2: function _() {
						return _this8.state = 'granted', reject(new PermissionError('Unavailable', 'Possition is unavailable'));
					},
					3: function _() {
						return _this8.state = 'granted', reject(new PermissionError('Timeout', 'Timeout expired'));
					}
				})[PermissionStatus.state]();
			}, opts);
		}
	}]);

	return GeolocationPermission;
}(Root))();

new (function (_Root6) {
	_inherits(ImagePermission, _Root6);

	function ImagePermission() {
		_classCallCheck(this, ImagePermission);

		var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(ImagePermission).call(this, 'image'));

		_this9.state = 'unknown';
		return _this9;
	}

	_createClass(ImagePermission, [{
		key: 'query',
		value: function query(resolve, reject) {
			if (this.state == 'granted') return resolve(new PermissionStatus('granted'));

			if (this.state == 'denied') return resolve(new PermissionStatus('granted'));

			this.request(function (granted) {
				resolve(new PermissionStatus('granted'));
			}, function (rejected) {
				resolve(new PermissionStatus('denied'));
			});
		}
	}, {
		key: 'request',
		value: function request(resolve, reject) {
			var _this10 = this;

			if (this.state == 'granted') return resolve();

			if (this.state == 'denied') return this.denied(reject);

			var buffer = new Uint8Array([71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 128, 0, 0, 0, 0, 0, 255, 255, 255, 33, 249, 4, 1, 0, 0, 0, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 1, 68, 0, 59]);
			var blob = new Blob([buffer], { type: 'image/gif' });
			var img = new Image();
			img.onload = function () {
				resolve();_this10.state = 'granted';
			};
			img.onerror = function () {
				_this10.denied(reject);_this10.state = 'denied';
			};
			// img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
			img.src = URL.createObjectURL(blob);
			document.body.appendChild(img);
			img.remove();
			setTimeout(function () {
				return _this10.denied(reject);
			}, 500);
		}
	}]);

	return ImagePermission;
}(Root))();

new (function (_Root7) {
	_inherits(MidiPermission, _Root7);

	function MidiPermission() {
		_classCallCheck(this, MidiPermission);

		var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(MidiPermission).call(this, 'midi'));

		if (!navigator.requestMIDIAccess) _this11.query = function (resolve) {
			return resolve(new PermissionStatus('unsupported'));
		};

		return _this11;
	}

	_createClass(MidiPermission, [{
		key: 'request',
		value: function request(resolve, reject, opts) {
			var _this12 = this;

			navigator.requestMIDIAccess(opts).then(resolve, function (err) {
				return _this12.query(function (PermissionStatus) {
					return PermissionStatus.state == 'prompt' ? _this12.dismissed(reject) : _this12.denied(reject);
				}, undefined, opts);
			});
		}
	}]);

	return MidiPermission;
}(Root))();

new (function (_Root8) {
	_inherits(ModalPermission, _Root8);

	function ModalPermission() {
		_classCallCheck(this, ModalPermission);

		var _this13 = _possibleConstructorReturn(this, Object.getPrototypeOf(ModalPermission).call(this, 'modal'));

		_this13.state = 'granted';
		return _this13;
	}

	_createClass(ModalPermission, [{
		key: 'query',
		value: function query(resolve) {
			resolve(new PermissionStatus(this.state));
		}
	}, {
		key: 'request',
		value: function request(resolve, reject, opts) {
			var modal = opts.modal;
			var body = opts.body;
			var value = opts.value;

			var immediately = now();
			var result = window[modal](body, value);

			if (now() - immediately < 5 && !result && result !== '') {
				this.state = 'denied';
				return this.denied(reject);
			}

			this.state = 'granted';

			if (result === null) return this.dismissed(reject);

			resolve(result);
		}
	}]);

	return ModalPermission;
}(Root))();

new (function (_Root9) {
	_inherits(NotificationPermission, _Root9);

	function NotificationPermission() {
		_classCallCheck(this, NotificationPermission);

		var _this14 = _possibleConstructorReturn(this, Object.getPrototypeOf(NotificationPermission).call(this, 'notifications'));

		if (!navigator.permissions) _this14.query = function (resolve) {
			return resolve(new PermissionStatus(Notification.permission === 'default' ? 'prompt' : Notification.permission));
		};
		return _this14;
	}

	_createClass(NotificationPermission, [{
		key: 'request',
		value: function request(resolve, reject) {
			var _this15 = this;

			var cb = function cb(state) {
				return {
					default: function _default() {
						return _this15.dismissed(reject);
					},
					denied: function denied() {
						return _this15.denied(reject);
					},
					granted: function granted() {
						return resolve();
					}
				}[state]();
			};

			var req = Notification.requestPermission(cb);
			req.then && req.then(cb);
		}
	}]);

	return NotificationPermission;
}(Root))();

new (function (_Root10) {
	_inherits(pointerLock, _Root10);

	function pointerLock() {
		_classCallCheck(this, pointerLock);

		var _this16 = _possibleConstructorReturn(this, Object.getPrototypeOf(pointerLock).call(this, 'pointerlock'));

		_this16.state = 'unknown';
		return _this16;
	}

	_createClass(pointerLock, [{
		key: 'query',
		value: function query(resolve, reject) {
			var permission = new PermissionStatus(this.state);
			resolve(permission);
		}
	}, {
		key: 'request',
		value: function request(resolve, reject, opts) {
			var _this17 = this;

			if ('event' in window && (!event || !event.isTrusted)) throw new Error("Failed to execute 'requestPointerLock' on 'Element': API can only be initiated by a user gesture.");

			var immediately = now();

			once(document, 'pointerlockchange pointerlockerror', function (evt) {
				if (evt.type === 'pointerlockchange' && document.pointerLockElement) return resolve(_this17.state = 'granted');

				// A simple Boolean don't work cuz it is asynchronous but fast...
				if (now() - immediately < 10) {
					_this17.state = 'denied';
					_this17.denied(reject);
				} else {
					// Deny in chrome don't block, it really means dissmiss...
					_this17.state = 'prompt';
					_this17.dismissed(reject);
				}
			});

			opts.element.requestPointerLock();
		}
	}]);

	return pointerLock;
}(Root))();

new (function (_Root11) {
	_inherits(PushPermission, _Root11);

	function PushPermission() {
		_classCallCheck(this, PushPermission);

		// Could we do better? like checking if we have a subscription...?
		// It would not work without ssl, so we could disabled it then

		var _this18 = _possibleConstructorReturn(this, Object.getPrototypeOf(PushPermission).call(this, 'push'));

		if (!navigator.permissions) _this18.query = function (resolve) {
			return resolve(new PermissionStatus(location.protocol == 'https:' || document.location.hostname == "localhost" ? 'unknown' : 'denied'));
		};
		return _this18;
	}

	_createClass(PushPermission, [{
		key: 'request',
		value: function request(resolve, reject, opts) {
			navigator.serviceWorker.getRegistrations().then(function (workers) {
				if (!workers.length) throw new PermissionError('Missing', 'Push requires at least one service worker to be running');

				navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
					return serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true }).then(function (subscription) {
						var key = subscription.getKey && subscription.getKey('p256dh');
						var auth = subscription.getKey && subscription.getKey('auth');

						resolve({
							endpoint: subscription.endpoint,
							key: key || new ArrayBuffer(),
							auth: auth || new ArrayBuffer()
						});
					});
				});
			});
		}
	}]);

	return PushPermission;
}(Root))();

new (function (_Root12) {
	_inherits(StoragePermission, _Root12);

	function StoragePermission() {
		_classCallCheck(this, StoragePermission);

		var _this19 = _possibleConstructorReturn(this, Object.getPrototypeOf(StoragePermission).call(this, 'storage'));

		if (!navigator.webkitPersistentStorage) _this19.query = function (resolve) {
			return resolve(new PermissionStatus('unsupported'));
		};
		return _this19;
	}

	_createClass(StoragePermission, [{
		key: 'query',
		value: function query(resolve, reject, opts) {
			if (opts.type === undefined) throw new TypeError('Failed to execute the \'query\' property from \'su\': required member type is undefined.');

			if (!/^(persistent|temporary)$/.test(opts.type)) throw new TypeError('Failed to execute the \'query\' property from \'su\': The provided value \'' + opts.type + '\' is not a valid enum type.');

			StoragePermission.store(opts.type).queryUsageAndQuota(function (usedBytes, grantedBytes) {
				var status = new PermissionStatus(grantedBytes >= opts.quota ? 'granted' : 'prompt');
				status.used = usedBytes;
				status.granted = grantedBytes;
				resolve(status);
			});
		}
	}, {
		key: 'request',
		value: function request(resolve, reject, opts) {
			grantedBytes = StoragePermission.store(opts.type).requestQuota(opts.quota, function (grantedBytes) {
				webkitRequestFileSystem(opts.type == 'persistent', function (e) {
					console.log(e);
				}, function (e) {
					console.log(e);
				});
				console.log(grantedBytes, f);
			});
		}
	}], [{
		key: 'store',
		value: function store(type) {
			return navigator[type == 'persistent' ? 'webkitPersistentStorage' : 'webkitTemporaryStorage'];
		}
	}]);

	return StoragePermission;
}(Root))();
})(self);