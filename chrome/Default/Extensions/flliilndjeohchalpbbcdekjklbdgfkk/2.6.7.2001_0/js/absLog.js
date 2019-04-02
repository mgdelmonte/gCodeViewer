/*!
 * © 2016 Avira Operations GmbH & Co. KG. All rights reserved.
 * No part of this extension may be reproduced, stored or transmitted in any
 * form, for any reason or by any means, without the prior permission in writing
 * from the copyright owner. The text, layout, and designs presented are
 * protected by the copyright laws of the United States and international
 * treaties.
 */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var extensionAccessor = {
  getManifest: function getManifest() {
    return chrome.runtime.getManifest();
  },
  getURL: function getURL(path) {
    return chrome.extension.getURL(path);
  }
};
module.exports = extensionAccessor;
},{}],2:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],3:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],4:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
},{}],5:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],6:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":19}],7:[function(require,module,exports){
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":5,"./_invoke":18,"./_is-object":19}],8:[function(require,module,exports){
var core = module.exports = { version: '2.6.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],9:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":5}],10:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":13}],11:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":14,"./_is-object":19}],12:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":8,"./_ctx":9,"./_global":14,"./_hide":16,"./_redefine":22}],13:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],14:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],15:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],16:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":10,"./_object-dp":20,"./_property-desc":21}],17:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":10,"./_dom-create":11,"./_fails":13}],18:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],19:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],20:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":6,"./_descriptors":10,"./_ie8-dom-define":17,"./_to-primitive":23}],21:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],22:[function(require,module,exports){
var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_core":8,"./_global":14,"./_has":15,"./_hide":16,"./_uid":24}],23:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":19}],24:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],25:[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', { bind: require('./_bind') });

},{"./_bind":7,"./_export":12}],26:[function(require,module,exports){
"use strict";

module.exports = require('./src/ContentMessenger');

},{"./src/ContentMessenger":27}],27:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Messenger = require('./Messenger');

var ContentTopic = require('./ContentTopic');

var chrome = require('./chrome');

var ContentMessenger =
/*#__PURE__*/
function (_Messenger) {
  _inherits(ContentMessenger, _Messenger);

  function ContentMessenger() {
    var _this;

    _classCallCheck(this, ContentMessenger);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContentMessenger).call(this, ContentTopic));

    var onMessage = _this._onMessage.bind(_assertThisInitialized(_assertThisInitialized(_this)));

    chrome.runtime.onMessage.addListener(onMessage); // Workaround for https://bugzilla.mozilla.org/show_bug.cgi?id=1296609

    window.addEventListener('unload', function () {
      chrome.runtime.onMessage.removeListener(onMessage);
    });
    var port = chrome.runtime.connect({
      name: 'ContentMessenger'
    });
    port.onDisconnect.addListener(_this._onDisconnect.bind(_assertThisInitialized(_assertThisInitialized(_this))));
    return _this;
  }

  _createClass(ContentMessenger, [{
    key: "_onMessage",
    value: function _onMessage(message, sender, callback) {
      if (!sender.tab && message.publish) {
        var topic = this._getTopic(message.publish);

        if (topic) {
          topic.publish(message.message, callback);
        }
      }

      return true; // Allows callbacks to be called asynchronos
    }
  }, {
    key: "_onDisconnect",
    value: function _onDisconnect() {
      var topic = this._getTopic('Background:closed');

      if (topic) {
        topic.publish();
      }
    }
  }, {
    key: "publish",
    value: function publish(topicName, message, callback) {
      var retries = 10;
      var delay = 50;
      var NO_RECIEVING_END = 'Could not establish connection. Receiving end does not exist.';

      var sendMessage = function sendMessage() {
        chrome.runtime.sendMessage({
          publish: topicName,
          message: message
        }, function (response) {
          var error = chrome.runtime.lastError;

          if (error && error.message === NO_RECIEVING_END) {
            retries -= 1;
            if (retries) setTimeout(sendMessage, delay);
          } else if (typeof callback === 'function') {
            callback(response);
          }
        });
      };

      sendMessage();
    }
  }]);

  return ContentMessenger;
}(Messenger);

module.exports = ContentMessenger;

},{"./ContentTopic":28,"./Messenger":29,"./chrome":31}],28:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Topic = require('./Topic');

var chrome = require('./chrome');

var ContentTopic =
/*#__PURE__*/
function (_Topic) {
  _inherits(ContentTopic, _Topic);

  function ContentTopic(name) {
    var _this;

    _classCallCheck(this, ContentTopic);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ContentTopic).call(this, name));
    chrome.runtime.sendMessage({
      subscribe: name
    });
    return _this;
  }

  return ContentTopic;
}(Topic);

module.exports = ContentTopic;

},{"./Topic":30,"./chrome":31}],29:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Messenger =
/*#__PURE__*/
function () {
  _createClass(Messenger, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (!this._instance) {
        this._instance = new this();
      }

      return this._instance;
    }
  }]);

  function Messenger(topicClass) {
    _classCallCheck(this, Messenger);

    this._topicClass = topicClass;
    this._topics = {};
  }

  _createClass(Messenger, [{
    key: "_getTopic",
    value: function _getTopic(name, create) {
      var topic = this._topics[name];

      if (!topic && create) {
        this._topics[name] = topic = new this._topicClass(name);
      }

      return topic;
    }
  }, {
    key: "subscribe",
    value: function subscribe(topicName, callback) {
      this._getTopic(topicName, true).subscribe(callback);
    }
  }, {
    key: "publish",
    value: function publish(topicName, message, callback, sender) {
      var topic = this._getTopic(topicName);

      if (topic) {
        topic.publish(message, callback, sender);
      }
    }
  }]);

  return Messenger;
}();

module.exports = Messenger;

},{}],30:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Topic =
/*#__PURE__*/
function () {
  function Topic(name) {
    _classCallCheck(this, Topic);

    this._name = name; // Subscribers in the same context (functions)

    this._callbacks = [];
  }

  _createClass(Topic, [{
    key: "publish",
    value: function publish(message, callback) {
      var cb = this._wrapCallback(callback);

      this._callbacks.forEach(function (fn) {
        return fn(message, cb);
      });
    }
  }, {
    key: "_wrapCallback",
    value: function _wrapCallback(callback) {
      if (callback == null) {
        return callback;
      }

      return function () {
        try {
          callback.apply(void 0, arguments);
        } catch (e) {
          if (e.message !== 'Attempting to use a disconnected port object') {
            throw e;
          }
        }
      };
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      this._callbacks.push(callback);
    }
  }]);

  return Topic;
}();

module.exports = Topic;

},{}],31:[function(require,module,exports){
"use strict";

/* globals chrome, browser */
if (typeof browser !== 'undefined' && browser.runtime) {
  module.exports = browser;
} else {
  module.exports = chrome;
}

},{}],32:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var messenger = require('content/messagingInterface');

var extensionAccessor = require('browser_accessors/extensionAccessor');
/**
 * Prepares the data to render the ABS log debug page
 * can be accessed using chrome-extension://<extensionid>/html/absLog.html
 */


var LogPage =
/*#__PURE__*/
function () {
  function LogPage() {
    (0, _classCallCheck2.default)(this, LogPage);
    this._downloadData = this._downloadData.bind(this);
    this._toggleLogging = this._toggleLogging.bind(this);

    this._init();
  }

  (0, _createClass2.default)(LogPage, [{
    key: "_init",
    value: function _init() {
      var _this = this;

      document.getElementById('btn-download').addEventListener('click', this._downloadData);
      document.getElementById('btn-clear').addEventListener('click', this._clearData);
      var toggleLogging = document.getElementById('cb-start-logging');
      var logContent = document.getElementById('log-content');
      messenger.publish('APLLog:active', null, function (isActive) {
        toggleLogging.checked = isActive;
        toggleLogging.addEventListener('change', _this._toggleLogging);
      });
      messenger.publish('APLLog:get', {}, function (logData) {
        logContent.value = _this._prepareData(logData);
      });
      messenger.subscribe('APLLog:log', function (_ref) {
        var logData = _ref.logData;
        logContent.value = _this._prepareData(logData);
      });
    }
  }, {
    key: "_prepareData",
    value: function _prepareData(data) {
      // Log will always have the header (versions). Even if there are no logs
      var header = {
        userAgent: navigator.userAgent,
        absVersion: extensionAccessor.getManifest().version
      };
      return JSON.stringify({
        header: header,
        timeline: data.events
      }, null, 2);
    }
  }, {
    key: "_downloadData",
    value: function _downloadData() {
      var _this2 = this;

      messenger.publish('APLLog:get', {}, function (logData) {
        var eventLog = _this2._prepareData(logData);

        window.location = "data:application/octet-stream;charset=utf-8,".concat(encodeURIComponent(eventLog));
      });
    }
  }, {
    key: "_clearData",
    value: function _clearData() {
      // Clear stored data. This is prior to formatting the data
      messenger.publish('APLLog:clear');
    }
  }, {
    key: "_toggleLogging",
    value: function _toggleLogging(e) {
      // Store setting in settings
      return messenger.publish('APLLog:toggle', {
        active: e.target.checked
      });
    }
  }]);
  return LogPage;
}();

new LogPage();
},{"@babel/runtime/helpers/classCallCheck":2,"@babel/runtime/helpers/createClass":3,"@babel/runtime/helpers/interopRequireDefault":4,"browser_accessors/extensionAccessor":1,"content/messagingInterface":33,"core-js/modules/es6.function.bind":25}],33:[function(require,module,exports){
"use strict";

var ContentMessenger = require('messenger/Content');

var contentMessenger = ContentMessenger.getInstance();
module.exports = contentMessenger;
},{"messenger/Content":26}]},{},[32]);
