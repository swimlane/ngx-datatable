/**
 * angular2-data-table v"14.0.0" (https://github.com/swimlane/angular2-data-table)
 * Copyright 2016
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("rxjs"), require("rxjs/operators"));
	else if(typeof define === 'function' && define.amd)
		define("ngxDatatable", ["@angular/common", "@angular/core", "@angular/platform-browser", "rxjs", "rxjs/operators"], factory);
	else if(typeof exports === 'object')
		exports["ngxDatatable"] = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("rxjs"), require("rxjs/operators"));
	else
		root["ngxDatatable"] = factory(root["@angular/common"], root["@angular/core"], root["@angular/platform-browser"], root["rxjs"], root["rxjs/operators"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE__angular_common__, __WEBPACK_EXTERNAL_MODULE__angular_core__, __WEBPACK_EXTERNAL_MODULE__angular_platform_browser__, __WEBPACK_EXTERNAL_MODULE_rxjs__, __WEBPACK_EXTERNAL_MODULE_rxjs_operators__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/sass-loader/lib/loader.js??ref--3-4!./src/components/datatable.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ngx-datatable {\n  display: block;\n  overflow: hidden;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  -webkit-transform: translate3d(0, 0, 0);\n  /**\r\n   * Vertical Scrolling Adjustments\r\n   */\n  /**\r\n   * Horizontal Scrolling Adjustments\r\n   */\n  /**\r\n   * Fixed Header Height Adjustments\r\n   */\n  /**\r\n   * Fixed row height adjustments\r\n   */\n  /**\r\n   * Shared Styles\r\n   */\n  /**\r\n   * Header Styles\r\n   */\n  /**\r\n   * Body Styles\r\n   */\n  /**\r\n   * Footer Styles\r\n   */ }\n  .ngx-datatable [hidden] {\n    display: none !important; }\n  .ngx-datatable *, .ngx-datatable *:before, .ngx-datatable *:after {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box; }\n  .ngx-datatable.scroll-vertical .datatable-body {\n    overflow-y: auto; }\n  .ngx-datatable.scroll-vertical.virtualized .datatable-body .datatable-row-wrapper {\n    position: absolute; }\n  .ngx-datatable.scroll-horz .datatable-body {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch; }\n  .ngx-datatable.fixed-header .datatable-header .datatable-header-inner {\n    white-space: nowrap; }\n    .ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell {\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n  .ngx-datatable.fixed-row .datatable-scroll {\n    white-space: nowrap; }\n    .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row {\n      white-space: nowrap; }\n      .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; }\n      .ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; }\n  .ngx-datatable .datatable-body-row,\n  .ngx-datatable .datatable-row-center,\n  .ngx-datatable .datatable-header-inner {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -ms-flex-flow: row;\n    -o-flex-flow: row;\n    flex-flow: row; }\n  .ngx-datatable .datatable-body-cell,\n  .ngx-datatable .datatable-header-cell {\n    overflow-x: hidden;\n    vertical-align: top;\n    display: inline-block;\n    line-height: 1.625; }\n    .ngx-datatable .datatable-body-cell:focus,\n    .ngx-datatable .datatable-header-cell:focus {\n      outline: none; }\n  .ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-right {\n    z-index: 9; }\n  .ngx-datatable .datatable-row-left,\n  .ngx-datatable .datatable-row-center,\n  .ngx-datatable .datatable-row-group,\n  .ngx-datatable .datatable-row-right {\n    position: relative; }\n  .ngx-datatable .datatable-header {\n    display: block;\n    overflow: hidden; }\n    .ngx-datatable .datatable-header .datatable-header-inner {\n      -webkit-box-align: stretch;\n          -ms-flex-align: stretch;\n              align-items: stretch;\n      -webkit-align-items: stretch; }\n    .ngx-datatable .datatable-header .datatable-header-cell {\n      position: relative;\n      display: inline-block; }\n      .ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper {\n        cursor: pointer; }\n      .ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper {\n        cursor: move; }\n      .ngx-datatable .datatable-header .datatable-header-cell .sort-btn {\n        line-height: 100%;\n        vertical-align: middle;\n        display: inline-block;\n        cursor: pointer; }\n      .ngx-datatable .datatable-header .datatable-header-cell .resize-handle, .ngx-datatable .datatable-header .datatable-header-cell .resize-handle--not-resizable {\n        display: inline-block;\n        position: absolute;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        width: 5px;\n        padding: 0 4px;\n        visibility: hidden; }\n      .ngx-datatable .datatable-header .datatable-header-cell .resize-handle {\n        cursor: ew-resize; }\n      .ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle {\n        visibility: visible; }\n      .ngx-datatable .datatable-header .datatable-header-cell:hover .resize-handle--not-resizable {\n        visibility: visible; }\n      .ngx-datatable .datatable-header .datatable-header-cell .targetMarker {\n        position: absolute;\n        top: 0;\n        bottom: 0; }\n        .ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromLeft {\n          right: 0; }\n        .ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromRight {\n          left: 0; }\n      .ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-template-wrap {\n        height: inherit; }\n  .ngx-datatable .datatable-body {\n    position: relative;\n    z-index: 10;\n    display: block; }\n    .ngx-datatable .datatable-body .datatable-scroll {\n      display: inline-block; }\n    .ngx-datatable .datatable-body .datatable-row-detail {\n      overflow-y: hidden; }\n    .ngx-datatable .datatable-body .datatable-row-wrapper {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n      flex-direction: column; }\n    .ngx-datatable .datatable-body .datatable-body-row {\n      outline: none; }\n      .ngx-datatable .datatable-body .datatable-body-row > div {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; }\n  .ngx-datatable .datatable-footer {\n    display: block;\n    width: 100%; }\n    .ngx-datatable .datatable-footer .datatable-footer-inner {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center;\n      width: 100%; }\n    .ngx-datatable .datatable-footer .selected-count .page-count {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 40%;\n              flex: 1 1 40%; }\n    .ngx-datatable .datatable-footer .selected-count .datatable-pager {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 60%;\n              flex: 1 1 60%; }\n    .ngx-datatable .datatable-footer .page-count {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 20%;\n              flex: 1 1 20%; }\n    .ngx-datatable .datatable-footer .datatable-pager {\n      -webkit-box-flex: 1;\n          -ms-flex: 1 1 80%;\n              flex: 1 1 80%;\n      text-align: right; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager,\n      .ngx-datatable .datatable-footer .datatable-pager .pager li {\n        padding: 0;\n        margin: 0;\n        display: inline-block;\n        list-style: none; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li, .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        outline: none; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li a {\n        cursor: pointer;\n        display: inline-block; }\n      .ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a {\n        cursor: not-allowed; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


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

/***/ "./src/components/datatable.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/sass-loader/lib/loader.js??ref--3-4!./src/components/datatable.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./src/events.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export MouseEvent */
/* unused harmony export KeyboardEvent */
/* unused harmony export Event */
/* tslint:disable */
var MouseEvent = ((typeof window !== 'undefined' && window) || global).MouseEvent;
var KeyboardEvent = ((typeof window !== 'undefined' && window) || global).KeyboardEvent;
var Event = ((typeof window !== 'undefined' && window) || global).Event;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: external "@angular/core"
var core_ = __webpack_require__("@angular/core");
var core__default = /*#__PURE__*/__webpack_require__.n(core_);

// EXTERNAL MODULE: external "@angular/common"
var common_ = __webpack_require__("@angular/common");
var common__default = /*#__PURE__*/__webpack_require__.n(common_);

// CONCATENATED MODULE: ./src/utils/id.ts
/**
 * Creates a unique object id.
 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 */
function id() {
    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
}

// CONCATENATED MODULE: ./src/utils/column.ts
/**
 * Returns the columns by pin.
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
/**
 * Returns the widths of all group sets of a column
 */
function columnGroupWidths(groups, all) {
    return {
        left: columnTotalWidth(groups.left),
        center: columnTotalWidth(groups.center),
        right: columnTotalWidth(groups.right),
        total: Math.floor(columnTotalWidth(all))
    };
}
/**
 * Calculates the total width of all columns and their groups
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
/**
 * Calculates the total width of all columns and their groups
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
function columnsByPinArr(val) {
    var colsByPinArr = [];
    var colsByPin = columnsByPin(val);
    colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
    colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
    colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });
    return colsByPinArr;
}

// CONCATENATED MODULE: ./src/utils/column-prop-getters.ts
// maybe rename this file to prop-getters.ts
/**
 * Always returns the empty string ''
 * @returns {string}
 */
function emptyStringGetter() {
    return '';
}
/**
 * Returns the appropriate getter function for this kind of prop.
 * If prop == null, returns the emptyStringGetter.
 */
function getterForProp(prop) {
    if (prop == null)
        return emptyStringGetter;
    if (typeof prop === 'number') {
        return numericIndexGetter;
    }
    else {
        // deep or simple
        if (prop.indexOf('.') !== -1) {
            return deepValueGetter;
        }
        else {
            return shallowValueGetter;
        }
    }
}
/**
 * Returns the value at this numeric index.
 * @param row array of values
 * @param index numeric index
 * @returns {any} or '' if invalid index
 */
function numericIndexGetter(row, index) {
    if (row == null)
        return '';
    // mimic behavior of deepValueGetter
    if (!row || index == null)
        return row;
    var value = row[index];
    if (value == null)
        return '';
    return value;
}
/**
 * Returns the value of a field.
 * (more efficient than deepValueGetter)
 * @param obj object containing the field
 * @param fieldName field name string
 * @returns {any}
 */
function shallowValueGetter(obj, fieldName) {
    if (obj == null)
        return '';
    if (!obj || !fieldName)
        return obj;
    var value = obj[fieldName];
    if (value == null)
        return '';
    return value;
}
/**
 * Returns a deep object given a string. zoo['animal.type']
 * @param {object} obj
 * @param {string} path
 */
function deepValueGetter(obj, path) {
    if (obj == null)
        return '';
    if (!obj || !path)
        return obj;
    // check if path matches a root-level field
    // { "a.b.c": 123 }
    var current = obj[path];
    if (current !== undefined)
        return current;
    current = obj;
    var split = path.split('.');
    if (split.length) {
        for (var i = 0; i < split.length; i++) {
            current = current[split[i]];
            // if found undefined, return empty string
            if (current === undefined || current === null)
                return '';
        }
    }
    return current;
}

// CONCATENATED MODULE: ./src/utils/camel-case.ts
/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
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
/**
 * Converts strings from camel case to words
 * http://stackoverflow.com/questions/7225407/convert-camelcasetext-to-camel-case-text
 */
function deCamelCase(str) {
    return str
        .replace(/([A-Z])/g, function (match) { return " " + match; })
        .replace(/^./, function (match) { return match.toUpperCase(); });
}

// CONCATENATED MODULE: ./src/utils/keys.ts
var Keys;
(function (Keys) {
    Keys[Keys["up"] = 38] = "up";
    Keys[Keys["down"] = 40] = "down";
    Keys[Keys["return"] = 13] = "return";
    Keys[Keys["escape"] = 27] = "escape";
    Keys[Keys["left"] = 37] = "left";
    Keys[Keys["right"] = 39] = "right";
})(Keys || (Keys = {}));

// CONCATENATED MODULE: ./src/utils/math.ts

/**
 * Calculates the Total Flex Grow
 */
function getTotalFlexGrow(columns) {
    var totalFlexGrow = 0;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var c = columns_1[_i];
        totalFlexGrow += c.flexGrow || 0;
    }
    return totalFlexGrow;
}
/**
 * Adjusts the column widths.
 * Inspired by: https://github.com/facebook/fixed-data-table/blob/master/src/FixedDataTableWidthHelper.js
 */
function adjustColumnWidths(allColumns, expectedWidth) {
    var columnsWidth = columnsTotalWidth(allColumns);
    var totalFlexGrow = getTotalFlexGrow(allColumns);
    var colsByGroup = columnsByPin(allColumns);
    if (columnsWidth !== expectedWidth) {
        scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
    }
}
/**
 * Resizes columns based on the flexGrow property, while respecting manually set widths
 */
function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
    // calculate total width and flexgrow points for coulumns that can be resized
    for (var attr in colsByGroup) {
        for (var _i = 0, _a = colsByGroup[attr]; _i < _a.length; _i++) {
            var column = _a[_i];
            if (!column.canAutoResize) {
                maxWidth -= column.width;
                totalFlexGrow -= column.flexGrow ? column.flexGrow : 0;
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
 * distribute equally but overflowing when necessary
 *
 * Rules:
 *
 *  - If combined withs are less than the total width of the grid,
 *    proportion the widths given the min / max / normal widths to fill the width.
 *
 *  - If the combined widths, exceed the total width of the grid,
 *    use the standard widths.
 *
 *  - If a column is resized, it should always use that width
 *
 *  - The proportional widths should never fall below min size if specified.
 *
 *  - If the grid starts off small but then becomes greater than the size ( + / - )
 *    the width should use the original width; not the newly proportioned widths.
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
/**
 * Remove the processed columns from the current active columns.
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

// CONCATENATED MODULE: ./src/utils/prefixes.ts

var cache = {};
var testStyle = typeof document !== 'undefined' ? document.createElement('div').style : undefined;
// Get Prefix
// http://davidwalsh.name/vendor-prefix
var prefix = function () {
    var styles = typeof window !== 'undefined' ? window.getComputedStyle(document.documentElement, '') : undefined;
    var match = typeof styles !== 'undefined' ?
        Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) : null;
    var pre = match !== null ? match[1] : undefined;
    var dom = typeof pre !== 'undefined' ? ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1] : undefined;
    return dom ? {
        dom: dom,
        lowercase: pre,
        css: "-" + pre + "-",
        js: pre[0].toUpperCase() + pre.substr(1)
    } : undefined;
}();
function getVendorPrefixedName(property) {
    var name = camelCase(property);
    if (!cache[name]) {
        if (prefix !== undefined && testStyle[prefix.css + property] !== undefined) {
            cache[name] = prefix.css + property;
        }
        else if (testStyle[property] !== undefined) {
            cache[name] = property;
        }
    }
    return cache[name];
}

// CONCATENATED MODULE: ./src/utils/selection.ts
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
function selectRowsBetween(selected, rows, index, prevIndex, comparefn) {
    var reverse = index < prevIndex;
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var greater = i >= prevIndex && i <= index;
        var lesser = i <= prevIndex && i >= index;
        var range = { start: 0, end: 0 };
        if (reverse) {
            range = {
                start: index,
                end: prevIndex
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

// CONCATENATED MODULE: ./src/utils/translate.ts


// browser detection and prefixing tools
var transform = typeof window !== 'undefined' ? getVendorPrefixedName('transform') : undefined;
var backfaceVisibility = typeof window !== 'undefined' ? getVendorPrefixedName('backfaceVisibility') : undefined;
var hasCSSTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('transform') : undefined;
var hasCSS3DTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('perspective') : undefined;
var ua = typeof window !== 'undefined' ? window.navigator.userAgent : 'Chrome';
var isSafari = (/Safari\//).test(ua) && !(/Chrome\//).test(ua);
function translateXY(styles, x, y) {
    if (typeof transform !== 'undefined' && hasCSSTransforms) {
        if (!isSafari && hasCSS3DTransforms) {
            styles[transform] = "translate3d(" + x + "px, " + y + "px, 0)";
            styles[backfaceVisibility] = 'hidden';
        }
        else {
            styles[camelCase(transform)] = "translate(" + x + "px, " + y + "px)";
        }
    }
    else {
        styles.top = y + "px";
        styles.left = x + "px";
    }
}

// CONCATENATED MODULE: ./src/utils/throttle.ts
/**
 * Throttle a function
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
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
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

// CONCATENATED MODULE: ./src/types/column-mode.type.ts
var ColumnMode;
(function (ColumnMode) {
    ColumnMode["standard"] = "standard";
    ColumnMode["flex"] = "flex";
    ColumnMode["force"] = "force";
})(ColumnMode || (ColumnMode = {}));

// CONCATENATED MODULE: ./src/types/sort.type.ts
var SortType;
(function (SortType) {
    SortType["single"] = "single";
    SortType["multi"] = "multi";
})(SortType || (SortType = {}));

// CONCATENATED MODULE: ./src/types/sort-direction.type.ts
var SortDirection;
(function (SortDirection) {
    SortDirection["asc"] = "asc";
    SortDirection["desc"] = "desc";
})(SortDirection || (SortDirection = {}));

// CONCATENATED MODULE: ./src/types/selection.type.ts
var SelectionType;
(function (SelectionType) {
    SelectionType["single"] = "single";
    SelectionType["multi"] = "multi";
    SelectionType["multiClick"] = "multiClick";
    SelectionType["cell"] = "cell";
    SelectionType["checkbox"] = "checkbox";
})(SelectionType || (SelectionType = {}));

// CONCATENATED MODULE: ./src/types/click.type.ts
var ClickType;
(function (ClickType) {
    ClickType["single"] = "single";
    ClickType["double"] = "double";
})(ClickType || (ClickType = {}));

// CONCATENATED MODULE: ./src/types/contextmenu.type.ts
var ContextmenuType;
(function (ContextmenuType) {
    ContextmenuType["header"] = "header";
    ContextmenuType["body"] = "body";
})(ContextmenuType || (ContextmenuType = {}));

// CONCATENATED MODULE: ./src/types/index.ts







// CONCATENATED MODULE: ./src/utils/sort.ts


/**
 * Gets the next sort direction
 */
function nextSortDir(sortType, current) {
    if (sortType === SortType.single) {
        if (current === SortDirection.asc) {
            return SortDirection.desc;
        }
        else {
            return SortDirection.asc;
        }
    }
    else {
        if (!current) {
            return SortDirection.asc;
        }
        else if (current === SortDirection.asc) {
            return SortDirection.desc;
        }
        else if (current === SortDirection.desc) {
            return undefined;
        }
        // avoid TS7030: Not all code paths return a value.
        return undefined;
    }
}
/**
 * Adapted from fueld-ui on 6/216
 * https://github.com/FuelInteractive/fuel-ui/tree/master/src/pipes/OrderBy
 */
function orderByComparator(a, b) {
    if (a === null || typeof a === 'undefined')
        a = 0;
    if (b === null || typeof b === 'undefined')
        b = 0;
    if (a instanceof Date && b instanceof Date) {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
    }
    else if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
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
/**
 * creates a shallow copy of the `rows` input and returns the sorted copy. this function
 * does not sort the `rows` argument in place
 */
function sortRows(rows, columns, dirs) {
    if (!rows)
        return [];
    if (!dirs || !dirs.length || !columns)
        return rows.slice();
    /**
     * record the row ordering of results from prior sort operations (if applicable)
     * this is necessary to guarantee stable sorting behavior
     */
    var rowToIndexMap = new Map();
    rows.forEach(function (row, index) { return rowToIndexMap.set(row, index); });
    var temp = rows.slice();
    var cols = columns.reduce(function (obj, col) {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }, {});
    // cache valueGetter and compareFn so that they
    // do not need to be looked-up in the sort function body
    var cachedDirs = dirs.map(function (dir) {
        var prop = dir.prop;
        return {
            prop: prop,
            dir: dir.dir,
            valueGetter: getterForProp(prop),
            compareFn: cols[prop] || orderByComparator
        };
    });
    return temp.sort(function (rowA, rowB) {
        for (var _i = 0, cachedDirs_1 = cachedDirs; _i < cachedDirs_1.length; _i++) {
            var cachedDir = cachedDirs_1[_i];
            // Get property and valuegetters for column to be sorted
            var prop = cachedDir.prop, valueGetter = cachedDir.valueGetter;
            // Get A and B cell values from rows based on properties of the columns
            var propA = valueGetter(rowA, prop);
            var propB = valueGetter(rowB, prop);
            // Compare function gets five parameters:
            // Two cell values to be compared as propA and propB
            // Two rows corresponding to the cells as rowA and rowB
            // Direction of the sort for this column as SortDirection
            // Compare can be a standard JS comparison function (a,b) => -1|0|1
            // as additional parameters are silently ignored. The whole row and sort
            // direction enable more complex sort logic.
            var comparison = cachedDir.dir !== SortDirection.desc ?
                cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir) :
                -cachedDir.compareFn(propA, propB, rowA, rowB, cachedDir.dir);
            // Don't return 0 yet in case of needing to sort by next property
            if (comparison !== 0)
                return comparison;
        }
        if (!(rowToIndexMap.has(rowA) && rowToIndexMap.has(rowB)))
            return 0;
        /**
         * all else being equal, preserve original order of the rows (stable sort)
         */
        return rowToIndexMap.get(rowA) < rowToIndexMap.get(rowB) ? -1 : 1;
    });
}

// CONCATENATED MODULE: ./src/utils/row-height-cache.ts
/**
 * This object contains the cache of the various row heights that are present inside
 * the data table.   Its based on Fenwick tree data structure that helps with
 * querying sums that have time complexity of log n.
 *
 * Fenwick Tree Credits: http://petr-mitrichev.blogspot.com/2013/05/fenwick-tree-range-updates.html
 * https://github.com/mikolalysenko/fenwick-tree
 *
 */
var RowHeightCache = /** @class */ (function () {
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
    RowHeightCache.prototype.initCache = function (details) {
        var rows = details.rows, rowHeight = details.rowHeight, detailRowHeight = details.detailRowHeight, externalVirtual = details.externalVirtual, rowCount = details.rowCount, rowIndexes = details.rowIndexes, rowExpansions = details.rowExpansions;
        var isFn = typeof rowHeight === 'function';
        var isDetailFn = typeof detailRowHeight === 'function';
        if (!isFn && isNaN(rowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'rowHeight' is a\n        valid number or function value: (" + rowHeight + ") when 'scrollbarV' is enabled.");
        }
        // Add this additional guard in case detailRowHeight is set to 'auto' as it wont work.
        if (!isDetailFn && isNaN(detailRowHeight)) {
            throw new Error("Row Height cache initialization failed. Please ensure that 'detailRowHeight' is a\n        valid number or function value: (" + detailRowHeight + ") when 'scrollbarV' is enabled.");
        }
        var n = externalVirtual ? rowCount : rows.length;
        this.treeArray = new Array(n);
        for (var i = 0; i < n; ++i) {
            this.treeArray[i] = 0;
        }
        for (var i = 0; i < n; ++i) {
            var row = rows[i];
            var currentRowHeight = rowHeight;
            if (isFn) {
                currentRowHeight = rowHeight(row);
            }
            // Add the detail row height to the already expanded rows.
            // This is useful for the table that goes through a filter or sort.
            var expanded = rowExpansions.get(row);
            if (row && expanded === 1) {
                if (isDetailFn) {
                    var index = rowIndexes.get(row);
                    currentRowHeight += detailRowHeight(row, index);
                }
                else {
                    currentRowHeight += detailRowHeight;
                }
            }
            this.update(i, currentRowHeight);
        }
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.  Below handles edge cases.
     */
    RowHeightCache.prototype.getRowIndex = function (scrollY) {
        if (scrollY === 0)
            return 0;
        return this.calcRowIndex(scrollY);
    };
    /**
     * When a row is expanded or rowHeight is changed, update the height.  This can
     * be utilized in future when Angular Data table supports dynamic row heights.
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
     */
    RowHeightCache.prototype.queryBetween = function (atIndexA, atIndexB) {
        return this.query(atIndexB) - this.query(atIndexA - 1);
    };
    /**
     * Given the ScrollY position i.e. sum, provide the rowIndex
     * that is present in the current view port.
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


// CONCATENATED MODULE: ./src/utils/column-helper.ts



/**
 * Sets the column defaults
 */
function setColumnDefaults(columns) {
    if (!columns)
        return;
    // Only one column should hold the tree view
    // Thus if multiple columns are provided with
    // isTreeColumn as true we take only the first one
    var treeColumnFound = false;
    for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
        var column = columns_1[_i];
        if (!column.$$id) {
            column.$$id = id();
        }
        // prop can be numeric; zero is valid not a missing prop
        // translate name => prop
        if (isNullOrUndefined(column.prop) && column.name) {
            column.prop = camelCase(column.name);
        }
        if (!column.$$valueGetter) {
            column.$$valueGetter = getterForProp(column.prop);
        }
        // format props if no name passed
        if (!isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
            column.name = deCamelCase(String(column.prop));
        }
        if (isNullOrUndefined(column.prop) && isNullOrUndefined(column.name)) {
            column.name = ''; // Fixes IE and Edge displaying `null`
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
        if (!column.hasOwnProperty('isTreeColumn')) {
            column.isTreeColumn = false;
        }
        else {
            if (column.isTreeColumn && !treeColumnFound) {
                // If the first column with isTreeColumn is true found
                // we mark that treeCoulmn is found
                treeColumnFound = true;
            }
            else {
                // After that isTreeColumn property for any other column
                // will be set as false
                column.isTreeColumn = false;
            }
        }
    }
}
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}
/**
 * Translates templates definitions to objects
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
        if (temp.summaryFunc) {
            col.summaryFunc = temp.summaryFunc;
        }
        if (temp.summaryTemplate) {
            col.summaryTemplate = temp.summaryTemplate;
        }
        result.push(col);
    }
    return result;
}

// CONCATENATED MODULE: ./src/utils/elm-from-point.ts
if (typeof document !== 'undefined' && !document.elementsFromPoint) {
    document.elementsFromPoint = elementsFromPoint;
}
/*tslint:disable*/
/**
 * Polyfill for `elementsFromPoint`
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint
 * https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380
 * https://gist.github.com/oslego/7265412
 */
function elementsFromPoint(x, y) {
    var elements = [];
    var previousPointerEvents = [];
    var current; // TODO: window.getComputedStyle should be used with inferred type (Element)
    var i;
    var d;
    //if (document === undefined) return elements;
    // get all elements via elementFromPoint, and remove them from hit-testing in order
    while ((current = document.elementFromPoint(x, y)) && elements.indexOf(current) === -1 && current != null) {
        // push the element and its current style
        elements.push(current);
        previousPointerEvents.push({
            value: current.style.getPropertyValue('pointer-events'),
            priority: current.style.getPropertyPriority('pointer-events')
        });
        // add "pointer-events: none", to get to the underlying element
        current.style.setProperty('pointer-events', 'none', 'important');
    }
    // restore the previous pointer-events values
    for (i = previousPointerEvents.length; d = previousPointerEvents[--i];) {
        elements[i].style.setProperty('pointer-events', d.value ? d.value : '', d.priority);
    }
    // return our results
    return elements;
}
/*tslint:enable*/

// CONCATENATED MODULE: ./src/utils/tree.ts

function optionalGetterForProp(prop) {
    return prop && (function (row) { return getterForProp(prop)(row, prop); });
}
/**
 * This functions rearrange items by their parents
 * Also sets the level value to each of the items
 *
 * Note: Expecting each item has a property called parentId
 * Note: This algorithm will fail if a list has two or more items with same ID
 * NOTE: This algorithm will fail if there is a deadlock of relationship
 *
 * For example,
 *
 * Input
 *
 * id -> parent
 * 1  -> 0
 * 2  -> 0
 * 3  -> 1
 * 4  -> 1
 * 5  -> 2
 * 7  -> 8
 * 6  -> 3
 *
 *
 * Output
 * id -> level
 * 1      -> 0
 * --3    -> 1
 * ----6  -> 2
 * --4    -> 1
 * 2      -> 0
 * --5    -> 1
 * 7     -> 8
 *
 *
 * @param rows
 *
 */
function groupRowsByParents(rows, from, to) {
    if (from && to) {
        var nodeById = {};
        var l = rows.length;
        var node = null;
        nodeById[0] = new TreeNode(); // that's the root node
        var uniqIDs = rows.reduce(function (arr, item) {
            var toValue = to(item);
            if (arr.indexOf(toValue) === -1) {
                arr.push(toValue);
            }
            return arr;
        }, []);
        for (var i = 0; i < l; i++) { // make TreeNode objects for each item
            nodeById[to(rows[i])] = new TreeNode(rows[i]);
        }
        for (var i = 0; i < l; i++) { // link all TreeNode objects
            node = nodeById[to(rows[i])];
            var parent_1 = 0;
            var fromValue = from(node.row);
            if (!!fromValue && (uniqIDs.indexOf(fromValue) > -1)) {
                parent_1 = fromValue;
            }
            node.parent = nodeById[parent_1];
            node.row['level'] = node.parent.row['level'] + 1;
            node.parent.children.push(node);
        }
        var resolvedRows_1 = [];
        nodeById[0].flatten(function () {
            resolvedRows_1 = resolvedRows_1.concat([this.row]);
        }, true);
        return resolvedRows_1;
    }
    else {
        return rows;
    }
}
var TreeNode = /** @class */ (function () {
    function TreeNode(row) {
        if (row === void 0) { row = null; }
        if (!row) {
            row = {
                level: -1,
                treeStatus: 'expanded'
            };
        }
        this.row = row;
        this.parent = null;
        this.children = [];
    }
    TreeNode.prototype.flatten = function (f, recursive) {
        if (this.row['treeStatus'] === 'expanded') {
            for (var i = 0, l = this.children.length; i < l; i++) {
                var child = this.children[i];
                f.apply(child, Array.prototype.slice.call(arguments, 2));
                if (recursive)
                    child.flatten.apply(child, arguments);
            }
        }
    };
    return TreeNode;
}());

// CONCATENATED MODULE: ./src/utils/index.ts
















// EXTERNAL MODULE: external "@angular/platform-browser"
var platform_browser_ = __webpack_require__("@angular/platform-browser");
var platform_browser__default = /*#__PURE__*/__webpack_require__.n(platform_browser_);

// CONCATENATED MODULE: ./src/services/scrollbar-helper.service.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
var scrollbar_helper_service_ScrollbarHelper = /** @class */ (function () {
    function ScrollbarHelper(document) {
        this.document = document;
        this.width = this.getWidth();
    }
    ScrollbarHelper.prototype.getWidth = function () {
        var outer = this.document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.msOverflowStyle = 'scrollbar';
        this.document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';
        var inner = this.document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    };
    ScrollbarHelper = __decorate([
        Object(core_["Injectable"])(),
        __param(0, Object(core_["Inject"])(platform_browser_["DOCUMENT"])),
        __metadata("design:paramtypes", [Object])
    ], ScrollbarHelper);
    return ScrollbarHelper;
}());


// CONCATENATED MODULE: ./src/services/dimensions-helper.service.ts
var dimensions_helper_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Gets the width of the scrollbar.  Nesc for windows
 * http://stackoverflow.com/a/13382873/888165
 */
var dimensions_helper_service_DimensionsHelper = /** @class */ (function () {
    function DimensionsHelper() {
    }
    DimensionsHelper.prototype.getDimensions = function (element) {
        return element.getBoundingClientRect();
    };
    DimensionsHelper = dimensions_helper_service___decorate([
        Object(core_["Injectable"])()
    ], DimensionsHelper);
    return DimensionsHelper;
}());


// EXTERNAL MODULE: external "rxjs"
var external__rxjs_ = __webpack_require__("rxjs");
var external__rxjs__default = /*#__PURE__*/__webpack_require__.n(external__rxjs_);

// CONCATENATED MODULE: ./src/services/column-changes.service.ts
var column_changes_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * service to make DatatableComponent aware of changes to
 * input bindings of DataTableColumnDirective
 */
var column_changes_service_ColumnChangesService = /** @class */ (function () {
    function ColumnChangesService() {
        this.columnInputChanges = new external__rxjs_["Subject"]();
    }
    Object.defineProperty(ColumnChangesService.prototype, "columnInputChanges$", {
        get: function () {
            return this.columnInputChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ColumnChangesService.prototype.onInputChange = function () {
        this.columnInputChanges.next();
    };
    ColumnChangesService = column_changes_service___decorate([
        Object(core_["Injectable"])()
    ], ColumnChangesService);
    return ColumnChangesService;
}());


// CONCATENATED MODULE: ./src/services/index.ts




// CONCATENATED MODULE: ./src/components/body/scroller.component.ts
var scroller_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var scroller_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var scroller_component_ScrollerComponent = /** @class */ (function () {
    function ScrollerComponent(ngZone, element, renderer) {
        this.ngZone = ngZone;
        this.renderer = renderer;
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.scroll = new core_["EventEmitter"]();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
    }
    ScrollerComponent.prototype.ngOnInit = function () {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            var renderer = this.renderer;
            this.parentElement = renderer.parentNode(renderer.parentNode(this.element));
            this.parentElement.addEventListener('scroll', this.onScrolled.bind(this));
        }
    };
    ScrollerComponent.prototype.ngOnDestroy = function () {
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement.removeEventListener('scroll', this.onScrolled.bind(this));
        }
    };
    ScrollerComponent.prototype.setOffset = function (offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    };
    ScrollerComponent.prototype.onScrolled = function (event) {
        var _this = this;
        var dom = event.currentTarget;
        requestAnimationFrame(function () {
            _this.scrollYPos = dom.scrollTop;
            _this.scrollXPos = dom.scrollLeft;
            _this.updateOffset();
        });
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
    scroller_component___decorate([
        Object(core_["Input"])(),
        scroller_component___metadata("design:type", Boolean)
    ], ScrollerComponent.prototype, "scrollbarV", void 0);
    scroller_component___decorate([
        Object(core_["Input"])(),
        scroller_component___metadata("design:type", Boolean)
    ], ScrollerComponent.prototype, "scrollbarH", void 0);
    scroller_component___decorate([
        Object(core_["HostBinding"])('style.height.px'),
        Object(core_["Input"])(),
        scroller_component___metadata("design:type", Number)
    ], ScrollerComponent.prototype, "scrollHeight", void 0);
    scroller_component___decorate([
        Object(core_["HostBinding"])('style.width.px'),
        Object(core_["Input"])(),
        scroller_component___metadata("design:type", Number)
    ], ScrollerComponent.prototype, "scrollWidth", void 0);
    scroller_component___decorate([
        Object(core_["Output"])(),
        scroller_component___metadata("design:type", core_["EventEmitter"])
    ], ScrollerComponent.prototype, "scroll", void 0);
    ScrollerComponent = scroller_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-scroller',
            template: "\n    <ng-content></ng-content>\n  ",
            host: {
                class: 'datatable-scroll'
            },
            changeDetection: core_["ChangeDetectionStrategy"].OnPush
        }),
        scroller_component___metadata("design:paramtypes", [core_["NgZone"], core_["ElementRef"], core_["Renderer2"]])
    ], ScrollerComponent);
    return ScrollerComponent;
}());


// CONCATENATED MODULE: ./src/components/body/body.component.ts
var body_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var body_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var body_component_DataTableBodyComponent = /** @class */ (function () {
    /**
     * Creates an instance of DataTableBodyComponent.
     */
    function DataTableBodyComponent(cd) {
        var _this = this;
        this.cd = cd;
        this.selected = [];
        this.scroll = new core_["EventEmitter"]();
        this.page = new core_["EventEmitter"]();
        this.activate = new core_["EventEmitter"]();
        this.select = new core_["EventEmitter"]();
        this.detailToggle = new core_["EventEmitter"]();
        this.rowContextmenu = new core_["EventEmitter"](false);
        this.treeAction = new core_["EventEmitter"]();
        this.rowHeightsCache = new RowHeightCache();
        this.temp = [];
        this.offsetY = 0;
        this.indexes = {};
        this.rowIndexes = new Map();
        this.rowExpansions = new Map();
        /**
         * Get the height of the detail row.
         */
        this.getDetailRowHeight = function (row, index) {
            if (!_this.rowDetail)
                return 0;
            var rowHeight = _this.rowDetail.rowHeight;
            return typeof rowHeight === 'function' ? rowHeight(row, index) : rowHeight;
        };
        // declare fn here so we can get access to the `this` property
        this.rowTrackingFn = function (index, row) {
            var idx = this.getRowIndex(row);
            if (this.trackByProp) {
                return idx + "-" + this.trackByProp;
            }
            else {
                return idx;
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
            this.rowExpansions.clear();
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
            var colsByPin = columnsByPin(val);
            this.columnGroupWidths = columnGroupWidths(colsByPin, val);
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
         * based on the row heights cache for virtual scroll and virtualization. Other scenarios
         * calculate scroll height automatically (as height will be undefined).
         */
        get: function () {
            if (this.scrollbarV && this.virtualization && this.rowCount) {
                return this.rowHeightsCache.query(this.rowCount - 1);
            }
            // avoid TS7030: Not all code paths return a value.
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called after the constructor, initializing input properties
     */
    DataTableBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.rowDetail) {
            this.listener = this.rowDetail.toggle
                .subscribe(function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'row')
                    _this.toggleRowExpansion(value);
                if (type === 'all')
                    _this.toggleAllRows(value);
                // Refresh rows after toggle
                // Fixes #883
                _this.updateIndexes();
                _this.updateRows();
                _this.cd.markForCheck();
            });
        }
        if (this.groupHeader) {
            this.listener = this.groupHeader.toggle
                .subscribe(function (_a) {
                var type = _a.type, value = _a.value;
                if (type === 'group')
                    _this.toggleRowExpansion(value);
                if (type === 'all')
                    _this.toggleAllRows(value);
                // Refresh rows after toggle
                // Fixes #883
                _this.updateIndexes();
                _this.updateRows();
                _this.cd.markForCheck();
            });
        }
    };
    /**
     * Called once, before the instance is destroyed.
     */
    DataTableBodyComponent.prototype.ngOnDestroy = function () {
        if (this.rowDetail)
            this.listener.unsubscribe();
        if (this.groupHeader)
            this.listener.unsubscribe();
    };
    /**
     * Updates the Y offset given a new offset.
     */
    DataTableBodyComponent.prototype.updateOffsetY = function (offset) {
        // scroller is missing on empty table
        if (!this.scroller)
            return;
        if (this.scrollbarV && this.virtualization && offset) {
            // First get the row Index that we need to move to.
            var rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        else if (this.scrollbarV && !this.virtualization) {
            offset = 0;
        }
        this.scroller.setOffset(offset || 0);
    };
    /**
     * Body was scrolled, this is mainly useful for
     * when a user is server-side pagination via virtual scroll.
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
     */
    DataTableBodyComponent.prototype.updatePage = function (direction) {
        var offset = this.indexes.first / this.pageSize;
        if (direction === 'up') {
            offset = Math.ceil(offset);
        }
        else if (direction === 'down') {
            offset = Math.floor(offset);
        }
        if (direction !== undefined && !isNaN(offset)) {
            this.page.emit({ offset: offset });
        }
    };
    /**
     * Updates the rows in the view port
     */
    DataTableBodyComponent.prototype.updateRows = function () {
        var _a = this.indexes, first = _a.first, last = _a.last;
        var rowIndex = first;
        var idx = 0;
        var temp = [];
        this.rowIndexes.clear();
        // if grouprowsby has been specified treat row paging
        // parameters as group paging parameters ie if limit 10 has been
        // specified treat it as 10 groups rather than 10 rows
        if (this.groupedRows) {
            var maxRowsPerGroup = 3;
            // if there is only one group set the maximum number of
            // rows per group the same as the total number of rows
            if (this.groupedRows.length === 1) {
                maxRowsPerGroup = this.groupedRows[0].value.length;
            }
            while (rowIndex < last && rowIndex < this.groupedRows.length) {
                // Add the groups into this page
                var group = this.groupedRows[rowIndex];
                temp[idx] = group;
                idx++;
                // Group index in this context
                rowIndex++;
            }
        }
        else {
            while (rowIndex < last && rowIndex < this.rowCount) {
                var row = this.rows[rowIndex];
                if (row) {
                    this.rowIndexes.set(row, rowIndex);
                    temp[idx] = row;
                }
                idx++;
                rowIndex++;
            }
        }
        this.temp = temp;
    };
    /**
     * Get the row height
     */
    DataTableBodyComponent.prototype.getRowHeight = function (row) {
        // if its a function return it
        if (typeof this.rowHeight === 'function') {
            return this.rowHeight(row);
        }
        return this.rowHeight;
    };
    /**
     * @param group the group with all rows
     */
    DataTableBodyComponent.prototype.getGroupHeight = function (group) {
        var rowHeight = 0;
        if (group.value) {
            for (var index = 0; index < group.value.length; index++) {
                rowHeight += this.getRowAndDetailHeight(group.value[index]);
            }
        }
        return rowHeight;
    };
    /**
     * Calculate row height based on the expanded state of the row.
     */
    DataTableBodyComponent.prototype.getRowAndDetailHeight = function (row) {
        var rowHeight = this.getRowHeight(row);
        var expanded = this.rowExpansions.get(row);
        // Adding detail row height if its expanded.
        if (expanded === 1) {
            rowHeight += this.getDetailRowHeight(row);
        }
        return rowHeight;
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
     * @param {*} rows The row that needs to be placed in the 2D space.
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getRowsStyles = function (rows) {
        var styles = {};
        // only add styles for the group if there is a group
        if (this.groupedRows) {
            styles['width'] = this.columnGroupWidths.total;
        }
        if (this.scrollbarV && this.virtualization) {
            var idx = 0;
            if (this.groupedRows) {
                // Get the latest row rowindex in a group
                var row = rows[rows.length - 1];
                idx = row ? this.getRowIndex(row) : 0;
            }
            else {
                idx = this.getRowIndex(rows);
            }
            // const pos = idx * rowHeight;
            // The position of this row would be the sum of all row heights
            // until the previous row position.
            var pos = this.rowHeightsCache.query(idx - 1);
            translateXY(styles, 0, pos);
        }
        return styles;
    };
    /**
     * Calculate bottom summary row offset for scrollbar mode.
     * For more information about cache and offset calculation
     * see description for `getRowsStyles` method
     *
     * @returns {*} Returns the CSS3 style to be applied
     *
     * @memberOf DataTableBodyComponent
     */
    DataTableBodyComponent.prototype.getBottomSummaryRowStyles = function () {
        if (!this.scrollbarV || !this.rows || !this.rows.length) {
            return null;
        }
        var styles = { position: 'absolute' };
        var pos = this.rowHeightsCache.query(this.rows.length - 1);
        translateXY(styles, 0, pos);
        return styles;
    };
    /**
     * Hides the loading indicator
     */
    DataTableBodyComponent.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.loadingIndicator = false; }, 500);
    };
    /**
     * Updates the index of the rows in the viewport
     */
    DataTableBodyComponent.prototype.updateIndexes = function () {
        var first = 0;
        var last = 0;
        if (this.scrollbarV) {
            if (this.virtualization) {
                // Calculation of the first and last indexes will be based on where the
                // scrollY position would be at.  The last index would be the one
                // that shows up inside the view port the last.
                var height = parseInt(this.bodyHeight, 0);
                first = this.rowHeightsCache.getRowIndex(this.offsetY);
                last = this.rowHeightsCache.getRowIndex(height + this.offsetY) + 1;
            }
            else {
                // If virtual rows are not needed
                // We render all in one go
                first = 0;
                last = this.rowCount;
            }
        }
        else {
            // The server is handling paging and will pass an array that begins with the
            // element at a specified offset.  first should always be 0 with external paging.
            if (!this.externalPaging) {
                first = Math.max(this.offset * this.pageSize, 0);
            }
            last = Math.min((first + this.pageSize), this.rowCount);
        }
        this.indexes = { first: first, last: last };
    };
    /**
     * Refreshes the full Row Height cache.  Should be used
     * when the entire row array state has changed.
     */
    DataTableBodyComponent.prototype.refreshRowHeightCache = function () {
        if (!this.scrollbarV || (this.scrollbarV && !this.virtualization))
            return;
        // clear the previous row height cache if already present.
        // this is useful during sorts, filters where the state of the
        // rows array is changed.
        this.rowHeightsCache.clearCache();
        // Initialize the tree only if there are rows inside the tree.
        if (this.rows && this.rows.length) {
            this.rowHeightsCache.initCache({
                rows: this.rows,
                rowHeight: this.rowHeight,
                detailRowHeight: this.getDetailRowHeight,
                externalVirtual: this.scrollbarV && this.externalPaging,
                rowCount: this.rowCount,
                rowIndexes: this.rowIndexes,
                rowExpansions: this.rowExpansions
            });
        }
    };
    /**
     * Gets the index for the view port
     */
    DataTableBodyComponent.prototype.getAdjustedViewPortIndex = function () {
        // Capture the row index of the first row that is visible on the viewport.
        // If the scroll bar is just below the row which is highlighted then make that as the
        // first index.
        var viewPortFirstRowIndex = this.indexes.first;
        if (this.scrollbarV && this.virtualization) {
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
     */
    DataTableBodyComponent.prototype.toggleRowExpansion = function (row) {
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        var expanded = this.rowExpansions.get(row);
        // If the detailRowHeight is auto --> only in case of non-virtualized scroll
        if (this.scrollbarV && this.virtualization) {
            var detailRowHeight = this.getDetailRowHeight(row) * (expanded ? -1 : 1);
            // const idx = this.rowIndexes.get(row) || 0;
            var idx = this.getRowIndex(row);
            this.rowHeightsCache.update(idx, detailRowHeight);
        }
        // Update the toggled row and update thive nevere heights in the cache.
        expanded = expanded ^= 1;
        this.rowExpansions.set(row, expanded);
        this.detailToggle.emit({
            rows: [row],
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Expand/Collapse all the rows no matter what their state is.
     */
    DataTableBodyComponent.prototype.toggleAllRows = function (expanded) {
        // clear prev expansions
        this.rowExpansions.clear();
        var rowExpanded = expanded ? 1 : 0;
        // Capture the row index of the first row that is visible on the viewport.
        var viewPortFirstRowIndex = this.getAdjustedViewPortIndex();
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var row = _a[_i];
            this.rowExpansions.set(row, rowExpanded);
        }
        if (this.scrollbarV) {
            // Refresh the full row heights cache since every row was affected.
            this.recalcLayout();
        }
        // Emit all rows that have been expanded.
        this.detailToggle.emit({
            rows: this.rows,
            currentIndex: viewPortFirstRowIndex
        });
    };
    /**
     * Recalculates the table
     */
    DataTableBodyComponent.prototype.recalcLayout = function () {
        this.refreshRowHeightCache();
        this.updateIndexes();
        this.updateRows();
    };
    /**
     * Tracks the column
     */
    DataTableBodyComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    /**
     * Gets the row pinning group styles
     */
    DataTableBodyComponent.prototype.stylesByGroup = function (group) {
        var widths = this.columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var bodyWidth = parseInt(this.innerWidth + '', 0);
            var totalDiff = widths.total - bodyWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = offsetDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
    /**
     * Returns if the row was expanded and set default row expansion when row expansion is empty
     */
    DataTableBodyComponent.prototype.getRowExpanded = function (row) {
        if (this.rowExpansions.size === 0 && this.groupExpansionDefault) {
            for (var _i = 0, _a = this.groupedRows; _i < _a.length; _i++) {
                var group = _a[_i];
                this.rowExpansions.set(group, 1);
            }
        }
        var expanded = this.rowExpansions.get(row);
        return expanded === 1;
    };
    /**
     * Gets the row index given a row
     */
    DataTableBodyComponent.prototype.getRowIndex = function (row) {
        return this.rowIndexes.get(row) || 0;
    };
    DataTableBodyComponent.prototype.onTreeAction = function (row) {
        this.treeAction.emit({ row: row });
    };
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarV", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "scrollbarH", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "loadingIndicator", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "externalPaging", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowHeight", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "offsetX", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "emptyMessage", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "selectionType", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Array)
    ], DataTableBodyComponent.prototype, "selected", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowIdentity", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowDetail", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "groupHeader", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "selectCheck", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "displayCheck", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "trackByProp", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowClass", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "groupedRows", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "groupExpansionDefault", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "innerWidth", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "groupRowsBy", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "virtualization", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Boolean)
    ], DataTableBodyComponent.prototype, "summaryRow", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", String)
    ], DataTableBodyComponent.prototype, "summaryPosition", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Number)
    ], DataTableBodyComponent.prototype, "summaryHeight", void 0);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Number),
        body_component___metadata("design:paramtypes", [Number])
    ], DataTableBodyComponent.prototype, "pageSize", null);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Array),
        body_component___metadata("design:paramtypes", [Array])
    ], DataTableBodyComponent.prototype, "rows", null);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Array),
        body_component___metadata("design:paramtypes", [Array])
    ], DataTableBodyComponent.prototype, "columns", null);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Number),
        body_component___metadata("design:paramtypes", [Number])
    ], DataTableBodyComponent.prototype, "offset", null);
    body_component___decorate([
        Object(core_["Input"])(),
        body_component___metadata("design:type", Number),
        body_component___metadata("design:paramtypes", [Number])
    ], DataTableBodyComponent.prototype, "rowCount", null);
    body_component___decorate([
        Object(core_["HostBinding"])('style.width'),
        body_component___metadata("design:type", String),
        body_component___metadata("design:paramtypes", [])
    ], DataTableBodyComponent.prototype, "bodyWidth", null);
    body_component___decorate([
        Object(core_["Input"])(),
        Object(core_["HostBinding"])('style.height'),
        body_component___metadata("design:type", Object),
        body_component___metadata("design:paramtypes", [Object])
    ], DataTableBodyComponent.prototype, "bodyHeight", null);
    body_component___decorate([
        Object(core_["Output"])(),
        body_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableBodyComponent.prototype, "scroll", void 0);
    body_component___decorate([
        Object(core_["Output"])(),
        body_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableBodyComponent.prototype, "page", void 0);
    body_component___decorate([
        Object(core_["Output"])(),
        body_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableBodyComponent.prototype, "activate", void 0);
    body_component___decorate([
        Object(core_["Output"])(),
        body_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableBodyComponent.prototype, "select", void 0);
    body_component___decorate([
        Object(core_["Output"])(),
        body_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableBodyComponent.prototype, "detailToggle", void 0);
    body_component___decorate([
        Object(core_["Output"])(),
        body_component___metadata("design:type", Object)
    ], DataTableBodyComponent.prototype, "rowContextmenu", void 0);
    body_component___decorate([
        Object(core_["Output"])(),
        body_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableBodyComponent.prototype, "treeAction", void 0);
    body_component___decorate([
        Object(core_["ViewChild"])(scroller_component_ScrollerComponent),
        body_component___metadata("design:type", scroller_component_ScrollerComponent)
    ], DataTableBodyComponent.prototype, "scroller", void 0);
    DataTableBodyComponent = body_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-body',
            template: "\n    <datatable-selection\n      #selector\n      [selected]=\"selected\"\n      [rows]=\"rows\"\n      [selectCheck]=\"selectCheck\"\n      [selectEnabled]=\"selectEnabled\"\n      [selectionType]=\"selectionType\"\n      [rowIdentity]=\"rowIdentity\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\">\n      <datatable-progress\n        *ngIf=\"loadingIndicator\">\n      </datatable-progress>\n      <datatable-scroller\n        *ngIf=\"rows?.length\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [scrollHeight]=\"scrollHeight\"\n        [scrollWidth]=\"columnGroupWidths?.total\"\n        (scroll)=\"onBodyScroll($event)\">\n        <datatable-summary-row\n          *ngIf=\"summaryRow && summaryPosition === 'top'\"\n          [rowHeight]=\"summaryHeight\"\n          [offsetX]=\"offsetX\"\n          [innerWidth]=\"innerWidth\"\n          [rows]=\"rows\"\n          [columns]=\"columns\">\n        </datatable-summary-row>\n        <datatable-row-wrapper\n          [groupedRows]=\"groupedRows\"\n          *ngFor=\"let group of temp; let i = index; trackBy: rowTrackingFn;\"\n          [innerWidth]=\"innerWidth\"\n          [ngStyle]=\"getRowsStyles(group)\"\n          [rowDetail]=\"rowDetail\"\n          [groupHeader]=\"groupHeader\"\n          [offsetX]=\"offsetX\"\n          [detailRowHeight]=\"getDetailRowHeight(group[i],i)\"\n          [row]=\"group\"\n          [expanded]=\"getRowExpanded(group)\"\n          [rowIndex]=\"getRowIndex(group[i])\"\n          (rowContextmenu)=\"rowContextmenu.emit($event)\">\n          <datatable-body-row\n            *ngIf=\"!groupedRows; else groupedRowsTemplate\"\n            tabindex=\"-1\"\n            [isSelected]=\"selector.getRowSelected(group)\"\n            [innerWidth]=\"innerWidth\"\n            [offsetX]=\"offsetX\"\n            [columns]=\"columns\"\n            [rowHeight]=\"getRowHeight(group)\"\n            [row]=\"group\"\n            [rowIndex]=\"getRowIndex(group)\"\n            [expanded]=\"getRowExpanded(group)\"\n            [rowClass]=\"rowClass\"\n            [displayCheck]=\"displayCheck\"\n            [treeStatus]=\"group.treeStatus\"\n            (treeAction)=\"onTreeAction(group)\"\n            (activate)=\"selector.onActivate($event, indexes.first + i)\">\n          </datatable-body-row>\n          <ng-template #groupedRowsTemplate>\n            <datatable-body-row\n              *ngFor=\"let row of group.value; let i = index; trackBy: rowTrackingFn;\"\n              tabindex=\"-1\"\n              [isSelected]=\"selector.getRowSelected(row)\"\n              [innerWidth]=\"innerWidth\"\n              [offsetX]=\"offsetX\"\n              [columns]=\"columns\"\n              [rowHeight]=\"getRowHeight(row)\"\n              [row]=\"row\"\n              [group]=\"group.value\"\n              [rowIndex]=\"getRowIndex(row)\"\n              [expanded]=\"getRowExpanded(row)\"\n              [rowClass]=\"rowClass\"\n              (activate)=\"selector.onActivate($event, i)\">\n            </datatable-body-row>\n          </ng-template>\n        </datatable-row-wrapper>\n        <datatable-summary-row\n          *ngIf=\"summaryRow && summaryPosition === 'bottom'\"\n          [ngStyle]=\"getBottomSummaryRowStyles()\"\n          [rowHeight]=\"summaryHeight\"\n          [offsetX]=\"offsetX\"\n          [innerWidth]=\"innerWidth\"\n          [rows]=\"rows\"\n          [columns]=\"columns\">\n        </datatable-summary-row>\n      </datatable-scroller>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows?.length && !loadingIndicator\"\n        [innerHTML]=\"emptyMessage\">\n      </div>\n    </datatable-selection>\n  ",
            changeDetection: core_["ChangeDetectionStrategy"].OnPush,
            host: {
                class: 'datatable-body'
            }
        }),
        body_component___metadata("design:paramtypes", [core_["ChangeDetectorRef"]])
    ], DataTableBodyComponent);
    return DataTableBodyComponent;
}());


// EXTERNAL MODULE: ./src/events.ts
var events = __webpack_require__("./src/events.ts");

// CONCATENATED MODULE: ./src/components/body/body-cell.component.ts
var body_cell_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var body_cell_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var body_cell_component_DataTableBodyCellComponent = /** @class */ (function () {
    function DataTableBodyCellComponent(element, cd) {
        this.cd = cd;
        this.activate = new core_["EventEmitter"]();
        this.treeAction = new core_["EventEmitter"]();
        this.isFocused = false;
        this.onCheckboxChangeFn = this.onCheckboxChange.bind(this);
        this.activateFn = this.activate.emit.bind(this.activate);
        this.cellContext = {
            onCheckboxChangeFn: this.onCheckboxChangeFn,
            activateFn: this.activateFn,
            row: this.row,
            group: this.group,
            value: this.value,
            column: this.column,
            rowHeight: this.rowHeight,
            isSelected: this.isSelected,
            rowIndex: this.rowIndex,
            treeStatus: this.treeStatus,
            onTreeAction: this.onTreeAction.bind(this),
        };
        this._element = element.nativeElement;
    }
    Object.defineProperty(DataTableBodyCellComponent.prototype, "group", {
        get: function () {
            return this._group;
        },
        set: function (group) {
            this._group = group;
            this.cellContext.group = group;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "rowHeight", {
        get: function () {
            return this._rowHeight;
        },
        set: function (val) {
            this._rowHeight = val;
            this.cellContext.rowHeight = val;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (val) {
            this._isSelected = val;
            this.cellContext.isSelected = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (val) {
            this._expanded = val;
            this.cellContext.expanded = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "rowIndex", {
        get: function () {
            return this._rowIndex;
        },
        set: function (val) {
            this._rowIndex = val;
            this.cellContext.rowIndex = val;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (column) {
            this._column = column;
            this.cellContext.column = column;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "row", {
        get: function () {
            return this._row;
        },
        set: function (row) {
            this._row = row;
            this.cellContext.row = row;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(DataTableBodyCellComponent.prototype, "treeStatus", {
        get: function () {
            return this._treeStatus;
        },
        set: function (status) {
            if (status !== 'collapsed' &&
                status !== 'expanded' &&
                status !== 'loading' &&
                status !== 'disabled') {
                this._treeStatus = 'collapsed';
            }
            else {
                this._treeStatus = status;
            }
            this.cellContext.treeStatus = this._treeStatus;
            this.checkValueUpdates();
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "columnCssClasses", {
        get: function () {
            var cls = 'datatable-body-cell';
            if (this.column.cellClass) {
                if (typeof this.column.cellClass === 'string') {
                    cls += ' ' + this.column.cellClass;
                }
                else if (typeof this.column.cellClass === 'function') {
                    var res = this.column.cellClass({
                        row: this.row,
                        group: this.group,
                        column: this.column,
                        value: this.value,
                        rowHeight: this.rowHeight
                    });
                    if (typeof res === 'string') {
                        cls += res;
                    }
                    else if (typeof res === 'object') {
                        var keys = Object.keys(res);
                        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            var k = keys_1[_i];
                            if (res[k] === true)
                                cls += " " + k;
                        }
                    }
                }
            }
            if (!this.sortDir)
                cls += ' sort-active';
            if (this.isFocused)
                cls += ' active';
            if (this.sortDir === SortDirection.asc)
                cls += ' sort-asc';
            if (this.sortDir === SortDirection.desc)
                cls += ' sort-desc';
            return cls;
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
    Object.defineProperty(DataTableBodyCellComponent.prototype, "minWidth", {
        get: function () {
            return this.column.minWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCellComponent.prototype, "maxWidth", {
        get: function () {
            return this.column.maxWidth;
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
    DataTableBodyCellComponent.prototype.ngDoCheck = function () {
        this.checkValueUpdates();
    };
    DataTableBodyCellComponent.prototype.ngOnDestroy = function () {
        if (this.cellTemplate) {
            this.cellTemplate.clear();
        }
    };
    DataTableBodyCellComponent.prototype.checkValueUpdates = function () {
        var value = '';
        if (!this.row || !this.column) {
            value = '';
        }
        else {
            var val = this.column.$$valueGetter(this.row, this.column.prop);
            var userPipe = this.column.pipe;
            if (userPipe) {
                value = userPipe.transform(val);
            }
            else if (value !== undefined) {
                value = val;
            }
        }
        if (this.value !== value) {
            this.value = value;
            this.cellContext.value = value;
            this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
            this.cd.markForCheck();
        }
    };
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
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    };
    DataTableBodyCellComponent.prototype.onDblClick = function (event) {
        this.activate.emit({
            type: 'dblclick',
            event: event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element
        });
    };
    DataTableBodyCellComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetCell = event.target === this._element;
        var isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetCell) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                group: this.group,
                rowHeight: this.rowHeight,
                column: this.column,
                value: this.value,
                cellElement: this._element
            });
        }
    };
    DataTableBodyCellComponent.prototype.onCheckboxChange = function (event) {
        this.activate.emit({
            type: 'checkbox',
            event: event,
            row: this.row,
            group: this.group,
            rowHeight: this.rowHeight,
            column: this.column,
            value: this.value,
            cellElement: this._element,
            treeStatus: 'collapsed'
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
    DataTableBodyCellComponent.prototype.stripHtml = function (html) {
        if (!html.replace)
            return html;
        return html.replace(/<\/?[^>]+(>|$)/g, '');
    };
    DataTableBodyCellComponent.prototype.onTreeAction = function () {
        this.treeAction.emit(this.row);
    };
    DataTableBodyCellComponent.prototype.calcLeftMargin = function (column, row) {
        var levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
        return column.isTreeColumn ? row.level * levelIndent : 0;
    };
    body_cell_component___decorate([
        Object(core_["Input"])(),
        body_cell_component___metadata("design:type", Function)
    ], DataTableBodyCellComponent.prototype, "displayCheck", void 0);
    body_cell_component___decorate([
        Object(core_["Input"])(),
        body_cell_component___metadata("design:type", Object),
        body_cell_component___metadata("design:paramtypes", [Object])
    ], DataTableBodyCellComponent.prototype, "group", null);
    body_cell_component___decorate([
        Object(core_["Input"])(),
        body_cell_component___metadata("design:type", Number),
        body_cell_component___metadata("design:paramtypes", [Number])
    ], DataTableBodyCellComponent.prototype, "rowHeight", null);
    body_cell_component___decorate([
        Object(core_["Input"])(),
        body_cell_component___metadata("design:type", Boolean),
        body_cell_component___metadata("design:paramtypes", [Boolean])
    ], DataTableBodyCellComponent.prototype, "isSelected", null);
    body_cell_component___decorate([
        Object(core_["Input"])(),
        body_cell_component___metadata("design:type", Boolean),
        body_cell_component___metadata("design:paramtypes", [Boolean])
    ], DataTableBodyCellComponent.prototype, "expanded", null);
    body_cell_component___decorate([
        Object(core_["Input"])(),
        body_cell_component___metadata("design:type", Number),
        body_cell_component___metadata("design:paramtypes", [Number])
    ], DataTableBodyCellComponent.prototype, "rowIndex", null);
    body_cell_component___decorate([
        Object(core_["Input"])(),
        body_cell_component___metadata("design:type", Object),
        body_cell_component___metadata("design:paramtypes", [Object])
    ], DataTableBodyCellComponent.prototype, "column", null);
    body_cell_component___decorate([
        Object(core_["Input"])(),
        body_cell_component___metadata("design:type", Object),
        body_cell_component___metadata("design:paramtypes", [Object])
    ], DataTableBodyCellComponent.prototype, "row", null);
    body_cell_component___decorate([
        Object(core_["Input"])(),
        body_cell_component___metadata("design:type", Array),
        body_cell_component___metadata("design:paramtypes", [Array])
    ], DataTableBodyCellComponent.prototype, "sorts", null);
    body_cell_component___decorate([
        Object(core_["Input"])(),
        body_cell_component___metadata("design:type", String),
        body_cell_component___metadata("design:paramtypes", [String])
    ], DataTableBodyCellComponent.prototype, "treeStatus", null);
    body_cell_component___decorate([
        Object(core_["Output"])(),
        body_cell_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableBodyCellComponent.prototype, "activate", void 0);
    body_cell_component___decorate([
        Object(core_["Output"])(),
        body_cell_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableBodyCellComponent.prototype, "treeAction", void 0);
    body_cell_component___decorate([
        Object(core_["ViewChild"])('cellTemplate', { read: core_["ViewContainerRef"] }),
        body_cell_component___metadata("design:type", core_["ViewContainerRef"])
    ], DataTableBodyCellComponent.prototype, "cellTemplate", void 0);
    body_cell_component___decorate([
        Object(core_["HostBinding"])('class'),
        body_cell_component___metadata("design:type", Object),
        body_cell_component___metadata("design:paramtypes", [])
    ], DataTableBodyCellComponent.prototype, "columnCssClasses", null);
    body_cell_component___decorate([
        Object(core_["HostBinding"])('style.width.px'),
        body_cell_component___metadata("design:type", Number),
        body_cell_component___metadata("design:paramtypes", [])
    ], DataTableBodyCellComponent.prototype, "width", null);
    body_cell_component___decorate([
        Object(core_["HostBinding"])('style.minWidth.px'),
        body_cell_component___metadata("design:type", Number),
        body_cell_component___metadata("design:paramtypes", [])
    ], DataTableBodyCellComponent.prototype, "minWidth", null);
    body_cell_component___decorate([
        Object(core_["HostBinding"])('style.maxWidth.px'),
        body_cell_component___metadata("design:type", Number),
        body_cell_component___metadata("design:paramtypes", [])
    ], DataTableBodyCellComponent.prototype, "maxWidth", null);
    body_cell_component___decorate([
        Object(core_["HostBinding"])('style.height'),
        body_cell_component___metadata("design:type", Object),
        body_cell_component___metadata("design:paramtypes", [])
    ], DataTableBodyCellComponent.prototype, "height", null);
    body_cell_component___decorate([
        Object(core_["HostListener"])('focus'),
        body_cell_component___metadata("design:type", Function),
        body_cell_component___metadata("design:paramtypes", []),
        body_cell_component___metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onFocus", null);
    body_cell_component___decorate([
        Object(core_["HostListener"])('blur'),
        body_cell_component___metadata("design:type", Function),
        body_cell_component___metadata("design:paramtypes", []),
        body_cell_component___metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onBlur", null);
    body_cell_component___decorate([
        Object(core_["HostListener"])('click', ['$event']),
        body_cell_component___metadata("design:type", Function),
        body_cell_component___metadata("design:paramtypes", [Object]),
        body_cell_component___metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onClick", null);
    body_cell_component___decorate([
        Object(core_["HostListener"])('dblclick', ['$event']),
        body_cell_component___metadata("design:type", Function),
        body_cell_component___metadata("design:paramtypes", [Object]),
        body_cell_component___metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onDblClick", null);
    body_cell_component___decorate([
        Object(core_["HostListener"])('keydown', ['$event']),
        body_cell_component___metadata("design:type", Function),
        body_cell_component___metadata("design:paramtypes", [Object]),
        body_cell_component___metadata("design:returntype", void 0)
    ], DataTableBodyCellComponent.prototype, "onKeyDown", null);
    DataTableBodyCellComponent = body_cell_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-body-cell',
            changeDetection: core_["ChangeDetectionStrategy"].OnPush,
            template: "\n    <div class=\"datatable-body-cell-label\"\n      [style.margin-left.px]=\"calcLeftMargin(column, row)\">\n      <label\n        *ngIf=\"column.checkboxable && (!displayCheck || displayCheck(row, column, value))\"\n        class=\"datatable-checkbox\">\n        <input\n          type=\"checkbox\"\n          [checked]=\"isSelected\"\n          (click)=\"onCheckboxChange($event)\"\n        />\n      </label>\n      <ng-container *ngIf=\"column.isTreeColumn\">\n        <button *ngIf=\"!column.treeToggleTemplate\"\n          class=\"datatable-tree-button\"\n          [disabled]=\"treeStatus==='disabled'\"\n          (click)=\"onTreeAction()\">\n          <span>\n            <i *ngIf=\"treeStatus==='loading'\"\n              class=\"icon datatable-icon-collapse\"></i>\n            <i *ngIf=\"treeStatus==='collapsed'\"\n              class=\"icon datatable-icon-up\"></i>\n            <i *ngIf=\"treeStatus==='expanded' ||\n                      treeStatus==='disabled'\"\n              class=\"icon datatable-icon-down\"></i>\n          </span>\n        </button>\n        <ng-template *ngIf=\"column.treeToggleTemplate\"\n          [ngTemplateOutlet]=\"column.treeToggleTemplate\"\n          [ngTemplateOutletContext]=\"{ cellContext: cellContext }\">\n        </ng-template>\n      </ng-container>\n\n      <span\n        *ngIf=\"!column.cellTemplate\"\n        [title]=\"sanitizedValue\"\n        [innerHTML]=\"value\">\n      </span>\n      <ng-template #cellTemplate\n        *ngIf=\"column.cellTemplate\"\n        [ngTemplateOutlet]=\"column.cellTemplate\"\n        [ngTemplateOutletContext]=\"cellContext\">\n      </ng-template>\n    </div>\n  "
        }),
        body_cell_component___metadata("design:paramtypes", [core_["ElementRef"], core_["ChangeDetectorRef"]])
    ], DataTableBodyCellComponent);
    return DataTableBodyCellComponent;
}());


// CONCATENATED MODULE: ./src/components/body/body-row.component.ts
var body_row_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var body_row_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var body_row_component___param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var body_row_component_DataTableBodyRowComponent = /** @class */ (function () {
    function DataTableBodyRowComponent(differs, scrollbarHelper, cd, element) {
        this.differs = differs;
        this.scrollbarHelper = scrollbarHelper;
        this.cd = cd;
        this.treeStatus = 'collapsed';
        this.activate = new core_["EventEmitter"]();
        this.treeAction = new core_["EventEmitter"]();
        this._groupStyles = {
            left: {},
            center: {},
            right: {}
        };
        this._element = element.nativeElement;
        this._rowDiffer = differs.find({}).create();
    }
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        set: function (val) {
            this._columns = val;
            this.recalculateColumns(val);
            this.buildStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "innerWidth", {
        get: function () {
            return this._innerWidth;
        },
        set: function (val) {
            if (this._columns) {
                var colByPin = columnsByPin(this._columns);
                this._columnGroupWidths = columnGroupWidths(colByPin, colByPin);
            }
            this._innerWidth = val;
            this.recalculateColumns();
            this.buildStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "offsetX", {
        get: function () { return this._offsetX; },
        set: function (val) {
            this._offsetX = val;
            this.buildStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "cssClass", {
        get: function () {
            var cls = 'datatable-body-row';
            if (this.isSelected)
                cls += ' active';
            if (this.rowIndex % 2 !== 0)
                cls += ' datatable-row-odd';
            if (this.rowIndex % 2 === 0)
                cls += ' datatable-row-even';
            if (this.rowClass) {
                var res = this.rowClass(this.row);
                if (typeof res === 'string') {
                    cls += " " + res;
                }
                else if (typeof res === 'object') {
                    var keys = Object.keys(res);
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var k = keys_1[_i];
                        if (res[k] === true)
                            cls += " " + k;
                    }
                }
            }
            return cls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyRowComponent.prototype, "columnsTotalWidths", {
        get: function () {
            return this._columnGroupWidths.total;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyRowComponent.prototype.ngDoCheck = function () {
        if (this._rowDiffer.diff(this.row)) {
            this.cd.markForCheck();
        }
    };
    DataTableBodyRowComponent.prototype.trackByGroups = function (index, colGroup) {
        return colGroup.type;
    };
    DataTableBodyRowComponent.prototype.columnTrackingFn = function (index, column) {
        return column.$$id;
    };
    DataTableBodyRowComponent.prototype.buildStylesByGroup = function () {
        this._groupStyles.left = this.calcStylesByGroup('left');
        this._groupStyles.center = this.calcStylesByGroup('center');
        this._groupStyles.right = this.calcStylesByGroup('right');
        this.cd.markForCheck();
    };
    DataTableBodyRowComponent.prototype.calcStylesByGroup = function (group) {
        var widths = this._columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'left') {
            translateXY(styles, offsetX, 0);
        }
        else if (group === 'right') {
            var bodyWidth = parseInt(this.innerWidth + '', 0);
            var totalDiff = widths.total - bodyWidth;
            var offsetDiff = totalDiff - offsetX;
            var offset = (offsetDiff + this.scrollbarHelper.width) * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
    DataTableBodyRowComponent.prototype.onActivate = function (event, index) {
        event.cellIndex = index;
        event.rowElement = this._element;
        this.activate.emit(event);
    };
    DataTableBodyRowComponent.prototype.onKeyDown = function (event) {
        var keyCode = event.keyCode;
        var isTargetRow = event.target === this._element;
        var isAction = keyCode === Keys.return ||
            keyCode === Keys.down ||
            keyCode === Keys.up ||
            keyCode === Keys.left ||
            keyCode === Keys.right;
        if (isAction && isTargetRow) {
            event.preventDefault();
            event.stopPropagation();
            this.activate.emit({
                type: 'keydown',
                event: event,
                row: this.row,
                rowElement: this._element
            });
        }
    };
    DataTableBodyRowComponent.prototype.onMouseenter = function (event) {
        this.activate.emit({
            type: 'mouseenter',
            event: event,
            row: this.row,
            rowElement: this._element
        });
    };
    DataTableBodyRowComponent.prototype.recalculateColumns = function (val) {
        if (val === void 0) { val = this.columns; }
        this._columns = val;
        var colsByPin = columnsByPin(this._columns);
        this._columnsByPin = columnsByPinArr(this._columns);
        this._columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
    };
    DataTableBodyRowComponent.prototype.onTreeAction = function () {
        this.treeAction.emit();
    };
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Array),
        body_row_component___metadata("design:paramtypes", [Array])
    ], DataTableBodyRowComponent.prototype, "columns", null);
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Number),
        body_row_component___metadata("design:paramtypes", [Number])
    ], DataTableBodyRowComponent.prototype, "innerWidth", null);
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Boolean)
    ], DataTableBodyRowComponent.prototype, "expanded", void 0);
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "rowClass", void 0);
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "row", void 0);
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "group", void 0);
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Boolean)
    ], DataTableBodyRowComponent.prototype, "isSelected", void 0);
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Number)
    ], DataTableBodyRowComponent.prototype, "rowIndex", void 0);
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Object)
    ], DataTableBodyRowComponent.prototype, "displayCheck", void 0);
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", String)
    ], DataTableBodyRowComponent.prototype, "treeStatus", void 0);
    body_row_component___decorate([
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Number),
        body_row_component___metadata("design:paramtypes", [Number])
    ], DataTableBodyRowComponent.prototype, "offsetX", null);
    body_row_component___decorate([
        Object(core_["HostBinding"])('class'),
        body_row_component___metadata("design:type", Object),
        body_row_component___metadata("design:paramtypes", [])
    ], DataTableBodyRowComponent.prototype, "cssClass", null);
    body_row_component___decorate([
        Object(core_["HostBinding"])('style.height.px'),
        Object(core_["Input"])(),
        body_row_component___metadata("design:type", Number)
    ], DataTableBodyRowComponent.prototype, "rowHeight", void 0);
    body_row_component___decorate([
        Object(core_["HostBinding"])('style.width.px'),
        body_row_component___metadata("design:type", String),
        body_row_component___metadata("design:paramtypes", [])
    ], DataTableBodyRowComponent.prototype, "columnsTotalWidths", null);
    body_row_component___decorate([
        Object(core_["Output"])(),
        body_row_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableBodyRowComponent.prototype, "activate", void 0);
    body_row_component___decorate([
        Object(core_["Output"])(),
        body_row_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableBodyRowComponent.prototype, "treeAction", void 0);
    body_row_component___decorate([
        Object(core_["HostListener"])('keydown', ['$event']),
        body_row_component___metadata("design:type", Function),
        body_row_component___metadata("design:paramtypes", [Object]),
        body_row_component___metadata("design:returntype", void 0)
    ], DataTableBodyRowComponent.prototype, "onKeyDown", null);
    body_row_component___decorate([
        Object(core_["HostListener"])('mouseenter', ['$event']),
        body_row_component___metadata("design:type", Function),
        body_row_component___metadata("design:paramtypes", [Object]),
        body_row_component___metadata("design:returntype", void 0)
    ], DataTableBodyRowComponent.prototype, "onMouseenter", null);
    DataTableBodyRowComponent = body_row_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-body-row',
            changeDetection: core_["ChangeDetectionStrategy"].OnPush,
            template: "\n    <div\n      *ngFor=\"let colGroup of _columnsByPin; let i = index; trackBy: trackByGroups\"\n      class=\"datatable-row-{{colGroup.type}} datatable-row-group\"\n      [ngStyle]=\"_groupStyles[colGroup.type]\">\n      <datatable-body-cell\n        *ngFor=\"let column of colGroup.columns; let ii = index; trackBy: columnTrackingFn\"\n        tabindex=\"-1\"\n        [row]=\"row\"\n        [group]=\"group\"\n        [expanded]=\"expanded\"\n        [isSelected]=\"isSelected\"\n        [rowIndex]=\"rowIndex\"\n        [column]=\"column\"\n        [rowHeight]=\"rowHeight\"\n        [displayCheck]=\"displayCheck\"\n        [treeStatus]=\"treeStatus\"\n        (activate)=\"onActivate($event, ii)\"\n        (treeAction)=\"onTreeAction()\">\n      </datatable-body-cell>\n    </div>\n  "
        }),
        body_row_component___param(1, Object(core_["SkipSelf"])()),
        body_row_component___metadata("design:paramtypes", [core_["KeyValueDiffers"],
            scrollbar_helper_service_ScrollbarHelper,
            core_["ChangeDetectorRef"],
            core_["ElementRef"]])
    ], DataTableBodyRowComponent);
    return DataTableBodyRowComponent;
}());


// CONCATENATED MODULE: ./src/components/body/progress-bar.component.ts
var progress_bar_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var progress_bar_component_ProgressBarComponent = /** @class */ (function () {
    function ProgressBarComponent() {
    }
    ProgressBarComponent = progress_bar_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-progress',
            template: "\n    <div class=\"progress-linear\" role=\"progressbar\">\n      <div class=\"container\">\n        <div class=\"bar\"></div>\n      </div>\n    </div>\n  ",
            changeDetection: core_["ChangeDetectionStrategy"].OnPush
        })
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());


// CONCATENATED MODULE: ./src/components/body/body-row-wrapper.component.ts
var body_row_wrapper_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var body_row_wrapper_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var body_row_wrapper_component_DataTableRowWrapperComponent = /** @class */ (function () {
    function DataTableRowWrapperComponent(cd, differs) {
        this.cd = cd;
        this.differs = differs;
        this.rowContextmenu = new core_["EventEmitter"](false);
        this.groupContext = {
            group: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this.rowContext = {
            row: this.row,
            expanded: this.expanded,
            rowIndex: this.rowIndex
        };
        this._expanded = false;
        this.rowDiffer = differs.find({}).create();
    }
    Object.defineProperty(DataTableRowWrapperComponent.prototype, "rowIndex", {
        get: function () {
            return this._rowIndex;
        },
        set: function (val) {
            this._rowIndex = val;
            this.rowContext.rowIndex = val;
            this.groupContext.rowIndex = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableRowWrapperComponent.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (val) {
            this._expanded = val;
            this.groupContext.expanded = val;
            this.rowContext.expanded = val;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    DataTableRowWrapperComponent.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.row)) {
            this.rowContext.row = this.row;
            this.groupContext.group = this.row;
            this.cd.markForCheck();
        }
    };
    DataTableRowWrapperComponent.prototype.onContextmenu = function ($event) {
        this.rowContextmenu.emit({ event: $event, row: this.row });
    };
    DataTableRowWrapperComponent.prototype.getGroupHeaderStyle = function () {
        var styles = {};
        styles['transform'] = 'translate3d(' + this.offsetX + 'px, 0px, 0px)';
        styles['backface-visibility'] = 'hidden';
        styles['width'] = this.innerWidth;
        return styles;
    };
    body_row_wrapper_component___decorate([
        Object(core_["Input"])(),
        body_row_wrapper_component___metadata("design:type", Number)
    ], DataTableRowWrapperComponent.prototype, "innerWidth", void 0);
    body_row_wrapper_component___decorate([
        Object(core_["Input"])(),
        body_row_wrapper_component___metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "rowDetail", void 0);
    body_row_wrapper_component___decorate([
        Object(core_["Input"])(),
        body_row_wrapper_component___metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "groupHeader", void 0);
    body_row_wrapper_component___decorate([
        Object(core_["Input"])(),
        body_row_wrapper_component___metadata("design:type", Number)
    ], DataTableRowWrapperComponent.prototype, "offsetX", void 0);
    body_row_wrapper_component___decorate([
        Object(core_["Input"])(),
        body_row_wrapper_component___metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "detailRowHeight", void 0);
    body_row_wrapper_component___decorate([
        Object(core_["Input"])(),
        body_row_wrapper_component___metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "row", void 0);
    body_row_wrapper_component___decorate([
        Object(core_["Input"])(),
        body_row_wrapper_component___metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "groupedRows", void 0);
    body_row_wrapper_component___decorate([
        Object(core_["Output"])(),
        body_row_wrapper_component___metadata("design:type", Object)
    ], DataTableRowWrapperComponent.prototype, "rowContextmenu", void 0);
    body_row_wrapper_component___decorate([
        Object(core_["Input"])(),
        body_row_wrapper_component___metadata("design:type", Number),
        body_row_wrapper_component___metadata("design:paramtypes", [Number])
    ], DataTableRowWrapperComponent.prototype, "rowIndex", null);
    body_row_wrapper_component___decorate([
        Object(core_["Input"])(),
        body_row_wrapper_component___metadata("design:type", Boolean),
        body_row_wrapper_component___metadata("design:paramtypes", [Boolean])
    ], DataTableRowWrapperComponent.prototype, "expanded", null);
    body_row_wrapper_component___decorate([
        Object(core_["HostListener"])('contextmenu', ['$event']),
        body_row_wrapper_component___metadata("design:type", Function),
        body_row_wrapper_component___metadata("design:paramtypes", [Object]),
        body_row_wrapper_component___metadata("design:returntype", void 0)
    ], DataTableRowWrapperComponent.prototype, "onContextmenu", null);
    DataTableRowWrapperComponent = body_row_wrapper_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-row-wrapper',
            changeDetection: core_["ChangeDetectionStrategy"].OnPush,
            template: "\n    <div \n      *ngIf=\"groupHeader && groupHeader.template\"\n      class=\"datatable-group-header\"\n      [ngStyle]=\"getGroupHeaderStyle()\">\n      <ng-template\n        *ngIf=\"groupHeader && groupHeader.template\"\n        [ngTemplateOutlet]=\"groupHeader.template\"\n        [ngTemplateOutletContext]=\"groupContext\">\n      </ng-template>\n    </div>\n    <ng-content \n      *ngIf=\"(groupHeader && groupHeader.template && expanded) || \n             (!groupHeader || !groupHeader.template)\">\n    </ng-content>\n    <div\n      *ngIf=\"rowDetail && rowDetail.template && expanded\"\n      [style.height.px]=\"detailRowHeight\"\n      class=\"datatable-row-detail\">\n      <ng-template\n        *ngIf=\"rowDetail && rowDetail.template\"\n        [ngTemplateOutlet]=\"rowDetail.template\"\n        [ngTemplateOutletContext]=\"rowContext\">\n      </ng-template>\n    </div>\n  ",
            host: {
                class: 'datatable-row-wrapper'
            }
        }),
        body_row_wrapper_component___metadata("design:paramtypes", [core_["ChangeDetectorRef"], core_["KeyValueDiffers"]])
    ], DataTableRowWrapperComponent);
    return DataTableRowWrapperComponent;
}());


// CONCATENATED MODULE: ./src/components/body/selection.component.ts
var selection_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var selection_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var selection_component_DataTableSelectionComponent = /** @class */ (function () {
    function DataTableSelectionComponent() {
        this.activate = new core_["EventEmitter"]();
        this.select = new core_["EventEmitter"]();
    }
    DataTableSelectionComponent.prototype.selectRow = function (event, index, row) {
        var _a;
        if (!this.selectEnabled)
            return;
        var chkbox = this.selectionType === SelectionType.checkbox;
        var multi = this.selectionType === SelectionType.multi;
        var multiClick = this.selectionType === SelectionType.multiClick;
        var selected = [];
        if (multi || chkbox || multiClick) {
            if (event.shiftKey) {
                selected = selectRowsBetween([], this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (event.ctrlKey || event.metaKey || multiClick || chkbox) {
                selected = selectRows(this.selected.slice(), row, this.getRowSelectedIdx.bind(this));
            }
            else {
                selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected = selectRows([], row, this.getRowSelectedIdx.bind(this));
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
    };
    DataTableSelectionComponent.prototype.onActivate = function (model, index) {
        var type = model.type, event = model.event, row = model.row;
        var chkbox = this.selectionType === SelectionType.checkbox;
        var select = (!chkbox && (type === 'click' || type === 'dblclick')) ||
            (chkbox && type === 'checkbox');
        if (select) {
            this.selectRow(event, index, row);
        }
        else if (type === 'keydown') {
            if (event.keyCode === Keys.return) {
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
        var shouldFocus = keyCode === Keys.up ||
            keyCode === Keys.down ||
            keyCode === Keys.right ||
            keyCode === Keys.left;
        if (shouldFocus) {
            var isCellSelection = this.selectionType === SelectionType.cell;
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
            if (keyCode === Keys.up) {
                focusElement = parentElement.previousElementSibling;
            }
            else if (keyCode === Keys.down) {
                focusElement = parentElement.nextElementSibling;
            }
            if (focusElement && focusElement.children.length) {
                return focusElement.children[0];
            }
        }
    };
    DataTableSelectionComponent.prototype.focusCell = function (cellElement, rowElement, keyCode, cellIndex) {
        var nextCellElement;
        if (keyCode === Keys.left) {
            nextCellElement = cellElement.previousElementSibling;
        }
        else if (keyCode === Keys.right) {
            nextCellElement = cellElement.nextElementSibling;
        }
        else if (keyCode === Keys.up || keyCode === Keys.down) {
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
    selection_component___decorate([
        Object(core_["Input"])(),
        selection_component___metadata("design:type", Array)
    ], DataTableSelectionComponent.prototype, "rows", void 0);
    selection_component___decorate([
        Object(core_["Input"])(),
        selection_component___metadata("design:type", Array)
    ], DataTableSelectionComponent.prototype, "selected", void 0);
    selection_component___decorate([
        Object(core_["Input"])(),
        selection_component___metadata("design:type", Boolean)
    ], DataTableSelectionComponent.prototype, "selectEnabled", void 0);
    selection_component___decorate([
        Object(core_["Input"])(),
        selection_component___metadata("design:type", String)
    ], DataTableSelectionComponent.prototype, "selectionType", void 0);
    selection_component___decorate([
        Object(core_["Input"])(),
        selection_component___metadata("design:type", Object)
    ], DataTableSelectionComponent.prototype, "rowIdentity", void 0);
    selection_component___decorate([
        Object(core_["Input"])(),
        selection_component___metadata("design:type", Object)
    ], DataTableSelectionComponent.prototype, "selectCheck", void 0);
    selection_component___decorate([
        Object(core_["Output"])(),
        selection_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableSelectionComponent.prototype, "activate", void 0);
    selection_component___decorate([
        Object(core_["Output"])(),
        selection_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableSelectionComponent.prototype, "select", void 0);
    DataTableSelectionComponent = selection_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-selection',
            template: "\n    <ng-content></ng-content>\n  ",
            changeDetection: core_["ChangeDetectionStrategy"].OnPush
        })
    ], DataTableSelectionComponent);
    return DataTableSelectionComponent;
}());


// CONCATENATED MODULE: ./src/components/body/body-group-header-template.directive.ts
var body_group_header_template_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var body_group_header_template_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var body_group_header_template_directive_DatatableGroupHeaderTemplateDirective = /** @class */ (function () {
    function DatatableGroupHeaderTemplateDirective(template) {
        this.template = template;
    }
    DatatableGroupHeaderTemplateDirective = body_group_header_template_directive___decorate([
        Object(core_["Directive"])({
            selector: '[ngx-datatable-group-header-template]'
        }),
        body_group_header_template_directive___metadata("design:paramtypes", [core_["TemplateRef"]])
    ], DatatableGroupHeaderTemplateDirective);
    return DatatableGroupHeaderTemplateDirective;
}());


// CONCATENATED MODULE: ./src/components/body/body-group-header.directive.ts
var body_group_header_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var body_group_header_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var body_group_header_directive_DatatableGroupHeaderDirective = /** @class */ (function () {
    function DatatableGroupHeaderDirective() {
        /**
         * Row height is required when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Track toggling of group visibility
         */
        this.toggle = new core_["EventEmitter"]();
    }
    /**
     * Toggle the expansion of a group
     */
    DatatableGroupHeaderDirective.prototype.toggleExpandGroup = function (group) {
        this.toggle.emit({
            type: 'group',
            value: group
        });
    };
    /**
     * Expand all groups
     */
    DatatableGroupHeaderDirective.prototype.expandAllGroups = function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * Collapse all groups
     */
    DatatableGroupHeaderDirective.prototype.collapseAllGroups = function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    body_group_header_directive___decorate([
        Object(core_["Input"])(),
        body_group_header_directive___metadata("design:type", Object)
    ], DatatableGroupHeaderDirective.prototype, "rowHeight", void 0);
    body_group_header_directive___decorate([
        Object(core_["Input"])(),
        Object(core_["ContentChild"])(body_group_header_template_directive_DatatableGroupHeaderTemplateDirective, { read: core_["TemplateRef"] }),
        body_group_header_directive___metadata("design:type", core_["TemplateRef"])
    ], DatatableGroupHeaderDirective.prototype, "template", void 0);
    body_group_header_directive___decorate([
        Object(core_["Output"])(),
        body_group_header_directive___metadata("design:type", core_["EventEmitter"])
    ], DatatableGroupHeaderDirective.prototype, "toggle", void 0);
    DatatableGroupHeaderDirective = body_group_header_directive___decorate([
        Object(core_["Directive"])({ selector: 'ngx-datatable-group-header' })
    ], DatatableGroupHeaderDirective);
    return DatatableGroupHeaderDirective;
}());


// CONCATENATED MODULE: ./src/components/body/summary/summary-row.component.ts
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var summary_row_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var summary_row_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

function defaultSumFunc(cells) {
    var cellsWithValues = cells.filter(function (cell) { return !!cell; });
    if (!cellsWithValues.length) {
        return null;
    }
    if (cellsWithValues.some(function (cell) { return typeof cell !== 'number'; })) {
        return null;
    }
    return cellsWithValues.reduce(function (res, cell) { return res + cell; });
}
function noopSumFunc(cells) {
    return null;
}
var summary_row_component_DataTableSummaryRowComponent = /** @class */ (function () {
    function DataTableSummaryRowComponent() {
        this.summaryRow = {};
    }
    DataTableSummaryRowComponent.prototype.ngOnChanges = function () {
        if (!this.columns || !this.rows) {
            return;
        }
        this.updateInternalColumns();
        this.updateValues();
    };
    DataTableSummaryRowComponent.prototype.updateInternalColumns = function () {
        this._internalColumns = this.columns.map(function (col) { return (__assign({}, col, { cellTemplate: col.summaryTemplate })); });
    };
    DataTableSummaryRowComponent.prototype.updateValues = function () {
        var _this = this;
        this.summaryRow = {};
        this.columns
            .filter(function (col) { return !col.summaryTemplate; })
            .forEach(function (col) {
            var cellsFromSingleColumn = _this.rows.map(function (row) { return row[col.prop]; });
            var sumFunc = _this.getSummaryFunction(col);
            _this.summaryRow[col.prop] = col.pipe ?
                col.pipe.transform(sumFunc(cellsFromSingleColumn)) :
                sumFunc(cellsFromSingleColumn);
        });
    };
    DataTableSummaryRowComponent.prototype.getSummaryFunction = function (column) {
        if (column.summaryFunc === undefined) {
            return defaultSumFunc;
        }
        else if (column.summaryFunc === null) {
            return noopSumFunc;
        }
        else {
            return column.summaryFunc;
        }
    };
    summary_row_component___decorate([
        Object(core_["Input"])(),
        summary_row_component___metadata("design:type", Array)
    ], DataTableSummaryRowComponent.prototype, "rows", void 0);
    summary_row_component___decorate([
        Object(core_["Input"])(),
        summary_row_component___metadata("design:type", Array)
    ], DataTableSummaryRowComponent.prototype, "columns", void 0);
    summary_row_component___decorate([
        Object(core_["Input"])(),
        summary_row_component___metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "rowHeight", void 0);
    summary_row_component___decorate([
        Object(core_["Input"])(),
        summary_row_component___metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "offsetX", void 0);
    summary_row_component___decorate([
        Object(core_["Input"])(),
        summary_row_component___metadata("design:type", Number)
    ], DataTableSummaryRowComponent.prototype, "innerWidth", void 0);
    DataTableSummaryRowComponent = summary_row_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-summary-row',
            template: "\n  <datatable-body-row\n    *ngIf=\"summaryRow && _internalColumns\"\n    tabindex=\"-1\"\n    [innerWidth]=\"innerWidth\"\n    [offsetX]=\"offsetX\"\n    [columns]=\"_internalColumns\"\n    [rowHeight]=\"rowHeight\"\n    [row]=\"summaryRow\"\n    [rowIndex]=\"-1\">\n  </datatable-body-row>\n  ",
            host: {
                class: 'datatable-summary-row'
            }
        })
    ], DataTableSummaryRowComponent);
    return DataTableSummaryRowComponent;
}());


// CONCATENATED MODULE: ./src/components/body/summary/index.ts


// CONCATENATED MODULE: ./src/components/body/index.ts











// CONCATENATED MODULE: ./src/components/columns/column-header.directive.ts
var column_header_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var column_header_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var column_header_directive_DataTableColumnHeaderDirective = /** @class */ (function () {
    function DataTableColumnHeaderDirective(template) {
        this.template = template;
    }
    DataTableColumnHeaderDirective = column_header_directive___decorate([
        Object(core_["Directive"])({ selector: '[ngx-datatable-header-template]' }),
        column_header_directive___metadata("design:paramtypes", [core_["TemplateRef"]])
    ], DataTableColumnHeaderDirective);
    return DataTableColumnHeaderDirective;
}());


// CONCATENATED MODULE: ./src/components/columns/column-cell.directive.ts
var column_cell_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var column_cell_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var column_cell_directive_DataTableColumnCellDirective = /** @class */ (function () {
    function DataTableColumnCellDirective(template) {
        this.template = template;
    }
    DataTableColumnCellDirective = column_cell_directive___decorate([
        Object(core_["Directive"])({ selector: '[ngx-datatable-cell-template]' }),
        column_cell_directive___metadata("design:paramtypes", [core_["TemplateRef"]])
    ], DataTableColumnCellDirective);
    return DataTableColumnCellDirective;
}());


// CONCATENATED MODULE: ./src/components/columns/tree.directive.ts
var tree_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var tree_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var tree_directive_DataTableColumnCellTreeToggle = /** @class */ (function () {
    function DataTableColumnCellTreeToggle(template) {
        this.template = template;
    }
    DataTableColumnCellTreeToggle = tree_directive___decorate([
        Object(core_["Directive"])({ selector: '[ngx-datatable-tree-toggle]' }),
        tree_directive___metadata("design:paramtypes", [core_["TemplateRef"]])
    ], DataTableColumnCellTreeToggle);
    return DataTableColumnCellTreeToggle;
}());


// CONCATENATED MODULE: ./src/components/columns/column.directive.ts
var column_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var column_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var column_directive_DataTableColumnDirective = /** @class */ (function () {
    function DataTableColumnDirective(columnChangesService) {
        this.columnChangesService = columnChangesService;
        this.isFirstChange = true;
    }
    DataTableColumnDirective.prototype.ngOnChanges = function () {
        if (this.isFirstChange) {
            this.isFirstChange = false;
        }
        else {
            this.columnChangesService.onInputChange();
        }
    };
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", String)
    ], DataTableColumnDirective.prototype, "name", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "prop", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "frozenLeft", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "frozenRight", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Number)
    ], DataTableColumnDirective.prototype, "flexGrow", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "resizeable", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "comparator", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "pipe", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "sortable", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "draggable", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "canAutoResize", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Number)
    ], DataTableColumnDirective.prototype, "minWidth", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Number)
    ], DataTableColumnDirective.prototype, "width", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Number)
    ], DataTableColumnDirective.prototype, "maxWidth", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "checkboxable", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "headerCheckboxable", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "headerClass", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Object)
    ], DataTableColumnDirective.prototype, "cellClass", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Boolean)
    ], DataTableColumnDirective.prototype, "isTreeColumn", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Number)
    ], DataTableColumnDirective.prototype, "treeLevelIndent", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", Function)
    ], DataTableColumnDirective.prototype, "summaryFunc", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        column_directive___metadata("design:type", core_["TemplateRef"])
    ], DataTableColumnDirective.prototype, "summaryTemplate", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        Object(core_["ContentChild"])(column_cell_directive_DataTableColumnCellDirective, { read: core_["TemplateRef"] }),
        column_directive___metadata("design:type", core_["TemplateRef"])
    ], DataTableColumnDirective.prototype, "cellTemplate", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        Object(core_["ContentChild"])(column_header_directive_DataTableColumnHeaderDirective, { read: core_["TemplateRef"] }),
        column_directive___metadata("design:type", core_["TemplateRef"])
    ], DataTableColumnDirective.prototype, "headerTemplate", void 0);
    column_directive___decorate([
        Object(core_["Input"])(),
        Object(core_["ContentChild"])(tree_directive_DataTableColumnCellTreeToggle, { read: core_["TemplateRef"] }),
        column_directive___metadata("design:type", core_["TemplateRef"])
    ], DataTableColumnDirective.prototype, "treeToggleTemplate", void 0);
    DataTableColumnDirective = column_directive___decorate([
        Object(core_["Directive"])({ selector: 'ngx-datatable-column' }),
        column_directive___metadata("design:paramtypes", [column_changes_service_ColumnChangesService])
    ], DataTableColumnDirective);
    return DataTableColumnDirective;
}());


// CONCATENATED MODULE: ./src/components/columns/index.ts





// CONCATENATED MODULE: ./src/components/row-detail/row-detail-template.directive.ts
var row_detail_template_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var row_detail_template_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var row_detail_template_directive_DatatableRowDetailTemplateDirective = /** @class */ (function () {
    function DatatableRowDetailTemplateDirective(template) {
        this.template = template;
    }
    DatatableRowDetailTemplateDirective = row_detail_template_directive___decorate([
        Object(core_["Directive"])({
            selector: '[ngx-datatable-row-detail-template]'
        }),
        row_detail_template_directive___metadata("design:paramtypes", [core_["TemplateRef"]])
    ], DatatableRowDetailTemplateDirective);
    return DatatableRowDetailTemplateDirective;
}());


// CONCATENATED MODULE: ./src/components/row-detail/row-detail.directive.ts
var row_detail_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var row_detail_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var row_detail_directive_DatatableRowDetailDirective = /** @class */ (function () {
    function DatatableRowDetailDirective() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Row detail row visbility was toggled.
         */
        this.toggle = new core_["EventEmitter"]();
    }
    /**
     * Toggle the expansion of the row
     */
    DatatableRowDetailDirective.prototype.toggleExpandRow = function (row) {
        this.toggle.emit({
            type: 'row',
            value: row
        });
    };
    /**
     * API method to expand all the rows.
     */
    DatatableRowDetailDirective.prototype.expandAllRows = function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * API method to collapse all the rows.
     */
    DatatableRowDetailDirective.prototype.collapseAllRows = function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    row_detail_directive___decorate([
        Object(core_["Input"])(),
        row_detail_directive___metadata("design:type", Object)
    ], DatatableRowDetailDirective.prototype, "rowHeight", void 0);
    row_detail_directive___decorate([
        Object(core_["Input"])(),
        Object(core_["ContentChild"])(row_detail_template_directive_DatatableRowDetailTemplateDirective, { read: core_["TemplateRef"] }),
        row_detail_directive___metadata("design:type", core_["TemplateRef"])
    ], DatatableRowDetailDirective.prototype, "template", void 0);
    row_detail_directive___decorate([
        Object(core_["Output"])(),
        row_detail_directive___metadata("design:type", core_["EventEmitter"])
    ], DatatableRowDetailDirective.prototype, "toggle", void 0);
    DatatableRowDetailDirective = row_detail_directive___decorate([
        Object(core_["Directive"])({ selector: 'ngx-datatable-row-detail' })
    ], DatatableRowDetailDirective);
    return DatatableRowDetailDirective;
}());


// CONCATENATED MODULE: ./src/components/row-detail/index.ts



// CONCATENATED MODULE: ./src/components/footer/footer-template.directive.ts
var footer_template_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var footer_template_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var footer_template_directive_DataTableFooterTemplateDirective = /** @class */ (function () {
    function DataTableFooterTemplateDirective(template) {
        this.template = template;
    }
    DataTableFooterTemplateDirective = footer_template_directive___decorate([
        Object(core_["Directive"])({ selector: '[ngx-datatable-footer-template]' }),
        footer_template_directive___metadata("design:paramtypes", [core_["TemplateRef"]])
    ], DataTableFooterTemplateDirective);
    return DataTableFooterTemplateDirective;
}());


// CONCATENATED MODULE: ./src/components/footer/footer.directive.ts
var footer_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var footer_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var footer_directive_DatatableFooterDirective = /** @class */ (function () {
    function DatatableFooterDirective() {
    }
    footer_directive___decorate([
        Object(core_["Input"])(),
        footer_directive___metadata("design:type", Number)
    ], DatatableFooterDirective.prototype, "footerHeight", void 0);
    footer_directive___decorate([
        Object(core_["Input"])(),
        footer_directive___metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "totalMessage", void 0);
    footer_directive___decorate([
        Object(core_["Input"])(),
        footer_directive___metadata("design:type", Object)
    ], DatatableFooterDirective.prototype, "selectedMessage", void 0);
    footer_directive___decorate([
        Object(core_["Input"])(),
        footer_directive___metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerLeftArrowIcon", void 0);
    footer_directive___decorate([
        Object(core_["Input"])(),
        footer_directive___metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerRightArrowIcon", void 0);
    footer_directive___decorate([
        Object(core_["Input"])(),
        footer_directive___metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerPreviousIcon", void 0);
    footer_directive___decorate([
        Object(core_["Input"])(),
        footer_directive___metadata("design:type", String)
    ], DatatableFooterDirective.prototype, "pagerNextIcon", void 0);
    footer_directive___decorate([
        Object(core_["Input"])(),
        Object(core_["ContentChild"])(footer_template_directive_DataTableFooterTemplateDirective, { read: core_["TemplateRef"] }),
        footer_directive___metadata("design:type", core_["TemplateRef"])
    ], DatatableFooterDirective.prototype, "template", void 0);
    DatatableFooterDirective = footer_directive___decorate([
        Object(core_["Directive"])({ selector: 'ngx-datatable-footer' })
    ], DatatableFooterDirective);
    return DatatableFooterDirective;
}());


// CONCATENATED MODULE: ./src/components/footer/footer.component.ts
var footer_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var footer_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var footer_component_DataTableFooterComponent = /** @class */ (function () {
    function DataTableFooterComponent() {
        this.selectedCount = 0;
        this.page = new core_["EventEmitter"]();
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
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "footerHeight", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "rowCount", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "pageSize", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "offset", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerLeftArrowIcon", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerRightArrowIcon", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerPreviousIcon", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "pagerNextIcon", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", String)
    ], DataTableFooterComponent.prototype, "totalMessage", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", footer_directive_DatatableFooterDirective)
    ], DataTableFooterComponent.prototype, "footerTemplate", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", Number)
    ], DataTableFooterComponent.prototype, "selectedCount", void 0);
    footer_component___decorate([
        Object(core_["Input"])(),
        footer_component___metadata("design:type", Object)
    ], DataTableFooterComponent.prototype, "selectedMessage", void 0);
    footer_component___decorate([
        Object(core_["Output"])(),
        footer_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableFooterComponent.prototype, "page", void 0);
    DataTableFooterComponent = footer_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-footer',
            template: "\n    <div\n      class=\"datatable-footer-inner\"\n      [ngClass]=\"{'selected-count': selectedMessage}\"\n      [style.height.px]=\"footerHeight\">\n      <ng-template\n        *ngIf=\"footerTemplate\"\n        [ngTemplateOutlet]=\"footerTemplate.template\"\n        [ngTemplateOutletContext]=\"{ \n          rowCount: rowCount, \n          pageSize: pageSize, \n          selectedCount: selectedCount,\n          curPage: curPage,\n          offset: offset\n        }\">\n      </ng-template>\n      <div class=\"page-count\" *ngIf=\"!footerTemplate\">\n        <span *ngIf=\"selectedMessage\">\n          {{selectedCount?.toLocaleString()}} {{selectedMessage}} / \n        </span>\n        {{rowCount?.toLocaleString()}} {{totalMessage}}\n      </div>\n      <datatable-pager *ngIf=\"!footerTemplate\"\n        [pagerLeftArrowIcon]=\"pagerLeftArrowIcon\"\n        [pagerRightArrowIcon]=\"pagerRightArrowIcon\"\n        [pagerPreviousIcon]=\"pagerPreviousIcon\"\n        [pagerNextIcon]=\"pagerNextIcon\"\n        [page]=\"curPage\"\n        [size]=\"pageSize\"\n        [count]=\"rowCount\"\n        [hidden]=\"!isVisible\"\n        (change)=\"page.emit($event)\">\n      </datatable-pager>\n    </div>\n  ",
            host: {
                class: 'datatable-footer'
            },
            changeDetection: core_["ChangeDetectionStrategy"].OnPush
        })
    ], DataTableFooterComponent);
    return DataTableFooterComponent;
}());


// CONCATENATED MODULE: ./src/components/footer/pager.component.ts
var pager_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var pager_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var pager_component_DataTablePagerComponent = /** @class */ (function () {
    function DataTablePagerComponent() {
        this.change = new core_["EventEmitter"]();
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
            startPage = page - Math.floor(maxSize / 2);
            endPage = page + Math.floor(maxSize / 2);
            if (startPage < 1) {
                startPage = 1;
                endPage = Math.min(startPage + maxSize - 1, this.totalPages);
            }
            else if (endPage > this.totalPages) {
                startPage = Math.max(this.totalPages - maxSize + 1, 1);
                endPage = this.totalPages;
            }
        }
        for (var num = startPage; num <= endPage; num++) {
            pages.push({
                number: num,
                text: num
            });
        }
        return pages;
    };
    pager_component___decorate([
        Object(core_["Input"])(),
        pager_component___metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerLeftArrowIcon", void 0);
    pager_component___decorate([
        Object(core_["Input"])(),
        pager_component___metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerRightArrowIcon", void 0);
    pager_component___decorate([
        Object(core_["Input"])(),
        pager_component___metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerPreviousIcon", void 0);
    pager_component___decorate([
        Object(core_["Input"])(),
        pager_component___metadata("design:type", String)
    ], DataTablePagerComponent.prototype, "pagerNextIcon", void 0);
    pager_component___decorate([
        Object(core_["Input"])(),
        pager_component___metadata("design:type", Number),
        pager_component___metadata("design:paramtypes", [Number])
    ], DataTablePagerComponent.prototype, "size", null);
    pager_component___decorate([
        Object(core_["Input"])(),
        pager_component___metadata("design:type", Number),
        pager_component___metadata("design:paramtypes", [Number])
    ], DataTablePagerComponent.prototype, "count", null);
    pager_component___decorate([
        Object(core_["Input"])(),
        pager_component___metadata("design:type", Number),
        pager_component___metadata("design:paramtypes", [Number])
    ], DataTablePagerComponent.prototype, "page", null);
    pager_component___decorate([
        Object(core_["Output"])(),
        pager_component___metadata("design:type", core_["EventEmitter"])
    ], DataTablePagerComponent.prototype, "change", void 0);
    DataTablePagerComponent = pager_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-pager',
            template: "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          role=\"button\"\n          aria-label=\"go to first page\"\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\">\n          <i class=\"{{pagerPreviousIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          role=\"button\"\n          aria-label=\"go to previous page\"\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\">\n          <i class=\"{{pagerLeftArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li\n        role=\"button\"\n        [attr.aria-label]=\"'page ' + pg.number\"\n        class=\"pages\"\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          role=\"button\"\n          aria-label=\"go to next page\"\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\">\n          <i class=\"{{pagerRightArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          role=\"button\"\n          aria-label=\"go to last page\"\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\">\n          <i class=\"{{pagerNextIcon}}\"></i>\n        </a>\n      </li>\n    </ul>\n  ",
            host: {
                class: 'datatable-pager'
            },
            changeDetection: core_["ChangeDetectionStrategy"].OnPush
        })
    ], DataTablePagerComponent);
    return DataTablePagerComponent;
}());


// CONCATENATED MODULE: ./src/components/footer/index.ts





// CONCATENATED MODULE: ./src/components/header/header.component.ts
var header_component___assign = (this && this.__assign) || function () {
    header_component___assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return header_component___assign.apply(this, arguments);
};
var header_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var header_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var header_component_DataTableHeaderComponent = /** @class */ (function () {
    function DataTableHeaderComponent(cd) {
        this.cd = cd;
        this.sort = new core_["EventEmitter"]();
        this.reorder = new core_["EventEmitter"]();
        this.resize = new core_["EventEmitter"]();
        this.select = new core_["EventEmitter"]();
        this.columnContextmenu = new core_["EventEmitter"](false);
        this._styleByGroup = {
            left: {},
            center: {},
            right: {}
        };
    }
    Object.defineProperty(DataTableHeaderComponent.prototype, "innerWidth", {
        get: function () {
            return this._innerWidth;
        },
        set: function (val) {
            this._innerWidth = val;
            if (this._columns) {
                var colByPin = columnsByPin(this._columns);
                this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
                this.setStylesByGroup();
            }
        },
        enumerable: true,
        configurable: true
    });
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
            var colsByPin = columnsByPin(val);
            this._columnsByPin = columnsByPinArr(val);
            this._columnGroupWidths = columnGroupWidths(colsByPin, val);
            this.setStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderComponent.prototype, "offsetX", {
        get: function () { return this._offsetX; },
        set: function (val) {
            this._offsetX = val;
            this.setStylesByGroup();
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderComponent.prototype.onLongPressStart = function (_a) {
        var event = _a.event, model = _a.model;
        model.dragging = true;
        this.dragEventTarget = event;
    };
    DataTableHeaderComponent.prototype.onLongPressEnd = function (_a) {
        var _this = this;
        var event = _a.event, model = _a.model;
        this.dragEventTarget = event;
        // delay resetting so sort can be
        // prevented if we were dragging
        setTimeout(function () {
            // datatable component creates copies from columns on reorder
            // set dragging to false on new objects
            var column = _this._columns.find(function (c) { return c.$$id === model.$$id; });
            if (column) {
                column.dragging = false;
            }
        }, 5);
    };
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
        var column = this.getColumn(newIndex);
        column.isTarget = false;
        column.targetMarkerContext = undefined;
        this.reorder.emit({
            column: model,
            prevValue: prevIndex,
            newValue: newIndex
        });
    };
    DataTableHeaderComponent.prototype.onTargetChanged = function (_a) {
        var prevIndex = _a.prevIndex, newIndex = _a.newIndex, initialIndex = _a.initialIndex;
        if (prevIndex || prevIndex === 0) {
            var oldColumn = this.getColumn(prevIndex);
            oldColumn.isTarget = false;
            oldColumn.targetMarkerContext = undefined;
        }
        if (newIndex || newIndex === 0) {
            var newColumn = this.getColumn(newIndex);
            newColumn.isTarget = true;
            if (initialIndex !== newIndex) {
                newColumn.targetMarkerContext = { class: 'targetMarker '.concat(initialIndex > newIndex ? 'dragFromRight' : 'dragFromLeft') };
            }
        }
    };
    DataTableHeaderComponent.prototype.getColumn = function (index) {
        var leftColumnCount = this._columnsByPin[0].columns.length;
        if (index < leftColumnCount) {
            return this._columnsByPin[0].columns[index];
        }
        var centerColumnCount = this._columnsByPin[1].columns.length;
        if (index < leftColumnCount + centerColumnCount) {
            return this._columnsByPin[1].columns[index - leftColumnCount];
        }
        return this._columnsByPin[2].columns[index - leftColumnCount - centerColumnCount];
    };
    DataTableHeaderComponent.prototype.onSort = function (_a) {
        var column = _a.column, prevValue = _a.prevValue, newValue = _a.newValue;
        // if we are dragging don't sort!
        if (column.dragging)
            return;
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
        if (!this.sorts) {
            this.sorts = [];
        }
        var sorts = this.sorts.map(function (s, i) {
            s = header_component___assign({}, s);
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
            if (this.sortType === SortType.single) {
                sorts.splice(0, this.sorts.length);
            }
            sorts.push({ dir: newValue, prop: column.prop });
        }
        return sorts;
    };
    DataTableHeaderComponent.prototype.setStylesByGroup = function () {
        this._styleByGroup.left = this.calcStylesByGroup('left');
        this._styleByGroup.center = this.calcStylesByGroup('center');
        this._styleByGroup.right = this.calcStylesByGroup('right');
        this.cd.detectChanges();
    };
    DataTableHeaderComponent.prototype.calcStylesByGroup = function (group) {
        var widths = this._columnGroupWidths;
        var offsetX = this.offsetX;
        var styles = {
            width: widths[group] + "px"
        };
        if (group === 'center') {
            translateXY(styles, offsetX * -1, 0);
        }
        else if (group === 'right') {
            var totalDiff = widths.total - this.innerWidth;
            var offset = totalDiff * -1;
            translateXY(styles, offset, 0);
        }
        return styles;
    };
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "sortAscendingIcon", void 0);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "sortDescendingIcon", void 0);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "scrollbarH", void 0);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "dealsWithGroup", void 0);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "targetMarkerTemplate", void 0);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Number),
        header_component___metadata("design:paramtypes", [Number])
    ], DataTableHeaderComponent.prototype, "innerWidth", null);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Array)
    ], DataTableHeaderComponent.prototype, "sorts", void 0);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", String)
    ], DataTableHeaderComponent.prototype, "sortType", void 0);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "allRowsSelected", void 0);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", String)
    ], DataTableHeaderComponent.prototype, "selectionType", void 0);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Boolean)
    ], DataTableHeaderComponent.prototype, "reorderable", void 0);
    header_component___decorate([
        Object(core_["HostBinding"])('style.height'),
        Object(core_["Input"])(),
        header_component___metadata("design:type", Object),
        header_component___metadata("design:paramtypes", [Object])
    ], DataTableHeaderComponent.prototype, "headerHeight", null);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Array),
        header_component___metadata("design:paramtypes", [Array])
    ], DataTableHeaderComponent.prototype, "columns", null);
    header_component___decorate([
        Object(core_["Input"])(),
        header_component___metadata("design:type", Number),
        header_component___metadata("design:paramtypes", [Number])
    ], DataTableHeaderComponent.prototype, "offsetX", null);
    header_component___decorate([
        Object(core_["Output"])(),
        header_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableHeaderComponent.prototype, "sort", void 0);
    header_component___decorate([
        Object(core_["Output"])(),
        header_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableHeaderComponent.prototype, "reorder", void 0);
    header_component___decorate([
        Object(core_["Output"])(),
        header_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableHeaderComponent.prototype, "resize", void 0);
    header_component___decorate([
        Object(core_["Output"])(),
        header_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableHeaderComponent.prototype, "select", void 0);
    header_component___decorate([
        Object(core_["Output"])(),
        header_component___metadata("design:type", Object)
    ], DataTableHeaderComponent.prototype, "columnContextmenu", void 0);
    header_component___decorate([
        Object(core_["HostBinding"])('style.width'),
        header_component___metadata("design:type", String),
        header_component___metadata("design:paramtypes", [])
    ], DataTableHeaderComponent.prototype, "headerWidth", null);
    DataTableHeaderComponent = header_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-header',
            template: "\n    <div\n      orderable\n      (reorder)=\"onColumnReordered($event)\"\n      (targetChanged)=\"onTargetChanged($event)\"\n      [style.width.px]=\"_columnGroupWidths.total\"\n      class=\"datatable-header-inner\">\n      <div\n        *ngFor=\"let colGroup of _columnsByPin; trackBy: trackByGroups\"\n        [class]=\"'datatable-row-' + colGroup.type\"\n        [ngStyle]=\"_styleByGroup[colGroup.type]\">\n        <datatable-header-cell\n          *ngFor=\"let column of colGroup.columns; trackBy: columnTrackingFn\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (resize)=\"onColumnResized($event, column)\"\n          long-press\n          [pressModel]=\"column\"\n          [pressEnabled]=\"reorderable && column.draggable\"\n          (longPressStart)=\"onLongPressStart($event)\"\n          (longPressEnd)=\"onLongPressEnd($event)\"\n          draggable\n          [dragX]=\"reorderable && column.draggable && column.dragging\"\n          [dragY]=\"false\"\n          [dragModel]=\"column\"\n          [dragEventTarget]=\"dragEventTarget\"\n          [headerHeight]=\"headerHeight\"\n          [isTarget]=\"column.isTarget\"\n          [targetMarkerTemplate]=\"targetMarkerTemplate\"\n          [targetMarkerContext]=\"column.targetMarkerContext\"\n          [column]=\"column\"\n          [sortType]=\"sortType\"\n          [sorts]=\"sorts\"\n          [selectionType]=\"selectionType\"\n          [sortAscendingIcon]=\"sortAscendingIcon\"\n          [sortDescendingIcon]=\"sortDescendingIcon\"\n          [allRowsSelected]=\"allRowsSelected\"\n          (sort)=\"onSort($event)\"\n          (select)=\"select.emit($event)\"\n          (columnContextmenu)=\"columnContextmenu.emit($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
            host: {
                class: 'datatable-header'
            },
            changeDetection: core_["ChangeDetectionStrategy"].OnPush
        }),
        header_component___metadata("design:paramtypes", [core_["ChangeDetectorRef"]])
    ], DataTableHeaderComponent);
    return DataTableHeaderComponent;
}());


// CONCATENATED MODULE: ./src/components/header/header-cell.component.ts
var header_cell_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var header_cell_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var header_cell_component_DataTableHeaderCellComponent = /** @class */ (function () {
    function DataTableHeaderCellComponent(cd) {
        this.cd = cd;
        this.sort = new core_["EventEmitter"]();
        this.select = new core_["EventEmitter"]();
        this.columnContextmenu = new core_["EventEmitter"](false);
        this.sortFn = this.onSort.bind(this);
        this.selectFn = this.select.emit.bind(this.select);
        this.cellContext = {
            column: this.column,
            sortDir: this.sortDir,
            sortFn: this.sortFn,
            allRowsSelected: this.allRowsSelected,
            selectFn: this.selectFn
        };
    }
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "allRowsSelected", {
        get: function () {
            return this._allRowsSelected;
        },
        set: function (value) {
            this._allRowsSelected = value;
            this.cellContext.allRowsSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "column", {
        get: function () {
            return this._column;
        },
        set: function (column) {
            this._column = column;
            this.cellContext.column = column;
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.sortDir = this.calcSortDir(val);
            this.cellContext.sortDir = this.sortDir;
            this.sortClass = this.calcSortClass(this.sortDir);
            this.cd.markForCheck();
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
            if (this.column.headerClass) {
                if (typeof this.column.headerClass === 'string') {
                    cls += ' ' + this.column.headerClass;
                }
                else if (typeof this.column.headerClass === 'function') {
                    var res = this.column.headerClass({
                        column: this.column
                    });
                    if (typeof res === 'string') {
                        cls += res;
                    }
                    else if (typeof res === 'object') {
                        var keys = Object.keys(res);
                        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            var k = keys_1[_i];
                            if (res[k] === true)
                                cls += " " + k;
                        }
                    }
                }
            }
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
            // guaranteed to have a value by setColumnDefaults() in column-helper.ts
            return this.column.headerTemplate === undefined ? this.column.name : undefined;
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
                this.selectionType === SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    DataTableHeaderCellComponent.prototype.onContextmenu = function ($event) {
        this.columnContextmenu.emit({ event: $event, column: this.column });
    };
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
        var newValue = nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue: newValue
        });
    };
    DataTableHeaderCellComponent.prototype.calcSortClass = function (sortDir) {
        if (sortDir === SortDirection.asc) {
            return "sort-btn sort-asc " + this.sortAscendingIcon;
        }
        else if (sortDir === SortDirection.desc) {
            return "sort-btn sort-desc " + this.sortDescendingIcon;
        }
        else {
            return "sort-btn";
        }
    };
    header_cell_component___decorate([
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "sortType", void 0);
    header_cell_component___decorate([
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "sortAscendingIcon", void 0);
    header_cell_component___decorate([
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "sortDescendingIcon", void 0);
    header_cell_component___decorate([
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", Boolean)
    ], DataTableHeaderCellComponent.prototype, "isTarget", void 0);
    header_cell_component___decorate([
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", Object)
    ], DataTableHeaderCellComponent.prototype, "targetMarkerTemplate", void 0);
    header_cell_component___decorate([
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", Object)
    ], DataTableHeaderCellComponent.prototype, "targetMarkerContext", void 0);
    header_cell_component___decorate([
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", Object),
        header_cell_component___metadata("design:paramtypes", [Object])
    ], DataTableHeaderCellComponent.prototype, "allRowsSelected", null);
    header_cell_component___decorate([
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", String)
    ], DataTableHeaderCellComponent.prototype, "selectionType", void 0);
    header_cell_component___decorate([
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", Object),
        header_cell_component___metadata("design:paramtypes", [Object])
    ], DataTableHeaderCellComponent.prototype, "column", null);
    header_cell_component___decorate([
        Object(core_["HostBinding"])('style.height.px'),
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", Number)
    ], DataTableHeaderCellComponent.prototype, "headerHeight", void 0);
    header_cell_component___decorate([
        Object(core_["Input"])(),
        header_cell_component___metadata("design:type", Array),
        header_cell_component___metadata("design:paramtypes", [Array])
    ], DataTableHeaderCellComponent.prototype, "sorts", null);
    header_cell_component___decorate([
        Object(core_["Output"])(),
        header_cell_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableHeaderCellComponent.prototype, "sort", void 0);
    header_cell_component___decorate([
        Object(core_["Output"])(),
        header_cell_component___metadata("design:type", core_["EventEmitter"])
    ], DataTableHeaderCellComponent.prototype, "select", void 0);
    header_cell_component___decorate([
        Object(core_["Output"])(),
        header_cell_component___metadata("design:type", Object)
    ], DataTableHeaderCellComponent.prototype, "columnContextmenu", void 0);
    header_cell_component___decorate([
        Object(core_["HostBinding"])('class'),
        header_cell_component___metadata("design:type", Object),
        header_cell_component___metadata("design:paramtypes", [])
    ], DataTableHeaderCellComponent.prototype, "columnCssClasses", null);
    header_cell_component___decorate([
        Object(core_["HostBinding"])('attr.title'),
        header_cell_component___metadata("design:type", String),
        header_cell_component___metadata("design:paramtypes", [])
    ], DataTableHeaderCellComponent.prototype, "name", null);
    header_cell_component___decorate([
        Object(core_["HostBinding"])('style.minWidth.px'),
        header_cell_component___metadata("design:type", Number),
        header_cell_component___metadata("design:paramtypes", [])
    ], DataTableHeaderCellComponent.prototype, "minWidth", null);
    header_cell_component___decorate([
        Object(core_["HostBinding"])('style.maxWidth.px'),
        header_cell_component___metadata("design:type", Number),
        header_cell_component___metadata("design:paramtypes", [])
    ], DataTableHeaderCellComponent.prototype, "maxWidth", null);
    header_cell_component___decorate([
        Object(core_["HostBinding"])('style.width.px'),
        header_cell_component___metadata("design:type", Number),
        header_cell_component___metadata("design:paramtypes", [])
    ], DataTableHeaderCellComponent.prototype, "width", null);
    header_cell_component___decorate([
        Object(core_["HostListener"])('contextmenu', ['$event']),
        header_cell_component___metadata("design:type", Function),
        header_cell_component___metadata("design:paramtypes", [Object]),
        header_cell_component___metadata("design:returntype", void 0)
    ], DataTableHeaderCellComponent.prototype, "onContextmenu", null);
    DataTableHeaderCellComponent = header_cell_component___decorate([
        Object(core_["Component"])({
            selector: 'datatable-header-cell',
            template: "\n    <div class=\"datatable-header-cell-template-wrap\">\n      <ng-template\n        *ngIf=\"isTarget\"\n        [ngTemplateOutlet]=\"targetMarkerTemplate\"\n        [ngTemplateOutletContext]=\"targetMarkerContext\">\n      </ng-template>\n      <label\n        *ngIf=\"isCheckboxable\"\n        class=\"datatable-checkbox\">\n        <input\n          type=\"checkbox\"\n          [checked]=\"allRowsSelected\"\n          (change)=\"select.emit(!allRowsSelected)\"\n        />\n      </label>\n      <span\n        *ngIf=\"!column.headerTemplate\"\n        class=\"datatable-header-cell-wrapper\">\n        <span\n          class=\"datatable-header-cell-label draggable\"\n          (click)=\"onSort()\"\n          [innerHTML]=\"name\">\n        </span>\n      </span>\n      <ng-template\n        *ngIf=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngTemplateOutletContext]=\"cellContext\">\n      </ng-template>\n      <span\n        (click)=\"onSort()\"\n        [class]=\"sortClass\">\n      </span>\n    </div>\n  ",
            host: {
                class: 'datatable-header-cell'
            },
            changeDetection: core_["ChangeDetectionStrategy"].OnPush
        }),
        header_cell_component___metadata("design:paramtypes", [core_["ChangeDetectorRef"]])
    ], DataTableHeaderCellComponent);
    return DataTableHeaderCellComponent;
}());


// CONCATENATED MODULE: ./src/components/header/index.ts



// CONCATENATED MODULE: ./src/components/datatable.component.ts
var datatable_component___assign = (this && this.__assign) || function () {
    datatable_component___assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return datatable_component___assign.apply(this, arguments);
};
var datatable_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var datatable_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var datatable_component___param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};











var datatable_component_DatatableComponent = /** @class */ (function () {
    function DatatableComponent(scrollbarHelper, dimensionsHelper, cd, element, differs, columnChangesService) {
        this.scrollbarHelper = scrollbarHelper;
        this.dimensionsHelper = dimensionsHelper;
        this.cd = cd;
        this.columnChangesService = columnChangesService;
        /**
         * List of row objects that should be
         * represented as selected in the grid.
         * Default value: `[]`
         */
        this.selected = [];
        /**
         * Enable vertical scrollbars
         */
        this.scrollbarV = false;
        /**
         * Enable horz scrollbars
         */
        this.scrollbarH = false;
        /**
         * The row height; which is necessary
         * to calculate the height for the lazy rendering.
         */
        this.rowHeight = 30;
        /**
         * Type of column width distribution formula.
         * Example: flex, force, standard
         */
        this.columnMode = ColumnMode.standard;
        /**
         * The minimum header height in pixels.
         * Pass a falsey for no header
         */
        this.headerHeight = 30;
        /**
         * The minimum footer height in pixels.
         * Pass falsey for no footer
         */
        this.footerHeight = 0;
        /**
         * If the table should use external paging
         * otherwise its assumed that all data is preloaded.
         */
        this.externalPaging = false;
        /**
         * If the table should use external sorting or
         * the built-in basic sorting.
         */
        this.externalSorting = false;
        /**
         * Show the linear loading bar.
         * Default value: `false`
         */
        this.loadingIndicator = false;
        /**
         * Enable/Disable ability to re-order columns
         * by dragging them.
         */
        this.reorderable = true;
        /**
         * Swap columns on re-order columns or
         * move them.
         */
        this.swapColumns = true;
        /**
         * The type of sorting
         */
        this.sortType = SortType.single;
        /**
         * Array of sorted columns by property and type.
         * Default value: `[]`
         */
        this.sorts = [];
        /**
         * Css class overrides
         */
        this.cssClasses = {
            sortAscending: 'datatable-icon-up',
            sortDescending: 'datatable-icon-down',
            pagerLeftArrow: 'datatable-icon-left',
            pagerRightArrow: 'datatable-icon-right',
            pagerPrevious: 'datatable-icon-prev',
            pagerNext: 'datatable-icon-skip'
        };
        /**
         * Message overrides for localization
         *
         * emptyMessage     [default] = 'No data to display'
         * totalMessage     [default] = 'total'
         * selectedMessage  [default] = 'selected'
         */
        this.messages = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total',
            // Footer selected message
            selectedMessage: 'selected'
        };
        /**
         * This will be used when displaying or selecting rows.
         * when tracking/comparing them, we'll use the value of this fn,
         *
         * (`fn(x) === fn(y)` instead of `x === y`)
         */
        this.rowIdentity = (function (x) { return x; });
        /**
         * A boolean you can use to set the detault behaviour of rows and groups
         * whether they will start expanded or not. If ommited the default is NOT expanded.
         *
         */
        this.groupExpansionDefault = false;
        /**
         * Property to which you can use for determining select all
         * rows on current page or not.
         *
         * @type {boolean}
         * @memberOf DatatableComponent
         */
        this.selectAllRowsOnPage = false;
        /**
         * A flag for row virtualization on / off
         */
        this.virtualization = true;
        /**
         * A flag for switching summary row on / off
         */
        this.summaryRow = false;
        /**
         * A height of summary row
         */
        this.summaryHeight = 30;
        /**
         * A property holds a summary row position: top/bottom
         */
        this.summaryPosition = 'top';
        /**
         * Body was scrolled typically in a `scrollbarV:true` scenario.
         */
        this.scroll = new core_["EventEmitter"]();
        /**
         * A cell or row was focused via keyboard or mouse click.
         */
        this.activate = new core_["EventEmitter"]();
        /**
         * A cell or row was selected.
         */
        this.select = new core_["EventEmitter"]();
        /**
         * Column sort was invoked.
         */
        this.sort = new core_["EventEmitter"]();
        /**
         * The table was paged either triggered by the pager or the body scroll.
         */
        this.page = new core_["EventEmitter"]();
        /**
         * Columns were re-ordered.
         */
        this.reorder = new core_["EventEmitter"]();
        /**
         * Column was resized.
         */
        this.resize = new core_["EventEmitter"]();
        /**
         * The context menu was invoked on the table.
         * type indicates whether the header or the body was clicked.
         * content contains either the column or the row that was clicked.
         */
        this.tableContextmenu = new core_["EventEmitter"](false);
        /**
         * A row was expanded ot collapsed for tree
         */
        this.treeAction = new core_["EventEmitter"]();
        this.rowCount = 0;
        this._offsetX = new external__rxjs_["BehaviorSubject"](0);
        this._count = 0;
        this._offset = 0;
        this._subscriptions = [];
        // get ref to elm for measuring
        this.element = element.nativeElement;
        this.rowDiffer = differs.find({}).create();
    }
    Object.defineProperty(DatatableComponent.prototype, "rows", {
        /**
         * Gets the rows.
         */
        get: function () {
            return this._rows;
        },
        /**
         * Rows that are displayed in the table.
         */
        set: function (val) {
            this._rows = val;
            if (val) {
                this._internalRows = val.slice();
            }
            // auto sort on new updates
            if (!this.externalSorting) {
                this.sortInternalRows();
            }
            // auto group by parent on new update
            this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
            // recalculate sizes/etc
            this.recalculate();
            if (this._rows && this._groupRowsBy) {
                // If a column has been specified in _groupRowsBy created a new array with the data grouped by that row
                this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
            }
            this.cd.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "groupRowsBy", {
        get: function () {
            return this._groupRowsBy;
        },
        /**
         * This attribute allows the user to set the name of the column to group the data with
         */
        set: function (val) {
            if (val) {
                this._groupRowsBy = val;
                if (this._rows && this._groupRowsBy) {
                    // cretes a new array with the data grouped
                    this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columns", {
        /**
         * Get the columns.
         */
        get: function () {
            return this._columns;
        },
        /**
         * Columns to be displayed.
         */
        set: function (val) {
            if (val) {
                this._internalColumns = val.slice();
                setColumnDefaults(this._internalColumns);
                this.recalculateColumns();
            }
            this._columns = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "limit", {
        /**
         * Gets the limit.
         */
        get: function () {
            return this._limit;
        },
        /**
         * The page size to be shown.
         * Default value: `undefined`
         */
        set: function (val) {
            this._limit = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "count", {
        /**
         * Gets the count.
         */
        get: function () {
            return this._count;
        },
        /**
         * The total count of all rows.
         * Default value: `0`
         */
        set: function (val) {
            this._count = val;
            // recalculate sizes/etc
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "offset", {
        get: function () {
            return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
        },
        /**
         * The current offset ( page - 1 ) shown.
         * Default value: `0`
         */
        set: function (val) {
            this._offset = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedHeader", {
        /**
         * CSS class applied if the header height if fixed height.
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
         */
        get: function () {
            return this.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVirtualized", {
        /**
         * CSS class applied to root element if
         * virtualization is enabled.
         */
        get: function () {
            return this.virtualization;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isHorScroll", {
        /**
         * CSS class applied to the root element
         * if the horziontal scrolling is enabled.
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
         */
        get: function () {
            return this.selectionType === SelectionType.checkbox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isCellSelection", {
        /**
         * CSS class applied to root if cell selection.
         */
        get: function () {
            return this.selectionType === SelectionType.cell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSingleSelection", {
        /**
         * CSS class applied to root if single select.
         */
        get: function () {
            return this.selectionType === SelectionType.single;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiSelection", {
        /**
         * CSS class added to root element if mulit select
         */
        get: function () {
            return this.selectionType === SelectionType.multi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isMultiClickSelection", {
        /**
         * CSS class added to root element if mulit click select
         */
        get: function () {
            return this.selectionType === SelectionType.multiClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columnTemplates", {
        /**
         * Returns the column templates.
         */
        get: function () {
            return this._columnTemplates;
        },
        /**
         * Column templates gathered from `ContentChildren`
         * if described in your markup.
         */
        set: function (val) {
            this._columnTemplates = val;
            this.translateColumns(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "allRowsSelected", {
        /**
         * Returns if all rows are selected.
         */
        get: function () {
            var allRowsSelected = (this.rows && this.selected && this.selected.length === this.rows.length);
            if (this.selectAllRowsOnPage) {
                var indexes = this.bodyComponent.indexes;
                var rowsOnPage = indexes.last - indexes.first;
                allRowsSelected = (this.selected.length === rowsOnPage);
            }
            return this.selected && this.rows &&
                this.rows.length !== 0 && allRowsSelected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Lifecycle hook that is called after data-bound
     * properties of a directive are initialized.
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
     */
    DatatableComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.externalSorting) {
            this.sortInternalRows();
        }
        // this has to be done to prevent the change detection
        // tree from freaking out because we are readjusting
        if (typeof requestAnimationFrame === 'undefined') {
            return;
        }
        requestAnimationFrame(function () {
            _this.recalculate();
            // emit page for virtual server-side kickoff
            if (_this.externalPaging && _this.scrollbarV) {
                _this.page.emit({
                    count: _this.count,
                    pageSize: _this.pageSize,
                    limit: _this.limit,
                    offset: 0
                });
            }
        });
    };
    /**
     * Lifecycle hook that is called after a component's
     * content has been fully initialized.
     */
    DatatableComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.columnTemplates.changes.subscribe(function (v) {
            return _this.translateColumns(v);
        });
        this.listenForColumnInputChanges();
    };
    /**
     * Translates the templates to the column objects
     */
    DatatableComponent.prototype.translateColumns = function (val) {
        if (val) {
            var arr = val.toArray();
            if (arr.length) {
                this._internalColumns = translateTemplates(arr);
                setColumnDefaults(this._internalColumns);
                this.recalculateColumns();
                this.sortInternalRows();
                this.cd.markForCheck();
            }
        }
    };
    /**
     * Creates a map with the data grouped by the user choice of grouping index
     *
     * @param originalArray the original array passed via parameter
     * @param groupByIndex  the index of the column to group the data by
     */
    DatatableComponent.prototype.groupArrayBy = function (originalArray, groupBy) {
        // create a map to hold groups with their corresponding results
        var map = new Map();
        var i = 0;
        originalArray.forEach(function (item) {
            var key = item[groupBy];
            if (!map.has(key)) {
                map.set(key, [item]);
            }
            else {
                map.get(key).push(item);
            }
            i++;
        });
        var addGroup = function (key, value) {
            return { key: key, value: value };
        };
        // convert map back to a simple array of objects
        return Array.from(map, function (x) { return addGroup(x[0], x[1]); });
    };
    /*
    * Lifecycle hook that is called when Angular dirty checks a directive.
    */
    DatatableComponent.prototype.ngDoCheck = function () {
        if (this.rowDiffer.diff(this.rows)) {
            if (!this.externalSorting) {
                this.sortInternalRows();
            }
            else {
                this._internalRows = this.rows.slice();
            }
            // auto group by parent on new update
            this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
            this.recalculatePages();
            this.cd.markForCheck();
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
     */
    DatatableComponent.prototype.recalculate = function () {
        this.recalculateDims();
        this.recalculateColumns();
    };
    /**
     * Window resize handler to update sizes.
     */
    DatatableComponent.prototype.onWindowResize = function () {
        this.recalculate();
    };
    /**
     * Recalulcates the column widths based on column width
     * distribution mode and scrollbar offsets.
     */
    DatatableComponent.prototype.recalculateColumns = function (columns, forceIdx, allowBleed) {
        if (columns === void 0) { columns = this._internalColumns; }
        if (forceIdx === void 0) { forceIdx = -1; }
        if (allowBleed === void 0) { allowBleed = this.scrollbarH; }
        if (!columns)
            return undefined;
        var width = this._innerWidth;
        if (this.scrollbarV) {
            width = width - this.scrollbarHelper.width;
        }
        if (this.columnMode === ColumnMode.force) {
            forceFillColumnWidths(columns, width, forceIdx, allowBleed);
        }
        else if (this.columnMode === ColumnMode.flex) {
            adjustColumnWidths(columns, width);
        }
        return columns;
    };
    /**
     * Recalculates the dimensions of the table size.
     * Internally calls the page size and row count calcs too.
     *
     */
    DatatableComponent.prototype.recalculateDims = function () {
        var dims = this.dimensionsHelper.getDimensions(this.element);
        this._innerWidth = Math.floor(dims.width);
        if (this.scrollbarV) {
            var height = dims.height;
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
     */
    DatatableComponent.prototype.recalculatePages = function () {
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    };
    /**
     * Body triggered a page event.
     */
    DatatableComponent.prototype.onBodyPage = function (_a) {
        var offset = _a.offset;
        // Avoid pagination caming from body events like scroll when the table 
        // has no virtualization and the external paging is enable. 
        // This means, let's the developer handle pagination by my him(her) self
        if (this.externalPaging && !this.virtualization) {
            return;
        }
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
     */
    DatatableComponent.prototype.onBodyScroll = function (event) {
        this._offsetX.next(event.offsetX);
        this.scroll.emit(event);
        this.cd.detectChanges();
    };
    /**
     * The footer triggered a page event.
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
        if (this.selectAllRowsOnPage) {
            this.selected = [];
            this.select.emit({
                selected: this.selected
            });
        }
    };
    /**
     * Recalculates the sizes of the page
     */
    DatatableComponent.prototype.calcPageSize = function (val) {
        if (val === void 0) { val = this.rows; }
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV && this.virtualization) {
            var size = Math.ceil(this.bodyHeight / this.rowHeight);
            return Math.max(size, 0);
        }
        // if limit is passed, we are paging
        if (this.limit !== undefined) {
            return this.limit;
        }
        // otherwise use row length
        if (val) {
            return val.length;
        }
        // other empty :(
        return 0;
    };
    /**
     * Calculates the row count.
     */
    DatatableComponent.prototype.calcRowCount = function (val) {
        if (val === void 0) { val = this.rows; }
        if (!this.externalPaging) {
            if (!val)
                return 0;
            if (this.groupedRows) {
                return this.groupedRows.length;
            }
            else if (this.treeFromRelation != null && this.treeToRelation != null) {
                return this._internalRows.length;
            }
            else {
                return val.length;
            }
        }
        return this.count;
    };
    /**
     * The header triggered a contextmenu event.
     */
    DatatableComponent.prototype.onColumnContextmenu = function (_a) {
        var event = _a.event, column = _a.column;
        this.tableContextmenu.emit({ event: event, type: ContextmenuType.header, content: column });
    };
    /**
     * The body triggered a contextmenu event.
     */
    DatatableComponent.prototype.onRowContextmenu = function (_a) {
        var event = _a.event, row = _a.row;
        this.tableContextmenu.emit({ event: event, type: ContextmenuType.body, content: row });
    };
    /**
     * The header triggered a column resize event.
     */
    DatatableComponent.prototype.onColumnResize = function (_a) {
        var column = _a.column, newValue = _a.newValue;
        /* Safari/iOS 10.2 workaround */
        if (column === undefined) {
            return;
        }
        var idx;
        var cols = this._internalColumns.map(function (c, i) {
            c = datatable_component___assign({}, c);
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
        this._internalColumns = cols;
        this.resize.emit({
            column: column,
            newValue: newValue
        });
    };
    /**
     * The header triggered a column re-order event.
     */
    DatatableComponent.prototype.onColumnReorder = function (_a) {
        var column = _a.column, newValue = _a.newValue, prevValue = _a.prevValue;
        var cols = this._internalColumns.map(function (c) {
            return datatable_component___assign({}, c);
        });
        if (this.swapColumns) {
            var prevCol = cols[newValue];
            cols[newValue] = column;
            cols[prevValue] = prevCol;
        }
        else {
            if (newValue > prevValue) {
                var movedCol = cols[prevValue];
                for (var i = prevValue; i < newValue; i++) {
                    cols[i] = cols[i + 1];
                }
                cols[newValue] = movedCol;
            }
            else {
                var movedCol = cols[prevValue];
                for (var i = prevValue; i > newValue; i--) {
                    cols[i] = cols[i - 1];
                }
                cols[newValue] = movedCol;
            }
        }
        this._internalColumns = cols;
        this.reorder.emit({
            column: column,
            newValue: newValue,
            prevValue: prevValue
        });
    };
    /**
     * The header triggered a column sort event.
     */
    DatatableComponent.prototype.onColumnSort = function (event) {
        // clean selected rows
        if (this.selectAllRowsOnPage) {
            this.selected = [];
            this.select.emit({
                selected: this.selected
            });
        }
        this.sorts = event.sorts;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            // don't use normal setter so we don't resort
            this.sortInternalRows();
        }
        // auto group by parent on new update
        this._internalRows = groupRowsByParents(this._internalRows, optionalGetterForProp(this.treeFromRelation), optionalGetterForProp(this.treeToRelation));
        // Always go to first page when sorting to see the newly sorted data
        this.offset = 0;
        this.bodyComponent.updateOffsetY(this.offset);
        this.sort.emit(event);
    };
    /**
     * Toggle all row selection
     */
    DatatableComponent.prototype.onHeaderSelect = function (event) {
        var _a, _b;
        if (this.selectAllRowsOnPage) {
            // before we splice, chk if we currently have all selected
            var first = this.bodyComponent.indexes.first;
            var last = this.bodyComponent.indexes.last;
            var allSelected = this.selected.length === (last - first);
            // remove all existing either way
            this.selected = [];
            // do the opposite here
            if (!allSelected) {
                (_a = this.selected).push.apply(_a, this._internalRows.slice(first, last));
            }
        }
        else {
            // before we splice, chk if we currently have all selected
            var allSelected = this.selected.length === this.rows.length;
            // remove all existing either way
            this.selected = [];
            // do the opposite here
            if (!allSelected) {
                (_b = this.selected).push.apply(_b, this.rows);
            }
        }
        this.select.emit({
            selected: this.selected
        });
    };
    /**
     * A row was selected from body
     */
    DatatableComponent.prototype.onBodySelect = function (event) {
        this.select.emit(event);
    };
    /**
     * A row was expanded or collapsed for tree
     */
    DatatableComponent.prototype.onTreeAction = function (event) {
        var _this = this;
        var row = event.row;
        // TODO: For duplicated items this will not work
        var rowIndex = this._rows.findIndex(function (r) {
            return r[_this.treeToRelation] === event.row[_this.treeToRelation];
        });
        this.treeAction.emit({ row: row, rowIndex: rowIndex });
    };
    DatatableComponent.prototype.ngOnDestroy = function () {
        this._subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    /**
     * listen for changes to input bindings of all DataTableColumnDirective and
     * trigger the columnTemplates.changes observable to emit
     */
    DatatableComponent.prototype.listenForColumnInputChanges = function () {
        var _this = this;
        this._subscriptions.push(this.columnChangesService
            .columnInputChanges$
            .subscribe(function () {
            if (_this.columnTemplates) {
                _this.columnTemplates.notifyOnChanges();
            }
        }));
    };
    DatatableComponent.prototype.sortInternalRows = function () {
        this._internalRows = sortRows(this._internalRows, this._internalColumns, this.sorts);
    };
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Object)
    ], DatatableComponent.prototype, "targetMarkerTemplate", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Object),
        datatable_component___metadata("design:paramtypes", [Object])
    ], DatatableComponent.prototype, "rows", null);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", String),
        datatable_component___metadata("design:paramtypes", [String])
    ], DatatableComponent.prototype, "groupRowsBy", null);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Array)
    ], DatatableComponent.prototype, "groupedRows", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Array),
        datatable_component___metadata("design:paramtypes", [Array])
    ], DatatableComponent.prototype, "columns", null);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Array)
    ], DatatableComponent.prototype, "selected", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "scrollbarV", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "scrollbarH", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Number)
    ], DatatableComponent.prototype, "rowHeight", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", String)
    ], DatatableComponent.prototype, "columnMode", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Object)
    ], DatatableComponent.prototype, "headerHeight", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Number)
    ], DatatableComponent.prototype, "footerHeight", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "externalPaging", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "externalSorting", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Number),
        datatable_component___metadata("design:paramtypes", [Number])
    ], DatatableComponent.prototype, "limit", null);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Number),
        datatable_component___metadata("design:paramtypes", [Number])
    ], DatatableComponent.prototype, "count", null);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Number),
        datatable_component___metadata("design:paramtypes", [Number])
    ], DatatableComponent.prototype, "offset", null);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "loadingIndicator", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", String)
    ], DatatableComponent.prototype, "selectionType", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "reorderable", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "swapColumns", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", String)
    ], DatatableComponent.prototype, "sortType", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Array)
    ], DatatableComponent.prototype, "sorts", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Object)
    ], DatatableComponent.prototype, "cssClasses", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Object)
    ], DatatableComponent.prototype, "messages", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Function)
    ], DatatableComponent.prototype, "rowIdentity", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Object)
    ], DatatableComponent.prototype, "rowClass", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Object)
    ], DatatableComponent.prototype, "selectCheck", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Function)
    ], DatatableComponent.prototype, "displayCheck", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "groupExpansionDefault", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", String)
    ], DatatableComponent.prototype, "trackByProp", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Object)
    ], DatatableComponent.prototype, "selectAllRowsOnPage", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "virtualization", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", String)
    ], DatatableComponent.prototype, "treeFromRelation", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", String)
    ], DatatableComponent.prototype, "treeToRelation", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Boolean)
    ], DatatableComponent.prototype, "summaryRow", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", Number)
    ], DatatableComponent.prototype, "summaryHeight", void 0);
    datatable_component___decorate([
        Object(core_["Input"])(),
        datatable_component___metadata("design:type", String)
    ], DatatableComponent.prototype, "summaryPosition", void 0);
    datatable_component___decorate([
        Object(core_["Output"])(),
        datatable_component___metadata("design:type", core_["EventEmitter"])
    ], DatatableComponent.prototype, "scroll", void 0);
    datatable_component___decorate([
        Object(core_["Output"])(),
        datatable_component___metadata("design:type", core_["EventEmitter"])
    ], DatatableComponent.prototype, "activate", void 0);
    datatable_component___decorate([
        Object(core_["Output"])(),
        datatable_component___metadata("design:type", core_["EventEmitter"])
    ], DatatableComponent.prototype, "select", void 0);
    datatable_component___decorate([
        Object(core_["Output"])(),
        datatable_component___metadata("design:type", core_["EventEmitter"])
    ], DatatableComponent.prototype, "sort", void 0);
    datatable_component___decorate([
        Object(core_["Output"])(),
        datatable_component___metadata("design:type", core_["EventEmitter"])
    ], DatatableComponent.prototype, "page", void 0);
    datatable_component___decorate([
        Object(core_["Output"])(),
        datatable_component___metadata("design:type", core_["EventEmitter"])
    ], DatatableComponent.prototype, "reorder", void 0);
    datatable_component___decorate([
        Object(core_["Output"])(),
        datatable_component___metadata("design:type", core_["EventEmitter"])
    ], DatatableComponent.prototype, "resize", void 0);
    datatable_component___decorate([
        Object(core_["Output"])(),
        datatable_component___metadata("design:type", Object)
    ], DatatableComponent.prototype, "tableContextmenu", void 0);
    datatable_component___decorate([
        Object(core_["Output"])(),
        datatable_component___metadata("design:type", core_["EventEmitter"])
    ], DatatableComponent.prototype, "treeAction", void 0);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.fixed-header'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isFixedHeader", null);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.fixed-row'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isFixedRow", null);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.scroll-vertical'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isVertScroll", null);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.virtualized'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isVirtualized", null);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.scroll-horz'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isHorScroll", null);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.selectable'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isSelectable", null);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.checkbox-selection'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isCheckboxSelection", null);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.cell-selection'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isCellSelection", null);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.single-selection'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isSingleSelection", null);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.multi-selection'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isMultiSelection", null);
    datatable_component___decorate([
        Object(core_["HostBinding"])('class.multi-click-selection'),
        datatable_component___metadata("design:type", Boolean),
        datatable_component___metadata("design:paramtypes", [])
    ], DatatableComponent.prototype, "isMultiClickSelection", null);
    datatable_component___decorate([
        Object(core_["ContentChildren"])(column_directive_DataTableColumnDirective),
        datatable_component___metadata("design:type", core_["QueryList"]),
        datatable_component___metadata("design:paramtypes", [core_["QueryList"]])
    ], DatatableComponent.prototype, "columnTemplates", null);
    datatable_component___decorate([
        Object(core_["ContentChild"])(row_detail_directive_DatatableRowDetailDirective),
        datatable_component___metadata("design:type", row_detail_directive_DatatableRowDetailDirective)
    ], DatatableComponent.prototype, "rowDetail", void 0);
    datatable_component___decorate([
        Object(core_["ContentChild"])(body_group_header_directive_DatatableGroupHeaderDirective),
        datatable_component___metadata("design:type", body_group_header_directive_DatatableGroupHeaderDirective)
    ], DatatableComponent.prototype, "groupHeader", void 0);
    datatable_component___decorate([
        Object(core_["ContentChild"])(footer_directive_DatatableFooterDirective),
        datatable_component___metadata("design:type", footer_directive_DatatableFooterDirective)
    ], DatatableComponent.prototype, "footer", void 0);
    datatable_component___decorate([
        Object(core_["ViewChild"])(body_component_DataTableBodyComponent),
        datatable_component___metadata("design:type", body_component_DataTableBodyComponent)
    ], DatatableComponent.prototype, "bodyComponent", void 0);
    datatable_component___decorate([
        Object(core_["ViewChild"])(header_component_DataTableHeaderComponent),
        datatable_component___metadata("design:type", header_component_DataTableHeaderComponent)
    ], DatatableComponent.prototype, "headerComponent", void 0);
    datatable_component___decorate([
        Object(core_["HostListener"])('window:resize'),
        throttleable(5),
        datatable_component___metadata("design:type", Function),
        datatable_component___metadata("design:paramtypes", []),
        datatable_component___metadata("design:returntype", void 0)
    ], DatatableComponent.prototype, "onWindowResize", null);
    DatatableComponent = datatable_component___decorate([
        Object(core_["Component"])({
            selector: 'ngx-datatable',
            template: "\n    <div\n      visibilityObserver\n      (visible)=\"recalculate()\">\n      <datatable-header\n        *ngIf=\"headerHeight\"\n        [sorts]=\"sorts\"\n        [sortType]=\"sortType\"\n        [scrollbarH]=\"scrollbarH\"\n        [innerWidth]=\"_innerWidth\"\n        [offsetX]=\"_offsetX | async\"\n        [dealsWithGroup]=\"groupedRows\"\n        [columns]=\"_internalColumns\"\n        [headerHeight]=\"headerHeight\"\n        [reorderable]=\"reorderable\"\n        [targetMarkerTemplate]=\"targetMarkerTemplate\"\n        [sortAscendingIcon]=\"cssClasses.sortAscending\"\n        [sortDescendingIcon]=\"cssClasses.sortDescending\"\n        [allRowsSelected]=\"allRowsSelected\"\n        [selectionType]=\"selectionType\"\n        (sort)=\"onColumnSort($event)\"\n        (resize)=\"onColumnResize($event)\"\n        (reorder)=\"onColumnReorder($event)\"\n        (select)=\"onHeaderSelect($event)\"\n        (columnContextmenu)=\"onColumnContextmenu($event)\">\n      </datatable-header>\n      <datatable-body\n        [groupRowsBy]=\"groupRowsBy\"\n        [groupedRows]=\"groupedRows\"\n        [rows]=\"_internalRows\"\n        [groupExpansionDefault]=\"groupExpansionDefault\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [virtualization]=\"virtualization\"\n        [loadingIndicator]=\"loadingIndicator\"\n        [externalPaging]=\"externalPaging\"\n        [rowHeight]=\"rowHeight\"\n        [rowCount]=\"rowCount\"\n        [offset]=\"offset\"\n        [trackByProp]=\"trackByProp\"\n        [columns]=\"_internalColumns\"\n        [pageSize]=\"pageSize\"\n        [offsetX]=\"_offsetX | async\"\n        [rowDetail]=\"rowDetail\"\n        [groupHeader]=\"groupHeader\"\n        [selected]=\"selected\"\n        [innerWidth]=\"_innerWidth\"\n        [bodyHeight]=\"bodyHeight\"\n        [selectionType]=\"selectionType\"\n        [emptyMessage]=\"messages.emptyMessage\"\n        [rowIdentity]=\"rowIdentity\"\n        [rowClass]=\"rowClass\"\n        [selectCheck]=\"selectCheck\"\n        [displayCheck]=\"displayCheck\"\n        [summaryRow]=\"summaryRow\"\n        [summaryHeight]=\"summaryHeight\"\n        [summaryPosition]=\"summaryPosition\"\n        (page)=\"onBodyPage($event)\"\n        (activate)=\"activate.emit($event)\"\n        (rowContextmenu)=\"onRowContextmenu($event)\"\n        (select)=\"onBodySelect($event)\"\n        (scroll)=\"onBodyScroll($event)\"\n        (treeAction)=\"onTreeAction($event)\">\n      </datatable-body>\n      <datatable-footer\n        *ngIf=\"footerHeight\"\n        [rowCount]=\"rowCount\"\n        [pageSize]=\"pageSize\"\n        [offset]=\"offset\"\n        [footerHeight]=\"footerHeight\"\n        [footerTemplate]=\"footer\"\n        [totalMessage]=\"messages.totalMessage\"\n        [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\n        [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\n        [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\n        [selectedCount]=\"selected.length\"\n        [selectedMessage]=\"!!selectionType && messages.selectedMessage\"\n        [pagerNextIcon]=\"cssClasses.pagerNext\"\n        (page)=\"onFooterPage($event)\">\n      </datatable-footer>\n    </div>\n  ",
            changeDetection: core_["ChangeDetectionStrategy"].OnPush,
            encapsulation: core_["ViewEncapsulation"].None,
            styles: [__webpack_require__("./src/components/datatable.component.scss")],
            host: {
                class: 'ngx-datatable'
            }
        }),
        datatable_component___param(0, Object(core_["SkipSelf"])()),
        datatable_component___param(1, Object(core_["SkipSelf"])()),
        datatable_component___metadata("design:paramtypes", [scrollbar_helper_service_ScrollbarHelper,
            dimensions_helper_service_DimensionsHelper,
            core_["ChangeDetectorRef"],
            core_["ElementRef"],
            core_["KeyValueDiffers"],
            column_changes_service_ColumnChangesService])
    ], DatatableComponent);
    return DatatableComponent;
}());


// CONCATENATED MODULE: ./src/components/index.ts







// EXTERNAL MODULE: external "rxjs/operators"
var operators_ = __webpack_require__("rxjs/operators");
var operators__default = /*#__PURE__*/__webpack_require__.n(operators_);

// CONCATENATED MODULE: ./src/directives/draggable.directive.ts
var draggable_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var draggable_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
var draggable_directive_DraggableDirective = /** @class */ (function () {
    function DraggableDirective(element) {
        this.dragX = true;
        this.dragY = true;
        this.dragStart = new core_["EventEmitter"]();
        this.dragging = new core_["EventEmitter"]();
        this.dragEnd = new core_["EventEmitter"]();
        this.isDragging = false;
        this.element = element.nativeElement;
    }
    DraggableDirective.prototype.ngOnChanges = function (changes) {
        if (changes['dragEventTarget'] && changes['dragEventTarget'].currentValue && this.dragModel.dragging) {
            this.onMousedown(changes['dragEventTarget'].currentValue);
        }
    };
    DraggableDirective.prototype.ngOnDestroy = function () {
        this._destroySubscription();
    };
    DraggableDirective.prototype.onMouseup = function (event) {
        if (!this.isDragging)
            return;
        this.isDragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this._destroySubscription();
            this.dragEnd.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.prototype.onMousedown = function (event) {
        var _this = this;
        // we only want to drag the inner header text
        var isDragElm = event.target.classList.contains('draggable');
        if (isDragElm && (this.dragX || this.dragY)) {
            event.preventDefault();
            this.isDragging = true;
            var mouseDownPos_1 = { x: event.clientX, y: event.clientY };
            var mouseup = Object(external__rxjs_["fromEvent"])(document, 'mouseup');
            this.subscription = mouseup
                .subscribe(function (ev) { return _this.onMouseup(ev); });
            var mouseMoveSub = Object(external__rxjs_["fromEvent"])(document, 'mousemove')
                .pipe(Object(operators_["takeUntil"])(mouseup))
                .subscribe(function (ev) { return _this.move(ev, mouseDownPos_1); });
            this.subscription.add(mouseMoveSub);
            this.dragStart.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.prototype.move = function (event, mouseDownPos) {
        if (!this.isDragging)
            return;
        var x = event.clientX - mouseDownPos.x;
        var y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = x + "px";
        if (this.dragY)
            this.element.style.top = y + "px";
        this.element.classList.add('dragging');
        this.dragging.emit({
            event: event,
            element: this.element,
            model: this.dragModel
        });
    };
    DraggableDirective.prototype._destroySubscription = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    draggable_directive___decorate([
        Object(core_["Input"])(),
        draggable_directive___metadata("design:type", Object)
    ], DraggableDirective.prototype, "dragEventTarget", void 0);
    draggable_directive___decorate([
        Object(core_["Input"])(),
        draggable_directive___metadata("design:type", Object)
    ], DraggableDirective.prototype, "dragModel", void 0);
    draggable_directive___decorate([
        Object(core_["Input"])(),
        draggable_directive___metadata("design:type", Boolean)
    ], DraggableDirective.prototype, "dragX", void 0);
    draggable_directive___decorate([
        Object(core_["Input"])(),
        draggable_directive___metadata("design:type", Boolean)
    ], DraggableDirective.prototype, "dragY", void 0);
    draggable_directive___decorate([
        Object(core_["Output"])(),
        draggable_directive___metadata("design:type", core_["EventEmitter"])
    ], DraggableDirective.prototype, "dragStart", void 0);
    draggable_directive___decorate([
        Object(core_["Output"])(),
        draggable_directive___metadata("design:type", core_["EventEmitter"])
    ], DraggableDirective.prototype, "dragging", void 0);
    draggable_directive___decorate([
        Object(core_["Output"])(),
        draggable_directive___metadata("design:type", core_["EventEmitter"])
    ], DraggableDirective.prototype, "dragEnd", void 0);
    DraggableDirective = draggable_directive___decorate([
        Object(core_["Directive"])({ selector: '[draggable]' }),
        draggable_directive___metadata("design:paramtypes", [core_["ElementRef"]])
    ], DraggableDirective);
    return DraggableDirective;
}());


// CONCATENATED MODULE: ./src/directives/long-press.directive.ts
var long_press_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var long_press_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var long_press_directive_LongPressDirective = /** @class */ (function () {
    function LongPressDirective() {
        this.pressEnabled = true;
        this.duration = 500;
        this.longPressStart = new core_["EventEmitter"]();
        this.longPressing = new core_["EventEmitter"]();
        this.longPressEnd = new core_["EventEmitter"]();
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
        if (event.which !== 1 || !this.pressEnabled)
            return;
        // don't start drag if its on resize handle
        var target = event.target;
        if (target.classList.contains('resize-handle'))
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        var mouseup = Object(external__rxjs_["fromEvent"])(document, 'mouseup');
        this.subscription = mouseup.subscribe(function (ev) { return _this.onMouseup(); });
        this.timeout = setTimeout(function () {
            _this.isLongPressing = true;
            _this.longPressStart.emit({
                event: event,
                model: _this.pressModel
            });
            _this.subscription.add(Object(external__rxjs_["fromEvent"])(document, 'mousemove')
                .pipe(Object(operators_["takeUntil"])(mouseup))
                .subscribe(function (mouseEvent) { return _this.onMouseMove(mouseEvent); }));
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
                _this.longPressing.emit({
                    event: event,
                    model: _this.pressModel
                });
                _this.loop(event);
            }, 50);
        }
    };
    LongPressDirective.prototype.endPress = function () {
        clearTimeout(this.timeout);
        this.isLongPressing = false;
        this.pressing = false;
        this._destroySubscription();
        this.longPressEnd.emit({
            model: this.pressModel
        });
    };
    LongPressDirective.prototype.onMouseup = function () {
        this.endPress();
    };
    LongPressDirective.prototype.ngOnDestroy = function () {
        this._destroySubscription();
    };
    LongPressDirective.prototype._destroySubscription = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    long_press_directive___decorate([
        Object(core_["Input"])(),
        long_press_directive___metadata("design:type", Boolean)
    ], LongPressDirective.prototype, "pressEnabled", void 0);
    long_press_directive___decorate([
        Object(core_["Input"])(),
        long_press_directive___metadata("design:type", Object)
    ], LongPressDirective.prototype, "pressModel", void 0);
    long_press_directive___decorate([
        Object(core_["Input"])(),
        long_press_directive___metadata("design:type", Number)
    ], LongPressDirective.prototype, "duration", void 0);
    long_press_directive___decorate([
        Object(core_["Output"])(),
        long_press_directive___metadata("design:type", core_["EventEmitter"])
    ], LongPressDirective.prototype, "longPressStart", void 0);
    long_press_directive___decorate([
        Object(core_["Output"])(),
        long_press_directive___metadata("design:type", core_["EventEmitter"])
    ], LongPressDirective.prototype, "longPressing", void 0);
    long_press_directive___decorate([
        Object(core_["Output"])(),
        long_press_directive___metadata("design:type", core_["EventEmitter"])
    ], LongPressDirective.prototype, "longPressEnd", void 0);
    long_press_directive___decorate([
        Object(core_["HostBinding"])('class.press'),
        long_press_directive___metadata("design:type", Boolean),
        long_press_directive___metadata("design:paramtypes", [])
    ], LongPressDirective.prototype, "press", null);
    long_press_directive___decorate([
        Object(core_["HostBinding"])('class.longpress'),
        long_press_directive___metadata("design:type", Boolean),
        long_press_directive___metadata("design:paramtypes", [])
    ], LongPressDirective.prototype, "isLongPress", null);
    long_press_directive___decorate([
        Object(core_["HostListener"])('mousedown', ['$event']),
        long_press_directive___metadata("design:type", Function),
        long_press_directive___metadata("design:paramtypes", [Object]),
        long_press_directive___metadata("design:returntype", void 0)
    ], LongPressDirective.prototype, "onMouseDown", null);
    LongPressDirective = long_press_directive___decorate([
        Object(core_["Directive"])({ selector: '[long-press]' })
    ], LongPressDirective);
    return LongPressDirective;
}());


// CONCATENATED MODULE: ./src/directives/orderable.directive.ts
var orderable_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var orderable_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var orderable_directive___param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var orderable_directive_OrderableDirective = /** @class */ (function () {
    function OrderableDirective(differs, document) {
        this.document = document;
        this.reorder = new core_["EventEmitter"]();
        this.targetChanged = new core_["EventEmitter"]();
        this.differ = differs.find({}).create();
    }
    OrderableDirective.prototype.ngAfterContentInit = function () {
        // HACK: Investigate Better Way
        this.updateSubscriptions();
        this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
    };
    OrderableDirective.prototype.ngOnDestroy = function () {
        this.draggables.forEach(function (d) {
            d.dragStart.unsubscribe();
            d.dragging.unsubscribe();
            d.dragEnd.unsubscribe();
        });
    };
    OrderableDirective.prototype.updateSubscriptions = function () {
        var _this = this;
        var diffs = this.differ.diff(this.createMapDiffs());
        if (diffs) {
            var subscribe = function (_a) {
                var currentValue = _a.currentValue, previousValue = _a.previousValue;
                unsubscribe_1({ previousValue: previousValue });
                if (currentValue) {
                    currentValue.dragStart.subscribe(_this.onDragStart.bind(_this));
                    currentValue.dragging.subscribe(_this.onDragging.bind(_this));
                    currentValue.dragEnd.subscribe(_this.onDragEnd.bind(_this));
                }
            };
            var unsubscribe_1 = function (_a) {
                var previousValue = _a.previousValue;
                if (previousValue) {
                    previousValue.dragStart.unsubscribe();
                    previousValue.dragging.unsubscribe();
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
            var left = parseInt(elm.offsetLeft.toString(), 0);
            this.positions[dragger.dragModel.prop] = {
                left: left,
                right: left + parseInt(elm.offsetWidth.toString(), 0),
                index: i++,
                element: elm
            };
        }
    };
    OrderableDirective.prototype.onDragging = function (_a) {
        var element = _a.element, model = _a.model, event = _a.event;
        var prevPos = this.positions[model.prop];
        var target = this.isTarget(model, event);
        if (target) {
            if (this.lastDraggingIndex !== target.i) {
                this.targetChanged.emit({
                    prevIndex: this.lastDraggingIndex,
                    newIndex: target.i,
                    initialIndex: prevPos.index
                });
                this.lastDraggingIndex = target.i;
            }
        }
        else if (this.lastDraggingIndex !== prevPos.index) {
            this.targetChanged.emit({
                prevIndex: this.lastDraggingIndex,
                initialIndex: prevPos.index
            });
            this.lastDraggingIndex = prevPos.index;
        }
    };
    OrderableDirective.prototype.onDragEnd = function (_a) {
        var element = _a.element, model = _a.model, event = _a.event;
        var prevPos = this.positions[model.prop];
        var target = this.isTarget(model, event);
        if (target) {
            this.reorder.emit({
                prevIndex: prevPos.index,
                newIndex: target.i,
                model: model
            });
        }
        this.lastDraggingIndex = undefined;
        element.style.left = 'auto';
    };
    OrderableDirective.prototype.isTarget = function (model, event) {
        var i = 0;
        var x = event.x || event.clientX;
        var y = event.y || event.clientY;
        var targets = this.document.elementsFromPoint(x, y);
        var _loop_1 = function (prop) {
            // current column position which throws event.
            var pos = this_1.positions[prop];
            // since we drag the inner span, we need to find it in the elements at the cursor
            if (model.prop !== prop && targets.find(function (el) { return el === pos.element; })) {
                return { value: {
                        pos: pos,
                        i: i
                    } };
            }
            i++;
        };
        var this_1 = this;
        for (var prop in this.positions) {
            var state_1 = _loop_1(prop);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    OrderableDirective.prototype.createMapDiffs = function () {
        return this.draggables.toArray()
            .reduce(function (acc, curr) {
            acc[curr.dragModel.$$id] = curr;
            return acc;
        }, {});
    };
    orderable_directive___decorate([
        Object(core_["Output"])(),
        orderable_directive___metadata("design:type", core_["EventEmitter"])
    ], OrderableDirective.prototype, "reorder", void 0);
    orderable_directive___decorate([
        Object(core_["Output"])(),
        orderable_directive___metadata("design:type", core_["EventEmitter"])
    ], OrderableDirective.prototype, "targetChanged", void 0);
    orderable_directive___decorate([
        Object(core_["ContentChildren"])(draggable_directive_DraggableDirective, { descendants: true }),
        orderable_directive___metadata("design:type", core_["QueryList"])
    ], OrderableDirective.prototype, "draggables", void 0);
    OrderableDirective = orderable_directive___decorate([
        Object(core_["Directive"])({ selector: '[orderable]' }),
        orderable_directive___param(1, Object(core_["Inject"])(platform_browser_["DOCUMENT"])),
        orderable_directive___metadata("design:paramtypes", [core_["KeyValueDiffers"], Object])
    ], OrderableDirective);
    return OrderableDirective;
}());


// CONCATENATED MODULE: ./src/directives/resizeable.directive.ts
var resizeable_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var resizeable_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var resizeable_directive_ResizeableDirective = /** @class */ (function () {
    function ResizeableDirective(element, renderer) {
        this.renderer = renderer;
        this.resizeEnabled = true;
        this.resize = new core_["EventEmitter"]();
        this.resizing = false;
        this.element = element.nativeElement;
    }
    ResizeableDirective.prototype.ngAfterViewInit = function () {
        var renderer2 = this.renderer;
        var node = renderer2.createElement('span');
        if (this.resizeEnabled) {
            renderer2.addClass(node, 'resize-handle');
        }
        else {
            renderer2.addClass(node, 'resize-handle--not-resizable');
        }
        renderer2.appendChild(this.element, node);
    };
    ResizeableDirective.prototype.ngOnDestroy = function () {
        this._destroySubscription();
    };
    ResizeableDirective.prototype.onMouseup = function () {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
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
            var mouseup = Object(external__rxjs_["fromEvent"])(document, 'mouseup');
            this.subscription = mouseup
                .subscribe(function (ev) { return _this.onMouseup(); });
            var mouseMoveSub = Object(external__rxjs_["fromEvent"])(document, 'mousemove')
                .pipe(Object(operators_["takeUntil"])(mouseup))
                .subscribe(function (e) { return _this.move(e, initialWidth, mouseDownScreenX); });
            this.subscription.add(mouseMoveSub);
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
    ResizeableDirective.prototype._destroySubscription = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    resizeable_directive___decorate([
        Object(core_["Input"])(),
        resizeable_directive___metadata("design:type", Boolean)
    ], ResizeableDirective.prototype, "resizeEnabled", void 0);
    resizeable_directive___decorate([
        Object(core_["Input"])(),
        resizeable_directive___metadata("design:type", Number)
    ], ResizeableDirective.prototype, "minWidth", void 0);
    resizeable_directive___decorate([
        Object(core_["Input"])(),
        resizeable_directive___metadata("design:type", Number)
    ], ResizeableDirective.prototype, "maxWidth", void 0);
    resizeable_directive___decorate([
        Object(core_["Output"])(),
        resizeable_directive___metadata("design:type", core_["EventEmitter"])
    ], ResizeableDirective.prototype, "resize", void 0);
    resizeable_directive___decorate([
        Object(core_["HostListener"])('mousedown', ['$event']),
        resizeable_directive___metadata("design:type", Function),
        resizeable_directive___metadata("design:paramtypes", [Object]),
        resizeable_directive___metadata("design:returntype", void 0)
    ], ResizeableDirective.prototype, "onMousedown", null);
    ResizeableDirective = resizeable_directive___decorate([
        Object(core_["Directive"])({
            selector: '[resizeable]',
            host: {
                '[class.resizeable]': 'resizeEnabled'
            }
        }),
        resizeable_directive___metadata("design:paramtypes", [core_["ElementRef"], core_["Renderer2"]])
    ], ResizeableDirective);
    return ResizeableDirective;
}());


// CONCATENATED MODULE: ./src/directives/visibility.directive.ts
var visibility_directive___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var visibility_directive___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
var visibility_directive_VisibilityDirective = /** @class */ (function () {
    function VisibilityDirective(element, zone) {
        this.element = element;
        this.zone = zone;
        this.isVisible = false;
        this.visible = new core_["EventEmitter"]();
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
        this.timeout = setTimeout(function () { return check(); });
    };
    visibility_directive___decorate([
        Object(core_["HostBinding"])('class.visible'),
        visibility_directive___metadata("design:type", Boolean)
    ], VisibilityDirective.prototype, "isVisible", void 0);
    visibility_directive___decorate([
        Object(core_["Output"])(),
        visibility_directive___metadata("design:type", core_["EventEmitter"])
    ], VisibilityDirective.prototype, "visible", void 0);
    VisibilityDirective = visibility_directive___decorate([
        Object(core_["Directive"])({ selector: '[visibilityObserver]' }),
        visibility_directive___metadata("design:paramtypes", [core_["ElementRef"], core_["NgZone"]])
    ], VisibilityDirective);
    return VisibilityDirective;
}());


// CONCATENATED MODULE: ./src/directives/index.ts






// CONCATENATED MODULE: ./src/datatable.module.ts
var datatable_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var datatable_module_NgxDatatableModule = /** @class */ (function () {
    function NgxDatatableModule() {
    }
    NgxDatatableModule = datatable_module___decorate([
        Object(core_["NgModule"])({
            imports: [
                common_["CommonModule"]
            ],
            providers: [
                scrollbar_helper_service_ScrollbarHelper,
                dimensions_helper_service_DimensionsHelper,
                column_changes_service_ColumnChangesService
            ],
            declarations: [
                footer_template_directive_DataTableFooterTemplateDirective,
                visibility_directive_VisibilityDirective,
                draggable_directive_DraggableDirective,
                resizeable_directive_ResizeableDirective,
                orderable_directive_OrderableDirective,
                long_press_directive_LongPressDirective,
                scroller_component_ScrollerComponent,
                datatable_component_DatatableComponent,
                column_directive_DataTableColumnDirective,
                header_component_DataTableHeaderComponent,
                header_cell_component_DataTableHeaderCellComponent,
                body_component_DataTableBodyComponent,
                footer_component_DataTableFooterComponent,
                pager_component_DataTablePagerComponent,
                progress_bar_component_ProgressBarComponent,
                body_row_component_DataTableBodyRowComponent,
                body_row_wrapper_component_DataTableRowWrapperComponent,
                row_detail_directive_DatatableRowDetailDirective,
                body_group_header_directive_DatatableGroupHeaderDirective,
                row_detail_template_directive_DatatableRowDetailTemplateDirective,
                body_cell_component_DataTableBodyCellComponent,
                selection_component_DataTableSelectionComponent,
                column_header_directive_DataTableColumnHeaderDirective,
                column_cell_directive_DataTableColumnCellDirective,
                tree_directive_DataTableColumnCellTreeToggle,
                footer_directive_DatatableFooterDirective,
                body_group_header_template_directive_DatatableGroupHeaderTemplateDirective,
                summary_row_component_DataTableSummaryRowComponent,
            ],
            exports: [
                datatable_component_DatatableComponent,
                row_detail_directive_DatatableRowDetailDirective,
                body_group_header_directive_DatatableGroupHeaderDirective,
                row_detail_template_directive_DatatableRowDetailTemplateDirective,
                column_directive_DataTableColumnDirective,
                column_header_directive_DataTableColumnHeaderDirective,
                column_cell_directive_DataTableColumnCellDirective,
                tree_directive_DataTableColumnCellTreeToggle,
                footer_template_directive_DataTableFooterTemplateDirective,
                footer_directive_DatatableFooterDirective,
                pager_component_DataTablePagerComponent,
                body_group_header_template_directive_DatatableGroupHeaderTemplateDirective
            ]
        })
    ], NgxDatatableModule);
    return NgxDatatableModule;
}());


// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "NgxDatatableModule", function() { return datatable_module_NgxDatatableModule; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ColumnMode", function() { return ColumnMode; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SortType", function() { return SortType; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SortDirection", function() { return SortDirection; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SelectionType", function() { return SelectionType; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ClickType", function() { return ClickType; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ContextmenuType", function() { return ContextmenuType; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DatatableComponent", function() { return datatable_component_DatatableComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DatatableGroupHeaderDirective", function() { return body_group_header_directive_DatatableGroupHeaderDirective; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableHeaderComponent", function() { return header_component_DataTableHeaderComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableHeaderCellComponent", function() { return header_cell_component_DataTableHeaderCellComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableBodyComponent", function() { return body_component_DataTableBodyComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableBodyCellComponent", function() { return body_cell_component_DataTableBodyCellComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableBodyRowComponent", function() { return body_row_component_DataTableBodyRowComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ProgressBarComponent", function() { return progress_bar_component_ProgressBarComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ScrollerComponent", function() { return scroller_component_ScrollerComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableRowWrapperComponent", function() { return body_row_wrapper_component_DataTableRowWrapperComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableSelectionComponent", function() { return selection_component_DataTableSelectionComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DatatableGroupHeaderTemplateDirective", function() { return body_group_header_template_directive_DatatableGroupHeaderTemplateDirective; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableFooterComponent", function() { return footer_component_DataTableFooterComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTablePagerComponent", function() { return pager_component_DataTablePagerComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DatatableFooterDirective", function() { return footer_directive_DatatableFooterDirective; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableFooterTemplateDirective", function() { return footer_template_directive_DataTableFooterTemplateDirective; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableColumnDirective", function() { return column_directive_DataTableColumnDirective; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableColumnHeaderDirective", function() { return column_header_directive_DataTableColumnHeaderDirective; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableColumnCellDirective", function() { return column_cell_directive_DataTableColumnCellDirective; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableColumnCellTreeToggle", function() { return tree_directive_DataTableColumnCellTreeToggle; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DatatableRowDetailDirective", function() { return row_detail_directive_DatatableRowDetailDirective; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DatatableRowDetailTemplateDirective", function() { return row_detail_template_directive_DatatableRowDetailTemplateDirective; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DataTableSummaryRowComponent", function() { return summary_row_component_DataTableSummaryRowComponent; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ScrollbarHelper", function() { return scrollbar_helper_service_ScrollbarHelper; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "DimensionsHelper", function() { return dimensions_helper_service_DimensionsHelper; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ColumnChangesService", function() { return column_changes_service_ColumnChangesService; });






/***/ }),

/***/ "@angular/common":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_common__;

/***/ }),

/***/ "@angular/core":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_core__;

/***/ }),

/***/ "@angular/platform-browser":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__angular_platform_browser__;

/***/ }),

/***/ "rxjs":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs__;

/***/ }),

/***/ "rxjs/operators":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_operators__;

/***/ })

/******/ });
});
//# sourceMappingURL=index.map