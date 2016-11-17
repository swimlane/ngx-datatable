/**
 * angular2-data-table v"1.6.0" (https://github.com/swimlane/angular2-data-table)
 * Copyright 2016
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("@angular/platform-browser-dynamic"), require("core-js/es6"), require("core-js/es7/reflect"), require("rxjs/Rx"), require("zone.js/dist/zone"));
	else if(typeof define === 'function' && define.amd)
		define("angular2-data-table", ["@angular/common", "@angular/core", "@angular/platform-browser", "@angular/platform-browser-dynamic", "core-js/es6", "core-js/es7/reflect", "rxjs/Rx", "zone.js/dist/zone"], factory);
	else if(typeof exports === 'object')
		exports["angular2-data-table"] = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("@angular/platform-browser-dynamic"), require("core-js/es6"), require("core-js/es7/reflect"), require("rxjs/Rx"), require("zone.js/dist/zone"));
	else
		root["angular2-data-table"] = factory(root["@angular/common"], root["@angular/core"], root["@angular/platform-browser"], root["@angular/platform-browser-dynamic"], root["core-js/es6"], root["core-js/es7/reflect"], root["rxjs/Rx"], root["zone.js/dist/zone"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/polyfills.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/polyfills.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
// ng2
var platform_browser_1 = __webpack_require__(4);
__webpack_require__(3);
var core_1 = __webpack_require__(0);
__webpack_require__(2);
// RxJS
__webpack_require__(1);
// optimization for production
// https://github.com/AngularClass/angular2-webpack-starter/blob/master/src/platform/environment.ts#L17
if (false) {
    Error.stackTraceLimit = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
}


/***/ },

/***/ 0:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },

/***/ 1:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },

/***/ 2:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 3:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },

/***/ 4:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },

/***/ 5:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },

/***/ 6:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },

/***/ 7:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }

/******/ })
});
;
//# sourceMappingURL=polyfills.map