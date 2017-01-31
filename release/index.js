/**
 * angular2-data-table v"6.0.2" (https://github.com/swimlane/angular2-data-table)
 * Copyright 2016
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define("angular2-data-table", ["@angular/core", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["angular2-data-table"] = factory(require("@angular/core"), require("@angular/common"));
	else
		root["angular2-data-table"] = factory(root["@angular/core"], root["@angular/common"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/index.js?sourceMap!./src/components/datatable.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
// imports


// module
exports.push([module.i, ".ngx-datatable {\n  display: block;\n  overflow: hidden;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  -webkit-transform: translate3d(0, 0, 0);\n  /**\n   * Vertical Scrolling Adjustments\n   */\n  /**\n   * Horizontal Scrolling Adjustments\n   */\n  /**\n   * Fixed Header Height Adjustments\n   */\n  /**\n   * Fixed row height adjustments\n   */\n  /**\n   * Shared Styles\n   */\n  /**\n   * Header Styles\n   */\n  /**\n   * Body Styles\n   */\n  /**\n   * Footer Styles\n   */ }\n  .ngx-datatable [hidden] {\n    display: none !important; }\n  .ngx-datatable *, .ngx-datatable *:before, .ngx-datatable *:after {\n    box-sizing: border-box; }\n  .ngx-datatable.scroll-vertical .datatable-body {\n    overflow-y: auto; }\n    .ngx-datatable.scroll-vertical .datatable-body .datatable-row-wrapper {\n      position: absolute; }\n  .ngx-datatable.scroll-horz .datatable-body {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n  .ngx-datatable.fixed-header .datatable-header .datatable-header-inner {\n    white-space: nowrap; }\n    .ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n  .ngx-datatable.fixed-row .datatable-scroll {\n    white-space: nowrap; }\n    .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row {\n      white-space: nowrap; }\n      .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; }\n  .ngx-datatable .datatable-body-row,\n  .ngx-datatable .datatable-header-inner {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-flow: row;\n    -o-flex-flow: row;\n    flex-flow: row; }\n  .ngx-datatable .datatable-body-cell,\n  .ngx-datatable .datatable-header-cell {\n    vertical-align: top;\n    display: inline-block;\n    line-height: 1.625;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -o-user-select: none;\n    user-select: none; }\n    .ngx-datatable .datatable-body-cell:focus,\n    .ngx-datatable .datatable-header-cell:focus {\n      outline: none; }\n  .ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-right {\n    z-index: 9; }\n  .ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-center,\n  .ngx-datatable .datatable-row-right {\n    position: relative; }\n  .ngx-datatable .datatable-header {\n    display: block;\n    overflow: hidden; }\n    .ngx-datatable .datatable-header .datatable-header-inner {\n      -webkit-box-align: stretch;\n          -ms-flex-align: stretch;\n              align-items: stretch;\n      -webkit-align-items: stretch; }\n    .ngx-datatable .datatable-header .datatable-header-cell {\n      position: relative;\n      display: inline-block; }\n      .ngx-datatable .datatable-header .datatable-header-cell.longpress {\n        cursor: move; }\n      .ngx-datatable .datatable-header .datatable-header-cell.sortable {\n        cursor: pointer; }\n      .ngx-datatable .datatable-header .datatable-header-cell .sort-btn {\n        line-height: 100%;\n        vertical-align: middle;\n        display: inline-block; }\n      .ngx-datatable .datatable-header .datatable-header-cell .resize-handle {\n        display: inline-block;\n        position: absolute;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        width: 5px;\n        padding: 0 8px;\n        visibility: hidden;\n        cursor: ew-resize; }\n      .ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle {\n        visibility: visible; }\n  .ngx-datatable .datatable-body {\n    position: relative;\n    z-index: 10;\n    display: block; }\n    .ngx-datatable .datatable-body .datatable-scroll {\n      display: inline-block; }\n    .ngx-datatable .datatable-body .datatable-row-detail {\n      overflow-y: hidden; }\n    .ngx-datatable .datatable-body .datatable-row-wrapper {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n    .ngx-datatable .datatable-body .datatable-body-row {\n      outline: none; }\n      .ngx-datatable .datatable-body .datatable-body-row > div {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n  .ngx-datatable .datatable-footer {\n    display: block;\n    width: 100%; }\n    .ngx-datatable .datatable-footer > div {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      width: 100%; }\n    .ngx-datatable .datatable-footer .page-count {\n      display: inline-block;\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 20%;\n              flex: 1 1 20%; }\n    .ngx-datatable .datatable-footer .datatable-pager {\n      display: inline-block;\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 80%;\n              flex: 1 1 80%;\n      text-align: right; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager,\n      .ngx-datatable .datatable-footer .datatable-pager .pager li {\n        padding: 0;\n        margin: 0;\n        display: inline-block;\n        list-style: none; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li, .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        outline: none; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        cursor: pointer;\n        display: inline-block; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a {\n        cursor: not-allowed; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ "./node_modules/rxjs/Observable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var toSubscriber_1 = __webpack_require__("./node_modules/rxjs/util/toSubscriber.js");
var observable_1 = __webpack_require__("./node_modules/rxjs/symbol/observable.js");
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this._subscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.$$observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/Observer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),

/***/ "./node_modules/rxjs/Subscriber.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__("./node_modules/rxjs/util/isFunction.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var Observer_1 = __webpack_require__("./node_modules/rxjs/Observer.js");
var rxSubscriber_1 = __webpack_require__("./node_modules/rxjs/symbol/rxSubscriber.js");
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
        _super.call(this);
        this._parent = _parent;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            context = observerOrNext;
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (isFunction_1.isFunction(context.unsubscribe)) {
                this.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = this.unsubscribe.bind(this);
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parent = this._parent;
            if (!_parent.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parent, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._error) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parent.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parent.syncErrorValue = err;
                _parent.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._complete) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._complete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parent = this._parent;
        this._context = null;
        this._parent = null;
        _parent.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/Subscription.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
var isObject_1 = __webpack_require__("./node_modules/rxjs/util/isObject.js");
var isFunction_1 = __webpack_require__("./node_modules/rxjs/util/isFunction.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var UnsubscriptionError_1 = __webpack_require__("./node_modules/rxjs/util/UnsubscriptionError.js");
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        this.closed = true;
        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this._subscriptions = null;
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var sub = teardown;
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(teardown);
            case 'object':
                if (sub.closed || typeof sub.unsubscribe !== 'function') {
                    return sub;
                }
                else if (this.closed) {
                    sub.unsubscribe();
                    return sub;
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var childSub = new ChildSubscription(sub, this);
        this._subscriptions = this._subscriptions || [];
        this._subscriptions.push(childSub);
        return childSub;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        // HACK: This might be redundant because of the logic in `add()`
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
var ChildSubscription = (function (_super) {
    __extends(ChildSubscription, _super);
    function ChildSubscription(_innerSub, _parent) {
        _super.call(this);
        this._innerSub = _innerSub;
        this._parent = _parent;
    }
    ChildSubscription.prototype._unsubscribe = function () {
        var _a = this, _innerSub = _a._innerSub, _parent = _a._parent;
        _parent.remove(this);
        _innerSub.unsubscribe();
    };
    return ChildSubscription;
}(Subscription));
exports.ChildSubscription = ChildSubscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),

/***/ "./node_modules/rxjs/add/observable/fromEvent.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var fromEvent_1 = __webpack_require__("./node_modules/rxjs/observable/fromEvent.js");
Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
//# sourceMappingURL=fromEvent.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/FromEventObservable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var tryCatch_1 = __webpack_require__("./node_modules/rxjs/util/tryCatch.js");
var isFunction_1 = __webpack_require__("./node_modules/rxjs/util/isFunction.js");
var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var Subscription_1 = __webpack_require__("./node_modules/rxjs/Subscription.js");
var toString = Object.prototype.toString;
function isNodeStyleEventEmmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}
function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}
function isNodeList(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object NodeList]';
}
function isHTMLCollection(sourceObj) {
    return !!sourceObj && toString.call(sourceObj) === '[object HTMLCollection]';
}
function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromEventObservable = (function (_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector, options) {
        _super.call(this);
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.selector = selector;
        this.options = options;
    }
    /* tslint:enable:max-line-length */
    /**
     * Creates an Observable that emits events of a specific type coming from the
     * given event target.
     *
     * <span class="informal">Creates an Observable from DOM events, or Node
     * EventEmitter events or others.</span>
     *
     * <img src="./img/fromEvent.png" width="100%">
     *
     * Creates an Observable by attaching an event listener to an "event target",
     * which may be an object with `addEventListener` and `removeEventListener`,
     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
     * the output Observable is subscribed, and removed when the Subscription is
     * unsubscribed.
     *
     * @example <caption>Emits clicks happening on the DOM document</caption>
     * var clicks = Rx.Observable.fromEvent(document, 'click');
     * clicks.subscribe(x => console.log(x));
     *
     * // Results in:
     * // MouseEvent object logged to console everytime a click
     * // occurs on the document.
     *
     * @see {@link from}
     * @see {@link fromEventPattern}
     *
     * @param {EventTargetLike} target The DOMElement, event target, Node.js
     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
     * @param {string} eventName The event name of interest, being emitted by the
     * `target`.
     * @param {EventListenerOptions} [options] Options to pass through to addEventListener
     * @param {SelectorMethodSignature<T>} [selector] An optional function to
     * post-process results. It takes the arguments from the event handler and
     * should return a single value.
     * @return {Observable<T>}
     * @static true
     * @name fromEvent
     * @owner Observable
     */
    FromEventObservable.create = function (target, eventName, options, selector) {
        if (isFunction_1.isFunction(options)) {
            selector = options;
            options = undefined;
        }
        return new FromEventObservable(target, eventName, selector, options);
    };
    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
        var unsubscribe;
        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
            for (var i = 0, len = sourceObj.length; i < len; i++) {
                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
            }
        }
        else if (isEventTarget(sourceObj)) {
            var source_1 = sourceObj;
            sourceObj.addEventListener(eventName, handler, options);
            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
        }
        else if (isJQueryStyleEventEmitter(sourceObj)) {
            var source_2 = sourceObj;
            sourceObj.on(eventName, handler);
            unsubscribe = function () { return source_2.off(eventName, handler); };
        }
        else if (isNodeStyleEventEmmitter(sourceObj)) {
            var source_3 = sourceObj;
            sourceObj.addListener(eventName, handler);
            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
        }
        else {
            throw new TypeError('Invalid event target');
        }
        subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function (subscriber) {
        var sourceObj = this.sourceObj;
        var eventName = this.eventName;
        var options = this.options;
        var selector = this.selector;
        var handler = selector ? function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
            if (result === errorObject_1.errorObject) {
                subscriber.error(errorObject_1.errorObject.e);
            }
            else {
                subscriber.next(result);
            }
        } : function (e) { return subscriber.next(e); };
        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
    };
    return FromEventObservable;
}(Observable_1.Observable));
exports.FromEventObservable = FromEventObservable;
//# sourceMappingURL=FromEventObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/fromEvent.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FromEventObservable_1 = __webpack_require__("./node_modules/rxjs/observable/FromEventObservable.js");
exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
//# sourceMappingURL=fromEvent.js.map

/***/ }),

/***/ "./node_modules/rxjs/symbol/observable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.$$observable = getSymbolObservable(root_1.root);
//# sourceMappingURL=observable.js.map

/***/ }),

/***/ "./node_modules/rxjs/symbol/rxSubscriber.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var Symbol = root_1.root.Symbol;
exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/UnsubscriptionError.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/errorObject.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isArray.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isFunction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/isObject.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/root.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
/**
 * window: browser in DOM main thread
 * self: browser in WebWorker
 * global: Node.js/other
 */
exports.root = (typeof window == 'object' && window.window === window && window
    || typeof self == 'object' && self.self === self && self
    || typeof global == 'object' && global.global === global && global);
if (!exports.root) {
    throw new Error('RxJS could not find any global context (window, self, global)');
}
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/rxjs/util/toSubscriber.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var rxSubscriber_1 = __webpack_require__("./node_modules/rxjs/symbol/rxSubscriber.js");
var Observer_1 = __webpack_require__("./node_modules/rxjs/Observer.js");
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/tryCatch.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__("./node_modules/rxjs/util/errorObject.js");
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/components/body/body-cell.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var utils_1 = __webpack_require__("./src/utils/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var DataTableBodyCellComponent = (function () {
    function DataTableBodyCellComponent(element) {
        this.activate = new core_1.EventEmitter();
        this.isFocused = false;
        this.element = element.nativeElement;
    }
    Object.defineProperty(DataTableBodyCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.calcSortDir = this.calcSortDir(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var cls = 'datatable-body-cell';
            if (this.column.cssClasses)
                cls += ' ' + this.column.cssClasses;
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSortActive", {
        get: function () {
            return !this.sortDir;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSortAscending", {
        get: function () {
            return this.sortDir === types_1.SortDirection.asc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSortDescending", {
        get: function () {
            return this.sortDir === types_1.SortDirection.desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "height", {
        get: function () {
            var height = this.rowHeight;
            if (isNaN(height))
                return height;
            return height + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "value", {
        get: function () {
            if (!this.row || !this.column || !this.column.prop)
                return '';
            var val = utils_1.deepValueGetter(this.row, this.column.prop);
            var userPipe = this.column.pipe;
            if (userPipe)
                return userPipe.transform(val);
            if (val !== undefined)
                return val;
            return '';
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyCellComponent.prototype.onFocus = function () {
        this.isFocused = true;
    };
    DataTableBodyCellComponent.prototype.onBlur = function () {
        this.isFocused = false;
    };
    DataTableBodyCellComponent.prototype.onClick = function (event) {
        this.activate.emit({
            type: 'click',
            event: event,
            row: this.row,
            column: this.column,
            value: this.value,
            cellElement: this.element
        });
    };
    DataTableBodyCellComponent.prototype.onDblClick = function (event) {
        this.activate.emit({
            type: 'dblclick',
            event: event,
            row: this.row,
            column: this.column,
            value: this.value,
            cellElement: this.element
        });
    };
    DataTableBodyCellComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetCell = event.target === this.element;
        var isAction = keyCode === utils_1.Keys.return ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.right;
        if (isAction && isTargetCell) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                column: this.column,
                value: this.value,
                cellElement: this.element
            });
        }
    };
    DataTableBodyCellComponent.prototype.onCheckboxChange = function (event) {
        this.activate.emit({
            type: 'checkbox',
            event: event,
            row: this.row,
            column: this.column,
            value: this.value,
            cellElement: this.element
        });
    };
    DataTableBodyCellComponent.prototype.calcSortDir = function (sorts) {
        var _this = this;
        if (!sorts)
            return;
        var sort = sorts.find(function (s) {
            return s.prop === _this.column.prop;
        });
        if (sort)
            return sort.dir;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyCellComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyCellComponent.prototype, "column", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyCellComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableBodyCellComponent.prototype, "isSelected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableBodyCellComponent.prototype, "sorts", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyCellComponent.prototype, "activate", void 0);
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], DataTableBodyCellComponent.prototype, "columnCssClasses", null);
    __decorate([
        core_1.HostBinding('class.active'), 
        __metadata('design:type', Boolean)
    ], DataTableBodyCellComponent.prototype, "isFocused", void 0);
    __decorate([
        core_1.HostBinding('class.sort-active'), 
        __metadata('design:type', Boolean)
    ], DataTableBodyCellComponent.prototype, "isSortActive", null);
    __decorate([
        core_1.HostBinding('class.sort-asc'), 
        __metadata('design:type', Boolean)
    ], DataTableBodyCellComponent.prototype, "isSortAscending", null);
    __decorate([
        core_1.HostBinding('class.sort-desc'), 
        __metadata('design:type', Boolean)
    ], DataTableBodyCellComponent.prototype, "isSortDescending", null);
    __decorate([
        core_1.HostBinding('style.width.px'), 
        __metadata('design:type', Number)
    ], DataTableBodyCellComponent.prototype, "width", null);
    __decorate([
        core_1.HostBinding('style.height'), 
        __metadata('design:type', Object)
    ], DataTableBodyCellComponent.prototype, "height", null);
    __decorate([
        core_1.HostListener('focus'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyCellComponent.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyCellComponent.prototype, "onBlur", null);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyCellComponent.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('dblclick', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyCellComponent.prototype, "onDblClick", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyCellComponent.prototype, "onKeyDown", null);
    DataTableBodyCellComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body-cell',
            template: "\n    <div class=\"datatable-body-cell-label\">\n      <label\n        *ngIf=\"column.checkboxable\" \n        class=\"datatable-checkbox\">\n        <input \n          type=\"checkbox\"\n          [checked]=\"isSelected\"\n          (click)=\"onCheckboxChange($event)\" \n        />\n      </label>\n      <span\n        *ngIf=\"!column.cellTemplate\"\n        [innerHTML]=\"value\">\n      </span>\n      <template\n        *ngIf=\"column.cellTemplate\"\n        [ngTemplateOutlet]=\"column.cellTemplate\"\n        [ngOutletContext]=\"{ value: value, row: row, column: column }\">\n      </template>\n    </div>\n  ",
            host: {
                class: 'datatable-body-cell'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DataTableBodyCellComponent);
    return DataTableBodyCellComponent;
}());
exports.DataTableBodyCellComponent = DataTableBodyCellComponent;


/***/ }),

/***/ "./src/components/body/body-row-wrapper.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var DataTableRowWrapperComponent = (function () {
    function DataTableRowWrapperComponent() {
        this.expanded = false;
        this.rowContextmenu = new core_1.EventEmitter(false);
    }
    DataTableRowWrapperComponent.prototype.onContextmenu = function ($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableRowWrapperComponent.prototype, "rowDetail", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableRowWrapperComponent.prototype, "detailRowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableRowWrapperComponent.prototype, "expanded", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableRowWrapperComponent.prototype, "row", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataTableRowWrapperComponent.prototype, "rowContextmenu", void 0);
    __decorate([
        core_1.HostListener('contextmenu', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DataTableRowWrapperComponent.prototype, "onContextmenu", null);
    DataTableRowWrapperComponent = __decorate([
        core_1.Component({
            selector: 'datatable-row-wrapper',
            template: "\n    <ng-content></ng-content>\n    <div \n      *ngIf=\"expanded\"\n      [style.height.px]=\"detailRowHeight\" \n      class=\"datatable-row-detail\">\n      <template\n        *ngIf=\"rowDetail && rowDetail.template\"\n        [ngTemplateOutlet]=\"rowDetail.template\"\n        [ngOutletContext]=\"{ row: row }\">\n      </template>\n    </div>\n  ",
            host: {
                class: 'datatable-row-wrapper'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableRowWrapperComponent);
    return DataTableRowWrapperComponent;
}());
exports.DataTableRowWrapperComponent = DataTableRowWrapperComponent;


/***/ }),

/***/ "./src/components/body/body-row.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var utils_1 = __webpack_require__("./src/utils/index.ts");
var DataTableBodyRowComponent = (function () {
    function DataTableBodyRowComponent(element) {
        this.activate = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            this.recalculateColumns(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "innerWidth", {
        get: function () {
            return this._innerWidth;
        },
        set: function (val) {
            this._innerWidth = val;
            this.recalculateColumns();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "isEvenRow", {
        get: function () {
            return this.row.$$index % 2 === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "isOddRow", {
        get: function () {
            return this.row.$$index % 2 !== 0;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRowComponent.prototype.trackByGroups = function (index, colGroup) {
        return colGroup.type;
    };
    DataTableBodyRowComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    DataTableBodyRowComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            utils_1.translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var bodyWidth = parseInt(this.innerWidth + '', 0);
            var totalDiff = widths.total - bodyWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + utils_1.scrollbarWidth) * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    DataTableBodyRowComponent.prototype.onActivate = function (event, index) {
        event.cellIndex = index;
        event.rowElement = this.element;
        this.activate.emit(event);
    };
    DataTableBodyRowComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetRow = event.target === this.element;
        var isAction = keyCode === utils_1.Keys.return ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.left ||
            keyCode === utils_1.Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                rowElement: this.element
            });
        }
    };
    DataTableBodyRowComponent.prototype.recalculateColumns = function (val) {
        if (val === void 0) { val = this.columns; }
        var colsByPin = utils_1.columnsByPin(val);
        this.columnsByPin = utils_1.columnsByPinArr(val);
        this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableBodyRowComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTableBodyRowComponent.prototype, "innerWidth", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyRowComponent.prototype, "row", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyRowComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.HostBinding('style.height.px'),
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyRowComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.HostBinding('class.active'),
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableBodyRowComponent.prototype, "isSelected", void 0);
    __decorate([
        core_1.HostBinding('class.datatable-row-even'), 
        __metadata('design:type', Boolean)
    ], DataTableBodyRowComponent.prototype, "isEvenRow", null);
    __decorate([
        core_1.HostBinding('class.datatable-row-odd'), 
        __metadata('design:type', Boolean)
    ], DataTableBodyRowComponent.prototype, "isOddRow", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyRowComponent.prototype, "activate", void 0);
    __decorate([
        core_1.HostListener('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyRowComponent.prototype, "onKeyDown", null);
    DataTableBodyRowComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body-row',
            template: "\n    <div\n      *ngFor=\"let colGroup of columnsByPin; let i = index; trackBy: trackByGroups\"\n      class=\"datatable-row-{{colGroup.type}} datatable-row-group\"\n      [ngStyle]=\"stylesByGroup(colGroup.type)\">\n      <datatable-body-cell\n        *ngFor=\"let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn\"\n        tabindex=\"-1\"\n        [row]=\"row\"\n        [isSelected]=\"isSelected\"\n        [column]=\"column\"\n        [rowHeight]=\"rowHeight\"\n        (activate)=\"onActivate($event, ii)\">\n      </datatable-body-cell>\n    </div>\n  ",
            host: {
                class: 'datatable-body-row'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DataTableBodyRowComponent);
    return DataTableBodyRowComponent;
}());
exports.DataTableBodyRowComponent = DataTableBodyRowComponent;


/***/ }),

/***/ "./src/components/body/body.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var utils_1 = __webpack_require__("./src/utils/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var scroller_component_1 = __webpack_require__("./src/components/body/scroller.component.ts");
var DataTableBodyComponent = (function () {
    function DataTableBodyComponent() {
        this.selected = [];
        this.scroll = new core_1.EventEmitter();
        this.page = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.detailToggle = new core_1.EventEmitter();
        this.rowContextmenu = new core_1.EventEmitter(false);
        this.rowHeightsCache = new utils_1.RowHeightCache();
        this.temp = [];
        this.offsetY = 0;
        this.indexes = {};
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = function (index, row) {
            if (this.trackByProp) {
                return row.$$index + "-" + this.trackByProp;
            }
            else {
                return row.$$index;
            }
        }.bind(this);
    }
    Object.defineProperty(DataTableBodyComponent.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (val) {
            this._pageSize = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (val) {
            this._rows = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            var colsByPin = utils_1.columnsByPin(val);
            this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (val) {
            this._offset = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "rowCount", {
        get: function () {
            return this._rowCount;
        },
        set: function (val) {
            this._rowCount = val;
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyWidth", {
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            else {
                return '100%';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "bodyHeight", {
        get: function () {
            return this._bodyHeight;
        },
        set: function (val) {
            if (this.scrollbarV) {
                this._bodyHeight = val + 'px';
            }
            else {
                this._bodyHeight = 'auto';
            }
            this.recalcLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "selectEnabled", {
        /**
         * Returns if selection is enabled.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DataTableBodyComponent
         */
        get: function () {
            return !!this.selectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "scrollHeight", {
        /**
         * Property that would calculate the height of scroll bar
         * based on the row heights cache for virtual scroll. Other scenarios
         * calculate scroll height automatically (as height will be undefined).
         *
         * @readonly
         * @type {number}
         * @memberOf DataTableBodyComponent
         */
        get: function () {
            if (this.scrollbarV) {
                return this.rowHeightsCache.query(this.rowCount - 1);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyComponent.prototype, "detailRowHeight", {
        get: function () {
            if (!this.rowDetail)
                return 0;
            return this.rowDetail.rowHeight;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after the constructor, initializing input properties
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.rowDetail) {
            this.listener = this.rowDetail.toggle.subscribe(function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'row')
                    _this.toggleRowExpansion(value);
                if (type === 'all')
                    _this.toggleAllRows(value);
            });
        }
    };
    /**
     * Called once, before the instance is destroyed.
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.ngOnDestroy = function () {
        if (this.rowDetail)
            this.listener.unsubscribe();
    };
    /**
     * Updates the Y offset given a new offset.
     *
     * @param {number} [offset]
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.updateOffsetY = function (offset) {
        // scroller is missing on empty table
        if (!this.scroller) {
            return;
        }
        if (this.scrollbarV && offset) {
            // First get the row Index that we need to move to.
            var rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        this.scroller.setOffset(offset || 0);
    };
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
     *
     * @param {*} event
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.onBodyScroll = function (event) {
        var scrollYPos = event.scrollYPos;
        var scrollXPos = event.scrollXPos;
        // if scroll change, trigger update
        // this is mainly used for header cell positions
        if (this.offsetY !== scrollYPos || this.offsetX !== scrollXPos) {
            this.scroll.emit({
                offsetY: scrollYPos,
                offsetX: scrollXPos
            });
        }
        this.offsetY = scrollYPos;
        this.offsetX = scrollXPos;
        this.updateIndexes();
        this.updatePage(event.direction);
        this.updateRows();
    };
    /**
     * Updates the page given a direction.
     *
     * @param {string} direction
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.updatePage = function (direction) {
        var offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.floor(offset);
        }
        else if (direction === 'down') {
            offset = Math.ceil(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset: offset });
        }
    };
    /**
     * Updates the rows in the view port
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.updateRows = function () {
        var _a = this.indexes, first = _a.first, last = _a.last;
        var rowIndex = first;
        var idx = 0;
        var temp = [];
        while (rowIndex < last && rowIndex < this.rowCount) {
            var row = this.rows[rowIndex];
            if (row) {
                row.$$index = rowIndex;
                temp[idx] = row;
            }
            idx++;
            rowIndex++;
        }
        this.temp = temp;
    };
    /**
     * Calculate row height based on the expanded state of the row.
     *
     * @param {*} row the row for which the height need to be calculated.
     * @returns {number} height of the row.
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getRowHeight = function (row) {
        // Adding detail row height if its expanded.
        return this.rowHeight +
            (row.$$expanded === 1 ? this.detailRowHeight : 0);
    };
    /**
     * Calculates the styles for the row so that the rows can be moved in 2D space
     * during virtual scroll inside the DOM.   In the below case the Y position is
     * manipulated.   As an example, if the height of row 0 is 30 px and row 1 is
     * 100 px then following styles are generated:
     *
     * transform: translate3d(0px, 0px, 0px);    ->  row0
     * transform: translate3d(0px, 30px, 0px);   ->  row1
     * transform: translate3d(0px, 130px, 0px);  ->  row2
     *
     * Row heights have to be calculated based on the row heights cache as we wont
     * be able to determine which row is of what height before hand.  In the above
     * case the positionY of the translate3d for row2 would be the sum of all the
     * heights of the rows before it (i.e. row0 and row1).
     *
     * @param {*} row The row that needs to be placed in the 2D space.
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getRowsStyles = function (row) {
        var rowHeight = this.getRowHeight(row);
        var styles = {
            height: rowHeight + 'px'
        };
        if (this.scrollbarV) {
            var idx = row ? row.$$index : 0;
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            var pos = this.rowHeightsCache.query(idx - 1);
            utils_1.translateXY(styles, 0, pos);
        }
        return styles;
    };
    /**
     * Hides the loading indicator
     *
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.loadingIndicator = false; }, 500);
    };
    /**
     * Updates the index of the rows in the viewport
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.updateIndexes = function () {
        var first = 0;
        var last = 0;
        if (this.scrollbarV) {
            // Calculation of the first and last indexes will be based on where the
            // scrollY position would be at.  The last index would be the one
            // that shows up inside the view port the last.
            var height = parseInt(this.bodyHeight, 0);
            first = this.rowHeightsCache.getRowIndex(this.offsetY);
            last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
        }
        else {
            first = Math.max(this.offset * this.pageSize, 0);
            last = Math.min((first + this.pageSize), this.rowCount);
        }
        this.indexes = { first: first, last: last };
    };
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     *
     * @returns {void}
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.refreshRowHeightCache = function () {
        if (!this.scrollbarV)
            return;
        // clear the previous row height cache if already present.
        // this is useful during sorts, filters where the state of the
        // rows array is changed.
        this.rowHeightsCache.clearCache();
        // Initialize the tree only if there are rows inside the tree.
        if (this.rows && this.rows.length) {
            this.rowHeightsCache.initCache(this.rows, this.rowHeight, this.detailRowHeight);
        }
    };
    /**
     * Gets the index for the view port
     *
     * @returns {number}
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getAdjustedViewPortIndex = function () {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        var viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV) {
            var offsetScroll = this.rowHeightsCache.query(viewPortFirstRowIndex - 1);
            return offsetScroll <= this.offsetY ? viewPortFirstRowIndex - 1 : viewPortFirstRowIndex;
        }
        return viewPortFirstRowIndex;
    };
    /**
     * Toggle the Expansion of the row i.e. if the row is expanded then it will
     * collapse and vice versa.   Note that the expanded status is stored as
     * a part of the row object itself as we have to preserve the expanded row
     * status in case of sorting and filtering of the row set.
     *
     * @param {*} row The row for which the expansion needs to be toggled.
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.toggleRowExpansion = function (row) {
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV) {
            var detailRowHeight = this.detailRowHeight * (row.$$expanded ? -1 : 1);
            this.rowHeightsCache.update(row.$$index, detailRowHeight);
        }
        // Update the toggled row and update the heights in the cache.
        row.$$expanded ^= 1;
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Expand/Collapse all the rows no matter what their state is.
     *
     * @param {boolean} expanded When true, all rows are expanded and when false, all rows will be collapsed.
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.toggleAllRows = function (expanded) {
        var rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            row.$$expanded = rowExpanded;
        }
        if (this.scrollbarV) {
            // Refresh the full row heights cache since every row was affected.
            this.refreshRowHeightCache();
        }
        // Emit all rows that have been expanded.
        this.detailToggle.emit({
            rows: this.rows,
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Recalculates the table
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.recalcLayout = function () {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableBodyComponent.prototype, "loadingIndicator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableBodyComponent.prototype, "emptyMessage", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTableBodyComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyComponent.prototype, "rowIdentity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyComponent.prototype, "rowDetail", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyComponent.prototype, "selectCheck", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableBodyComponent.prototype, "trackByProp", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTableBodyComponent.prototype, "pageSize", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableBodyComponent.prototype, "rows", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableBodyComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTableBodyComponent.prototype, "offset", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTableBodyComponent.prototype, "rowCount", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableBodyComponent.prototype, "innerWidth", void 0);
    __decorate([
        core_1.HostBinding('style.width'), 
        __metadata('design:type', String)
    ], DataTableBodyComponent.prototype, "bodyWidth", null);
    __decorate([
        core_1.Input(),
        core_1.HostBinding('style.height'), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DataTableBodyComponent.prototype, "bodyHeight", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "scroll", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "page", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyComponent.prototype, "detailToggle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DataTableBodyComponent.prototype, "rowContextmenu", void 0);
    __decorate([
        core_1.ViewChild(scroller_component_1.ScrollerComponent), 
        __metadata('design:type', scroller_component_1.ScrollerComponent)
    ], DataTableBodyComponent.prototype, "scroller", void 0);
    DataTableBodyComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body',
            template: "\n    <datatable-selection\n      #selector\n      [selected]=\"selected\"\n      [rows]=\"temp\"\n      [selectCheck]=\"selectCheck\"\n      [selectEnabled]=\"selectEnabled\"\n      [selectionType]=\"selectionType\"\n      [rowIdentity]=\"rowIdentity\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\">\n      <datatable-progress\n        *ngIf=\"loadingIndicator\">\n      </datatable-progress>\n      <datatable-scroller\n        *ngIf=\"rows?.length\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [scrollHeight]=\"scrollHeight\"\n        [scrollWidth]=\"columnGroupWidths.total\"\n        (scroll)=\"onBodyScroll($event)\">\n        <datatable-row-wrapper\n          *ngFor=\"let row of temp; let i = index; trackBy: rowTrackingFn;\"\n          [ngStyle]=\"getRowsStyles(row)\"\n          [rowDetail]=\"rowDetail\"\n          [detailRowHeight]=\"detailRowHeight\"\n          [row]=\"row\"\n          [expanded]=\"row.$$expanded === 1\"\n          (rowContextmenu)=\"rowContextmenu.emit($event)\">\n          <datatable-body-row\n            tabindex=\"-1\"\n            [isSelected]=\"selector.getRowSelected(row)\"\n            [innerWidth]=\"innerWidth\"\n            [offsetX]=\"offsetX\"\n            [columns]=\"columns\"\n            [rowHeight]=\"rowHeight\"\n            [row]=\"row\"\n            (activate)=\"selector.onActivate($event, i)\">\n          </datatable-body-row>\n        </datatable-row-wrapper>\n      </datatable-scroller>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows?.length\"\n        [innerHTML]=\"emptyMessage\">\n      </div>\n    </datatable-selection>\n  ",
            host: {
                class: 'datatable-body'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableBodyComponent);
    return DataTableBodyComponent;
}());
exports.DataTableBodyComponent = DataTableBodyComponent;


/***/ }),

/***/ "./src/components/body/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/components/body/body.component.ts"));
__export(__webpack_require__("./src/components/body/body-cell.component.ts"));
__export(__webpack_require__("./src/components/body/body-row.component.ts"));
__export(__webpack_require__("./src/components/body/progress-bar.component.ts"));
__export(__webpack_require__("./src/components/body/scroller.component.ts"));
__export(__webpack_require__("./src/components/body/body-row-wrapper.component.ts"));
__export(__webpack_require__("./src/components/body/selection.component.ts"));


/***/ }),

/***/ "./src/components/body/progress-bar.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
    }
    ProgressBarComponent = __decorate([
        core_1.Component({
            selector: 'datatable-progress',
            template: "\n    <div class=\"progress-linear\" role=\"progressbar\">\n      <div class=\"container\">\n        <div class=\"bar\"></div>\n      </div>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());
exports.ProgressBarComponent = ProgressBarComponent;


/***/ }),

/***/ "./src/components/body/scroller.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var ScrollerComponent = (function () {
    function ScrollerComponent(element, renderer) {
        this.renderer = renderer;
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.scroll = new core_1.EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
    }
    ScrollerComponent.prototype.ngOnInit = function () {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement = this.element.parentElement.parentElement;
            this.onScrollListener = this.renderer.listen(this.parentElement, 'scroll', this.onScrolled.bind(this));
        }
    };
    ScrollerComponent.prototype.ngOnDestroy = function () {
        if (this.scrollbarV || this.scrollbarH) {
            this.onScrollListener();
        }
    };
    ScrollerComponent.prototype.setOffset = function (offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    };
    ScrollerComponent.prototype.onScrolled = function (event) {
        var dom = event.currentTarget;
        this.scrollYPos = dom.scrollTop;
        this.scrollXPos = dom.scrollLeft;
        requestAnimationFrame(this.updateOffset.bind(this));
    };
    ScrollerComponent.prototype.updateOffset = function () {
        var direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.scroll.emit({
            direction: direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ScrollerComponent.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ScrollerComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.HostBinding('style.height.px'),
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ScrollerComponent.prototype, "scrollHeight", void 0);
    __decorate([
        core_1.HostBinding('style.width.px'),
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ScrollerComponent.prototype, "scrollWidth", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ScrollerComponent.prototype, "scroll", void 0);
    ScrollerComponent = __decorate([
        core_1.Component({
            selector: 'datatable-scroller',
            template: "\n    <ng-content></ng-content>\n  ",
            host: {
                class: 'datatable-scroll'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], ScrollerComponent);
    return ScrollerComponent;
}());
exports.ScrollerComponent = ScrollerComponent;


/***/ }),

/***/ "./src/components/body/selection.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var utils_1 = __webpack_require__("./src/utils/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var DataTableSelectionComponent = (function () {
    function DataTableSelectionComponent() {
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
    }
    DataTableSelectionComponent.prototype.selectRow = function (event, index, row) {
        if (!this.selectEnabled)
            return;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var multi = this.selectionType === types_1.SelectionType.multi;
        var multiClick = this.selectionType === types_1.SelectionType.multiClick;
        var selected = [];
        if (multi || chkbox || multiClick) {
            if (event.shiftKey) {
                selected = utils_1.selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (event.ctrlKey || multiClick || chkbox) {
                selected = utils_1.selectRows(this.selected.slice(), row, this.getRowSelectedIdx.bind(this));
            }
            else {
                selected = utils_1.selectRows([], row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected = utils_1.selectRows([], row, this.getRowSelectedIdx.bind(this));
        }
        if (typeof this.selectCheck === 'function') {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected.splice(0, this.selected.length);
        (_a = this.selected).push.apply(_a, selected);
        this.prevIndex = index;
        this.select.emit({
            selected: selected
        });
        var _a;
    };
    DataTableSelectionComponent.prototype.onActivate = function (model, index) {
        var type = model.type, event = model.event, row = model.row;
        var chkbox = this.selectionType === types_1.SelectionType.checkbox;
        var select = (!chkbox && (type === 'click' || type === 'dblclick')) ||
            (chkbox && type === 'checkbox');
        if (select) {
            this.selectRow(event, index, row);
        }
        else if (type === 'keydown') {
            if (event.keyCode === utils_1.Keys.return) {
                this.selectRow(event, index, row);
            }
            else {
                this.onKeyboardFocus(model);
            }
        }
        this.activate.emit(model);
    };
    DataTableSelectionComponent.prototype.onKeyboardFocus = function (model) {
        var keyCode = model.event.keyCode;
        var shouldFocus = keyCode === utils_1.Keys.up ||
            keyCode === utils_1.Keys.down ||
            keyCode === utils_1.Keys.right ||
            keyCode === utils_1.Keys.left;
        if (shouldFocus) {
            var isCellSelection = this.selectionType === types_1.SelectionType.cell;
            if (!model.cellElement || !isCellSelection) {
                this.focusRow(model.rowElement, keyCode);
            }
            else if (isCellSelection) {
                this.focusCell(model.cellElement, model.rowElement, keyCode, model.cellIndex);
            }
        }
    };
    DataTableSelectionComponent.prototype.focusRow = function (rowElement, keyCode) {
        var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
        if (nextRowElement)
            nextRowElement.focus();
    };
    DataTableSelectionComponent.prototype.getPrevNextRow = function (rowElement, keyCode) {
        var parentElement = rowElement.parentElement;
        if (parentElement) {
            var focusElement = void 0;
            if (keyCode === utils_1.Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === utils_1.Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    };
    DataTableSelectionComponent.prototype.focusCell = function (cellElement, rowElement, keyCode, cellIndex) {
        var nextCellElement;
        if (keyCode === utils_1.Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === utils_1.Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === utils_1.Keys.up || keyCode === utils_1.Keys.down) {
            var nextRowElement = this.getPrevNextRow(rowElement, keyCode);
            if (nextRowElement) {
                var children = nextRowElement.getElementsByClassName('datatable-body-cell');
                if (children.length)
                    nextCellElement = children[cellIndex];
            }
        }
        if (nextCellElement)
            nextCellElement.focus();
    };
    DataTableSelectionComponent.prototype.getRowSelected = function (row) {
        return this.getRowSelectedIdx(row, this.selected) > -1;
    };
    DataTableSelectionComponent.prototype.getRowSelectedIdx = function (row, selected) {
        var _this = this;
        if (!selected || !selected.length)
            return -1;
        var rowId = this.rowIdentity(row);
        return selected.findIndex(function (r) {
            var id = _this.rowIdentity(r);
            return id === rowId;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTableSelectionComponent.prototype, "rows", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTableSelectionComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableSelectionComponent.prototype, "selectEnabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableSelectionComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableSelectionComponent.prototype, "rowIdentity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableSelectionComponent.prototype, "selectCheck", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableSelectionComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableSelectionComponent.prototype, "select", void 0);
    DataTableSelectionComponent = __decorate([
        core_1.Component({
            selector: 'datatable-selection',
            template: "\n    <ng-content></ng-content>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableSelectionComponent);
    return DataTableSelectionComponent;
}());
exports.DataTableSelectionComponent = DataTableSelectionComponent;


/***/ }),

/***/ "./src/components/columns/column-cell.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var DataTableColumnCellDirective = (function () {
    function DataTableColumnCellDirective(template) {
        this.template = template;
    }
    ;
    DataTableColumnCellDirective = __decorate([
        core_1.Directive({ selector: '[ngx-datatable-cell-template]' }), 
        __metadata('design:paramtypes', [core_1.TemplateRef])
    ], DataTableColumnCellDirective);
    return DataTableColumnCellDirective;
}());
exports.DataTableColumnCellDirective = DataTableColumnCellDirective;


/***/ }),

/***/ "./src/components/columns/column-header.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var DataTableColumnHeaderDirective = (function () {
    function DataTableColumnHeaderDirective(template) {
        this.template = template;
    }
    ;
    DataTableColumnHeaderDirective = __decorate([
        core_1.Directive({ selector: '[ngx-datatable-header-template]' }), 
        __metadata('design:paramtypes', [core_1.TemplateRef])
    ], DataTableColumnHeaderDirective);
    return DataTableColumnHeaderDirective;
}());
exports.DataTableColumnHeaderDirective = DataTableColumnHeaderDirective;


/***/ }),

/***/ "./src/components/columns/column.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var column_header_directive_1 = __webpack_require__("./src/components/columns/column-header.directive.ts");
var column_cell_directive_1 = __webpack_require__("./src/components/columns/column-cell.directive.ts");
var DataTableColumnDirective = (function () {
    function DataTableColumnDirective() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableColumnDirective.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableColumnDirective.prototype, "prop", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "frozenLeft", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "frozenRight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableColumnDirective.prototype, "flexGrow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableColumnDirective.prototype, "resizeable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DataTableColumnDirective.prototype, "comparator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "pipe", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableColumnDirective.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableColumnDirective.prototype, "draggable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableColumnDirective.prototype, "canAutoResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableColumnDirective.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableColumnDirective.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableColumnDirective.prototype, "maxWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableColumnDirective.prototype, "checkboxable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableColumnDirective.prototype, "headerCheckboxable", void 0);
    __decorate([
        core_1.Input(),
        core_1.ContentChild(column_cell_directive_1.DataTableColumnCellDirective, { read: core_1.TemplateRef }), 
        __metadata('design:type', core_1.TemplateRef)
    ], DataTableColumnDirective.prototype, "cellTemplate", void 0);
    __decorate([
        core_1.Input(),
        core_1.ContentChild(column_header_directive_1.DataTableColumnHeaderDirective, { read: core_1.TemplateRef }), 
        __metadata('design:type', core_1.TemplateRef)
    ], DataTableColumnDirective.prototype, "headerTemplate", void 0);
    DataTableColumnDirective = __decorate([
        core_1.Directive({ selector: 'ngx-datatable-column' }), 
        __metadata('design:paramtypes', [])
    ], DataTableColumnDirective);
    return DataTableColumnDirective;
}());
exports.DataTableColumnDirective = DataTableColumnDirective;


/***/ }),

/***/ "./src/components/columns/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/components/columns/column.directive.ts"));
__export(__webpack_require__("./src/components/columns/column-header.directive.ts"));
__export(__webpack_require__("./src/components/columns/column-cell.directive.ts"));


/***/ }),

/***/ "./src/components/datatable.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js?sourceMap!./node_modules/sass-loader/index.js?sourceMap!./src/components/datatable.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/components/datatable.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var utils_1 = __webpack_require__("./src/utils/index.ts");
var types_1 = __webpack_require__("./src/types/index.ts");
var body_1 = __webpack_require__("./src/components/body/index.ts");
var columns_1 = __webpack_require__("./src/components/columns/index.ts");
var row_detail_1 = __webpack_require__("./src/components/row-detail/index.ts");
var DatatableComponent = (function () {
    function DatatableComponent(element, differs) {
        /**
         * List of row objects that should be
         * represented as selected in the grid.
         * Default value: `[]`
         *
         * @type {any[]}
         * @memberOf DatatableComponent
         */
        this.selected = [];
        /**
         * Enable vertical scrollbars
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.scrollbarV = false;
        /**
         * Enable horz scrollbars
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.scrollbarH = false;
        /**
         * The row height; which is necessary
         * to calculate the height for the lazy rendering.
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        this.rowHeight = 30;
        /**
         * Type of column width distribution formula.
         * Example: flex, force, standard
         *
         * @type {ColumnMode}
         * @memberOf DatatableComponent
         */
        this.columnMode = types_1.ColumnMode.standard;
        /**
         * The minimum header height in pixels.
         * Pass a falsey for no header
         *
         * @type {*}
         * @memberOf DatatableComponent
         */
        this.headerHeight = 30;
        /**
         * The minimum footer height in pixels.
         * Pass falsey for no footer
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        this.footerHeight = 0;
        /**
         * If the table should use external paging
         * otherwise its assumed that all data is preloaded.
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.externalPaging = false;
        /**
         * If the table should use external sorting or
         * the built-in basic sorting.
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.externalSorting = false;
        /**
         * The page size to be shown.
         * Default value: `undefined`
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        this.limit = undefined;
        /**
         * The current offset ( page - 1 ) shown.
         * Default value: `0`
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        this.offset = 0;
        /**
         * Show the linear loading bar.
         * Default value: `false`
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.loadingIndicator = false;
        /**
         * Enable/Disable ability to re-order columns
         * by dragging them.
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.reorderable = true;
        /**
         * The type of sorting
         *
         * @type {SortType}
         * @memberOf DatatableComponent
         */
        this.sortType = types_1.SortType.single;
        /**
         * Array of sorted columns by property and type.
         * Default value: `[]`
         *
         * @type {any[]}
         * @memberOf DatatableComponent
         */
        this.sorts = [];
        /**
         * Css class overrides
         *
         * @type {*}
         * @memberOf DatatableComponent
         */
        this.cssClasses = {
            sortAscending: 'icon-down',
            sortDescending: 'icon-up',
            pagerLeftArrow: 'icon-left',
            pagerRightArrow: 'icon-right',
            pagerPrevious: 'icon-prev',
            pagerNext: 'icon-skip'
        };
        /**
         * Message overrides for localization
         *
         * @type {*}
         * @memberOf DatatableComponent
         */
        this.messages = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total'
        };
        /**
         * This will be used when displaying or selecting rows.
         * when tracking/comparing them, we'll use the value of this fn,
         *
         * (`fn(x) === fn(y)` instead of `x === y`)
         *
         * @memberOf DatatableComponent
         */
        this.rowIdentity = (function (x) { return x; });
        /**
         * Body was scrolled typically in a `scrollbarV:true` scenario.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.scroll = new core_1.EventEmitter();
        /**
         * A cell or row was focused via keyboard or mouse click.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.activate = new core_1.EventEmitter();
        /**
         * A cell or row was selected.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.select = new core_1.EventEmitter();
        /**
         * Column sort was invoked.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.sort = new core_1.EventEmitter();
        /**
         * The table was paged either triggered by the pager or the body scroll.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.page = new core_1.EventEmitter();
        /**
         * Columns were re-ordered.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.reorder = new core_1.EventEmitter();
        /**
         * Column was resized.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.resize = new core_1.EventEmitter();
        /**
         * The context menu was invoked on a row.
         *
         * @memberOf DatatableComponent
         */
        this.rowContextmenu = new core_1.EventEmitter(false);
        this.offsetX = 0;
        this._count = 0;
        // get ref to elm for measuring
        this.element = element.nativeElement;
        this.rowDiffer = differs.find({}).create(null);
    }
    Object.defineProperty(DatatableComponent.prototype, "rows", {
        /**
         * Gets the rows.
         *
         * @readonly
         * @type {*}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this._rows;
        },
        /**
         * Rows that are displayed in the table.
         *
         * @memberOf DatatableComponent
         */
        set: function (val) {
            // auto sort on new updates
            if (!this.externalSorting) {
                val = utils_1.sortRows(val, this.columns, this.sorts);
            }
            this._rows = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columns", {
        /**
         * Get the columns.
         *
         * @readonly
         * @type {any[]}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this._columns;
        },
        /**
         * Columns to be displayed.
         *
         * @memberOf DatatableComponent
         */
        set: function (val) {
            if (val) {
                utils_1.setColumnDefaults(val);
                this.recalculateColumns(val);
            }
            this._columns = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "count", {
        /**
         * Gets the count.
         *
         * @readonly
         * @type {number}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this._count;
        },
        /**
         * The total count of all rows.
         * Default value: `0`
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        set: function (val) {
            this._count = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedHeader", {
        /**
         * CSS class applied if the header height if fixed height.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            var headerHeight = this.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedRow", {
        /**
         * CSS class applied to the root element if
         * the row heights are fixed heights.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            var rowHeight = this.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVertScroll", {
        /**
         * CSS class applied to root element if
         * vertical scrolling is enabled.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isHorScroll", {
        /**
         * CSS class applied to the root element
         * if the horziontal scrolling is enabled.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSelectable", {
        /**
         * CSS class applied to root element is selectable.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCheckboxSelection", {
        /**
         * CSS class applied to root is checkbox selection.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCellSelection", {
        /**
         * CSS class applied to root if cell selection.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.cell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSingleSelection", {
        /**
         * CSS class applied to root if single select.
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.single;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiSelection", {
        /**
         * CSS class added to root element if mulit select
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.multi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiClickSelection", {
        /**
         * CSS class added to root element if mulit click select
         *
         * @readonly
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selectionType === types_1.SelectionType.multiClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columnTemplates", {
        /**
         * Returns the column templates.
         *
         * @readonly
         * @type {QueryList<DataTableColumnDirective>}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this._columnTemplates;
        },
        /**
         * Column templates gathered from `ContentChildren`
         * if described in your markup.
         *
         * @memberOf DatatableComponent
         */
        set: function (val) {
            this._columnTemplates = val;
            if (val) {
                // only set this if results were brought back
                var arr = val.toArray();
                if (arr.length) {
                    // translate them to normal objects
                    this.columns = utils_1.translateTemplates(arr);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "allRowsSelected", {
        /**
         * Returns if all rows are selected.
         *
         * @readonly
         * @private
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        get: function () {
            return this.selected &&
                this.rows &&
                this.selected.length === this.rows.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.ngOnInit = function () {
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
    };
    /**
     * Lifecycle hook that is called after a component's
     * view has been fully initialized.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // this has to be done to prevent the change detection
        // tree from freaking out because we are readjusting
        setTimeout(function () { return _this.recalculate(); });
    };
    /**
     * Lifecycle hook that is called when Angular dirty checks a directive.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.rows)) {
            this.recalculatePages();
        }
    };
    /**
     * Recalc's the sizes of the grid.
     *
     * Updated automatically on changes to:
     *
     *  - Columns
     *  - Rows
     *  - Paging related
     *
     * Also can be manually invoked or upon window resize.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.recalculate = function () {
        this.recalculateDims();
        this.recalculateColumns();
    };
    /**
     * Window resize handler to update sizes.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onWindowResize = function () {
        this.recalculate();
    };
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     *
     * @param {any[]} [columns=this.columns]
     * @param {number} [forceIdx=false]
     * @param {boolean} [allowBleed=this.scrollH]
     * @returns {any[]}
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.recalculateColumns = function (columns, forceIdx, allowBleed) {
        if (columns === void 0) { columns = this.columns; }
        if (forceIdx === void 0) { forceIdx = -1; }
        if (allowBleed === void 0) { allowBleed = this.scrollbarH; }
        if (!columns)
            return;
        var width = this.innerWidth;
        if (this.scrollbarV) {
            width = width - utils_1.scrollbarWidth;
        }
        if (this.columnMode === types_1.ColumnMode.force) {
            utils_1.forceFillColumnWidths(columns, width, forceIdx, allowBleed);
        }
        else if (this.columnMode === types_1.ColumnMode.flex) {
            utils_1.adjustColumnWidths(columns, width);
        }
        return columns;
    };
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.recalculateDims = function () {
        var _a = this.element.getBoundingClientRect(), height = _a.height, width = _a.width;
        this.innerWidth = Math.floor(width);
        if (this.scrollbarV) {
            if (this.headerHeight)
                height = height - this.headerHeight;
            if (this.footerHeight)
                height = height - this.footerHeight;
            this.bodyHeight = height;
        }
        this.recalculatePages();
    };
    /**
     * Recalculates the pages after a update.
     *
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.recalculatePages = function () {
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    };
    /**
     * Body triggered a page event.
     *
     * @param {*} { offset }
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onBodyPage = function (_a) {
        var offset = _a.offset;
        this.offset = offset;
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    };
    /**
     * The body triggered a scroll event.
     *
     * @param {MouseEvent} event
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onBodyScroll = function (event) {
        this.offsetX = event.offsetX;
        this.scroll.emit(event);
    };
    /**
     * The footer triggered a page event.
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onFooterPage = function (event) {
        this.offset = event.page - 1;
        this.bodyComponent.updateOffsetY(this.offset);
        this.page.emit({
            count: this.count,
            pageSize: this.pageSize,
            limit: this.limit,
            offset: this.offset
        });
    };
    /**
     * Recalculates the sizes of the page
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.calcPageSize = function (val) {
        if (val === void 0) { val = this.rows; }
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV) {
            var size = Math.ceil(this.bodyHeight / this.rowHeight);
            return Math.max(size, 0);
        }
        // if limit is passed, we are paging
        if (this.limit !== undefined)
            return this.limit;
        // otherwise use row length
        if (val)
            return val.length;
        // other empty :(
        return 0;
    };
    /**
     * Calculates the row count.
     *
     * @param {any[]} [val=this.rows]
     * @returns {number}
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.calcRowCount = function (val) {
        if (val === void 0) { val = this.rows; }
        if (!this.externalPaging) {
            if (!val)
                return 0;
            return val.length;
        }
        return this.count;
    };
    /**
     * The header triggered a column resize event.
     *
     * @param {*} { column, newValue }
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onColumnResize = function (_a) {
        var column = _a.column, newValue = _a.newValue;
        var idx;
        var cols = this.columns.map(function (c, i) {
            c = Object.assign({}, c);
            if (c.$$id === column.$$id) {
                idx = i;
                c.width = newValue;
                // set this so we can force the column
                // width distribution to be to this value
                c.$$oldWidth = newValue;
            }
            return c;
        });
        this.recalculateColumns(cols, idx);
        this._columns = cols;
        this.resize.emit({
            column: column,
            newValue: newValue
        });
    };
    /**
     * The header triggered a column re-order event.
     *
     * @param {*} { column, newValue, prevValue }
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onColumnReorder = function (_a) {
        var column = _a.column, newValue = _a.newValue, prevValue = _a.prevValue;
        var cols = this.columns.map(function (c) {
            return Object.assign({}, c);
        });
        cols.splice(prevValue, 1);
        cols.splice(newValue, 0, column);
        this.columns = cols;
        this.reorder.emit({
            column: column,
            newValue: newValue,
            prevValue: prevValue
        });
    };
    /**
     * The header triggered a column sort event.
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onColumnSort = function (event) {
        var sorts = event.sorts;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            // don't use normal setter so we don't resort
            this._rows = utils_1.sortRows(this.rows, this.columns, sorts);
        }
        this.sorts = sorts;
        this.bodyComponent.updateOffsetY(0);
        this.sort.emit(event);
    };
    /**
     * Toggle all row selection
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onHeaderSelect = function (event) {
        // before we splice, chk if we currently have all selected
        var allSelected = this.selected.length === this.rows.length;
        // remove all existing either way
        this.selected.splice(0, this.selected.length);
        // do the opposite here
        if (!allSelected) {
            (_a = this.selected).push.apply(_a, this.rows);
        }
        this.select.emit({
            selected: this.selected
        });
        var _a;
    };
    /**
     * A row was selected from body
     *
     * @param {*} event
     *
     * @memberOf DatatableComponent
     */
    DatatableComponent.prototype.onBodySelect = function (event) {
        this.select.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DatatableComponent.prototype, "rows", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DatatableComponent.prototype, "columns", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DatatableComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "columnMode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "headerHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "footerHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "externalPaging", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "externalSorting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "limit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DatatableComponent.prototype, "count", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "offset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "loadingIndicator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "reorderable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "sortType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DatatableComponent.prototype, "sorts", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "cssClasses", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "messages", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], DatatableComponent.prototype, "rowIdentity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "selectCheck", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatatableComponent.prototype, "trackByProp", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "scroll", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "page", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "reorder", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "resize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "rowContextmenu", void 0);
    __decorate([
        core_1.HostBinding('class.fixed-header'), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "isFixedHeader", null);
    __decorate([
        core_1.HostBinding('class.fixed-row'), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "isFixedRow", null);
    __decorate([
        core_1.HostBinding('class.scroll-vertical'), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "isVertScroll", null);
    __decorate([
        core_1.HostBinding('class.scroll-horz'), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "isHorScroll", null);
    __decorate([
        core_1.HostBinding('class.selectable'), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "isSelectable", null);
    __decorate([
        core_1.HostBinding('class.checkbox-selection'), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "isCheckboxSelection", null);
    __decorate([
        core_1.HostBinding('class.cell-selection'), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "isCellSelection", null);
    __decorate([
        core_1.HostBinding('class.single-selection'), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "isSingleSelection", null);
    __decorate([
        core_1.HostBinding('class.multi-selection'), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "isMultiSelection", null);
    __decorate([
        core_1.HostBinding('class.multi-click-selection'), 
        __metadata('design:type', Boolean)
    ], DatatableComponent.prototype, "isMultiClickSelection", null);
    __decorate([
        core_1.ContentChildren(columns_1.DataTableColumnDirective), 
        __metadata('design:type', core_1.QueryList), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], DatatableComponent.prototype, "columnTemplates", null);
    __decorate([
        core_1.ContentChild(row_detail_1.DatatableRowDetailDirective), 
        __metadata('design:type', row_detail_1.DatatableRowDetailDirective)
    ], DatatableComponent.prototype, "rowDetail", void 0);
    __decorate([
        core_1.ViewChild(body_1.DataTableBodyComponent), 
        __metadata('design:type', body_1.DataTableBodyComponent)
    ], DatatableComponent.prototype, "bodyComponent", void 0);
    __decorate([
        core_1.HostListener('window:resize'),
        utils_1.throttleable(5), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DatatableComponent.prototype, "onWindowResize", null);
    DatatableComponent = __decorate([
        core_1.Component({
            selector: 'ngx-datatable',
            template: "\n    <div\n      visibility-observer\n      (visible)=\"recalculate()\">\n      <datatable-header\n        *ngIf=\"headerHeight\"\n        [sorts]=\"sorts\"\n        [sortType]=\"sortType\"\n        [scrollbarH]=\"scrollbarH\"\n        [innerWidth]=\"innerWidth\"\n        [offsetX]=\"offsetX\"\n        [columns]=\"columns\"\n        [headerHeight]=\"headerHeight\"\n        [reorderable]=\"reorderable\"\n        [sortAscendingIcon]=\"cssClasses.sortAscending\"\n        [sortDescendingIcon]=\"cssClasses.sortDescending\"\n        [allRowsSelected]=\"allRowsSelected\"\n        [selectionType]=\"selectionType\"\n        (sort)=\"onColumnSort($event)\"\n        (resize)=\"onColumnResize($event)\"\n        (reorder)=\"onColumnReorder($event)\"\n        (select)=\"onHeaderSelect($event)\">\n      </datatable-header>\n      <datatable-body\n        [rows]=\"rows\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [loadingIndicator]=\"loadingIndicator\"\n        [rowHeight]=\"rowHeight\"\n        [rowCount]=\"rowCount\"\n        [offset]=\"offset\"\n        [trackByProp]=\"trackByProp\"\n        [columns]=\"columns\"\n        [pageSize]=\"pageSize\"\n        [offsetX]=\"offsetX\"\n        [rowDetail]=\"rowDetail\"\n        [selected]=\"selected\"\n        [innerWidth]=\"innerWidth\"\n        [bodyHeight]=\"bodyHeight\"\n        [selectionType]=\"selectionType\"\n        [emptyMessage]=\"messages.emptyMessage\"\n        [rowIdentity]=\"rowIdentity\"\n        [selectCheck]=\"selectCheck\"\n        (page)=\"onBodyPage($event)\"\n        (activate)=\"activate.emit($event)\"\n        (rowContextmenu)=\"rowContextmenu.emit($event)\"\n        (select)=\"onBodySelect($event)\"\n        (scroll)=\"onBodyScroll($event)\">\n      </datatable-body>\n      <datatable-footer\n        *ngIf=\"footerHeight\"\n        [rowCount]=\"rowCount\"\n        [pageSize]=\"pageSize\"\n        [offset]=\"offset\"\n        [footerHeight]=\"footerHeight\"\n        [totalMessage]=\"messages.totalMessage\"\n        [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\n        [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\n        [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\n        [pagerNextIcon]=\"cssClasses.pagerNext\"\n        (page)=\"onFooterPage($event)\">\n      </datatable-footer>\n    </div>\n  ",
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/components/datatable.component.scss")],
            host: {
                class: 'ngx-datatable'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.KeyValueDiffers])
    ], DatatableComponent);
    return DatatableComponent;
}());
exports.DatatableComponent = DatatableComponent;


/***/ }),

/***/ "./src/components/footer/footer.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var DataTableFooterComponent = (function () {
    function DataTableFooterComponent() {
        this.page = new core_1.EventEmitter();
    }
    Object.defineProperty(DataTableFooterComponent.prototype, "isVisible", {
        get: function () {
            return (this.rowCount / this.pageSize) > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableFooterComponent.prototype, "curPage", {
        get: function () {
            return this.offset + 1;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableFooterComponent.prototype, "footerHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableFooterComponent.prototype, "rowCount", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableFooterComponent.prototype, "pageSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableFooterComponent.prototype, "offset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableFooterComponent.prototype, "pagerLeftArrowIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableFooterComponent.prototype, "pagerRightArrowIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableFooterComponent.prototype, "pagerPreviousIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableFooterComponent.prototype, "pagerNextIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableFooterComponent.prototype, "totalMessage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableFooterComponent.prototype, "page", void 0);
    DataTableFooterComponent = __decorate([
        core_1.Component({
            selector: 'datatable-footer',
            template: "\n    <div\n      [style.height.px]=\"footerHeight\">\n      <div class=\"page-count\">{{rowCount.toLocaleString()}} {{totalMessage}}</div>\n      <datatable-pager\n        [pagerLeftArrowIcon]=\"pagerLeftArrowIcon\"\n        [pagerRightArrowIcon]=\"pagerRightArrowIcon\"\n        [pagerPreviousIcon]=\"pagerPreviousIcon\"\n        [pagerNextIcon]=\"pagerNextIcon\"\n        [page]=\"curPage\"\n        [size]=\"pageSize\"\n        [count]=\"rowCount\"\n        [hidden]=\"!isVisible\"\n        (change)=\"page.emit($event)\">\n       </datatable-pager>\n     </div>\n  ",
            host: {
                class: 'datatable-footer'
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableFooterComponent);
    return DataTableFooterComponent;
}());
exports.DataTableFooterComponent = DataTableFooterComponent;


/***/ }),

/***/ "./src/components/footer/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/components/footer/footer.component.ts"));
__export(__webpack_require__("./src/components/footer/pager.component.ts"));


/***/ }),

/***/ "./src/components/footer/pager.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var DataTablePagerComponent = (function () {
    function DataTablePagerComponent() {
        this.change = new core_1.EventEmitter();
        this._count = 0;
        this._page = 1;
        this._size = 0;
    }
    Object.defineProperty(DataTablePagerComponent.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (val) {
            this._size = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (val) {
            this._count = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (val) {
            this._page = val;
            this.pages = this.calcPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTablePagerComponent.prototype, "totalPages", {
        get: function () {
            var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(count || 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    DataTablePagerComponent.prototype.canPrevious = function () {
        return this.page > 1;
    };
    DataTablePagerComponent.prototype.canNext = function () {
        return this.page < this.totalPages;
    };
    DataTablePagerComponent.prototype.prevPage = function () {
        this.selectPage(this.page - 1);
    };
    DataTablePagerComponent.prototype.nextPage = function () {
        this.selectPage(this.page + 1);
    };
    DataTablePagerComponent.prototype.selectPage = function (page) {
        if (page > 0 && page <= this.totalPages && page !== this.page) {
            this.page = page;
            this.change.emit({
                page: page
            });
        }
    };
    DataTablePagerComponent.prototype.calcPages = function (page) {
        var pages = [];
        var startPage = 1;
        var endPage = this.totalPages;
        var maxSize = 5;
        var isMaxSized = maxSize < this.totalPages;
        page = page || this.page;
        if (isMaxSized) {
            startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
            endPage = Math.min(startPage + maxSize - 1, this.totalPages);
        }
        for (var num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: num
            });
        }
        return pages;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTablePagerComponent.prototype, "pagerLeftArrowIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTablePagerComponent.prototype, "pagerRightArrowIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTablePagerComponent.prototype, "pagerPreviousIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTablePagerComponent.prototype, "pagerNextIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTablePagerComponent.prototype, "size", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTablePagerComponent.prototype, "count", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], DataTablePagerComponent.prototype, "page", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTablePagerComponent.prototype, "change", void 0);
    DataTablePagerComponent = __decorate([
        core_1.Component({
            selector: 'datatable-pager',
            template: "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\">\n          <i class=\"{{pagerPreviousIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\">\n          <i class=\"{{pagerLeftArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li\n        class=\"pages\"\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\">\n          <i class=\"{{pagerRightArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\">\n          <i class=\"{{pagerNextIcon}}\"></i>\n        </a>\n      </li>\n    </ul>\n  ",
            host: {
                class: 'datatable-pager'
            },
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], DataTablePagerComponent);
    return DataTablePagerComponent;
}());
exports.DataTablePagerComponent = DataTablePagerComponent;


/***/ }),

/***/ "./src/components/header/header-cell.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var types_1 = __webpack_require__("./src/types/index.ts");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var DataTableHeaderCellComponent = (function () {
    function DataTableHeaderCellComponent() {
        this.sort = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.sortFn = this.onSort.bind(this);
    }
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.sortDir = this.calcSortDir(val);
            this.sortClass = this.calcSortClass(this.sortDir);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var cls = 'datatable-header-cell';
            if (this.column.sortable)
                cls += ' sortable';
            if (this.column.resizeable)
                cls += ' resizeable';
            if (this.column.cssClasses)
                cls += ' ' + this.column.cssClasses;
            var sortDir = this.sortDir;
            if (sortDir) {
                cls += " sort-active sort-" + sortDir;
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "name", {
        get: function () {
            return this.column.name || this.column.prop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "minWidth", {
        get: function () {
            return this.column.minWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "maxWidth", {
        get: function () {
            return this.column.maxWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "width", {
        get: function () {
            return this.column.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "isCheckboxable", {
        get: function () {
            return this.column.checkboxable &&
                this.column.headerCheckboxable &&
                this.selectionType === types_1.SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderCellComponent.prototype.calcSortDir = function (sorts) {
        var _this = this;
        if (sorts && this.column) {
            var sort = sorts.find(function (s) {
                return s.prop === _this.column.prop;
            });
            if (sort)
                return sort.dir;
        }
    };
    DataTableHeaderCellComponent.prototype.onSort = function () {
        if (!this.column.sortable)
            return;
        var newValue = utils_1.nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue: newValue
        });
    };
    DataTableHeaderCellComponent.prototype.calcSortClass = function (sortDir) {
        if (sortDir === types_1.SortDirection.asc) {
            return "sort-btn sort-asc " + this.sortAscendingIcon;
        }
        else if (sortDir === types_1.SortDirection.desc) {
            return "sort-btn sort-desc " + this.sortDescendingIcon;
        }
        else {
            return "sort-btn";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderCellComponent.prototype, "sortType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableHeaderCellComponent.prototype, "column", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableHeaderCellComponent.prototype, "sortAscendingIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DataTableHeaderCellComponent.prototype, "sortDescendingIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableHeaderCellComponent.prototype, "allRowsSelected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderCellComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.HostBinding('style.height.px'),
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderCellComponent.prototype, "headerHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableHeaderCellComponent.prototype, "sorts", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderCellComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderCellComponent.prototype, "select", void 0);
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', Object)
    ], DataTableHeaderCellComponent.prototype, "columnCssClasses", null);
    __decorate([
        core_1.HostBinding('attr.title'), 
        __metadata('design:type', String)
    ], DataTableHeaderCellComponent.prototype, "name", null);
    __decorate([
        core_1.HostBinding('style.minWidth.px'), 
        __metadata('design:type', Number)
    ], DataTableHeaderCellComponent.prototype, "minWidth", null);
    __decorate([
        core_1.HostBinding('style.maxWidth.px'), 
        __metadata('design:type', Number)
    ], DataTableHeaderCellComponent.prototype, "maxWidth", null);
    __decorate([
        core_1.HostBinding('style.width.px'), 
        __metadata('design:type', Number)
    ], DataTableHeaderCellComponent.prototype, "width", null);
    DataTableHeaderCellComponent = __decorate([
        core_1.Component({
            selector: 'datatable-header-cell',
            template: "\n    <div>\n      <label\n        *ngIf=\"isCheckboxable\" \n        class=\"datatable-checkbox\">\n        <input \n          type=\"checkbox\"\n          [attr.checked]=\"allRowsSelected\"\n          (change)=\"select.emit(!allRowsSelected)\" \n        />\n      </label>\n      <span class=\"datatable-header-cell-wrapper\">\n        <span\n          class=\"datatable-header-cell-label draggable\"\n          *ngIf=\"!column.headerTemplate\"\n          (click)=\"onSort()\"\n          [innerHTML]=\"name\">\n        </span>\n      </span>\n      <template\n        *ngIf=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngOutletContext]=\"{ \n          column: column, \n          sortDir: sortDir,\n          sortFn: sortFn\n        }\">\n      </template>\n      <span\n        [class]=\"sortClass\">\n      </span>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableHeaderCellComponent);
    return DataTableHeaderCellComponent;
}());
exports.DataTableHeaderCellComponent = DataTableHeaderCellComponent;


/***/ }),

/***/ "./src/components/header/header.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var types_1 = __webpack_require__("./src/types/index.ts");
var utils_1 = __webpack_require__("./src/utils/index.ts");
var DataTableHeaderComponent = (function () {
    function DataTableHeaderComponent() {
        this.sort = new core_1.EventEmitter();
        this.reorder = new core_1.EventEmitter();
        this.resize = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
    }
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerHeight", {
        get: function () {
            return this._headerHeight;
        },
        set: function (val) {
            if (val !== 'auto') {
                this._headerHeight = val + "px";
            }
            else {
                this._headerHeight = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            var colsByPin = utils_1.columnsByPin(val);
            this.columnsByPin = utils_1.columnsByPinArr(val);
            this.columnGroupWidths = utils_1.columnGroupWidths(colsByPin, val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "headerWidth", {
        get: function () {
            if (this.scrollbarH) {
                return this.innerWidth + 'px';
            }
            return '100%';
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.trackByGroups = function (index, colGroup) {
        return colGroup.type;
    };
    DataTableHeaderComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    DataTableHeaderComponent.prototype.onColumnResized = function (width, column) {
        if (width <= column.minWidth) {
            width = column.minWidth;
        }
        else if (width >= column.maxWidth) {
            width = column.maxWidth;
        }
        this.resize.emit({
            column: column,
            prevValue: column.width,
            newValue: width
        });
    };
    DataTableHeaderComponent.prototype.onColumnReordered = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, model = _a.model;
        this.reorder.emit({
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    };
    DataTableHeaderComponent.prototype.onSort = function (_a) {
        var column = _a.column, prevValue = _a.prevValue, newValue = _a.newValue;
        var sorts = this.calcNewSorts(column, prevValue, newValue);
        this.sort.emit({
            sorts: sorts,
            column: column,
            prevValue: prevValue,
            newValue: newValue
        });
    };
    DataTableHeaderComponent.prototype.calcNewSorts = function (column, prevValue, newValue) {
        var idx = 0;
        var sorts = this.sorts.map(function (s, i) {
            s = Object.assign({}, s);
            if (s.prop === column.prop)
                idx = i;
            return s;
        });
        if (newValue === undefined) {
            sorts.splice(idx, 1);
        }
        else if (prevValue) {
            sorts[idx].dir = newValue;
        }
        else {
            if (this.sortType === types_1.SortType.single) {
                sorts.splice(0, this.sorts.length);
            }
            sorts.push({ dir: newValue, prop: column.prop });
        }
        return sorts;
    };
    DataTableHeaderComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            utils_1.translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.innerWidth;
            var offset = totalDiff * -1;
            utils_1.translateXY(styles, offset, 0);
        }
        return styles;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableHeaderComponent.prototype, "sortAscendingIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableHeaderComponent.prototype, "sortDescendingIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableHeaderComponent.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderComponent.prototype, "innerWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderComponent.prototype, "offsetX", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DataTableHeaderComponent.prototype, "sorts", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderComponent.prototype, "sortType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableHeaderComponent.prototype, "allRowsSelected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DataTableHeaderComponent.prototype, "selectionType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DataTableHeaderComponent.prototype, "reorderable", void 0);
    __decorate([
        core_1.HostBinding('style.height'),
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], DataTableHeaderComponent.prototype, "headerHeight", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableHeaderComponent.prototype, "columns", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "sort", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "reorder", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "resize", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableHeaderComponent.prototype, "select", void 0);
    __decorate([
        core_1.HostBinding('style.width'), 
        __metadata('design:type', String)
    ], DataTableHeaderComponent.prototype, "headerWidth", null);
    DataTableHeaderComponent = __decorate([
        core_1.Component({
            selector: 'datatable-header',
            template: "\n    <div\n      orderable\n      (reorder)=\"onColumnReordered($event)\"\n      [style.width.px]=\"columnGroupWidths.total\"\n      class=\"datatable-header-inner\">\n      <div\n        *ngFor=\"let colGroup of columnsByPin; trackBy: trackByGroups\"\n        [class]=\"'datatable-row-' + colGroup.type\"\n        [ngStyle]=\"stylesByGroup(colGroup.type)\">\n        <datatable-header-cell\n          *ngFor=\"let column of colGroup.columns; trackBy: columnTrackingFn\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (resize)=\"onColumnResized($event, column)\"\n          long-press\n          (longPress)=\"drag = true\"\n          (longPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"reorderable && column.draggable && drag\"\n          [dragY]=\"false\"\n          [dragModel]=\"column\"\n          [headerHeight]=\"headerHeight\"\n          [column]=\"column\"\n          [sortType]=\"sortType\"\n          [sorts]=\"sorts\"\n          [selectionType]=\"selectionType\"\n          [sortAscendingIcon]=\"sortAscendingIcon\"\n          [sortDescendingIcon]=\"sortDescendingIcon\"\n          (sort)=\"onSort($event)\"\n          (select)=\"select.emit($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
            host: {
                class: 'datatable-header'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableHeaderComponent);
    return DataTableHeaderComponent;
}());
exports.DataTableHeaderComponent = DataTableHeaderComponent;


/***/ }),

/***/ "./src/components/header/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/components/header/header.component.ts"));
__export(__webpack_require__("./src/components/header/header-cell.component.ts"));


/***/ }),

/***/ "./src/components/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/components/datatable.component.ts"));
__export(__webpack_require__("./src/components/header/index.ts"));
__export(__webpack_require__("./src/components/body/index.ts"));
__export(__webpack_require__("./src/components/footer/index.ts"));
__export(__webpack_require__("./src/components/columns/index.ts"));
__export(__webpack_require__("./src/components/row-detail/index.ts"));


/***/ }),

/***/ "./src/components/row-detail/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/components/row-detail/row-detail.directive.ts"));
__export(__webpack_require__("./src/components/row-detail/row-detail-template.directive.ts"));


/***/ }),

/***/ "./src/components/row-detail/row-detail-template.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var DatatableRowDetailTemplateDirective = (function () {
    function DatatableRowDetailTemplateDirective(template) {
        this.template = template;
    }
    ;
    DatatableRowDetailTemplateDirective = __decorate([
        core_1.Directive({
            selector: '[ngx-datatable-row-detail-template]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef])
    ], DatatableRowDetailTemplateDirective);
    return DatatableRowDetailTemplateDirective;
}());
exports.DatatableRowDetailTemplateDirective = DatatableRowDetailTemplateDirective;


/***/ }),

/***/ "./src/components/row-detail/row-detail.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var row_detail_template_directive_1 = __webpack_require__("./src/components/row-detail/row-detail-template.directive.ts");
var DatatableRowDetailDirective = (function () {
    function DatatableRowDetailDirective() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         *
         * @type {number}
         * @memberOf DatatableComponent
         */
        this.rowHeight = 0;
        /**
         * Row detail row visbility was toggled.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableComponent
         */
        this.toggle = new core_1.EventEmitter();
    }
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    DatatableRowDetailDirective.prototype.toggleExpandRow = function (row) {
        this.toggle.emit({
            type: 'row',
            value: row
        });
    };
    /**
     * API method to expand all the rows.
     *
     * @memberOf DatatableComponent
     */
    DatatableRowDetailDirective.prototype.expandAllRows = function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * API method to collapse all the rows.
     *
     * @memberOf DatatableComponent
     */
    DatatableRowDetailDirective.prototype.collapseAllRows = function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DatatableRowDetailDirective.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(),
        core_1.ContentChild(row_detail_template_directive_1.DatatableRowDetailTemplateDirective, { read: core_1.TemplateRef }), 
        __metadata('design:type', core_1.TemplateRef)
    ], DatatableRowDetailDirective.prototype, "template", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableRowDetailDirective.prototype, "toggle", void 0);
    DatatableRowDetailDirective = __decorate([
        core_1.Directive({ selector: 'ngx-datatable-row-detail' }), 
        __metadata('design:paramtypes', [])
    ], DatatableRowDetailDirective);
    return DatatableRowDetailDirective;
}());
exports.DatatableRowDetailDirective = DatatableRowDetailDirective;


/***/ }),

/***/ "./src/datatable.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(1);
__webpack_require__("./node_modules/rxjs/add/observable/fromEvent.js");
var components_1 = __webpack_require__("./src/components/index.ts");
var directives_1 = __webpack_require__("./src/directives/index.ts");
var NgxDatatableModule = (function () {
    function NgxDatatableModule() {
    }
    NgxDatatableModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                directives_1.VisibilityDirective,
                directives_1.DraggableDirective,
                directives_1.ResizeableDirective,
                directives_1.OrderableDirective,
                directives_1.LongPressDirective,
                components_1.ScrollerComponent,
                components_1.DatatableComponent,
                components_1.DataTableColumnDirective,
                components_1.DataTableHeaderComponent,
                components_1.DataTableHeaderCellComponent,
                components_1.DataTableBodyComponent,
                components_1.DataTableFooterComponent,
                components_1.DataTablePagerComponent,
                components_1.ProgressBarComponent,
                components_1.DataTableBodyRowComponent,
                components_1.DataTableRowWrapperComponent,
                components_1.DatatableRowDetailDirective,
                components_1.DatatableRowDetailTemplateDirective,
                components_1.DataTableBodyCellComponent,
                components_1.DataTableSelectionComponent,
                components_1.DataTableColumnHeaderDirective,
                components_1.DataTableColumnCellDirective
            ],
            exports: [
                components_1.DatatableComponent,
                components_1.DatatableRowDetailDirective,
                components_1.DatatableRowDetailTemplateDirective,
                components_1.DataTableColumnDirective,
                components_1.DataTableColumnHeaderDirective,
                components_1.DataTableColumnCellDirective
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NgxDatatableModule);
    return NgxDatatableModule;
}());
exports.NgxDatatableModule = NgxDatatableModule;


/***/ }),

/***/ "./src/directives/draggable.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
var DraggableDirective = (function () {
    function DraggableDirective(element) {
        this.dragX = true;
        this.dragY = true;
        this.dragStart = new core_1.EventEmitter();
        this.dragging = new core_1.EventEmitter();
        this.dragEnd = new core_1.EventEmitter();
        this.isDragging = false;
        this.element = element.nativeElement;
    }
    DraggableDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DraggableDirective.prototype.onMouseup = function (event) {
        this.isDragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.dragEnd.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.prototype.onMousedown = function (event) {
        var _this = this;
        if (event.target.classList.contains('draggable')) {
            event.preventDefault();
            this.isDragging = true;
            var mouseDownPos_1 = { x: event.clientX, y: event.clientY };
            this.subscription = Observable_1.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (ev) { return _this.move(ev, mouseDownPos_1); });
            this.dragStart.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.prototype.move = function (event, mouseDownPos) {
        if (!this.dragging)
            return;
        var x = event.clientX - mouseDownPos.x;
        var y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = x + "px";
        if (this.dragY)
            this.element.style.top = y + "px";
        if (this.dragX || this.dragY) {
            this.element.classList.add('dragging');
            this.dragging.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DraggableDirective.prototype, "dragModel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DraggableDirective.prototype, "dragX", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DraggableDirective.prototype, "dragY", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DraggableDirective.prototype, "dragStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DraggableDirective.prototype, "dragging", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DraggableDirective.prototype, "dragEnd", void 0);
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DraggableDirective.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], DraggableDirective.prototype, "onMousedown", null);
    DraggableDirective = __decorate([
        core_1.Directive({ selector: '[draggable]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DraggableDirective);
    return DraggableDirective;
}());
exports.DraggableDirective = DraggableDirective;


/***/ }),

/***/ "./src/directives/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/directives/draggable.directive.ts"));
__export(__webpack_require__("./src/directives/long-press.directive.ts"));
__export(__webpack_require__("./src/directives/orderable.directive.ts"));
__export(__webpack_require__("./src/directives/resizeable.directive.ts"));
__export(__webpack_require__("./src/directives/visibility.directive.ts"));


/***/ }),

/***/ "./src/directives/long-press.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var LongPressDirective = (function () {
    function LongPressDirective() {
        this.duration = 500;
        this.longPress = new core_1.EventEmitter();
        this.longPressing = new core_1.EventEmitter();
        this.longPressEnd = new core_1.EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    Object.defineProperty(LongPressDirective.prototype, "press", {
        get: function () { return this.pressing; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPressDirective.prototype, "isLongPress", {
        get: function () {
            return this.isLongPressing;
        },
        enumerable: true,
        configurable: true
    });
    LongPressDirective.prototype.onMouseDown = function (event) {
        var _this = this;
        // don't do right/middle clicks
        if (event.which !== 1)
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        this.timeout = setTimeout(function () {
            _this.isLongPressing = true;
            _this.longPress.emit(event);
            _this.loop(event);
        }, this.duration);
        this.loop(event);
    };
    LongPressDirective.prototype.onMouseMove = function (event) {
        if (this.pressing && !this.isLongPressing) {
            var xThres = Math.abs(event.clientX - this.mouseX) > 10;
            var yThres = Math.abs(event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    LongPressDirective.prototype.loop = function (event) {
        var _this = this;
        if (this.isLongPressing) {
            this.timeout = setTimeout(function () {
                _this.longPressing.emit(event);
                _this.loop(event);
            }, 50);
        }
    };
    LongPressDirective.prototype.endPress = function () {
        clearTimeout(this.timeout);
        this.isLongPressing = false;
        this.pressing = false;
        this.longPressEnd.emit(true);
    };
    LongPressDirective.prototype.onMouseUp = function () { this.endPress(); };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LongPressDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPressDirective.prototype, "longPress", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPressDirective.prototype, "longPressing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPressDirective.prototype, "longPressEnd", void 0);
    __decorate([
        core_1.HostBinding('class.press'), 
        __metadata('design:type', Boolean)
    ], LongPressDirective.prototype, "press", null);
    __decorate([
        core_1.HostBinding('class.longpress'), 
        __metadata('design:type', Boolean)
    ], LongPressDirective.prototype, "isLongPress", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], LongPressDirective.prototype, "onMouseDown", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], LongPressDirective.prototype, "onMouseMove", null);
    __decorate([
        core_1.HostListener('mouseup'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LongPressDirective.prototype, "onMouseUp", null);
    LongPressDirective = __decorate([
        core_1.Directive({ selector: '[long-press]' }), 
        __metadata('design:paramtypes', [])
    ], LongPressDirective);
    return LongPressDirective;
}());
exports.LongPressDirective = LongPressDirective;


/***/ }),

/***/ "./src/directives/orderable.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var draggable_directive_1 = __webpack_require__("./src/directives/draggable.directive.ts");
var OrderableDirective = (function () {
    function OrderableDirective(differs) {
        this.reorder = new core_1.EventEmitter();
        this.differ = differs.find({}).create(null);
    }
    OrderableDirective.prototype.ngAfterContentInit = function () {
        // HACK: Investigate Better Way
        this.updateSubscriptions();
        this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
    };
    OrderableDirective.prototype.ngOnDestroy = function () {
        this.draggables.forEach(function (d) {
            d.dragStart.unsubscribe();
            d.dragEnd.unsubscribe();
        });
    };
    OrderableDirective.prototype.updateSubscriptions = function () {
        var _this = this;
        var diffs = this.differ.diff(this.draggables.toArray());
        if (diffs) {
            var subscribe = function (_a) {
                var currentValue = _a.currentValue, previousValue = _a.previousValue;
                unsubscribe_1({ previousValue: previousValue });
                if (currentValue) {
                    currentValue.dragStart.subscribe(_this.onDragStart.bind(_this));
                    currentValue.dragEnd.subscribe(_this.onDragEnd.bind(_this));
                }
            };
            var unsubscribe_1 = function (_a) {
                var previousValue = _a.previousValue;
                if (previousValue) {
                    previousValue.dragStart.unsubscribe();
                    previousValue.dragEnd.unsubscribe();
                }
            };
            diffs.forEachAddedItem(subscribe.bind(this));
            // diffs.forEachChangedItem(subscribe.bind(this));
            diffs.forEachRemovedItem(unsubscribe_1.bind(this));
        }
    };
    OrderableDirective.prototype.onDragStart = function () {
        this.positions = {};
        var i = 0;
        for (var _i = 0, _a = this.draggables.toArray(); _i < _a.length; _i++) {
            var dragger = _a[_i];
            var elm = dragger.element;
            this.positions[dragger.dragModel.prop] = {
                left: parseInt(elm.offsetLeft.toString(), 0),
                index: i++
            };
        }
    };
    OrderableDirective.prototype.onDragEnd = function (_a) {
        var element = _a.element, model = _a.model;
        var newPos = parseInt(element.offsetLeft.toString(), 0);
        var prevPos = this.positions[model.prop];
        var i = 0;
        for (var prop in this.positions) {
            var pos = this.positions[prop];
            var movedLeft = newPos < pos.left && prevPos.left > pos.left;
            var movedRight = newPos > pos.left && prevPos.left < pos.left;
            if (movedLeft || movedRight) {
                this.reorder.emit({
                    prevIndex: prevPos.index,
                    newIndex: i,
                    model: model
                });
            }
            i++;
        }
        element.style.left = 'auto';
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], OrderableDirective.prototype, "reorder", void 0);
    __decorate([
        core_1.ContentChildren(draggable_directive_1.DraggableDirective, { descendants: true }), 
        __metadata('design:type', core_1.QueryList)
    ], OrderableDirective.prototype, "draggables", void 0);
    OrderableDirective = __decorate([
        core_1.Directive({ selector: '[orderable]' }), 
        __metadata('design:paramtypes', [core_1.KeyValueDiffers])
    ], OrderableDirective);
    return OrderableDirective;
}());
exports.OrderableDirective = OrderableDirective;


/***/ }),

/***/ "./src/directives/resizeable.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var ResizeableDirective = (function () {
    function ResizeableDirective(element) {
        this.resizeEnabled = true;
        this.resize = new core_1.EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
        if (this.resizeEnabled) {
            var node = document.createElement('span');
            node.classList.add('resize-handle');
            this.element.appendChild(node);
        }
    }
    ResizeableDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ResizeableDirective.prototype.onMouseup = function () {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
            this.resize.emit(this.element.clientWidth);
        }
    };
    ResizeableDirective.prototype.onMousedown = function (event) {
        var _this = this;
        var isHandle = (event.target).classList.contains('resize-handle');
        var initialWidth = this.element.clientWidth;
        var mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            this.subscription = Observable_1.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (e) { return _this.move(e, initialWidth, mouseDownScreenX); });
        }
    };
    ResizeableDirective.prototype.move = function (event, initialWidth, mouseDownScreenX) {
        var movementX = event.screenX - mouseDownScreenX;
        var newWidth = initialWidth + movementX;
        var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = newWidth + "px";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ResizeableDirective.prototype, "resizeEnabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ResizeableDirective.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ResizeableDirective.prototype, "maxWidth", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ResizeableDirective.prototype, "resize", void 0);
    __decorate([
        core_1.HostListener('document:mouseup'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ResizeableDirective.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], ResizeableDirective.prototype, "onMousedown", null);
    ResizeableDirective = __decorate([
        core_1.Directive({
            selector: '[resizeable]',
            host: {
                '[class.resizeable]': 'resizeEnabled'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ResizeableDirective);
    return ResizeableDirective;
}());
exports.ResizeableDirective = ResizeableDirective;


/***/ }),

/***/ "./src/directives/visibility.directive.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibility-observer
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
var VisibilityDirective = (function () {
    function VisibilityDirective(element, zone) {
        this.element = element;
        this.zone = zone;
        this.isVisible = false;
        this.visible = new core_1.EventEmitter();
    }
    VisibilityDirective.prototype.ngOnInit = function () {
        this.runCheck();
    };
    VisibilityDirective.prototype.ngOnDestroy = function () {
        clearTimeout(this.timeout);
    };
    VisibilityDirective.prototype.onVisibilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        this.zone.run(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
    };
    VisibilityDirective.prototype.runCheck = function () {
        var _this = this;
        var check = function () {
            // https://davidwalsh.name/offsetheight-visibility
            var _a = _this.element.nativeElement, offsetHeight = _a.offsetHeight, offsetWidth = _a.offsetWidth;
            if (offsetHeight && offsetWidth) {
                clearTimeout(_this.timeout);
                _this.onVisibilityChange();
            }
            else {
                clearTimeout(_this.timeout);
                _this.zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () { return check(); }, 50);
                });
            }
        };
        setTimeout(function () { return check(); });
    };
    __decorate([
        core_1.HostBinding('class.visible'), 
        __metadata('design:type', Boolean)
    ], VisibilityDirective.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], VisibilityDirective.prototype, "visible", void 0);
    VisibilityDirective = __decorate([
        core_1.Directive({ selector: '[visibility-observer]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
    ], VisibilityDirective);
    return VisibilityDirective;
}());
exports.VisibilityDirective = VisibilityDirective;


/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/datatable.module.ts"));
__export(__webpack_require__("./src/types/index.ts"));
__export(__webpack_require__("./src/components/index.ts"));


/***/ }),

/***/ "./src/types/click.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function (ClickType) {
    ClickType[ClickType["single"] = 'single'] = "single";
    ClickType[ClickType["double"] = 'double'] = "double";
})(exports.ClickType || (exports.ClickType = {}));
var ClickType = exports.ClickType;


/***/ }),

/***/ "./src/types/column-mode.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function (ColumnMode) {
    ColumnMode[ColumnMode["standard"] = 'standard'] = "standard";
    ColumnMode[ColumnMode["flex"] = 'flex'] = "flex";
    ColumnMode[ColumnMode["force"] = 'force'] = "force";
})(exports.ColumnMode || (exports.ColumnMode = {}));
var ColumnMode = exports.ColumnMode;


/***/ }),

/***/ "./src/types/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/types/column-mode.type.ts"));
__export(__webpack_require__("./src/types/sort.type.ts"));
__export(__webpack_require__("./src/types/sort-direction.type.ts"));
__export(__webpack_require__("./src/types/selection.type.ts"));
__export(__webpack_require__("./src/types/click.type.ts"));


/***/ }),

/***/ "./src/types/selection.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function (SelectionType) {
    SelectionType[SelectionType["single"] = 'single'] = "single";
    SelectionType[SelectionType["multi"] = 'multi'] = "multi";
    SelectionType[SelectionType["multiClick"] = 'multiClick'] = "multiClick";
    SelectionType[SelectionType["cell"] = 'cell'] = "cell";
    SelectionType[SelectionType["checkbox"] = 'checkbox'] = "checkbox";
})(exports.SelectionType || (exports.SelectionType = {}));
var SelectionType = exports.SelectionType;


/***/ }),

/***/ "./src/types/sort-direction.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function (SortDirection) {
    SortDirection[SortDirection["asc"] = 'asc'] = "asc";
    SortDirection[SortDirection["desc"] = 'desc'] = "desc";
})(exports.SortDirection || (exports.SortDirection = {}));
var SortDirection = exports.SortDirection;


/***/ }),

/***/ "./src/types/sort.type.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function (SortType) {
    SortType[SortType["single"] = 'single'] = "single";
    SortType[SortType["multi"] = 'multi'] = "multi";
})(exports.SortType || (exports.SortType = {}));
var SortType = exports.SortType;


/***/ }),

/***/ "./src/utils/camel-case.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
 * @param  {string} str
 * @return {string} camel case string
 */
function camelCase(str) {
    // Replace special characters with a space
    str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
    // put a space before an uppercase letter
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    // Lower case first character and some other stuff
    str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
    // uppercase characters preceded by a space or number
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
        return b.trim() + c.toUpperCase();
    });
    return str;
}
exports.camelCase = camelCase;
/**
 * Converts strings from camel case to words
 * http://stackoverflow.com/questions/7225407/convert-camelcasetext-to-camel-case-text
 *
 * @export
 * @param {any} str
 * @returns string
 */
function deCamelCase(str) {
    return str
        .replace(/([A-Z])/g, function (match) { return (" " + match); })
        .replace(/^./, function (match) { return match.toUpperCase(); });
}
exports.deCamelCase = deCamelCase;


/***/ }),

/***/ "./src/utils/column-helper.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var utils_1 = __webpack_require__("./src/utils/index.ts");
/**
 * Sets the column defaults
 *
 * @export
 * @param {any[]} columns
 * @returns
 */
function setColumnDefaults(columns) {
    if (!columns)
        return;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var column = columns_1[_i];
        if (!column.$$id) {
            column.$$id = utils_1.id();
        }
        // translate name => prop
        if (!column.prop && column.name) {
            column.prop = utils_1.camelCase(column.name);
        }
        // format props if no name passed
        if (column.prop && !column.name) {
            column.name = utils_1.deCamelCase(column.prop);
        }
        if (!column.hasOwnProperty('resizeable')) {
            column.resizeable = true;
        }
        if (!column.hasOwnProperty('sortable')) {
            column.sortable = true;
        }
        if (!column.hasOwnProperty('draggable')) {
            column.draggable = true;
        }
        if (!column.hasOwnProperty('canAutoResize')) {
            column.canAutoResize = true;
        }
        if (!column.hasOwnProperty('width')) {
            column.width = 150;
        }
    }
}
exports.setColumnDefaults = setColumnDefaults;
/**
 * Translates templates definitions to objects
 *
 * @export
 * @param {DataTableColumnDirective[]} templates
 * @returns {any[]}
 */
function translateTemplates(templates) {
    var result = [];
    for (var _i = 0, templates_1 = templates; _i < templates_1.length; _i++) {
        var temp = templates_1[_i];
        var col = {};
        var props = Object.getOwnPropertyNames(temp);
        for (var _a = 0, props_1 = props; _a < props_1.length; _a++) {
            var prop = props_1[_a];
            col[prop] = temp[prop];
        }
        if (temp.headerTemplate) {
            col.headerTemplate = temp.headerTemplate;
        }
        if (temp.cellTemplate) {
            col.cellTemplate = temp.cellTemplate;
        }
        result.push(col);
    }
    return result;
}
exports.translateTemplates = translateTemplates;


/***/ }),

/***/ "./src/utils/column.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Returns the columns by pin.
 * @param {array} cols
 */
function columnsByPin(cols) {
    var ret = {
        left: [],
        center: [],
        right: []
    };
    if (cols) {
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            if (col.frozenLeft) {
                ret.left.push(col);
            }
            else if (col.frozenRight) {
                ret.right.push(col);
            }
            else {
                ret.center.push(col);
            }
        }
    }
    return ret;
}
exports.columnsByPin = columnsByPin;
/**
 * Returns the widths of all group sets of a column
 * @param {object} groups
 * @param {array} all
 */
function columnGroupWidths(groups, all) {
    return {
        left: columnTotalWidth(groups.left),
        center: columnTotalWidth(groups.center),
        right: columnTotalWidth(groups.right),
        total: columnTotalWidth(all)
    };
}
exports.columnGroupWidths = columnGroupWidths;
/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} prop width to get
 */
function columnTotalWidth(columns, prop) {
    var totalWidth = 0;
    if (columns) {
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var c = columns_1[_i];
            var has = prop && c[prop];
            var width = has ? c[prop] : c.width;
            totalWidth = totalWidth + parseFloat(width);
        }
    }
    return totalWidth;
}
exports.columnTotalWidth = columnTotalWidth;
/**
 * Calculates the total width of all columns and their groups
 * @param {array} columns
 * @param {string} property width to get
 */
function columnsTotalWidth(columns, prop) {
    var totalWidth = 0;
    for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
        var column = columns_2[_i];
        var has = prop && column[prop];
        totalWidth = totalWidth + (has ? column[prop] : column.width);
    }
    return totalWidth;
}
exports.columnsTotalWidth = columnsTotalWidth;
function columnsByPinArr(val) {
    var colsByPinArr = [];
    var colsByPin = columnsByPin(val);
    colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
    colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
    colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });
    return colsByPinArr;
}
exports.columnsByPinArr = columnsByPinArr;


/***/ }),

/***/ "./src/utils/deep-getter.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
function deepValueGetter(obj, path) {
    if (!obj || !path)
        return obj;
    var current = obj;
    var split = path.split('.');
    if (split.length) {
        for (var i = 0, len = split.length; i < len; i++) {
            current = current[split[i]];
            // if found undefined, return empty string
            if (current === undefined || current === null)
                return '';
        }
    }
    return current;
}
exports.deepValueGetter = deepValueGetter;


/***/ }),

/***/ "./src/utils/id.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Creates a unique object id.
 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 */
function id() {
    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
}
exports.id = id;


/***/ }),

/***/ "./src/utils/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/utils/id.ts"));
__export(__webpack_require__("./src/utils/column.ts"));
__export(__webpack_require__("./src/utils/deep-getter.ts"));
__export(__webpack_require__("./src/utils/camel-case.ts"));
__export(__webpack_require__("./src/utils/keys.ts"));
__export(__webpack_require__("./src/utils/math.ts"));
__export(__webpack_require__("./src/utils/prefixes.ts"));
__export(__webpack_require__("./src/utils/scrollbar-width.ts"));
__export(__webpack_require__("./src/utils/selection.ts"));
__export(__webpack_require__("./src/utils/translate.ts"));
__export(__webpack_require__("./src/utils/throttle.ts"));
__export(__webpack_require__("./src/utils/sort.ts"));
__export(__webpack_require__("./src/utils/row-height-cache.ts"));
__export(__webpack_require__("./src/utils/column-helper.ts"));


/***/ }),

/***/ "./src/utils/keys.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["return"] = 13] = "return";
    Keys[Keys["escape"] = 27] = "escape";
    Keys[Keys["left"] = 37] = "left";
    Keys[Keys["right"] = 39] = "right";
})(exports.Keys || (exports.Keys = {}));
var Keys = exports.Keys;


/***/ }),

/***/ "./src/utils/math.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var column_1 = __webpack_require__("./src/utils/column.ts");
/**
 * Calculates the Total Flex Grow
 * @param {array}
 */
function getTotalFlexGrow(columns) {
    var totalFlexGrow = 0;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var c = columns_1[_i];
        totalFlexGrow += c.flexGrow || 0;
    }
    return totalFlexGrow;
}
exports.getTotalFlexGrow = getTotalFlexGrow;
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 * @param {array} all columns
 * @param {int} width
 */
function adjustColumnWidths(allColumns, expectedWidth) {
    var columnsWidth = column_1.columnsTotalWidth(allColumns);
    var totalFlexGrow = getTotalFlexGrow(allColumns);
    var colsByGroup = column_1.columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
        scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
}
exports.adjustColumnWidths = adjustColumnWidths;
/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 * @param {array} colsByGroup
 * @param {int} maxWidth
 * @param {int} totalFlexGrow
 */
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    // calculate total width and flexgrow points for coulumns that can be resized
    for (var attr in colsByGroup) {
        for (var _i = 0, _a = colsByGroup[attr]; _i < _a.length; _i++) {
            var column = _a[_i];
            if (!column.canAutoResize) {
                maxWidth -= column.width;
                totalFlexGrow -= column.flexGrow;
            }
            else {
                column.width = 0;
            }
        }
    }
    var hasMinWidth = {};
    var remainingWidth = maxWidth;
    // resize columns until no width is left to be distributed
    do {
        var widthPerFlexPoint = remainingWidth / totalFlexGrow;
        remainingWidth = 0;
        for (var attr in colsByGroup) {
            for (var _b = 0, _c = colsByGroup[attr]; _b < _c.length; _b++) {
                var column = _c[_b];
                // if the column can be resize and it hasn't reached its minimum width yet
                if (column.canAutoResize && !hasMinWidth[column.prop]) {
                    var newWidth = column.width + column.flexGrow * widthPerFlexPoint;
                    if (column.minWidth !== undefined && newWidth < column.minWidth) {
                        remainingWidth += newWidth - column.minWidth;
                        column.width = column.minWidth;
                        hasMinWidth[column.prop] = true;
                    }
                    else {
                        column.width = newWidth;
                    }
                }
            }
        }
    } while (remainingWidth !== 0);
}
/**
 * Forces the width of the columns to
 * distribute equally but overflowing when nesc.
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proporation the widths given the min / max / noraml widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proporational widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the orginial width; not the newly proporatied widths.
 *
 * @param {array} allColumns
 * @param {int} expectedWidth
 */
function forceFillColumnWidths(allColumns, expectedWidth, startIdx, allowBleed, defaultColWidth) {
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    var columnsToResize = allColumns
        .slice(startIdx + 1, allColumns.length)
        .filter(function (c) {
        return c.canAutoResize !== false;
    });
    for (var _i = 0, columnsToResize_1 = columnsToResize; _i < columnsToResize_1.length; _i++) {
        var column = columnsToResize_1[_i];
        if (!column.$$oldWidth) {
            column.$$oldWidth = column.width;
        }
    }
    var additionWidthPerColumn = 0;
    var exceedsWindow = false;
    var contentWidth = getContentWidth(allColumns, defaultColWidth);
    var remainingWidth = expectedWidth - contentWidth;
    var columnsProcessed = [];
    // This loop takes care of the
    do {
        additionWidthPerColumn = remainingWidth / columnsToResize.length;
        exceedsWindow = contentWidth >= expectedWidth;
        for (var _a = 0, columnsToResize_2 = columnsToResize; _a < columnsToResize_2.length; _a++) {
            var column = columnsToResize_2[_a];
            if (exceedsWindow && allowBleed) {
                column.width = column.$$oldWidth || column.width || defaultColWidth;
            }
            else {
                var newSize = (column.width || defaultColWidth) + additionWidthPerColumn;
                if (column.minWidth && newSize < column.minWidth) {
                    column.width = column.minWidth;
                    columnsProcessed.push(column);
                }
                else if (column.maxWidth && newSize > column.maxWidth) {
                    column.width = column.maxWidth;
                    columnsProcessed.push(column);
                }
                else {
                    column.width = newSize;
                }
            }
            column.width = Math.max(0, column.width);
        }
        contentWidth = getContentWidth(allColumns);
        remainingWidth = expectedWidth - contentWidth;
        removeProcessedColumns(columnsToResize, columnsProcessed);
    } while (remainingWidth > 0 && columnsToResize.length !== 0);
}
exports.forceFillColumnWidths = forceFillColumnWidths;
/**
 * Remove the processed columns from the current active columns.
 *
 * @param columnsToResize  Array containing the columns that need to be resized.
 * @param columnsProcessed Array containing the columns that have already been processed.
 */
function removeProcessedColumns(columnsToResize, columnsProcessed) {
    for (var _i = 0, columnsProcessed_1 = columnsProcessed; _i < columnsProcessed_1.length; _i++) {
        var column = columnsProcessed_1[_i];
        var index = columnsToResize.indexOf(column);
        columnsToResize.splice(index, 1);
    }
}
/**
 * Gets the width of the columns
 *
 * @param {array} allColumns
 * @param {number} [defaultColWidth=300]
 * @returns {number}
 */
function getContentWidth(allColumns, defaultColWidth) {
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    var contentWidth = 0;
    for (var _i = 0, allColumns_1 = allColumns; _i < allColumns_1.length; _i++) {
        var column = allColumns_1[_i];
        contentWidth += (column.width || defaultColWidth);
    }
    return contentWidth;
}


/***/ }),

/***/ "./src/utils/prefixes.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var camel_case_1 = __webpack_require__("./src/utils/camel-case.ts");
var cache = {};
var testStyle = document.createElement('div').style;
// Get Prefix
// http://davidwalsh.name/vendor-prefix
var prefix = (function () {
    var styles = window.getComputedStyle(document.documentElement, '');
    var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/))[1];
    var dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
        dom: dom,
        lowercase: pre,
        css: "-" + pre + "-",
        js: pre[0].toUpperCase() + pre.substr(1)
    };
})();
function getVendorPrefixedName(property) {
    var name = camel_case_1.camelCase(property);
    if (!cache[name]) {
        if (testStyle[prefix.css + property] !== undefined) {
            cache[name] = prefix.css + property;
        }
        else if (testStyle[property] !== undefined) {
            cache[name] = property;
        }
    }
    return cache[name];
}
exports.getVendorPrefixedName = getVendorPrefixedName;


/***/ }),

/***/ "./src/utils/row-height-cache.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
var RowHeightCache = (function () {
    function RowHeightCache() {
        /**
         * Tree Array stores the cumulative information of the row heights to perform efficient
         * range queries and updates.  Currently the tree is initialized to the base row
         * height instead of the detail row height.
         */
        this.treeArray = [];
    }
    /**
     * Clear the Tree array.
     */
    RowHeightCache.prototype.clearCache = function () {
        this.treeArray = [];
    };
    /**
     * Initialize the Fenwick tree with row Heights.
     *
     * @param rows The array of rows which contain the expanded status.
     * @param rowHeight The row height.
     * @param detailRowHeight The detail row height.
     */
    RowHeightCache.prototype.initCache = function (rows, rowHeight, detailRowHeight) {
        if (isNaN(rowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'rowHeight' is a\n        valid number value: (" + rowHeight + ") when 'scrollbarV' is enabled.");
        }
        // Add this additional guard in case detailRowHeight is set to 'auto' as it wont work.
        if (isNaN(detailRowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'detailRowHeight' is a\n        valid number value: (" + detailRowHeight + ") when 'scrollbarV' is enabled.");
        }
        var n = rows.length;
        this.treeArray = new Array(n);
        for (var i = 0; i < n; ++i) {
            this.treeArray[i] = 0;
        }
        for (var i = 0; i < n; ++i) {
            var currentRowHeight = rowHeight;
            // Add the detail row height to the already expanded rows.
            // This is useful for the table that goes through a filter or sort.
            if (rows[i] && rows[i].$$expanded === 1) {
                currentRowHeight += detailRowHeight;
            }
            this.update(i, currentRowHeight);
        }
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     *
     * @param scrollY - The scrollY position.
     * @returns {number} - Index representing the first row visible in the viewport
     */
    RowHeightCache.prototype.getRowIndex = function (scrollY) {
        if (scrollY === 0)
            return 0;
        return this.calcRowIndex(scrollY);
    };
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
     *
     *
     * @param atRowIndex Update the data at this index row in the grid.
     * @param byRowHeight Update by the rowHeight provided.
     */
    RowHeightCache.prototype.update = function (atRowIndex, byRowHeight) {
        if (!this.treeArray.length) {
            throw new Error("Update at index " + atRowIndex + " with value " + byRowHeight + " failed:\n        Row Height cache not initialized.");
        }
        var n = this.treeArray.length;
        atRowIndex |= 0;
        while (atRowIndex < n) {
            this.treeArray[atRowIndex] += byRowHeight;
            atRowIndex |= (atRowIndex + 1);
        }
    };
    /**
     * Range Sum query from 1 to the rowIndex
     *
     * @param atIndex The row index until which the total height needs to be obtained.
     * @returns {number} The total height from row 1 to the rowIndex.
     */
    RowHeightCache.prototype.query = function (atIndex) {
        if (!this.treeArray.length) {
            throw new Error("query at index " + atIndex + " failed: Fenwick tree array not initialized.");
        }
        var sum = 0;
        atIndex |= 0;
        while (atIndex >= 0) {
            sum += this.treeArray[atIndex];
            atIndex = (atIndex & (atIndex + 1)) - 1;
        }
        return sum;
    };
    /**
     * Find the total height between 2 row indexes
     * @param atIndexA The row index from
     * @param atIndexB The row index to
     * @returns {number} total pixel height between 2 row indexes.
     */
    RowHeightCache.prototype.queryBetween = function (atIndexA, atIndexB) {
        return this.query(atIndexB) - this.query(atIndexA - 1);
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
     *
     * @param sum - The scrollY position.
     * @returns {number} - Index representing the first row visible in the viewport
     */
    RowHeightCache.prototype.calcRowIndex = function (sum) {
        if (!this.treeArray.length)
            return 0;
        var pos = -1;
        var dataLength = this.treeArray.length;
        // Get the highest bit for the block size.
        var highestBit = Math.pow(2, dataLength.toString(2).length - 1);
        for (var blockSize = highestBit; blockSize !== 0; blockSize >>= 1) {
            var nextPos = pos + blockSize;
            if (nextPos < dataLength && sum >= this.treeArray[nextPos]) {
                sum -= this.treeArray[nextPos];
                pos = nextPos;
            }
        }
        return pos + 1;
    };
    return RowHeightCache;
}());
exports.RowHeightCache = RowHeightCache;


/***/ }),

/***/ "./src/utils/scrollbar-width.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 * @return {int} width
 */
function getScrollBarWidth() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);
    var widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    var widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}
exports.getScrollBarWidth = getScrollBarWidth;
;
exports.scrollbarWidth = getScrollBarWidth();


/***/ }),

/***/ "./src/utils/selection.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function selectRows(selected, row, comparefn) {
    var selectedIndex = comparefn(row, selected);
    if (selectedIndex > -1) {
        selected.splice(selectedIndex, 1);
    }
    else {
        selected.push(row);
    }
    return selected;
}
exports.selectRows = selectRows;
function selectRowsBetween(selected, rows, index, prevIndex, comparefn) {
    var reverse = index < prevIndex;
    for (var i = 0, len = rows.length; i < len; i++) {
        var row = rows[i];
        var greater = i >= prevIndex && i <= index;
        var lesser = i <= prevIndex && i >= index;
        var range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: (prevIndex - index)
            };
        }
        else {
            range = {
                start: prevIndex,
                end: index + 1
            };
        }
        if ((reverse && lesser) || (!reverse && greater)) {
            // if in the positive range to be added to `selected`, and
            // not already in the selected array, add it
            if (i >= range.start && i <= range.end) {
                selected.push(row);
            }
        }
    }
    return selected;
}
exports.selectRowsBetween = selectRowsBetween;


/***/ }),

/***/ "./src/utils/sort.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var types_1 = __webpack_require__("./src/types/index.ts");
var deep_getter_1 = __webpack_require__("./src/utils/deep-getter.ts");
/**
 * Gets the next sort direction
 * @param  {SortType}      sortType
 * @param  {SortDirection} currentSort
 * @return {SortDirection}
 */
function nextSortDir(sortType, current) {
    if (sortType === types_1.SortType.single) {
        if (current === types_1.SortDirection.asc) {
            return types_1.SortDirection.desc;
        }
        else {
            return types_1.SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return types_1.SortDirection.asc;
        }
        else if (current === types_1.SortDirection.asc) {
            return types_1.SortDirection.desc;
        }
        else if (current === types_1.SortDirection.desc) {
            return undefined;
        }
    }
}
exports.nextSortDir = nextSortDir;
;
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 * @param  {any}    a
 * @param  {any}    b
 * @return {number} position
 */
function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
        // Convert to string in case of a=0 or b=0
        a = String(a);
        b = String(b);
        // Isn't a number so lowercase the string to properly compare
        if (a.toLowerCase() < b.toLowerCase())
            return -1;
        if (a.toLowerCase() > b.toLowerCase())
            return 1;
    }
    else {
        // Parse strings as numbers to compare properly
        if (parseFloat(a) < parseFloat(b))
            return -1;
        if (parseFloat(a) > parseFloat(b))
            return 1;
    }
    // equal each other
    return 0;
}
exports.orderByComparator = orderByComparator;
/**
 * Sorts the rows
 *
 * @export
 * @param {any[]} rows
 * @param {any[]} columns
 * @param {any[]} dirs
 * @returns
 */
function sortRows(rows, columns, dirs) {
    if (!rows || !dirs || !dirs.length || !columns)
        return rows;
    var temp = rows.slice();
    var cols = columns.reduce(function (obj, col) {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }, {});
    return temp.sort(function (a, b) {
        for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
            var _a = dirs_1[_i], prop = _a.prop, dir = _a.dir;
            var propA = deep_getter_1.deepValueGetter(a, prop);
            var propB = deep_getter_1.deepValueGetter(b, prop);
            var compareFn = cols[prop] || orderByComparator;
            var comparison = dir !== types_1.SortDirection.desc ?
                compareFn(propA, propB) :
                -compareFn(propA, propB);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        // equal each other
        return 0;
    });
}
exports.sortRows = sortRows;


/***/ }),

/***/ "./src/utils/throttle.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Throttle a function
 *
 * @export
 * @param {*} func
 * @param {number} wait
 * @param {*} [options]
 * @returns
 */
function throttle(func, wait, options) {
    options = options || {};
    var context;
    var args;
    var result;
    var timeout = null;
    var previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        var now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
exports.throttle = throttle;
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 *
 * @export
 * @param {number} duration
 * @param {*} [options]
 * @returns
 */
function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}
exports.throttleable = throttleable;


/***/ }),

/***/ "./src/utils/translate.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var prefixes_1 = __webpack_require__("./src/utils/prefixes.ts");
var camel_case_1 = __webpack_require__("./src/utils/camel-case.ts");
// browser detection and prefixing tools
var transform = prefixes_1.getVendorPrefixedName('transform');
var backfaceVisibility = prefixes_1.getVendorPrefixedName('backfaceVisibility');
var hasCSSTransforms = !!prefixes_1.getVendorPrefixedName('transform');
var hasCSS3DTransforms = !!prefixes_1.getVendorPrefixedName('perspective');
var ua = window.navigator.userAgent;
var isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);
function translateXY(styles, x, y) {
    if (hasCSSTransforms) {
        if (!isSafari && hasCSS3DTransforms) {
            styles[transform] = "translate3d(" + x + "px, " + y + "px, 0)";
            styles[backfaceVisibility] = 'hidden';
        }
        else {
            styles[camel_case_1.camelCase(transform)] = "translate(" + x + "px, " + y + "px)";
        }
    }
    else {
        styles.top = y + "px";
        styles.left = x + "px";
    }
}
exports.translateXY = translateXY;


/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.map