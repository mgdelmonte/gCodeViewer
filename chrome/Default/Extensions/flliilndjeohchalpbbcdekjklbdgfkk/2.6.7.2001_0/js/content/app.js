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

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.array.index-of");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var LocalStorage =
/*#__PURE__*/
function () {
  function LocalStorage() {
    (0, _classCallCheck2.default)(this, LocalStorage);
    this._initialized = false;
    this._initializationPromise = null;
    this._storage = {};
    this._persistentStorage = chrome.storage.local;
    this._keys = [];
    this.length = 0;
  }

  (0, _createClass2.default)(LocalStorage, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;

      if (this._initializationPromise) {
        return this._initializationPromise;
      }

      this._initializationPromise = new Promise(function (resolve) {
        return _this._persistentStorage.get(null, function (storage) {
          _this._storage = storage;
          _this._keys = Object.keys(storage);

          _this._updateLength();

          _this._initialized = true;
          return resolve();
        });
      });
      return this._initializationPromise;
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      this._checkInitialization();

      var value = this._storage[key];

      if (typeof value === 'undefined') {
        value = null;
      }

      return value;
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this._checkInitialization();

      if (typeof key !== 'string') {
        throw new TypeError("item must be a string ".concat(JSON.stringify(key)));
      }

      var val = "".concat(value);

      if (this._storage[key] !== val) {
        if (!Array.from(this._keys).includes(key)) {
          this._keys.push(key);

          this._updateLength();
        }

        this._storage[key] = val;

        this._persistentStorage.set((0, _defineProperty2.default)({}, key, val));
      }
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      this._checkInitialization();

      if (this._storage[key]) {
        delete this._storage[key];

        this._persistentStorage.remove(key);

        this._keys.splice(this._keys.indexOf(key), 1);

        this._updateLength();
      }
    }
  }, {
    key: "key",
    value: function key(index) {
      this._checkInitialization();

      return this._keys[index];
    }
  }, {
    key: "_updateLength",
    value: function _updateLength() {
      this.length = this._keys.length;
    }
  }, {
    key: "_checkInitialization",
    value: function _checkInitialization() {
      if (!this._initialized) {
        throw new Error('LocalStorage accessed before initialization was completed');
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new this();
      }

      return this.instance;
    }
  }]);
  return LocalStorage;
}();

module.exports = LocalStorage;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/defineProperty":6,"@babel/runtime/helpers/interopRequireDefault":10,"core-js/modules/es6.array.from":104,"core-js/modules/es6.array.index-of":105,"core-js/modules/es6.array.iterator":106,"core-js/modules/es6.object.keys":111,"core-js/modules/es6.promise":112,"core-js/modules/es6.string.includes":118,"core-js/modules/es6.string.iterator":119,"core-js/modules/es7.array.includes":120,"core-js/modules/web.dom.iterable":122}],2:[function(require,module,exports){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
},{}],3:[function(require,module,exports){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
},{}],4:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
},{}],7:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf");

var superPropBase = require("./superPropBase");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;
},{"./getPrototypeOf":8,"./superPropBase":16}],8:[function(require,module,exports){
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
},{}],9:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
},{"./setPrototypeOf":14}],10:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
},{}],11:[function(require,module,exports){
function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
},{}],12:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;
},{}],13:[function(require,module,exports){
var _typeof = require("../helpers/typeof");

var assertThisInitialized = require("./assertThisInitialized");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
},{"../helpers/typeof":17,"./assertThisInitialized":3}],14:[function(require,module,exports){
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{}],15:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles");

var iterableToArrayLimit = require("./iterableToArrayLimit");

var nonIterableRest = require("./nonIterableRest");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
},{"./arrayWithHoles":2,"./iterableToArrayLimit":11,"./nonIterableRest":12}],16:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;
},{"./getPrototypeOf":8}],17:[function(require,module,exports){
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],18:[function(require,module,exports){
/*
 * Backbone.Subviews, v1.1.0
 * Copyright (c)2013-2017 Rotunda Software, LLC.
 * Distributed under MIT license
 * http://github.com/rotundasoftware/backbone.subviews
*/
( function( root, factory ) {
	// UMD wrapper
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( [ 'underscore', 'backbone', 'jquery' ], factory );
	} else if ( typeof exports !== 'undefined' ) {
		// Node/CommonJS
		module.exports = factory( require('underscore' ), require( 'backbone' ), require( 'backbone' ).$ );
	} else {
		// Browser globals
		factory( root._, root.Backbone, ( root.jQuery || root.Zepto || root.$ ) );
	}
}( this, function( _, Backbone, $ ) {
	Backbone.Subviews = {};

	Backbone.Subviews.add = function( view ) {
		var overriddenViewMethods = {
			render : view.render,
			remove : view.remove
		};

		// ****************** Overridden Backbone.View methods ****************** 

		view.render = function( options ) {
			var args = Array.prototype.slice.call( arguments );

			_prerender.call( this );
			var returnValue = overriddenViewMethods.render.apply( this, args );
			_postrender.call( this, args );

			return returnValue;
		};

		view.remove = function() {
			this.removeSubviews();
			return overriddenViewMethods.remove.call( this );
		};

		// ****************** Additional public methods ****************** 

		view.removeSubviews = function() {
			// Removes all subviews and cleans up references in this.subviews.
			var _this = this;

			if( this.subviews ) {
				_.each( this.subviews, function( thisSubview, thisSubviewName ) {
					thisSubview.remove();
					delete _this.subviews[ thisSubviewName ];
				} );
			}
		};

		// ****************** Additional private methods ****************** 

		view._createSubview = function( subviewName, placeHolderDiv ) {
			// Return a new subview instance given a subview name and its placeHolderDiv.
			// Implemented as instance method so that this behavior may be customized / overridden.
			var subviewCreator = this.subviewCreators[ subviewName ];
			if( _.isUndefined( subviewCreator ) ) throw new Error( "Can not find subview creator for subview named: " + subviewName );

			return subviewCreator.apply( this );
		};
	};

	// ****************** Private utility functions ****************** 

	function _prerender() {
		if( ! this.subviews ) this.subviews = {};

		// Detach each of our subviews that we have already created during previous
		// renders from the DOM, so that they do not loose their DOM events when
		// we re-render the contents of this view's DOM element.
		_.each( this.subviews, function( thisSubview ) {
			thisSubview.$el.detach();
		} );
	}

	function _postrender( renderArguments ) {
		var _this = this;
		this.subviewCreators = this.subviewCreators || {};

		// Support subviewCreators as both objects and functions.
		if( _.isFunction( this.subviewCreators ) ) this.subviewCreators = this.subviewCreators();
		
		this.$( "[data-subview]" ).each( function() {
			var thisPlaceHolderDiv = $( this );
			var subviewName = thisPlaceHolderDiv.attr( "data-subview" );
			var newSubview;

			if( _.isUndefined( _this.subviews[ subviewName ] ) ) {
				newSubview = _this._createSubview( subviewName, thisPlaceHolderDiv );
				
				if( newSubview === null ) {
					// subview creators can return null to indicate that the subview should not be created
					thisPlaceHolderDiv.remove();
					return; 
				}

				_this.subviews[ subviewName ] = newSubview;
			}
			else {
				// If the subview is already defined, then use the existing subview instead
				// of creating a new one. This allows us to re-render a parent view without
				// loosing any dynamic state data on the existing subview objects. To force
				// re-initialization of subviews, call view.removeSubviews before re-rendering.

				newSubview = _this.subviews[ subviewName ];
			}

			thisPlaceHolderDiv.replaceWith( newSubview.$el );
		} );

		if( _.isFunction( this.onSubviewsCreated ) ) this.onSubviewsCreated.call( this );
		if( _.isFunction( this._onSubviewsCreated ) ) this._onSubviewsCreated.call( this );

		// Now that all subviews have been created, render them one at a time, in the
		// order they occur in the DOM.
		_.each( this.subviews, function( thisSubview ) {
			thisSubview.render.apply( thisSubview, renderArguments );
		} );

		// Call this.onSubviewsRendered after everything is done (hook for application defined logic)
		if( _.isFunction( this.onSubviewsRendered ) ) this.onSubviewsRendered.call( this );
		if( _.isFunction( this._onSubviewsRendered ) ) this._onSubviewsRendered.call( this );
	}

	return Backbone.Subviews;
} ) );

},{"backbone":20,"underscore":151}],19:[function(require,module,exports){
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('backbone'), require('underscore'));
  } else {
    factory(window.Backbone, window._);
  }
})(function(Backbone, _) {

  // Save a reference to the original route method to be called
  // after we pave it over.
  var originalRoute = Backbone.Router.prototype.route;

  // Create a reusable no operation func for the case where a before
  // or after filter is not set. Backbone or Underscore should have
  // a global one of these in my opinion.
  var nop = function(){};

  // Extend the router prototype with a default before function,
  // a default after function, and a pave over of _bindRoutes.
  _.extend(Backbone.Router.prototype, {

    // Add default before filter.
    before: nop,

    // Add default after filter.
    after: nop,

    // Pave over Backbone.Router.prototype.route, the public method used
    // for adding routes to a router instance on the fly, and the
    // method which backbone uses internally for binding routes to handlers
    // on the Backbone.history singleton once it's instantiated.
    route: function(route, name, callback) {

      // If there is no callback present for this route, then set it to
      // be the name that was set in the routes property of the constructor,
      // or the name arguement of the route method invocation. This is what
      // Backbone.Router.route already does. We need to do it again,
      // because we are about to wrap the callback in a function that calls
      // the before and after filters as well as the original callback that
      // was passed in.
      if( !callback ){
        callback = this[ name ];
      }

      // Create a new callback to replace the original callback that calls
      // the before and after filters as well as the original callback
      // internally.
      var wrappedCallback = _.bind( function() {

        // Call the before filter and if it returns false, run the
        // route's original callback, and after filter. This allows
        // the user to return false from within the before filter
        // to prevent the original route callback and after
        // filter from running.
        var callbackArgs = [ route, _.toArray(arguments) ];
        var beforeCallback;

        if ( _.isFunction(this.before) ) {

          // If the before filter is just a single function, then call
          // it with the arguments.
          beforeCallback = this.before;
        } else if ( typeof this.before[route] !== "undefined" ) {

          // otherwise, find the appropriate callback for the route name
          // and call that.
          beforeCallback = this.before[route];
        } else {

          // otherwise, if we have a hash of routes, but no before callback
          // for this route, just use a nop function.
          beforeCallback = nop;
        }

        // If the before callback fails during its execusion (by returning)
        // false, then do not proceed with the route triggering.
        if ( beforeCallback.apply(this, callbackArgs) === false ) {
          return;
        }

        // If the callback exists, then call it. This means that the before
        // and after filters will be called whether or not an actual
        // callback function is supplied to handle a given route.
        if( callback ) {
          callback.apply( this, arguments );
        }

        var afterCallback;
        if ( _.isFunction(this.after) ) {

          // If the after filter is a single funciton, then call it with
          // the proper arguments.
          afterCallback = this.after;

        } else if ( typeof this.after[route] !== "undefined" ) {

          // otherwise if we have a hash of routes, call the appropriate
          // callback based on the route name.
          afterCallback = this.after[route];

        } else {

          // otherwise, if we have a has of routes but no after callback
          // for this route, just use the nop function.
          afterCallback = nop;
        }

        // Call the after filter.
        afterCallback.apply( this, callbackArgs );

      }, this);

      // Call our original route, replacing the callback that was originally
      // passed in when Backbone.Router.route was invoked with our wrapped
      // callback that calls the before and after callbacks as well as the
      // original callback.
      return originalRoute.call( this, route, name, wrappedCallback );
    }

  });

});

},{"backbone":20,"underscore":151}],20:[function(require,module,exports){
(function (global){
//     Backbone.js 1.3.3

//     (c) 2010-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(factory) {

  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
  // We use `self` instead of `window` for `WebWorker` support.
  var root = (typeof self == 'object' && self.self === self && self) ||
            (typeof global == 'object' && global.global === global && global);

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore'), $;
    try { $ = require('jquery'); } catch (e) {}
    factory(root, exports, _, $);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

})(function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to a common array method we'll want to use later.
  var slice = Array.prototype.slice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.3.3';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... this will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Proxy Backbone class methods to Underscore functions, wrapping the model's
  // `attributes` object or collection's `models` array behind the scenes.
  //
  // collection.filter(function(model) { return model.get('age') > 10 });
  // collection.each(this.addView);
  //
  // `Function#apply` can be slow so we use the method's arg count, if we know it.
  var addMethod = function(length, method, attribute) {
    switch (length) {
      case 1: return function() {
        return _[method](this[attribute]);
      };
      case 2: return function(value) {
        return _[method](this[attribute], value);
      };
      case 3: return function(iteratee, context) {
        return _[method](this[attribute], cb(iteratee, this), context);
      };
      case 4: return function(iteratee, defaultVal, context) {
        return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
      };
      default: return function() {
        var args = slice.call(arguments);
        args.unshift(this[attribute]);
        return _[method].apply(_, args);
      };
    }
  };
  var addUnderscoreMethods = function(Class, methods, attribute) {
    _.each(methods, function(length, method) {
      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
    });
  };

  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
  var cb = function(iteratee, instance) {
    if (_.isFunction(iteratee)) return iteratee;
    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
    if (_.isString(iteratee)) return function(model) { return model.get(iteratee); };
    return iteratee;
  };
  var modelMatcher = function(attrs) {
    var matcher = _.matches(attrs);
    return function(model) {
      return matcher(model.attributes);
    };
  };

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // a custom event channel. You may bind a callback to an event with `on` or
  // remove with `off`; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {};

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Iterates over the standard `event, callback` (as well as the fancy multiple
  // space-separated events `"change blur", callback` and jQuery-style event
  // maps `{event: callback}`).
  var eventsApi = function(iteratee, events, name, callback, opts) {
    var i = 0, names;
    if (name && typeof name === 'object') {
      // Handle event maps.
      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
      for (names = _.keys(name); i < names.length ; i++) {
        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
      }
    } else if (name && eventSplitter.test(name)) {
      // Handle space-separated event names by delegating them individually.
      for (names = name.split(eventSplitter); i < names.length; i++) {
        events = iteratee(events, names[i], callback, opts);
      }
    } else {
      // Finally, standard events.
      events = iteratee(events, name, callback, opts);
    }
    return events;
  };

  // Bind an event to a `callback` function. Passing `"all"` will bind
  // the callback to all events fired.
  Events.on = function(name, callback, context) {
    return internalOn(this, name, callback, context);
  };

  // Guard the `listening` argument from the public API.
  var internalOn = function(obj, name, callback, context, listening) {
    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
      context: context,
      ctx: obj,
      listening: listening
    });

    if (listening) {
      var listeners = obj._listeners || (obj._listeners = {});
      listeners[listening.id] = listening;
    }

    return obj;
  };

  // Inversion-of-control versions of `on`. Tell *this* object to listen to
  // an event in another object... keeping track of what it's listening to
  // for easier unbinding later.
  Events.listenTo = function(obj, name, callback) {
    if (!obj) return this;
    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var listening = listeningTo[id];

    // This object is not listening to any other events on `obj` yet.
    // Setup the necessary references to track the listening callbacks.
    if (!listening) {
      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
      listening = listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0};
    }

    // Bind callbacks on obj, and keep track of them on listening.
    internalOn(obj, name, callback, this, listening);
    return this;
  };

  // The reducing API that adds a callback to the `events` object.
  var onApi = function(events, name, callback, options) {
    if (callback) {
      var handlers = events[name] || (events[name] = []);
      var context = options.context, ctx = options.ctx, listening = options.listening;
      if (listening) listening.count++;

      handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});
    }
    return events;
  };

  // Remove one or many callbacks. If `context` is null, removes all
  // callbacks with that function. If `callback` is null, removes all
  // callbacks for the event. If `name` is null, removes all bound
  // callbacks for all events.
  Events.off = function(name, callback, context) {
    if (!this._events) return this;
    this._events = eventsApi(offApi, this._events, name, callback, {
      context: context,
      listeners: this._listeners
    });
    return this;
  };

  // Tell this object to stop listening to either specific events ... or
  // to every object it's currently listening to.
  Events.stopListening = function(obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;

    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

    for (var i = 0; i < ids.length; i++) {
      var listening = listeningTo[ids[i]];

      // If listening doesn't exist, this object is not currently
      // listening to obj. Break out early.
      if (!listening) break;

      listening.obj.off(name, callback, this);
    }

    return this;
  };

  // The reducing API that removes a callback from the `events` object.
  var offApi = function(events, name, callback, options) {
    if (!events) return;

    var i = 0, listening;
    var context = options.context, listeners = options.listeners;

    // Delete all events listeners and "drop" events.
    if (!name && !callback && !context) {
      var ids = _.keys(listeners);
      for (; i < ids.length; i++) {
        listening = listeners[ids[i]];
        delete listeners[listening.id];
        delete listening.listeningTo[listening.objId];
      }
      return;
    }

    var names = name ? [name] : _.keys(events);
    for (; i < names.length; i++) {
      name = names[i];
      var handlers = events[name];

      // Bail out if there are no events stored.
      if (!handlers) break;

      // Replace events if there are any remaining.  Otherwise, clean up.
      var remaining = [];
      for (var j = 0; j < handlers.length; j++) {
        var handler = handlers[j];
        if (
          callback && callback !== handler.callback &&
            callback !== handler.callback._callback ||
              context && context !== handler.context
        ) {
          remaining.push(handler);
        } else {
          listening = handler.listening;
          if (listening && --listening.count === 0) {
            delete listeners[listening.id];
            delete listening.listeningTo[listening.objId];
          }
        }
      }

      // Update tail event if the list has any events.  Otherwise, clean up.
      if (remaining.length) {
        events[name] = remaining;
      } else {
        delete events[name];
      }
    }
    return events;
  };

  // Bind an event to only be triggered a single time. After the first time
  // the callback is invoked, its listener will be removed. If multiple events
  // are passed in using the space-separated syntax, the handler will fire
  // once for each event, not once for a combination of all events.
  Events.once = function(name, callback, context) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
    if (typeof name === 'string' && context == null) callback = void 0;
    return this.on(events, callback, context);
  };

  // Inversion-of-control versions of `once`.
  Events.listenToOnce = function(obj, name, callback) {
    // Map the event into a `{event: once}` object.
    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
    return this.listenTo(obj, events);
  };

  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
  // `offer` unbinds the `onceWrapper` after it has been called.
  var onceMap = function(map, name, callback, offer) {
    if (callback) {
      var once = map[name] = _.once(function() {
        offer(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
    }
    return map;
  };

  // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as `trigger` is, apart from the event name
  // (unless you're listening on `"all"`, which will cause your callback to
  // receive the true name of the event as the first argument).
  Events.trigger = function(name) {
    if (!this._events) return this;

    var length = Math.max(0, arguments.length - 1);
    var args = Array(length);
    for (var i = 0; i < length; i++) args[i] = arguments[i + 1];

    eventsApi(triggerApi, this._events, name, void 0, args);
    return this;
  };

  // Handles triggering the appropriate event callbacks.
  var triggerApi = function(objEvents, name, callback, args) {
    if (objEvents) {
      var events = objEvents[name];
      var allEvents = objEvents.all;
      if (events && allEvents) allEvents = allEvents.slice();
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, [name].concat(args));
    }
    return objEvents;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    var defaults = _.result(this, 'defaults');
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // The prefix is used to create the client id which is used to identify models locally.
    // You may want to override this if you're experiencing name clashes with model ids.
    cidPrefix: 'c',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Special-cased proxy to underscore's `_.matches` method.
    matches: function(attrs) {
      return !!_.iteratee(attrs, this)(this.attributes);
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      var unset      = options.unset;
      var silent     = options.silent;
      var changes    = [];
      var changing   = this._changing;
      this._changing = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }

      var current = this.attributes;
      var changed = this.changed;
      var prev    = this._previousAttributes;

      // For each `set` attribute, update or delete the current value.
      for (var attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          changed[attr] = val;
        } else {
          delete changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Update the `id`.
      if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0; i < changes.length; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      var changed = {};
      for (var attr in diff) {
        var val = diff[attr];
        if (_.isEqual(old[attr], val)) continue;
        changed[attr] = val;
      }
      return _.size(changed) ? changed : false;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server, merging the response with the model's
    // local attributes. Any changed attributes will trigger a "change" event.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (!model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      // Handle both `"key", value` and `{key: value}` -style arguments.
      var attrs;
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true, parse: true}, options);
      var wait = options.wait;

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !wait) {
        if (!this.set(attrs, options)) return false;
      } else if (!this._validate(attrs, options)) {
        return false;
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      var attributes = this.attributes;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
        if (serverAttrs && !model.set(serverAttrs, options)) return false;
        if (success) success.call(options.context, model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      // Set temporary attributes if `{wait: true}` to properly find new ids.
      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch' && !options.attrs) options.attrs = attrs;
      var xhr = this.sync(method, this, options);

      // Restore attributes.
      this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;
      var wait = options.wait;

      var destroy = function() {
        model.stopListening();
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (wait) destroy();
        if (success) success.call(options.context, model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      var xhr = false;
      if (this.isNew()) {
        _.defer(options.success);
      } else {
        wrapError(this, options);
        xhr = this.sync('delete', this, options);
      }
      if (!wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      var id = this.get(this.idAttribute);
      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend({}, options, {validate: true}));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model, mapped to the
  // number of arguments they take.
  var modelMethods = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
      omit: 0, chain: 1, isEmpty: 1};

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  addUnderscoreMethods(Model, modelMethods, 'attributes');

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analogous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Splices `insert` into `array` at index `at`.
  var splice = function(array, insert, at) {
    at = Math.min(Math.max(at, 0), array.length);
    var tail = Array(array.length - at);
    var length = insert.length;
    var i;
    for (i = 0; i < tail.length; i++) tail[i] = array[i + at];
    for (i = 0; i < length; i++) array[i + at] = insert[i];
    for (i = 0; i < tail.length; i++) array[i + length + at] = tail[i];
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model) { return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set. `models` may be Backbone
    // Models or raw JavaScript objects to be converted to Models, or any
    // combination of the two.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      options = _.extend({}, options);
      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();
      var removed = this._removeModels(models, options);
      if (!options.silent && removed.length) {
        options.changes = {added: [], merged: [], removed: removed};
        this.trigger('update', this, options);
      }
      return singular ? removed[0] : removed;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      if (models == null) return;

      options = _.extend({}, setOptions, options);
      if (options.parse && !this._isModel(models)) {
        models = this.parse(models, options) || [];
      }

      var singular = !_.isArray(models);
      models = singular ? [models] : models.slice();

      var at = options.at;
      if (at != null) at = +at;
      if (at > this.length) at = this.length;
      if (at < 0) at += this.length + 1;

      var set = [];
      var toAdd = [];
      var toMerge = [];
      var toRemove = [];
      var modelMap = {};

      var add = options.add;
      var merge = options.merge;
      var remove = options.remove;

      var sort = false;
      var sortable = this.comparator && at == null && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      var model, i;
      for (i = 0; i < models.length; i++) {
        model = models[i];

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        var existing = this.get(model);
        if (existing) {
          if (merge && model !== existing) {
            var attrs = this._isModel(model) ? model.attributes : model;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            toMerge.push(existing);
            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
          }
          if (!modelMap[existing.cid]) {
            modelMap[existing.cid] = true;
            set.push(existing);
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(model, options);
          if (model) {
            toAdd.push(model);
            this._addReference(model, options);
            modelMap[model.cid] = true;
            set.push(model);
          }
        }
      }

      // Remove stale models.
      if (remove) {
        for (i = 0; i < this.length; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) toRemove.push(model);
        }
        if (toRemove.length) this._removeModels(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      var orderChanged = false;
      var replace = !sortable && add && remove;
      if (set.length && replace) {
        orderChanged = this.length !== set.length || _.some(this.models, function(m, index) {
          return m !== set[index];
        });
        this.models.length = 0;
        splice(this.models, set, 0);
        this.length = this.models.length;
      } else if (toAdd.length) {
        if (sortable) sort = true;
        splice(this.models, toAdd, at == null ? this.length : at);
        this.length = this.models.length;
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort/update events.
      if (!options.silent) {
        for (i = 0; i < toAdd.length; i++) {
          if (at != null) options.index = at + i;
          model = toAdd[i];
          model.trigger('add', model, this, options);
        }
        if (sort || orderChanged) this.trigger('sort', this, options);
        if (toAdd.length || toRemove.length || toMerge.length) {
          options.changes = {
            added: toAdd,
            removed: toRemove,
            merged: toMerge
          };
          this.trigger('update', this, options);
        }
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options = options ? _.clone(options) : {};
      for (var i = 0; i < this.models.length; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      return this.remove(model, options);
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      return this.remove(model, options);
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id, cid, model object with id or cid
    // properties, or an attributes object that is transformed through modelId.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] ||
        this._byId[this.modelId(obj.attributes || obj)] ||
        obj.cid && this._byId[obj.cid];
    },

    // Returns `true` if the model is in the collection.
    has: function(obj) {
      return this.get(obj) != null;
    },

    // Get the model at the given index.
    at: function(index) {
      if (index < 0) index += this.length;
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      return this[first ? 'find' : 'filter'](attrs);
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      var comparator = this.comparator;
      if (!comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      var length = comparator.length;
      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

      // Run sort based on type of `comparator`.
      if (length === 1 || _.isString(comparator)) {
        this.models = this.sortBy(comparator);
      } else {
        this.models.sort(comparator);
      }
      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return this.map(attr + '');
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = _.extend({parse: true}, options);
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success.call(options.context, collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      var wait = options.wait;
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(m, resp, callbackOpts) {
        if (wait) collection.add(m, callbackOpts);
        if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models, {
        model: this.model,
        comparator: this.comparator
      });
    },

    // Define how to uniquely identify models in the collection.
    modelId: function(attrs) {
      return attrs[this.model.prototype.idAttribute || 'id'];
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (this._isModel(attrs)) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method called by both remove and set.
    _removeModels: function(models, options) {
      var removed = [];
      for (var i = 0; i < models.length; i++) {
        var model = this.get(models[i]);
        if (!model) continue;

        var index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;

        // Remove references before triggering 'remove' event to prevent an
        // infinite loop. #3693
        delete this._byId[model.cid];
        var id = this.modelId(model.attributes);
        if (id != null) delete this._byId[id];

        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }

        removed.push(model);
        this._removeReference(model, options);
      }
      return removed;
    },

    // Method for checking whether an object should be considered a model for
    // the purposes of adding to the collection.
    _isModel: function(model) {
      return model instanceof Model;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      var id = this.modelId(model.attributes);
      if (id != null) this._byId[id] = model;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      delete this._byId[model.cid];
      var id = this.modelId(model.attributes);
      if (id != null) delete this._byId[id];
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if (model) {
        if ((event === 'add' || event === 'remove') && collection !== this) return;
        if (event === 'destroy') this.remove(model, options);
        if (event === 'change') {
          var prevId = this.modelId(model.previousAttributes());
          var id = this.modelId(model.attributes);
          if (prevId !== id) {
            if (prevId != null) delete this._byId[prevId];
            if (id != null) this._byId[id] = model;
          }
        }
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var collectionMethods = {forEach: 3, each: 3, map: 3, collect: 3, reduce: 0,
      foldl: 0, inject: 0, reduceRight: 0, foldr: 0, find: 3, detect: 3, filter: 3,
      select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
      contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
      head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
      without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
      isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
      sortBy: 3, indexBy: 3, findIndex: 3, findLastIndex: 3};

  // Mix in each Underscore method as a proxy to `Collection#models`.
  addUnderscoreMethods(Collection, collectionMethods, 'models');

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be set as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this._removeElement();
      this.stopListening();
      return this;
    },

    // Remove this view's element from the document and all event listeners
    // attached to it. Exposed for subclasses using an alternative DOM
    // manipulation API.
    _removeElement: function() {
      this.$el.remove();
    },

    // Change the view's element (`this.el` property) and re-delegate the
    // view's events on the new element.
    setElement: function(element) {
      this.undelegateEvents();
      this._setElement(element);
      this.delegateEvents();
      return this;
    },

    // Creates the `this.el` and `this.$el` references for this view using the
    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
    // context or an element. Subclasses can override this to utilize an
    // alternative DOM manipulation API and are only required to set the
    // `this.el` property.
    _setElement: function(el) {
      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
      this.el = this.$el[0];
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    delegateEvents: function(events) {
      events || (events = _.result(this, 'events'));
      if (!events) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[method];
        if (!method) continue;
        var match = key.match(delegateEventSplitter);
        this.delegate(match[1], match[2], _.bind(method, this));
      }
      return this;
    },

    // Add a single event listener to the view's element (or a child element
    // using `selector`). This only works for delegate-able events: not `focus`,
    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
    delegate: function(eventName, selector, listener) {
      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
    },

    // Clears all callbacks previously bound to the view by `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // A finer-grained `undelegateEvents` for removing a single delegated event.
    // `selector` and `listener` are both optional.
    undelegate: function(eventName, selector, listener) {
      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
    },

    // Produces a DOM element to be assigned to your view. Exposed for
    // subclasses using an alternative DOM manipulation API.
    _createElement: function(tagName) {
      return document.createElement(tagName);
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this._createElement(_.result(this, 'tagName')));
        this._setAttributes(attrs);
      } else {
        this.setElement(_.result(this, 'el'));
      }
    },

    // Set attributes from a hash on this view's element.  Exposed for
    // subclasses using an alternative DOM manipulation API.
    _setAttributes: function(attributes) {
      this.$el.attr(attributes);
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // Pass along `textStatus` and `errorThrown` from jQuery.
    var error = options.error;
    options.error = function(xhr, textStatus, errorThrown) {
      options.textStatus = textStatus;
      options.errorThrown = errorThrown;
      if (error) error.call(options.context, xhr, textStatus, errorThrown);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch': 'PATCH',
    'delete': 'DELETE',
    'read': 'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args, name) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    this.checkUrl = _.bind(this.checkUrl, this);

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
      return path === this.root && !this.getSearch();
    },

    // Does the pathname match the root?
    matchRoot: function() {
      var path = this.decodeFragment(this.location.pathname);
      var rootPath = path.slice(0, this.root.length - 1) + '/';
      return rootPath === this.root;
    },

    // Unicode characters in `location.pathname` are percent encoded so they're
    // decoded for comparison. `%25` should not be decoded since it may be part
    // of an encoded parameter.
    decodeFragment: function(fragment) {
      return decodeURI(fragment.replace(/%25/g, '%2525'));
    },

    // In IE6, the hash fragment and search params are incorrect if the
    // fragment contains `?`.
    getSearch: function() {
      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
      return match ? match[0] : '';
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the pathname and search params, without the root.
    getPath: function() {
      var path = this.decodeFragment(
        this.location.pathname + this.getSearch()
      ).slice(this.root.length - 1);
      return path.charAt(0) === '/' ? path.slice(1) : path;
    },

    // Get the cross-browser normalized URL fragment from the path or hash.
    getFragment: function(fragment) {
      if (fragment == null) {
        if (this._usePushState || !this._wantsHashChange) {
          fragment = this.getPath();
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error('Backbone.history has already been started');
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._hasHashChange   = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
      this._useHashChange   = this._wantsHashChange && this._hasHashChange;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.history && this.history.pushState);
      this._usePushState    = this._wantsPushState && this._hasPushState;
      this.fragment         = this.getFragment();

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          var rootPath = this.root.slice(0, -1) || '/';
          this.location.replace(rootPath + '#' + this.getPath());
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot()) {
          this.navigate(this.getHash(), {replace: true});
        }

      }

      // Proxy an iframe to handle location events if the browser doesn't
      // support the `hashchange` event, HTML5 history, or the user wants
      // `hashChange` but not `pushState`.
      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
        this.iframe = document.createElement('iframe');
        this.iframe.src = 'javascript:0';
        this.iframe.style.display = 'none';
        this.iframe.tabIndex = -1;
        var body = document.body;
        // Using `appendChild` will throw on IE < 9 if the document is not ready.
        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
        iWindow.document.open();
        iWindow.document.close();
        iWindow.location.hash = '#' + this.fragment;
      }

      // Add a cross-platform `addEventListener` shim for older browsers.
      var addEventListener = window.addEventListener || function(eventName, listener) {
        return attachEvent('on' + eventName, listener);
      };

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._usePushState) {
        addEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        addEventListener('hashchange', this.checkUrl, false);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      // Add a cross-platform `removeEventListener` shim for older browsers.
      var removeEventListener = window.removeEventListener || function(eventName, listener) {
        return detachEvent('on' + eventName, listener);
      };

      // Remove window listeners.
      if (this._usePushState) {
        removeEventListener('popstate', this.checkUrl, false);
      } else if (this._useHashChange && !this.iframe) {
        removeEventListener('hashchange', this.checkUrl, false);
      }

      // Clean up the iframe if necessary.
      if (this.iframe) {
        document.body.removeChild(this.iframe);
        this.iframe = null;
      }

      // Some environments will throw when clearing an undefined interval.
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();

      // If the user pressed the back button, the iframe's hash will have
      // changed and we should use that for comparison.
      if (current === this.fragment && this.iframe) {
        current = this.getHash(this.iframe.contentWindow);
      }

      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      // If the root doesn't match, no routes can match either.
      if (!this.matchRoot()) return false;
      fragment = this.fragment = this.getFragment(fragment);
      return _.some(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      // Normalize the fragment.
      fragment = this.getFragment(fragment || '');

      // Don't include a trailing slash on the root.
      var rootPath = this.root;
      if (fragment === '' || fragment.charAt(0) === '?') {
        rootPath = rootPath.slice(0, -1) || '/';
      }
      var url = rootPath + fragment;

      // Strip the hash and decode for matching.
      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._usePushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
          var iWindow = this.iframe.contentWindow;

          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if (!options.replace) {
            iWindow.document.open();
            iWindow.document.close();
          }

          this._updateHash(iWindow.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function and add the prototype properties.
    child.prototype = _.create(parent.prototype, protoProps);
    child.prototype.constructor = child;

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error.call(options.context, model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"jquery":"jquery","underscore":151}],21:[function(require,module,exports){
/* Ciuvo Addon SDK 2.1.3 | (c) 2011-2017 Ciuvo GmbH CIUVO CONFIDENTIAL All Rights Reserved.
NOTICE: All information contained herein is, and remains the property of  Ciuvo GmbH and its suppliers, if any. The intellectual and technical  concepts contained herein are proprietary to Ciuvo GmbH and its suppliers  and may be covered by U.S. and Foreign Patents, patents in process, and are  protected by trade secret or copyright law. Dissemination of this information  or reproduction of this material is strictly forbidden unless prior written  permission is obtained from Ciuvo GmbH.
Copyright 2011-2017 Ciuvo GmbH. Contact support@ciuvo.com for more details.

Includes Sizzle | (c) JS Foundation and other contributors | https://js.foundation/
Includes requirejs/almond | (c) jQuery Foundation and other contributors  | https://github.com/requirejs/almond/blob/master/LICENSE
Includes json2.js | http://www.JSON.org/js.html */
!function(t,e){t.ciuvoSDK=e()}(this,function(){var t,e,r;return function(n){function i(t,e){return b.call(t,e)}function o(t,e){var r,n,i,o,u,s,a,c,l,f,p,h,d=e&&e.split("/"),v=y.map,g=v&&v["*"]||{};if(t){for(t=t.split("/"),u=t.length-1,y.nodeIdCompat&&x.test(t[u])&&(t[u]=t[u].replace(x,"")),"."===t[0].charAt(0)&&d&&(h=d.slice(0,d.length-1),t=h.concat(t)),l=0;l<t.length;l++)if(p=t[l],"."===p)t.splice(l,1),l-=1;else if(".."===p){if(0===l||1===l&&".."===t[2]||".."===t[l-1])continue;l>0&&(t.splice(l-1,2),l-=2)}t=t.join("/")}if((d||g)&&v){for(r=t.split("/"),l=r.length;l>0;l-=1){if(n=r.slice(0,l).join("/"),d)for(f=d.length;f>0;f-=1)if(i=v[d.slice(0,f).join("/")],i&&(i=i[n])){o=i,s=l;break}if(o)break;!a&&g&&g[n]&&(a=g[n],c=l)}!o&&a&&(o=a,s=c),o&&(r.splice(0,s,o),t=r.join("/"))}return t}function u(t,e){return function(){var r=A.call(arguments,0);return"string"!=typeof r[0]&&1===r.length&&r.push(null),h.apply(n,r.concat([t,e]))}}function s(t){return function(e){return o(e,t)}}function a(t){return function(e){g[t]=e}}function c(t){if(i(m,t)){var e=m[t];delete m[t],w[t]=!0,p.apply(n,e)}if(!i(g,t)&&!i(w,t))throw new Error("No "+t);return g[t]}function l(t){var e,r=t?t.indexOf("!"):-1;return r>-1&&(e=t.substring(0,r),t=t.substring(r+1,t.length)),[e,t]}function f(t){return function(){return y&&y.config&&y.config[t]||{}}}var p,h,d,v,g={},m={},y={},w={},b=Object.prototype.hasOwnProperty,A=[].slice,x=/\.js$/;d=function(t,e){var r,n=l(t),i=n[0];return t=n[1],i&&(i=o(i,e),r=c(i)),i?t=r&&r.normalize?r.normalize(t,s(e)):o(t,e):(t=o(t,e),n=l(t),i=n[0],t=n[1],i&&(r=c(i))),{f:i?i+"!"+t:t,n:t,pr:i,p:r}},v={require:function(t){return u(t)},exports:function(t){var e=g[t];return"undefined"!=typeof e?e:g[t]={}},module:function(t){return{id:t,uri:"",exports:g[t],config:f(t)}}},p=function(t,e,r,o){var s,l,f,p,h,y,b=[],A=typeof r;if(o=o||t,"undefined"===A||"function"===A){for(e=!e.length&&r.length?["require","exports","module"]:e,h=0;h<e.length;h+=1)if(p=d(e[h],o),l=p.f,"require"===l)b[h]=v.require(t);else if("exports"===l)b[h]=v.exports(t),y=!0;else if("module"===l)s=b[h]=v.module(t);else if(i(g,l)||i(m,l)||i(w,l))b[h]=c(l);else{if(!p.p)throw new Error(t+" missing "+l);p.p.load(p.n,u(o,!0),a(l),{}),b[h]=g[l]}f=r?r.apply(g[t],b):void 0,t&&(s&&s.exports!==n&&s.exports!==g[t]?g[t]=s.exports:f===n&&y||(g[t]=f))}else t&&(g[t]=r)},t=e=h=function(t,e,r,i,o){if("string"==typeof t)return v[t]?v[t](e):c(d(t,e).f);if(!t.splice){if(y=t,y.deps&&h(y.deps,y.callback),!e)return;e.splice?(t=e,e=r,r=null):t=n}return e=e||function(){},"function"==typeof r&&(r=i,i=o),i?p(n,t,e,r):setTimeout(function(){p(n,t,e,r)},4),h},h.config=function(t){return h(t)},t._defined=g,r=function(t,e,r){if("string"!=typeof t)throw new Error("See almond README: incorrect module build, no module name");e.splice||(r=e,e=[]),i(g,t)||i(m,t)||(m[t]=[t,e,r])},r.amd={jQuery:!0}}(),r("constants",{version:"2.1.3",base_url:"https://api.ciuvo.com/api/",media_host_url:"https://ciuvo.com/",get_url:function(t,e){switch(t){case"api":return e.base_url||this.base_url;case"storage":return(e.media_host_url||this.media_host_url)+"ciuvo/globalstorage";case"bundle":return(e.media_host_url||this.media_host_url)+"ciuvo/templates/";case"media":return e.media_host_url||this.media_host_url;case"analyze":return(e.base_url||this.base_url)+"analyze";case"voucher":return(e.base_url||this.base_url)+"voucher";case"whitelist":return(e.base_url||this.base_url)+"whitelist";default:throw"invalid url specifier"}}}),r("cslparser",[],function(){"use strict";function t(t,e){function r(){this.constructor=t}r.prototype=e.prototype,t.prototype=new r}function e(t,r,n,i){this.message=t,this.expected=r,this.found=n,this.location=i,this.name="SyntaxError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(this,e)}function r(t){function r(e){var r,n,i=Hi[e];if(i)return i;for(r=e-1;!Hi[r];)r--;for(i=Hi[r],i={line:i.line,column:i.column,seenCR:i.seenCR};e>r;)n=t.charAt(r),"\n"===n?(i.seenCR||i.line++,i.column=1,i.seenCR=!1):"\r"===n||"\u2028"===n||"\u2029"===n?(i.line++,i.column=1,i.seenCR=!0):(i.column++,i.seenCR=!1),r++;return Hi[e]=i,i}function n(t,e){var n=r(t),i=r(e);return{start:{offset:t,line:n.line,column:n.column},end:{offset:e,line:i.line,column:i.column}}}function i(t){zi>Pi||(Pi>zi&&(zi=Pi,$i=[]),$i.push(t))}function o(t,r,n,i){function o(t){var e=1;for(t.sort(function(t,e){return t.description<e.description?-1:t.description>e.description?1:0});e<t.length;)t[e-1]===t[e]?t.splice(e,1):e++}function u(t,e){function r(t){function e(t){return t.charCodeAt(0).toString(16).toUpperCase()}return t.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g,function(t){return"\\x0"+e(t)}).replace(/[\x10-\x1F\x80-\xFF]/g,function(t){return"\\x"+e(t)}).replace(/[\u0100-\u0FFF]/g,function(t){return"\\u0"+e(t)}).replace(/[\u1000-\uFFFF]/g,function(t){return"\\u"+e(t)})}var n,i,o,u=new Array(t.length);for(o=0;o<t.length;o++)u[o]=t[o].description;return n=t.length>1?u.slice(0,-1).join(", ")+" or "+u[t.length-1]:u[0],i=e?'"'+r(e)+'"':"end of input","Expected "+n+" but "+i+" found."}return null!==r&&o(r),new e(null!==t?t:u(r,n),r,n,i)}function u(){var t,e,r,n;return t=Pi,e=b(),e!==Xt?(r=Mt(),r!==Xt?(n=b(),n!==Xt?(Mi=t,e=Wt(r),t=e):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt),t}function s(){var e;return t.length>Pi?(e=t.charAt(Pi),Pi++):(e=Xt,0===Vi&&i(Qt)),e}function a(){var e,r;return Vi++,te.test(t.charAt(Pi))?(e=t.charAt(Pi),Pi++):(e=Xt,0===Vi&&i(ee)),e===Xt&&(e=g()),Vi--,e===Xt&&(r=Xt,0===Vi&&i(Yt)),e}function c(){var e;return re.test(t.charAt(Pi))?(e=t.charAt(Pi),Pi++):(e=Xt,0===Vi&&i(ne)),e}function l(){var e,r;return Vi++,10===t.charCodeAt(Pi)?(e=oe,Pi++):(e=Xt,0===Vi&&i(ue)),e===Xt&&(t.substr(Pi,2)===se?(e=se,Pi+=2):(e=Xt,0===Vi&&i(ae)),e===Xt&&(13===t.charCodeAt(Pi)?(e=ce,Pi++):(e=Xt,0===Vi&&i(le)),e===Xt&&(8232===t.charCodeAt(Pi)?(e=fe,Pi++):(e=Xt,0===Vi&&i(pe)),e===Xt&&(8233===t.charCodeAt(Pi)?(e=he,
Pi++):(e=Xt,0===Vi&&i(de)))))),Vi--,e===Xt&&(r=Xt,0===Vi&&i(ie)),e}function f(){var t,e;return Vi++,t=p(),t===Xt&&(t=d()),Vi--,t===Xt&&(e=Xt,0===Vi&&i(ve)),t}function p(){var e,r,n,o,u,a;if(e=Pi,t.substr(Pi,2)===ge?(r=ge,Pi+=2):(r=Xt,0===Vi&&i(me)),r!==Xt){for(n=[],o=Pi,u=Pi,Vi++,t.substr(Pi,2)===ye?(a=ye,Pi+=2):(a=Xt,0===Vi&&i(we)),Vi--,a===Xt?u=void 0:(Pi=u,u=Xt),u!==Xt?(a=s(),a!==Xt?(u=[u,a],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt);o!==Xt;)n.push(o),o=Pi,u=Pi,Vi++,t.substr(Pi,2)===ye?(a=ye,Pi+=2):(a=Xt,0===Vi&&i(we)),Vi--,a===Xt?u=void 0:(Pi=u,u=Xt),u!==Xt?(a=s(),a!==Xt?(u=[u,a],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt);n!==Xt?(t.substr(Pi,2)===ye?(o=ye,Pi+=2):(o=Xt,0===Vi&&i(we)),o!==Xt?(r=[r,n,o],e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)}else Pi=e,e=Xt;return e}function h(){var e,r,n,o,u,a;if(e=Pi,t.substr(Pi,2)===ge?(r=ge,Pi+=2):(r=Xt,0===Vi&&i(me)),r!==Xt){for(n=[],o=Pi,u=Pi,Vi++,t.substr(Pi,2)===ye?(a=ye,Pi+=2):(a=Xt,0===Vi&&i(we)),a===Xt&&(a=c()),Vi--,a===Xt?u=void 0:(Pi=u,u=Xt),u!==Xt?(a=s(),a!==Xt?(u=[u,a],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt);o!==Xt;)n.push(o),o=Pi,u=Pi,Vi++,t.substr(Pi,2)===ye?(a=ye,Pi+=2):(a=Xt,0===Vi&&i(we)),a===Xt&&(a=c()),Vi--,a===Xt?u=void 0:(Pi=u,u=Xt),u!==Xt?(a=s(),a!==Xt?(u=[u,a],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt);n!==Xt?(t.substr(Pi,2)===ye?(o=ye,Pi+=2):(o=Xt,0===Vi&&i(we)),o!==Xt?(r=[r,n,o],e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)}else Pi=e,e=Xt;return e}function d(){var e,r,n,o,u,a;if(e=Pi,t.substr(Pi,2)===be?(r=be,Pi+=2):(r=Xt,0===Vi&&i(Ae)),r!==Xt){for(n=[],o=Pi,u=Pi,Vi++,a=c(),Vi--,a===Xt?u=void 0:(Pi=u,u=Xt),u!==Xt?(a=s(),a!==Xt?(u=[u,a],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt);o!==Xt;)n.push(o),o=Pi,u=Pi,Vi++,a=c(),Vi--,a===Xt?u=void 0:(Pi=u,u=Xt),u!==Xt?(a=s(),a!==Xt?(u=[u,a],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt);n!==Xt?(r=[r,n],e=r):(Pi=e,e=Xt)}else Pi=e,e=Xt;return e}function v(){var e;return 36===t.charCodeAt(Pi)?(e=xe,Pi++):(e=Xt,0===Vi&&i(Ce)),e}function g(){var e;return _e.test(t.charAt(Pi))?(e=t.charAt(Pi),Pi++):(e=Xt,0===Vi&&i(Ee)),e}function m(){var e,r,n,o;return e=Pi,r=w(),r!==Xt?(n=l(),n!==Xt?(r=[r,n],e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=Pi,r=w(),r!==Xt?(n=Pi,Vi++,125===t.charCodeAt(Pi)?(o=Se,Pi++):(o=Xt,0===Vi&&i(Ne)),Vi--,o!==Xt?(Pi=n,n=void 0):n=Xt,n!==Xt?(r=[r,n],e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=Pi,r=b(),r!==Xt?(n=y(),n!==Xt?(r=[r,n],e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt))),e}function y(){var e,r;return e=Pi,Vi++,t.length>Pi?(r=t.charAt(Pi),Pi++):(r=Xt,0===Vi&&i(Qt)),Vi--,r===Xt?e=void 0:(Pi=e,e=Xt),e}function w(){var t,e;for(t=[],e=a(),e===Xt&&(e=h(),e===Xt&&(e=d()));e!==Xt;)t.push(e),e=a(),e===Xt&&(e=h(),e===Xt&&(e=d()));return t}function b(){var t,e;for(t=[],e=a(),e===Xt&&(e=l(),e===Xt&&(e=f()));e!==Xt;)t.push(e),e=a(),e===Xt&&(e=l(),e===Xt&&(e=f()));return t}function A(){var t,e;return Vi++,t=x(),t===Xt&&(t=T(),t===Xt&&(t=L(),t===Xt&&(t=O(),t===Xt&&(t=S(),t===Xt&&(t=R()))))),Vi--,t===Xt&&(e=Xt,0===Vi&&i(qe)),t}function x(){var t,e,r,n,o,u,s,a,c;return Vi++,t=Pi,e=_(),e!==Xt?(r=b(),r!==Xt?(n=B(),n===Xt&&(n=null),n!==Xt?(o=b(),o!==Xt?(u=C(),u!==Xt?(s=b(),s!==Xt?(a=W(),a!==Xt?(c=m(),c!==Xt?(Mi=t,e=Te(e,n,u,a),t=e):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt),Vi--,t===Xt&&(e=Xt,0===Vi&&i(Re)),t}function C(){var e,r,n,o;return Vi++,e=Pi,61===t.charCodeAt(Pi)?(r=Oe,Pi++):(r=Xt,0===Vi&&i(ke)),r!==Xt?(n=Pi,Vi++,61===t.charCodeAt(Pi)?(o=Oe,Pi++):(o=Xt,0===Vi&&i(ke)),Vi--,o===Xt?n=void 0:(Pi=n,n=Xt),n!==Xt?(Mi=e,r=De(),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(t.substr(Pi,2)===Ie?(e=Ie,Pi+=2):(e=Xt,0===Vi&&i(Fe)),e===Xt&&(t.substr(Pi,2)===je?(e=je,Pi+=2):(e=Xt,0===Vi&&i(Be)),e===Xt&&(t.substr(Pi,2)===Pe?(e=Pe,Pi+=2):(e=Xt,0===Vi&&i(Me)),e===Xt&&(t.substr(Pi,2)===He?(e=He,Pi+=2):(e=Xt,0===Vi&&i(ze)),e===Xt&&(t.substr(Pi,2)===$e?(e=$e,Pi+=2):(e=Xt,0===Vi&&i(Ve))))))),Vi--,e===Xt&&(r=Xt,0===Vi&&i(Le)),e}function _(){var e,r,n,o;if(e=Pi,r=v(),r!==Xt){if(n=[],Ue.test(t.charAt(Pi))?(o=t.charAt(Pi),Pi++):(o=Xt,0===Vi&&i(Ge)),o!==Xt)for(;o!==Xt;)n.push(o),Ue.test(t.charAt(Pi))?(o=t.charAt(Pi),Pi++):(o=Xt,0===Vi&&i(Ge));else n=Xt;n!==Xt?(Mi=e,r=Je(r,n),e=r):(Pi=e,e=Xt)}else Pi=e,e=Xt;return e}function E(){var e,r,n,o,u,s,a,c;if(e=Pi,r=_(),r!==Xt){for(n=[],o=Pi,u=b(),u!==Xt?(44===t.charCodeAt(Pi)?(s=Xe,Pi++):(s=Xt,0===Vi&&i(Ze)),s!==Xt?(a=b(),a!==Xt?(c=_(),c!==Xt?(u=[u,s,a,c],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt)):(Pi=o,o=Xt)):(Pi=o,o=Xt);o!==Xt;)n.push(o),o=Pi,u=b(),u!==Xt?(44===t.charCodeAt(Pi)?(s=Xe,Pi++):(s=Xt,0===Vi&&i(Ze)),s!==Xt?(a=b(),a!==Xt?(c=_(),c!==Xt?(u=[u,s,a,c],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt)):(Pi=o,o=Xt)):(Pi=o,o=Xt);n!==Xt?(Mi=e,r=Ke(r,n),e=r):(Pi=e,e=Xt)}else Pi=e,e=Xt;return e}function S(){var t,e;return t=Pi,e=F(),e!==Xt&&(Mi=t,e=We(e)),t=e}function N(){var e,r,n,o,u,s;return Vi++,e=Pi,123===t.charCodeAt(Pi)?(r=Ye,Pi++):(r=Xt,0===Vi&&i(tr)),r!==Xt?(n=b(),n!==Xt?(o=Pi,u=q(),u!==Xt?(s=b(),s!==Xt?(u=[u,s],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt),o===Xt&&(o=null),o!==Xt?(125===t.charCodeAt(Pi)?(u=Se,Pi++):(u=Xt,0===Vi&&i(Ne)),u!==Xt?(Mi=e,r=er(o),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),Vi--,e===Xt&&(r=Xt,0===Vi&&i(Qe)),e}function q(){var t,e,r,n,i,o;if(t=Pi,e=A(),e!==Xt){for(r=[],n=Pi,i=b(),i!==Xt?(o=A(),o!==Xt?(i=[i,o],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt);n!==Xt;)r.push(n),n=Pi,i=b(),i!==Xt?(o=A(),o!==Xt?(i=[i,o],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt);r!==Xt?(Mi=t,e=rr(e,r),t=e):(Pi=t,t=Xt)}else Pi=t,t=Xt;return t}function R(){var e,r;return Vi++,e=Pi,59===t.charCodeAt(Pi)?(r=ir,Pi++):(r=Xt,0===Vi&&i(or)),r!==Xt&&(Mi=e,r=ur()),e=r,Vi--,e===Xt&&(r=Xt,0===Vi&&i(nr)),e}function T(){var e,r,n,o,u,s,a,c,l,f,p,h,d,v;return Vi++,e=Pi,r=kt(),r!==Xt?(n=b(),n!==Xt?(40===t.charCodeAt(Pi)?(o=ar,Pi++):(o=Xt,0===Vi&&i(cr)),o!==Xt?(u=b(),u!==Xt?(s=_(),s!==Xt?(a=b(),a!==Xt?(c=Dt(),c!==Xt?(l=b(),l!==Xt?(f=D(),f===Xt&&(f=_()),f!==Xt?(p=b(),p!==Xt?(41===t.charCodeAt(Pi)?(h=lr,Pi++):(h=Xt,0===Vi&&i(fr)),h!==Xt?(d=b(),d!==Xt?(v=A(),v===Xt&&(v=N()),v!==Xt?(Mi=e,r=pr(s,f,v),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,
e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),Vi--,e===Xt&&(r=Xt,0===Vi&&i(sr)),e}function L(){var e,r,n,o,u,s,a,c,l,f,p,h,d,v,g;return Vi++,e=Pi,r=It(),r!==Xt?(n=b(),n!==Xt?(40===t.charCodeAt(Pi)?(o=ar,Pi++):(o=Xt,0===Vi&&i(cr)),o!==Xt?(u=b(),u!==Xt?(s=W(),s!==Xt?(a=b(),a!==Xt?(41===t.charCodeAt(Pi)?(c=lr,Pi++):(c=Xt,0===Vi&&i(fr)),c!==Xt?(l=b(),l!==Xt?(f=A(),f===Xt&&(f=N()),f!==Xt?(p=b(),p!==Xt?(h=Pi,d=Lt(),d!==Xt?(v=b(),v!==Xt?(g=A(),g===Xt&&(g=N()),g!==Xt?(d=[d,v,g],h=d):(Pi=h,h=Xt)):(Pi=h,h=Xt)):(Pi=h,h=Xt),h===Xt&&(h=null),h!==Xt?(Mi=e,r=dr(s,f,h),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),Vi--,e===Xt&&(r=Xt,0===Vi&&i(hr)),e}function O(){var t,e,r,n,o;return Vi++,t=Pi,e=Pt(),e!==Xt?(r=b(),r!==Xt?(n=E(),n!==Xt?(o=m(),o!==Xt?(Mi=t,e=gr(n),t=e):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt),Vi--,t===Xt&&(e=Xt,0===Vi&&i(vr)),t}function k(){var t,e,r,n,o;return Vi++,t=Pi,e=jt(),e!==Xt?(r=b(),r!==Xt?(n=E(),n!==Xt?(o=m(),o!==Xt?(Mi=t,e=yr(n),t=e):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt),Vi--,t===Xt&&(e=Xt,0===Vi&&i(mr)),t}function D(){var e,r,n,o,u,s;return e=F(),e===Xt&&(e=_(),e===Xt&&(e=Q(),e===Xt&&(e=Pi,40===t.charCodeAt(Pi)?(r=ar,Pi++):(r=Xt,0===Vi&&i(cr)),r!==Xt?(n=b(),n!==Xt?(o=W(),o!==Xt?(u=b(),u!==Xt?(41===t.charCodeAt(Pi)?(s=lr,Pi++):(s=Xt,0===Vi&&i(fr)),s!==Xt?(Mi=e,r=wr(o),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)))),e}function I(){var e,r,n;if(e=Pi,r=[],br.test(t.charAt(Pi))?(n=t.charAt(Pi),Pi++):(n=Xt,0===Vi&&i(Ar)),n!==Xt)for(;n!==Xt;)r.push(n),br.test(t.charAt(Pi))?(n=t.charAt(Pi),Pi++):(n=Xt,0===Vi&&i(Ar));else r=Xt;return r!==Xt&&(Mi=e,r=xr(r)),e=r}function F(){var e,r,n,o,u,s,a,c;return e=Pi,r=I(),r!==Xt?(n=b(),n!==Xt?(40===t.charCodeAt(Pi)?(o=ar,Pi++):(o=Xt,0===Vi&&i(cr)),o!==Xt?(u=b(),u!==Xt?(s=j(),s===Xt&&(s=null),s!==Xt?(a=b(),a!==Xt?(41===t.charCodeAt(Pi)?(c=lr,Pi++):(c=Xt,0===Vi&&i(fr)),c!==Xt?(Mi=e,r=Cr(r,s),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),e}function j(){var e,r,n,o,u,s,a,c;if(e=Pi,r=D(),r!==Xt){for(n=[],o=Pi,u=b(),u!==Xt?(44===t.charCodeAt(Pi)?(s=Xe,Pi++):(s=Xt,0===Vi&&i(Ze)),s!==Xt?(a=b(),a!==Xt?(c=D(),c!==Xt?(u=[u,s,a,c],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt)):(Pi=o,o=Xt)):(Pi=o,o=Xt);o!==Xt;)n.push(o),o=Pi,u=b(),u!==Xt?(44===t.charCodeAt(Pi)?(s=Xe,Pi++):(s=Xt,0===Vi&&i(Ze)),s!==Xt?(a=b(),a!==Xt?(c=D(),c!==Xt?(u=[u,s,a,c],o=u):(Pi=o,o=Xt)):(Pi=o,o=Xt)):(Pi=o,o=Xt)):(Pi=o,o=Xt);n!==Xt?(Mi=e,r=_r(r,n),e=r):(Pi=e,e=Xt)}else Pi=e,e=Xt;return e}function B(){var e,r,n,o,u,s;return e=Pi,91===t.charCodeAt(Pi)?(r=Er,Pi++):(r=Xt,0===Vi&&i(Sr)),r!==Xt?(n=b(),n!==Xt?(o=W(),o!==Xt?(u=b(),u!==Xt?(93===t.charCodeAt(Pi)?(s=Nr,Pi++):(s=Xt,0===Vi&&i(qr)),s!==Xt?(Mi=e,r=Rr(o),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),e}function P(){var t,e,r,n;return t=Pi,e=D(),e!==Xt?(r=b(),r!==Xt?(n=B(),n!==Xt?(Mi=t,e=Tr(e,n),t=e):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt),t}function M(){var t,e,r,n;return t=P(),t===Xt&&(t=D(),t===Xt&&(t=Pi,e=H(),e!==Xt?(r=b(),r!==Xt?(n=D(),n!==Xt?(Mi=t,e=Lr(e,n),t=e):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt))),t}function H(){var e;return 43===t.charCodeAt(Pi)?(e=Or,Pi++):(e=Xt,0===Vi&&i(kr)),e===Xt&&(45===t.charCodeAt(Pi)?(e=Dr,Pi++):(e=Xt,0===Vi&&i(Ir)),e===Xt&&(126===t.charCodeAt(Pi)?(e=Fr,Pi++):(e=Xt,0===Vi&&i(jr)),e===Xt&&(t.substr(Pi,3)===Br?(e=Br,Pi+=3):(e=Xt,0===Vi&&i(Pr))))),e}function z(){var t,e,r,n,i,o,u,s;if(t=Pi,e=M(),e!==Xt){for(r=[],n=Pi,i=b(),i!==Xt?(o=$(),o!==Xt?(u=b(),u!==Xt?(s=M(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);n!==Xt;)r.push(n),n=Pi,i=b(),i!==Xt?(o=$(),o!==Xt?(u=b(),u!==Xt?(s=M(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);r!==Xt?(Mi=t,e=Mr(e,r),t=e):(Pi=t,t=Xt)}else Pi=t,t=Xt;return t}function $(){var e,r,n,o;return e=Pi,42===t.charCodeAt(Pi)?(r=Hr,Pi++):(r=Xt,0===Vi&&i(zr)),r===Xt&&(47===t.charCodeAt(Pi)?(r=$r,Pi++):(r=Xt,0===Vi&&i(Vr)),r===Xt&&(37===t.charCodeAt(Pi)?(r=Ur,Pi++):(r=Xt,0===Vi&&i(Gr)))),r!==Xt?(n=Pi,Vi++,61===t.charCodeAt(Pi)?(o=Oe,Pi++):(o=Xt,0===Vi&&i(ke)),Vi--,o===Xt?n=void 0:(Pi=n,n=Xt),n!==Xt?(Mi=e,r=Jr(r),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e}function V(){var t,e,r,n,i,o,u,s;if(t=Pi,e=z(),e!==Xt){for(r=[],n=Pi,i=b(),i!==Xt?(o=U(),o!==Xt?(u=b(),u!==Xt?(s=z(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);n!==Xt;)r.push(n),n=Pi,i=b(),i!==Xt?(o=U(),o!==Xt?(u=b(),u!==Xt?(s=z(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);r!==Xt?(Mi=t,e=Xr(e,r),t=e):(Pi=t,t=Xt)}else Pi=t,t=Xt;return t}function U(){var e,r,n,o;return e=Pi,43===t.charCodeAt(Pi)?(r=Or,Pi++):(r=Xt,0===Vi&&i(kr)),r!==Xt?(n=Pi,Vi++,43===t.charCodeAt(Pi)?(o=Or,Pi++):(o=Xt,0===Vi&&i(kr)),o===Xt&&(61===t.charCodeAt(Pi)?(o=Oe,Pi++):(o=Xt,0===Vi&&i(ke))),Vi--,o===Xt?n=void 0:(Pi=n,n=Xt),n!==Xt?(Mi=e,r=Zr(),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=Pi,45===t.charCodeAt(Pi)?(r=Dr,Pi++):(r=Xt,0===Vi&&i(Ir)),r!==Xt?(n=Pi,Vi++,45===t.charCodeAt(Pi)?(o=Dr,Pi++):(o=Xt,0===Vi&&i(Ir)),o===Xt&&(61===t.charCodeAt(Pi)?(o=Oe,Pi++):(o=Xt,0===Vi&&i(ke))),Vi--,o===Xt?n=void 0:(Pi=n,n=Xt),n!==Xt?(Mi=e,r=Kr(),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)),e}function G(){var t,e,r,n,i,o,u,s;if(t=Pi,e=V(),e!==Xt){for(r=[],n=Pi,i=b(),i!==Xt?(o=J(),o!==Xt?(u=b(),u!==Xt?(s=V(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);n!==Xt;)r.push(n),n=Pi,i=b(),i!==Xt?(o=J(),o!==Xt?(u=b(),u!==Xt?(s=V(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);r!==Xt?(Mi=t,e=Wr(e,r),t=e):(Pi=t,t=Xt)}else Pi=t,t=Xt;return t}function J(){var e;return t.substr(Pi,2)===Qr?(e=Qr,Pi+=2):(e=Xt,0===Vi&&i(Yr)),e===Xt&&(t.substr(Pi,2)===tn?(e=tn,Pi+=2):(e=Xt,0===Vi&&i(en)),e===Xt&&(60===t.charCodeAt(Pi)?(e=rn,Pi++):(e=Xt,0===Vi&&i(nn)),e===Xt&&(62===t.charCodeAt(Pi)?(e=on,Pi++):(e=Xt,0===Vi&&i(un))))),e}function X(){var t,e,r,n,i,o,u,s;if(t=Pi,
e=G(),e!==Xt){for(r=[],n=Pi,i=b(),i!==Xt?(o=Z(),o!==Xt?(u=b(),u!==Xt?(s=G(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);n!==Xt;)r.push(n),n=Pi,i=b(),i!==Xt?(o=Z(),o!==Xt?(u=b(),u!==Xt?(s=G(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);r!==Xt?(Mi=t,e=sn(e,r),t=e):(Pi=t,t=Xt)}else Pi=t,t=Xt;return t}function Z(){var e,r;return e=Pi,t.substr(Pi,2)===an?(r=an,Pi+=2):(r=Xt,0===Vi&&i(cn)),r!==Xt&&(Mi=e,r=ln()),e=r}function K(){var t,e,r,n,i,o,u,s;if(t=Pi,e=X(),e!==Xt){for(r=[],n=Pi,i=b(),i!==Xt?(o=Rt(),o!==Xt?(u=b(),u!==Xt?(s=X(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);n!==Xt;)r.push(n),n=Pi,i=b(),i!==Xt?(o=Rt(),o!==Xt?(u=b(),u!==Xt?(s=X(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);r!==Xt?(Mi=t,e=fn(e,r),t=e):(Pi=t,t=Xt)}else Pi=t,t=Xt;return t}function W(){var t,e,r,n,i,o,u,s;if(t=Pi,e=K(),e!==Xt){for(r=[],n=Pi,i=b(),i!==Xt?(o=Tt(),o!==Xt?(u=b(),u!==Xt?(s=K(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);n!==Xt;)r.push(n),n=Pi,i=b(),i!==Xt?(o=Tt(),o!==Xt?(u=b(),u!==Xt?(s=K(),s!==Xt?(i=[i,o,u,s],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt)):(Pi=n,n=Xt);r!==Xt?(Mi=t,e=pn(e,r),t=e):(Pi=t,t=Xt)}else Pi=t,t=Xt;return t}function Q(){var t;return t=et(),t===Xt&&(t=rt(),t===Xt&&(t=nt(),t===Xt&&(t=dt(),t===Xt&&(t=tt(),t===Xt&&(t=Y()))))),t}function Y(){var e,r,n,o,u,s;return e=Pi,91===t.charCodeAt(Pi)?(r=Er,Pi++):(r=Xt,0===Vi&&i(Sr)),r!==Xt?(n=b(),n!==Xt?(o=j(),o===Xt&&(o=null),o!==Xt?(u=b(),u!==Xt?(93===t.charCodeAt(Pi)?(s=Nr,Pi++):(s=Xt,0===Vi&&i(qr)),s!==Xt?(Mi=e,r=hn(o),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),e}function tt(){var e,r,n,o;return Vi++,e=Pi,47===t.charCodeAt(Pi)?(r=$r,Pi++):(r=Xt,0===Vi&&i(Vr)),r!==Xt?(n=mt(),n!==Xt?(47===t.charCodeAt(Pi)?(o=$r,Pi++):(o=Xt,0===Vi&&i(Vr)),o!==Xt?(Mi=e,r=vn(n),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),Vi--,e===Xt&&(r=Xt,0===Vi&&i(dn)),e}function et(){var t,e;return t=Pi,e=Ft(),e!==Xt&&(Mi=t,e=gn()),t=e}function rt(){var t,e;return t=Pi,e=Bt(),e!==Xt&&(Mi=t,e=mn()),t=e,t===Xt&&(t=Pi,e=Ot(),e!==Xt&&(Mi=t,e=yn()),t=e),t}function nt(){var t,e,r,n;return Vi++,t=Pi,e=pt(),e===Xt&&(e=it()),e!==Xt?(r=Pi,Vi++,n=v(),Vi--,n===Xt?r=void 0:(Pi=r,r=Xt),r!==Xt?(Mi=t,e=bn(e),t=e):(Pi=t,t=Xt)):(Pi=t,t=Xt),Vi--,t===Xt&&(e=Xt,0===Vi&&i(wn)),t}function it(){var e,r,n,o,u;return e=Pi,r=ot(),r!==Xt?(46===t.charCodeAt(Pi)?(n=An,Pi++):(n=Xt,0===Vi&&i(xn)),n!==Xt?(o=ut(),o===Xt&&(o=null),o!==Xt?(u=ct(),u===Xt&&(u=null),u!==Xt?(Mi=e,r=Cn(r,o,u),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=Pi,46===t.charCodeAt(Pi)?(r=An,Pi++):(r=Xt,0===Vi&&i(xn)),r!==Xt?(n=ut(),n!==Xt?(o=ct(),o===Xt&&(o=null),o!==Xt?(Mi=e,r=_n(n,o),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=Pi,r=ot(),r!==Xt?(n=ct(),n===Xt&&(n=null),n!==Xt?(Mi=e,r=En(r,n),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt))),e}function ot(){var e,r,n;return 48===t.charCodeAt(Pi)?(e=Sn,Pi++):(e=Xt,0===Vi&&i(Nn)),e===Xt&&(e=Pi,r=at(),r!==Xt?(n=ut(),n===Xt&&(n=null),n!==Xt?(Mi=e,r=qn(r,n),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)),e}function ut(){var t,e,r;if(t=Pi,e=[],r=st(),r!==Xt)for(;r!==Xt;)e.push(r),r=st();else e=Xt;return e!==Xt&&(Mi=t,e=Rn(e)),t=e}function st(){var e;return Tn.test(t.charAt(Pi))?(e=t.charAt(Pi),Pi++):(e=Xt,0===Vi&&i(Ln)),e}function at(){var e;return On.test(t.charAt(Pi))?(e=t.charAt(Pi),Pi++):(e=Xt,0===Vi&&i(kn)),e}function ct(){var t,e,r;return t=Pi,e=lt(),e!==Xt?(r=ft(),r!==Xt?(Mi=t,e=Dn(e,r),t=e):(Pi=t,t=Xt)):(Pi=t,t=Xt),t}function lt(){var e;return In.test(t.charAt(Pi))?(e=t.charAt(Pi),Pi++):(e=Xt,0===Vi&&i(Fn)),e}function ft(){var e,r,n;return e=Pi,jn.test(t.charAt(Pi))?(r=t.charAt(Pi),Pi++):(r=Xt,0===Vi&&i(Bn)),r===Xt&&(r=null),r!==Xt?(n=ut(),n!==Xt?(Mi=e,r=Pn(r,n),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e}function pt(){var e,r,n,o,u;if(e=Pi,48===t.charCodeAt(Pi)?(r=Sn,Pi++):(r=Xt,0===Vi&&i(Nn)),r!==Xt)if(Mn.test(t.charAt(Pi))?(n=t.charAt(Pi),Pi++):(n=Xt,0===Vi&&i(Hn)),n!==Xt){if(o=[],u=ht(),u!==Xt)for(;u!==Xt;)o.push(u),u=ht();else o=Xt;o!==Xt?(Mi=e,r=zn(o),e=r):(Pi=e,e=Xt)}else Pi=e,e=Xt;else Pi=e,e=Xt;return e}function ht(){var e;return $n.test(t.charAt(Pi))?(e=t.charAt(Pi),Pi++):(e=Xt,0===Vi&&i(Vn)),e}function dt(){var e,r,n,o,u;return Vi++,e=Pi,r=Pi,34===t.charCodeAt(Pi)?(n=Gn,Pi++):(n=Xt,0===Vi&&i(Jn)),n!==Xt?(o=vt(),o===Xt&&(o=null),o!==Xt?(34===t.charCodeAt(Pi)?(u=Gn,Pi++):(u=Xt,0===Vi&&i(Jn)),u!==Xt?(n=[n,o,u],r=n):(Pi=r,r=Xt)):(Pi=r,r=Xt)):(Pi=r,r=Xt),r===Xt&&(r=Pi,39===t.charCodeAt(Pi)?(n=Xn,Pi++):(n=Xt,0===Vi&&i(Zn)),n!==Xt?(o=gt(),o===Xt&&(o=null),o!==Xt?(39===t.charCodeAt(Pi)?(u=Xn,Pi++):(u=Xt,0===Vi&&i(Zn)),u!==Xt?(n=[n,o,u],r=n):(Pi=r,r=Xt)):(Pi=r,r=Xt)):(Pi=r,r=Xt)),r!==Xt&&(Mi=e,r=Kn(r)),e=r,Vi--,e===Xt&&(r=Xt,0===Vi&&i(Un)),e}function vt(){var t,e,r;if(t=Pi,e=[],r=yt(),r!==Xt)for(;r!==Xt;)e.push(r),r=yt();else e=Xt;return e!==Xt&&(Mi=t,e=Wn(e)),t=e}function gt(){var t,e,r;if(t=Pi,e=[],r=wt(),r!==Xt)for(;r!==Xt;)e.push(r),r=wt();else e=Xt;return e!==Xt&&(Mi=t,e=Wn(e)),t=e}function mt(){var t,e,r;if(t=Pi,e=[],r=bt(),r!==Xt)for(;r!==Xt;)e.push(r),r=bt();else e=Xt;return e!==Xt&&(Mi=t,e=Wn(e)),t=e}function yt(){var e,r,n;return e=Pi,r=Pi,Vi++,34===t.charCodeAt(Pi)?(n=Gn,Pi++):(n=Xt,0===Vi&&i(Jn)),n===Xt&&(92===t.charCodeAt(Pi)?(n=Qn,Pi++):(n=Xt,0===Vi&&i(Yn)),n===Xt&&(n=c())),Vi--,n===Xt?r=void 0:(Pi=r,r=Xt),r!==Xt?(n=s(),n!==Xt?(Mi=e,r=ti(n),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=Pi,92===t.charCodeAt(Pi)?(r=Qn,Pi++):(r=Xt,0===Vi&&i(Yn)),r!==Xt?(n=xt(),n!==Xt?(Mi=e,r=ei(n),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=At())),e}function wt(){var e,r,n;return e=Pi,r=Pi,Vi++,39===t.charCodeAt(Pi)?(n=Xn,Pi++):(n=Xt,0===Vi&&i(Zn)),n===Xt&&(92===t.charCodeAt(Pi)?(n=Qn,Pi++):(n=Xt,0===Vi&&i(Yn)),n===Xt&&(n=c())),Vi--,n===Xt?r=void 0:(Pi=r,r=Xt),r!==Xt?(n=s(),n!==Xt?(Mi=e,r=ti(n),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=Pi,92===t.charCodeAt(Pi)?(r=Qn,Pi++):(r=Xt,0===Vi&&i(Yn)),r!==Xt?(n=xt(),n!==Xt?(Mi=e,r=ei(n),e=r):(Pi=e,
e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=At())),e}function bt(){var e,r,n;return e=Pi,92===t.charCodeAt(Pi)?(r=Qn,Pi++):(r=Xt,0===Vi&&i(Yn)),r!==Xt?(47===t.charCodeAt(Pi)?(n=$r,Pi++):(n=Xt,0===Vi&&i(Vr)),n!==Xt?(Mi=e,r=ri(n),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=Pi,r=Pi,Vi++,47===t.charCodeAt(Pi)?(n=$r,Pi++):(n=Xt,0===Vi&&i(Vr)),n===Xt&&(n=c()),Vi--,n===Xt?r=void 0:(Pi=r,r=Xt),r!==Xt?(n=s(),n!==Xt?(Mi=e,r=ti(n),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=At())),e}function At(){var e,r,n;return e=Pi,92===t.charCodeAt(Pi)?(r=Qn,Pi++):(r=Xt,0===Vi&&i(Yn)),r!==Xt?(n=l(),n!==Xt?(Mi=e,r=ni(n),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e}function xt(){var e,r,n,o;return e=Ct(),e===Xt&&(e=Pi,48===t.charCodeAt(Pi)?(r=Sn,Pi++):(r=Xt,0===Vi&&i(Nn)),r!==Xt?(n=Pi,Vi++,o=st(),Vi--,o===Xt?n=void 0:(Pi=n,n=Xt),n!==Xt?(Mi=e,r=ii(),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt),e===Xt&&(e=Nt(),e===Xt&&(e=qt()))),e}function Ct(){var t;return t=_t(),t===Xt&&(t=Et()),t}function _t(){var e,r;return e=Pi,oi.test(t.charAt(Pi))?(r=t.charAt(Pi),Pi++):(r=Xt,0===Vi&&i(ui)),r!==Xt&&(Mi=e,r=si(r)),e=r}function Et(){var t,e,r;return t=Pi,e=Pi,Vi++,r=St(),Vi--,r===Xt?e=void 0:(Pi=e,e=Xt),e===Xt&&(e=c()),e!==Xt?(r=s(),r!==Xt?(Mi=t,e=ai(r),t=e):(Pi=t,t=Xt)):(Pi=t,t=Xt),t}function St(){var e;return e=_t(),e===Xt&&(e=st(),e===Xt&&(120===t.charCodeAt(Pi)?(e=ci,Pi++):(e=Xt,0===Vi&&i(li)),e===Xt&&(117===t.charCodeAt(Pi)?(e=fi,Pi++):(e=Xt,0===Vi&&i(pi))))),e}function Nt(){var e,r,n,o;return e=Pi,120===t.charCodeAt(Pi)?(r=ci,Pi++):(r=Xt,0===Vi&&i(li)),r!==Xt?(n=ht(),n!==Xt?(o=ht(),o!==Xt?(Mi=e,r=hi(n,o),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),e}function qt(){var e,r,n,o,u,s;return e=Pi,117===t.charCodeAt(Pi)?(r=fi,Pi++):(r=Xt,0===Vi&&i(pi)),r!==Xt?(n=ht(),n!==Xt?(o=ht(),o!==Xt?(u=ht(),u!==Xt?(s=ht(),s!==Xt?(Mi=e,r=di(n,o,u,s),e=r):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt)):(Pi=e,e=Xt),e}function Rt(){var e;return t.substr(Pi,3)===vi?(e=vi,Pi+=3):(e=Xt,0===Vi&&i(gi)),e}function Tt(){var e;return t.substr(Pi,2)===mi?(e=mi,Pi+=2):(e=Xt,0===Vi&&i(yi)),e}function Z(){var e;return t.substr(Pi,2)===an?(e=an,Pi+=2):(e=Xt,0===Vi&&i(cn)),e}function Lt(){var e;return t.substr(Pi,4)===wi?(e=wi,Pi+=4):(e=Xt,0===Vi&&i(bi)),e}function Ot(){var e;return t.substr(Pi,5)===Ai?(e=Ai,Pi+=5):(e=Xt,0===Vi&&i(xi)),e}function kt(){var e;return t.substr(Pi,3)===Ci?(e=Ci,Pi+=3):(e=Xt,0===Vi&&i(_i)),e}function Dt(){var e;return t.substr(Pi,2)===Ei?(e=Ei,Pi+=2):(e=Xt,0===Vi&&i(Si)),e}function It(){var e;return t.substr(Pi,2)===Ni?(e=Ni,Pi+=2):(e=Xt,0===Vi&&i(qi)),e}function Ft(){var e;return t.substr(Pi,4)===Ri?(e=Ri,Pi+=4):(e=Xt,0===Vi&&i(Ti)),e}function jt(){var e;return t.substr(Pi,6)===Li?(e=Li,Pi+=6):(e=Xt,0===Vi&&i(Oi)),e}function Bt(){var e;return t.substr(Pi,4)===ki?(e=ki,Pi+=4):(e=Xt,0===Vi&&i(Di)),e}function Pt(){var e;return t.substr(Pi,7)===Ii?(e=Ii,Pi+=7):(e=Xt,0===Vi&&i(Fi)),e}function Mt(){var t,e;return t=Pi,e=Ht(),e===Xt&&(e=null),e!==Xt&&(Mi=t,e=ji(e)),t=e}function Ht(){var t,e,r,n,i,o;if(t=Pi,e=A(),e!==Xt){for(r=[],n=Pi,i=b(),i!==Xt?(o=A(),o!==Xt?(i=[i,o],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt);n!==Xt;)r.push(n),n=Pi,i=b(),i!==Xt?(o=A(),o!==Xt?(i=[i,o],n=i):(Pi=n,n=Xt)):(Pi=n,n=Xt);r!==Xt?(n=b(),n!==Xt?(i=k(),i!==Xt?(Mi=t,e=Bi(e,r,i),t=e):(Pi=t,t=Xt)):(Pi=t,t=Xt)):(Pi=t,t=Xt)}else Pi=t,t=Xt;return t}function zt(t,e,r){switch(e){case"+":return t+r;case"-":return t-r;case"*":return t*r;case"/":return t/r;case"%":return t%r;case"<":return r>t;case">":return t>r;case"<=":return r>=t;case">=":return t>=r;case"==":return t==r;case"!=":return t!=r;default:return void 0}}function $t(t,e){switch(t){case"+":return+e;case"-":return-e;case"~":return~e;case"not":return!e;default:return void 0}}function Vt(t,e){if(t instanceof Array&&e instanceof Array){if(t.length!==e.length)return!1;for(var r=0;r<t.length;r++)if(t[r]!=e[r])return!1;return!0}return t==e}function Ut(t,e){return void 0===e||void 0===t?void 0:(t=parseInt(t),isNaN(t)?void 0:(0>t&&e.hasOwnProperty("length")&&(t=e.length+t,0>t&&(t=0)),t))}var Gt,Jt=arguments.length>1?arguments[1]:{},Xt={},Zt={start:u},Kt=u,Wt=function(t){return t},Qt={type:"any",description:"any character"},Yt={type:"other",description:"whitespace"},te=/^[\t\x0B\f \xA0\uFEFF]/,ee={type:"class",value:"[\\t\\v\\f \\u00A0\\uFEFF]",description:"[\\t\\v\\f \\u00A0\\uFEFF]"},re=/^[\n\r\u2028\u2029]/,ne={type:"class",value:"[\\n\\r\\u2028\\u2029]",description:"[\\n\\r\\u2028\\u2029]"},ie={type:"other",description:"end of line"},oe="\n",ue={type:"literal",value:"\n",description:'"\\n"'},se="\r\n",ae={type:"literal",value:"\r\n",description:'"\\r\\n"'},ce="\r",le={type:"literal",value:"\r",description:'"\\r"'},fe="\u2028",pe={type:"literal",value:"\u2028",description:'"\\u2028"'},he="\u2029",de={type:"literal",value:"\u2029",description:'"\\u2029"'},ve={type:"other",description:"comment"},ge="/*",me={type:"literal",value:"/*",description:'"/*"'},ye="*/",we={type:"literal",value:"*/",description:'"*/"'},be="//",Ae={type:"literal",value:"//",description:'"//"'},xe="$",Ce={type:"literal",value:"$",description:'"$"'},_e=/^[ \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000]/,Ee={type:"class",value:"[\\u0020\\u00A0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000]",description:"[\\u0020\\u00A0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000]"},Se="}",Ne={type:"literal",value:"}",description:'"}"'},qe={type:"other",description:"Statement"},Re={type:"other",description:"Assignment Statement"},Te=function(t,e,r,n){return{type:"AssignmentStatement",variable:t,accessor:e,operator:r,value:n,interpret:function(t){var r=this.value.interpret(t);if("="!=this.operator){var n=this.variable.interpret(t);r=zt(n,this.operator.substring(0,1),r)}if(null!==this.accessor){var i=e.interpret(t),n=this.variable.interpret(t);i=Ut(i,n),t.variables[this.variable.identifier][i]=r}else t.variables[this.variable.identifier]=r},accept:function(t){
t.visitAssignmentStatement(this)}}},Le={type:"other",description:"Assignment Operator"},Oe="=",ke={type:"literal",value:"=",description:'"="'},De=function(){return"="},Ie="*=",Fe={type:"literal",value:"*=",description:'"*="'},je="/=",Be={type:"literal",value:"/=",description:'"/="'},Pe="%=",Me={type:"literal",value:"%=",description:'"%="'},He="+=",ze={type:"literal",value:"+=",description:'"+="'},$e="-=",Ve={type:"literal",value:"-=",description:'"-="'},Ue=/^[a-zA-Z0-9_]/,Ge={type:"class",value:"[a-zA-Z0-9_]",description:"[a-zA-Z0-9_]"},Je=function(t,e){return{type:"VariableExpression",identifier:t+e.join(""),interpret:function(t){if(!(this.identifier in t.variables))throw new t.InterpreterError("Variable "+this.identifier+" not defined.");var e=t.variables[this.identifier];return e},accept:function(t){return t.visitVariableExpression(this)}}},Xe=",",Ze={type:"literal",value:",",description:'","'},Ke=function(t,e){for(var r=[t],n=0;n<e.length;n++)r.push(e[n][3]);return r},We=function(t){return{type:"StatementExpression",expr:t,interpret:function(t){this.expr.interpret(t)},accept:function(t){return t.visitStatementExpression(this)}}},Qe={type:"other",description:"Block"},Ye="{",tr={type:"literal",value:"{",description:'"{"'},er=function(t){return{type:"Block",statements:null!==t?t[0]:[],interpret:function(t){for(var e=this.statements.length-1;e>=0;e--)t.stmt_stack.push(this.statements[e])},accept:function(t){t.visitBlock(this)}}},rr=function(t,e){for(var r=[t],n=0;n<e.length;n++)r.push(e[n][1]);return r},nr={type:"other",description:"No-op Statement"},ir=";",or={type:"literal",value:";",description:'";"'},ur=function(){return{type:"EmptyStatement",interpret:function(){},accept:function(t){t.visitEmptyStatement(this)}}},sr={type:"other",description:"For-In Loop"},ar="(",cr={type:"literal",value:"(",description:'"("'},lr=")",fr={type:"literal",value:")",description:'")"'},pr=function(t,e,r){return{type:"ForInStatement",iterator:t,collection:e,statement:r,interpret:function(t){function e(){this.type="LoopClosure"}var r=this.collection.interpret(t),n=this.statement;if(!r.hasOwnProperty("length"))throw new t.InterpreterError("ForIn Loop only on Arrays or Strings.");var i=0,o=this.iterator.identifier;e.prototype.interpret=function(t){i<r.length&&(t.variables[o]=r[i],i+=1,t.stmt_stack.push(this),t.stmt_stack.push(n))},t.stmt_stack.push(new e)},accept:function(t){t.visitForInStatement(this)}}},hr={type:"other",description:"If Statement"},dr=function(t,e,r){return{type:"IfStatement",condition:t,if_statement:e,else_statement:r,interpret:function(t){this.condition.interpret(t)?t.stmt_stack.push(this.if_statement):null!==this.else_statement&&t.stmt_stack.push(this.else_statement[2])},accept:function(t){t.visitIfStatement(this)}}},vr={type:"other",description:"Require Statement"},gr=function(t){return{type:"RequireStatement",vars:t,interpret:function(t){for(var e=0;e<this.vars.length;e++){var r=this.vars[e].identifier,n=this.vars[e].interpret(t);if(!n){for(t.error_callback.call(this,new t.RequireError("Variable "+r+" required."));t.stmt_stack.length>0;)t.stmt_stack.pop();t.ret=void 0;break}}},accept:function(t){t.visitRequireStatement(this)}}},mr={type:"other",description:"Return Statement"},yr=function(t){return{type:"ReturnStatement",vars:t,interpret:function(t){for(var e=!1,r={},n=this.vars.length-1;n>=0;)r[this.vars[n].identifier]=!0,n-=1;void 0===t.ret&&(t.ret={});for(var n=this.vars.length-1;n>=0;){var i=this.vars[n],o=i.interpret(t),u=i.identifier.substring(1);u in t.ret&&Vt(t.ret[u],o)||(e=!0,t.ret[u]=o),n-=1}var s=0;for(var a in t.ret)s+=1;var c=0;for(var a in r)c+=1;c!=s&&(e=!0),e&&t.return_callback.call(t.return_callback,t.ret)},accept:function(t){t.visitReturnStatement(this)}}},wr=function(t){return t},br=/^[a-zA-Z_]/,Ar={type:"class",value:"[a-zA-Z_]",description:"[a-zA-Z_]"},xr=function(t){return t.join("")},Cr=function(t,e){return{type:"CallExpression",func_name:t,arg_exprs:null!==e?e:[],interpret:function(t){for(var e=[],r=0;r<this.arg_exprs.length;r++){var n=this.arg_exprs[r].interpret(t);e.push(n)}var i=t.function_table[this.func_name];return i?i.apply(t,e):void 0},accept:function(t){return t.visitCallExpression(this)}}},_r=function(t,e){for(var r=[t],n=0;n<e.length;n++)r.push(e[n][3]);return r},Er="[",Sr={type:"literal",value:"[",description:'"["'},Nr="]",qr={type:"literal",value:"]",description:'"]"'},Rr=function(t){return t},Tr=function(t,e){return{type:"AccessorExpression",value:t,index:e,interpret:function(t){var e=this.value.interpret(t),r=this.index.interpret(t);return r=Ut(r,e),e[r]},accept:function(t){return t.visitAccessorExpression(this)}}},Lr=function(t,e){return{type:"UnaryExpression",operator:t,expression:e,interpret:function(t){var e=this.expression.interpret(t);return $t(this.operator,e)},accept:function(t){return t.visitUnaryExpression(this)}}},Or="+",kr={type:"literal",value:"+",description:'"+"'},Dr="-",Ir={type:"literal",value:"-",description:'"-"'},Fr="~",jr={type:"literal",value:"~",description:'"~"'},Br="not",Pr={type:"literal",value:"not",description:'"not"'},Mr=function(t,e){for(var r=t,n=0;n<e.length;n++)r={type:"MultiplicativeExpression",operator:e[n][1],left:r,right:e[n][3],interpret:function(t){var e=this.left.interpret(t),r=this.right.interpret(t);return zt(e,this.operator,r)},accept:function(t){return t.visitMultiplicativeExpression(this)}};return r},Hr="*",zr={type:"literal",value:"*",description:'"*"'},$r="/",Vr={type:"literal",value:"/",description:'"/"'},Ur="%",Gr={type:"literal",value:"%",description:'"%"'},Jr=function(t){return t},Xr=function(t,e){for(var r=t,n=0;n<e.length;n++)r={type:"AdditiveExpression",operator:e[n][1],left:r,right:e[n][3],interpret:function(t){var e=this.left.interpret(t),r=this.right.interpret(t);return zt(e,this.operator,r)},accept:function(t){return t.visitAdditiveExpression(this)}};return r},Zr=function(){return"+"},Kr=function(){return"-"},Wr=function(t,e){for(var r=t,n=0;n<e.length;n++)r={type:"RelationalExpression",operator:e[n][1],
left:r,right:e[n][3],interpret:function(t){var e=this.left.interpret(t),r=this.right.interpret(t);return zt(e,this.operator,r)},accept:function(t){return t.visitRelationalExpression(this)}};return r},Qr="<=",Yr={type:"literal",value:"<=",description:'"<="'},tn=">=",en={type:"literal",value:">=",description:'">="'},rn="<",nn={type:"literal",value:"<",description:'"<"'},on=">",un={type:"literal",value:">",description:'">"'},sn=function(t,e){for(var r=t,n=0;n<e.length;n++)r={type:"EqualsExpression",operator:e[n][1],left:r,right:e[n][3],interpret:function(t){var e=this.left.interpret(t),r=this.right.interpret(t);return e==r},accept:function(t){return t.visitEqualsExpression(this)}};return r},an="==",cn={type:"literal",value:"==",description:'"=="'},ln=function(){return"=="},fn=function(t,e){for(var r=t,n=0;n<e.length;n++)r={type:"LogicalANDExpression",operator:e[n][1],left:r,right:e[n][3],interpret:function(t){var e=this.left.interpret(t);return e?this.right.interpret(t):!1},accept:function(t){return t.visitLogicalANDExpression(this)}};return r},pn=function(t,e){for(var r=t,n=0;n<e.length;n++)r={type:"LogicalORExpression",operator:e[n][1],left:r,right:e[n][3],interpret:function(t){var e=this.left.interpret(t);return e?e:this.right.interpret(t)},accept:function(t){return t.visitLogicalORExpression(this)}};return r},hn=function(t){return{type:"ArrayLiteral",elements:null!==t?t:[],interpret:function(t){for(var e=new Array,r=0;r<this.elements.length;r++)e.push(this.elements[r].interpret(t));return e},accept:function(t){return t.visitArrayLiteral(this)}}},dn={type:"other",description:"regex"},vn=function(t){return{type:"RegexLiteral",value:t,interpret:function(){return this.value},accept:function(t){return t.visitRegularExpressionLiteral(this)}}},gn=function(){return{type:"NullLiteral",value:null,interpret:function(){return this.value},accept:function(t){return t.visitNullLiteral(this)}}},mn=function(){return{type:"BooleanLiteral",value:!0,interpret:function(){return this.value},accept:function(t){return t.visitBooleanLiteral(this)}}},yn=function(){return{type:"BooleanLiteral",value:!1,interpret:function(){return this.value},accept:function(t){return t.visitBooleanLiteral(this)}}},wn={type:"other",description:"number"},bn=function(t){return{type:"NumericLiteral",value:t,interpret:function(){return this.value},accept:function(t){return t.visitNumericLiteral(this)}}},An=".",xn={type:"literal",value:".",description:'"."'},Cn=function(t,e,r){return parseFloat(t+"."+e+r)},_n=function(t,e){return parseFloat("."+t+e)},En=function(t,e){return parseFloat(t+e)},Sn="0",Nn={type:"literal",value:"0",description:'"0"'},qn=function(t,e){return t+e},Rn=function(t){return t.join("")},Tn=/^[0-9]/,Ln={type:"class",value:"[0-9]",description:"[0-9]"},On=/^[1-9]/,kn={type:"class",value:"[1-9]",description:"[1-9]"},Dn=function(t,e){return t+e},In=/^[eE]/,Fn={type:"class",value:"[eE]",description:"[eE]"},jn=/^[\-+]/,Bn={type:"class",value:"[-+]",description:"[-+]"},Pn=function(t,e){return t+e},Mn=/^[xX]/,Hn={type:"class",value:"[xX]",description:"[xX]"},zn=function(){return parseInt("0x"+dgits.join(""))},$n=/^[0-9a-fA-F]/,Vn={type:"class",value:"[0-9a-fA-F]",description:"[0-9a-fA-F]"},Un={type:"other",description:"string"},Gn='"',Jn={type:"literal",value:'"',description:'"\\""'},Xn="'",Zn={type:"literal",value:"'",description:'"\'"'},Kn=function(t){return{type:"StringLiteral",value:t[1]||"",quote:t[0],interpret:function(){return this.value},accept:function(t){return t.visitStringLiteral(this)}}},Wn=function(t){return t.join("")},Qn="\\",Yn={type:"literal",value:"\\",description:'"\\\\"'},ti=function(t){return t},ei=function(t){return t},ri=function(t){return t},ni=function(t){return t},ii=function(){return"\x00"},oi=/^['"\\bfnrtv]/,ui={type:"class",value:"['\"\\\\bfnrtv]",description:"['\"\\\\bfnrtv]"},si=function(t){return t.replace("b","\b").replace("f","\f").replace("n","\n").replace("r","\r").replace("t","	").replace("v","")},ai=function(t){return t},ci="x",li={type:"literal",value:"x",description:'"x"'},fi="u",pi={type:"literal",value:"u",description:'"u"'},hi=function(t,e){return String.fromCharCode(parseInt("0x"+t+e))},di=function(t,e,r,n){return String.fromCharCode(parseInt("0x"+t+e+r+n))},vi="and",gi={type:"literal",value:"and",description:'"and"'},mi="or",yi={type:"literal",value:"or",description:'"or"'},wi="else",bi={type:"literal",value:"else",description:'"else"'},Ai="false",xi={type:"literal",value:"false",description:'"false"'},Ci="for",_i={type:"literal",value:"for",description:'"for"'},Ei="in",Si={type:"literal",value:"in",description:'"in"'},Ni="if",qi={type:"literal",value:"if",description:'"if"'},Ri="null",Ti={type:"literal",value:"null",description:'"null"'},Li="return",Oi={type:"literal",value:"return",description:'"return"'},ki="true",Di={type:"literal",value:"true",description:'"true"'},Ii="require",Fi={type:"literal",value:"require",description:'"require"'},ji=function(t){return{type:"Program",statements:null!==t?t:[],interpret:function(t){for(var e=(this.statements,this.statements.length-1);e>=0;e--)t.stmt_stack.push(this.statements[e]);t.interpretNext()},accept:function(t){t.visitProgram(this)}}},Bi=function(t,e,r){for(var n=[t],i=0;i<e.length;i++)n.push(e[i][1]);return n.push(r),n},Pi=0,Mi=0,Hi=[{line:1,column:1,seenCR:!1}],zi=0,$i=[],Vi=0;if("startRule"in Jt){if(!(Jt.startRule in Zt))throw new Error("Can't start parsing from rule \""+Jt.startRule+'".');Kt=Zt[Jt.startRule]}if(this.VERSION="0.2.2",Gt=Kt(),Gt!==Xt&&Pi===t.length)return Gt;throw Gt!==Xt&&Pi<t.length&&i({type:"end",description:"end of input"}),o(null,$i,zi<t.length?t.charAt(zi):null,zi<t.length?n(zi,zi+1):n(zi,zi))}return t(e,Error),{SyntaxError:e,parse:r}}),r("request",[],function(){var t=200,e="XDR",r="XHR",n=function(t,n,i){if(this.method=t,this.url=n,this.requestTimer=void 0,this.type=r,this.rq=new window.XMLHttpRequest,"withCredentials"in this.rq||"undefined"!=typeof window.XDomainRequest&&(this.type=e,this.rq=new window.XDomainRequest,
this.rq.readyState=1),"object"==typeof i){var o=-1===this.url.indexOf("?")?"?":"&";for(var u in i)"undefined"!=typeof i[u]&&(this.url+=o+u+"="+encodeURIComponent(i[u]),o="&")}this.rq.open(t,this.url,!0),this.type===e&&(this.rq.onprogress=function(){},this.rq.ontimeout=function(){},this.rq.onerror=function(){},this.rq.onload=function(){},this.rq.timeout=0)};return n.prototype={wrapCallback:function(t){var e=this;return function(r){e.clearTimeout(),t(e.rq,r)}},onReadyStateChange:function(t){this.type===e?(this.rq.readyState=3,this.rq.status=200,this.rq.onload=this.wrapCallback(t)):this.rq.onreadystatechange=this.wrapCallback(t)},onLoad:function(t){this.type===e&&(this.rq.readyState=3,this.rq.status=200),this.rq.onload=this.wrapCallback(t)},onError:function(t){this.type===e&&(this.rq.readyState=3,this.rq.status=500),this.rq.onerror=this.wrapCallback(t)},setHeader:function(t,e){"setRequestHeader"in this.rq&&this.rq.setRequestHeader(t,e)},setTimeout:function(t,e){this.timeout=t,this.timeoutCallback=e},abort:function(){this.rq&&this.rq.abort()},setupTimeoutTimer:function(t){if("number"==typeof t){var e=this;window.setTimeout(function(){e.rq.abort(),"function"==typeof e.timeoutCallback&&e.timeoutCallback()},t)}},clearTimeout:function(){window.clearTimeout(this.requestTimer),this.requestTimer=void 0},send:function(r){var n=this;this.setupTimeoutTimer(this.timeout),this.type===e?window.setTimeout(function(){n.rq.send(r)},t):this.rq.send(r)}},{AjaxRequest:n}}),!function(t){function e(t,e,r,n){var i,o,u,s,a,c,l,p,d,v;if((e?e.ownerDocument||e:H)!==k&&O(e),e=e||k,r=r||[],s=e.nodeType,"string"!=typeof t||!t||1!==s&&9!==s&&11!==s)return r;if(!n&&I){if(11!==s&&(i=yt.exec(t)))if(u=i[1]){if(9===s){if(o=e.getElementById(u),!o||!o.parentNode)return r;if(o.id===u)return r.push(o),r}else if(e.ownerDocument&&(o=e.ownerDocument.getElementById(u))&&P(e,o)&&o.id===u)return r.push(o),r}else{if(i[2])return Y.apply(r,e.getElementsByTagName(t)),r;if((u=i[3])&&x.getElementsByClassName)return Y.apply(r,e.getElementsByClassName(u)),r}if(x.qsa&&(!F||!F.test(t))){if(p=l=M,d=e,v=1!==s&&t,1===s&&"object"!==e.nodeName.toLowerCase()){for(c=S(t),(l=e.getAttribute("id"))?p=l.replace(bt,"\\$&"):e.setAttribute("id",p),p="[id='"+p+"'] ",a=c.length;a--;)c[a]=p+h(c[a]);d=wt.test(t)&&f(e.parentNode)||e,v=c.join(",")}if(v)try{return Y.apply(r,d.querySelectorAll(v)),r}catch(g){}finally{l||e.removeAttribute("id")}}}return q(t.replace(at,"$1"),e,r,n)}function n(){function t(r,n){return e.push(r+" ")>C.cacheLength&&delete t[e.shift()],t[r+" "]=n}var e=[];return t}function i(t){return t[M]=!0,t}function o(t){var e=k.createElement("div");try{return!!t(e)}catch(r){return!1}finally{e.parentNode&&e.parentNode.removeChild(e),e=null}}function u(t,e){for(var r=t.split("|"),n=t.length;n--;)C.attrHandle[r[n]]=e}function s(t,e){var r=e&&t,n=r&&1===t.nodeType&&1===e.nodeType&&(~e.sourceIndex||X)-(~t.sourceIndex||X);if(n)return n;if(r)for(;r=r.nextSibling;)if(r===e)return-1;return t?1:-1}function a(t){return function(e){var r=e.nodeName.toLowerCase();return"input"===r&&e.type===t}}function c(t){return function(e){var r=e.nodeName.toLowerCase();return("input"===r||"button"===r)&&e.type===t}}function l(t){return i(function(e){return e=+e,i(function(r,n){for(var i,o=t([],r.length,e),u=o.length;u--;)r[i=o[u]]&&(r[i]=!(n[i]=r[i]))})})}function f(t){return t&&"undefined"!=typeof t.getElementsByTagName&&t}function p(){}function h(t){for(var e=0,r=t.length,n="";r>e;e++)n+=t[e].value;return n}function d(t,e,r){var n=e.dir,i=r&&"parentNode"===n,o=$++;return e.first?function(e,r,o){for(;e=e[n];)if(1===e.nodeType||i)return t(e,r,o)}:function(e,r,u){var s,a,c=[z,o];if(u){for(;e=e[n];)if((1===e.nodeType||i)&&t(e,r,u))return!0}else for(;e=e[n];)if(1===e.nodeType||i){if(a=e[M]||(e[M]={}),(s=a[n])&&s[0]===z&&s[1]===o)return c[2]=s[2];if(a[n]=c,c[2]=t(e,r,u))return!0}}}function v(t){return t.length>1?function(e,r,n){for(var i=t.length;i--;)if(!t[i](e,r,n))return!1;return!0}:t[0]}function g(t,r,n){for(var i=0,o=r.length;o>i;i++)e(t,r[i],n);return n}function m(t,e,r,n,i){for(var o,u=[],s=0,a=t.length,c=null!=e;a>s;s++)(o=t[s])&&(!r||r(o,n,i))&&(u.push(o),c&&e.push(s));return u}function y(t,e,r,n,o,u){return n&&!n[M]&&(n=y(n)),o&&!o[M]&&(o=y(o,u)),i(function(i,u,s,a){var c,l,f,p=[],h=[],d=u.length,v=i||g(e||"*",s.nodeType?[s]:s,[]),y=!t||!i&&e?v:m(v,p,t,s,a),w=r?o||(i?t:d||n)?[]:u:y;if(r&&r(y,w,s,a),n)for(c=m(w,h),n(c,[],s,a),l=c.length;l--;)(f=c[l])&&(w[h[l]]=!(y[h[l]]=f));if(i){if(o||t){if(o){for(c=[],l=w.length;l--;)(f=w[l])&&c.push(y[l]=f);o(null,w=[],c,a)}for(l=w.length;l--;)(f=w[l])&&(c=o?et(i,f):p[l])>-1&&(i[c]=!(u[c]=f))}}else w=m(w===u?w.splice(d,w.length):w),o?o(null,u,w,a):Y.apply(u,w)})}function w(t){for(var e,r,n,i=t.length,o=C.relative[t[0].type],u=o||C.relative[" "],s=o?1:0,a=d(function(t){return t===e},u,!0),c=d(function(t){return et(e,t)>-1},u,!0),l=[function(t,r,n){var i=!o&&(n||r!==R)||((e=r).nodeType?a(t,r,n):c(t,r,n));return e=null,i}];i>s;s++)if(r=C.relative[t[s].type])l=[d(v(l),r)];else{if(r=C.filter[t[s].type].apply(null,t[s].matches),r[M]){for(n=++s;i>n&&!C.relative[t[n].type];n++);return y(s>1&&v(l),s>1&&h(t.slice(0,s-1).concat({value:" "===t[s-2].type?"*":""})).replace(at,"$1"),r,n>s&&w(t.slice(s,n)),i>n&&w(t=t.slice(n)),i>n&&h(t))}l.push(r)}return v(l)}function b(t,r){var n=r.length>0,o=t.length>0,u=function(i,u,s,a,c){var l,f,p,h=0,d="0",v=i&&[],g=[],y=R,w=i||o&&C.find.TAG("*",c),b=z+=null==y?1:Math.random()||.1,A=w.length;for(c&&(R=u!==k&&u);d!==A&&null!=(l=w[d]);d++){if(o&&l){for(f=0;p=t[f++];)if(p(l,u,s)){a.push(l);break}c&&(z=b)}n&&((l=!p&&l)&&h--,i&&v.push(l))}if(h+=d,n&&d!==h){for(f=0;p=r[f++];)p(v,g,u,s);if(i){if(h>0)for(;d--;)v[d]||g[d]||(g[d]=W.call(a));g=m(g)}Y.apply(a,g),c&&!i&&g.length>0&&h+r.length>1&&e.uniqueSort(a)}return c&&(z=b,R=y),v};return n?i(u):u}var A,x,C,_,E,S,N,q,R,T,L,O,k,D,I,F,j,B,P,M="sizzle"+1*new Date,H=t.document,z=0,$=0,V=n(),U=n(),G=n(),J=function(t,e){return t===e&&(L=!0),0},X=1<<31,Z={}.hasOwnProperty,K=[],W=K.pop,Q=K.push,Y=K.push,tt=K.slice,et=function(t,e){
for(var r=0,n=t.length;n>r;r++)if(t[r]===e)return r;return-1},rt="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",nt="[\\x20\\t\\r\\n\\f]",it="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ot="\\["+nt+"*("+it+")(?:"+nt+"*([*^$|!~]?=)"+nt+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+it+"))|)"+nt+"*\\]",ut=":("+it+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ot+")*)|.*)\\)|)",st=new RegExp(nt+"+","g"),at=new RegExp("^"+nt+"+|((?:^|[^\\\\])(?:\\\\.)*)"+nt+"+$","g"),ct=new RegExp("^"+nt+"*,"+nt+"*"),lt=new RegExp("^"+nt+"*([>+~]|"+nt+")"+nt+"*"),ft=new RegExp("="+nt+"*([^\\]'\"]*?)"+nt+"*\\]","g"),pt=new RegExp(ut),ht=new RegExp("^"+it+"$"),dt={ID:new RegExp("^#("+it+")"),CLASS:new RegExp("^\\.("+it+")"),TAG:new RegExp("^("+it+"|[*])"),ATTR:new RegExp("^"+ot),PSEUDO:new RegExp("^"+ut),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+nt+"*(even|odd|(([+-]|)(\\d*)n|)"+nt+"*(?:([+-]|)"+nt+"*(\\d+)|))"+nt+"*\\)|)","i"),bool:new RegExp("^(?:"+rt+")$","i"),needsContext:new RegExp("^"+nt+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+nt+"*((?:-\\d)?\\d*)"+nt+"*\\)|)(?=[^-]|$)","i")},vt=/^(?:input|select|textarea|button)$/i,gt=/^h\d$/i,mt=/^[^{]+\{\s*\[native \w/,yt=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,wt=/[+~]/,bt=/'|\\/g,At=new RegExp("\\\\([\\da-f]{1,6}"+nt+"?|("+nt+")|.)","ig"),xt=function(t,e,r){var n="0x"+e-65536;return n!==n||r?e:0>n?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320)},Ct=function(){O()};try{Y.apply(K=tt.call(H.childNodes),H.childNodes),K[H.childNodes.length].nodeType}catch(_t){Y={apply:K.length?function(t,e){Q.apply(t,tt.call(e))}:function(t,e){for(var r=t.length,n=0;t[r++]=e[n++];);t.length=r-1}}}x=e.support={},E=e.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;return e?"HTML"!==e.nodeName:!1},O=e.setDocument=function(t){var e,r,n=t?t.ownerDocument||t:H;return n!==k&&9===n.nodeType&&n.documentElement?(k=n,D=n.documentElement,r=n.defaultView,r&&r!==r.top&&(r.addEventListener?r.addEventListener("unload",Ct,!1):r.attachEvent&&r.attachEvent("onunload",Ct)),I=!E(n),x.attributes=o(function(t){return t.className="i",!t.getAttribute("className")}),x.getElementsByTagName=o(function(t){return t.appendChild(n.createComment("")),!t.getElementsByTagName("*").length}),x.getElementsByClassName=mt.test(n.getElementsByClassName),x.getById=o(function(t){return D.appendChild(t).id=M,!n.getElementsByName||!n.getElementsByName(M).length}),x.getById?(C.find.ID=function(t,e){if("undefined"!=typeof e.getElementById&&I){var r=e.getElementById(t);return r&&r.parentNode?[r]:[]}},C.filter.ID=function(t){var e=t.replace(At,xt);return function(t){return t.getAttribute("id")===e}}):(delete C.find.ID,C.filter.ID=function(t){var e=t.replace(At,xt);return function(t){var r="undefined"!=typeof t.getAttributeNode&&t.getAttributeNode("id");return r&&r.value===e}}),C.find.TAG=x.getElementsByTagName?function(t,e){return"undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t):x.qsa?e.querySelectorAll(t):void 0}:function(t,e){var r,n=[],i=0,o=e.getElementsByTagName(t);if("*"===t){for(;r=o[i++];)1===r.nodeType&&n.push(r);return n}return o},C.find.CLASS=x.getElementsByClassName&&function(t,e){return I?e.getElementsByClassName(t):void 0},j=[],F=[],(x.qsa=mt.test(n.querySelectorAll))&&(o(function(t){D.appendChild(t).innerHTML="<a id='"+M+"'></a><select id='"+M+"-\r\\' msallowcapture=''><option selected=''></option></select>",t.querySelectorAll("[msallowcapture^='']").length&&F.push("[*^$]="+nt+"*(?:''|\"\")"),t.querySelectorAll("[selected]").length||F.push("\\["+nt+"*(?:value|"+rt+")"),t.querySelectorAll("[id~="+M+"-]").length||F.push("~="),t.querySelectorAll(":checked").length||F.push(":checked"),t.querySelectorAll("a#"+M+"+*").length||F.push(".#.+[+~]")}),o(function(t){var e=n.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),t.querySelectorAll("[name=d]").length&&F.push("name"+nt+"*[*^$|!~]?="),t.querySelectorAll(":enabled").length||F.push(":enabled",":disabled"),t.querySelectorAll("*,:x"),F.push(",.*:")})),(x.matchesSelector=mt.test(B=D.matches||D.webkitMatchesSelector||D.mozMatchesSelector||D.oMatchesSelector||D.msMatchesSelector))&&o(function(t){x.disconnectedMatch=B.call(t,"div"),B.call(t,"[s!='']:x"),j.push("!=",ut)}),F=F.length&&new RegExp(F.join("|")),j=j.length&&new RegExp(j.join("|")),e=mt.test(D.compareDocumentPosition),P=e||mt.test(D.contains)?function(t,e){var r=9===t.nodeType?t.documentElement:t,n=e&&e.parentNode;return t===n||!(!n||1!==n.nodeType||!(r.contains?r.contains(n):t.compareDocumentPosition&&16&t.compareDocumentPosition(n)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},J=e?function(t,e){if(t===e)return L=!0,0;var r=!t.compareDocumentPosition-!e.compareDocumentPosition;return r?r:(r=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1,1&r||!x.sortDetached&&e.compareDocumentPosition(t)===r?t===n||t.ownerDocument===H&&P(H,t)?-1:e===n||e.ownerDocument===H&&P(H,e)?1:T?et(T,t)-et(T,e):0:4&r?-1:1)}:function(t,e){if(t===e)return L=!0,0;var r,i=0,o=t.parentNode,u=e.parentNode,a=[t],c=[e];if(!o||!u)return t===n?-1:e===n?1:o?-1:u?1:T?et(T,t)-et(T,e):0;if(o===u)return s(t,e);for(r=t;r=r.parentNode;)a.unshift(r);for(r=e;r=r.parentNode;)c.unshift(r);for(;a[i]===c[i];)i++;return i?s(a[i],c[i]):a[i]===H?-1:c[i]===H?1:0},n):k},e.matches=function(t,r){return e(t,null,null,r)},e.matchesSelector=function(t,r){if((t.ownerDocument||t)!==k&&O(t),r=r.replace(ft,"='$1']"),!(!x.matchesSelector||!I||j&&j.test(r)||F&&F.test(r)))try{var n=B.call(t,r);if(n||x.disconnectedMatch||t.document&&11!==t.document.nodeType)return n}catch(i){}return e(r,k,null,[t]).length>0},e.contains=function(t,e){return(t.ownerDocument||t)!==k&&O(t),P(t,e)},e.attr=function(t,e){(t.ownerDocument||t)!==k&&O(t);var r=C.attrHandle[e.toLowerCase()],n=r&&Z.call(C.attrHandle,e.toLowerCase())?r(t,e,!I):void 0;

return void 0!==n?n:x.attributes||!I?t.getAttribute(e):(n=t.getAttributeNode(e))&&n.specified?n.value:null},e.error=function(t){throw new Error("Syntax error, unrecognized expression: "+t)},e.uniqueSort=function(t){var e,r=[],n=0,i=0;if(L=!x.detectDuplicates,T=!x.sortStable&&t.slice(0),t.sort(J),L){for(;e=t[i++];)e===t[i]&&(n=r.push(i));for(;n--;)t.splice(r[n],1)}return T=null,t},_=e.getText=function(t){var e,r="",n=0,i=t.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)r+=_(t)}else if(3===i||4===i)return t.nodeValue}else for(;e=t[n++];)r+=_(e);return r},C=e.selectors={cacheLength:50,createPseudo:i,match:dt,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(t){return t[1]=t[1].replace(At,xt),t[3]=(t[3]||t[4]||t[5]||"").replace(At,xt),"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(t){var e,r=!t[6]&&t[2];return dt.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":r&&pt.test(r)&&(e=S(r,!0))&&(e=r.indexOf(")",r.length-e)-r.length)&&(t[0]=t[0].slice(0,e),t[2]=r.slice(0,e)),t.slice(0,3))}},filter:{TAG:function(t){var e=t.replace(At,xt).toLowerCase();return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e}},CLASS:function(t){var e=V[t+" "];return e||(e=new RegExp("(^|"+nt+")"+t+"("+nt+"|$)"))&&V(t,function(t){return e.test("string"==typeof t.className&&t.className||"undefined"!=typeof t.getAttribute&&t.getAttribute("class")||"")})},ATTR:function(t,r,n){return function(i){var o=e.attr(i,t);return null==o?"!="===r:r?(o+="","="===r?o===n:"!="===r?o!==n:"^="===r?n&&0===o.indexOf(n):"*="===r?n&&o.indexOf(n)>-1:"$="===r?n&&o.slice(-n.length)===n:"~="===r?(" "+o.replace(st," ")+" ").indexOf(n)>-1:"|="===r?o===n||o.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(t,e,r,n,i){var o="nth"!==t.slice(0,3),u="last"!==t.slice(-4),s="of-type"===e;return 1===n&&0===i?function(t){return!!t.parentNode}:function(e,r,a){var c,l,f,p,h,d,v=o!==u?"nextSibling":"previousSibling",g=e.parentNode,m=s&&e.nodeName.toLowerCase(),y=!a&&!s;if(g){if(o){for(;v;){for(f=e;f=f[v];)if(s?f.nodeName.toLowerCase()===m:1===f.nodeType)return!1;d=v="only"===t&&!d&&"nextSibling"}return!0}if(d=[u?g.firstChild:g.lastChild],u&&y){for(l=g[M]||(g[M]={}),c=l[t]||[],h=c[0]===z&&c[1],p=c[0]===z&&c[2],f=h&&g.childNodes[h];f=++h&&f&&f[v]||(p=h=0)||d.pop();)if(1===f.nodeType&&++p&&f===e){l[t]=[z,h,p];break}}else if(y&&(c=(e[M]||(e[M]={}))[t])&&c[0]===z)p=c[1];else for(;(f=++h&&f&&f[v]||(p=h=0)||d.pop())&&((s?f.nodeName.toLowerCase()!==m:1!==f.nodeType)||!++p||(y&&((f[M]||(f[M]={}))[t]=[z,p]),f!==e)););return p-=i,p===n||p%n===0&&p/n>=0}}},PSEUDO:function(t,r){var n,o=C.pseudos[t]||C.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return o[M]?o(r):o.length>1?(n=[t,t,"",r],C.setFilters.hasOwnProperty(t.toLowerCase())?i(function(t,e){for(var n,i=o(t,r),u=i.length;u--;)n=et(t,i[u]),t[n]=!(e[n]=i[u])}):function(t){return o(t,0,n)}):o}},pseudos:{not:i(function(t){var e=[],r=[],n=N(t.replace(at,"$1"));return n[M]?i(function(t,e,r,i){for(var o,u=n(t,null,i,[]),s=t.length;s--;)(o=u[s])&&(t[s]=!(e[s]=o))}):function(t,i,o){return e[0]=t,n(e,null,o,r),e[0]=null,!r.pop()}}),has:i(function(t){return function(r){return e(t,r).length>0}}),contains:i(function(t){return t=t.replace(At,xt),function(e){return(e.textContent||e.innerText||_(e)).indexOf(t)>-1}}),lang:i(function(t){return ht.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(At,xt).toLowerCase(),function(e){var r;do if(r=I?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return r=r.toLowerCase(),r===t||0===r.indexOf(t+"-");while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var r=t.location&&t.location.hash;return r&&r.slice(1)===e.id},root:function(t){return t===D},focus:function(t){return t===k.activeElement&&(!k.hasFocus||k.hasFocus())&&!!(t.type||t.href||~t.tabIndex)},enabled:function(t){return t.disabled===!1},disabled:function(t){return t.disabled===!0},checked:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&!!t.checked||"option"===e&&!!t.selected},selected:function(t){return t.parentNode&&t.parentNode.selectedIndex,t.selected===!0},empty:function(t){for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;return!0},parent:function(t){return!C.pseudos.empty(t)},header:function(t){return gt.test(t.nodeName)},input:function(t){return vt.test(t.nodeName)},button:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&"button"===t.type||"button"===e},text:function(t){var e;return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase())},first:l(function(){return[0]}),last:l(function(t,e){return[e-1]}),eq:l(function(t,e,r){return[0>r?r+e:r]}),even:l(function(t,e){for(var r=0;e>r;r+=2)t.push(r);return t}),odd:l(function(t,e){for(var r=1;e>r;r+=2)t.push(r);return t}),lt:l(function(t,e,r){for(var n=0>r?r+e:r;--n>=0;)t.push(n);return t}),gt:l(function(t,e,r){for(var n=0>r?r+e:r;++n<e;)t.push(n);return t})}},C.pseudos.nth=C.pseudos.eq;for(A in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[A]=a(A);for(A in{submit:!0,reset:!0})C.pseudos[A]=c(A);p.prototype=C.filters=C.pseudos,C.setFilters=new p,S=e.tokenize=function(t,r){var n,i,o,u,s,a,c,l=U[t+" "];if(l)return r?0:l.slice(0);for(s=t,a=[],c=C.preFilter;s;){(!n||(i=ct.exec(s)))&&(i&&(s=s.slice(i[0].length)||s),a.push(o=[])),n=!1,(i=lt.exec(s))&&(n=i.shift(),o.push({value:n,type:i[0].replace(at," ")}),s=s.slice(n.length));for(u in C.filter)!(i=dt[u].exec(s))||c[u]&&!(i=c[u](i))||(n=i.shift(),o.push({value:n,type:u,matches:i}),s=s.slice(n.length));if(!n)break;

}return r?s.length:s?e.error(t):U(t,a).slice(0)},N=e.compile=function(t,e){var r,n=[],i=[],o=G[t+" "];if(!o){for(e||(e=S(t)),r=e.length;r--;)o=w(e[r]),o[M]?n.push(o):i.push(o);o=G(t,b(i,n)),o.selector=t}return o},q=e.select=function(t,e,r,n){var i,o,u,s,a,c="function"==typeof t&&t,l=!n&&S(t=c.selector||t);if(r=r||[],1===l.length){if(o=l[0]=l[0].slice(0),o.length>2&&"ID"===(u=o[0]).type&&x.getById&&9===e.nodeType&&I&&C.relative[o[1].type]){if(e=(C.find.ID(u.matches[0].replace(At,xt),e)||[])[0],!e)return r;c&&(e=e.parentNode),t=t.slice(o.shift().value.length)}for(i=dt.needsContext.test(t)?0:o.length;i--&&(u=o[i],!C.relative[s=u.type]);)if((a=C.find[s])&&(n=a(u.matches[0].replace(At,xt),wt.test(o[0].type)&&f(e.parentNode)||e))){if(o.splice(i,1),t=n.length&&h(o),!t)return Y.apply(r,n),r;break}}return(c||N(t,l))(n,e,!I,r,wt.test(t)&&f(e.parentNode)||e),r},x.sortStable=M.split("").sort(J).join("")===M,x.detectDuplicates=!!L,O(),x.sortDetached=o(function(t){return 1&t.compareDocumentPosition(k.createElement("div"))}),o(function(t){return t.innerHTML="<a href='#'></a>","#"===t.firstChild.getAttribute("href")})||u("type|href|height|width",function(t,e,r){return r?void 0:t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),x.attributes&&o(function(t){return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value")})||u("value",function(t,e,r){return r||"input"!==t.nodeName.toLowerCase()?void 0:t.defaultValue}),o(function(t){return null==t.getAttribute("disabled")})||u(rt,function(t,e,r){var n;return r?void 0:t[e]===!0?e.toLowerCase():(n=t.getAttributeNode(e))&&n.specified?n.value:null}),"function"==typeof r&&r.amd?r("jquery",[],function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:t.Sizzle=e}(window),r("interpreter",["cslparser","request","jquery"],function(t,e,r){function n(t,e){var r;if(null===t||null===e)return t===e;if(void 0===t||void 0===e)return t===e;for(r in e)if("_"!==r[0]&&!t.hasOwnProperty(r))return!1;for(r in t)if(t.hasOwnProperty(r)&&"_"!==r[0]){if(!e.hasOwnProperty(r))return!1;if(t[r])switch(typeof t[r]){case"object":if(!n(t[r],e[r]))return!1;break;default:if(t[r]!==e[r])return!1}else if(e[r])return!1}return!0}function i(t,e){var r,n,i=e;this.pause=function(){window.clearTimeout(r),i-=new Date-n},this.resume=function(){n=new Date,r=window.setTimeout(function(){t()},i)},this.cancel=function(){window.clearTimeout(r)},this.resume()}var o=function(t){this.message=t,this.name="TypeError"},u=function(t){this.message=t,this.name="ValueError"},s=function(t){this.message=t,this.name="RequireError"};s.prototype.getMessage=function(){return this.name+": "+this.message};var a=function(t){this.message=t,this.name="InterpreterError"},c=function(){this.name="InterruptException"},l=function(t,e,r,n){this.doc=t.document,this.window=t,this.ret={},this.id=l.id++,this.first_run=!0;var i=this;this.return_callback=function(t){e(t,i.getCurrentContext())},this.error_callback=function(t){var e=i.getCurrentContext();e._modified&&r(t,e)},this.event_callback=function(t){n(t)}};return l.id=0,l.prototype.InterpreterError=a,l.prototype.RequireError=s,l.prototype.interpretNext=function(){var t=this.stmt_stack;if(t.length>0){var e=t.pop();try{e.interpret(this),this.interpretNext()}catch(r){r instanceof c?t.push(e):this.error_callback.call(this,r)}}},l.prototype.getCurrentContext=function(){var t={_refresh:void 0!==this.refresh_timer};for(var e in this.variables)if(this.variables.hasOwnProperty(e)){var r=e.substring(1);t[r]=this.variables[e]}return t._modified=void 0===this.previousContext?!0:!n(this.previousContext,t),t},l.prototype.interpret=function(e){if(this.first_run?(this.previousContext=void 0,this.first_run=!1):this.previousContext=this.getCurrentContext(),"string"==typeof e)try{this.ast=t.parse(e)}catch(r){return void this.error_callback(r)}else this.ast=e;this.variables={},this.temp={},this.stmt_stack=[],this.refresh_timer=void 0,this.wait_timer=void 0,this.ast.interpret(this)},l.prototype.pause_timers=function(){this.refresh_timer&&this.refresh_timer.pause(),this.wait_timer&&this.wait_timer.pause()},l.prototype.resume_timers=function(){this.refresh_timer&&this.refresh_timer.resume(),this.wait_timer&&this.wait_timer.resume()},l.prototype.close=function(){this.refresh_timer&&this.refresh_timer.cancel(),this.wait_timer&&this.wait_timer.cancel()},l.prototype._getNodeList=function(t){if("string"!=typeof t)throw new a("First argument needs to be a selector.");try{return r(t,this.doc)}catch(e){throw new a("CSS Selector - "+e)}},l.prototype.function_table={call:function(){var t=Array.prototype.slice.call(arguments);if(t.length<2)throw new a("Wrong number of arguments.");for(var e=t[0],n=t[1],i=t.slice(2),o=this._getNodeList(e),u=0;u<o.length;u++){var s=r(o[u]);s[n]&&s[n].apply(s,i)}},event:function(){var t=Array.prototype.slice.call(arguments);this.event_callback(t)},json:function(){var t=Array.prototype.slice.call(arguments);if(t.length%2!==0)throw new a("Need even number of arguments.");for(var e=0,r={};e<t.length;r[t[e]]=t[e+1],e+=2);return JSON.stringify(r)},setAttribute:function(){var t=Array.prototype.slice.call(arguments);if(t.length<3)throw new a("Wrong number of arguments.");for(var e=t[0],r=t[1],n=t[2],i=this._getNodeList(e),o=0;o<i.length;o++)i[o][r]=n},"const":function(t){return t},sizzle:function(){var t,e=Array.prototype.slice.call(arguments),r=e[0];e.length>1&&(t=e[1]);var n=this._getNodeList(r);if(0===n.length)return"";for(var i=[],o=0;o<n.length;o++){var u=n[o],s="";s=t?"textContent"===t?u.textContent||u.innerText:u.getAttribute(t):u.innerHTML,i.push(s)}return 1===i.length?i[0]:i},debug:function(){return void 0},httpGet:function(t){var r=this,n=this.temp,i="__httpGet__"+t;if(i in n){var o=n[i];return delete n[i],o}var u=new e.AjaxRequest("GET",t);throw u.onReadyStateChange(function(t){var e=null;4===t.readyState&&(200===t.status&&(e=t.responseText),n[i]=e,r.interpretNext())}),u.onError(function(){n[i]=null,r.interpretNext()}),u.send(null),
new c},join:function(t,e){return t.join(e)},len:function(t){return t.hasOwnProperty("length")?t.length:void 0},re:function(){var t=Array.prototype.slice.call(arguments),e=this.doc.documentElement.innerHTML,r=t[0],n="";if(t.length>=2&&(n=t[1]),3===t.length&&(e=t[2]),t.length>3)throw new u("'re' expression expects 3 arguments at most.");if(!e)return"";if("string"!=typeof e)try{e=e.toString()}catch(i){throw new u("'re' block argument has no 'toString'.")}e=e.replace(/(\r|\n)/gi,""),r instanceof RegExp&&(r=r.source),r=r.replace(/"([^?])/gi,'"?$1'),-1===n.search("i")&&(n+="i"),r=new RegExp(r,n);var o=e.match(r);return o?-1!==n.search("g")?o:1===o.length?!0:o[1]:""},refresh:function(t){var e=this;if(void 0===t)throw new u("refresh interval argument required.");if(t=parseInt(t,10),1e3>t)throw new u("interval must be at least 1000.");this.refresh_timer&&this.refresh_timer.cancel(),this.refresh_timer=new i(function(){e.interpret(e.ast)},t)},replace:function(){var t=Array.prototype.slice.call(arguments),e=t.shift();if("string"!=typeof e)throw new o("First argument must be of type string.");if(0===t.length||t.length%2!==0)throw new u("ReplaceExpression got wrong number of args.");t.reverse();for(var r=2;t.length>0;){var n=t.pop();n instanceof RegExp&&(n=n.source);var i=t.pop();try{n=new RegExp(n,"gi")}catch(s){throw new u("Cannot create RegExp for "+n)}r+=2,e=e.replace(n,i)}return e},trim:function(t){return"string"==typeof t&&(t=t.replace(/\s+/gi," "),t=t.replace(/^\s/i,"").replace(/\s$/i,"")),t},url:function(){var t=this.doc;try{return t.location.href}catch(e){throw new a("'doc' has no property 'location.href'.")}},urlParam:function(t){var e,r=this.doc;try{e=r.location.href}catch(n){throw new a("'doc' has no property 'location.href'.")}for(var i=e.slice(e.indexOf("?")+1).split("&"),o={},u=0,s=i.length;s>u;u++){var c=i[u].split("=");o[c[0]]=c[1]}return o[t]},version:function(){return t?t.VERSION:void 0},at_least_version:function(e){function r(t){if("string"!=typeof t)return!1;var e=t.split("."),r=parseInt(e[0],10)||0,n=parseInt(e[1],10)||0,i=parseInt(e[2],10)||0;return{major:r,minor:n,patch:i}}if(!t)throw new a("CSL Parser not in namespace. ");var n=r(e),i=r(t.VERSION);return i.major!==n.major?i.major>n.major:i.minor!==n.minor?i.minor>n.minor:i.patch!==n.patch?i.patch>n.patch:!0},wait:function(t){var e=this;if(!("wait_token"in this.temp)){if(t=parseInt(t,10),0>t)throw new u("Delay must be larger than 0.");throw window.setTimeout(function(){e.temp.wait_token=null,e.interpretNext()},t),new c}delete this.temp.wait_token},xpath:function(t){var e=this.doc;if(!("evaluate"in e))throw new a("DOM doc object has no 'evaluate' function.");var r=null;try{r=e.evaluate(t,e,null,2,null)}catch(n){throw new a(n)}return r?r.stringValue:""}},{TypeError:o,ValueError:u,InterruptException:c,Interpreter:l}}),r("utils",[],function(){function t(t,e){return t===e?0:e>t?-1:1}function e(e,r){var n=t;return e&&(n=function(r,n){return t(e(r),e(n))}),r?function(t,e){return-1*n(t,e)}:n}function r(){for(var t=[],e="0123456789ABCDEF",r=0;36>r;r++)t[r]=Math.floor(16*Math.random());for(t[14]=4,t[19]=3&t[19]|8,r=0;36>r;r++)t[r]=e[t[r]];return t[8]=t[13]=t[18]=t[23]="-",t.join("")}function n(t){for(var e in t)if(t.hasOwnProperty(e))return!1;return JSON.stringify(t)===JSON.stringify({})}return{getHostname:function(t){return t.match(/^(https?:\/\/.*?(?::\d+)?\/)/)[1]},sort:function(r){for(var n,i,o,u=[],s=1;s<arguments.length;s++)n=arguments[s],"string"==typeof n?(i=n,o=t):(i=n.name,o=e(n.primer,n.reverse)),u.push({name:i,cmp:o});var a=function(t,e){for(var r=0,n=0;n<u.length;n++){var i=u[n];if("undefined"!=typeof t[i.name]&&(r=i.cmp(t[i.name],e[i.name]),0!==r))break}return r};r.sort(a)},makeRandomString:function(t){for(var e="",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",n=0;t>n;n++)e+=r.charAt(Math.floor(Math.random()*r.length));return e},settings_sanity_check:function(t){if("object"!=typeof t)throw"settings must be object";if(!t.tag)throw"settings.tag is mandatory";"about:blank"===t.url&&(t.url=void 0)},generateRandomUUID:r,isEmptyObject:n}}),r("debug",[],function(){var t,e;return{setup:function(r){e=r,e.console||(t=e.document.createElement("div"),t.style.position="fixed",t.style.bottom="0",t.style.left="0",t.style.width="100%",t.style.maxHeight="200px",t.style.fontFamily="sans-serif",t.style.fontSize="10px",t.style.border="2px solid red",t.style.padding="2px",t.style.boxShadow="3px 3px 8px #aaa",t.style.background="#fff",t.style.zIndex="2147483647",t.style.overflowY="scroll",e.document.getElementsByTagName("body")[0].appendChild(t)),this.log("Debug enabled.")},log:function(){var r=new Date;if(e.console)try{e.console.log.call(e.console,r,1===arguments.length?arguments[0]:arguments)}catch(n){}else if(t){var i=e.document.createElement("div");i.style.borderBottom="1px",i.style.borderBottomStyle="dotted",i.style.borderBottomColor="#ddd",i.innerHTML="<i>"+r+"</i> "+("string"==typeof arguments[0]&&1===arguments.length?arguments[0]:JSON.stringify(arguments)),t.appendChild(i)}}}}),r("events",["debug"],function(){var t={listeners:{}},e=function(e,r){"undefined"==typeof t.listeners[e]&&(t.listeners[e]=[]),t.listeners[e].push(r)},r=function(e){if("undefined"!=typeof t.listeners[e])for(var r=0;r<t.listeners[e].length;r++)if("function"==typeof t.listeners[e][r]){var n=Array.prototype.slice.call(arguments,1);try{t.listeners[e][r].apply(this,n)}catch(i){}}};return{on:e,trigger:r}}),r("page",["constants","interpreter","request","utils","events"],function(t,e,r,n,i){var o=function(e,r){n.settings_sanity_check(r),this.doc=e,this.referrer=e.location.referer,this.listeners={},this.num_pending_plugins=0,this.api_url_search=t.get_url("analyze",r),this.api_url_coupon=t.get_url("voucher",r),this.settings=r,this.offers={},this.totalOffers=0,this.on=i.on,this.trigger=i.trigger};return o.prototype={load:function(){var e=this,i=new r.AjaxRequest("GET",this.api_url_search,{url:n.getHostname(this.settings.url||this.doc.location.href),version:t.version,
tag:this.settings.tag,campaign:this.settings.campaign,uuid:this.settings.uuid});i.onLoad(function(t){200===t.status?e.domainConfigReceived(t):e.trigger("error",{message:"Could not retrieve domain configuration."})}),i.send()},clearOffers:function(t){this.offers.hasOwnProperty(t)&&(this.totalOffers-=this.offers[t].count),delete this.offers[t]},doCiuvoSearch:function(t,r){var n=this,i=new e.Interpreter(window,function(e){n.callSearchBackend(e,t,r.plugin_name)},function(t){n.trigger("error",t)},function(){});i.interpret(r.csl)},getUrl:function(){return this.settings.url||this.doc.location.href},doVoucherSearch:function(e,i){this.num_pending_plugins++;var o={url:n.getHostname(this.getUrl()),referrer:this.referrer,version:t.version,tag:this.settings.tag,campaign:this.settings.campaign,uuid:this.settings.uuid,limit:this.settings.limit,filter:this.settings.filter,init:this.settings.init};"undefined"!=typeof this.settings.user_preferences&&(o.cfg=this.settings.user_preferences);var u=new r.AjaxRequest("GET",this.api_url_coupon,o),s=this;this.clearOffers(i.plugin_name),u.onLoad(function(t){s.parseResponse(t,e,i.plugin_name)}),u.send()},domainConfigReceived:function(t){var e=JSON.parse(t.responseText),r=this,n=function(t,e){t&&!t.morepending&&r.num_pending_plugins--,r.processResponseChunk(t,e)};if(201===e.status)for(var i=0;i<e.plugins.length;i++){var o=e.plugins[i],u=o[0],s=o[1]||{};if(s.plugin_name=u,s.csl||(s.csl=e.csl),"function"==typeof this["do"+u])try{this["do"+u].apply(this,[n,s])}catch(a){}}else this.trigger("error",{message:"This webpage is not configured."})},callSearchBackend:function(e,n,i){this.num_pending_plugins++,this.clearOffers(i);var o={query:e,url:this.settings.url||this.doc.location.href,tag:this.settings.tag,version:t.version};"undefined"!=typeof this.settings.user_preferences&&(o.cfg=this.settings.user_preferences);for(var u=["campaign","uuid","filter","limit","init"],s=0;s<u.length;s++)this.settings[u[s]]&&(o[u[s]]=this.settings[u[s]]);this.referer&&(o.referer=this.referer);var a=new r.AjaxRequest("POST",this.api_url_search),c=this;a.onLoad(function(t){c.parseResponse(t,n,i)}),a.send(JSON.stringify(o))},parseResponse:function(t,e,r){if(2===t.readyState&&200===t.status&&(t.chunks_read=0),(3===t.readyState||4===t.readyState)&&200===t.status&&"\n"===t.responseText.slice(-1)){var n=t.responseText.split("\n"),i=n.slice(t.chunks_read);t.chunks_read=n.length;for(var o=0,u=i.length;u>o;o++)if(0!==i[o].length){var s=JSON.parse(i[o]);e(s,r)}}},processResponseChunk:function(t,e){this.offers.hasOwnProperty(e)||(this.offers[e]={count:0});for(var r=t.items[0],n=0,i=r.offers.length;i>n;n++){var o=r.offers[n];this.offers[e].hasOwnProperty(o.category)||(this.offers[e][o.category]={category:o.category,priority:o.priority,offers:[]}),this.offers[e][o.category].offers.push(o),this.offers[e].count++,this.totalOffers++,this.trigger("offer",o)}t.morepending||this.num_pending_plugins||(this.trigger("offers",this.sortOffers()),this.trigger("finalize"))},mergeOffers:function(){allOffers={};var t=function(t){return JSON.parse(JSON.stringify(t))};for(var e in this.offers)if(this.offers.hasOwnProperty(e))for(var r in this.offers[e])this.offers[e].hasOwnProperty(r)&&"object"==typeof this.offers[e][r]&&(allOffers.hasOwnProperty(r)?allOffers[r].offers.concat(t(this.offers[e][r].offers)):allOffers[r]=t(this.offers[e][r]));return allOffers},sortOffers:function(){allOffers=this.mergeOffers();for(var t in allOffers)allOffers.hasOwnProperty(t)&&n.sort(allOffers[t].offers,{name:"sortorder",primer:parseInt});return allOffers},close:function(){}},{ConnectedPage:o}}),r("ciuvoSDK",["constants"],function(t){var r={version:t.version};return e(["page","interpreter","cslparser"]),r.ConnectedPage=e("page").ConnectedPage,r.Interpreter=e("interpreter").Interpreter,r.Parser=e("cslparser"),r}),e("ciuvoSDK")});


module.exports = this.ciuvoSDK; // Added for browserify compatibility

},{}],22:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],23:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_hide":49,"./_wks":100}],24:[function(require,module,exports){
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":89}],25:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],26:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":56}],27:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":92,"./_to-iobject":94,"./_to-length":95}],28:[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_array-species-create":30,"./_ctx":36,"./_iobject":53,"./_to-length":95,"./_to-object":96}],29:[function(require,module,exports){
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-array":55,"./_is-object":56,"./_wks":100}],30:[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":29}],31:[function(require,module,exports){
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

},{"./_a-function":22,"./_invoke":52,"./_is-object":56}],32:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":33,"./_wks":100}],33:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],34:[function(require,module,exports){
var core = module.exports = { version: '2.6.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],35:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":68,"./_property-desc":78}],36:[function(require,module,exports){
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

},{"./_a-function":22}],37:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],38:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":43}],39:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":47,"./_is-object":56}],40:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],41:[function(require,module,exports){
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

},{"./_core":34,"./_ctx":36,"./_global":47,"./_hide":49,"./_redefine":80}],42:[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":100}],43:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],44:[function(require,module,exports){
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./_defined":37,"./_fails":43,"./_hide":49,"./_redefine":80,"./_regexp-exec":82,"./_wks":100,"./es6.regexp.exec":113}],45:[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":26}],46:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":26,"./_ctx":36,"./_is-array-iter":54,"./_iter-call":58,"./_to-length":95,"./core.get-iterator-method":101}],47:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],48:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],49:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":38,"./_object-dp":68,"./_property-desc":78}],50:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":47}],51:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":38,"./_dom-create":39,"./_fails":43}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":33}],54:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":63,"./_wks":100}],55:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":33}],56:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],57:[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_cof":33,"./_is-object":56,"./_wks":100}],58:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":26}],59:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":49,"./_object-create":67,"./_property-desc":78,"./_set-to-string-tag":84,"./_wks":100}],60:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":41,"./_hide":49,"./_iter-create":59,"./_iterators":63,"./_library":64,"./_object-gpo":70,"./_redefine":80,"./_set-to-string-tag":84,"./_wks":100}],61:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":100}],62:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],63:[function(require,module,exports){
module.exports = {};

},{}],64:[function(require,module,exports){
module.exports = false;

},{}],65:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":33,"./_global":47,"./_task":91}],66:[function(require,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":22}],67:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":26,"./_dom-create":39,"./_enum-bug-keys":40,"./_html":50,"./_object-dps":69,"./_shared-key":85}],68:[function(require,module,exports){
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

},{"./_an-object":26,"./_descriptors":38,"./_ie8-dom-define":51,"./_to-primitive":97}],69:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":26,"./_descriptors":38,"./_object-dp":68,"./_object-keys":72}],70:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":48,"./_shared-key":85,"./_to-object":96}],71:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":27,"./_has":48,"./_shared-key":85,"./_to-iobject":94}],72:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":40,"./_object-keys-internal":71}],73:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],74:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":34,"./_export":41,"./_fails":43}],75:[function(require,module,exports){
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

},{"./_object-keys":72,"./_object-pie":73,"./_to-iobject":94}],76:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],77:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":26,"./_is-object":56,"./_new-promise-capability":66}],78:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],79:[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":80}],80:[function(require,module,exports){
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

},{"./_core":34,"./_global":47,"./_has":48,"./_hide":49,"./_uid":98}],81:[function(require,module,exports){
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":32}],82:[function(require,module,exports){
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":45}],83:[function(require,module,exports){
'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_descriptors":38,"./_global":47,"./_object-dp":68,"./_wks":100}],84:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":48,"./_object-dp":68,"./_wks":100}],85:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":86,"./_uid":98}],86:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":34,"./_global":47,"./_library":64}],87:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":22,"./_an-object":26,"./_wks":100}],88:[function(require,module,exports){
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":43}],89:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":37,"./_to-integer":93}],90:[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_defined":37,"./_is-regexp":57}],91:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":33,"./_ctx":36,"./_dom-create":39,"./_global":47,"./_html":50,"./_invoke":52}],92:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":93}],93:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],94:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":37,"./_iobject":53}],95:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":93}],96:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":37}],97:[function(require,module,exports){
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

},{"./_is-object":56}],98:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],99:[function(require,module,exports){
var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":47}],100:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":47,"./_shared":86,"./_uid":98}],101:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":32,"./_core":34,"./_iterators":63,"./_wks":100}],102:[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_add-to-unscopables":23,"./_array-methods":28,"./_export":41}],103:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $forEach = require('./_array-methods')(0);
var STRICT = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

},{"./_array-methods":28,"./_export":41,"./_strict-method":88}],104:[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":35,"./_ctx":36,"./_export":41,"./_is-array-iter":54,"./_iter-call":58,"./_iter-detect":61,"./_to-length":95,"./_to-object":96,"./core.get-iterator-method":101}],105:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var $indexOf = require('./_array-includes')(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !require('./_strict-method')($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

},{"./_array-includes":27,"./_export":41,"./_strict-method":88}],106:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":23,"./_iter-define":60,"./_iter-step":62,"./_iterators":63,"./_to-iobject":94}],107:[function(require,module,exports){
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"./_export":41,"./_fails":43,"./_to-object":96,"./_to-primitive":97}],108:[function(require,module,exports){
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  require('./_redefine')(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

},{"./_redefine":80}],109:[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', { bind: require('./_bind') });

},{"./_bind":31,"./_export":41}],110:[function(require,module,exports){
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_descriptors":38,"./_object-dp":68}],111:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":72,"./_object-sap":74,"./_to-object":96}],112:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":22,"./_an-instance":25,"./_classof":32,"./_core":34,"./_ctx":36,"./_export":41,"./_for-of":46,"./_global":47,"./_is-object":56,"./_iter-detect":61,"./_library":64,"./_microtask":65,"./_new-promise-capability":66,"./_perform":76,"./_promise-resolve":77,"./_redefine-all":79,"./_set-species":83,"./_set-to-string-tag":84,"./_species-constructor":87,"./_task":91,"./_user-agent":99,"./_wks":100}],113:[function(require,module,exports){
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_export":41,"./_regexp-exec":82}],114:[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":38,"./_flags":45,"./_object-dp":68}],115:[function(require,module,exports){
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return ch;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return ch;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return ch;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_advance-string-index":24,"./_an-object":26,"./_fix-re-wks":44,"./_regexp-exec-abstract":81,"./_to-integer":93,"./_to-length":95,"./_to-object":96}],116:[function(require,module,exports){
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';

// eslint-disable-next-line no-empty
var SUPPORTS_Y = !!(function () { try { return new RegExp('x', 'y'); } catch (e) {} })();

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? 0xffffffff : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_advance-string-index":24,"./_an-object":26,"./_fix-re-wks":44,"./_is-regexp":57,"./_regexp-exec":82,"./_regexp-exec-abstract":81,"./_species-constructor":87,"./_to-length":95}],117:[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./_an-object":26,"./_descriptors":38,"./_fails":43,"./_flags":45,"./_redefine":80,"./es6.regexp.flags":114}],118:[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":41,"./_fails-is-regexp":42,"./_string-context":90}],119:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":60,"./_string-at":89}],120:[function(require,module,exports){
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_add-to-unscopables":23,"./_array-includes":27,"./_export":41}],121:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":41,"./_object-to-array":75}],122:[function(require,module,exports){
var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./_global":47,"./_hide":49,"./_iterators":63,"./_object-keys":72,"./_redefine":80,"./_wks":100,"./es6.array.iterator":106}],123:[function(require,module,exports){
"use strict";

module.exports = require('./src/ContentMessenger');

},{"./src/ContentMessenger":124}],124:[function(require,module,exports){
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

},{"./ContentTopic":125,"./Messenger":126,"./chrome":128}],125:[function(require,module,exports){
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

},{"./Topic":127,"./chrome":128}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
"use strict";

/* globals chrome, browser */
if (typeof browser !== 'undefined' && browser.runtime) {
  module.exports = browser;
} else {
  module.exports = chrome;
}

},{}],129:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

},{}],130:[function(require,module,exports){
'use strict';

module.exports = require('./src/js/adaptor/jquery');

},{"./src/js/adaptor/jquery":131}],131:[function(require,module,exports){
'use strict';

var ps = require('../main');
var psInstances = require('../plugin/instances');

function mountJQuery(jQuery) {
  jQuery.fn.perfectScrollbar = function (settingOrCommand) {
    return this.each(function () {
      if (typeof settingOrCommand === 'object' ||
          typeof settingOrCommand === 'undefined') {
        // If it's an object or none, initialize.
        var settings = settingOrCommand;

        if (!psInstances.get(this)) {
          ps.initialize(this, settings);
        }
      } else {
        // Unless, it may be a command.
        var command = settingOrCommand;

        if (command === 'update') {
          ps.update(this);
        } else if (command === 'destroy') {
          ps.destroy(this);
        }
      }
    });
  };
}

if (typeof define === 'function' && define.amd) {
  // AMD. Register as an anonymous module.
  define(['jquery'], mountJQuery);
} else {
  var jq = window.jQuery ? window.jQuery : window.$;
  if (typeof jq !== 'undefined') {
    mountJQuery(jq);
  }
}

module.exports = mountJQuery;

},{"../main":136,"../plugin/instances":147}],132:[function(require,module,exports){
'use strict';

var DOM = {};

DOM.create = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

DOM.appendTo = function (child, parent) {
  parent.appendChild(child);
  return child;
};

function cssGet(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function cssSet(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }
  element.style[styleName] = styleValue;
  return element;
}

function cssMultiSet(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val.toString() + 'px';
    }
    element.style[key] = val;
  }
  return element;
}

DOM.css = function (element, styleNameOrObject, styleValue) {
  if (typeof styleNameOrObject === 'object') {
    // multiple set with object
    return cssMultiSet(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return cssGet(element, styleNameOrObject);
    } else {
      return cssSet(element, styleNameOrObject, styleValue);
    }
  }
};

DOM.matches = function (element, query) {
  if (typeof element.matches !== 'undefined') {
    return element.matches(query);
  } else {
    // must be IE11 and Edge
    return element.msMatchesSelector(query);
  }
};

DOM.remove = function (element) {
  if (typeof element.remove !== 'undefined') {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
};

DOM.queryChildren = function (element, selector) {
  return Array.prototype.filter.call(element.childNodes, function (child) {
    return DOM.matches(child, selector);
  });
};

module.exports = DOM;

},{}],133:[function(require,module,exports){
'use strict';

var EventElement = function (element) {
  this.element = element;
  this.events = {};
};

EventElement.prototype.bind = function (eventName, handler) {
  if (typeof this.events[eventName] === 'undefined') {
    this.events[eventName] = [];
  }
  this.events[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function (eventName, handler) {
  var isHandlerProvided = (typeof handler !== 'undefined');
  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
    if (isHandlerProvided && hdlr !== handler) {
      return true;
    }
    this.element.removeEventListener(eventName, hdlr, false);
    return false;
  }, this);
};

EventElement.prototype.unbindAll = function () {
  for (var name in this.events) {
    this.unbind(name);
  }
};

var EventManager = function () {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function (element) {
  var ee = this.eventElements.filter(function (eventElement) {
    return eventElement.element === element;
  })[0];
  if (typeof ee === 'undefined') {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function (element, eventName, handler) {
  this.eventElement(element).unbind(eventName, handler);
};

EventManager.prototype.unbindAll = function () {
  for (var i = 0; i < this.eventElements.length; i++) {
    this.eventElements[i].unbindAll();
  }
};

EventManager.prototype.once = function (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (e) {
    ee.unbind(eventName, onceHandler);
    handler(e);
  };
  ee.bind(eventName, onceHandler);
};

module.exports = EventManager;

},{}],134:[function(require,module,exports){
'use strict';

module.exports = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

},{}],135:[function(require,module,exports){
'use strict';

var dom = require('./dom');

var toInt = exports.toInt = function (x) {
  return parseInt(x, 10) || 0;
};

exports.isEditable = function (el) {
  return dom.matches(el, "input,[contenteditable]") ||
         dom.matches(el, "select,[contenteditable]") ||
         dom.matches(el, "textarea,[contenteditable]") ||
         dom.matches(el, "button,[contenteditable]");
};

exports.removePsClasses = function (element) {
  for (var i = 0; i < element.classList.length; i++) {
    var className = element.classList[i];
    if (className.indexOf('ps-') === 0) {
      element.classList.remove(className);
    }
  }
};

exports.outerWidth = function (element) {
  return toInt(dom.css(element, 'width')) +
         toInt(dom.css(element, 'paddingLeft')) +
         toInt(dom.css(element, 'paddingRight')) +
         toInt(dom.css(element, 'borderLeftWidth')) +
         toInt(dom.css(element, 'borderRightWidth'));
};

function psClasses(axis) {
  var classes = ['ps--in-scrolling'];
  var axisClasses;
  if (typeof axis === 'undefined') {
    axisClasses = ['ps--x', 'ps--y'];
  } else {
    axisClasses = ['ps--' + axis];
  }
  return classes.concat(axisClasses);
}

exports.startScrolling = function (element, axis) {
  var classes = psClasses(axis);
  for (var i = 0; i < classes.length; i++) {
    element.classList.add(classes[i]);
  }
};

exports.stopScrolling = function (element, axis) {
  var classes = psClasses(axis);
  for (var i = 0; i < classes.length; i++) {
    element.classList.remove(classes[i]);
  }
};

exports.env = {
  isWebKit: typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style,
  supportsTouch: typeof window !== 'undefined' && (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: typeof window !== 'undefined' && window.navigator.msMaxTouchPoints !== null
};

},{"./dom":132}],136:[function(require,module,exports){
'use strict';

var destroy = require('./plugin/destroy');
var initialize = require('./plugin/initialize');
var update = require('./plugin/update');

module.exports = {
  initialize: initialize,
  update: update,
  destroy: destroy
};

},{"./plugin/destroy":138,"./plugin/initialize":146,"./plugin/update":150}],137:[function(require,module,exports){
'use strict';

module.exports = function () {
  return {
    handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: false,
    suppressScrollY: false,
    swipePropagation: true,
    swipeEasing: true,
    useBothWheelAxes: false,
    wheelPropagation: false,
    wheelSpeed: 1,
    theme: 'default'
  };
};

},{}],138:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  i.event.unbindAll();
  dom.remove(i.scrollbarX);
  dom.remove(i.scrollbarY);
  dom.remove(i.scrollbarXRail);
  dom.remove(i.scrollbarYRail);
  _.removePsClasses(element);

  instances.remove(element);
};

},{"../lib/dom":132,"../lib/helper":135,"./instances":147}],139:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindClickRailHandler(element, i) {
  function pageOffset(el) {
    return el.getBoundingClientRect();
  }
  var stopPropagation = function (e) { e.stopPropagation(); };

  i.event.bind(i.scrollbarY, 'click', stopPropagation);
  i.event.bind(i.scrollbarYRail, 'click', function (e) {
    var positionTop = e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    updateScroll(element, 'top', element.scrollTop + direction * i.containerHeight);
    updateGeometry(element);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'click', stopPropagation);
  i.event.bind(i.scrollbarXRail, 'click', function (e) {
    var positionLeft = e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    updateScroll(element, 'left', element.scrollLeft + direction * i.containerWidth);
    updateGeometry(element);

    e.stopPropagation();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindClickRailHandler(element, i);
};

},{"../instances":147,"../update-geometry":148,"../update-scroll":149}],140:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var dom = require('../../lib/dom');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindMouseScrollXHandler(element, i) {
  var currentLeft = null;
  var currentPageX = null;

  function updateScrollLeft(deltaX) {
    var newLeft = currentLeft + (deltaX * i.railXRatio);
    var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

    if (newLeft < 0) {
      i.scrollbarXLeft = 0;
    } else if (newLeft > maxLeft) {
      i.scrollbarXLeft = maxLeft;
    } else {
      i.scrollbarXLeft = newLeft;
    }

    var scrollLeft = _.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;
    updateScroll(element, 'left', scrollLeft);
  }

  var mouseMoveHandler = function (e) {
    updateScrollLeft(e.pageX - currentPageX);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'x');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
    currentPageX = e.pageX;
    currentLeft = _.toInt(dom.css(i.scrollbarX, 'left')) * i.railXRatio;
    _.startScrolling(element, 'x');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

function bindMouseScrollYHandler(element, i) {
  var currentTop = null;
  var currentPageY = null;

  function updateScrollTop(deltaY) {
    var newTop = currentTop + (deltaY * i.railYRatio);
    var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

    if (newTop < 0) {
      i.scrollbarYTop = 0;
    } else if (newTop > maxTop) {
      i.scrollbarYTop = maxTop;
    } else {
      i.scrollbarYTop = newTop;
    }

    var scrollTop = _.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
    updateScroll(element, 'top', scrollTop);
  }

  var mouseMoveHandler = function (e) {
    updateScrollTop(e.pageY - currentPageY);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'y');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
    currentPageY = e.pageY;
    currentTop = _.toInt(dom.css(i.scrollbarY, 'top')) * i.railYRatio;
    _.startScrolling(element, 'y');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseScrollXHandler(element, i);
  bindMouseScrollYHandler(element, i);
};

},{"../../lib/dom":132,"../../lib/helper":135,"../instances":147,"../update-geometry":148,"../update-scroll":149}],141:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var dom = require('../../lib/dom');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindKeyboardHandler(element, i) {
  var hovered = false;
  i.event.bind(element, 'mouseenter', function () {
    hovered = true;
  });
  i.event.bind(element, 'mouseleave', function () {
    hovered = false;
  });

  var shouldPrevent = false;
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if ((e.isDefaultPrevented && e.isDefaultPrevented()) || e.defaultPrevented) {
      return;
    }

    var focused = dom.matches(i.scrollbarX, ':focus') ||
                  dom.matches(i.scrollbarY, ':focus');

    if (!hovered && !focused) {
      return;
    }

    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (_.isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
    case 37: // left
      if (e.metaKey) {
        deltaX = -i.contentWidth;
      } else if (e.altKey) {
        deltaX = -i.containerWidth;
      } else {
        deltaX = -30;
      }
      break;
    case 38: // up
      if (e.metaKey) {
        deltaY = i.contentHeight;
      } else if (e.altKey) {
        deltaY = i.containerHeight;
      } else {
        deltaY = 30;
      }
      break;
    case 39: // right
      if (e.metaKey) {
        deltaX = i.contentWidth;
      } else if (e.altKey) {
        deltaX = i.containerWidth;
      } else {
        deltaX = 30;
      }
      break;
    case 40: // down
      if (e.metaKey) {
        deltaY = -i.contentHeight;
      } else if (e.altKey) {
        deltaY = -i.containerHeight;
      } else {
        deltaY = -30;
      }
      break;
    case 33: // page up
      deltaY = 90;
      break;
    case 32: // space bar
      if (e.shiftKey) {
        deltaY = 90;
      } else {
        deltaY = -90;
      }
      break;
    case 34: // page down
      deltaY = -90;
      break;
    case 35: // end
      if (e.ctrlKey) {
        deltaY = -i.contentHeight;
      } else {
        deltaY = -i.containerHeight;
      }
      break;
    case 36: // home
      if (e.ctrlKey) {
        deltaY = element.scrollTop;
      } else {
        deltaY = i.containerHeight;
      }
      break;
    default:
      return;
    }

    updateScroll(element, 'top', element.scrollTop - deltaY);
    updateScroll(element, 'left', element.scrollLeft + deltaX);
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.preventDefault();
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindKeyboardHandler(element, i);
};

},{"../../lib/dom":132,"../../lib/helper":135,"../instances":147,"../update-geometry":148,"../update-scroll":149}],142:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindMouseWheelHandler(element, i) {
  var shouldPrevent = false;

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(deltaX, deltaY) {
    var child = element.querySelector('textarea:hover, select[multiple]:hover, .ps-child:hover');
    if (child) {
      var style = window.getComputedStyle(child);
      var overflow = [
        style.overflow,
        style.overflowX,
        style.overflowY
      ].join('');

      if (!overflow.match(/(scroll|auto)/)) {
        // if not scrollable
        return false;
      }

      var maxScrollTop = child.scrollHeight - child.clientHeight;
      if (maxScrollTop > 0) {
        if (!(child.scrollTop === 0 && deltaY > 0) && !(child.scrollTop === maxScrollTop && deltaY < 0)) {
          return true;
        }
      }
      var maxScrollLeft = child.scrollLeft - child.clientWidth;
      if (maxScrollLeft > 0) {
        if (!(child.scrollLeft === 0 && deltaX < 0) && !(child.scrollLeft === maxScrollLeft && deltaX > 0)) {
          return true;
        }
      }
    }
    return false;
  }

  function mousewheelHandler(e) {
    var delta = getDeltaFromEvent(e);

    var deltaX = delta[0];
    var deltaY = delta[1];

    if (shouldBeConsumedByChild(deltaX, deltaY)) {
      return;
    }

    shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    }

    updateGeometry(element);

    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
    if (shouldPrevent) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseWheelHandler(element, i);
};

},{"../instances":147,"../update-geometry":148,"../update-scroll":149}],143:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');

function bindNativeScrollHandler(element, i) {
  i.event.bind(element, 'scroll', function () {
    updateGeometry(element);
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindNativeScrollHandler(element, i);
};

},{"../instances":147,"../update-geometry":148}],144:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindSelectionHandler(element, i) {
  function getRangeNode() {
    var selection = window.getSelection ? window.getSelection() :
                    document.getSelection ? document.getSelection() : '';
    if (selection.toString().length === 0) {
      return null;
    } else {
      return selection.getRangeAt(0).commonAncestorContainer;
    }
  }

  var scrollingLoop = null;
  var scrollDiff = {top: 0, left: 0};
  function startScrolling() {
    if (!scrollingLoop) {
      scrollingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(scrollingLoop);
          return;
        }

        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
        updateGeometry(element);
      }, 50); // every .1 sec
    }
  }
  function stopScrolling() {
    if (scrollingLoop) {
      clearInterval(scrollingLoop);
      scrollingLoop = null;
    }
    _.stopScrolling(element);
  }

  var isSelected = false;
  i.event.bind(i.ownerDocument, 'selectionchange', function () {
    if (element.contains(getRangeNode())) {
      isSelected = true;
    } else {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'mouseup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'keyup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });

  i.event.bind(window, 'mousemove', function (e) {
    if (isSelected) {
      var mousePosition = {x: e.pageX, y: e.pageY};
      var containerGeometry = {
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        bottom: element.offsetTop + element.offsetHeight
      };

      if (mousePosition.x < containerGeometry.left + 3) {
        scrollDiff.left = -5;
        _.startScrolling(element, 'x');
      } else if (mousePosition.x > containerGeometry.right - 3) {
        scrollDiff.left = 5;
        _.startScrolling(element, 'x');
      } else {
        scrollDiff.left = 0;
      }

      if (mousePosition.y < containerGeometry.top + 3) {
        if (containerGeometry.top + 3 - mousePosition.y < 5) {
          scrollDiff.top = -5;
        } else {
          scrollDiff.top = -20;
        }
        _.startScrolling(element, 'y');
      } else if (mousePosition.y > containerGeometry.bottom - 3) {
        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
          scrollDiff.top = 5;
        } else {
          scrollDiff.top = 20;
        }
        _.startScrolling(element, 'y');
      } else {
        scrollDiff.top = 0;
      }

      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
        stopScrolling();
      } else {
        startScrolling();
      }
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindSelectionHandler(element, i);
};

},{"../../lib/helper":135,"../instances":147,"../update-geometry":148,"../update-scroll":149}],145:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
          ((deltaY > 0) && (scrollTop === 0))) {
        return !i.settings.swipePropagation;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
          ((deltaX > 0) && (scrollLeft === 0))) {
        return !i.settings.swipePropagation;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    updateScroll(element, 'top', element.scrollTop - differenceY);
    updateScroll(element, 'left', element.scrollLeft - differenceX);

    updateGeometry(element);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;
  var inGlobalTouch = false;
  var inLocalTouch = false;

  function globalTouchStart() {
    inGlobalTouch = true;
  }
  function globalTouchEnd() {
    inGlobalTouch = false;
  }

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }
  function shouldHandle(e) {
    if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
      return false;
    }
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
      return true;
    }
    return false;
  }
  function touchStart(e) {
    if (shouldHandle(e)) {
      inLocalTouch = true;

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = (new Date()).getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }

      e.stopPropagation();
    }
  }
  function touchMove(e) {
    if (!inLocalTouch && i.settings.swipePropagation) {
      touchStart(e);
    }
    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = (new Date()).getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPreventDefault(differenceX, differenceY)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (!inGlobalTouch && inLocalTouch) {
      inLocalTouch = false;

      if (i.settings.swipeEasing) {
        clearInterval(easingLoop);
        easingLoop = setInterval(function () {
          if (!instances.get(element)) {
            clearInterval(easingLoop);
            return;
          }

          if (!speed.x && !speed.y) {
            clearInterval(easingLoop);
            return;
          }

          if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
            clearInterval(easingLoop);
            return;
          }

          applyTouchMove(speed.x * 30, speed.y * 30);

          speed.x *= 0.8;
          speed.y *= 0.8;
        }, 10);
      }
    }
  }

  if (supportsTouch) {
    i.event.bind(window, 'touchstart', globalTouchStart);
    i.event.bind(window, 'touchend', globalTouchEnd);
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(window, 'pointerdown', globalTouchStart);
      i.event.bind(window, 'pointerup', globalTouchEnd);
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(window, 'MSPointerDown', globalTouchStart);
      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

module.exports = function (element) {
  if (!_.env.supportsTouch && !_.env.supportsIePointer) {
    return;
  }

  var i = instances.get(element);
  bindTouchHandler(element, i, _.env.supportsTouch, _.env.supportsIePointer);
};

},{"../../lib/helper":135,"../instances":147,"../update-geometry":148,"../update-scroll":149}],146:[function(require,module,exports){
'use strict';

var instances = require('./instances');
var updateGeometry = require('./update-geometry');

// Handlers
var handlers = {
  'click-rail': require('./handler/click-rail'),
  'drag-scrollbar': require('./handler/drag-scrollbar'),
  'keyboard': require('./handler/keyboard'),
  'wheel': require('./handler/mouse-wheel'),
  'touch': require('./handler/touch'),
  'selection': require('./handler/selection')
};
var nativeScrollHandler = require('./handler/native-scroll');

module.exports = function (element, userSettings) {
  element.classList.add('ps');

  // Create a plugin instance.
  var i = instances.add(
    element,
    typeof userSettings === 'object' ? userSettings : {}
  );

  element.classList.add('ps--theme_' + i.settings.theme);

  i.settings.handlers.forEach(function (handlerName) {
    handlers[handlerName](element);
  });

  nativeScrollHandler(element);

  updateGeometry(element);
};

},{"./handler/click-rail":139,"./handler/drag-scrollbar":140,"./handler/keyboard":141,"./handler/mouse-wheel":142,"./handler/native-scroll":143,"./handler/selection":144,"./handler/touch":145,"./instances":147,"./update-geometry":148}],147:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var defaultSettings = require('./default-setting');
var dom = require('../lib/dom');
var EventManager = require('../lib/event-manager');
var guid = require('../lib/guid');

var instances = {};

function Instance(element, userSettings) {
  var i = this;

  i.settings = defaultSettings();
  for (var key in userSettings) {
    i.settings[key] = userSettings[key];
  }

  i.containerWidth = null;
  i.containerHeight = null;
  i.contentWidth = null;
  i.contentHeight = null;

  i.isRtl = dom.css(element, 'direction') === "rtl";
  i.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
  i.event = new EventManager();
  i.ownerDocument = element.ownerDocument || document;

  function focus() {
    element.classList.add('ps--focus');
  }

  function blur() {
    element.classList.remove('ps--focus');
  }

  i.scrollbarXRail = dom.appendTo(dom.create('div', 'ps__scrollbar-x-rail'), element);
  i.scrollbarX = dom.appendTo(dom.create('div', 'ps__scrollbar-x'), i.scrollbarXRail);
  i.scrollbarX.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarX, 'focus', focus);
  i.event.bind(i.scrollbarX, 'blur', blur);
  i.scrollbarXActive = null;
  i.scrollbarXWidth = null;
  i.scrollbarXLeft = null;
  i.scrollbarXBottom = _.toInt(dom.css(i.scrollbarXRail, 'bottom'));
  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : _.toInt(dom.css(i.scrollbarXRail, 'top'));
  i.railBorderXWidth = _.toInt(dom.css(i.scrollbarXRail, 'borderLeftWidth')) + _.toInt(dom.css(i.scrollbarXRail, 'borderRightWidth'));
  // Set rail to display:block to calculate margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  dom.css(i.scrollbarXRail, 'display', '');
  i.railXWidth = null;
  i.railXRatio = null;

  i.scrollbarYRail = dom.appendTo(dom.create('div', 'ps__scrollbar-y-rail'), element);
  i.scrollbarY = dom.appendTo(dom.create('div', 'ps__scrollbar-y'), i.scrollbarYRail);
  i.scrollbarY.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarY, 'focus', focus);
  i.event.bind(i.scrollbarY, 'blur', blur);
  i.scrollbarYActive = null;
  i.scrollbarYHeight = null;
  i.scrollbarYTop = null;
  i.scrollbarYRight = _.toInt(dom.css(i.scrollbarYRail, 'right'));
  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : _.toInt(dom.css(i.scrollbarYRail, 'left'));
  i.scrollbarYOuterWidth = i.isRtl ? _.outerWidth(i.scrollbarY) : null;
  i.railBorderYWidth = _.toInt(dom.css(i.scrollbarYRail, 'borderTopWidth')) + _.toInt(dom.css(i.scrollbarYRail, 'borderBottomWidth'));
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));
  dom.css(i.scrollbarYRail, 'display', '');
  i.railYHeight = null;
  i.railYRatio = null;
}

function getId(element) {
  return element.getAttribute('data-ps-id');
}

function setId(element, id) {
  element.setAttribute('data-ps-id', id);
}

function removeId(element) {
  element.removeAttribute('data-ps-id');
}

exports.add = function (element, userSettings) {
  var newId = guid();
  setId(element, newId);
  instances[newId] = new Instance(element, userSettings);
  return instances[newId];
};

exports.remove = function (element) {
  delete instances[getId(element)];
  removeId(element);
};

exports.get = function (element) {
  return instances[getId(element)];
};

},{"../lib/dom":132,"../lib/event-manager":133,"../lib/guid":134,"../lib/helper":135,"./default-setting":137}],148:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');
var updateScroll = require('./update-scroll');

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = {width: i.railXWidth};
  if (i.isRtl) {
    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  dom.css(i.scrollbarXRail, xRailOffset);

  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  dom.css(i.scrollbarYRail, yRailOffset);

  dom.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});
  dom.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});
}

module.exports = function (element) {
  var i = instances.get(element);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  var existingRails;
  if (!element.contains(i.scrollbarXRail)) {
    existingRails = dom.queryChildren(element, '.ps__scrollbar-x-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarXRail, element);
  }
  if (!element.contains(i.scrollbarYRail)) {
    existingRails = dom.queryChildren(element, '.ps__scrollbar-y-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarYRail, element);
  }

  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(i, _.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
    i.scrollbarXLeft = _.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
  } else {
    i.scrollbarXActive = false;
  }

  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(i, _.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
    i.scrollbarYTop = _.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    element.classList.add('ps--active-x');
  } else {
    element.classList.remove('ps--active-x');
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    updateScroll(element, 'left', 0);
  }
  if (i.scrollbarYActive) {
    element.classList.add('ps--active-y');
  } else {
    element.classList.remove('ps--active-y');
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    updateScroll(element, 'top', 0);
  }
};

},{"../lib/dom":132,"../lib/helper":135,"./instances":147,"./update-scroll":149}],149:[function(require,module,exports){
'use strict';

var instances = require('./instances');

var createDOMEvent = function (name) {
  var event = document.createEvent("Event");
  event.initEvent(name, true, true);
  return event;
};

module.exports = function (element, axis, value) {
  if (typeof element === 'undefined') {
    throw 'You must provide an element to the update-scroll function';
  }

  if (typeof axis === 'undefined') {
    throw 'You must provide an axis to the update-scroll function';
  }

  if (typeof value === 'undefined') {
    throw 'You must provide a value to the update-scroll function';
  }

  if (axis === 'top' && value <= 0) {
    element.scrollTop = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-y-reach-start'));
  }

  if (axis === 'left' && value <= 0) {
    element.scrollLeft = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-x-reach-start'));
  }

  var i = instances.get(element);

  if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
    // don't allow scroll past container
    value = i.contentHeight - i.containerHeight;
    if (value - element.scrollTop <= 2) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollTop;
    } else {
      element.scrollTop = value;
    }
    element.dispatchEvent(createDOMEvent('ps-y-reach-end'));
  }

  if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
    // don't allow scroll past container
    value = i.contentWidth - i.containerWidth;
    if (value - element.scrollLeft <= 2) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollLeft;
    } else {
      element.scrollLeft = value;
    }
    element.dispatchEvent(createDOMEvent('ps-x-reach-end'));
  }

  if (i.lastTop === undefined) {
    i.lastTop = element.scrollTop;
  }

  if (i.lastLeft === undefined) {
    i.lastLeft = element.scrollLeft;
  }

  if (axis === 'top' && value < i.lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-up'));
  }

  if (axis === 'top' && value > i.lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-down'));
  }

  if (axis === 'left' && value < i.lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-left'));
  }

  if (axis === 'left' && value > i.lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-right'));
  }

  if (axis === 'top' && value !== i.lastTop) {
    element.scrollTop = i.lastTop = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-y'));
  }

  if (axis === 'left' && value !== i.lastLeft) {
    element.scrollLeft = i.lastLeft = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-x'));
  }

};

},{"./instances":147}],150:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');
var updateGeometry = require('./update-geometry');
var updateScroll = require('./update-scroll');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

  // Recalculate rail margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  dom.css(i.scrollbarXRail, 'display', 'none');
  dom.css(i.scrollbarYRail, 'display', 'none');

  updateGeometry(element);

  // Update top/left scroll to trigger events
  updateScroll(element, 'top', element.scrollTop);
  updateScroll(element, 'left', element.scrollLeft);

  dom.css(i.scrollbarXRail, 'display', '');
  dom.css(i.scrollbarYRail, 'display', '');
};

},{"../lib/dom":132,"../lib/helper":135,"./instances":147,"./update-geometry":148,"./update-scroll":149}],151:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],152:[function(require,module,exports){
module.exports = "<nav class=\"indicator-groups\">\n  <nav class=\"indicator-group indicator-group-center offers\">\n    <nav class=\"indicator-subgroup offers\">\n      <div data-subview=\"Offers\"></div>\n    </nav>\n  </nav>\n\n  <nav class=\"indicator-group indicator-group-right offers\">\n    <div data-subview=\"Close\"></div>\n  </nav>\n</nav>\n";

},{}],153:[function(require,module,exports){
module.exports = "<a id=\"close-indicator\"\n  class=\"indicator close-button {{# for_offers_bar }}close-offers-button{{/ for_offers_bar }}\"\n\n  {{# for_offers_dash }}\n    href=\"#offers/minimized\"\n  {{/ for_offers_dash }}\n\n  {{^ for_offers_dash }}\n    href=\"#minimized\"\n  {{/ for_offers_dash }}\n\n  data-event=\"Indicator\"\n  data-type=\"Close\"\n  data-context=\"{{ context }}\">\n  {{# for_offers_bar }}\n    <img src=\"/img/close-offers-bar.svg\" width=\"16\" height=\"16\" />\n  {{/ for_offers_bar }}\n\n  {{^ for_offers_bar }}\n    <img src=\"/img/close.svg\" width=\"16\" height=\"16\" />\n  {{/ for_offers_bar }}\n</a>\n";

},{}],154:[function(require,module,exports){
module.exports = "<nav class=\"indicator-groups mse-bar\">\n  <nav class=\"indicator-group indicator-group-left indicator-group-message\">\n    <div class=\"logo\"></div>\n    <span class=\"indicator-group-text\">{{> msg_mse_bar_warning }}</span>\n  </nav>\n\n  <nav class=\"indicator-group indicator-group-right\">\n    <button class=\"indicator-group-button primary-action\" data-install-safesearch>{{> lb_mse_sse_install }}</button>\n    <button class=\"indicator-group-button secondary-action\" data-no-offer>{{> lb_mse_hide_warning }}</button>\n    <div data-subview=\"Close\"></div>\n  </nav>\n</nav>\n";

},{}],155:[function(require,module,exports){
module.exports = "<div id=\"indicatorsArea\" class=\"appArea\"></div>\n<div class=\"dash-background\"></div>\n<div class=\"dash-container\">\n  <div id=\"dashItemArea\" class=\"appArea dash\"></div>\n</div>\n<div id=\"tourArea\" class=\"tour-container\"></div>\n";

},{}],156:[function(require,module,exports){
module.exports = "<nav class=\"indicator-groups unsafe-content-bar\">\n  <nav class=\"indicator-group indicator-group-left indicator-group-message\">\n    <div class=\"logo\"></div>\n    <span class=\"indicator-group-text\">{{> lb_unsafe_content_bar_warning }}</span>\n  </nav>\n\n  <nav class=\"indicator-group indicator-group-right\">\n    {{#UCWarningIgnoreAllowed}}\n      <button class=\"indicator-group-button ignore-button primary-action\">{{> lb_unsafe_content_bar_ignore }}</button>\n    {{/UCWarningIgnoreAllowed}}\n    <div data-subview=\"Close\"></div>\n  </nav>\n</nav>\n";

},{}],157:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Sichere Webseite",
    "lb_unsafe_website": "Unsichere Webseite",
    "lb_unsafe_content_website": "Unsicherer Inhalt",
    "lb_mse_website": "Nicht vertrauenswürdige Suchmaschine",
    "lb_trackers_blocked": "{{ count }} Werbeanzeigen und Tracker auf {{ domain }} <span class=\"txt--green\">blockiert<\/span>",
    "lb_trackers_blocked_short": "{{ count }} Werbeanzeigen und Tracker blockiert",
    "lb_trackers_block_all": "Auf dieser Webseite blockieren",
    "lb_trackers_allow_all": "Werbeanzeigen und Tracker freigeben",
    "msg_no_trackers": "Es gibt auf dieser Webseite keine Tracker, die Sie verfolgen. Wenn Sie eine Webseite mit aktiven Trackern öffnen, wird hier eine vollständige Liste der Tracker angezeigt.",
    "msg_trackers_tooltip": "Das sind alle Tracker der aktuell geöffneten Webseite. Sie können einen Tracker blockieren, indem Sie den nebenstehenden Regler klicken. Ist die Farbe des Reglers grün, wird der dazugehörige Tracker blockiert und kann Ihr Surfverhalten nicht verfolgen. Beachten Sie, dass manche Tracker standardmäßig erlaubt sind. Ein Blockieren dieser Tracker kann dazu führen, dass die Webseite nicht ordnungsgemäß funktioniert.",
    "lb_settings": "Einstellungen",
    "lb_setting_offers": "Preisvergleich anzeigen",
    "lb_setting_tooltip_offers": "Für die Artikel, an denen Sie interessiert sind, werden bessere Angebote ausschließlich von sicheren Webseiten angezeigt.",
    "lb_setting_dnt_header": "Do-Not-Track-Header senden",
    "lb_setting_tooltip_dnt_header": "Fordern Sie Webseiten auf, Sie nicht zu verfolgen. Falls Ihre Aufforderung ignoriert wird, blockiert ABS weiterhin alle Tracker.",
    "lb_setting_top_bar": "Sicherheitsleiste anzeigen",
    "lb_setting_block_trackers": "Tracker standardmäßig blockieren",
    "lb_setting_tooltip_block_trackers": "Schützen Sie Ihre Privatsphäre, indem Sie Tracker standardmäßig blockieren.",
    "lb_setting_cliqz": "Sichere Suche mit CLIQZ",
    "lb_setting_tooltip_cliqz": "Schon während Sie in der Adressleiste Ihres Browsers tippen, schlägt CLIQZ Ihnen Webseiten und relevante Informationen vor. Dadurch suchen Sie effizienter, schneller und sicherer.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger blockiert Werbeanzeigen und Tracker, die Sie ohne Ihre Erlaubnis heimlich ausspionieren wollen.",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere verschlüsselt Ihre gesamte Kommunikation und schützt Sie beim Surfen.",
    "lb_setting_inAppTracking": "Anonymisierte Statistik",
    "lb_setting_tooltip_inAppTracking": "Helfen Sie, unsere Produkte zu verbessern, indem Sie Daten anonym mit uns teilen.",
    "lb_setting_show_advanced_controls": "Mehr Steuerelemente anzeigen",
    "lb_setting_tooltip_show_advanced_controls": "Zeigt Privacy Badger und HTTPS Everywhere in der Symbolleiste.",
    "lb_setting_google_services": "Google-Dienste",
    "lb_setting_tooltip_google_services": "Scout erlauben, zur Korrektur von Rechtschreibfehlern und fehlerhaften URLs sowie zum Berichten schädlicher Webseiten Google-Dienste zu verwenden. Dadurch geben Sie Google das Recht, Ihre privaten Daten zu erfassen.",
    "lb_setting_adguard": "Werbeanzeigen und Web-Tracking blockieren",
    "lb_setting_tooltip_adguard": "Schützt Ihre Privatsphäre, indem andere daran gehindert werden, Ihre Online-Aktivität zu überwachen. Blockiert auch aufdringliche Pop-ups, Webbanner, Videoanzeigen und mehr.",
    "lb_setting_adguard_social_media": "Tracking durch soziale Medien blockieren",
    "lb_setting_tooltip_adguard_social_media": "Deaktiviert Social-Media-Schaltflächen und Widgets auf Webseiten, sodass soziale Netzwerke nicht verfolgen können, welche Webseiten Sie besuchen.",
    "lb_setting_adguard_useful_ads": "Nützliche Werbeanzeigen einblenden",
    "lb_setting_tooltip_adguard_useful_ads": "Relevante, nicht aufdringliche Anzeigen können in Ihren Suchergebnissen angezeigt werden.",
    "lb_setting_scout_help": "Weitere Details finden Sie <a href=\"https:\/\/www.avira.com\/de\/avira-scout-ftu\" target=\"_blank\">hier<\/a>.",
    "lb_setting_extension_scan": "Analyse der Erweiterungen",
    "lb_setting_tooltip_extension_scan": "Aktivieren um einen anonymisierten Bericht an Avira zu senden, wenn eine verdächtige Aktivitäten während dem Surfen festgestellt wurde.",
    "btn_blocking_back": "Seite verlassen",
    "lb_blocking_options": "Weitere Optionen",
    "lb_blocking_add_exception": "Diese Webseite nie blockieren",
    "btn_blocking_continue": "Trotzdem fortfahren",
    "btn_dash_classification_cb_exception": "Diese Webseite nie blockieren",
    "lb_dash_classification_exception_info_add": "Ausnahme wird hinzugefügt",
    "msg_dash_classification_exception_info_add": "Diese Seite ist zur Zeit NICHT auf Ihrer Ausnahmeliste. Wenn Sie eine Ausnahme hinzufügen, wird diese Web-Adresse bei Zugriff nicht mehr blockiert. Die Warnung am oberen Bildschirmrand bleibt jedoch bestehen.",
    "lb_dash_classification_exception_info_remove": "Ausnahme wird entfernt",
    "msg_dash_classification_exception_info_remove": "Diese Seite befindet zur Zeit auf Ihrer Ausnahmeliste. Wenn Sie die Ausnahme entfernen, wird diese Web-Adresse bei Zugriff immer blockiert.",
    "lb_privacy": "Datenschutz",
    "lnk_privacy": "https:\/\/www.avira.com\/de\/general-privacy",
    "lb_eula": "Endbenutzer-Lizenzvereinbarung",
    "lnk_eula": "https:\/\/www.avira.com\/de\/license-agreement-terms-of-use",
    "lb_discover_mode": "Entdecken Sie mehr",
    "lb_feedback": "Feedback",
    "lb_rate": "App bewerten",
    "lb_dash_pua_action_cancel": "Download abbrechen",
    "msg_mse_bar_warning": "Die Einstellungen Ihrer Suchmaschine wurden wahrscheinlich manipuliert.",
    "lb_mse_sse_install": "SafeSearch Plus hinzufügen",
    "lb_mse_hide_warning": "Ich vertraue dieser Suchmaschine",
    "lnk_mse_install": "http:\/\/www.avira.com\/de\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "Unsicherer Inhalt",
    "lb_unsafe_content_bar_warning": "Avira Browser Safety verhindert, dass unsicherer Inhalt auf dieser Webseite geladen wird.",
    "lb_unsafe_content_bar_ignore": "Diese Meldung nicht mehr anzeigen",
    "lb_extension_permission_notification_extension_description": "Die Avira Browserschutz Erweiterung benötigt ihre Zustimmung um einen Bericht über verdächtige Aktivitäten an Avira zusenden.",
    "lb_extension_permission_notification_extension_permission_title": "Aktivieren um einen anonymisierten Bericht an Avira zu senden, wenn eine verdächtige Aktivitäten während dem Surfen festgestellt wurde.",
    "lb_extension_permission_notification_extension_permission_button": "Erlauben",
    "lb_extension_permission_notification_extension_permission_no_title": "Diese Funktion kann später in den Einstellungen aktiviert werden.",
    "lb_extension_permission_notification_extension_permission_no_button": "Nicht erneut fragen",
    "lb_unsafe_content": "Unsicherer Inhalt",
    "msg_dash_unsafe_content_details_no_exception": "Blockierter unsicherer Inhalt:",
    "msg_dash_unsafe_content_details_exception": "Unsicherer Inhalt blockiert",
    "msg_dash_unsafe_content_risk_no_exception": "Aus Sicherheitsgründen wird empfohlen, die Blockierung des Inhalts beizubehalten.",
    "msg_dash_unsafe_content_risk_exception": "Aus Sicherheitsgründen wird empfohlen, die Ausnahme zu entfernen und damit den unsicheren Inhalt zu blockieren.",
    "lb_dash_unsafe_content_show_details": "Technische Details",
    "lb_dash_unsafe_content_hide_details": "Ausblenden",
    "msg_category_unknown": "Es wurden keine Informationen für diese Webseite gefunden.",
    "msg_category_safe": "Keine bekannten Bedrohungen.",
    "msg_category_malware": "Dies ist eine Malware-Webseite",
    "msg_category_malware_sub": "Malware-Webseiten infizieren Ihr Gerät und können Viren, Würmer, Spyware und Trojaner enthalten.",
    "msg_category_phishing": "Dies ist eine Phishing-Webseite",
    "msg_category_phishing_sub": "Phishing-Webseiten versuchen, Sie durch Täuschung dazu zu verleiten, persönliche Informationen wie Kennwörter und Kontoinformationen preiszugeben.",
    "msg_category_spam": "Dies ist eine Spam-Webseite",
    "msg_category_spam_sub": "Spam-Webseiten verwenden Ihre E-Mail-Adresse, um Ihnen Werbung per E-Mail zu senden.",
    "msg_category_pua": "Der Download enthält Potenziell Unerwünschte Anwendungen.",
    "msg_category_pua2": "Diese Webseite verbreitet PUA",
    "msg_category_pua2_sub": "Potenziell Unerwünschte Anwendungen (PUA) zeigen unerwünschtes Verhalten oder beinhalten unerwünschte Funktionen.",
    "msg_category_mse": "Nicht vertrauenswürdige Suchmaschine",
    "msg_category_mse_sub": "Dieser Suchmaschine wird nicht vertraut, da bekannt ist, dass Malware und Potenziell Unerwünschte Anwendungen Datenverkehr dorthin umleiten.",
    "msg_category_unsafe_content": "Unsicherer Inhalt blockiert",
    "msg_category_unsafe_content_sub": "Webseiten laden unsicheren Inhalt, wenn beeinträchtigter oder externer Inhalt gehackt wurde oder vorsätzlich schädlich ist.",
    "msg_what_is_pua": "Was bedeutet PUA?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/de-de\/potentially-unwanted-applications",
    "lb_tab_privacy": "Privatsphäre",
    "lb_tab_security": "Sicherheit",
    "lb_my_modes": "Modi",
    "msg_mode_select": "Wählen Sie den Modus, der <br\/>Ihren Anforderungen entspricht",
    "lb_mode_safe-surfing": "Sicheres Surfen",
    "lb_mode_safe-private": "Sicher und privat",
    "lb_mode_custom": "Benutzerdefiniert",
    "lb_powered_by_avira": "Bereitgestellt von Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/de\/avira-scout-ftu",
    "lb_help": "Hilfe",
    "lnk_scout_help": "https:\/\/www.avira.com\/de\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} Werbeanzeigen und #Tracker wurden von #Avira Browserschutz blockiert. Holen Sie sich Ihre eigene Version – #kostenlos!",
    "lb_trackers_facebook_share": "{{ threshold }} – so viele Werbeanzeigen und Tracker hat Avira Browserschutz bislang blockiert und so davon abgehalten, meine Onlineaktivitäten auszuspionieren. Avira Browserschutz ist kostenlos und wärmstens zu empfehlen.",
    "lb_congratulations": "Herzlichen Glückwunsch!",
    "lb_trackers_blocked_count": "{{ threshold }} Werbeanzeigen und Tracker blockiert!",
    "lb_trackers_milestone_subtitle": "Hilf auch du, deine Familie und Freunde zu schützen.",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/de\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/de\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Tweet",
    "lb_share": "Teilen",
    "lb_trackers": "Tracker",
    "lb_ads": "Werbeanzeigen",
    "lb_trackers_blocked_this_page": "<span class=\"txt--orange-dark\">Tracker<\/span> auf dieser Webseite blockiert",
    "lb_ads_blocked_this_page": "<span class=\"txt--orange\">Werbeanzeigen<\/span> auf dieser Webseite blockiert",
    "lb_blocked_total": "Alle Werbeanzeigen und Tracker blockiert: <strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "\"Werbeanzeige von <a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a> blockiert\""
}

},{}],158:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Safe website",
    "lb_unsafe_website": "Unsafe website",
    "lb_unsafe_content_website": "Unsafe content",
    "lb_mse_website": "Distrusted Search Engine",
    "lb_trackers_blocked": "{{ count }} ads and trackers <span class=\"txt--green\">blocked</span> on {{ domain }}",
    "lb_trackers_blocked_short": "{{ count }} ads and trackers blocked",
    "lb_trackers_block_all": "Block on this website",
    "lb_trackers_allow_all": "Unblock ads and trackers",
    "msg_no_trackers": "There are no trackers following you on the current page. If you open a website with active trackers, the complete list will be shown here.",
    "msg_trackers_tooltip": "These are all the trackers on the website you are viewing. You can block a tracker by clicking on the slider next to it. When a slider is green, that tracker is blocked and cannot track your browsing activity. Note that some trackers are allowed by default. Blocking them might result in the web page not working properly.",
    "lb_settings": "Settings",
    "lb_setting_offers": "Show price comparisons",
    "lb_setting_tooltip_offers": "Show better deals for the items you’re shopping for – from only safe websites.",
    "lb_setting_dnt_header": "Send Do Not Track header",
    "lb_setting_tooltip_dnt_header": "Inform websites they should not track you. If they ignore the request, ABS still blocks any trackers.",
    "lb_setting_top_bar": "Show safety indicator",
    "lb_setting_block_trackers": "Block trackers by default",
    "lb_setting_tooltip_block_trackers": "Protect your privacy by blocking trackers by default.",
    "lb_setting_cliqz": "CLIQZ Search",
    "lb_setting_tooltip_cliqz": "CLIQZ Search suggests you websites and relevant information in real-time while you enter your search in the browser bar, which enables you to search safer and faster.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger blocks spying ads and prevents invisible trackers from tracking you secretly without your permission.",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere encrypts your communications and makes your browsing more secure.",
    "lb_setting_inAppTracking": "Anonymous Statistics",
    "lb_setting_tooltip_inAppTracking": "Help us improve the product by sharing anonymous data.",
    "lb_setting_show_advanced_controls": "Show extra browsing controls",
    "lb_setting_tooltip_show_advanced_controls": "Displays Privacy Badger and HTTPS Everywhere icons in the toolbar.",
    "lb_setting_google_services": "Google Services",
    "lb_setting_tooltip_google_services": "Allow Scout to use Google services to fix spelling errors, correct mistyped URLs, and report malicious websites. This will allow Google to collect your private data.",
    "lb_setting_adguard": "Block ads & web tracking",
    "lb_setting_tooltip_adguard": "Protects your privacy by stopping anyone from monitoring you online. Also blocks intrusive popups, web banners, video ads, and more.",
    "lb_setting_adguard_social_media": "Block social media tracking",
    "lb_setting_tooltip_adguard_social_media": "Disables social media buttons and widgets from websites, so that social networks cannot keep track of what sites you visit.",
    "lb_setting_adguard_useful_ads": "Show useful ads",
    "lb_setting_tooltip_adguard_useful_ads": "Allows relevant, non-intrusive ads to be shown in your search results.",
    "lb_setting_scout_help": "Click <a href=\"https:\/\/www.avira.com\/en\/avira-scout-ftu\" target=\"_blank\">here</a> for further details.",
    "lb_setting_extension_scan": "Extensions Analysis",
    "lb_setting_tooltip_extension_scan": "Enable to send an anonymous report to Avira if suspicious activity is detected while browsing.",
    "btn_blocking_back": "Take me away!",
    "lb_blocking_options": "More options",
    "lb_blocking_add_exception": "Never block this website",
    "btn_blocking_continue": "Continue anyway",
    "btn_dash_classification_cb_exception": "Never block this website",
    "lb_dash_classification_exception_info_add": "Adding an exception",
    "msg_dash_classification_exception_info_add": "This site is currently NOT on your exception list. When you add an exception, the address will not be blocked when you attempt to view it. You will still see the warning on the top of the screen.",
    "lb_dash_classification_exception_info_remove": "Removing an exception",
    "msg_dash_classification_exception_info_remove": "This site is currently on your exception list. If you remove the exception, the address will be blocked every time you attempt to view it.",
    "lb_privacy": "Privacy policy",
    "lnk_privacy": "https:\/\/www.avira.com\/en\/general-privacy",
    "lb_eula": "End User License Agreement",
    "lnk_eula": "https:\/\/www.avira.com\/en\/license-agreement-terms-of-use",
    "lb_discover_mode": "Discover more",
    "lb_feedback": "Feedback",
    "lb_rate": "Rate app",
    "lb_dash_pua_action_cancel": "Cancel download",
    "msg_mse_bar_warning": "Your search engine settings were possibly tampered with.",
    "lb_mse_sse_install": "Add SafeSearch Plus",
    "lb_mse_hide_warning": "I trust this search engine",
    "lnk_mse_install": "http://www.avira.com/en/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "Unsafe content",
    "lb_unsafe_content_bar_warning": "Avira Browser Safety prevented unsafe content from loading on this webpage.",
    "lb_unsafe_content_bar_ignore": "Don't show message again",
    "lb_extension_permission_notification_extension_description": "The Avira Browser Safety Extension needs your approval to send a report about suspicious activities to Avira.",
    "lb_extension_permission_notification_extension_permission_title": "Enable to send an anonymous report to Avira if suspicious activity is detected while browsing.",
    "lb_extension_permission_notification_extension_permission_button": "Allow",
    "lb_extension_permission_notification_extension_permission_no_title": "You can enable this feature at anytime in the settings.",
    "lb_extension_permission_notification_extension_permission_no_button": "Do not ask again",
    "lb_unsafe_content": "Unsafe Content",
    "msg_dash_unsafe_content_details_no_exception": "Unsafe content blocked:",
    "msg_dash_unsafe_content_details_exception": "Unsafe content blocked",
    "msg_dash_unsafe_content_risk_no_exception": "For safety, you are recommended to keep the content blocked.",
    "msg_dash_unsafe_content_risk_exception": "For safety, you are recommended to block the unsafe content by removing the exception.",
    "lb_dash_unsafe_content_show_details": "Technical details",
    "lb_dash_unsafe_content_hide_details": "Hide",
    "msg_category_unknown": "No information was found for this website.",
    "msg_category_safe": "No known threats.",
    "msg_category_malware": "This is a malware website",
    "msg_category_malware_sub": "Malware websites infect your device and can include viruses, worms, spyware, and Trojans.",
    "msg_category_phishing": "This is a phishing website",
    "msg_category_phishing_sub": "Phishing websites trick you into revealing your personal information, such as passwords and bank account information.",
    "msg_category_spam": "This is a spam website",
    "msg_category_spam_sub": "Spam websites get your email address so they can send you adverts by email.",
    "msg_category_pua": "The download contains Potentially Unwanted Applications",
    "msg_category_pua2": "This website distributes PUAs",
    "msg_category_pua2_sub": "Potentially Unwanted Applications (PUAs) exhibit behavior or contain features that are considered undesirable by users.",
    "msg_category_mse": "Distrusted search engine",
    "msg_category_mse_sub": "This search engine is distrusted because malware and Potentially Unwanted Applications are known to redirect traffic to it.",
    "msg_category_unsafe_content": "Unsafe content blocked",
    "msg_category_unsafe_content_sub": "Webpages load unsafe content if compromised or third-party content is hacked or intentionally harmful.",
    "msg_what_is_pua": "What is a PUA?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/en\/potentially-unwanted-applications",
    "lb_tab_privacy": "Privacy",
    "lb_tab_security": "Security",
    "lb_my_modes": "Modes",
    "msg_mode_select": "Select the mode that best meets<br\/>your needs",
    "lb_mode_safe-surfing": "Safe Surfing",
    "lb_mode_safe-private": "Safe and Private",
    "lb_mode_custom": "Custom",
    "lb_powered_by_avira": "Powered by Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/en\/avira-scout-ftu",
    "lb_help": "Help",
    "lnk_scout_help": "https:\/\/www.avira.com\/en\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} ads and #trackers were blocked by #Avira Browser Safety. Get yours now #forfree!",
    "lb_trackers_facebook_share": "{{ threshold }} - that's how many ads and trackers Avira Browser Safety has blocked from spying on my online activities so far. It's free and I highly recommend it.",
    "lb_congratulations": "Congratulations!",
    "lb_trackers_blocked_count": "{{ threshold }} ads and trackers blocked!",
    "lb_trackers_milestone_subtitle": "Help protect your family and friends, too.",
    "lb_tracker_notification_share_url_twitter": "http://www.avira.com/en/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http://www.avira.com/en/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Tweet",
    "lb_share": "Share",
    "lb_trackers": "Trackers",
    "lb_ads": "Ads",
    "lb_trackers_blocked_this_page": "<span class=\"txt--orange-dark\">Trackers</span> blocked on this website",
    "lb_ads_blocked_this_page": "<span class=\"txt--orange\">Ads</span> blocked on this website",
    "lb_blocked_total": "All ads and trackers blocked: <strong>{{ countTotal }}</strong>",
    "lb_adblocking_credits": "Ad blocking by <a href=\"https://adguard.com/?aid=27248\" target=\"_blank\">Adguard</a>"
}

},{}],159:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Sitio web seguro",
    "lb_unsafe_website": "Sitio web no seguro",
    "lb_unsafe_content_website": "Contenido no seguro",
    "lb_mse_website": "Motor de búsqueda poco fiable",
    "lb_trackers_blocked": "{{ count }} anuncios y rastreadores <span class=\"txt--green\">bloqueados<\/span> en {{ domain }}",
    "lb_trackers_blocked_short": "{{ count }} anuncios y rastreadores bloqueados",
    "lb_trackers_block_all": "Bloquear en este sitio web",
    "lb_trackers_allow_all": "Desbloquear anuncios y rastreadores",
    "msg_no_trackers": "No hay rastreadores que le estén siguiendo en la página actual. Si abre una página web con rastreadores activos, se mostrará la lista completa aquí.",
    "msg_trackers_tooltip": "Estos son todos los rastreadores en el sitio web que está visitando. Puede bloquear un rastreador haciendo clic en el control deslizante junto al mismo. Cuando un control deslizante está en verde, el rastreador estará bloqueado y no podrá rastrear su actividad de exploración. Tenga en cuenta que algunos rastreadores están permitidos por defecto. Su bloqueo puede hacer que el sitio web no funcione correctamente.",
    "lb_settings": "Configuración",
    "lb_setting_offers": "Mostrar comparativas de precios",
    "lb_setting_tooltip_offers": "Mostrar las mejores ofertas para los productos que está comprando (solo de sitios web seguros).",
    "lb_setting_dnt_header": "Enviar solicitud Protección de rastreo",
    "lb_setting_tooltip_dnt_header": "Informa a los sitios web que no deberían rastrearle. En caso de que ignoren la solicitud, SNA bloqueará todos los rastreadores.",
    "lb_setting_top_bar": "Mostrar indicador de seguridad",
    "lb_setting_block_trackers": "Bloquee rastreadores de forma predeterminada",
    "lb_setting_tooltip_block_trackers": "Proteja su privacidad bloqueando los rastreadores de forma predeterminada.",
    "lb_setting_cliqz": "Motor de búsqueda CLIQZ",
    "lb_setting_tooltip_cliqz": "El motor de búsqueda CLIQZ le sugiere sitios web e información relevante en tiempo real mientras introduce su búsqueda en la barra del navegador lo que le permite buscar de forma más segura y más rápida.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger bloquea anuncios espía y evita que los rastreadores invisibles le rastreen de forma secreta sin su permiso.",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere cifra sus comunicaciones y hace que su navegación sea más segura.",
    "lb_setting_inAppTracking": "Estadísticas anónimas",
    "lb_setting_tooltip_inAppTracking": "Ayúdenos a mejorar el producto compartiendo datos anónimos.",
    "lb_setting_show_advanced_controls": "Más controles de navegación",
    "lb_setting_tooltip_show_advanced_controls": "Se muestran en la barra de herramientas los iconos de Privacy Badger y HTTPS Everywhere.",
    "lb_setting_google_services": "Servicios de Google",
    "lb_setting_tooltip_google_services": "Permite a Scout utilizar los servicios de Google para corregir errores de ortografía, URL escritas de forma incorrecta e informar sobre sitios web maliciosos. Esto permitirá a Google recopilar sus datos privados.",
    "lb_setting_adguard": "Bloquear anuncios y el rastreo web",
    "lb_setting_tooltip_adguard": "Protege su privacidad evitando que cualquiera supervise lo que hace en línea. Bloquea también ventanas emergentes intrusivas, anuncios web, anuncios en vídeo y más.",
    "lb_setting_adguard_social_media": "Bloquear el rastreo de redes sociales",
    "lb_setting_tooltip_adguard_social_media": "Deshabilita los botones y widgets de redes sociales de los sitios web para que las redes sociales no puedan rastrear los sitios que visita.",
    "lb_setting_adguard_useful_ads": "Mostrar anuncios útiles",
    "lb_setting_tooltip_adguard_useful_ads": "Permite que en sus resultados de búsqueda aparezcan anuncios relevantes y no intrusivos.",
    "lb_setting_scout_help": "Haga clic <a href=\"https:\/\/www.avira.com\/es\/avira-scout-ftu\" target=\"_blank\">aquí<\/a> para más información.",
    "lb_setting_extension_scan": "Análisis de extensiones",
    "lb_setting_tooltip_extension_scan": "Activar el envío a Avira de un informe anónimo si se detecta actividad sospechosa mientras se navega.",
    "btn_blocking_back": "Salir de aquí",
    "lb_blocking_options": "Otras opciones",
    "lb_blocking_add_exception": "Nunca bloquear este sitio web",
    "btn_blocking_continue": "Continuar de todas formas",
    "btn_dash_classification_cb_exception": "Nunca bloquear este sitio web",
    "lb_dash_classification_exception_info_add": "Adición de una excepción",
    "msg_dash_classification_exception_info_add": "Este sitio NO se encuentra actualmente en su lista de excepciones. Si añade una excepción, la dirección no se bloqueará cuando trate de verla. Aun así, verá la advertencia en la parte superior de la pantalla.",
    "lb_dash_classification_exception_info_remove": "Eliminación de una excepción",
    "msg_dash_classification_exception_info_remove": "Este sitio se encuentra actualmente en su lista de excepciones. Si elimina la excepción, siempre que trate de ver la excepción, esta se bloqueará.",
    "lb_privacy": "Política de privacidad",
    "lnk_privacy": "https:\/\/www.avira.com\/es\/general-privacy",
    "lb_eula": "Acuerdo de licencia de usuario final",
    "lnk_eula": "https:\/\/www.avira.com\/es\/license-agreement-terms-of-use",
    "lb_discover_mode": "Obtener más información",
    "lb_feedback": "Comentarios",
    "lb_rate": "Valorar aplicación",
    "lb_dash_pua_action_cancel": "Cancelar descarga",
    "msg_mse_bar_warning": "Es posible que la configuración de su motor de búsqueda haya sido manipulada.",
    "lb_mse_sse_install": "Añadir SafeSearch Plus",
    "lb_mse_hide_warning": "Confío en este motor de búsqueda",
    "lnk_mse_install": "http:\/\/www.avira.com\/es\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "Contenido no seguro",
    "lb_unsafe_content_bar_warning": "Avira Navegación segura ha evitado que se cargue contenido no seguro en esta página web.",
    "lb_unsafe_content_bar_ignore": "No volver a mostrar el mensaje",
    "lb_extension_permission_notification_extension_description": "La extensión Avira Navegación segura requiere su aprobación para enviar a Avira un informe sobre actividades sospechosas.",
    "lb_extension_permission_notification_extension_permission_title": "Activar el envío a Avira de un informe anónimo si se detecta actividad sospechosa mientras se navega.",
    "lb_extension_permission_notification_extension_permission_button": "Permitir",
    "lb_extension_permission_notification_extension_permission_no_title": "Puede activar esta función en la configuración en cualquier momento.",
    "lb_extension_permission_notification_extension_permission_no_button": "No volver a preguntar",
    "lb_unsafe_content": "Contenido no seguro",
    "msg_dash_unsafe_content_details_no_exception": "Contenido no seguro bloqueado:",
    "msg_dash_unsafe_content_details_exception": "Contenido no seguro bloqueado",
    "msg_dash_unsafe_content_risk_no_exception": "Por seguridad, le recomendamos que mantenga el contenido bloqueado.",
    "msg_dash_unsafe_content_risk_exception": "Por seguridad, le recomendamos que bloquee el contenido no seguro eliminando la excepción.",
    "lb_dash_unsafe_content_show_details": "Detalles técnicos",
    "lb_dash_unsafe_content_hide_details": "Ocultar",
    "msg_category_unknown": "No se ha encontrado información sobre este sitio web.",
    "msg_category_safe": "Sin amenazas conocidas.",
    "msg_category_malware": "Este sitio web contiene malware",
    "msg_category_malware_sub": "Los sitios web con malware infectan su dispositivo y pueden incluir virus, gusanos, spyware y troyanos.",
    "msg_category_phishing": "Este es un sitio web de suplantación de identidad",
    "msg_category_phishing_sub": "Los sitios web de suplantación de identidad intentan engañar al usuario para revelar información personal, como contraseñas y datos bancarios.",
    "msg_category_spam": "Este es un sitio web de correo no deseado",
    "msg_category_spam_sub": "Los sitios web de correo no deseado capturan su dirección de correo electrónico para enviarle publicidad no deseada por correo electrónico.",
    "msg_category_pua": "La descarga contiene aplicaciones potencialmente no deseadas",
    "msg_category_pua2": "Este sitio web distribuye PUA",
    "msg_category_pua2_sub": "Las aplicaciones potencialmente no deseadas (PUA) muestran un comportamiento o contienen características que suelen ser consideradas como no deseables por los usuarios.",
    "msg_category_mse": "Motor de búsqueda poco fiable",
    "msg_category_mse_sub": "Se desconfía de este motor de búsqueda porque se sabe que programas maliciosos y aplicaciones potencialmente no deseadas redirigen aquí el tráfico.",
    "msg_category_unsafe_content": "Contenido no seguro bloqueado",
    "msg_category_unsafe_content_sub": "Las páginas web pueden cargar contenido no seguro si han sido comprometidas o si el contenido de terceros se ha pirateado o es malicioso de forma intencionada.",
    "msg_what_is_pua": "¿Qué es PUA?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/es-es\/potentially-unwanted-applications",
    "lb_tab_privacy": "Privacidad",
    "lb_tab_security": "Seguridad",
    "lb_my_modes": "Modos",
    "msg_mode_select": "Seleccione el modo que se adapta más a <br\/>sus necesidades",
    "lb_mode_safe-surfing": "Navegación segura",
    "lb_mode_safe-private": "Segura y privada",
    "lb_mode_custom": "Personalizado",
    "lb_powered_by_avira": "Contenido provisto por Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/es\/avira-scout-ftu",
    "lb_help": "Ayuda",
    "lnk_scout_help": "https:\/\/www.avira.com\/en\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} anuncios y #rastreadores bloqueados por #Avira Navegación segura. ¡Consiga el suyo ahora #gratis!",
    "lb_trackers_facebook_share": "{{ threshold }}: estos son todos los anuncios y rastreadores que Avira Navegación segura ha bloqueado hasta ahora para evitar el espionaje de mis actividades en línea. Es gratuito y lo recomiendo mucho.",
    "lb_congratulations": "¡Enhorabuena!",
    "lb_trackers_blocked_count": "{{ threshold }} anuncios y rastreadores bloqueados.",
    "lb_trackers_milestone_subtitle": "Contribuye también a la protección de tu familia y amigos.",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/es\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/es\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Tuit",
    "lb_share": "Compartir",
    "lb_trackers": "Rastreadores",
    "lb_ads": "Anuncios",
    "lb_trackers_blocked_this_page": "<span class=\"txt--orange-dark\">Rastreadores<\/span> bloqueados en este sitio web.",
    "lb_ads_blocked_this_page": "<span class=\"txt--orange\">Anuncios<\/span> bloqueados en este sitio web.",
    "lb_blocked_total": "Todos los anuncios y rastreadores bloqueados: <strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "Anuncios bloqueados por <a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a>"
}

},{}],160:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Site Internet sécurisé",
    "lb_unsafe_website": "Site Internet non sécurisé",
    "lb_unsafe_content_website": "Contenu dangereux",
    "lb_mse_website": "Moteur de recherche désapprouvé",
    "lb_trackers_blocked": "{{ count }} annonces et dispositifs de suivi <span class=\"txt--green\">bloqués<\/span> sur {{ domain }}",
    "lb_trackers_blocked_short": "{{ count }} annonces et dispositifs de suivi bloqués",
    "lb_trackers_block_all": "Bloquer sur ce site Internet",
    "lb_trackers_allow_all": "Débloquer toutes les annonces et les dispositifs de suivi",
    "msg_no_trackers": "Aucun dispositif de suivi ne vous suit sur la page actuelle. Si vous ouvrez un site Internet avec des dispositifs de suivi actifs, la liste complète s'affichera ici.",
    "msg_trackers_tooltip": "Voici tous les dispositifs de suivi recensés sur le site Internet que vous consultez. Pour bloquer un dispositif de suivi, cliquez sur le curseur adjacent. Lorsque le curseur est vert, le dispositif de suivi est bloqué et ne peut pas suivre vos activités de navigation. Notez que certains dispositifs de suivi sont autorisés par défaut. Leur blocage peut alors entraver le bon fonctionnement de la page Web.",
    "lb_settings": "Paramètres",
    "lb_setting_offers": "Afficher les comparaisons de prix",
    "lb_setting_tooltip_offers": "Afficher les meilleures affaires pour les articles que vous recherchez – sur des sites Internet sécurisés.",
    "lb_setting_dnt_header": "Envoyer l'en-tête Ne pas suivre",
    "lb_setting_tooltip_dnt_header": "Intimez aux sites Internet de ne pas vous suivre. S'ils ignorent cette requête, PNA bloquera tout dispositif de suivi.",
    "lb_setting_top_bar": "Afficher l’indicateur de sécurité",
    "lb_setting_block_trackers": "Bloquer les dispositifs de suivi par défaut",
    "lb_setting_tooltip_block_trackers": "Protégez votre sphère privée en bloquant les dispositifs de suivi par défaut.",
    "lb_setting_cliqz": "Recherche CLIQZ",
    "lb_setting_tooltip_cliqz": "La Recherche CLIQZ vous suggère des sites Internet et des informations pertinentes en temps réel lors de la saisie dans la barre de navigation, tout en accélérant et sécurisant votre recherche.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger bloque les pubs espionnes et empêche les mouchards invisibles de vous suivre secrètement sans votre autorisation.",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere chiffre vos communications et sécurise votre navigation plus avant.",
    "lb_setting_inAppTracking": "Statistiques anonymes",
    "lb_setting_tooltip_inAppTracking": "Aidez-nous à améliorer le produit en partageant des données anonymes.",
    "lb_setting_show_advanced_controls": "Contrôles supp. de navigation",
    "lb_setting_tooltip_show_advanced_controls": "Affiche les icônes Privacy Badger et HTTPS Everywhere dans la barre d'outils.",
    "lb_setting_google_services": "Services Google",
    "lb_setting_tooltip_google_services": "Autoriser Scout à utiliser les services Google pour corriger l'orthographe, rectifier les fautes de frappe dans les URL et signaler les sites Internet malveillants. Ceci autorise Google à collecter vos données privées.",
    "lb_setting_adguard": "Bloquez les annonces et le suivi sur Internet",
    "lb_setting_tooltip_adguard": "Protège votre vie privée en bloquant toute possibilité de surveillance de vos activités en ligne. Bloque également les fenêtres intempestives intrusives, les bannières web, les annonces vidéo, etc.",
    "lb_setting_adguard_social_media": "Bloquez le suivi sur les médias sociaux",
    "lb_setting_tooltip_adguard_social_media": "Désactive les boutons et widgets liés aux médias sociaux sur les sites Internet afin d'empêcher le suivi de vos activités par les réseaux sociaux.",
    "lb_setting_adguard_useful_ads": "Affichez des annonces utiles",
    "lb_setting_tooltip_adguard_useful_ads": "Autorise l'affichage d'annonces ciblées et non intrusives dans vos résultats de recherche.",
    "lb_setting_scout_help": "Cliquez <a href=\"https:\/\/www.avira.com\/fr\/avira-scout-ftu\" target=\"_blank\">ici<\/a> pour obtenir plus de détails.",
    "lb_setting_extension_scan": "Analyse des extensions",
    "lb_setting_tooltip_extension_scan": "Activez cette option pour envoyer un rapport anonyme à Avira en cas d'activité suspecte détectée au cours de la navigation.",
    "btn_blocking_back": "Renforcer ma sécurité",
    "lb_blocking_options": "Autres options",
    "lb_blocking_add_exception": "Ne jamais bloquer ce site Internet",
    "btn_blocking_continue": "Continuer quand même",
    "btn_dash_classification_cb_exception": "Ne jamais bloquer ce site Internet",
    "lb_dash_classification_exception_info_add": "Ajout d'une exception",
    "msg_dash_classification_exception_info_add": "Ce site n'est actuellement PAS repris dans votre liste d'exceptions. Lorsque vous ajoutez une exception, l'adresse concernée n'est pas bloquée lorsque vous tentez d'y accéder. L'avertissement continue toutefois de s'afficher dans la partie supérieure de l'écran.",
    "lb_dash_classification_exception_info_remove": "Suppression d'une exception",
    "msg_dash_classification_exception_info_remove": "Ce site est actuellement repris dans votre liste d'exceptions. Si vous supprimez l'exception, l'adresse sera bloquée à chaque fois que vous tenterez d'y accéder.",
    "lb_privacy": "Politique de confidentialité",
    "lnk_privacy": "https:\/\/www.avira.com\/fr\/general-privacy",
    "lb_eula": "Contrat de licence de l''utilisateur final",
    "lnk_eula": "https:\/\/www.avira.com\/fr\/license-agreement-terms-of-use",
    "lb_discover_mode": "En savoir plus",
    "lb_feedback": "Commentaire",
    "lb_rate": "Évaluer l'application",
    "lb_dash_pua_action_cancel": "Annuler le téléchargement",
    "msg_mse_bar_warning": "Les paramètres de votre moteur de recherche ont peut-être été altérés.",
    "lb_mse_sse_install": "Ajouter SafeSearch Plus",
    "lb_mse_hide_warning": "Je fais confiance à ce moteur de recherche",
    "lnk_mse_install": "http:\/\/www.avira.com\/fr\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "Contenu dangereux",
    "lb_unsafe_content_bar_warning": "Protection de navigateur Avira a empêché le chargement de contenu dangereux sur cette page Web.",
    "lb_unsafe_content_bar_ignore": "Ne plus afficher ce message",
    "lb_extension_permission_notification_extension_description": "L'extension Protection de navigateur Avira requiert votre autorisation pour envoyer un rapport concernant les activités suspectes à Avira.",
    "lb_extension_permission_notification_extension_permission_title": "Activez cette option pour envoyer un rapport anonyme à Avira en cas d'activité suspecte détectée au cours de la navigation.",
    "lb_extension_permission_notification_extension_permission_button": "Autoriser",
    "lb_extension_permission_notification_extension_permission_no_title": "Vous pouvez activer cette fonctionnalité à tout moment dans les paramètres.",
    "lb_extension_permission_notification_extension_permission_no_button": "Ne plus demander",
    "lb_unsafe_content": "Contenu dangereux",
    "msg_dash_unsafe_content_details_no_exception": "Contenu dangereux bloqué :",
    "msg_dash_unsafe_content_details_exception": "Contenu dangereux bloqué",
    "msg_dash_unsafe_content_risk_no_exception": "Pour votre sécurité, il est recommandé de bloquer ce contenu.",
    "msg_dash_unsafe_content_risk_exception": "Pour votre sécurité, il est recommandé de bloquer le contenu non sécurisé en supprimant l'exception existante.",
    "lb_dash_unsafe_content_show_details": "Détails techniques",
    "lb_dash_unsafe_content_hide_details": "Masquer",
    "msg_category_unknown": "Aucune information trouvée pour le site Internet.",
    "msg_category_safe": "Aucune menace connue.",
    "msg_category_malware": "Ce site est un site Internet malveillant",
    "msg_category_malware_sub": "Les sites Internet malveillants infectent votre appareil et peuvent inclure des virus, des vers, des logiciels espions et des chevaux de Troie.",
    "msg_category_phishing": "Ce site est un site Internet de hameçonnage",
    "msg_category_phishing_sub": "Les sites Internet de hameçonnage vous incitent à révéler vos informations personnelles, telles que vos mots de passe et coordonnées bancaires.",
    "msg_category_spam": "Ce site est un site Internet de spam",
    "msg_category_spam_sub": "Les sites Internet de spam capturent votre adresse électronique afin de vous envoyer des publicités indésirables par e-mail.",
    "msg_category_pua": "Le téléchargement contient des applications potentiellement indésirables",
    "msg_category_pua2": "Ce site Internet distribue des PUA",
    "msg_category_pua2_sub": "Les PUA, ou applications potentiellement indésirables, présentent un comportement ou intègrent des fonctionnalités indésirables pour les utilisateurs.",
    "msg_category_mse": "Moteur de recherche désapprouvé",
    "msg_category_mse_sub": "Ce moteur de recherche n'est pas fiable : son trafic est alimenté par des logiciels malveillants et des applications potentiellement indésirables.",
    "msg_category_unsafe_content": "Contenu dangereux bloqué",
    "msg_category_unsafe_content_sub": "Les pages Web chargent des contenus dangereux lorsqu'elles sont compromises, c'est-à-dire lorsque leur contenu a été piraté ou conçu dans un but malveillant.",
    "msg_what_is_pua": "Qu'est-ce que les applications potentiellement indésirables (PUA) ?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/fr-fr\/potentially-unwanted-applications",
    "lb_tab_privacy": "Confidentialité",
    "lb_tab_security": "Sécurité",
    "lb_my_modes": "Modes",
    "msg_mode_select": "Sélectionnez le mode qui répond<br\/>le mieux à vos besoins",
    "lb_mode_safe-surfing": "Navigation sécurisée",
    "lb_mode_safe-private": "Sécurisé et privé",
    "lb_mode_custom": "Personnalisé",
    "lb_powered_by_avira": "Une solution Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/fr\/avira-scout-ftu",
    "lb_help": "Aide",
    "lnk_scout_help": "https:\/\/www.avira.com\/en\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} annonces et #trackers bloqués par Protection de navigateur #Avira. Profitez-en, c'est #gratuit !",
    "lb_trackers_facebook_share": "{{ threshold }} - voilà le nombre d'annonces et dispositifs de suivi indiscrets déjà bloqués par la Protection de navigateur Avira lors de mes activités en ligne. Un outil gratuit et vivement recommandable !",
    "lb_congratulations": "Félicitations !",
    "lb_trackers_blocked_count": "{{ threshold }} annonces et dispositifs de suivi bloqués !",
    "lb_trackers_milestone_subtitle": "Aidez votre famille et vos amis à se protéger eux aussi.",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/fr\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/fr\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Twitter",
    "lb_share": "Partager",
    "lb_trackers": "Dispositifs de suivi",
    "lb_ads": "Annonces",
    "lb_trackers_blocked_this_page": "<span class=\"txt--orange-dark\">Dispositifs de suivi<\/span> bloqués sur ce site Internet",
    "lb_ads_blocked_this_page": "<span class=\"txt--orange\">Annonces<\/span> bloquées sur ce site Internet",
    "lb_blocked_total": "Total des annonces et dispositifs de suivi bloqués : <strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "Blocage des annonces publicitaires par <a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a>"
}

},{}],161:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Situs web aman",
    "lb_unsafe_website": "Situs web tidak aman",
    "lb_unsafe_content_website": "Konten tidak aman",
    "lb_mse_website": "Mesin Pencarian Tidak Tepercaya",
    "lb_trackers_blocked": "{{ count }} iklan dan pelacak <span class=\"txt--green\">diblokir<\/span> pada {{ domain }}",
    "lb_trackers_blocked_short": "{{ count }} iklan dan pelacak diblokir",
    "lb_trackers_block_all": "Blokir pada situs web ini",
    "lb_trackers_allow_all": "Buka blokir iklan dan pelacak",
    "msg_no_trackers": "Tidak ada pelacak yang mengikuti Anda pada halaman saat ini. Jika Anda membuka situs web dengan pelacak aktif, daftar lengkap akan diperlihatkan di sini.",
    "msg_trackers_tooltip": "Ini adalah semua pelacak pada situs web yang sedang Anda lihat. Anda dapat memblokir pelacak dengan mengklik panel geser di sebelahnya. Saat panel geser berwarna hijau, pelacak tersebut diblokir dan tidak dapat melacak aktivitas penjelajahan Anda. Perhatikan bahwa beberapa pelacak diizinkan oleh standar. Memblokir pelacak dapat mengakibatkan halaman web tidak berfungsi dengan benar.",
    "lb_settings": "Pengaturan",
    "lb_setting_offers": "Perlihatkan perbandingan harga",
    "lb_setting_tooltip_offers": "Perlihatkan penawaran lebih baik untuk item belanja Anda â€“ hanya dari situs web aman.",
    "lb_setting_dnt_header": "Kirim header Jangan Lacak",
    "lb_setting_tooltip_dnt_header": "Informasikan pada situs web bahwa mereka tidak seharusnya melacak Anda. Jika mereka mengabaikan permintaan, ABS tetap memblokir pelacak apa pun.",
    "lb_setting_top_bar": "Perlihatkan indikator keamanan",
    "lb_setting_block_trackers": "Blokir pelacak dengan standar",
    "lb_setting_tooltip_block_trackers": "Lindungi privasi Anda dengan memblokir pelacak dengan standar.",
    "lb_setting_cliqz": "Pencarian CLIQZ",
    "lb_setting_tooltip_cliqz": "Pencarian CLIQZ menyarankan situs web dan informasi yang relevan dalam waktu nyata saat Anda memasukkan pencarian Anda di bar peramban, yang memungkinkan Anda untuk mencari dengan lebih aman dan lebih cepat.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger memblokir iklan yang memata-matai dan mencegah pelacak tidak terlihat dari melacak Anda secara rahasia tanpa izin Anda.",
    "lb_setting_https_everywhere": "HTTPS Di Mana Saja",
    "lb_setting_tooltip_https_everywhere": "HTTPS Di Mana Saja mengenkripsi komunikasi Anda dan membuat penjelajahan Anda lebih aman.",
    "lb_setting_inAppTracking": "Statistik Anonim",
    "lb_setting_tooltip_inAppTracking": "Bantu kami meningkatkan produk dengan membagikan data anonim.",
    "lb_setting_show_advanced_controls": "Perlihatkan kendali penjelajahan ekstra",
    "lb_setting_tooltip_show_advanced_controls": "Menampilkan ikon Privacy Badger dan HTTPS Di Mana Saja di toolbar.",
    "lb_setting_google_services": "Layanan Google",
    "lb_setting_tooltip_google_services": "Izinkan Scout menggunakan Layanan Google untuk memperbaiki kesalahan pengejaan, mengoreksi URL yang salah ketik, dan melaporkan situs web berbahaya. Hal ini akan memungkinkan Google untuk mengumpulkan data pribadi Anda.",
    "lb_setting_adguard": "Blokir iklan & pelacakan web",
    "lb_setting_tooltip_adguard": "Melindungi privasi Anda dengan menghentikan siapa pun dari memantau Anda online. Juga memblokir sembulan, spanduk web, iklan video, dan lainnya yang mengganggu.",
    "lb_setting_adguard_social_media": "Blokir pelacakan media sosial",
    "lb_setting_tooltip_adguard_social_media": "Menonaktifkan tombol dan widget media sosial dari situs web, sehingga jaringan sosial tersebut tidak dapat menyimpan jejak situs yang Anda kunjungi.",
    "lb_setting_adguard_useful_ads": "Perlihatkan iklan yang berguna",
    "lb_setting_tooltip_adguard_useful_ads": "Memungkinkan iklan yang tidak mengganggu dan relevan untuk diperlihatkan di hasil pencarian Anda.",
    "lb_setting_scout_help": "Klik <a href=\"https:\/\/www.avira.com\/en\/avira-scout-ftu\" target=\"_blank\">di sini<\/a> untuk detail lebih lanjut.",
    "lb_setting_extension_scan": "Analisis Ekstensi",
    "lb_setting_tooltip_extension_scan": "Aktifkan untuk mengirim laporan anonim ke Avira jika aktivitas mencurigakan terdeteksi saat menjelajahi.",
    "btn_blocking_back": "Bawa saya pergi!",
    "lb_blocking_options": "Opsi lainnya",
    "lb_blocking_add_exception": "Jangan pernah blokir situs web ini",
    "btn_blocking_continue": "Lanjutkan",
    "btn_dash_classification_cb_exception": "Jangan pernah blokir situs web ini",
    "lb_dash_classification_exception_info_add": "Menambahkan pengecualian",
    "msg_dash_classification_exception_info_add": "Situs ini saat ini TIDAK ada pada daftar pengecualian Anda. Saat Anda menambahkan pengecualian, alamat tidak akan diblokir saat Anda mencoba melihatnya. Anda akan tetap melihat peringatan pada layar bagian atas.",
    "lb_dash_classification_exception_info_remove": "Menghapus pengecualian",
    "msg_dash_classification_exception_info_remove": "Situs ini saat ini ada pada daftar pengecualian Anda. Jika Anda menghapus pengecualian, alamat akan diblokir setiap kali Anda mencoba melihatnya.",
    "lb_privacy": "Kebijakan privasi",
    "lnk_privacy": "https:\/\/www.avira.com\/id\/general-privacy",
    "lb_eula": "Perjanjian Lisensi Pengguna Akhir",
    "lnk_eula": "https:\/\/www.avira.com\/id\/license-agreement-terms-of-use",
    "lb_discover_mode": "Temukan lebih banyak",
    "lb_feedback": "Umpan balik",
    "lb_rate": "Beri nilai aplikasi",
    "lb_dash_pua_action_cancel": "Batalkan pengunduhan",
    "msg_mse_bar_warning": "Pengaturan mesin pencarian Anda mungkin rusak.",
    "lb_mse_sse_install": "Tambahkan SafeSearch Plus",
    "lb_mse_hide_warning": "Saya percaya mesin pencarian ini",
    "lnk_mse_install": "http:\/\/www.avira.com\/id\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "Konten tidak aman",
    "lb_unsafe_content_bar_warning": "Avira Browser Safety mencegah konten berbahaya dimuat di halaman web ini.",
    "lb_unsafe_content_bar_ignore": "Jangan perlihatkan pesan lagi",
    "lb_extension_permission_notification_extension_description": "Ekstensi Avira Browser Safety memerlukan izin Anda untuk mengirimkan laporan tentang aktivitas mencurigakan ke Avira.",
    "lb_extension_permission_notification_extension_permission_title": "Aktifkan untuk mengirim laporan anonim ke Avira jika aktivitas mencurigakan terdeteksi saat menjelajahi.",
    "lb_extension_permission_notification_extension_permission_button": "Izinkan",
    "lb_extension_permission_notification_extension_permission_no_title": "Anda dapat mengaktifkan fitur ini kapan pun di pengaturan.",
    "lb_extension_permission_notification_extension_permission_no_button": "Jangan tanya lagi",
    "lb_unsafe_content": "Konten Tidak Aman",
    "msg_dash_unsafe_content_details_no_exception": "Konten tidak aman diblokir:",
    "msg_dash_unsafe_content_details_exception": "Konten tidak aman diblokir",
    "msg_dash_unsafe_content_risk_no_exception": "Untuk keamanan, Anda disarankan untuk tetap memblokir konten.",
    "msg_dash_unsafe_content_risk_exception": "Untuk keamanan, Anda disarankan untuk memblokir konten tidak aman dengan menghapus pengecualian.",
    "lb_dash_unsafe_content_show_details": "Detail teknis",
    "lb_dash_unsafe_content_hide_details": "Sembunyikan",
    "msg_category_unknown": "Tidak ada informasi ditemukan untuk situs web ini.",
    "msg_category_safe": "Tidak ada ancaman yang diketahui.",
    "msg_category_malware": "Ini adalah situs web malware",
    "msg_category_malware_sub": "Situs web malware menginfeksi perangkat Anda dan dapat mengandung virus, worm, spyware, dan Trojan.",
    "msg_category_phishing": "Ini adalah situs web pengelabuan",
    "msg_category_phishing_sub": "Situs web pengelabuan mengelabui Anda untuk mengungkapkan informasi pribadi seperti kata sandi dan informasi akun bank.",
    "msg_category_spam": "Ini adalah situs web spam",
    "msg_category_spam_sub": "Situs web spam mengambil alamat email Anda agar iklan dapat dikirimkan melalui email.",
    "msg_category_pua": "Unduhan berisi Aplikasi yang Berpotensi Tidak Diinginkan",
    "msg_category_pua2": "Situs web ini mendistribusikan PUA",
    "msg_category_pua2_sub": "Aplikasi yang Berpotensi Tidak Diinginkan (PUA) memperlihatkan perilaku atau berisi fitur yang dianggap tidak diinginkan oleh pengguna.",
    "msg_category_mse": "Mesin pencarian tidak tepercaya",
    "msg_category_mse_sub": "Mesin pencarian ini tidak tepercaya karena malware dan Aplikasi yang Berpotensi Tidak Diinginkan diketahui mengarahkan ulang lalu lintas kepadanya.",
    "msg_category_unsafe_content": "Konten tidak aman diblokir",
    "msg_category_unsafe_content_sub": "Halaman web memuat konten tidak aman jika disusupi atau konten pihak ketiga diretas atau berbahaya dengan sengaja.",
    "msg_what_is_pua": "Apa itu PUA?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/id\/potentially-unwanted-applications",
    "lb_tab_privacy": "Privasi",
    "lb_tab_security": "Keamanan",
    "lb_my_modes": "Mode",
    "msg_mode_select": "Pilih mode terbaik yang memenuhi<br\/>kebutuhan Anda",
    "lb_mode_safe-surfing": "Menelusur dengan Aman",
    "lb_mode_safe-private": "Aman dan Privat",
    "lb_mode_custom": "Kustom",
    "lb_powered_by_avira": "Dipersembahkan oleh Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/id\/avira-scout-ftu",
    "lb_help": "Bantuan",
    "lnk_scout_help": "https:\/\/www.avira.com\/id\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} iklan dan #pelacak diblokir oleh #Avira Browser Safety. Dapatkan milik Anda sekarang #secaragratis!",
    "lb_trackers_facebook_share": "{{ threshold }} - inilah jumlah iklan dan pelacak yang telah diblokir oleh Avira Browser Safety dari memata-matai aktivitas online saya sejauh ini. Itu gratis dan saya sangat merekomendasikannya.",
    "lb_congratulations": "Selamat!",
    "lb_trackers_blocked_count": "{{ threshold }} iklan dan pelacak diblokir!",
    "lb_trackers_milestone_subtitle": "Bantu lindungi keluarga dan teman Anda juga.",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/id\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/id\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Tweet",
    "lb_share": "Bagikan",
    "lb_trackers": "Pelacak",
    "lb_ads": "Iklan",
    "lb_trackers_blocked_this_page": "<span class=\"txt--orange-dark\">Pelacak<\/span> diblokir pada situs web ini",
    "lb_ads_blocked_this_page": "<span class=\"txt--orange\">Iklan<\/span> diblokir pada situs web ini",
    "lb_blocked_total": "Semua iklan dan pelacak diblokir: <strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "Pemblokiran iklan oleh <a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a>"
}

},{}],162:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Sito web sicuro",
    "lb_unsafe_website": "Sito web non sicuro",
    "lb_unsafe_content_website": "Contenuto non sicuro",
    "lb_mse_website": "Motore di ricerca non affidabile",
    "lb_trackers_blocked": "{{ count }} pubblicità e tracker <span class=\"txt--green\">bloccati<\/span> su {{ domain }}",
    "lb_trackers_blocked_short": "{{ count }} pubblicità e tracker bloccati",
    "lb_trackers_block_all": "Blocca su questo sito web",
    "lb_trackers_allow_all": "Sblocca le pubblicità e i tracker",
    "msg_no_trackers": "Sulla pagina non sono presenti tracker che potrebbero seguirla. Se apre un sito Web con i tracker attivi, l'elenco completo viene visualizzato qui.",
    "msg_trackers_tooltip": "Questi sono tutti i tracker presenti sul sito Web che sta visualizzando. Può bloccare un tracker facendo clic sul dispositivo di scorrimento accanto al tracker stesso. Quando un dispositivo di scorrimento è verde, il tracker è bloccato e non può eseguire il tracking della sua attività di navigazione. Alcuni tracker sono autorizzati per default e bloccarli potrebbe causare un funzionamento non corretto della pagina Web.",
    "lb_settings": "Impostazioni",
    "lb_setting_offers": "Mostra il confronto prezzi",
    "lb_setting_tooltip_offers": "Mostra le offerte migliori per gli articoli che stai acquistando: solo da siti web sicuri.",
    "lb_setting_dnt_header": "Invia l'intestazione Do not track",
    "lb_setting_tooltip_dnt_header": "Informa i siti web che non desideri che tengano traccia delle tue attività. Se ignorano la richiesta, SBA bloccherà ugualmente eventuali tracker.",
    "lb_setting_top_bar": "Mostra indicatore di sicurezza",
    "lb_setting_block_trackers": "Blocca i tracker in modo predefinito",
    "lb_setting_tooltip_block_trackers": "Proteggi la tua privacy bloccando i tracker in modo predefinito.",
    "lb_setting_cliqz": "CLIQZ Search",
    "lb_setting_tooltip_cliqz": "CLIQZ Search ti suggerisce siti web e informazioni pertinenti in tempo reale mentre digiti i termini di ricerca nella barra del browser, rendendo la ricerca più rapida e sicura.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger blocca gli annunci spia e impedisce a tracker invisibili di tracciare segretamente le tue attività senza il tuo permesso.",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere crittografa le comunicazioni e ti permette di navigare in modo più sicuro.",
    "lb_setting_inAppTracking": "Statistiche anonime",
    "lb_setting_tooltip_inAppTracking": "Aiutaci a migliorare il prodotto condividendo dati anonimi.",
    "lb_setting_show_advanced_controls": "Controlli di navigazione addiz.",
    "lb_setting_tooltip_show_advanced_controls": "Mostra le icone di Privacy Badger e HTTPS Everywhere nella barra degli strumenti.",
    "lb_setting_google_services": "Servizi di Google",
    "lb_setting_tooltip_google_services": "Consenti a Scout di usare i servizi di Google per correggere gli errori di ortografia, gli URL e segnalare i siti web dannosi. Questo consentirà a Google di raccogliere i tuoi dati personali.",
    "lb_setting_adguard": "Blocca le pubblicità e il web tracking",
    "lb_setting_tooltip_adguard": "Protegge la tua privacy impedendo a chiunque di monitorare le tue attività online. Blocca anche popup, banner, video pubblicitari invadenti e molto altro ancora.",
    "lb_setting_adguard_social_media": "Blocca il tracking dei social media",
    "lb_setting_tooltip_adguard_social_media": "Disattiva i pulsanti e i widget dei social media presenti nei siti web per evitare che il social network possa tenere traccia dei siti visitati.",
    "lb_setting_adguard_useful_ads": "Mostra pubblicità utili",
    "lb_setting_tooltip_adguard_useful_ads": "Consente la visualizzazione di pubblicità rilevanti e non invadenti nei risultati della ricerca.",
    "lb_setting_scout_help": "Clicca <a href=\"https:\/\/www.avira.com\/it\/avira-scout-ftu\" target=\"_blank\">qui<\/a> per ulteriori dettagli.",
    "lb_setting_extension_scan": "Analisi delle estensioni",
    "lb_setting_tooltip_extension_scan": "Consenti l'invio di report anonimi ad Avira se vengono rilevate attività sospette durante la navigazione.",
    "btn_blocking_back": "Non voglio più accedere.",
    "lb_blocking_options": "Altre opzioni",
    "lb_blocking_add_exception": "Non bloccare mai questo sito web",
    "btn_blocking_continue": "Continua comunque",
    "btn_dash_classification_cb_exception": "Non bloccare mai questo sito web",
    "lb_dash_classification_exception_info_add": "Aggiunta di un'eccezione",
    "msg_dash_classification_exception_info_add": "Questo sito NON è al momento incluso nell'elenco delle eccezioni. Se aggiungi un'eccezione, l'indirizzo non verrà bloccato quanto tenti di accedere al sito. Verrà comunque visualizzata un'avvertenza nella parte superiore della schermata.",
    "lb_dash_classification_exception_info_remove": "Rimuovi un'eccezione",
    "msg_dash_classification_exception_info_remove": "Questo sito è attualmente incluso nell'elenco delle eccezioni. Se rimuovi l'eccezione, l'indirizzo verrà bloccato ogni volta che tenti di accedere al sito.",
    "lb_privacy": "Policy sulla privacy",
    "lnk_privacy": "https:\/\/www.avira.com\/it\/general-privacy",
    "lb_eula": "Contratto di licenza con l''utente finale",
    "lnk_eula": "https:\/\/www.avira.com\/it\/license-agreement-terms-of-use",
    "lb_discover_mode": "Scopri di più",
    "lb_feedback": "Feedback",
    "lb_rate": "Valuta l’app",
    "lb_dash_pua_action_cancel": "Annulla download",
    "msg_mse_bar_warning": "Le impostazioni di ricerca potrebbero essere state manomesse.",
    "lb_mse_sse_install": "Aggiungi SafeSearch Plus",
    "lb_mse_hide_warning": "Questo motore di ricerca è affidabile",
    "lnk_mse_install": "http:\/\/www.avira.com\/it\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "Contenuto non sicuro",
    "lb_unsafe_content_bar_warning": "Sicurezza browser Avira ha impedito il caricamento di contenuto non sicuro su questa pagina web.",
    "lb_unsafe_content_bar_ignore": "Non mostrare il messaggio in futuro",
    "lb_extension_permission_notification_extension_description": "L'estensione Sicurezza browser Avira richiede il tuo consenso per inviare ad Avira un report sulle attività sospette.",
    "lb_extension_permission_notification_extension_permission_title": "Consenti l'invio di report anonimi ad Avira se vengono rilevate attività sospette durante la navigazione.",
    "lb_extension_permission_notification_extension_permission_button": "Consenti",
    "lb_extension_permission_notification_extension_permission_no_title": "Puoi attivare in ogni momento questa funzione nelle impostazioni.",
    "lb_extension_permission_notification_extension_permission_no_button": "Non chiedere più in futuro",
    "lb_unsafe_content": "Contenuto non sicuro",
    "msg_dash_unsafe_content_details_no_exception": "Contenuto bloccato perchè non sicuro:",
    "msg_dash_unsafe_content_details_exception": "Contenuto bloccato perchè non sicuro",
    "msg_dash_unsafe_content_risk_no_exception": "Per motivi di sicurezza ti consigliamo di mantenere il contenuto bloccato.",
    "msg_dash_unsafe_content_risk_exception": "Per motivi di sicurezza ti consigliamo di bloccare il contenuto non sicuro, rimuovendo l'eccezione.",
    "lb_dash_unsafe_content_show_details": "Dettagli tecnici",
    "lb_dash_unsafe_content_hide_details": "Nascondi",
    "msg_category_unknown": "Impossibile trovare informazioni per questo sito web.",
    "msg_category_safe": "Nessuna minaccia conosciuta.",
    "msg_category_malware": "Questo è un sito di malware",
    "msg_category_malware_sub": "I siti di malware infettano il tuo dispositivo e possono contenere virus, worm, spyware e trojan.",
    "msg_category_phishing": "Questo è un sito di phishing",
    "msg_category_phishing_sub": "I siti di phishing ingannano l'utente portandolo a rivelare le informazioni personali come le password e informazioni relative al conto bancario.",
    "msg_category_spam": "Questo è un sito di spam",
    "msg_category_spam_sub": "I siti di spam ottengono l'indirizzo email dell'utente in modo da poter inviare materiale pubblicitario non richiesto.",
    "msg_category_pua": "Il download contiene applicazioni potenzialmente indesiderate",
    "msg_category_pua2": "Questo sito web distribuisce PUA",
    "msg_category_pua2_sub": "Le applicazioni potenzialmente indesiderate (PUA) contengono funzionalità o hanno effetti indesiderati dagli utenti.",
    "msg_category_mse": "Motore di ricerca non affidabile",
    "msg_category_mse_sub": "Questo motore di ricerca è sospetto poiché è risaputo che malware e applicazioni potenzialmente indesiderate vi reindirizzano il traffico.",
    "msg_category_unsafe_content": "Contenuto bloccato perchè non sicuro",
    "msg_category_unsafe_content_sub": "Le pagine web caricano un contenuto non sicuro se sono state compromesse o se il contenuto di terze parti ha subito attacchi o è intenzionalmente dannoso.",
    "msg_what_is_pua": "Cosa sono le PUA?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/it-it\/potentially-unwanted-applications",
    "lb_tab_privacy": "Privacy",
    "lb_tab_security": "Sicurezza",
    "lb_my_modes": "Modalità",
    "msg_mode_select": "Seleziona la modalità più adatta alle<br\/>tue esigenze",
    "lb_mode_safe-surfing": "Navigazione sicura",
    "lb_mode_safe-private": "Sicura e privata",
    "lb_mode_custom": "Personalizzata",
    "lb_powered_by_avira": "Powered by Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/it\/avira-scout-ftu",
    "lb_help": "Guida",
    "lnk_scout_help": "https:\/\/www.avira.com\/en\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} pubblicità e #tracker sono stati bloccati da #Sicurezza browser Avira. Scaricalo ora #gratis!",
    "lb_trackers_facebook_share": "{{ threshold }} - ecco il numero di pubblicità e tracker a cui finora Sicurezza browser Avira ha impedito di spiare le mie attività online. È gratuito e lo raccomando caldamente.",
    "lb_congratulations": "Congratulazioni!",
    "lb_trackers_blocked_count": "{{ threshold }} pubblicità e tracker bloccati!",
    "lb_trackers_milestone_subtitle": "Aiuta anche parenti e amici a proteggersi.",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/it\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/it\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Tweet",
    "lb_share": "Condividi",
    "lb_trackers": "Tracker",
    "lb_ads": "Pubblicità",
    "lb_trackers_blocked_this_page": "<span class=\"txt--orange-dark\">Tracker<\/span> bloccati su questo sito web",
    "lb_ads_blocked_this_page": "<span class=\"txt--orange\">Pubblicità<\/span> bloccate su questo sito web",
    "lb_blocked_total": "Pubblicità e tracker bloccati: <strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "Blocco della pubblicità tramite <a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a>"
}

},{}],163:[function(require,module,exports){
module.exports={
    "lb_safe_website": "安全なウェブサイト",
    "lb_unsafe_website": "安全でないウェブサイト",
    "lb_unsafe_content_website": "安全でないコンテンツ",
    "lb_mse_website": "信頼できない検索エンジン",
    "lb_trackers_blocked": "{{ domain }} の {{ count }} 件の広告およびトラッカーが<span class=\"txt--green\">ブロック<\/span>されました",
    "lb_trackers_blocked_short": "{{ count }} 件の広告およびトラッカーがブロックされました",
    "lb_trackers_block_all": "このウェブサイトでブロック",
    "lb_trackers_allow_all": "広告およびトラッカーのブロックを解除",
    "msg_no_trackers": "現在のページでは、ユーザーを追跡するトラッカーはありません。アクティブ トラッカーのあるウェブサイトを開くと、完全なリストがここに表示されます。",
    "msg_trackers_tooltip": "これらが、閲覧しているウェブサイトのトラッカーすべてです。隣のスライダーをクリックすることでトラッカーをブロックできます。スライダーが緑になると、トラッカーはブロックされ、ブラウジング アクティビティを追跡できなくなります。一部のトラッカーはデフォルトで許可されていることに注意してください。これらをブロックすると、ウェブページが正しく動作しなくなることがあります。",
    "lb_settings": "設定",
    "lb_setting_offers": "価格比較を表示",
    "lb_setting_tooltip_offers": "安全なウェブサイトのみから、ショッピングしているアイテムの、より優れたセールを表示します。",
    "lb_setting_dnt_header": "「ヘッダーを追跡しない」を送信",
    "lb_setting_tooltip_dnt_header": "ユーザーを追跡しないようにウェブサイトに通知します。要求を無視すると、ABS は依然としてトラッカーをブロックします。",
    "lb_setting_top_bar": "安全サインを表示",
    "lb_setting_block_trackers": "デフォルトでトラッカーをブロック",
    "lb_setting_tooltip_block_trackers": "デフォルトでトラッカーをブロックしてプライバシーを保護します。",
    "lb_setting_cliqz": "CLIQZ 検索",
    "lb_setting_tooltip_cliqz": "CLIQZ 検索は、ブラウザ バーの検索に移動する際にリアルタイムでウェブサイトおよび関連情報を提案します。これにより、検索が安全かつ高速になります。",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger は、スパイ広告をブロックし、隠れたトラッカーがユーザーの許可なしに秘密で追跡を行えないようにします。",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere は、通信を暗号化し、ブラウジングをより安全にします。",
    "lb_setting_inAppTracking": "匿名統計",
    "lb_setting_tooltip_inAppTracking": "匿名データを共有することで、製品向上に貢献します。",
    "lb_setting_show_advanced_controls": "その他のブラウジング コントロールを表示",
    "lb_setting_tooltip_show_advanced_controls": "Privacy Badger および HTTPS Everywhere アイコンをツールバーに表示します。",
    "lb_setting_google_services": "Google サービス",
    "lb_setting_tooltip_google_services": "Scout が Google サービスを使用できるようにし、スペルミスの修正、間違って入力された URL の修正、および悪意のあるウェブサイトのレポートを行います。この操作では、Google がユーザーのプライベート データを収集できるようになります。",
    "lb_setting_adguard": "広告およびウェブ追跡をブロック",
    "lb_setting_tooltip_adguard": "ユーザーがオンラインで監視されないようにすることでプライバシーを保護します。また、迷惑なポップアップ、ウェブ バナー、ビデオ広告などもブロックします。",
    "lb_setting_adguard_social_media": "ソーシャル メディア追跡のブロック",
    "lb_setting_tooltip_adguard_social_media": "ソーシャル メディア ボタンおよびウィジェットをウェブサイトから無効にします。そうすることで、ソーシャル ネットワークは、ユーザーがアクセスしたサイトを追跡できなくなります。",
    "lb_setting_adguard_useful_ads": "有用な広告を表示",
    "lb_setting_tooltip_adguard_useful_ads": "関連性があり、迷惑でない広告が検索結果に表示されるようにします。",
    "lb_setting_scout_help": "詳細については、<a href=\"https:\/\/www.avira.com\/en\/avira-scout-ftu\" target=\"_blank\">こちら<\/a>をクリックしてください。",
    "lb_setting_extension_scan": "拡張子の分析",
    "lb_setting_tooltip_extension_scan": "ブラウジングの際に疑わしいアクティビティが検出された場合は、匿名レポートを Avira に送信できるようにします。",
    "btn_blocking_back": "解除する",
    "lb_blocking_options": "その他のオプション",
    "lb_blocking_add_exception": "今後、このウェブサイトをブロックしない",
    "btn_blocking_continue": "継続する",
    "btn_dash_classification_cb_exception": "今後、このウェブサイトをブロックしない",
    "lb_dash_classification_exception_info_add": "例外の追加",
    "msg_dash_classification_exception_info_add": "このサイトは現在、例外リストにありません。例外を追加すると、そのアドレスを表示しようとしたときに、アドレスがブロックされなくなります。画面の上部には依然として警告が表示されます。",
    "lb_dash_classification_exception_info_remove": "例外の削除",
    "msg_dash_classification_exception_info_remove": "このサイトは現在、例外リストに記載されています。例外を削除すると、表示しようとするたびに、このアドレスがブロックされるようになります。",
    "lb_privacy": "プライバシー ポリシー",
    "lnk_privacy": "www.avira.com\/ja\/general-privacy",
    "lb_eula": "エンド ユーザー使用許諾契約書",
    "lnk_eula": "https:\/\/www.avira.com\/ja\/license-agreement-terms-of-use",
    "lb_discover_mode": "詳細を発見",
    "lb_feedback": "フィードバック",
    "lb_rate": "アプリの評価",
    "lb_dash_pua_action_cancel": "ダウンロードのキャンセル",
    "msg_mse_bar_warning": "お使いの検索エンジン設定は、改ざんされている可能性がありました。",
    "lb_mse_sse_install": "SafeSearch Plusを追加",
    "lb_mse_hide_warning": "この検索エンジンを信用します",
    "lnk_mse_install": "http:\/\/www.avira.com\/ja\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "安全でないコンテンツ",
    "lb_unsafe_content_bar_warning": "Avira Browser Safety は、このウェブページでの安全でないコンテンツの読み込みを回避しました。",
    "lb_unsafe_content_bar_ignore": "今後、メッセージを表示しない",
    "lb_extension_permission_notification_extension_description": "Avira Browser Safety 拡張子は、疑わしいアクティビティについてのレポートを Avira に送信するためにユーザーの承諾を必要としています。",
    "lb_extension_permission_notification_extension_permission_title": "ブラウジングの際に疑わしいアクティビティが検出された場合は、匿名レポートを Avira に送信できるようにします。",
    "lb_extension_permission_notification_extension_permission_button": "許可",
    "lb_extension_permission_notification_extension_permission_no_title": "この機能は、設定でいつでも有効化することができます。",
    "lb_extension_permission_notification_extension_permission_no_button": "再度質問しない",
    "lb_unsafe_content": "安全でないコンテンツ",
    "msg_dash_unsafe_content_details_no_exception": "安全でないコンテンツがブロックされました：",
    "msg_dash_unsafe_content_details_exception": "安全でないコンテンツがブロックされました",
    "msg_dash_unsafe_content_risk_no_exception": "安全のためにも、コンテンツのブロックを維持することが推奨されます。",
    "msg_dash_unsafe_content_risk_exception": "安全のためにも、例外を削除して安全でないコンテンツをブロックすることが推奨されます。",
    "lb_dash_unsafe_content_show_details": "技術詳細",
    "lb_dash_unsafe_content_hide_details": "非表示にする",
    "msg_category_unknown": "このウェブサイトに関して見つかった情報はありません。",
    "msg_category_safe": "既知の脅威はありません。",
    "msg_category_malware": "これは、マルウェア ウェブサイトです",
    "msg_category_malware_sub": "マルウェア ウェブサイトはデバイスに感染します。そして、ウイルス、ワーム、スパイウェア、およびトロイの木馬に感染させることができます。",
    "msg_category_phishing": "これはフィッシング ウェブサイトです",
    "msg_category_phishing_sub": "フィッシング ウェブサイトはユーザーを騙して、パスワードおよび銀行口座の情報などのアカウント情報を開示します。",
    "msg_category_spam": "これは、スパム ウェブサイトです",
    "msg_category_spam_sub": "スパム ウェブサイトはユーザーのメール アドレスを取得し、電子メールで広告を送信します。",
    "msg_category_pua": "ダウンロード コンテンツには、潜在的に迷惑なアプリケーションが含まれます",
    "msg_category_pua2": "このウェブサイトは、PUA を配布します",
    "msg_category_pua2_sub": "潜在的に迷惑なアプリケーション（PUA）は、ユーザーが迷惑であると感じる動作を起こしたり、このような機能を含みます。",
    "msg_category_mse": "信頼できない検索エンジン",
    "msg_category_mse_sub": "この検索エンジンは信頼できません。これは、マルウェアおよび潜在的に迷惑なアプリケーションがトラフィックをリダイレクトすることが知られているためです。",
    "msg_category_unsafe_content": "安全でないコンテンツがブロックされました",
    "msg_category_unsafe_content_sub": "危険にされされているコンテンツまたは第三者コンテンツがハッキングされたり、意図的に有害なものである場合、ウェブページは安全でないコンテンツをロードします。",
    "msg_what_is_pua": "PUA とは何か？",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/ja\/potentially-unwanted-applications",
    "lb_tab_privacy": "プライバシー",
    "lb_tab_security": "セキュリティ",
    "lb_my_modes": "モード",
    "msg_mode_select": "ニーズ<br\/>に最も適したモードを選択します",
    "lb_mode_safe-surfing": "安全なサーフィン",
    "lb_mode_safe-private": "安全かつプライベート",
    "lb_mode_custom": "カスタム",
    "lb_powered_by_avira": "Powered by Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/ja\/avira-scout-ftu",
    "lb_help": "ヘルプ",
    "lnk_scout_help": "https:\/\/www.avira.com\/ja\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} 件の広告および #trackers は #Avira Browser Safety によってブロックされました。#forfree で入手しましょう！",
    "lb_trackers_facebook_share": "{{ threshold }} - Avira Browser Safety はこれまで、これほど多くの広告およびトラッカーによる、オンライン アクティビティのスパイ行為をブロックしました。無料ですし、非常にお勧めです。",
    "lb_congratulations": "おめでとうございます!",
    "lb_trackers_blocked_count": "{{ threshold }} 件の広告およびトラッカーがブロックされました！",
    "lb_trackers_milestone_subtitle": "家族や友達も保護します。",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/ja\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/ja\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "ツィート",
    "lb_share": "共有",
    "lb_trackers": "トラッカー",
    "lb_ads": "広告",
    "lb_trackers_blocked_this_page": "このウェブサイトでブロックされた<span class=\"txt--orange-dark\">トラッカー<\/span>",
    "lb_ads_blocked_this_page": "このウェブサイトでブロックされた<span class=\"txt--orange\">広告<\/span>",
    "lb_blocked_total": "すべての広告およびトラッカーがブロックされました：<strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "<a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a>による広告ブロック"
}

},{}],164:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Veilige website",
    "lb_unsafe_website": "Onveilige website",
    "lb_unsafe_content_website": "Onveilige inhoud",
    "lb_mse_website": "Niet-vertrouwde zoekmachine",
    "lb_trackers_blocked": "{{ count }} advertenties en trackers <span class=\"txt--green\">geblokkeerd<\/span> op {{ domain }}",
    "lb_trackers_blocked_short": "{{ count }} advertenties en trackers geblokkeerd",
    "lb_trackers_block_all": "Op deze website blokkeren",
    "lb_trackers_allow_all": "Advertenties en trackers niet meer blokkeren",
    "msg_no_trackers": "Er zijn geen trackers die u volgen op de huidige pagina. Wanneer u een website met actieve trackers opent, wordt de volledige lijst hier weergegeven.",
    "msg_trackers_tooltip": "Dit zijn alle trackers op de website die u bekijkt. U kunt een tracker blokkeren door op de schuifknop ernaast te klikken. Wanneer de schuifknop groen is, is de tracker geblokkeerd en kan deze uw surfgedrag niet traceren. Let op: sommige trackers worden standaard toegelaten. De website werkt misschien niet goed als u deze blokkeert.",
    "lb_settings": "Instellingen",
    "lb_setting_offers": "Prijsvergelijkingen tonen",
    "lb_setting_tooltip_offers": "Toon betere aanbiedingen voor artikelen die u wilt kopen van alleen veilige websites.",
    "lb_setting_dnt_header": "Niet traceren-header versturen",
    "lb_setting_tooltip_dnt_header": "Laat websites weten dat u niet getraceerd wilt worden. Indien zij dit verzoek negeren, zal ABS toch alle trackers blokkeren.",
    "lb_setting_top_bar": "Beveiligingsindicator tonen",
    "lb_setting_block_trackers": "Trackers standaard blokkeren",
    "lb_setting_tooltip_block_trackers": "Bescherm uw privacy door trackers standaard te blokkeren.",
    "lb_setting_cliqz": "CLIQZ Search",
    "lb_setting_tooltip_cliqz": "CLIQZ Search geeft u suggesties voor websites met relevante informatie in realtime terwijl u uw zoekopdracht in de browserzoekbalk intypt, waardoor u veiliger en sneller kunt zoeken.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger blokkeert spionerende advertenties en voorkomt dat onzichtbare trackers u onopgemerkt volgen zonder uw toestemming.",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everyhwere versleutelt uw berichten zodat u veiliger kunt surfen.",
    "lb_setting_inAppTracking": "Anonieme statistieken",
    "lb_setting_tooltip_inAppTracking": "Help ons het product te verbeteren door anonieme data te delen.",
    "lb_setting_show_advanced_controls": "Extra instellingen voor het surfen tonen",
    "lb_setting_tooltip_show_advanced_controls": "Geeft de pictogrammen van Privacy Badger en HTTPS Everywhere weer in de werkbalk.",
    "lb_setting_google_services": "Google-diensten",
    "lb_setting_tooltip_google_services": "Geef Scout toestemming Google-diensten te gebruiken om spellingsfouten te verbeteren, verkeerd getypte URL's te corrigeren en schadelijke websites te rapporteren. Hierdoor kan Google privégegevens verzamelen.",
    "lb_setting_adguard": "Advertenties & online traceren blokkeren",
    "lb_setting_tooltip_adguard": "Beschermt uw privacy door te voorkomen dat iemand u online kan volgen. Blokkeert ook opdringerige pop-ups, banners, video-advertenties en meer.",
    "lb_setting_adguard_social_media": "Traceren via social media blokkeren",
    "lb_setting_tooltip_adguard_social_media": "Schakelt social media-knoppen en -widgets op websites uit, zodat sociale netwerken niet kunnen bijhouden welke websites u bezoekt.",
    "lb_setting_adguard_useful_ads": "Bruikbare advertenties tonen",
    "lb_setting_tooltip_adguard_useful_ads": "Hierdoor worden relevante, niet-opdringerige advertenties in uw zoekresultaten getoond.",
    "lb_setting_scout_help": "Klik <a href=\"https:\/\/www.avira.com\/en\/avira-scout-ftu\" target=\"_blank\">hier<\/a> voor meer informatie.",
    "lb_setting_extension_scan": "Extensie-analyse",
    "lb_setting_tooltip_extension_scan": "Geef toestemming een anoniem rapport naar Avira te versturen wanneer er verdachte activiteiten worden gedetecteerd tijdens het surfen.",
    "btn_blocking_back": "Haal me hier weg!",
    "lb_blocking_options": "Meer opties",
    "lb_blocking_add_exception": "Deze website nooit blokkeren",
    "btn_blocking_continue": "Toch doorgaan",
    "btn_dash_classification_cb_exception": "Deze website nooit blokkeren",
    "lb_dash_classification_exception_info_add": "Een uitzondering toevoegen",
    "msg_dash_classification_exception_info_add": "Deze site staat nu NIET op uw uitzonderingenlijst. Wanneer u een uitzondering toevoegt, wordt het adres niet geblokkeerd wanneer u deze probeert te bekijken. U blijft wel de waarschuwing boven aan het scherm zien.",
    "lb_dash_classification_exception_info_remove": "Een uitzondering verwijderen",
    "msg_dash_classification_exception_info_remove": "Deze site staat nu op uw uitzonderingenlijst. Wanneer u een uitzondering verwijdert, wordt het adres geblokkeerd wanneer u deze probeert te bekijken.",
    "lb_privacy": "Privacybeleid",
    "lnk_privacy": "https:\/\/www.avira.com\/nl\/general-privacy",
    "lb_eula": "Licentieovereenkomst voor eindgebruiker",
    "lnk_eula": "http:\/\/www.avira.com\/nl\/license-agreement-terms-of-use",
    "lb_discover_mode": "Meer ontdekken",
    "lb_feedback": "Feedback",
    "lb_rate": "App beoordelen",
    "lb_dash_pua_action_cancel": "Download annuleren",
    "msg_mse_bar_warning": "De instellingen van uw zoekmachine zijn mogelijk ongewenst veranderd.",
    "lb_mse_sse_install": "SafeSearch Plus toevoegen",
    "lb_mse_hide_warning": "Ik vertrouw deze zoekmachine",
    "lnk_mse_install": "https:\/\/www.avira.com\/en\/avira-safesearch",
    "msg_blocked_iframe_replacement": "Onveilige inhoud",
    "lb_unsafe_content_bar_warning": "Avira Browser Safety voorkwam dat er onveilige inhoud op deze webpagina werd geladen.",
    "lb_unsafe_content_bar_ignore": "Dit bericht niet meer tonen",
    "lb_extension_permission_notification_extension_description": "De Avira Browser Safety-extensie heeft uw toestemming nodig om een rapport over verdachte activiteiten naar Avira te versturen.",
    "lb_extension_permission_notification_extension_permission_title": "Geef toestemming een anoniem rapport naar Avira te versturen wanneer er verdachte activiteiten worden gedetecteerd tijdens het surfen.",
    "lb_extension_permission_notification_extension_permission_button": "Toestaan",
    "lb_extension_permission_notification_extension_permission_no_title": "U kunt deze functie op ieder moment inschakelen bij Instellingen.",
    "lb_extension_permission_notification_extension_permission_no_button": "Niet meer vragen",
    "lb_unsafe_content": "Onveilige inhoud",
    "msg_dash_unsafe_content_details_no_exception": "Onveilige inhoud geblokkeerd:",
    "msg_dash_unsafe_content_details_exception": "Onveilige inhoud geblokkeerd",
    "msg_dash_unsafe_content_risk_no_exception": "Voor veiligheidsredenen wordt u aangeraden de inhoud te blijven blokkeren.",
    "msg_dash_unsafe_content_risk_exception": "Voor veiligheidsredenen wordt u aangeraden de onveilige inhoud te blokkeren door de uitzondering te verwijderen.",
    "lb_dash_unsafe_content_show_details": "Technische details",
    "lb_dash_unsafe_content_hide_details": "Verbergen",
    "msg_category_unknown": "Er is geen informatie voor deze website gevonden.",
    "msg_category_safe": "Geen bekende dreigingen.",
    "msg_category_malware": "Dit is een malwarewebsite",
    "msg_category_malware_sub": "Malwarewebsites besmetten uw apparaat en kunnen virussen, wormen, spyware en Trojaanse paarden bevatten.",
    "msg_category_phishing": "Dit is een phishingwebsite",
    "msg_category_phishing_sub": "Phishingwebsites misleiden u om persoonlijke informatie bekend te maken zoals wachtwoorden en bankrekeninginformatie.",
    "msg_category_spam": "Dit is een spamwebsite",
    "msg_category_spam_sub": "Spamwebsites bemachtigen uw e-mailadres om u via e-mail advertenties te sturen.",
    "msg_category_pua": "De download bevat Potentieel Ongewilde Toepassingen",
    "msg_category_pua2": "Deze website verspreidt PUA's",
    "msg_category_pua2_sub": "Potentieel Ongewilde Toepassingen (PUA's) tonen gedrag of bevatten functies die door gebruikers als ongewenst worden beschouwd.",
    "msg_category_mse": "Niet-vertrouwde zoekmachine",
    "msg_category_mse_sub": "Deze zoekmachine is niet vertrouwd omdat het bekend is dat malware en Potentieel Ongewilde Toepassingen er verkeer naar omleiden.",
    "msg_category_unsafe_content": "Onveilige inhoud geblokkeerd",
    "msg_category_unsafe_content_sub": "Webpagina's laden onveilige inhoud als deze gecompromitteerd zijn of inhoud van derden gehackt of doelbewust schadelijk is.",
    "msg_what_is_pua": "Wat is een PUA?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/en\/potentially-unwanted-applications",
    "lb_tab_privacy": "Privacy",
    "lb_tab_security": "Beveiliging",
    "lb_my_modes": "Modi",
    "msg_mode_select": "Selecteer de modus die het beste past<br\/>bij uw behoeften",
    "lb_mode_safe-surfing": "Veilig surfen",
    "lb_mode_safe-private": "Veilig en privé",
    "lb_mode_custom": "Aangepast",
    "lb_powered_by_avira": "Aangeboden door Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/en\/avira-scout-ftu",
    "lb_help": "Help",
    "lnk_scout_help": "https:\/\/www.avira.com\/en\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} advertenties en #trackers werden geblokkeerd door #Avira Browser Safety. Krijg de uwe nu #gratis!",
    "lb_trackers_facebook_share": "{{ threshold }} - Zoveel advertenties en trackers heeft Avira Browser Safety tot nu toe gestopt met het bespioneren van mijn activiteiten online. Het is gratis en ik kan het zeer aanbevelen.",
    "lb_congratulations": "Gefeliciteerd!",
    "lb_trackers_blocked_count": "{{ threshold }} advertenties en trackers geblokkeerd!",
    "lb_trackers_milestone_subtitle": "Help uw familie en vrienden ook te beschermen.",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/en\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/en\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Tweeten",
    "lb_share": "Delen",
    "lb_trackers": "Trackers",
    "lb_ads": "Advertenties",
    "lb_trackers_blocked_this_page": "<span class=\"txt--orange-dark\">Trackers<\/span> op deze website geblokkeerd",
    "lb_ads_blocked_this_page": "<span class=\"txt--orange\">Advertenties<\/span> op deze website geblokkeerd",
    "lb_blocked_total": "Alle advertenties en trackers geblokkeerd: <strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "Advertenties blokkeren met <a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a>"
}

},{}],165:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Bezpieczna strona",
    "lb_unsafe_website": "Niebezpieczna strona",
    "lb_unsafe_content_website": "Niebezpieczna treść",
    "lb_mse_website": "Niezaufana wyszukiwarka",
    "lb_trackers_blocked": "<span class=\"txt--green\">Zablokowano<\/span> {{ count }} reklam(y) i trackery(-ów) na {{ domain }}",
    "lb_trackers_blocked_short": "Zablokowano {{ count }} reklamy i trackery zablokowane",
    "lb_trackers_block_all": "Blokuj na tej stronie",
    "lb_trackers_allow_all": "Odblokuj reklamy i trackery",
    "msg_no_trackers": "Brak trackerów śledzących Cię na tej stronie. Jeśli otworzysz stronę z aktywnymi trackerami, tutaj wyświetli się ich kompletna lista.",
    "msg_trackers_tooltip": "To są wszystkie trackery na przeglądanej teraz stronie. Tracker możesz zablokować, klikając suwak obok niego. Zielony slider oznacza zablokowanie trackera, nie może on teraz śledzić, które strony przeglądasz. Uwaga: niektóre trackery są dozwolone domyślnie. Ich zablokowanie może doprowadzić do nieprawidłowego funkcjonowania strony.",
    "lb_settings": "Ustawienia",
    "lb_setting_offers": "Pokaż porównania cen",
    "lb_setting_tooltip_offers": "Pokaż lepsze oferty na poszukiwane artykuły, tylko z bezpiecznych stron.",
    "lb_setting_dnt_header": "Wyślij nagłówek Nie śledź mnie",
    "lb_setting_tooltip_dnt_header": "Informuj strony, że nie życzysz sobie śledzenia. Nawet jeśli zignorują to żądanie, ABS nadal blokuje trackery.",
    "lb_setting_top_bar": "Pokaż wskaźnik bezpieczeństwa",
    "lb_setting_block_trackers": "Blokuj trackery domyślnie",
    "lb_setting_tooltip_block_trackers": "Chroń swoją prywatność, blokując trackery domyślnie.",
    "lb_setting_cliqz": "Wyszukiwanie CLIQZ",
    "lb_setting_tooltip_cliqz": "Wyszukiwanie CLIQZ sugeruje strony internetowe i odpowiednie informacje w czasie rzeczywistym podczas wprowadzania terminu wyszukiwania w pasku przeglądarki, co umożliwia szybsze i bezpieczniejsze wyszukiwanie.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger blokuje reklamy szpiegujące i zapobiega utajnionemu śledzeniu Cię przez niewidoczne trackery bez Twojej zgody.",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere szyfruje Twoją komunikację i sprawia, że przeglądanie stron jest bardziej bezpieczne.",
    "lb_setting_inAppTracking": "Statystyka anonimowa",
    "lb_setting_tooltip_inAppTracking": "Pomóż nam ulepszyć produkt, udostępniając nam anonimowe dane.",
    "lb_setting_show_advanced_controls": "Pokaż dodatkowe funkcje kontrolne przeglądania",
    "lb_setting_tooltip_show_advanced_controls": "Wyświetla ikonki Privacy Badger oraz HTTPS Everywhere na pasku narzędziowym.",
    "lb_setting_google_services": "Usługi Google",
    "lb_setting_tooltip_google_services": "Pozwala przeglądarce Scout na korzystanie z usług Google w celu poprawiania błędów w pisowni, korygowania błędnie wpisanych adresów URL oraz zgłaszania stron złośliwych. Pozwoli to Google na gromadzenie Twoich prywatnych danych.",
    "lb_setting_adguard": "Zablokuj reklamy i śledzenie stron",
    "lb_setting_tooltip_adguard": "Chroni Twoją prywatność poprzez niedopuszczanie do monitorowania Cię online. Blokuje także nachalne wyskakujące okienka, banery, reklamy wideo i inne.",
    "lb_setting_adguard_social_media": "Zablokuj śledzenie mediów społecznościowych",
    "lb_setting_tooltip_adguard_social_media": "Wyłącza przyciski mediów społecznościowych i widgety ze stron, przez co sieci społecznościowe nie mogą śledzić, które strony odwiedzasz.",
    "lb_setting_adguard_useful_ads": "Pokaż przydatne reklamy",
    "lb_setting_tooltip_adguard_useful_ads": "Pozwala na istotne, nienachalne reklamy w wynikach wyszukiwania.",
    "lb_setting_scout_help": "Więcej informacji znajdziesz <a href=\"https:\/\/www.avira.com\/en\/avira-scout-ftu\" target=\"_blank\">tutaj<\/a>.",
    "lb_setting_extension_scan": "Analiza rozszerzeń",
    "lb_setting_tooltip_extension_scan": "Pozwól wysłać anonimowy raport do Avira, jeśli podczas przeglądania wystąpi podejrzana aktywność.",
    "btn_blocking_back": "Zabierz mnie stąd!",
    "lb_blocking_options": "Więcej opcji",
    "lb_blocking_add_exception": "Nigdy nie blokuj tej strony",
    "btn_blocking_continue": "Kontynuuj mimo to",
    "btn_dash_classification_cb_exception": "Nigdy nie blokuj tej strony",
    "lb_dash_classification_exception_info_add": "Dodawanie wyjątku",
    "msg_dash_classification_exception_info_add": "Ta strona obecnie NIE znajduje się na liście wyjątków. Kiedy dodasz wyjątek, adres nie będzie blokowany przy próbie jego przeglądania. Na górze ekranu nadal będzie wyświetlane ostrzeżenie.",
    "lb_dash_classification_exception_info_remove": "Usuwanie wyjątku",
    "msg_dash_classification_exception_info_remove": "Ta strona obecnie znajduje się na liście wyjątków. Jeśli usuniesz wyjątek, adres będzie blokowany przy każdej próbie jego otwarcia.",
    "lb_privacy": "Zasady ochrony prywatności",
    "lnk_privacy": "https:\/\/www.avira.com\/pl\/general-privacy",
    "lb_eula": "Umowa Licencyjna Użytkownika Końcowego",
    "lnk_eula": "https:\/\/www.avira.com\/en\/license-agreement-terms-of-use",
    "lb_discover_mode": "Odkryj więcej",
    "lb_feedback": "Opinia",
    "lb_rate": "Oceń aplikację",
    "lb_dash_pua_action_cancel": "Anuluj pobieranie",
    "msg_mse_bar_warning": "Być może manipulowano przy Twoich ustawieniach wyszukiwarki.",
    "lb_mse_sse_install": "Dodaj SafeSearch Plus",
    "lb_mse_hide_warning": "Mam zaufanie do tej wyszukiwarki",
    "lnk_mse_install": "http:\/\/www.avira.com\/en\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "Niebezpieczna treść",
    "lb_unsafe_content_bar_warning": "Rozszerzenie Avira Browser Safety zapobiegło załadowaniu się niebezpiecznych treści na tej stronie.",
    "lb_unsafe_content_bar_ignore": "Nie pokazuj tej wiadomości ponownie",
    "lb_extension_permission_notification_extension_description": "Avira Browser Safety potrzebuje Twojej zgody na przesłanie Avira raportu o podejrzanych aktywnościach.",
    "lb_extension_permission_notification_extension_permission_title": "Pozwól wysłać anonimowy raport do Avira, jeśli podczas przeglądania wystąpi podejrzana aktywność.",
    "lb_extension_permission_notification_extension_permission_button": "Zezwól",
    "lb_extension_permission_notification_extension_permission_no_title": "Funkcję tę można w dowolnym czasie włączyć w ustawieniach.",
    "lb_extension_permission_notification_extension_permission_no_button": "Nie pytaj ponownie",
    "lb_unsafe_content": "Niebezpieczna treść",
    "msg_dash_unsafe_content_details_no_exception": "Zablokowano niebezpieczną treść:",
    "msg_dash_unsafe_content_details_exception": "Zablokowano niebezpieczną treść",
    "msg_dash_unsafe_content_risk_no_exception": "Ze względów bezpieczeństwa zaleca się utrzymanie blokady treści.",
    "msg_dash_unsafe_content_risk_exception": "Ze względów bezpieczeństwa zaleca się zablokowanie niebezpiecznej treści poprzez usunięcie wyjątku.",
    "lb_dash_unsafe_content_show_details": "Szczegóły techniczne",
    "lb_dash_unsafe_content_hide_details": "Ukryj",
    "msg_category_unknown": "Nie znaleziono informacji dla tej strony.",
    "msg_category_safe": "Brak znanych zagrożeń.",
    "msg_category_malware": "To jest strona z malware",
    "msg_category_malware_sub": "Strony z malware infekują Twoje urządzenie i mogą zawierać wirusy, robaki, spyware i konie trojańskie.",
    "msg_category_phishing": "To jest strona wyłudzająca informacje",
    "msg_category_phishing_sub": "Strony wyłudzające informacje próbują wyłudzić podstępem Twoje informacje osobiste, takie jak hasła i numery kont bankowych.",
    "msg_category_spam": "To jest strona spamowa",
    "msg_category_spam_sub": "Strony spamowe uzyskują Twój adres e-mail, by później wysyłać Ci reklamy.",
    "msg_category_pua": "Plik do pobrania zawiera potencjalnie niechciane aplikacje",
    "msg_category_pua2": "Ta strona rozpowszechnia PUA",
    "msg_category_pua2_sub": "Potencjalnie niechciane aplikacje (PUA) wykazują zachowanie lub zawierają elementy uznane przez użytkowników za niepożądane.",
    "msg_category_mse": "Niezaufana wyszukiwarka",
    "msg_category_mse_sub": "Ta wyszukiwarka jest niezaufana, ponieważ wiadomo, że PUA i złośliwe oprogramowanie przekierowują na nią ruch sieciowy.",
    "msg_category_unsafe_content": "Zablokowano niebezpieczną treść",
    "msg_category_unsafe_content_sub": "Strony ładują niebezpieczne treści, jeśli treści zagrożone lub zewnętrzne zostały zhakowane lub są celowo szkodliwe.",
    "msg_what_is_pua": "Co to jest PUA?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/en\/potentially-unwanted-applications",
    "lb_tab_privacy": "Prywatność",
    "lb_tab_security": "Bezpieczeństwo",
    "lb_my_modes": "Tryby",
    "msg_mode_select": "Wybierz tryb odpowiadający<br\/>Twoim potrzebom",
    "lb_mode_safe-surfing": "Bezpieczne surfowanie",
    "lb_mode_safe-private": "Bezpieczeństwo i prywatność",
    "lb_mode_custom": "Niestandardowy",
    "lb_powered_by_avira": "Powered by Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/en\/avira-scout-ftu",
    "lb_help": "Pomoc",
    "lnk_scout_help": "https:\/\/www.avira.com\/en\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "Zablokowano {{ threshold }} reklam(y) i #trackery(-ów) dzięki #Avira Browser Safety. Uzyskaj teraz #zadarmo!",
    "lb_trackers_facebook_share": "{{ threshold }} - tyle reklam i trackerów zablokowało rozszerzenie Avira Browser Safety, nie dopuszczając do szpiegowania moich aktywności online. Jest bezpłatne i szczerze je polecam.",
    "lb_congratulations": "Gratulujemy!",
    "lb_trackers_blocked_count": "Zablokowano {{ threshold }} reklam(y) i trackery(-ów)!",
    "lb_trackers_milestone_subtitle": "Pomóż chronić też swoich krewnych i znajomych.",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/pl\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/pl\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Tweet",
    "lb_share": "Udostępnij",
    "lb_trackers": "Trackery",
    "lb_ads": "Reklamy",
    "lb_trackers_blocked_this_page": "<span class=\"txt--orange-dark\">Trackery<\/span> zablokowane na tej stronie",
    "lb_ads_blocked_this_page": "<span class=\"txt--orange\">Reklamy<\/span> zablokowane na tej stronie",
    "lb_blocked_total": "Łącznie zablokowanych reklam i trackerów: <strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "Blokowanie reklam przez <a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a>"
}

},{}],166:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Site seguro",
    "lb_unsafe_website": "Site inseguro",
    "lb_unsafe_content_website": "Conteúdos inseguros",
    "lb_mse_website": "Mecanismo de pesquisa não confiável",
    "lb_trackers_blocked": "{{ count }} anúncios e rastreadores <span class=\"txt--green\">bloqueados<\/span> em {{ domain }}",
    "lb_trackers_blocked_short": "{{ count }} anúncios e rastreadores bloqueados",
    "lb_trackers_block_all": "Bloqueios neste site",
    "lb_trackers_allow_all": "Desbloquear anúncios e rastreadores",
    "msg_no_trackers": "Não existem quaisquer rastreadores seguindo você na página atual. Se você abrir um site com rastreadores ativos, a lista completa será exibida aqui.",
    "msg_trackers_tooltip": "Estes são todos os rastreadores no site que você está visualizando. Você pode bloquear um rastreador clicando no controle deslizante que se encontra ao lado. Se um controle deslizante estiver verde, esse rastreador encontra-se bloqueado e não consegue rastrear sua atividade de navegação. Observe que alguns rastreadores são permitidos por padrão. Bloqueá-los poderá prejudicar o funcionamento da página web.",
    "lb_settings": "Configurações",
    "lb_setting_offers": "Exibir comparações de preços",
    "lb_setting_tooltip_offers": "Exibir negócios melhores para os itens que você está comprando somente de sites seguros.",
    "lb_setting_dnt_header": "Enviar cabeçalho Do Not Track",
    "lb_setting_tooltip_dnt_header": "Informe os sites de que não devem rastrear você. Se ignorarem o pedido, a Segurança do navegador Avira ainda bloqueia todos os rastreadores.",
    "lb_setting_top_bar": "Mostrar indicador de segurança",
    "lb_setting_block_trackers": "Bloquear rastreadores por padrão",
    "lb_setting_tooltip_block_trackers": "Proteja sua privacidade bloqueando rastreadores por padrão.",
    "lb_setting_cliqz": "Mecanismo de pesquisa CLIQZ",
    "lb_setting_tooltip_cliqz": "O mecanismo de pesquisa CLIQZ sugere a você sites e informações importantes em tempo real, enquanto você digita sua pesquisa na barra de navegação, permitindo que você pesquise de forma mais segura e rápida.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "O Privacy Badger bloqueia anúncios de espionagem e previne que rastreadores invisíveis o rastreiem secretamente, sem sua permissão.",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "O HTTPS Everywhere criptografa suas comunicações e torna sua navegação mais segura.",
    "lb_setting_inAppTracking": "Estatísticas anônimas",
    "lb_setting_tooltip_inAppTracking": "Ajude-nos a melhorar o produto, compartilhando dados anônimos.",
    "lb_setting_show_advanced_controls": "Controles de navegação extra",
    "lb_setting_tooltip_show_advanced_controls": "Exibe ícones de Privacy Badger e HTTPS Everywhere na barra de ferramentas.",
    "lb_setting_google_services": "Google Services",
    "lb_setting_tooltip_google_services": "Permita que o Scout use o Google Services para corrigir erros ortográficos, corrigir URLs digitadas de forma errada e relatar sites maliciosos. Isso possibilitará que o Google colete seus dados privados.",
    "lb_setting_adguard": "Bloquear anúncios e rastreamento da web",
    "lb_setting_tooltip_adguard": "Protege sua privacidade impedindo que qualquer pessoa possa monitorá-lo online. Também bloqueia pop-ups intrusivos, banners da web, anúncios em vídeo e outros.",
    "lb_setting_adguard_social_media": "Bloquear rastreamento de mídia social",
    "lb_setting_tooltip_adguard_social_media": "Desativa botões de mídias sociais e widgets de sites, para que as redes sociais não possam fazer o rastreamento dos sites que você visitar.",
    "lb_setting_adguard_useful_ads": "Mostrar anúncios úteis",
    "lb_setting_tooltip_adguard_useful_ads": "Permite que anúncios relevantes e não intrusivos sejam mostrados nos resultados da pesquisa.",
    "lb_setting_scout_help": "Para mais detalhes, clique <a href=\"https:\/\/www.avira.com\/pt-br\/avira-scout-ftu\" target=\"_blank\">aqui<\/a>.",
    "lb_setting_extension_scan": "Análise de extensões",
    "lb_setting_tooltip_extension_scan": "Permite enviar um relatório anônimo à Avira se atividades suspeitas forem detectadas durante a navegação.",
    "btn_blocking_back": "Tire-me daqui!",
    "lb_blocking_options": "Mais opções",
    "lb_blocking_add_exception": "Nunca bloquear este site",
    "btn_blocking_continue": "Continuar mesmo assim",
    "btn_dash_classification_cb_exception": "Nunca bloquear este site",
    "lb_dash_classification_exception_info_add": "Adicionando uma exceção",
    "msg_dash_classification_exception_info_add": "Este site NÃO está atualmente em sua lista de exceções. Quando você adiciona uma exceção, o endereço não será bloqueado ao tentar visualizá-lo. Você ainda verá a advertência na parte superior da tela.",
    "lb_dash_classification_exception_info_remove": "Removendo uma exceção",
    "msg_dash_classification_exception_info_remove": "Este site está atualmente em sua lista de exceções. Se remover a exceção, o endereço será bloqueado sempre que você tentar exibi-lo.",
    "lb_privacy": "Política de privacidade",
    "lnk_privacy": "https:\/\/www.avira.com\/pt-br\/general-privacy",
    "lb_eula": "Contrato de Licença de Usuário Final",
    "lnk_eula": "https:\/\/www.avira.com\/pt-br\/license-agreement-terms-of-use",
    "lb_discover_mode": "Descubra mais",
    "lb_feedback": "Comentários",
    "lb_rate": "Classificar aplicativo",
    "lb_dash_pua_action_cancel": "Cancelar download",
    "msg_mse_bar_warning": "Suas configurações de motor de busca podem ter sido alteradas.",
    "lb_mse_sse_install": "Adicionar SafeSearch Plus",
    "lb_mse_hide_warning": "Eu confio nesse mecanismo de pesquisa",
    "lnk_mse_install": "http:\/\/www.avira.com\/pt-br\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "Conteúdos inseguros",
    "lb_unsafe_content_bar_warning": "A Segurança do navegador Avira impediu o carregamento de conteúdos inseguros nessa página da Web.",
    "lb_unsafe_content_bar_ignore": "Não exibir essa mensagem novamente.",
    "lb_extension_permission_notification_extension_description": "A extensão de Segurança do navegador Avira precisa de sua aprovação para enviar-nos um relatório sobre atividades suspeitas.",
    "lb_extension_permission_notification_extension_permission_title": "Permite enviar um relatório anônimo à Avira se atividades suspeitas forem detectadas durante a navegação.",
    "lb_extension_permission_notification_extension_permission_button": "Permitir",
    "lb_extension_permission_notification_extension_permission_no_title": "Você pode ativar este recurso a qualquer momento nas configurações.",
    "lb_extension_permission_notification_extension_permission_no_button": "Não perguntar novamente",
    "lb_unsafe_content": "Conteúdos inseguros",
    "msg_dash_unsafe_content_details_no_exception": "Conteúdos inseguros bloqueados:",
    "msg_dash_unsafe_content_details_exception": "Conteúdos inseguros bloqueados",
    "msg_dash_unsafe_content_risk_no_exception": "Para sua segurança, é recomendável manter os conteúdos bloqueados.",
    "msg_dash_unsafe_content_risk_exception": "Para sua segurança, é recomendável remover a exceção e bloquear os conteúdos inseguros.",
    "lb_dash_unsafe_content_show_details": "Detalhes técnicos",
    "lb_dash_unsafe_content_hide_details": "Ocultar",
    "msg_category_unknown": "Não existem informações sobre este site.",
    "msg_category_safe": "Nenhuma ameaça conhecida.",
    "msg_category_malware": "Esse é um site de malware",
    "msg_category_malware_sub": "Os sites de malware infetam seu dispositivo e podem incluir vírus, worms, spyware e Cavalos de Troia.",
    "msg_category_phishing": "Esse é um site de phishing",
    "msg_category_phishing_sub": "Os sites de phishing induzem o usuário a revelar suas informações pessoais, tais como senhas e informações de contas bancárias.",
    "msg_category_spam": "Esse é um site de spam",
    "msg_category_spam_sub": "Os sites de spam capturam o seu endereço de email para enviar publicidade por email.",
    "msg_category_pua": "O download contém aplicativos potencialmente indesejados",
    "msg_category_pua2": "Esse site distribui PUA",
    "msg_category_pua2_sub": "Os aplicativos potencialmente indesejados (PUA) exibem um comportamento ou contêm recursos considerados indesejados pelos usuários.",
    "msg_category_mse": "Mecanismo de pesquisa não confiável",
    "msg_category_mse_sub": "Esse mecanismo de pesquisa é visto com desconfiança por o malware e os aplicativos potencialmente indesejados serem conhecidos por redirecionar tráfego.",
    "msg_category_unsafe_content": "Conteúdos inseguros bloqueados",
    "msg_category_unsafe_content_sub": "As páginas da Web carregam conteúdos inseguros se os conteúdos comprometidos ou de terceiros forem atacados por hackers ou forem intencionalmente nocivos.",
    "msg_what_is_pua": "O que são PUA?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/pt\/potentially-unwanted-applications",
    "lb_tab_privacy": "Privacidade",
    "lb_tab_security": "Segurança",
    "lb_my_modes": "Modos",
    "msg_mode_select": "Selecione o modo que melhor atende<br\/>suas necessidades",
    "lb_mode_safe-surfing": "Navegação segura",
    "lb_mode_safe-private": "Seguro e privado",
    "lb_mode_custom": "Personalizado",
    "lb_powered_by_avira": "Desenvolvido pela Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/pt-br\/avira-scout-ftu",
    "lb_help": "Ajuda",
    "lnk_scout_help": "https:\/\/www.avira.com\/en\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} anúncios e #rastreadores foram bloqueados pelo Segurança do navegador #Avira. Obtenha o seu agora #gratuitamente!",
    "lb_trackers_facebook_share": "{{ threshold }} - número de anúncios e rastreadores que o Segurança do navegador Avira impediu de espionar minhas atividades online até agora. É gratuito e altamente recomendável.",
    "lb_congratulations": "Parabéns!",
    "lb_trackers_blocked_count": "{{ threshold }} anúncios e rastreadores bloqueados!",
    "lb_trackers_milestone_subtitle": "Ajude a proteger sua família e amigos também.",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/pt-br\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/pt-br\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Tweet",
    "lb_share": "Compartilhar",
    "lb_trackers": "Rastreadores",
    "lb_ads": "Anúncios",
    "lb_trackers_blocked_this_page": "<span class=\"txt--orange-dark\">Rastreadores<\/span> bloqueados neste site",
    "lb_ads_blocked_this_page": "<span class=\"txt--orange\">Anúncios<\/span> bloqueados neste site",
    "lb_blocked_total": "Total de anúncios e rastreadores bloqueados: <strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "Anúncio bloqueado por <a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a>"
}

},{}],167:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Надежный веб-сайт",
    "lb_unsafe_website": "Ненадежный веб-сайт",
    "lb_unsafe_content_website": "Небезопасное содержимое",
    "lb_mse_website": "Ненадежная поисковая система",
    "lb_trackers_blocked": "<span class=\"txt--green\">Заблокировано<\/span> рекламных объявлений и программ отслеживания на {{ domain }}: {{ count }}",
    "lb_trackers_blocked_short": "Заблокировано рекламных объявлений и программ отслеживания: {{ count }}",
    "lb_trackers_block_all": "Заблокировать на этом веб-сайте",
    "lb_trackers_allow_all": "Разблокировать все рекламные объявления и программы отслеживания",
    "msg_no_trackers": "На данной странице нет программ отслеживания. При открытии веб-сайта с активными программами отслеживания их полный список будет показан здесь.",
    "msg_trackers_tooltip": "Это все программы отслеживания на текущем веб-сайте. Для блокировки программы отслеживания нажмите на ползунок рядом с ним. Если ползунок отображается зеленым, то программа заблокирована и не может отслеживать ваши действия. Обратите внимание, что по умолчанию некоторые программы отслеживания разблокированы. Их блокировка может привести к некорректной работе веб-страницы.",
    "lb_settings": "Настройки",
    "lb_setting_offers": "Показать сравнение цен",
    "lb_setting_tooltip_offers": "Показывать более выгодные цены на товары, которые вы ищете, только с надежных веб-сайтов.",
    "lb_setting_dnt_header": "Отправить заголовок «Не отслеживать»",
    "lb_setting_tooltip_dnt_header": "Запрашивать отключение отслеживания на веб-сайтах. Если сайты игнорируют запрос, веб-фильтр Avira все равно блокирует все программы отслеживания.",
    "lb_setting_top_bar": "Показать индикатор безопасности",
    "lb_setting_block_trackers": "Блокировать программы отслеживания по умолчанию",
    "lb_setting_tooltip_block_trackers": "Защитите свои персональные данные, блокируя программы отслеживания по умолчанию.",
    "lb_setting_cliqz": "Поиск CLIQZ",
    "lb_setting_tooltip_cliqz": "Поиск CLIQZ предлагает вам веб-сайты и релевантную информацию в реальном времени при введении данных в строку браузера, что делает поиск быстрее и безопаснее.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger блокирует шпионскую рекламу и предотвращает отслеживание ваших действий невидимыми программами отслеживания.",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere обеспечивает шифрование вашей переписки и повышает вашу безопасность онлайн.",
    "lb_setting_inAppTracking": "Анонимная статистика",
    "lb_setting_tooltip_inAppTracking": "Помогите нам улучшить продукт, предоставив анонимные данные.",
    "lb_setting_show_advanced_controls": "Больше возможностей просмотра",
    "lb_setting_tooltip_show_advanced_controls": "Показать на панели значки Privacy Badger и HTTPS Everywhere.",
    "lb_setting_google_services": "Службы Google",
    "lb_setting_tooltip_google_services": "Разрешите приложению Scout использовать службы Google для исправления орфографических ошибок и опечаток в URL-адресах, а также для уведомления о вредоносных веб-сайтах. При этом Google получит доступ к вашим персональным данным.",
    "lb_setting_adguard": "Заблокировать рекламные объявления и программы отслеживания в Интернете",
    "lb_setting_tooltip_adguard": "Защищает вашу конфиденциальность, предотвращая несанкционированное наблюдение за вашими действиями в Интернете. Кроме того, блокирует назойливые всплывающие окна, веб-баннеры, рекламные видеоролики и другие нежелательные объявления.",
    "lb_setting_adguard_social_media": "Заблокировать программы отслеживания в социальных сетях",
    "lb_setting_tooltip_adguard_social_media": "Отключает кнопки и виджеты социальных сетей на веб-сайтах, благодаря чему социальные сети не могут следить за тем, какие веб-сайты вы посещаете.",
    "lb_setting_adguard_useful_ads": "Показывать полезные рекламные объявления",
    "lb_setting_tooltip_adguard_useful_ads": "Отображает релевантные рекламные объявления в результатах поиска.",
    "lb_setting_scout_help": "Дополнительные сведения см. <a href=\"https:\/\/www.avira.com\/ru\/avira-scout-ftu\" target=\"_blank\">здесь<\/a>.",
    "lb_setting_extension_scan": "Анализ расширений",
    "lb_setting_tooltip_extension_scan": "Включите для отправки специалистам Avira анонимных отчетов при обнаружении подозрительной деятельности в ходе просмотра веб-страниц.",
    "btn_blocking_back": "Уходим отсюда!",
    "lb_blocking_options": "Дополнительные опции",
    "lb_blocking_add_exception": "Никогда не блокировать этот веб-сайт",
    "btn_blocking_continue": "Все равно продолжить",
    "btn_dash_classification_cb_exception": "Никогда не блокировать этот веб-сайт",
    "lb_dash_classification_exception_info_add": "Добавление исключения",
    "msg_dash_classification_exception_info_add": "Этот сайт НЕ включен в ваш список исключений. После добавления исключения этот веб-сайт не будет блокироваться при попытке перехода на него. В верхней части экрана будет отображаться предупреждение.",
    "lb_dash_classification_exception_info_remove": "Удаление исключения",
    "msg_dash_classification_exception_info_remove": "Этот сайт включен в ваш список исключений. После удаления исключения этот веб-сайт будет блокироваться при попытке перехода на него.",
    "lb_privacy": "Политика конфиденциальности",
    "lnk_privacy": "https:\/\/www.avira.com\/ru\/general-privacy",
    "lb_eula": "Лицензионное соглашение с конечным пользователем",
    "lnk_eula": "https:\/\/www.avira.com\/ru\/license-agreement-terms-of-use",
    "lb_discover_mode": "Узнать больше",
    "lb_feedback": "Обратная связь",
    "lb_rate": "Оценить приложение",
    "lb_dash_pua_action_cancel": "Отменить загрузку",
    "msg_mse_bar_warning": "Возможно, ваши настройки поиска были изменены.",
    "lb_mse_sse_install": "Установить SafeSearch Plus",
    "lb_mse_hide_warning": "Я доверяю этой поисковой системе",
    "lnk_mse_install": "http:\/\/www.avira.com\/ru\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "Небезопасное содержимое",
    "lb_unsafe_content_bar_warning": "Веб-фильтр Avira предотвратил загрузку небезопасного содержимого на этой веб-странице.",
    "lb_unsafe_content_bar_ignore": "Больше не показывать это сообщение",
    "lb_extension_permission_notification_extension_description": "Веб-фильтру Avira требуется разрешение на отправку специалистам Avira отчетов о подозрительной деятельности.",
    "lb_extension_permission_notification_extension_permission_title": "Включите для отправки специалистам Avira анонимных отчетов при обнаружении подозрительной деятельности в ходе просмотра веб-страниц.",
    "lb_extension_permission_notification_extension_permission_button": "Разрешить",
    "lb_extension_permission_notification_extension_permission_no_title": "Эту возможность можно в любой момент включить в разделе настроек.",
    "lb_extension_permission_notification_extension_permission_no_button": "Больше не спрашивать",
    "lb_unsafe_content": "Небезопасное содержимое",
    "msg_dash_unsafe_content_details_no_exception": "Небезопасное содержимое заблокировано:",
    "msg_dash_unsafe_content_details_exception": "Небезопасное содержимое заблокировано",
    "msg_dash_unsafe_content_risk_no_exception": "Рекомендуем для вашей безопасности оставить это содержимое заблокированным.",
    "msg_dash_unsafe_content_risk_exception": "Рекомендуем для вашей безопасности заблокировать небезопасное содержимое, удалив исключение.",
    "lb_dash_unsafe_content_show_details": "Технические подробности",
    "lb_dash_unsafe_content_hide_details": "Скрыть",
    "msg_category_unknown": "Информация об этом веб-сайте не найдена.",
    "msg_category_safe": "Известных угроз нет.",
    "msg_category_malware": "Это вредоносный веб-сайт",
    "msg_category_malware_sub": "Вредоносные веб-сайты могут заразить ваше устройство с помощью вирусов, червей, шпионского ПО и троянов.",
    "msg_category_phishing": "Это фишинговый веб-сайт",
    "msg_category_phishing_sub": "Фишинговые веб-сайты обманом получают от вас конфиденциальную информацию (например, пароли и номера банковских счетов).",
    "msg_category_spam": "Это спам-сайт",
    "msg_category_spam_sub": "Спам-сайты крадут ваш адрес электронной почты и используют его для нежелательных рассылок.",
    "msg_category_pua": "Загрузка содержит потенциально нежелательные приложения",
    "msg_category_pua2": "Этот веб-сайт распространяет потенциально нежелательные приложения",
    "msg_category_pua2_sub": "Потенциально нежелательные приложения выполняют действия или содержат функции, воспринимаемые пользователями как нежелательные.",
    "msg_category_mse": "Ненадежная поисковая система",
    "msg_category_mse_sub": "Эта поисковая система не является надежной, поскольку потенциально нежелательные приложения перенаправляют на нее трафик.",
    "msg_category_unsafe_content": "Небезопасное содержимое заблокировано",
    "msg_category_unsafe_content_sub": "Веб-страницы могут стать небезопасными после взлома или могут содержать вредоносные сторонние материалы.",
    "msg_what_is_pua": "Что такое потенциально нежелательные приложения?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/ru\/potentially-unwanted-applications",
    "lb_tab_privacy": "Конфиденциальность",
    "lb_tab_security": "Безопасность",
    "lb_my_modes": "Режимы",
    "msg_mode_select": "Выберите наиболее подходящий<br\/> режим",
    "lb_mode_safe-surfing": "Безопасный просмотр",
    "lb_mode_safe-private": "Безопасность и конфиденциальность",
    "lb_mode_custom": "Пользователь",
    "lb_powered_by_avira": "Технологии Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/ru\/avira-scout-ftu",
    "lb_help": "Справка",
    "lnk_scout_help": "https:\/\/www.avira.com\/en\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} — столько рекламных объявлений и программ #отслеживания заблокировано Веб-фильтром #Avira. Установите #бесплатно прямо сейчас!",
    "lb_trackers_facebook_share": "{{ threshold }} — столько рекламных объявлений и программ отслеживания уже заблокировал Веб-фильтр Avira, предотвратив слежку за моими действиями в Интернете. Это очень эффективное средство — и абсолютно бесплатное.",
    "lb_congratulations": "Поздравляем!",
    "lb_trackers_blocked_count": "Заблокировано рекламных объявлений и программ отслеживания: {{ threshold }}.",
    "lb_trackers_milestone_subtitle": "Помогите друзьям и близким тоже защитить свою конфиденциальность.",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/ru\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/ru\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Твитнуть",
    "lb_share": "Поделиться",
    "lb_trackers": "Программы отслеживания",
    "lb_ads": "Реклама",
    "lb_trackers_blocked_this_page": "<span class=\"txt--orange-dark\">Программы отслеживания<\/span>, заблокированные на этом веб-сайте",
    "lb_ads_blocked_this_page": "<span class=\"txt--orange\">Рекламные объявления<\/span>, заблокированные на этом веб-сайте",
    "lb_blocked_total": "Всего заблокировано рекламных объявлений и программ отслеживания: <strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "Блокировщик рекламы <a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a>"
}

},{}],168:[function(require,module,exports){
module.exports={
    "lb_safe_website": "Güvenli web sitesi",
    "lb_unsafe_website": "Güvensiz web sitesi",
    "lb_unsafe_content_website": "Güvensiz içerik",
    "lb_mse_website": "Güvenilmez Arama Motoru",
    "lb_trackers_blocked": "{{ count }} reklam ve takipçi {{ domain }} üzerinde <span class=\"txt--green\">engellendi<\/span>",
    "lb_trackers_blocked_short": "{{ count }} reklam ve takipçi engellendi",
    "lb_trackers_block_all": "Bu web sitesinde engelle",
    "lb_trackers_allow_all": "Reklam ve takipçi engelini kaldır",
    "msg_no_trackers": "Geçerli sayfada sizi izleyen takipçi yok. Etkin takipçilerin olduğu bir web sitesini açarsanız listenin tamamı burada gösterilir.",
    "msg_trackers_tooltip": "Bunlar izlemekte olduğunuz web sitesindeki takipçilerin tümü. Bir takipçiyi yanındaki kaydırıcıya tıklayarak engelleyebilirsiniz. Kaydırıcı yeşilse takipçi engellenmiştir ve tarama etkinliğinizi izleyemez. Not edin, bazı takipçilere varsayılan olarak izin verilir. Bunları engellemek web sitesinin doğru çalışmamasıyla sonuçlanabilir.",
    "lb_settings": "Ayarlar",
    "lb_setting_offers": "Fiyat karşılaştırmaları göster",
    "lb_setting_tooltip_offers": "Alışveriş yaptığınız ürünler için sadece güvenli web sitelerindeki indirimleri göster.",
    "lb_setting_dnt_header": "İzlememe başlığı gönder",
    "lb_setting_tooltip_dnt_header": "Web sitelerine sizi izlememelerini bildirir. Bu isteği yok sayarlarsa, ABS yine de takipçileri engeller.",
    "lb_setting_top_bar": "Güvenlik göstergesini belirt",
    "lb_setting_block_trackers": "Takipçileri varsayılan olarak engelle",
    "lb_setting_tooltip_block_trackers": "Takipçileri varsayılan olarak engelleyin ve gizliliğinizi koruyun.",
    "lb_setting_cliqz": "CLIQZ Arama",
    "lb_setting_tooltip_cliqz": "CLIQZ Arama, siz tarayıcı çubuğuna arama bilgisi girerken gerçek zamanlı olarak web siteleri ve anlamlı bilgi önerir, bu da size daha güvenli ve hızlı arama olanağı verir.",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger casus reklamların ve görünmez takipçilerin, izniniz olmadan sizi gizlice takip etmesini engeller.",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere iletişiminizi şifreler ve tarama etkinliğinizi daha güvenli kılar.",
    "lb_setting_inAppTracking": "Anonim İstatistikler",
    "lb_setting_tooltip_inAppTracking": "Bizimle anonim veri paylaşarak ürün geliştirmeye yardımcı olun.",
    "lb_setting_show_advanced_controls": "Ekstra tarama denetimlerini göster",
    "lb_setting_tooltip_show_advanced_controls": "Araç çubuğunda Privacy Badger ve HTTPS Everywhere simgelerini görüntüler.",
    "lb_setting_google_services": "Google Hizmetleri",
    "lb_setting_tooltip_google_services": "Scout Google hizmetleri kullanarak yazım hataları ve yanlış URL'leri düzeltsin ve zararlı web sitelerini bildirsin. Bu Google'ın özel verilerinizi toplamasına izin verir.",
    "lb_setting_adguard": "Reklamları ve web izlemeyi engelle",
    "lb_setting_tooltip_adguard": "Sizi çevrimiçi izleyen herkesi durdurarak gizliliğinizi korur. Açılır pencere, web başlıkları, video reklamlar ve diğerlerini de engeller.",
    "lb_setting_adguard_social_media": "Sosyal medya izlemeyi engelle",
    "lb_setting_tooltip_adguard_social_media": "Web sitelerindeki sosyal medya düğmeleri ve pencere öğelerini devre dışı bırakır ve sosyal ağların gittiğiniz siteleri izlemesini engeller.",
    "lb_setting_adguard_useful_ads": "Yararlı reklamları göster",
    "lb_setting_tooltip_adguard_useful_ads": "Arama sonuçlarında ilgili ve saldırgan olmayan reklamlara izin verir.",
    "lb_setting_scout_help": "Ayrıntılar için <a href=\"https:\/\/www.avira.com\/en\/avira-scout-ftu\" target=\"_blank\">buraya<\/a> tıkla.",
    "lb_setting_extension_scan": "Uzantı Analizi",
    "lb_setting_tooltip_extension_scan": "Tarama sırasında şüpheli etkinlik algılanırsa Avira'ya anonim rapor göndermek için etkinleştir.",
    "btn_blocking_back": "Beni uzaklaştır!",
    "lb_blocking_options": "Daha fazla seçenek",
    "lb_blocking_add_exception": "Bu siteyi asla engelleme",
    "btn_blocking_continue": "Yine de devam et",
    "btn_dash_classification_cb_exception": "Bu siteyi asla engelleme",
    "lb_dash_classification_exception_info_add": "Özel durum ekleniyor",
    "msg_dash_classification_exception_info_add": "Bu web sitesi geçerli özel durum listenizde YOK. Bir özel durum eklediğinizde, adresi görüntülemek istediğinizde adres engellenmez. Uyarıyı ekranın üstünde yine de görürsünüz.",
    "lb_dash_classification_exception_info_remove": "Özel durumu kaldırma",
    "msg_dash_classification_exception_info_remove": "Bu web sitesi geçerli özel durum listenizde var. Özel durumu kaldırdığınızda, adres her görüntülemek istediğinizde engellenir.",
    "lb_privacy": "Gizlilik ilkesi",
    "lnk_privacy": "https:\/\/www.avira.com\/en\/general-privacy",
    "lb_eula": "Son Kullanıcı Lisans Sözleşmesi",
    "lnk_eula": "https:\/\/www.avira.com\/en\/license-agreement-terms-of-use",
    "lb_discover_mode": "Daha fazlasını keşfedin",
    "lb_feedback": "Geribildirim",
    "lb_rate": "Uygulamayı derecelendir",
    "lb_dash_pua_action_cancel": "Karşıdan yüklemeyi iptal et",
    "msg_mse_bar_warning": "Arama motoru ayarlarınız kurcalanmış olabilir.",
    "lb_mse_sse_install": "SafeSearch Plus ekle",
    "lb_mse_hide_warning": "Bu arama motoruna güveniyorum",
    "lnk_mse_install": "http:\/\/www.avira.com\/en\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "Güvensiz içerik",
    "lb_unsafe_content_bar_warning": "Avira Browser Safety bu web sayfasındaki güvenli olmayan içeriğin yüklenmesini önledi.",
    "lb_unsafe_content_bar_ignore": "İletiyi yeniden gösterme",
    "lb_extension_permission_notification_extension_description": "Avira Browser Safety Uzantısı Avira'ya şüpheli etkinlik raporu göndermek için onayınıza gerek duyuyor.",
    "lb_extension_permission_notification_extension_permission_title": "Tarama sırasında şüpheli etkinlik algılanırsa Avira'ya anonim rapor göndermek için etkinleştir.",
    "lb_extension_permission_notification_extension_permission_button": "İzin ver",
    "lb_extension_permission_notification_extension_permission_no_title": "Bu özelliği ayarlardan istediğiniz zaman etkinleştirin.",
    "lb_extension_permission_notification_extension_permission_no_button": "Tekrar sorma",
    "lb_unsafe_content": "Güvensiz İçerik",
    "msg_dash_unsafe_content_details_no_exception": "Güvensiz içerik engellendi:",
    "msg_dash_unsafe_content_details_exception": "Güvensiz içerik engellendi",
    "msg_dash_unsafe_content_risk_no_exception": "Güvenliğiniz için bu içeriği engellemeniz önerilir.",
    "msg_dash_unsafe_content_risk_exception": "Güvenliğiniz için güvenli olmayan içeriği özel durumu kaldırarak engellemeniz önerilir.",
    "lb_dash_unsafe_content_show_details": "Teknik ayrıntılar",
    "lb_dash_unsafe_content_hide_details": "Gizle",
    "msg_category_unknown": "Bu web sitesi için hiçbir bilgi bulunamadı.",
    "msg_category_safe": "Bilinen bir tehdit yok.",
    "msg_category_malware": "Bu bir zararlı yazılım web sitesi",
    "msg_category_malware_sub": "Zararlı yazılım siteleri aygıtınıza bulaşır ve virüs, solucan, casus yazılım ve Truva atı içerebilir.",
    "msg_category_phishing": "Bu bir kimlik avı web sitesi",
    "msg_category_phishing_sub": "Kimlik avı web siteleri parola ve banka bilgileri gibi kişisel bilgilerinizi açıklamanız için sizi kandırır.",
    "msg_category_spam": "Bu bir istenmeyen posta web sitesi",
    "msg_category_spam_sub": "İstenmeyen posta siteleri e-posta adresinizi ele geçirip istemediğiniz reklamlar gönderir.",
    "msg_category_pua": "Karşıdan yükleme İstenmeyebilecek Uygulamalar içeriyor",
    "msg_category_pua2": "Bu web sitesi PUA dağıtıyor",
    "msg_category_pua2_sub": "İstenmeyebilecek Uygulamalar (PUA'lar) kullanıcının istemediği şekilde davranır veya bu türde özellikler içerir.",
    "msg_category_mse": "Güvenilmez arama motoru",
    "msg_category_mse_sub": "Bu arama motoruna güvenilmez çünkü zararlı yazılımların ve İstenmeyebilecek Uygulamaların buraya trafik yönlendirdiği biliniyor.",
    "msg_category_unsafe_content": "Güvensiz içerik engellendi",
    "msg_category_unsafe_content_sub": "Web sayfaları bozuksa veya üçüncü taraf içerik kırıldıysa veya bilerek zararlıysa güvenilmez içerik yükler.",
    "msg_what_is_pua": "PUA nedir?",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/en\/potentially-unwanted-applications",
    "lb_tab_privacy": "Gizlilik",
    "lb_tab_security": "Güvenlik",
    "lb_my_modes": "Modlar",
    "msg_mode_select": "Gereksinimi en iyi karşılayan<br\/>modu seçin",
    "lb_mode_safe-surfing": "Güvenli Gezinmeler",
    "lb_mode_safe-private": "Güvenli ve Özel",
    "lb_mode_custom": "Özel",
    "lb_powered_by_avira": "Powered by Avira",
    "lnk_scout_landing": "https:\/\/www.avira.com\/en\/avira-scout-ftu",
    "lb_help": "Yardım",
    "lnk_scout_help": "https:\/\/www.avira.com\/en\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "{{ threshold }} reklam ve #takipçi #Avira Browser Safety tarafından engellendi. Siz de #ücretsiz edinin!",
    "lb_trackers_facebook_share": "{{ threshold }} - şimdiye kadar çevrimiçi etkinliğimi izleyen ve Avira Browser Safety'nin engellediği reklam ve takipçi sayısı. Ücretsiz ve heyecanla öneririm.",
    "lb_congratulations": "Tebrikler!",
    "lb_trackers_blocked_count": "{{ threshold }} reklam ve takipçi engellendi!",
    "lb_trackers_milestone_subtitle": "Aile ve arkadaşlarınızı da korumaya yardımcı olun.",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/en\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/en\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "Tweet",
    "lb_share": "Paylaş",
    "lb_trackers": "Takipçiler",
    "lb_ads": "Reklamlar",
    "lb_trackers_blocked_this_page": "Bu sitede engellenen <span class=\"txt--orange-dark\">takipçiler<\/span>",
    "lb_ads_blocked_this_page": "Bu sitede engellenen <span class=\"txt--orange\">reklamlar<\/span>",
    "lb_blocked_total": "Engellenen toplam reklam ve takipçi: <strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "<a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a> ile reklam engelleme"
}

},{}],169:[function(require,module,exports){
module.exports={
    "lb_safe_website": "安全网站",
    "lb_unsafe_website": "不安全网站",
    "lb_unsafe_content_website": "不安全内容",
    "lb_mse_website": "不受信任的搜索引擎",
    "lb_trackers_blocked": "在 {{ domain }} 上<span class=\"txt--green\">阻止了<\/span> {{ count }} 个广告和追踪器",
    "lb_trackers_blocked_short": "阻止了 {{ count }} 个广告和追踪器",
    "lb_trackers_block_all": "在此网站上阻止",
    "lb_trackers_allow_all": "解除对广告和追踪器的阻止",
    "msg_no_trackers": "当前页面上没有追踪器对您进行跟踪。如果您打开一个有动态追踪器的网站，则会在此处显示完整列表。",
    "msg_trackers_tooltip": "这些是您正在查看的网站上的所有追踪器。您可以通过点击旁边的滑块来阻止追踪器。当滑块显示为绿色时，该追踪器被阻止，无法跟踪您的浏览活动。请注意，有些追踪器默认为允许使用。阻止它们可能会导致网页无法正常工作。",
    "lb_settings": "设置",
    "lb_setting_offers": "显示价格比较",
    "lb_setting_tooltip_offers": "为您购买的商品仅显示安全网站中的更佳优惠。",
    "lb_setting_dnt_header": "发送“不要跟踪头文件”",
    "lb_setting_tooltip_dnt_header": "通知网站不对您进行跟踪。如果它们忽略这个请求，Avira 浏览器安全仍然会阻止任何追踪器。",
    "lb_setting_top_bar": "显示安全指标",
    "lb_setting_block_trackers": "默认情况下阻止追踪器",
    "lb_setting_tooltip_block_trackers": "通过默认阻止追踪器来保护您的隐私。",
    "lb_setting_cliqz": "CLIQZ 搜索",
    "lb_setting_tooltip_cliqz": "当您在浏览器栏中输入您的搜索时，CLIQZ 搜索会实时显示您的网站和相关信息，这使您可以更安全、更快地搜索。",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger 阻止间谍广告，并防止隐形追踪器未经您的许可秘密跟踪您。",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere 对您的通信进行加密，使您更安全地浏览。",
    "lb_setting_inAppTracking": "匿名统计数据",
    "lb_setting_tooltip_inAppTracking": "通过分享匿名数据帮助我们改进产品。",
    "lb_setting_show_advanced_controls": "显示其他浏览控件",
    "lb_setting_tooltip_show_advanced_controls": "在工具栏显示 Privacy Badger 和 HTTPS Everywhere 图标。",
    "lb_setting_google_services": "Google 服务",
    "lb_setting_tooltip_google_services": "允许 Scout 使用 Google 服务修复拼写错误、改正输入错误的 URL 并报告恶意网站。这将允许 Google 收集您的私有数据。",
    "lb_setting_adguard": "阻止广告和网站跟踪",
    "lb_setting_tooltip_adguard": "通过阻止任何人对您进行在线监视，从而保护您的隐私。也可以阻止入侵式弹出窗口、网页横幅、视频广告等。",
    "lb_setting_adguard_social_media": "阻止社交媒体跟踪",
    "lb_setting_tooltip_adguard_social_media": "禁用网站上的社交媒体按钮和插件，这样社交网络就无法跟踪您访问的网站。",
    "lb_setting_adguard_useful_ads": "显示有用的广告",
    "lb_setting_tooltip_adguard_useful_ads": "允许在您的搜索结果中显示相关的非入侵式广告。",
    "lb_setting_scout_help": "单击<a href=\"https:\/\/www.avira.com\/en\/avira-scout-ftu\" target=\"_blank\">此处<\/a>了解更多详细信息。",
    "lb_setting_extension_scan": "扩展名分析",
    "lb_setting_tooltip_extension_scan": "如果在浏览过程中检测到可疑活动，则可以向 Avira 发送匿名报告。",
    "btn_blocking_back": "退出此网页！",
    "lb_blocking_options": "更多选项",
    "lb_blocking_add_exception": "永远不阻止此网站",
    "btn_blocking_continue": "仍然继续",
    "btn_dash_classification_cb_exception": "永远不阻止此网站",
    "lb_dash_classification_exception_info_add": "添加例外",
    "msg_dash_classification_exception_info_add": "该网站目前不在您的例外列表中。添加一个例外后，该地址在您尝试查看时不会被阻止。您仍然会在屏幕上方看到警告。",
    "lb_dash_classification_exception_info_remove": "删除例外",
    "msg_dash_classification_exception_info_remove": "该网站目前在您的例外列表中。如果您删除了这个例外，那么该地址将在每次您试图查看时被阻止。",
    "lb_privacy": "隐私政策",
    "lnk_privacy": "https:\/\/www.avira.com\/zh-cn\/general-privacy",
    "lb_eula": "最终用户许可协议",
    "lnk_eula": "https:\/\/www.avira.com\/zh-cn\/license-agreement-terms-of-use",
    "lb_discover_mode": "发现更多",
    "lb_feedback": "反馈",
    "lb_rate": "评价应用程序",
    "lb_dash_pua_action_cancel": "取消下载",
    "msg_mse_bar_warning": "您的搜索引擎设置可能被篡改。",
    "lb_mse_sse_install": "添加安全搜索增强版",
    "lb_mse_hide_warning": "信任此搜索引擎",
    "lnk_mse_install": "http:\/\/www.avira.com\/zh-cn\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "不安全内容",
    "lb_unsafe_content_bar_warning": "Avira 浏览器安全防止在此网页上加载不安全的内容。",
    "lb_unsafe_content_bar_ignore": "不再显示消息",
    "lb_extension_permission_notification_extension_description": "Avira 浏览器安全扩展需要您的批准才能向 Avira 发送有关可疑活动的报告。",
    "lb_extension_permission_notification_extension_permission_title": "如果在浏览过程中检测到可疑活动，则可以向 Avira 发送匿名报告。",
    "lb_extension_permission_notification_extension_permission_button": "允许",
    "lb_extension_permission_notification_extension_permission_no_title": "您可以随时在设置中启用这个功能。",
    "lb_extension_permission_notification_extension_permission_no_button": "不再询问",
    "lb_unsafe_content": "不安全内容",
    "msg_dash_unsafe_content_details_no_exception": "已阻止的不安全内容：",
    "msg_dash_unsafe_content_details_exception": "已阻止的不安全内容",
    "msg_dash_unsafe_content_risk_no_exception": "为了安全起见，建议您阻止此内容。",
    "msg_dash_unsafe_content_risk_exception": "为了安全起见，建议您通过删除例外来阻止不安全内容。",
    "lb_dash_unsafe_content_show_details": "技术详细信息",
    "lb_dash_unsafe_content_hide_details": "隐藏",
    "msg_category_unknown": "未找到有关该网站的信息。",
    "msg_category_safe": "没有已知威胁。",
    "msg_category_malware": "这是一个恶意软件网站",
    "msg_category_malware_sub": "恶意软件网站会感染您的设备并可能包含病毒、蠕虫、间谍软件和特洛伊木马。",
    "msg_category_phishing": "这是一个网络钓鱼网站",
    "msg_category_phishing_sub": "网络钓鱼网站会欺骗您透露个人信息（例如密码和银行帐户信息）。",
    "msg_category_spam": "这是一个垃圾邮件网站",
    "msg_category_spam_sub": "垃圾邮件网站会获取您的电子邮件地址，从而通过电子邮件向您发送广告。",
    "msg_category_pua": "下载包含可能有害的应用程序",
    "msg_category_pua2": "此网站散布着可能有害的应用程序",
    "msg_category_pua2_sub": "可能有害的应用程序 (PUA) 表现出对用户有害的行为或包含对用户有害的功能。",
    "msg_category_mse": "不受信任的搜索引擎",
    "msg_category_mse_sub": "此搜索引擎不可信，因为恶意软件和可能有害的应用程序会将流量重定向到该搜索引擎。",
    "msg_category_unsafe_content": "已阻止的不安全内容",
    "msg_category_unsafe_content_sub": "如果泄漏的内容或第三方内容被非法侵入或有意造成危害，则网页会加载不安全的内容。",
    "msg_what_is_pua": "什么是可能有害的应用程序？",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/zh-cn\/potentially-unwanted-applications",
    "lb_tab_privacy": "隐私",
    "lb_tab_security": "安全性",
    "lb_my_modes": "模式",
    "msg_mode_select": "选择最符合<br\/>您需求的模式",
    "lb_mode_safe-surfing": "安全畅游网络世界",
    "lb_mode_safe-private": "安全和个人",
    "lb_mode_custom": "自定义",
    "lb_powered_by_avira": "Avira 提供技术支持",
    "lnk_scout_landing": "https:\/\/www.avira.com\/zh-cn\/avira-scout-ftu",
    "lb_help": "帮助",
    "lnk_scout_help": "https:\/\/www.avira.com\/zh-cn\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "#Avira 浏览器安全阻止了 {{ threshold }} 广告和 #追踪器。现在 #免费获取您的 Avira 浏览器安全！",
    "lb_trackers_facebook_share": "{{ threshold }} - 这就是迄今为止 Avira 浏览器安全已阻止监视我的在线活动的广告和追踪器数量。它是免费的，我强烈推荐它。",
    "lb_congratulations": "祝贺您！",
    "lb_trackers_blocked_count": "阻止了 {{ threshold }} 个广告和追踪器！",
    "lb_trackers_milestone_subtitle": "同样有助于保护你的家人和朋友。",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/zh-cn\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/zh-cn\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "信息",
    "lb_share": "分享",
    "lb_trackers": "追踪器",
    "lb_ads": "广告",
    "lb_trackers_blocked_this_page": "此网站上阻止的<span class=\"txt--orange-dark\">追踪器<\/span>",
    "lb_ads_blocked_this_page": "此网站上阻止的<span class=\"txt--orange\">广告<\/span>",
    "lb_blocked_total": "阻止的全部广告和追踪器：<strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "通过 <a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a> 阻止广告"
}

},{}],170:[function(require,module,exports){
module.exports={
    "lb_safe_website": "安全的網站",
    "lb_unsafe_website": "不安全的網站",
    "lb_unsafe_content_website": "不安全的內容",
    "lb_mse_website": "不可信任的搜尋引擎",
    "lb_trackers_blocked": "已在 {{ domain }} <span class=\"txt--green\">封鎖<\/span> {{ count }} 個廣告和追蹤器",
    "lb_trackers_blocked_short": "已封鎖 {{ count }} 個廣告和追蹤器",
    "lb_trackers_block_all": "在此網站封鎖",
    "lb_trackers_allow_all": "取消封鎖廣告和追蹤器",
    "msg_no_trackers": "目前網頁沒有任何追蹤器追蹤您。如果您開啟有作用中追蹤器的網站，這裡將顯示完整的清單。",
    "msg_trackers_tooltip": "這些是您正在檢視的網頁上全部的追蹤器。您可以按一下追蹤器旁邊的滑桿來封鎖追蹤器。滑桿呈現綠色時，表示已封鎖該追蹤器，無法追蹤您的瀏覽活動。請注意，預設允許部分追蹤器。封鎖這些可能導致網頁無法正常運作。",
    "lb_settings": "設定",
    "lb_setting_offers": "顯示價格比較",
    "lb_setting_tooltip_offers": "對於您要購買的 â€“ 顯示完全來自安全網站的產品優惠價格。",
    "lb_setting_dnt_header": "傳送「不要追蹤」標頭",
    "lb_setting_tooltip_dnt_header": "通知網站不應該追蹤您。如果網站忽視該項要求，Avira 瀏覽器安全性仍會封鎖任何追蹤器。",
    "lb_setting_top_bar": "顯示安全指示器",
    "lb_setting_block_trackers": "預設封鎖追蹤器",
    "lb_setting_tooltip_block_trackers": "預設封鎖追蹤器保護您的隱私權。",
    "lb_setting_cliqz": "CLIQZ Search",
    "lb_setting_tooltip_cliqz": "您在瀏覽器列中輸入搜尋時，CLIQZ Search 會即時建議網站和相關資訊，達到搜尋更快速安全的效果。",
    "lb_setting_privacy_badger": "Privacy Badger",
    "lb_setting_tooltip_privacy_badger": "Privacy Badger 會封鎖間諜廣告，並避免隱藏的追蹤器在未經您許可的情況下秘密追蹤您。",
    "lb_setting_https_everywhere": "HTTPS Everywhere",
    "lb_setting_tooltip_https_everywhere": "HTTPS Everywhere 會將您的通訊加密，讓您的瀏覽更安全。",
    "lb_setting_inAppTracking": "Anonymous Statistics",
    "lb_setting_tooltip_inAppTracking": "透過分享匿名資料的方式協助我們改善產品。",
    "lb_setting_show_advanced_controls": "顯示其他瀏覽控制",
    "lb_setting_tooltip_show_advanced_controls": "在工具列中顯示 Privacy Badger 和 HTTPS Everywhere 圖示。",
    "lb_setting_google_services": "Google 服務",
    "lb_setting_tooltip_google_services": "允許 Scout 使用 Google 服務改正拼字錯誤、修正錯誤輸入的 URL，並回報惡意網站。這能夠讓 Google 收集您的個人資料。",
    "lb_setting_adguard": "封鎖廣告和網站追蹤",
    "lb_setting_tooltip_adguard": "阻止任何人在線上監控您，保護您的隱私權。也封鎖干擾的快顯視窗、網頁橫幅、視訊廣告等等。",
    "lb_setting_adguard_social_media": "封鎖社交媒體追蹤",
    "lb_setting_tooltip_adguard_social_media": "停用網站的社交媒體按鈕和 Widget，以免社交網路追蹤您造訪的網站。",
    "lb_setting_adguard_useful_ads": "顯示有用的廣告",
    "lb_setting_tooltip_adguard_useful_ads": "允許有關聯、不造成干擾的廣告出現在您的搜尋結果中。",
    "lb_setting_scout_help": "按一下<a href=\"https:\/\/www.avira.com\/en\/avira-scout-ftu\" target=\"_blank\">這裡<\/a>以取得詳細資料。",
    "lb_setting_extension_scan": "Extensions Analysis",
    "lb_setting_tooltip_extension_scan": "啟用後若在瀏覽時偵測到可疑的活動，會將匿名報告傳送到 Avira。",
    "btn_blocking_back": "帶我離開",
    "lb_blocking_options": "更多選項",
    "lb_blocking_add_exception": "不封鎖此網站",
    "btn_blocking_continue": "仍然繼續",
    "btn_dash_classification_cb_exception": "不封鎖此網站",
    "lb_dash_classification_exception_info_add": "新增例外",
    "msg_dash_classification_exception_info_add": "此網站目前不在您的例外清單中。您新增例外時，則不會在您檢視網站時封鎖該網址。您仍然會看見畫面頂端出現警告。",
    "lb_dash_classification_exception_info_remove": "移除例外",
    "msg_dash_classification_exception_info_remove": "此網站目前在您的例外清單中。如果您移除例外，則每次您嘗試檢視網站時，將封鎖該網址。",
    "lb_privacy": "隱私權政策",
    "lnk_privacy": "https:\/\/www.avira.com\/zh-tw\/general-privacy",
    "lb_eula": "使用者授權合約",
    "lnk_eula": "https:\/\/www.avira.com\/zh-tw\/license-agreement-terms-of-use",
    "lb_discover_mode": "發現更多",
    "lb_feedback": "意見回應",
    "lb_rate": "評比應用程式",
    "lb_dash_pua_action_cancel": "取消下載",
    "msg_mse_bar_warning": "您的搜尋引擎設定可能遭竄改。",
    "lb_mse_sse_install": "新增 Avira 安全搜尋增強版",
    "lb_mse_hide_warning": "信任此搜尋引擎",
    "lnk_mse_install": "http:\/\/www.avira.com\/zh-tw\/avira-safesearch-plus",
    "msg_blocked_iframe_replacement": "不安全的內容",
    "lb_unsafe_content_bar_warning": "Avira 瀏覽器安全性可防止此網頁載入不安全的內容。",
    "lb_unsafe_content_bar_ignore": "不要再顯示訊息",
    "lb_extension_permission_notification_extension_description": "Avira 瀏覽器安全性擴充需要您核准，才會將關於可疑活動的報告傳送到 Avira。",
    "lb_extension_permission_notification_extension_permission_title": "啟用後若在瀏覽時偵測到可疑的活動，會將匿名報告傳送到 Avira。",
    "lb_extension_permission_notification_extension_permission_button": "允許",
    "lb_extension_permission_notification_extension_permission_no_title": "您可以隨時在設定中啟用此功能。",
    "lb_extension_permission_notification_extension_permission_no_button": "不要再詢問",
    "lb_unsafe_content": "不安全的內容",
    "msg_dash_unsafe_content_details_no_exception": "已封鎖不安全的內容：",
    "msg_dash_unsafe_content_details_exception": "已封鎖不安全的內容",
    "msg_dash_unsafe_content_risk_no_exception": "基於安全考量，建議您持續封鎖內容。",
    "msg_dash_unsafe_content_risk_exception": "基於安全考量，建議您移除例外來封鎖不安全的內容。",
    "lb_dash_unsafe_content_show_details": "技術詳細資料",
    "lb_dash_unsafe_content_hide_details": "隱藏",
    "msg_category_unknown": "找不到此網站的資訊。",
    "msg_category_safe": "無已知的威脅。",
    "msg_category_malware": "這是惡意網站",
    "msg_category_malware_sub": "惡意網站將感染您的裝置，而且可能包含病毒、蠕蟲、間諜軟體和特洛伊木馬程式。",
    "msg_category_phishing": "這是網路釣魚網站",
    "msg_category_phishing_sub": "網路釣魚網站會誘騙您透露您的個人資訊，例如密碼和銀行帳戶的資訊。",
    "msg_category_spam": "這是垃圾郵件網站",
    "msg_category_spam_sub": "垃圾郵件網站會擷取您的電子郵件地址，藉以透過電子郵件寄送廣告給您。",
    "msg_category_pua": "下載包含可能不想要的應用程式",
    "msg_category_pua2": "此網站散發可能不想要的應用程式",
    "msg_category_pua2_sub": "這些可能不想要的應用程式 (PUA) 呈現的運作方式或包含的功能是使用者不想要的。",
    "msg_category_mse": "不可信任的搜尋引擎",
    "msg_category_mse_sub": "此搜尋引擎不可信任，因為已知惡意程式碼和可能不想要的應用程式將流量重新導向到此搜尋引擎。",
    "msg_category_unsafe_content": "已封鎖不安全的內容",
    "msg_category_unsafe_content_sub": "如果遭破壞的內容或第三方內容受入侵或可能有害，網頁將載入不安全的內容。",
    "msg_what_is_pua": "什麼是 PUA？",
    "lnk_what_is_pua": "https:\/\/www.avira.com\/zh-tw\/potentially-unwanted-applications",
    "lb_tab_privacy": "隱私權",
    "lb_tab_security": "資訊安全",
    "lb_my_modes": "模式",
    "msg_mode_select": "選取最符合<br\/>您需求的模式",
    "lb_mode_safe-surfing": "安全的隨意瀏覽",
    "lb_mode_safe-private": "安全隱密",
    "lb_mode_custom": "自訂",
    "lb_powered_by_avira": "採用 Avira 技術",
    "lnk_scout_landing": "https:\/\/www.avira.com\/zh-tw\/avira-scout-ftu",
    "lb_help": "說明",
    "lnk_scout_help": "https:\/\/www.avira.com\/zh-tw\/support-answers?selfHelp%5Bkeyword%5D=scout&selfHelp%5Bcategory%5D=answers",
    "lnk_abs_landing": "http:\/\/www.avira.com\/abs-ftu",
    "lb_trackers_twitter_share": "#Avira Browser Safety 已封鎖 {{ threshold }} 個廣告和#追蹤器。立即#免費取得！",
    "lb_trackers_facebook_share": "{{ threshold }} - Avira 瀏覽器安全性到目前為止已經封鎖這麼多廣告和追蹤器以免它們窺視我的線上活動。這完全免費，我強烈推薦使用。",
    "lb_congratulations": "恭喜!",
    "lb_trackers_blocked_count": "已封鎖 {{ threshold }} 個廣告和追蹤器！",
    "lb_trackers_milestone_subtitle": "也保護您的家人和朋友。",
    "lb_tracker_notification_share_url_twitter": "http:\/\/www.avira.com\/zh-tw\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Twitter",
    "lb_tracker_notification_share_url_facebook": "http:\/\/www.avira.com\/zh-tw\/avira-browser-safety?x-a-source=ABSSocial&x-a-medium=Facebook",
    "lb_tweet": "推文",
    "lb_share": "分享",
    "lb_trackers": "追蹤器",
    "lb_ads": "廣告",
    "lb_trackers_blocked_this_page": "已在此網站封鎖<span class=\"txt--orange-dark\">追蹤器<\/span>",
    "lb_ads_blocked_this_page": "已在此網站封鎖<span class=\"txt--orange\">廣告<\/span>",
    "lb_blocked_total": "已封鎖全部的廣告和追蹤器：<strong>{{ countTotal }}<\/strong>",
    "lb_adblocking_credits": "<a href=\"https:\/\/adguard.com\/?aid=27248\" target=\"_blank\">Adguard<\/a> 的廣告封鎖"
}

},{}],171:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * Helperclass to retrieve the browser / local-language settings
 */
var Locale =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(Locale, null, [{
    key: "initClass",
    value: function initClass() {
      this.prototype.KEY = 'LOCALE';
    } // locale can be used in both bg and cs, so parametrized config and messenger is required

  }]);

  function Locale(config, messenger) {
    (0, _classCallCheck2.default)(this, Locale);
    this.config = config;
    this.messenger = messenger;
  } // retrieves a possible override from "locale.html"


  (0, _createClass2.default)(Locale, [{
    key: "retrieve",
    value: function retrieve(callback) {
      var _this = this;

      return this.messenger.publish('bgStorage', {
        get: this.KEY
      }, function (language) {
        return callback(_this._getFallback(language || _this.getBrowserLocale()));
      });
    }
  }, {
    key: "store",
    value: function store(language) {
      return this.messenger.publish('bgStorage', language ? {
        set: this.KEY,
        value: this._getFallback(language)
      } : {
        remove: this.KEY
      });
    }
  }, {
    key: "getCurrentFallback",
    value: function getCurrentFallback() {
      return this._getFallback(this.getBrowserLocale());
    } // relies on the following fallback format: "{de: 'de-DE', ...}"

  }, {
    key: "_getFallback",
    value: function _getFallback(language) {
      var normalized = this._normalizeCase(language); // not all languages have a fallback
      // e.g. "pt-BR" should be returned straight away


      if (Array.from(this.config.languages).includes(normalized)) {
        return normalized;
      }

      return this.config.language_fallbacks[normalized.slice(0, 2)] || this.config.default_language;
    } // "navigator.userLanguage" for IE<11

  }, {
    key: "getBrowserLocale",
    value: function getBrowserLocale() {
      return navigator.language || navigator.userLanguage;
    } // avoids lower/uppercase issues like
    // https://code.google.com/p/chromium/issues/detail?id=454331
    //
    // see "RFC 4646 - Tags for Identifying Languages"
    // http://www.rfc-editor.org/rfc/rfc4646.txt

  }, {
    key: "_normalizeCase",
    value: function _normalizeCase(language) {
      var short = language.slice(0, 2).toLowerCase();

      if (language.length === 2) {
        return short;
      }

      return "".concat(short, "-").concat(language.slice(3, 5).toUpperCase());
    }
  }]);
  return Locale;
}();

Locale.initClass();
module.exports = Locale;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":10,"core-js/modules/es6.array.from":104,"core-js/modules/es6.string.includes":118,"core-js/modules/es6.string.iterator":119,"core-js/modules/es7.array.includes":120}],172:[function(require,module,exports){
"use strict";

/* eslint global-require: 0 */
module.exports = {
  'de-DE': require('i18n/de-DE'),
  'en-US': require('i18n/en-US'),
  'es-ES': require('i18n/es-ES'),
  'fr-FR': require('i18n/fr-FR'),
  'id-ID': require('i18n/id-ID'),
  'it-IT': require('i18n/it-IT'),
  'ja-JP': require('i18n/ja-JP'),
  'nl-NL': require('i18n/nl-NL'),
  'pl-PL': require('i18n/pl-PL'),
  'pt-BR': require('i18n/pt-BR'),
  'ru-RU': require('i18n/ru-RU'),
  'tr-TR': require('i18n/tr-TR'),
  'zh-CN': require('i18n/zh-CN'),
  'zh-TW': require('i18n/zh-TW')
};
},{"i18n/de-DE":157,"i18n/en-US":158,"i18n/es-ES":159,"i18n/fr-FR":160,"i18n/id-ID":161,"i18n/it-IT":162,"i18n/ja-JP":163,"i18n/nl-NL":164,"i18n/pl-PL":165,"i18n/pt-BR":166,"i18n/ru-RU":167,"i18n/tr-TR":168,"i18n/zh-CN":169,"i18n/zh-TW":170}],173:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/* eslint no-param-reassign: 0 */
// Keep configuration values of ABS
var _ = require('underscore');

var localStorage = require('background/localStorage').getInstance();

var CONFIG_OVERRIDES = 'config_overrides';

var config = require('configuration');

var merge = function merge(dest, src) {
  dest = dest || {};

  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      var value = src[key];

      if (typeof dest[key] !== 'undefined' && (0, _typeof2.default)(value) === 'object' && !(value instanceof Array)) {
        dest[key] = merge(dest[key], value);
      } else {
        dest[key] = value;
      }
    }
  }

  return dest;
};

_.extend(config, {
  getConfigOverrides: function getConfigOverrides() {
    try {
      return JSON.parse(localStorage.getItem(CONFIG_OVERRIDES));
    } catch (e) {
      return {};
    }
  },
  setConfigOverrides: function setConfigOverrides(options) {
    var overrides = merge(this.getConfigOverrides(), options);
    localStorage.setItem(CONFIG_OVERRIDES, JSON.stringify(overrides));
  },
  clearConfigOverrides: function clearConfigOverrides() {
    localStorage.removeItem(CONFIG_OVERRIDES);
  },
  mergeOverrides: function mergeOverrides() {
    merge(this, this.getConfigOverrides());
  }
});

module.exports = config;
},{"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/typeof":17,"background/localStorage":1,"configuration":174,"underscore":151}],174:[function(require,module,exports){
module.exports={
	"barTransitionDelay": 200,
	"default_language": "en-US",
	"languages": [
		"en-US",
		"de-DE",
		"es-ES",
		"fr-FR",
		"id-ID",
		"it-IT",
		"ja-JP",
		"nl-NL",
		"pl-PL",
		"pt-BR",
		"ru-RU",
		"tr-TR",
		"zh-CN",
		"zh-TW"
	],
	"language_fallbacks": {
		"de": "de-DE",
		"es": "es-ES",
		"fr": "fr-FR",
		"id": "id-ID",
		"it": "it-IT",
		"ru": "ru-RU",
		"pl": "pl-PL",
		"pt": "pt-BR"
	},
	"auc": {
		"server": "https://v2.auc.avira.com/api",
		"api_key": "2216cc6964aa79fa09205dd4b08fb808",
		"product": "avira-browser-safety",
		"product_version": "0.0.0",
		"lang": "en-US",
		"locale": "en-US",
		"sync": true
	},
	"avira_dnt": {
		"update_url": "https://download.avira.com/update/donottrack/rules.json",
		"update_cycle": 86400
	},
	"aims": {
		"server": "http://icm.avira.com/",
		"productid": 199,
		"update_cycle": 21600
	},
	"ao": {
		"api_url": "https://offers.avira.com/aviraoffers/api/v2",
		"api_client": "abs",
		"api_key": "DhwrO06Igpulf142CT6NcUDrKlh4OG4L",
		"coupons_domain": "offers.avira.com",
		"dnt_disable_timeout": 7200000
	},
	"adguard": {
		"filtersMetadataUrl": "https://download.avira.com/update/adguard/filters.json",
		"filterRulesUrl": "https://download.avira.com/update/adguard/filters/{filter_id}.txt"
	},
	"mixpanel": {
		"token": "c34a8016e04ab4b4b232b1e71cc12d66",
		"active_cycle": 21600
	},
	"sentry_dsn": "https://281be1b5023941ada708d8dbd7dbee58:2a707b92eaab4584b77fd54738a90c7f@sentry.avira.com/45",
	"update_bridge": {
		"api_url": "https://dispatch.avira-update.com/",
		"product_id": 199
	},
	"beta": {
		"gc_id": "biegckbcmgljgabmpjcpmkbheikknfch"
	},
	"nightly": {
		"gc_id": "enhedicmkidpahjffkbmhgiacbodpcbo"
	},
	"scout": {
		"ids": [
			"ljjneligifenjndbcopdndmddfcjpcng",
			"dahchcnonmiipdiaeddddiebekhbcbkf"
		],
		"managedExtensions": {
			"privacyBadger": "pkehgijcmpdhfbdbbnkijodmdjhbjlgp",
			"httpsEverywhere": "gcbommkclmclpchllfjekcdonpmejbdp"
		}
	},
	"chrome": {
		"id": "flliilndjeohchalpbbcdekjklbdgfkk"
	},
	"nophish": {
		"whitelist_url": "https://download.avira.com/update/nophishwhitelist/common/int/NophishWhitelist.json"
	},
	"safesearch": {
		"base_url": "https://search.avira.net/#/",
		"take_me_away_url": "https://search.avira.net/#/?source=ABS-TMA",
		"ids": {
			"firefox": [
				"safesearch@avira.com",
				"safesearchplus@avira.com",
				"safesearchplus2@avira.com"
			],
			"chrome": [
				"eglgfnfolcgijipffhlhbbnefdcbjbml",
				"ffalmjohbhdhlkajphgkhloccibhmoog",
				"plgjnighgeebiaalpbkmcbbiihegpbbp",
				"ldmiahjidflgnbiadknkmaimfpjkelng",
				"khjilmcjipkeokomeekfnhkpbnhmgaje",
				"ipmkfpcnmccejididiaagpgchgjfajgp"
			],
			"webext": {
				"cookie_url": "https://search.avira.net",
				"cookie_name": "safesearch-plus2-installed"
			}
		},
		"crxInstallUrl": "https://chrome.google.com/webstore/detail/avira-safesearch-plus/ipmkfpcnmccejididiaagpgchgjfajgp",
		"xpiInstallUrl": "https://package.avira.com/package/safesearch/firefox/safesearch-plus2.xpi"
	},
	"supportedSettings": {
		"offers": true,
		"dnt_header": true,
		"inAppTracking": false,
		"adguard": true,
		"adguard_social_media": true,
		"adguard_useful_ads": true,
		"extension_scan": true
	},
	"surveys": {
		"ongoing": "QRVZF6M",
		"uninstall": "QJZ5T3G"
	},
	"uninstallUrl": "https://www.avira.com/en/extension-uninstall"
}
},{}],175:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var ModelBackground = require('content/core/Models/ModelBackground');

var I18n =
/*#__PURE__*/
function (_ModelBackground) {
  (0, _inherits2.default)(I18n, _ModelBackground);

  function I18n() {
    (0, _classCallCheck2.default)(this, I18n);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(I18n).apply(this, arguments));
  }

  (0, _createClass2.default)(I18n, [{
    key: "defaults",
    get: function get() {
      return {
        strings: {}
      };
    }
  }]);
  return I18n;
}(ModelBackground);

module.exports = I18n;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/core/Models/ModelBackground":194}],176:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var ModelBackground = require('content/core/Models/ModelBackground');

var messenger = require('content/messagingInterface');

var PUA =
/*#__PURE__*/
function (_ModelBackground) {
  (0, _inherits2.default)(PUA, _ModelBackground);

  function PUA() {
    (0, _classCallCheck2.default)(this, PUA);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PUA).apply(this, arguments));
  }

  (0, _createClass2.default)(PUA, [{
    key: "loadAlternatives",
    value: function loadAlternatives(cb) {
      var _this = this;

      messenger.publish('PUA:getData', {
        url: this.get('url')
      }, function (data) {
        _this.set(data);

        if (typeof cb === 'function') cb();
      });
    }
  }]);
  return PUA;
}(ModelBackground);

module.exports = PUA;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/core/Models/ModelBackground":194,"content/messagingInterface":203}],177:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var ModelBackground = require('content/core/Models/ModelBackground');

var SERP =
/*#__PURE__*/
function (_ModelBackground) {
  (0, _inherits2.default)(SERP, _ModelBackground);

  function SERP() {
    (0, _classCallCheck2.default)(this, SERP);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SERP).apply(this, arguments));
  }

  (0, _createClass2.default)(SERP, [{
    key: "defaults",
    get: function get() {
      return {
        url: null,
        categories: [],
        title: null,
        description: null,
        linksAmount: null
      };
    }
  }]);
  return SERP;
}(ModelBackground);

module.exports = SERP;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/core/Models/ModelBackground":194}],178:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var ModelBackground = require('content/core/Models/ModelBackground');

var URLClassification = require('content/Models/URLClassification');

var PUA = require('content/Models/PUA');

var SERP = require('content/Models/SERP');

var Ciuvo = require('modules/offers/content/iframe/models/Ciuvo');

var messenger = require('content/messagingInterface');

var StateModel =
/*#__PURE__*/
function (_ModelBackground) {
  (0, _inherits2.default)(StateModel, _ModelBackground);

  function StateModel() {
    var _this;

    (0, _classCallCheck2.default)(this, StateModel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StateModel).call(this));
    _this._onBeforeRouteChange = _this._onBeforeRouteChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(StateModel, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      messenger.subscribe('router:beforeRouteChange', this._onBeforeRouteChange);
      this.on('change:puaUrl', function () {
        return _this2.get('pua').set({
          url: _this2.get('puaUrl'),
          domain: _this2.get('puaDomain')
        });
      });
      this.setSubModel('ciuvo', Ciuvo.getInstance());
      this.setSubModel('serp', SERP.getInstance());
      this.setSubModel('urlClassification', URLClassification.getInstance());
      this.setSubModel('pua', PUA.getInstance());
      return messenger.publish('updateTrackerData', null, this.updateTrackerData);
    }
  }, {
    key: "setSubModel",
    value: function setSubModel(name, model) {
      if (!model) {
        return;
      }

      this.set(name, model);
      model.set('parent', this);
    }
  }, {
    key: "isSafe",
    value: function isSafe() {
      var categories = this.get('categories');
      return !categories || categories[0] <= 1;
    }
  }, {
    key: "_onBeforeRouteChange",
    value: function _onBeforeRouteChange(details) {
      return this.set('currentRoute', details.route);
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        route: null,
        // status of current URL
        url: 'avira.com',
        is_exempt: null,
        puaUrl: null,
        offersActive: false,
        currentRoute: null,
        // options specific for search page
        serp: null
      };
    }
  }, {
    key: "origin",
    get: function get() {
      return 'STATE_MODEL';
    }
  }]);
  return StateModel;
}(ModelBackground);

module.exports = StateModel;
},{"@babel/runtime/helpers/assertThisInitialized":3,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Models/PUA":176,"content/Models/SERP":177,"content/Models/URLClassification":179,"content/core/Models/ModelBackground":194,"content/messagingInterface":203,"core-js/modules/es6.function.bind":109,"modules/offers/content/iframe/models/Ciuvo":209}],179:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var ModelBackground = require('content/core/Models/ModelBackground');

var categoriesDictionary = {
  0: 'unknown',
  1: 'safe',
  2: 'malware',
  3: 'phishing',
  4: 'spam',
  5: 'pua',
  6: 'pua2',
  7: 'mse'
};

var URLClassification =
/*#__PURE__*/
function (_ModelBackground) {
  (0, _inherits2.default)(URLClassification, _ModelBackground);

  function URLClassification() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, URLClassification);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(URLClassification)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.markDomainAsFalseNegative = _this.markDomainAsFalseNegative.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(URLClassification, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      (0, _get2.default)((0, _getPrototypeOf3.default)(URLClassification.prototype), "initialize", this).call(this);
      this.once('change:hasUnsafeContentException', function (model, value) {
        _this2.set('hasUnsafeContentExceptionInitial', value);
      });
    }
  }, {
    key: "getCategoryName",
    value: function getCategoryName() {
      var cat = this.get('category');

      if (cat === 0 || cat === 1 && this.get('hasUnsafeContent')) {
        return 'unsafe_content';
      }

      return categoriesDictionary[cat];
    }
  }, {
    key: "isUnsafe",
    value: function isUnsafe() {
      return this.get('unsafe') || this.get('isWarning');
    }
  }, {
    key: "markDomainAsFalseNegative",
    value: function markDomainAsFalseNegative() {
      return this.set('isReportedAsFalseNegative', true);
    }
  }, {
    key: "hasUnsafeContentExceptionChanged",
    value: function hasUnsafeContentExceptionChanged() {
      return this.get('hasUnsafeContentException') !== this.get('hasUnsafeContentExceptionInitial');
    }
  }, {
    key: "defaults",
    get: function get() {
      return {
        url: null,
        categories: [],
        title: null,
        description: null,
        unsafe: null,
        isWarning: null,
        isPUA: null,
        isMSE: null,
        blocked: null,
        isAviraPage: null,
        isSERP: false,
        isReportedAsFalseNegative: false,
        isIFrame: window !== top,
        // eslint-disable-line no-restricted-globals
        unsafeContentURLs: []
      };
    }
  }]);
  return URLClassification;
}(ModelBackground);

module.exports = URLClassification;
},{"@babel/runtime/helpers/assertThisInitialized":3,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/core/Models/ModelBackground":194,"core-js/modules/es6.function.bind":109}],180:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var BaseRouter = require('content/core/Routing/Router');

var BlankIndicators = require('content/Views/BlankIndicators');

var MaliciousSearchEngineBar = require('content/Views/MaliciousSearchEngineBar');

var UnsafeContentBar = require('content/Views/UnsafeContentBar');

var AppRouter =
/*#__PURE__*/
function (_BaseRouter) {
  (0, _inherits2.default)(AppRouter, _BaseRouter);

  function AppRouter() {
    (0, _classCallCheck2.default)(this, AppRouter);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AppRouter).apply(this, arguments));
  }

  (0, _createClass2.default)(AppRouter, [{
    key: "default",
    value: function _default() {
      this.setAreas({
        indicators: new BlankIndicators()
      });
    }
  }, {
    key: "maliciousSearchEngine",
    value: function maliciousSearchEngine() {
      this.setAreas({
        indicators: new MaliciousSearchEngineBar()
      });
    }
  }, {
    key: "unsafeContentNotification",
    value: function unsafeContentNotification() {
      this.setAreas({
        indicators: new UnsafeContentBar()
      });
    }
  }, {
    key: "routes",
    get: function get() {
      return {
        minimized: 'default',
        '': 'default',
        serp: 'serp',
        maliciousSearchEngine: 'maliciousSearchEngine',
        'unsafeContent/notification': 'unsafeContentNotification'
      };
    }
  }]);
  return AppRouter;
}(BaseRouter);

module.exports = AppRouter;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Views/BlankIndicators":184,"content/Views/MaliciousSearchEngineBar":188,"content/Views/UnsafeContentBar":192,"content/core/Routing/Router":198}],181:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var $ = require('jquery');

var Default = require('content/Transitions/Default');

var TabView = require('content/Views/Dash/TabView');

var DashTransition =
/*#__PURE__*/
function (_Default) {
  (0, _inherits2.default)(DashTransition, _Default);
  (0, _createClass2.default)(DashTransition, null, [{
    key: "initClass",
    value: function initClass() {
      this.from = TabView;
      this.to = TabView;
      this.weight = 10;
      this.prototype.TRANSITION_DURATION = 500;
    }
  }]);

  function DashTransition() {
    var _this;

    (0, _classCallCheck2.default)(this, DashTransition);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DashTransition).call(this));
    _this._animate = _this._animate.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

    _this._initTransition();

    return _this;
  }

  (0, _createClass2.default)(DashTransition, [{
    key: "execute",
    value: function execute(callback) {
      var _this2 = this;

      var direction;
      var startNextFrom;

      this._handoverViewElement();

      if (this.from.constructor.dashXIndex > this.to.constructor.dashXIndex) {
        direction = 'Right';
        startNextFrom = -25;
      } else {
        direction = 'Left';
        startNextFrom = 125;
      }

      this["_hideTransitionTo".concat(direction)](this.from.$el, function () {
        _this2.from.hide();

        _this2.from.remove();

        return _this2.from.$el.remove();
      });
      this.to.render();
      this.to.$el.css('left', "".concat(startNextFrom, "%"));
      this.to.show();
      return this._showTransition(this.to.$el, callback);
    }
  }, {
    key: "_initTransition",
    value: function _initTransition() {
      $.easing.easeOutCustomElastic = function (x, t, b, c, d) {
        var ts = (t /= d) * t; // eslint-disable-line no-param-reassign

        var tc = ts * t;
        return b + c * (-1.49999999999999 * tc * ts + 2.85249999999999 * ts * ts + 1.895 * tc + -7.195 * ts + 4.9475 * t);
      };
    }
  }, {
    key: "_animate",
    value: function _animate($el, shift, callback) {
      $el.finish().animate({
        left: "".concat(shift, "%")
      }, this.TRANSITION_DURATION, 'easeOutCustomElastic', callback);
    }
  }, {
    key: "_showTransition",
    value: function _showTransition($el, callback) {
      this._animate($el, 50, callback);
    }
  }, {
    key: "_hideTransitionToRight",
    value: function _hideTransitionToRight($el, callback) {
      this._animate($el, 125, function () {
        $el.css('left', "".concat(-25, "%"));
        if (typeof callback === 'function') callback();
      });
    }
  }, {
    key: "_hideTransitionToLeft",
    value: function _hideTransitionToLeft($el, callback) {
      return this._animate($el, -25, function () {
        $el.css('left', "".concat(125, "%"));
        if (typeof callback === 'function') callback();
      });
    }
  }]);
  return DashTransition;
}(Default);

DashTransition.initClass();
module.exports = DashTransition;
},{"@babel/runtime/helpers/assertThisInitialized":3,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Transitions/Default":182,"content/Views/Dash/TabView":185,"core-js/modules/es6.function.bind":109,"jquery":"jquery"}],182:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var $ = require('jquery');

var Base = require('content/core/Transitions/Base');

var View = require('content/core/Views/View');

var Default =
/*#__PURE__*/
function (_Base) {
  (0, _inherits2.default)(Default, _Base);

  function Default() {
    (0, _classCallCheck2.default)(this, Default);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Default).apply(this, arguments));
  }

  (0, _createClass2.default)(Default, [{
    key: "_handoverViewElement",
    value: function _handoverViewElement() {
      if (!this.from) {
        return;
      }

      var oldEl = this.from.$el;
      var newEl = $('<div>');
      var oldId = oldEl.attr('id');
      oldEl.attr('id', null);
      newEl.attr('id', oldId);
      newEl.insertBefore(oldEl);

      if (this.to) {
        this.to.setElement(newEl);
      }
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      var _this = this;

      this._handoverViewElement();

      callback();
      if (typeof callback === 'function') callback();

      if (this.to) {
        this.to.render();
      }

      if (this.from) {
        this.from.stopListening();
        this.from.hide(function () {
          _this.from.remove();

          _this.from.$el.remove();

          if (_this.to) {
            _this.to.show();
          }
        });
      } else if (this.to) {
        this.to.show();
      }
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.from = View;
      this.to = View;
      this.weight = 1;
    }
  }]);
  return Default;
}(Base);

Default.initClass();
module.exports = Default;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/core/Transitions/Base":199,"content/core/Views/View":201,"jquery":"jquery"}],183:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var Default = require('content/Transitions/Default');

var TourStepBase = require('content/Views/Tour/TourStepBase');

var TourStepTransition =
/*#__PURE__*/
function (_Default) {
  (0, _inherits2.default)(TourStepTransition, _Default);

  function TourStepTransition() {
    (0, _classCallCheck2.default)(this, TourStepTransition);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TourStepTransition).apply(this, arguments));
  }

  (0, _createClass2.default)(TourStepTransition, [{
    key: "execute",
    value: function execute(callback) {
      var _this = this;

      this._handoverViewElement();

      this.from.hide(function () {
        _this.from.remove();

        _this.from.$el.remove();
      });
      this.to.render();
      this.to.show(callback);
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.from = TourStepBase;
      this.to = TourStepBase;
      this.weight = 10;
      this.prototype.TRANSITION_DURATION = 500;
    }
  }]);
  return TourStepTransition;
}(Default);

TourStepTransition.initClass();
module.exports = TourStepTransition;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Transitions/Default":182,"content/Views/Tour/TourStepBase":191}],184:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var View = require('content/core/Views/View');

var Blank =
/*#__PURE__*/
function (_View$extend) {
  (0, _inherits2.default)(Blank, _View$extend);

  function Blank() {
    (0, _classCallCheck2.default)(this, Blank);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Blank).apply(this, arguments));
  }

  (0, _createClass2.default)(Blank, [{
    key: "show",
    value: function show() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.$el.finish().animate({
        'margin-top': '0px'
      }, this.TRANSITION_DURATION, function () {
        return cb();
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.$el.finish().animate({
        'margin-top': '0px'
      }, this.TRANSITION_DURATION, function () {
        return cb();
      });
    }
  }]);
  return Blank;
}(View.extend({
  id: 'indicatorsArea',
  template: ''
}));

module.exports = Blank;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/core/Views/View":201}],185:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var View = require('content/core/Views/View');

var DashTabView =
/*#__PURE__*/
function (_View) {
  (0, _inherits2.default)(DashTabView, _View);

  function DashTabView() {
    (0, _classCallCheck2.default)(this, DashTabView);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DashTabView).apply(this, arguments));
  }

  (0, _createClass2.default)(DashTabView, [{
    key: "show",
    value: function show(callback) {
      return this.$el.finish().hide().css('opacity', 0).show().animate({
        opacity: 1
      }, this.TRANSITION_DURATION, callback);
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.dashXIndex = 0;
      this.prototype.id = 'dashItemArea';
      this.prototype.className = 'dash dash-tab';
    }
  }]);
  return DashTabView;
}(View);

DashTabView.initClass();
module.exports = DashTabView;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/core/Views/View":201}],186:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var Indicator = require('content/Views/Indicators/Indicator');

var template = require('Indicators/Close.mustache');

var Close =
/*#__PURE__*/
function (_Indicator) {
  (0, _inherits2.default)(Close, _Indicator);

  function Close() {
    (0, _classCallCheck2.default)(this, Close);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Close).apply(this, arguments));
  }

  (0, _createClass2.default)(Close, [{
    key: "beforeRender",
    value: function beforeRender() {
      return {
        for_offers_bar: this.for_offers_bar,
        for_offers_dash: this.for_offers_dash,
        context: this.context
      };
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype.template = template;
      this.prototype.for_offers_bar = false;
      this.prototype.for_offers_dash = false;
      this.prototype.context = null;
    }
  }]);
  return Close;
}(Indicator);

Close.initClass();
module.exports = Close;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"Indicators/Close.mustache":153,"content/Views/Indicators/Indicator":187}],187:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var View = require('content/core/Views/View');

var State = require('content/Models/State');

var Indicator =
/*#__PURE__*/
function (_View) {
  (0, _inherits2.default)(Indicator, _View);

  function Indicator() {
    (0, _classCallCheck2.default)(this, Indicator);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Indicator).apply(this, arguments));
  }

  (0, _createClass2.default)(Indicator, [{
    key: "initialize",
    value: function initialize() {
      var _get2;

      this.model = State.getInstance();

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_get2 = (0, _get3.default)((0, _getPrototypeOf2.default)(Indicator.prototype), "initialize", this)).call.apply(_get2, [this].concat(args));
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype.className = 'indicator-outer';
    }
  }]);
  return Indicator;
}(View);

Indicator.initClass();
module.exports = Indicator;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Models/State":178,"content/core/Views/View":201}],188:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var View = require('content/core/Views/View');

var I18n = require('content/Models/I18n');

var URLClassification = require('content/Models/URLClassification');

var messenger = require('content/messagingInterface');

var mixpanel = require('content/mixpanel');

var template = require('MaliciousSearchEngineBar.mustache');

var CloseView = require('content/Views/Indicators/Close');

var MaliciousSearchEngineBar =
/*#__PURE__*/
function (_View) {
  (0, _inherits2.default)(MaliciousSearchEngineBar, _View);

  function MaliciousSearchEngineBar() {
    (0, _classCallCheck2.default)(this, MaliciousSearchEngineBar);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MaliciousSearchEngineBar).apply(this, arguments));
  }

  (0, _createClass2.default)(MaliciousSearchEngineBar, [{
    key: "initialize",
    value: function initialize() {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var options = args[0];

      if (options == null) {
        options = {};
      }

      this.model = URLClassification.getInstance();
      return (_get2 = (0, _get3.default)((0, _getPrototypeOf2.default)(MaliciousSearchEngineBar.prototype), "initialize", this)).call.apply(_get2, [this].concat(args));
    }
  }, {
    key: "show",
    value: function show(callback) {
      var cb = callback; // the dash bg is shown/hidden based on the state of the top bar

      if (cb == null) {
        cb = function cb() {};
      }

      this.$el.addClass('shown');
      this.$el.finish().animate({
        'margin-top': '0px'
      }, this.TRANSITION_DURATION, 'linear', function () {
        return cb();
      });
      mixpanel.track('MSE - Bar - Show', {
        Domain: this.model.get('domain'),
        URL: this.model.get('url')
      });
      this.subviews.Close.context = 'MaliciousSearchEngineBar';
      return this.subviews.Close.render();
    }
  }, {
    key: "_doNotOfferMore",
    value: function _doNotOfferMore() {
      mixpanel.track('MSE - Bar - Add Exception', {
        Domain: this.model.get('domain'),
        URL: this.model.get('url')
      });
      messenger.publish('doNotOfferSSE');
      return messenger.publish('router:navigateTo', {
        route: 'minimized'
      });
    }
  }, {
    key: "_installSafeSearch",
    value: function _installSafeSearch() {
      mixpanel.track('MSE - Bar - Install', {
        Domain: this.model.get('domain'),
        URL: this.model.get('url')
      });
      I18n.getInstance().get('strings');
      return messenger.publish('installSEE');
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype.id = 'indicatorsArea';
      this.prototype.template = template;
      this.prototype.className = 'indicators-container state-dash shown';
      this.prototype.BAR_HEIGHT = 46;
      this.prototype.subviewConstructors = {
        Close: CloseView
      };
      this.prototype.events = {
        'click button[data-no-offer]': '_doNotOfferMore',
        'click button[data-install-safesearch]': '_installSafeSearch'
      };
    }
  }]);
  return MaliciousSearchEngineBar;
}(View);

MaliciousSearchEngineBar.initClass();
module.exports = MaliciousSearchEngineBar;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"MaliciousSearchEngineBar.mustache":154,"content/Models/I18n":175,"content/Models/URLClassification":179,"content/Views/Indicators/Close":186,"content/core/Views/View":201,"content/messagingInterface":203,"content/mixpanel":204}],189:[function(require,module,exports){
"use strict";

var $ = require('jquery');

var Tooltip = {
  reposition: function reposition($tooltip, $o, opts) {
    var $owner = $o;
    var options = opts;
    var addClasses;
    var removeClasses;
    var top;

    if (options == null) {
      options = {};
    }

    if ($owner == null) {
      $owner = $('body');
    } // uses methods instead of static values in order to support dynamic offset calculations
    // * see TourStep_Base and HowToEditTrackers views, to check how it's implemented


    if (options.offsetY == null) {
      options.offsetY = function () {
        return 0;
      };
    }

    if (options.offsetX == null) {
      options.offsetX = function () {
        return 0;
      };
    }

    if (!$owner || !$owner.length || !$tooltip || !$tooltip.length) {
      return;
    }

    var pos = $owner.css('position') === 'static' ? $owner.position() : $owner.offset();
    var height = $tooltip.children().outerHeight();
    var upClasses = 'point-up point-up-center';
    var downClasses = 'point-down point-down-center';

    if ($owner.offset().top + options.offsetY() + height > window.innerHeight) {
      top = pos.top - height;
      removeClasses = upClasses;
      addClasses = downClasses;
    } else {
      top = pos.top + options.offsetY();
      addClasses = upClasses;
      removeClasses = downClasses;
    }

    $tooltip.css({
      top: top,
      left: pos.left + options.offsetX()
    });
    $tooltip.children('.point-down, .point-up').addClass(addClasses).removeClass(removeClasses);
    return this; // eslint-disable-line consistent-return
  }
};
module.exports = Tooltip;
},{"jquery":"jquery"}],190:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get4 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var View = require('content/core/Views/View');

var mixpanel = require('content/mixpanel');

var messenger = require('content/messagingInterface');

var EscChain = require('content/core/Views/EscChainOfResponsibility');

var $ = require('jquery');

var _ = require('underscore');

var template = require('Top.mustache');

var Top =
/*#__PURE__*/
function (_View) {
  (0, _inherits2.default)(Top, _View);

  function Top() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Top);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Top)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._onMixpanelEvent = _this._onMixpanelEvent.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this._onKeyPressed = _this._onKeyPressed.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this._goToMinimized = _this._goToMinimized.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(Top, [{
    key: "initialize",
    value: function initialize() {
      var _get2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_get2 = (0, _get4.default)((0, _getPrototypeOf3.default)(Top.prototype), "initialize", this)).call.apply(_get2, [this].concat(args));

      this._escChain = new EscChain();
      this.vent.on('esc:on', this._escChain.attach);
      this.vent.on('esc:off', this._escChain.detach);
      return this._escChain.attach(this._goToMinimized);
    }
  }, {
    key: "render",
    value: function render() {
      var _get3;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (_get3 = (0, _get4.default)((0, _getPrototypeOf3.default)(Top.prototype), "render", this)).call.apply(_get3, [this].concat(args));

      return this._initEvents();
    }
  }, {
    key: "_initEvents",
    value: function _initEvents() {
      this.$el.on('click', '[data-event]', this._onMixpanelEvent);
      $(document).keyup(this._onKeyPressed);
    }
  }, {
    key: "_onMixpanelEvent",
    value: function _onMixpanelEvent(e) {
      var data = $(e.currentTarget).data();
      return mixpanel.track(data.event, _.omit(data, 'event'));
    }
  }, {
    key: "_onMousewheel",
    value: function _onMousewheel(e) {
      var $target = $(e.target);
      var $el = $target.is('.scrollable') ? $target : $target.closest('.scrollable');
      var el = $el[0];

      var isScrollingUp = function isScrollingUp() {
        if (e.originalEvent.type === 'DOMMouseScroll') {
          return e.originalEvent.detail < 0;
        }

        return e.originalEvent.wheelDelta > 0;
      };

      var toSuppress = function toSuppress() {
        if ($el.length === 0) {
          return true;
        }

        if (isScrollingUp()) {
          return el.scrollTop === 0;
        } // usually when element height == scrollHeight - scrollTop
        // it means that element is fully scrolled
        // (see https://developer.mozilla.org/en-US/docs/Web/API/element.scrollHeight)
        // but here an offset comparison is used because element has a height restriction in %
        // and it's actually rounded in "el.clientHeight"


        return el.scrollHeight - el.scrollTop - el.clientHeight <= 1;
      };

      if (toSuppress()) {
        e.preventDefault();
      }

      return e.stopPropagation();
    }
  }, {
    key: "_onAnchorClicked",
    value: function _onAnchorClicked(e) {
      if (['_top', '_blank', '_parent'].includes(e.currentTarget.target)) {
        return true;
      }

      if (['http:', 'https:'].includes(e.currentTarget.protocol)) {
        return true;
      } // avoids browser history


      var hash = e.currentTarget.hash.replace(/^#/, '');
      messenger.publish('router:navigateTo', {
        route: hash
      });
      return e.preventDefault();
    }
  }, {
    key: "_onKeyPressed",
    value: function _onKeyPressed(e) {
      var ESC = 27;

      if (e.which === ESC) {
        this._onEscKeyPressed();
      }
    }
  }, {
    key: "_onEscKeyPressed",
    value: function _onEscKeyPressed() {
      return this._escChain.trigger();
    }
  }, {
    key: "_goToMinimized",
    value: function _goToMinimized() {
      return messenger.publish('router:navigateTo', {
        route: 'minimized'
      });
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype.template = template;
      this.prototype.events = {
        'click a': '_onAnchorClicked',
        mousewheel: '_onMousewheel',
        // not available if FF
        DOMMouseScroll: '_onMousewheel' // available in FF only

      };
    }
  }]);
  return Top;
}(View);

Top.initClass();
module.exports = Top;
},{"@babel/runtime/helpers/assertThisInitialized":3,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"Top.mustache":155,"content/core/Views/EscChainOfResponsibility":200,"content/core/Views/View":201,"content/messagingInterface":203,"content/mixpanel":204,"core-js/modules/es6.function.bind":109,"core-js/modules/es6.regexp.replace":115,"core-js/modules/es6.string.includes":118,"core-js/modules/es7.array.includes":120,"jquery":"jquery","underscore":151}],191:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var View = require('content/core/Views/View');

var TooltipMixin = require('content/Views/Mixins/Tooltip');

var _ = require('underscore');

var $ = require('jquery');

var TourStepBase =
/*#__PURE__*/
function (_View) {
  (0, _inherits2.default)(TourStepBase, _View);

  function TourStepBase() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TourStepBase);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TourStepBase)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._repositionTooltip = _this._repositionTooltip.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(TourStepBase, [{
    key: "initialize",
    value: function initialize() {
      var _get2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_get2 = (0, _get3.default)((0, _getPrototypeOf3.default)(TourStepBase.prototype), "initialize", this)).call.apply(_get2, [this].concat(args));

      return _.extend(this._tooltipHelper, TooltipMixin);
    }
  }, {
    key: "show",
    value: function show(callback) {
      var cb = callback;

      if (cb == null) {
        cb = function cb() {};
      }

      this.setWindowResizeHandler();

      this._repositionTooltip();

      return this.$el.fadeIn(400, function () {
        return cb();
      });
    }
  }, {
    key: "hide",
    value: function hide(callback) {
      var _this2 = this;

      var cb = callback;

      if (cb == null) {
        cb = function cb() {};
      }

      return this.$el.fadeOut(400, function () {
        _this2.unsetWindowResizeHandler();

        return cb();
      });
    }
  }, {
    key: "setWindowResizeHandler",
    value: function setWindowResizeHandler() {
      return $(window).on('resize', this._repositionTooltip);
    }
  }, {
    key: "unsetWindowResizeHandler",
    value: function unsetWindowResizeHandler() {
      return $(window).off('resize', this._repositionTooltip);
    }
  }, {
    key: "_repositionTooltip",
    value: function _repositionTooltip() {
      return this._tooltipHelper.reposition(this._$tooltip, this._$tooltipOwner, this._tooltipParams);
    }
  }, {
    key: "setTooltipRepositioner",
    value: function setTooltipRepositioner(params) {
      this._$tooltip = params.$tooltip;
      this._$tooltipOwner = params.$tooltipOwner;
      this._tooltipParams = {
        offsetX: params.offsetX,
        offsetY: params.offsetY
      };
      return this._repositionTooltip();
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype.id = 'tourArea';
      this.prototype.className = 'tourtip-container';
      this.prototype._$tooltip = null;
      this.prototype._$tooltipOwner = null;
      this.prototype._tooltipParams = {};
      this.prototype._tooltipHelper = {};
    }
  }]);
  return TourStepBase;
}(View);

TourStepBase.initClass();
module.exports = TourStepBase;
},{"@babel/runtime/helpers/assertThisInitialized":3,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Views/Mixins/Tooltip":189,"content/core/Views/View":201,"core-js/modules/es6.function.bind":109,"jquery":"jquery","underscore":151}],192:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var View = require('content/core/Views/View');

var URLClassification = require('content/Models/URLClassification');

var messenger = require('content/messagingInterface');

var template = require('UnsafeContentBar.mustache');

var CloseView = require('content/Views/Indicators/Close');

var UnsafeContentBar =
/*#__PURE__*/
function (_View) {
  (0, _inherits2.default)(UnsafeContentBar, _View);

  function UnsafeContentBar() {
    (0, _classCallCheck2.default)(this, UnsafeContentBar);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UnsafeContentBar).apply(this, arguments));
  }

  (0, _createClass2.default)(UnsafeContentBar, [{
    key: "initialize",
    value: function initialize() {
      var _get2;

      this.model = URLClassification.getInstance();

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_get2 = (0, _get3.default)((0, _getPrototypeOf2.default)(UnsafeContentBar.prototype), "initialize", this)).call.apply(_get2, [this].concat(args));
    }
  }, {
    key: "show",
    value: function show(callback) {
      var cb = callback; // the dash bg is shown/hidden based on the state of the top bar

      if (cb == null) {
        cb = function cb() {};
      }

      this.$el.addClass('shown');
      this.$el.finish().animate({
        'margin-top': '0px'
      }, this.TRANSITION_DURATION, 'linear', function () {
        return cb();
      });
      this.subviews.Close.render();
    }
  }, {
    key: "_close",
    value: function _close() {
      messenger.publish('router:navigateTo', {
        route: 'minimized'
      });
    }
  }, {
    key: "_ignore",
    value: function _ignore() {
      messenger.publish('ignoreUCWarning');

      this._close();
    }
  }, {
    key: "_showDetails",
    value: function _showDetails() {
      messenger.publish('router:navigateTo', {
        route: 'unsafeContent'
      });
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype.id = 'indicatorsArea';
      this.prototype.template = template;
      this.prototype.className = 'indicators-container state-dash shown';
      this.prototype.BAR_HEIGHT = 46;
      this.prototype.subviewConstructors = {
        Close: CloseView
      };
      this.prototype.events = {
        'click .ignore-button': '_ignore',
        'click .details-button': '_showDetails'
      };
    }
  }]);
  return UnsafeContentBar;
}(View);

UnsafeContentBar.initClass();
module.exports = UnsafeContentBar;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"UnsafeContentBar.mustache":156,"content/Models/URLClassification":179,"content/Views/Indicators/Close":186,"content/core/Views/View":201,"content/messagingInterface":203}],193:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.promise");

var Backbone = require('backbone');

var $ = require('jquery');

var TopView = require('content/Views/Top');

var i18nLoader = require('content/i18n_loader');

var i18n = require('content/Models/I18n').getInstance();

var SERP = require('content/Models/SERP');

var URLClassification = require('content/Models/URLClassification');

var PUA = require('content/Models/PUA');

var AppRouter = require('content/Routers/App');

var messenger = require('content/messagingInterface');

var Offers = require('modules/offers/content/AppOffers');

var isIframe = function isIframe() {
  try {
    return window.top !== window.self;
  } catch (e) {
    return false;
  }
};

var initFunc = function initFunc() {
  return i18nLoader.getLocaleStrings(function (i18nStrings, language) {
    i18n.set({
      strings: i18nStrings,
      language: language
    });
    var serp = SERP.getInstance();
    var topURL = URLClassification.getInstance();
    var pua = PUA.getInstance();
    var offers = new Offers();
    var topView = new TopView({
      el: $('#top')
    });
    topView.render();
    $('body').attr('lang', language);
    new AppRouter();
    var pStatuses = new Promise(function (resolve) {
      return messenger.publish('fetchTabStatuses', null, resolve);
    });
    var pTabData = new Promise(function (resolve) {
      return messenger.publish('Tabs:getData', {
        classifier: 'AUCClassifier'
      }, resolve);
    });
    /* eslint-disable-next-line no-unused-vars */

    Promise.all([pStatuses, pTabData]).then(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          statuses = _ref2[0],
          tabData = _ref2[1];

      var isStartupOffersAllowed = tabData.hasUnsafeContent;
      offers.enable(isStartupOffersAllowed);
    });

    var showUCWarning = function showUCWarning(ignoreAllowed) {
      topURL.set('UCWarningIgnoreAllowed', ignoreAllowed);
      messenger.publish('unsafeContentWarningShown');
      messenger.publish('router:navigateTo', {
        route: 'unsafeContent/notification'
      });
    };

    var showSSEOffer = function showSSEOffer() {
      return messenger.publish('router:navigateTo', {
        route: 'maliciousSearchEngine'
      });
    };

    pTabData.then(function (tabData) {
      Backbone.history.start();
      topURL.set(tabData);
      messenger.subscribe('Tabs:change', function (_ref3) {
        var AUCClassifier = _ref3.AUCClassifier;

        if (AUCClassifier) {
          topURL.set(AUCClassifier);
        }
      });

      if (topURL.get('isIFrame')) {
        pStatuses.then(function (statuses) {
          if (topURL.get('isMSE') && statuses.isSSEOfferAllowed) {
            showSSEOffer();
          } else if (topURL.get('hasUnsafeContent')) {
            if (!(statuses.isUCWarningIgnored || topURL.get('hasUnsafeContentException'))) {
              showUCWarning(statuses.isUCWarningIgnoreAllowed);
            }
          } else if (!statuses.isUCWarningIgnored) {
            topURL.once('change:hasUnsafeContent', function () {
              if (!topURL.get('hasUnsafeContentException')) {
                showUCWarning(statuses.isUCWarningIgnoreAllowed);
              }
            });
          }
        });
      }
    });
    messenger.subscribe('leavingDash', function () {
      if (topURL.hasUnsafeContentExceptionChanged()) {
        messenger.publish('reloadTab');
      }

      serp.clear();

      if (!topURL.get('isPUA')) {
        pua.clear();
      }
    });
    messenger.subscribe('router:beforeRouteChange', function (_ref4) {
      var route = _ref4.route;

      if (!topURL.get('isIFrame') && ['', 'minimized'].includes(route)) {
        messenger.publish('closeTab');
      }
    });
    messenger.publish('DNT:tabReady');
    return messenger.subscribe('AO:navigate', function (params) {
      var route = params[0];
      return messenger.publish('router:navigateTo', {
        route: route
      });
    });
  });
};

if (isIframe()) {
  messenger.publish('checkIframe', null, initFunc);
} else {
  initFunc();
}
},{"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/slicedToArray":15,"backbone":20,"content/Models/I18n":175,"content/Models/PUA":176,"content/Models/SERP":177,"content/Models/URLClassification":179,"content/Routers/App":180,"content/Views/Top":190,"content/i18n_loader":202,"content/messagingInterface":203,"core-js/modules/es6.array.iterator":106,"core-js/modules/es6.promise":112,"core-js/modules/es6.string.includes":118,"core-js/modules/es6.string.iterator":119,"core-js/modules/es7.array.includes":120,"core-js/modules/web.dom.iterable":122,"jquery":"jquery","modules/offers/content/AppOffers":205}],194:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.date.to-json");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var $ = require('jquery');

var Backbone = require('backbone');

var messenger = require('content/messagingInterface');

var ModelBackground =
/*#__PURE__*/
function (_Backbone$Model) {
  (0, _inherits2.default)(ModelBackground, _Backbone$Model);
  (0, _createClass2.default)(ModelBackground, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (this.instance == null) {
        this.instance = new this();
      }

      return this.instance;
    }
  }]);

  function ModelBackground() {
    var _this;

    (0, _classCallCheck2.default)(this, ModelBackground);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ModelBackground).call(this));
    _this._listensTo = {};
    return _this;
  }

  (0, _createClass2.default)(ModelBackground, [{
    key: "sync",
    value: function sync(method, model) {
      var _this2 = this;

      if (!model.id) {
        throw new Error('ID must be specified');
      }

      var query = {
        get: ['read'].includes(method) ? model.id : false,
        set: ['create', 'update', 'patch'].includes(method) ? model.id : false,
        value: model.toJSON(),
        _fromModel: true // just not to update it again

      };

      this._listen(model.id); // Using Deferred instead of Promise to be consistent with Backbone's API


      return new $.Deferred(function (deferred) {
        messenger.publish('bgStorage', query, function (value) {
          if (query.get) _this2.set(value);

          _this2.trigger('sync', _this2);

          return deferred.resolve(value);
        });
      });
    }
  }, {
    key: "_listen",
    value: function _listen(modelId) {
      var _this3 = this;

      if (this._listensTo[modelId]) {
        return;
      }

      messenger.subscribe('bgStorage', function (data) {
        if (!data._fromModel && data.set === modelId) {
          _this3.set(data.value);
        }
      });
      this._listensTo[modelId] = true;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = (0, _get2.default)((0, _getPrototypeOf2.default)(ModelBackground.prototype), "toJSON", this).call(this);
      delete json.parent;
      return json;
    }
  }]);
  return ModelBackground;
}(Backbone.Model);

module.exports = ModelBackground;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"backbone":20,"content/messagingInterface":203,"core-js/modules/es6.date.to-json":107,"core-js/modules/es6.string.includes":118,"core-js/modules/es7.array.includes":120,"jquery":"jquery"}],195:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var ViewTransitionStrategy = require('content/core/Routing/AreasManagement/ViewTransitionStrategy');

var AreasManager =
/*#__PURE__*/
function () {
  function AreasManager(areaList, transitionStrategy) {
    var _this = this;

    (0, _classCallCheck2.default)(this, AreasManager);
    this._transitionStrategy = transitionStrategy || ViewTransitionStrategy;
    this._areas = {};
    areaList.forEach(function (area) {
      _this._areas[area] = null;
    });
  }

  (0, _createClass2.default)(AreasManager, [{
    key: "replace",
    value: function replace(areaConstructors) {
      var _this2 = this;

      Object.keys(this._areas).forEach(function (area) {
        _this2._replaceByAreaName(area, areaConstructors[area]);
      });
    }
  }, {
    key: "_replaceByAreaName",
    value: function _replaceByAreaName(area, areaViewInstance) {
      var _this3 = this;

      var view;

      if (areaViewInstance != null) {
        view = areaViewInstance;
      }

      var transition = new this._transitionStrategy(this._areas[area], view);
      transition.execute(function () {
        _this3._areas[area] = view;
      });
    }
  }]);
  return AreasManager;
}();

module.exports = AreasManager;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":10,"content/core/Routing/AreasManagement/ViewTransitionStrategy":196,"core-js/modules/es6.array.for-each":103,"core-js/modules/es6.array.iterator":106,"core-js/modules/es6.object.keys":111,"core-js/modules/web.dom.iterable":122}],196:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var ViewTransitionStrategyBase = require('content/core/Routing/AreasManagement/base/ViewTransitionStrategy');

var DashTransition = require('content/Transitions/DashTransition');

var OffersDashTransition = require('modules/offers/content/iframe/transitions/OffesDashTransition');

var Default = require('content/Transitions/Default');

var OffersIndicatorBarTransition = require('modules/offers/content/iframe/transitions/OffersIndicatorBarTransition');

var TourStepTransition = require('content/Transitions/TourStepTransition');

var ViewTransitionStrategy =
/*#__PURE__*/
function (_ViewTransitionStrate) {
  (0, _inherits2.default)(ViewTransitionStrategy, _ViewTransitionStrate);

  function ViewTransitionStrategy() {
    (0, _classCallCheck2.default)(this, ViewTransitionStrategy);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ViewTransitionStrategy).apply(this, arguments));
  }

  return ViewTransitionStrategy;
}(ViewTransitionStrategyBase); // ES6 currently does not support properties in class sintax


ViewTransitionStrategy.prototype._transitionList = {
  DashTransition: DashTransition,
  OffersDashTransition: OffersDashTransition,
  Default: Default,
  OffersIndicatorBarTransition: OffersIndicatorBarTransition,
  TourStepTransition: TourStepTransition
};
module.exports = ViewTransitionStrategy;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Transitions/DashTransition":181,"content/Transitions/Default":182,"content/Transitions/TourStepTransition":183,"content/core/Routing/AreasManagement/base/ViewTransitionStrategy":197,"modules/offers/content/iframe/transitions/OffersIndicatorBarTransition":213,"modules/offers/content/iframe/transitions/OffesDashTransition":214}],197:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var ViewTransitionStrategy =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(ViewTransitionStrategy, null, [{
    key: "initClass",
    value: function initClass() {
      this.prototype.transition = null;
    }
  }]);

  function ViewTransitionStrategy(from, to) {
    (0, _classCallCheck2.default)(this, ViewTransitionStrategy);

    var Transition = this._findTransition(from, to);

    this.transition = new Transition(from, to);
  }

  (0, _createClass2.default)(ViewTransitionStrategy, [{
    key: "_findTransition",
    value: function _findTransition(from, to) {
      // find all applicable pairs and select the one with the highest weight
      var transition;
      var transitionList = [];
      /* eslint-disable-next-line  guard-for-in */

      for (var name in this._transitionList) {
        transition = this._transitionList[name];
        /* eslint-disable-next-line  max-len */

        if (from != null && from instanceof transition.from && to != null && to instanceof transition.to) {
          transitionList.push(transition);
        }
      }

      var winningTransition = this._transitionList.Default;
      var maxWeight = this._transitionList.Default.weight;

      var _arr = Array.from(transitionList);

      for (var _i = 0; _i < _arr.length; _i++) {
        transition = _arr[_i];

        if (maxWeight < transition.weight) {
          winningTransition = transition;
          maxWeight = transition.weight;
        }
      }

      return winningTransition;
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      return this.transition.execute(callback);
    }
  }]);
  return ViewTransitionStrategy;
}();

ViewTransitionStrategy.initClass();
module.exports = ViewTransitionStrategy;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":10,"core-js/modules/es6.array.from":104,"core-js/modules/es6.function.name":110,"core-js/modules/es6.string.iterator":119}],198:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.regexp.replace");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var Backbone = require('backbone');

var AreasManager = require('content/core/Routing/AreasManagement/AreasManager');

var messenger = require('content/messagingInterface');

require('backbone.routefilter');

var subscribedToSyncEvents = false;
/*
 * Base router class using backbone to route the application using hash tags (#).
 */

var BaseRouter =
/*#__PURE__*/
function (_Backbone$Router) {
  (0, _inherits2.default)(BaseRouter, _Backbone$Router);

  function BaseRouter() {
    (0, _classCallCheck2.default)(this, BaseRouter);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BaseRouter).apply(this, arguments));
  }

  (0, _createClass2.default)(BaseRouter, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;

      // make sure we start history only once, no matter how many instances of the class we have
      if (!subscribedToSyncEvents) {
        subscribedToSyncEvents = true;
        messenger.subscribe("".concat(this.constructor.baseName, ":navigateTo"), function (options) {
          var trigger = options.trigger,
              replace = options.replace;

          if (trigger == null) {
            trigger = true;
          }

          if (replace == null) {
            replace = true;
          }

          _this.navigate(options.route, {
            trigger: trigger,
            replace: replace
          });
        });
      }

      (0, _get2.default)((0, _getPrototypeOf2.default)(BaseRouter.prototype), "initialize", this).call(this);
    }
  }, {
    key: "before",
    value: function before() {
      messenger.publish("".concat(this.constructor.baseName, ":beforeRouteChange"), {
        route: Backbone.history.fragment
      });
    }
  }, {
    key: "after",
    value: function after() {
      messenger.publish("".concat(this.constructor.baseName, ":afterRouteChange"), {
        route: Backbone.history.fragment
      });
    }
  }, {
    key: "setAreas",
    value: function setAreas(areasMap) {
      this._areasManager.replace(areasMap);
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.baseName = 'router';
      this.prototype._areasManager = new AreasManager(['indicators', 'dashItem', 'tour']);
    }
  }]);
  return BaseRouter;
}(Backbone.Router);

BaseRouter.initClass();
module.exports = BaseRouter;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"backbone":20,"backbone.routefilter":19,"content/core/Routing/AreasManagement/AreasManager":195,"content/messagingInterface":203,"core-js/modules/es6.regexp.replace":115}],199:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/*
 * decaffeinate suggestions:
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var TransitionBase =
/*#__PURE__*/
function () {
  (0, _createClass2.default)(TransitionBase, null, [{
    key: "initClass",
    value: function initClass() {
      this.weight = 0;
    }
  }]);

  function TransitionBase(from, to) {
    (0, _classCallCheck2.default)(this, TransitionBase);
    this.from = from;
    this.to = to;
  }

  (0, _createClass2.default)(TransitionBase, [{
    key: "execute",
    value: function execute() {
      throw new Error('not implemented');
    }
  }]);
  return TransitionBase;
}();

TransitionBase.initClass();
module.exports = TransitionBase;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":10}],200:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var EscChainOfResponsibility =
/*#__PURE__*/
function () {
  function EscChainOfResponsibility() {
    (0, _classCallCheck2.default)(this, EscChainOfResponsibility);
    this.attach = this.attach.bind(this);
    this.detach = this.detach.bind(this);
    this.trigger = this.trigger.bind(this);
    this._funcs = [];
  }

  (0, _createClass2.default)(EscChainOfResponsibility, [{
    key: "attach",
    value: function attach(func) {
      this._funcs.push(func);
    }
  }, {
    key: "detach",
    value: function detach(func) {
      var i = this._funcs.indexOf(func);

      if (i !== -1) this._funcs.splice(i, 1);
    }
  }, {
    key: "trigger",
    value: function trigger() {
      var _this = this;

      var counter = this._funcs.length;

      var invokeNext = function invokeNext() {
        counter -= 1;

        if (counter < 0) {
          return;
        }

        _this._funcs[counter].call(null, invokeNext);
      };

      invokeNext();
    }
  }]);
  return EscChainOfResponsibility;
}();

module.exports = EscChainOfResponsibility;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":10,"core-js/modules/es6.array.index-of":105,"core-js/modules/es6.function.bind":109}],201:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.date.to-json");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var Mustache = require('mustache');

var Backbone = require('backbone');

var i18n = require('content/Models/I18n').getInstance();

var _ = require('underscore');

require('backbone-subviews');

require('perfect-scrollbar/jquery')(Backbone.$);

var View =
/*#__PURE__*/
function (_Backbone$View) {
  (0, _inherits2.default)(View, _Backbone$View);

  function View() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, View);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(View)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.render = _this.render.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(View, [{
    key: "initialize",
    value: function initialize(opts) {
      var options = opts;

      if (options == null) {
        options = {};
      }

      this.subviewCreators = _.extend({}, this.subviewCreators, options.subviewCreators);
      this.subviewConstructors = _.extend({}, this.subviewConstructors, options.subviewConstructors);
      this.i18n = i18n.get('strings');

      if (this.template == null) {
        this.template = options.template;
      }

      this.vent = options.vent || Backbone.Events;
      this.initSubviewCreators();
      return Backbone.Subviews.add(this);
    }
  }, {
    key: "_updateElement",
    value: function _updateElement() {
      if (!this.id) {
        return;
      }

      this.setElement(document.getElementById(this.id));
      this.$el.addClass(this.className);
    }
  }, {
    key: "toggle",
    value: function toggle(val) {
      var value = val;

      if (value == null) {
        value = this.$el.is(':hidden');
      }

      if (value) {
        return this.show();
      }

      return this.hide();
    }
  }, {
    key: "hide",
    value: function hide(cb) {
      var callback = cb;

      if (callback == null) {
        callback = function callback() {};
      }

      this.$el.finish().hide(0);
      return callback();
    }
  }, {
    key: "show",
    value: function show(cb) {
      var callback = cb;

      if (callback == null) {
        callback = function callback() {};
      }

      this.$el.finish().show(0);
      return callback();
    }
  }, {
    key: "beforeRender",
    value: function beforeRender(data) {
      return data;
    }
  }, {
    key: "afterRender",
    value: function afterRender() {} // @todo: makes sense?

  }, {
    key: "isActive",
    value: function isActive() {
      return this.$el.parent().length > 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this._updateElement();

      var data = this.model ? this.model.toJSON() : {};
      data = this.beforeRender(data);

      var partials = _.extend({}, this.templates, this.i18n);

      var html = Mustache.render(this.template, data, partials);

      if (this.hidden) {
        this.$el.hide();
      }

      this.$el.html(html); // Adds scrollbars

      var scrollbar = this.$el.find('.scrollbar');
      scrollbar.perfectScrollbar({
        theme: 'avira'
      });
      setTimeout(function () {
        scrollbar.scrollTop(1).scrollTop(0);
        return _this2.afterRender();
      }, 0);
      return this.$el;
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      var _arr = Array.from(this.className.split(' '));

      for (var _i = 0; _i < _arr.length; _i++) {
        var className = _arr[_i];

        if (!className.length) {
          return;
        }

        this.el.classList.remove(className);
      }
    }
  }, {
    key: "remove",
    value: function remove() {
      this.$el.empty();
      this.undelegateEvents();
      return this.stopListening();
    }
  }, {
    key: "initSubviewCreators",
    value: function initSubviewCreators() {
      var _this3 = this;

      Object.keys(this.subviewConstructors).forEach(function (subviewName) {
        var SubviewConstructor = _this3.subviewConstructors[subviewName];

        if (!SubviewConstructor) {
          throw new Error("No constructor for subview ".concat(subviewName, " in ").concat(_this3.constructor.name));
        }

        if (_this3.subviewCreators[subviewName] == null) {
          _this3.subviewCreators[subviewName] = function (SubConstr) {
            return function () {
              return new SubConstr({
                i18n: _this3.i18n,
                model: _this3.model,
                vent: Backbone.Events
              });
            };
          }(SubviewConstructor);
        }
      });
    }
  }], [{
    key: "extend",
    value: function extend(protoProps, staticProps) {
      var Parent = this; // On dev environment classes are not transpiled, which breaks Backbone's extend function
      // this extends it by using classes extension

      var Child =
      /*#__PURE__*/
      function (_Parent) {
        (0, _inherits2.default)(ChildClass, _Parent);

        function ChildClass() {
          (0, _classCallCheck2.default)(this, ChildClass);
          return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf3.default)(ChildClass).apply(this, arguments));
        }

        return ChildClass;
      }(Parent);

      _.extend(Child.prototype, protoProps);

      _.extend(Child, Parent, staticProps);

      Child.__super__ = Parent.prototype;
      return Child;
    }
  }]);
  return View;
}(Backbone.View);

View.prototype.TRANSITION_DURATION = 200;
View.prototype.templates = {};
View.prototype.subviewCreators = {};
View.prototype.subviewConstructors = {};
View.prototype.className = '';
module.exports = View;
},{"@babel/runtime/helpers/assertThisInitialized":3,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"backbone":20,"backbone-subviews":18,"content/Models/I18n":175,"core-js/modules/es6.array.find":102,"core-js/modules/es6.array.for-each":103,"core-js/modules/es6.array.from":104,"core-js/modules/es6.array.iterator":106,"core-js/modules/es6.date.to-json":107,"core-js/modules/es6.function.bind":109,"core-js/modules/es6.function.name":110,"core-js/modules/es6.object.keys":111,"core-js/modules/es6.regexp.split":116,"core-js/modules/es6.string.iterator":119,"core-js/modules/web.dom.iterable":122,"mustache":"mustache","perfect-scrollbar/jquery":130,"underscore":151}],202:[function(require,module,exports){
"use strict";

var _ = require('underscore');

var config = require('config');

var Locale = require('Locale');

var messenger = require('content/messagingInterface');

var LOCALES = require('Locales');

var getLocaleStrings = function getLocaleStrings(callback) {
  var locale = new Locale(config, messenger);
  return locale.retrieve(function (language) {
    var strings = _.extend({}, LOCALES[config.default_language], LOCALES[language]);

    return callback(strings, language);
  });
};

module.exports = {
  getLocaleStrings: getLocaleStrings,
  LOCALES: LOCALES
};
},{"Locale":171,"Locales":172,"config":173,"content/messagingInterface":203,"underscore":151}],203:[function(require,module,exports){
"use strict";

var ContentMessenger = require('messenger/Content');

var contentMessenger = ContentMessenger.getInstance();
module.exports = contentMessenger;
},{"messenger/Content":123}],204:[function(require,module,exports){
"use strict";

var messenger = require('content/messagingInterface');

var Mixpanel = {
  track: function track(event, properties, callback) {
    return messenger.publish('Mixpanel:track', {
      event: event,
      properties: properties
    }, callback);
  }
};
module.exports = Mixpanel;
},{"content/messagingInterface":203}],205:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Ciuvo = require('modules/offers/content/iframe/models/Ciuvo');

var State = require('content/Models/State');

var OffersRouter = require('modules/offers/content/iframe/routers/Offers');

var messenger = require('content/messagingInterface');

var AppOffers =
/*#__PURE__*/
function () {
  function AppOffers() {
    (0, _classCallCheck2.default)(this, AppOffers);
    this.state = State.getInstance();
    this.ciuvo = Ciuvo.getInstance();
    this.router = new OffersRouter();
  }

  (0, _createClass2.default)(AppOffers, [{
    key: "ciuvoNotifications",
    value: function ciuvoNotifications() {
      return this.ciuvo.get('notification');
    }
  }, {
    key: "_enable",
    value: function _enable(isStartupOffersAllowed) {
      this.state.set('offersActive', true);

      if (this.ciuvo.isBrowserStartUpOffers() && isStartupOffersAllowed) {
        return;
      }

      var offerType = this.ciuvoNotifications().get('type');
      var route = offerType === 'singleCoupon' ? 'offers/coupon' : 'offers/minimized';
      messenger.publish('router:navigateTo', {
        route: route
      });
    }
  }, {
    key: "enable",
    value: function enable(isStartupOffersAllowed) {
      var _this = this;

      if (this.ciuvoNotifications()) {
        return this._enable(isStartupOffersAllowed);
      }

      return this.ciuvo.on('change:notification', function () {
        if (_this.ciuvoNotifications()) {
          _this._enable(isStartupOffersAllowed);
        }
      });
    }
  }]);
  return AppOffers;
}();

module.exports = AppOffers;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":10,"content/Models/State":178,"content/messagingInterface":203,"modules/offers/content/iframe/models/Ciuvo":209,"modules/offers/content/iframe/routers/Offers":212}],206:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/* eslint no-restricted-globals: 0 */

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var ms = require('ms');

var messenger = require('content/messagingInterface');

var Scraper = require('modules/offers/content/Scraper');

var Offers =
/*#__PURE__*/
function () {
  function Offers() {
    (0, _classCallCheck2.default)(this, Offers);
    this._onScrapingLoaded = this._onScrapingLoaded.bind(this);
  }

  (0, _createClass2.default)(Offers, [{
    key: "start",
    value: function start() {
      return messenger.publish('AO:contentReady', {
        url: location.href
      }, this._onScrapingLoaded);
    }
  }, {
    key: "_onScrapingLoaded",
    value: function _onScrapingLoaded(data) {
      var _this = this;

      if (data) {
        this._scrapePage(data);

        if (data.rescrape) {
          this._addLocationListener(function () {
            return _this._scrapePage(data);
          });
        }
      }
    }
  }, {
    key: "_addLocationListener",
    value: function _addLocationListener(callback) {
      var _this2 = this;

      var prevLocation = location.toString(); //

      var checkLocation = function checkLocation() {
        if (location.toString() !== prevLocation) {
          prevLocation = location.toString();
          setTimeout(callback, _this2._DELAY_BEFORE_RECHECK);
        }
      };

      setInterval(checkLocation, this._LOCATION_CHECK_INTERVAL);
    }
  }, {
    key: "_scrapePage",
    value: function _scrapePage(data) {
      var scraper = new Scraper(document, data);
      var scrapingResultData = {
        url: location.href,
        data: null,
        js_data: scraper.scrapeJS(),
        xpath_data: scraper.scrapeXPath()
      };
      var previousDataJSON = null; // csl is async

      var onError = function onError() {
        // data might be set, if the page has changed and csl has a refresh timer set
        scrapingResultData.data = null;
        messenger.publish('AO:pageScraped', scrapingResultData);
      };

      var onSuccess = function onSuccess(cslData) {
        // This should not be necessary but there have been reports that multiple calls are being made
        // with the same data, this might stop it from being send to the backend
        var dataJSON = JSON.stringify(cslData);

        if (previousDataJSON === null || dataJSON !== previousDataJSON) {
          previousDataJSON = dataJSON;
          scrapingResultData.data = cslData;
          messenger.publish('AO:pageScraped', scrapingResultData);
        }
      };

      scraper.scrapeCSL(onSuccess, onError);
    }
  }, {
    key: "_isEmptyObject",
    value: function _isEmptyObject(obj) {
      return !obj || Object.keys(obj).length === 0;
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype._LOCATION_CHECK_INTERVAL = ms('0.5s');
      this.prototype._DELAY_BEFORE_RECHECK = ms('2s');
      this.prototype._JS_SCRIPT_ID = 'avira-offers-js-expressions';
    }
  }]);
  return Offers;
}();

Offers.initClass();
module.exports = Offers;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":10,"content/messagingInterface":203,"core-js/modules/es6.array.iterator":106,"core-js/modules/es6.date.to-string":108,"core-js/modules/es6.function.bind":109,"core-js/modules/es6.object.keys":111,"core-js/modules/es6.regexp.to-string":117,"core-js/modules/web.dom.iterable":122,"modules/offers/content/Scraper":207,"ms":129}],207:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var ciuvoSDK = require('ciuvo/ciuvo-addon-sdk.min');

var Scraper =
/*#__PURE__*/
function () {
  function Scraper(document, data) {
    (0, _classCallCheck2.default)(this, Scraper);
    this.document = document;

    if (data == null) {
      data = {};
    } // eslint-disable-line no-param-reassign


    this.xpath = data.xpath_expressions;
    this.js_expressions = data.js_expressions;
    this.csl = data.csl;
    this.xpath_required = data.xpath_required != null ? data.xpath_required : [];
    this.js_required = data.js_required != null ? data.js_required : [];
  }

  (0, _createClass2.default)(Scraper, [{
    key: "_parseXPathResult",
    value: function _parseXPathResult(result) {
      // eslint-disable-line complexity
      var value = null;

      if (result.resultType === 1) {
        value = result.numberValue.toString();
      } else if (result.resultType === 2) {
        value = result.stringValue;
      } else if (result.resultType === 3) {
        value = result.booleanValue.toString();
      } else {
        var currentNode = result.iterateNext();

        if (!currentNode) {
          return false;
        }

        if (currentNode.textContent) {
          value = currentNode.textContent;
        } else if (currentNode.innerText) {
          value = currentNode.innerText;
        } else if (currentNode.value) {
          value = currentNode.value;
        } else if (currentNode.text) {
          value = currentNode.text;
        } else {
          return null;
        }
      }

      return value;
    }
  }, {
    key: "scrapeXPath",
    value: function scrapeXPath() {
      var _this = this;

      if (!this.xpath) {
        return null;
      }

      var result = {};

      try {
        Object.entries(this.xpath).forEach(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              key = _ref2[0],
              xpath = _ref2[1];

          var xpathResult = _this.document.evaluate(xpath, _this.document, null, XPathResult.ANY_TYPE, null);

          result[key] = _this._parseXPathResult(xpathResult);
        });
      } catch (e) {
        return null;
      }

      if (this._containsKeys(result, this.xpath_required)) {
        return result;
      }

      return null;
    }
  }, {
    key: "scrapeCSL",
    value: function scrapeCSL(success, error) {
      try {
        // If the scraping logic contains a call to the refresh function, the success and
        // error callback might be called multiple times. This happens whenever the scraping
        // returns a different result than the previous one.
        var interpreter = new ciuvoSDK.Interpreter(window, success, error);
        return interpreter.interpret(this.csl);
      } catch (e) {
        return error(e);
      }
    }
  }, {
    key: "scrapeJS",
    value: function scrapeJS() {
      if (!this.js_expressions) {
        return null;
      }

      var script = this.document.createElement('script');
      var container = this.document.head || this.document.body;
      var id = "offers-".concat((0 | Math.random() * 9e6).toString(36)); // eslint-disable-line no-bitwise

      script.setAttribute('id', id);

      var scriptContent = this._generateScriptContent(this.js_expressions, id);

      var scriptContentNode = this.document.createTextNode(scriptContent);
      script.appendChild(scriptContentNode);
      container.appendChild(script);
      var resultJSON = script.getAttribute('result');
      container.removeChild(script);
      var result = JSON.parse(resultJSON);

      if (this._containsKeys(result, this.js_required)) {
        return result;
      }

      return null;
    }
  }, {
    key: "_containsKeys",
    value: function _containsKeys(objToInspect, requiredFields) {
      var _arr = Array.from(requiredFields);

      for (var _i = 0; _i < _arr.length; _i++) {
        var key = _arr[_i];

        if (!objToInspect[key]) {
          return false;
        }
      }

      return true;
    } // phantomJS and IE do not have document.currentScript

  }, {
    key: "_generateScriptContent",
    value: function _generateScriptContent(expressions, id) {
      var script = "(function() {\n   var result = {};";
      Object.entries(expressions).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            key = _ref4[0],
            exp = _ref4[1];

        script += "try {\nresult[\"".concat(key, "\"] = ").concat(exp, ";\n} catch (e) {\n}");
      });
      script += "  try {\n    document.querySelector(\"#".concat(id, "\").setAttribute('result', JSON.stringify(result));\n  } catch (e) {\n  }\n})();");
      return script;
    }
  }]);
  return Scraper;
}();

module.exports = Scraper;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/slicedToArray":15,"ciuvo/ciuvo-addon-sdk.min":21,"core-js/modules/es6.array.for-each":103,"core-js/modules/es6.array.from":104,"core-js/modules/es6.array.iterator":106,"core-js/modules/es6.date.to-string":108,"core-js/modules/es6.regexp.to-string":117,"core-js/modules/es6.string.iterator":119,"core-js/modules/es7.object.entries":121,"core-js/modules/web.dom.iterable":122}],208:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.date.to-json");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var Backbone = require('backbone');

var messenger = require('content/messagingInterface');

var CiuvoProduct = require('modules/offers/content/iframe/models/CiuvoProduct');

var CiuvoProducts =
/*#__PURE__*/
function (_Backbone$Collection) {
  (0, _inherits2.default)(CiuvoProducts, _Backbone$Collection);

  function CiuvoProducts() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, CiuvoProducts);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(CiuvoProducts)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._onCouponSelected = _this._onCouponSelected.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(CiuvoProducts, [{
    key: "initialize",
    value: function initialize() {
      messenger.subscribe('AO:couponSelected', this._onCouponSelected);
    }
  }, {
    key: "_onCouponSelected",
    value: function _onCouponSelected(params) {
      var id = params[0];
      var coupon = this.find(function (c) {
        return "".concat(c.get('id')) === id;
      });
      messenger.publish('AO:openCoupon', coupon.toJSON());
    }
  }, {
    key: "model",
    get: function get() {
      return CiuvoProduct;
    }
  }]);
  return CiuvoProducts;
}(Backbone.Collection);

module.exports = CiuvoProducts;
},{"@babel/runtime/helpers/assertThisInitialized":3,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"backbone":20,"content/messagingInterface":203,"core-js/modules/es6.array.find":102,"core-js/modules/es6.date.to-json":107,"core-js/modules/es6.function.bind":109,"modules/offers/content/iframe/models/CiuvoProduct":211}],209:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.date.to-json");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

/* global document, window */
var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var messenger = require('content/messagingInterface');

var mixpanel = require('content/mixpanel');

var Offers = require('modules/offers/content/Offers');

var CiuvoProductsCollection = require('modules/offers/content/iframe/collections/CiuvoProduct');

var CiuvoNotificationModel = require('modules/offers/content/iframe/models/CiuvoNotification'); // For the sake of compatibility with Offers JS, which wants to run ABS.run() in global
// and depends on jquery and underscore.


window.ABS = {};
window.$ = $;
window._ = require('underscore');

var Ciuvo =
/*#__PURE__*/
function (_Backbone$Model) {
  (0, _inherits2.default)(Ciuvo, _Backbone$Model);

  function Ciuvo() {
    (0, _classCallCheck2.default)(this, Ciuvo);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Ciuvo).apply(this, arguments));
  }

  (0, _createClass2.default)(Ciuvo, [{
    key: "initialize",
    value: function initialize() {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_get2 = (0, _get3.default)((0, _getPrototypeOf2.default)(Ciuvo.prototype), "initialize", this)).call.apply(_get2, [this].concat(args));

      this._onData = this._onData.bind(this);
      this.set('products', new CiuvoProductsCollection());
      messenger.subscribe('AO:data', this._onData); // Firefox messenger is synchronous, so CIUVO:data is also called
      // synchronously. Setting any timeout allows router and views to be initialized

      setTimeout(function () {
        return messenger.publish('AO:ready');
      }, 10);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        notification: this.get('notification') && this.get('notification').toJSON() || null,
        products: this.get('products').toJSON(),
        meta: this.get('meta')
      };
    }
  }, {
    key: "_onData",
    value: function _onData(req, res, sender) {
      var _this = this;

      if (!req.products.length) {
        this.set('notification', null);
        return;
      }

      if (req.javascript) {
        var oneTimeRun = function oneTimeRun(fn) {
          fn(Offers);

          _this._setData(req, res, sender);

          delete window.ABS.run;
        };

        window.ABS.run = oneTimeRun;
        $.getScript(req.javascript);
      } else {
        this._setData(req, res, sender);
      }

      if (req.stylesheet) {
        $('<link>', {
          rel: 'stylesheet',
          type: 'text/css',
          href: req.stylesheet
        }).appendTo(document.head);
      }
    }
  }, {
    key: "_setData",
    value: function _setData(req) {
      this.set('templates', req.templates);
      this.set('javascript', req.javascript);
      this.set('template_ids', req.template_ids);
      this.set('ftu_savings_threshold', req.config && req.config.ftu_savings_threshold || '0');
      this.get('products').set(_.sortBy(req.products, 'price'));
      this.set('meta', req.meta);
      if (req.products.length === 0) return;
      mixpanel.track('Offers - Indicator - Show', req.meta);
      this.set('notification', new CiuvoNotificationModel(this.get('products').first().toJSON()));
    }
  }, {
    key: "isBrowserStartUpOffers",
    value: function isBrowserStartUpOffers() {
      return this.get('meta').campaign_name === 'Browser Start-Up';
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new this();
      }

      return this.instance;
    }
  }]);
  return Ciuvo;
}(Backbone.Model);

module.exports = Ciuvo;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"backbone":20,"content/messagingInterface":203,"content/mixpanel":204,"core-js/modules/es6.date.to-json":107,"core-js/modules/es6.function.bind":109,"jquery":"jquery","modules/offers/content/Offers":206,"modules/offers/content/iframe/collections/CiuvoProduct":208,"modules/offers/content/iframe/models/CiuvoNotification":210,"underscore":151}],210:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var Backbone = require('backbone');

var CiuvoNotification =
/*#__PURE__*/
function (_Backbone$Model) {
  (0, _inherits2.default)(CiuvoNotification, _Backbone$Model);

  function CiuvoNotification() {
    (0, _classCallCheck2.default)(this, CiuvoNotification);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CiuvoNotification).apply(this, arguments));
  }

  (0, _createClass2.default)(CiuvoNotification, [{
    key: "initialize",
    value: function initialize() {
      var saving = this.get('saving') || '0%';
      this.set('best_percentage', saving);
    }
  }]);
  return CiuvoNotification;
}(Backbone.Model);

module.exports = CiuvoNotification;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"backbone":20}],211:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var Backbone = require('backbone');

var CiuvoProduct =
/*#__PURE__*/
function (_Backbone$Model) {
  (0, _inherits2.default)(CiuvoProduct, _Backbone$Model);

  function CiuvoProduct() {
    (0, _classCallCheck2.default)(this, CiuvoProduct);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CiuvoProduct).apply(this, arguments));
  }

  return CiuvoProduct;
}(Backbone.Model);

module.exports = CiuvoProduct;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"backbone":20}],212:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var RouterBase = require('content/core/Routing/Router');

var OffersIndicatorBar = require('modules/offers/content/iframe/views/OffersIndicatorBar');

var OffersTour = require('modules/offers/content/iframe/views/OffersTour');

var OffersDash = require('modules/offers/content/iframe/views/OffersDash');

var CouponIndicatorBar = require('modules/offers/content/iframe/views/CouponIndicatorBar');

var CouponDash = require('modules/offers/content/iframe/views/CouponDash');

var OffersRouter =
/*#__PURE__*/
function (_RouterBase) {
  (0, _inherits2.default)(OffersRouter, _RouterBase);

  function OffersRouter() {
    (0, _classCallCheck2.default)(this, OffersRouter);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(OffersRouter).apply(this, arguments));
  }

  (0, _createClass2.default)(OffersRouter, [{
    key: "offersTour",
    value: function offersTour() {
      return this.setAreas({
        indicators: new OffersIndicatorBar(),
        tour: new OffersTour()
      });
    }
  }, {
    key: "offersMinimized",
    value: function offersMinimized() {
      return this.setAreas({
        indicators: new OffersIndicatorBar()
      });
    }
  }, {
    key: "offers",
    value: function offers() {
      return this.setAreas({
        indicators: new OffersIndicatorBar(),
        dashItem: new OffersDash()
      });
    }
  }, {
    key: "coupon",
    value: function coupon() {
      return this.setAreas({
        indicators: new CouponIndicatorBar()
      });
    }
  }, {
    key: "couponHelp",
    value: function couponHelp() {
      return this.setAreas({
        indicators: new CouponIndicatorBar(),
        dashItem: new CouponDash()
      });
    }
  }, {
    key: "routes",
    get: function get() {
      return {
        'offers/tour': 'offersTour',
        'offers/minimized': 'offersMinimized',
        'offers/coupon': 'coupon',
        'offers/coupon/help': 'couponHelp',
        'offers(/:type)': 'offers'
      };
    }
  }]);
  return OffersRouter;
}(RouterBase);

OffersRouter.initClass();
module.exports = OffersRouter;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/core/Routing/Router":198,"modules/offers/content/iframe/views/CouponDash":215,"modules/offers/content/iframe/views/CouponIndicatorBar":217,"modules/offers/content/iframe/views/OffersDash":218,"modules/offers/content/iframe/views/OffersIndicatorBar":220,"modules/offers/content/iframe/views/OffersTour":221}],213:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var Base = require('content/core/Transitions/Base');

var OffersIndicatorBar = require('modules/offers/content/iframe/views/OffersIndicatorBar');

var OffersIndicatorBarTransition =
/*#__PURE__*/
function (_Base) {
  (0, _inherits2.default)(OffersIndicatorBarTransition, _Base);

  function OffersIndicatorBarTransition() {
    (0, _classCallCheck2.default)(this, OffersIndicatorBarTransition);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(OffersIndicatorBarTransition).apply(this, arguments));
  }

  (0, _createClass2.default)(OffersIndicatorBarTransition, [{
    key: "execute",
    value: function execute(callback) {
      this.from.$el.attr('class', '');
      this.from.remove();
      this.to.render();
      this.to.show();
      callback();
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.from = OffersIndicatorBar;
      this.to = OffersIndicatorBar;
      this.weight = 10;
    }
  }]);
  return OffersIndicatorBarTransition;
}(Base);

OffersIndicatorBarTransition.initClass();
module.exports = OffersIndicatorBarTransition;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/core/Transitions/Base":199,"modules/offers/content/iframe/views/OffersIndicatorBar":220}],214:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var Default = require('content/Transitions/Default');

var OffersDashView = require('modules/offers/content/iframe/views/OffersDash');

var OffersDashTransition =
/*#__PURE__*/
function (_Default) {
  (0, _inherits2.default)(OffersDashTransition, _Default);

  function OffersDashTransition() {
    (0, _classCallCheck2.default)(this, OffersDashTransition);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(OffersDashTransition).apply(this, arguments));
  }

  (0, _createClass2.default)(OffersDashTransition, [{
    key: "_handoverViewElement",
    value: function _handoverViewElement() {
      // rendering into the old element will avoid flickering of the list between states
      return this.to.setElement(this.from.$el);
    }
  }, {
    key: "execute",
    value: function execute(callback) {
      this._handoverViewElement();

      if (typeof callback === 'function') callback();
      return this.to.render();
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.from = OffersDashView;
      this.to = OffersDashView;
      this.weight = 20;
    }
  }]);
  return OffersDashTransition;
}(Default);

OffersDashTransition.initClass();
module.exports = OffersDashTransition;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Transitions/Default":182,"modules/offers/content/iframe/views/OffersDash":218}],215:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var OffersDash = require('modules/offers/content/iframe/views/OffersDash');

var CouponDash =
/*#__PURE__*/
function (_OffersDash) {
  (0, _inherits2.default)(CouponDash, _OffersDash);

  function CouponDash() {
    (0, _classCallCheck2.default)(this, CouponDash);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CouponDash).apply(this, arguments));
  }

  (0, _createClass2.default)(CouponDash, null, [{
    key: "initClass",
    value: function initClass() {
      this.prototype.AO_TEMPLATE = 'help';
    }
  }]);
  return CouponDash;
}(OffersDash);

CouponDash.initClass();
module.exports = CouponDash;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"modules/offers/content/iframe/views/OffersDash":218}],216:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var OffersIndicator = require('modules/offers/content/iframe/views/OffersIndicator');

var CouponIndicator =
/*#__PURE__*/
function (_OffersIndicator) {
  (0, _inherits2.default)(CouponIndicator, _OffersIndicator);

  function CouponIndicator() {
    (0, _classCallCheck2.default)(this, CouponIndicator);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CouponIndicator).apply(this, arguments));
  }

  (0, _createClass2.default)(CouponIndicator, null, [{
    key: "initClass",
    value: function initClass() {
      this.prototype.AO_TEMPLATE = 'coupon';
    }
  }]);
  return CouponIndicator;
}(OffersIndicator);

CouponIndicator.initClass();
module.exports = CouponIndicator;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"modules/offers/content/iframe/views/OffersIndicator":219}],217:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var OffersIndicatorBar = require('modules/offers/content/iframe/views/OffersIndicatorBar');

var CouponIndicator = require('modules/offers/content/iframe/views/CouponIndicator');

var CloseView = require('content/Views/Indicators/Close');

var CouponIndicatorBar =
/*#__PURE__*/
function (_OffersIndicatorBar) {
  (0, _inherits2.default)(CouponIndicatorBar, _OffersIndicatorBar);

  function CouponIndicatorBar() {
    (0, _classCallCheck2.default)(this, CouponIndicatorBar);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CouponIndicatorBar).apply(this, arguments));
  }

  (0, _createClass2.default)(CouponIndicatorBar, null, [{
    key: "initClass",
    value: function initClass() {
      this.prototype.subviewConstructors = {
        Offers: CouponIndicator,
        Close: CloseView
      };
    }
  }]);
  return CouponIndicatorBar;
}(OffersIndicatorBar);

CouponIndicatorBar.initClass();
module.exports = CouponIndicatorBar;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Views/Indicators/Close":186,"modules/offers/content/iframe/views/CouponIndicator":216,"modules/offers/content/iframe/views/OffersIndicatorBar":220}],218:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var DashTabView = require('content/Views/Dash/TabView');

var OffersMixin = require('modules/offers/content/iframe/views/mixins/Offers');

var Ciuvo = require('modules/offers/content/iframe/models/Ciuvo');

var OffersDash =
/*#__PURE__*/
function (_DashTabView) {
  (0, _inherits2.default)(OffersDash, _DashTabView);

  function OffersDash() {
    (0, _classCallCheck2.default)(this, OffersDash);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(OffersDash).apply(this, arguments));
  }

  (0, _createClass2.default)(OffersDash, [{
    key: "initialize",
    value: function initialize() {
      var _get2,
          _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_get2 = (0, _get3.default)((0, _getPrototypeOf2.default)(OffersDash.prototype), "initialize", this)).call.apply(_get2, [this].concat(args));

      this.model = Ciuvo.getInstance();
      OffersMixin.add(this);
      this.model.once('change:templates', function () {
        _this.view.setTemplate();

        _this.render();
      });
      return this.listenTo(this.model, 'change', this.render);
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype.id = 'dashItemArea';
      this.prototype.className = 'dash-tab dash-tab-popup dash-tab-positioned';
      this.prototype.AO_TEMPLATE = 'listing';
    }
  }]);
  return OffersDash;
}(DashTabView);

OffersDash.initClass();
module.exports = OffersDash;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Views/Dash/TabView":185,"modules/offers/content/iframe/models/Ciuvo":209,"modules/offers/content/iframe/views/mixins/Offers":222}],219:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get4 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var Indicator = require('content/Views/Indicators/Indicator');

var OffersMixin = require('modules/offers/content/iframe/views/mixins/Offers');

var Ciuvo = require('modules/offers/content/iframe/models/Ciuvo');

var messenger = require('content/messagingInterface');

var $ = require('jquery');

var OffersIndicator =
/*#__PURE__*/
function (_Indicator) {
  (0, _inherits2.default)(OffersIndicator, _Indicator);

  function OffersIndicator() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, OffersIndicator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(OffersIndicator)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this._toggleDropdownButton = _this._toggleDropdownButton.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(OffersIndicator, [{
    key: "initialize",
    value: function initialize() {
      var _get2,
          _this2 = this;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_get2 = (0, _get4.default)((0, _getPrototypeOf3.default)(OffersIndicator.prototype), "initialize", this)).call.apply(_get2, [this].concat(args));

      OffersMixin.add(this);
      this.model = Ciuvo.getInstance();
      this.listenTo(this.model, 'change', this.render);
      messenger.subscribe('router:afterRouteChange', function (msg) {
        return _this2._toggleDropdownButton(msg);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _get3;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (_get3 = (0, _get4.default)((0, _getPrototypeOf3.default)(OffersIndicator.prototype), "render", this)).call.apply(_get3, [this].concat(args)); // to handle ESC press (see "offers()" in "Routers/App.coffee")


      var $moreBtn = this.$('.offers-more');
      $moreBtn.addClass('close-button');
    }
  }, {
    key: "_toggleDropdownButton",
    value: function _toggleDropdownButton(msg) {
      $('.offers-trigger.toggle-button').toggleClass('active', this._isDashRoute(msg.route));
    }
  }, {
    key: "_isDashRoute",
    value: function _isDashRoute(route) {
      return !/offers\/(minimized|tour)/.test(route);
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype.AO_TEMPLATE = 'notification';
    }
  }]);
  return OffersIndicator;
}(Indicator);

OffersIndicator.initClass();
module.exports = OffersIndicator;
},{"@babel/runtime/helpers/assertThisInitialized":3,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Views/Indicators/Indicator":187,"content/messagingInterface":203,"core-js/modules/es6.function.bind":109,"jquery":"jquery","modules/offers/content/iframe/models/Ciuvo":209,"modules/offers/content/iframe/views/mixins/Offers":222}],220:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.function.bind");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get4 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var View = require('content/core/Views/View');

var messenger = require('content/messagingInterface');

var Ciuvo = require('modules/offers/content/iframe/models/Ciuvo');

var Backbone = require('backbone');

var $ = require('jquery');

var template = require('IndicatorBarOffers.mustache');

var OffersIndicator = require('modules/offers/content/iframe/views/OffersIndicator');

var CloseView = require('content/Views/Indicators/Close');

var OffersIndicatorBar =
/*#__PURE__*/
function (_View) {
  (0, _inherits2.default)(OffersIndicatorBar, _View);

  function OffersIndicatorBar() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, OffersIndicatorBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(OffersIndicatorBar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.highlightActiveLinks = _this.highlightActiveLinks.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(OffersIndicatorBar, [{
    key: "initialize",
    value: function initialize() {
      var _get2,
          _this2 = this;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_get2 = (0, _get4.default)((0, _getPrototypeOf3.default)(OffersIndicatorBar.prototype), "initialize", this)).call.apply(_get2, [this].concat(args));

      this.vent.trigger('esc:on', this._close);
      this.model = Ciuvo.getInstance(); // if nothing to show, e.g. on rescraping, leave offers

      return this.listenTo(this.model, 'change', function (model) {
        if (!model.get('notification')) {
          _this2._close();
        }
      });
    }
  }, {
    key: "highlightActiveLinks",
    value: function highlightActiveLinks() {
      var route = Backbone.history.getFragment();
      this.$('a').removeClass('active');
      return this.$("a[href='#".concat(route, "']")).addClass('active');
    }
  }, {
    key: "toggleSubviews",
    value: function toggleSubviews() {
      return this._toggleSubviewsByName(['Offers'], true);
    }
  }, {
    key: "calculateWidth",
    value: function calculateWidth() {
      return this.$el.find('.indicator-group:visible').outerWidth();
    }
  }, {
    key: "show",
    value: function show() {
      var _this3 = this,
          _get3;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var cb = args[0];

      if (cb == null) {
        cb = function cb() {};
      }

      this._toggleProperties();

      this.highlightActiveLinks(); // the dash bg is shown/hidden based on the state of the top bar

      this.$el.addClass('shown');
      this.$el.finish().animate({
        'margin-top': '0px'
      }, this.TRANSITION_DURATION, 'linear', function () {
        messenger.publish('indicatorBar:widthChanged', _this3.calculateWidth());
        return cb();
      });
      return (_get3 = (0, _get4.default)((0, _getPrototypeOf3.default)(OffersIndicatorBar.prototype), "show", this)).call.apply(_get3, [this].concat(args));
    }
  }, {
    key: "hide",
    value: function hide(callback) {
      var cb = callback;

      if (cb == null) {
        cb = function cb() {};
      }

      this.$el.removeClass('shown');
      this.$el.finish().animate({
        'margin-top': "".concat(-this.BAR_HEIGHT, "px")
      }, this.TRANSITION_DURATION, 'linear', cb);
    }
  }, {
    key: "_passOrNavigateToBackRoute",
    value: function _passOrNavigateToBackRoute(e) {
      var $link = $(e.currentTarget);
      var route = $link.data('backRoute') || '';
      messenger.publish('router:navigateTo', {
        route: route
      });
      return false;
    }
  }, {
    key: "_toggleProperties",
    value: function _toggleProperties() {
      var closeButton = this.subviews.Close;
      closeButton.show();
      closeButton.for_offers_bar = true;
      closeButton.for_offers_dash = false;
      closeButton.context = 'OffersIndicatorBar';
      closeButton.render();
    }
  }, {
    key: "_isModeOn",
    value: function _isModeOn(mode) {
      return this.model.get(mode);
    }
  }, {
    key: "_close",
    value: function _close() {
      return messenger.publish('router:navigateTo', {
        route: 'minimized'
      });
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype.id = 'indicatorsArea';
      this.prototype.template = template;
      this.prototype.className = 'indicators-container offers-wide state-bar';
      this.prototype.subviewConstructors = {
        Offers: OffersIndicator,
        Close: CloseView
      };
      this.prototype.BAR_HEIGHT = 46;
      this.prototype.events = {
        'click a.active, a.active-subgroup': '_passOrNavigateToBackRoute'
      };
      this.prototype._stateClasses = 'state-bar state-hidden_bar';
    }
  }]);
  return OffersIndicatorBar;
}(View);

OffersIndicatorBar.initClass();
module.exports = OffersIndicatorBar;
},{"@babel/runtime/helpers/assertThisInitialized":3,"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"IndicatorBarOffers.mustache":152,"backbone":20,"content/Views/Indicators/Close":186,"content/core/Views/View":201,"content/messagingInterface":203,"core-js/modules/es6.array.find":102,"core-js/modules/es6.function.bind":109,"jquery":"jquery","modules/offers/content/iframe/models/Ciuvo":209,"modules/offers/content/iframe/views/OffersIndicator":219}],221:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var TourStepBase = require('content/Views/Tour/TourStepBase');

var OffersMixin = require('modules/offers/content/iframe/views/mixins/Offers');

var Ciuvo = require('modules/offers/content/iframe/models/Ciuvo');

var Tour =
/*#__PURE__*/
function (_TourStepBase) {
  (0, _inherits2.default)(Tour, _TourStepBase);

  function Tour() {
    (0, _classCallCheck2.default)(this, Tour);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Tour).apply(this, arguments));
  }

  (0, _createClass2.default)(Tour, [{
    key: "initialize",
    value: function initialize() {
      var _get2,
          _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_get2 = (0, _get3.default)((0, _getPrototypeOf2.default)(Tour.prototype), "initialize", this)).call.apply(_get2, [this].concat(args));

      this.model = Ciuvo.getInstance();
      OffersMixin.add(this);
      this.model.once('change:templates', function () {
        return _this.render();
      });
      this.model.on('change', function () {
        return _this.render();
      });
    }
  }], [{
    key: "initClass",
    value: function initClass() {
      this.prototype.AO_TEMPLATE = 'ftu';
    }
  }]);
  return Tour;
}(TourStepBase);

Tour.initClass();
module.exports = Tour;
},{"@babel/runtime/helpers/classCallCheck":4,"@babel/runtime/helpers/createClass":5,"@babel/runtime/helpers/get":7,"@babel/runtime/helpers/getPrototypeOf":8,"@babel/runtime/helpers/inherits":9,"@babel/runtime/helpers/interopRequireDefault":10,"@babel/runtime/helpers/possibleConstructorReturn":13,"content/Views/Tour/TourStepBase":191,"modules/offers/content/iframe/models/Ciuvo":209,"modules/offers/content/iframe/views/mixins/Offers":222}],222:[function(require,module,exports){
"use strict";

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.replace");

var OffersContent = require('modules/offers/content/Offers');

var messenger = require('content/messagingInterface');

var _ = require('underscore');

var OffersMixin = {
  setTemplate: function setTemplate() {
    var templates = this.model.get('templates');

    if (templates != null ? templates[this.AO_TEMPLATE] : undefined) {
      this.template = templates[this.AO_TEMPLATE];
    }
  },
  _getTemplateId: function _getTemplateId() {
    var ids = this.model.get('template_ids') || {};
    var id = ids[this.AO_TEMPLATE];

    if (id) {
      return id.replace(/#.*$/, '');
    }

    return null;
  },
  _getTemplateFunction: function _getTemplateFunction(name) {
    var func;

    var id = this._getTemplateId();

    if (!id) {
      return null;
    }

    if (OffersContent.templates && OffersContent.templates[id] && OffersContent.templates[id][name]) {
      func = OffersContent.templates[id][name];
    }

    if (typeof func !== 'function') {
      return null;
    }

    return function (data) {
      try {
        return func(data);
      } catch (e) {
        console.warn('Error running AO custom javascript ', e);
        return data;
      }
    };
  },
  aoBeforeRender: function aoBeforeRender(data) {
    var templates = this.model.get('templates');

    if (templates) {
      _.extend(this.templates, templates);
    }

    var func = this._getTemplateFunction('beforeRender');

    if (func) {
      return func(data);
    }

    return data;
  },
  aoAfterRender: function aoAfterRender() {
    var func = this._getTemplateFunction('afterRender');

    if (func) {
      func(this.el);
    }
  },
  aoOnShow: function aoOnShow() {
    var func = this._getTemplateFunction('onShow');

    if (func) {
      func(this.el);
    }
  },
  processDataBindings: function processDataBindings() {
    var _this = this;

    var _arr = ['click', 'mouseout', 'mouseover'];

    var _loop = function _loop() {
      var eventToListen = _arr[_i];

      _this.$el.find("[data-".concat(eventToListen, "]")).each(function (i, el) {
        return el.addEventListener(eventToListen, function (eventCaught) {
          var splitted = this.getAttribute("data-".concat(eventCaught.type)).split(':');
          var eventName = splitted[0];
          var params = splitted.slice(1);
          return messenger.publish("AO:".concat(eventName), params);
        }, false);
      });
    };

    for (var _i = 0; _i < _arr.length; _i++) {
      _loop();
    }

    return this.$el.find('[data-event="Offers - View"]').each(function (i, el) {
      return el.addEventListener('click', function () {
        return (// if user clicked on any offer it means he knows how to use offers feature,
          // so disable offers tour
          messenger.publish('offersTourShown')
        );
      }, false);
    });
  }
};
module.exports = {
  add: function add(obj) {
    var oldBeforeRender = obj.beforeRender;
    var oldRender = obj.render;
    var oldShow = obj.show;

    _.extend(obj, OffersMixin, {
      beforeRender: function beforeRender(data) {
        obj.setTemplate();
        return oldBeforeRender.call(obj, obj.aoBeforeRender(data));
      },
      render: function render() {
        oldRender.call(obj);
        obj.processDataBindings();
        return obj.aoAfterRender();
      },
      show: function show() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        oldShow.apply(obj, args);
        return obj.aoOnShow();
      }
    });

    return obj;
  }
};
},{"content/messagingInterface":203,"core-js/modules/es6.array.find":102,"core-js/modules/es6.function.name":110,"core-js/modules/es6.regexp.replace":115,"core-js/modules/es6.regexp.split":116,"modules/offers/content/Offers":206,"underscore":151}]},{},[193]);
