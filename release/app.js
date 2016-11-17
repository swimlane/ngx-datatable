/**
 * angular2-data-table v"1.6.0" (https://github.com/swimlane/angular2-data-table)
 * Copyright 2016
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("@angular/platform-browser-dynamic"), require("rxjs/Rx"));
	else if(typeof define === 'function' && define.amd)
		define("angular2-data-table", ["@angular/common", "@angular/core", "@angular/platform-browser", "@angular/platform-browser-dynamic", "rxjs/Rx"], factory);
	else if(typeof exports === 'object')
		exports["angular2-data-table"] = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("@angular/platform-browser-dynamic"), require("rxjs/Rx"));
	else
		root["angular2-data-table"] = factory(root["@angular/common"], root["@angular/core"], root["@angular/platform-browser"], root["@angular/platform-browser-dynamic"], root["rxjs/Rx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/bootstrap.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/app.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var AppComponent = (function () {
    function AppComponent() {
        this.version = "1.6.0";
    }
    Object.defineProperty(AppComponent.prototype, "state", {
        get: function () {
            return window.state;
        },
        set: function (state) {
            window.state = state;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n    <div>\n      <nav>\n        <h3>angular2-data-table <small>({{version}})</small></h3>\n        <ul class=\"main-ul\">\n          <li>\n            <h4>Basic</h4>\n            <ul>\n              <li><a href=\"#\" (click)=\"state=''\">Auto Row Height</a></li>\n              <li><a href=\"#\" (click)=\"state='basic-fixed'\">Fixed Row Height</a></li>\n              <li><a href=\"#\" (click)=\"state='virtual-scroll'\">100k Rows</a></li>\n              <li><a href=\"#\" (click)=\"state='full-screen'\">Full Screen</a></li>\n              <li><a href=\"#\" (click)=\"state='inline-edit'\">Inline Editing</a></li>\n              <li><a href=\"#\" (click)=\"state='horz-vert-scrolling'\">Horz/Vert Scrolling</a></li>\n              <li><a href=\"#\" (click)=\"state='multiple-tables'\">Multiple Instances</a></li>\n              <li><a href=\"#\" (click)=\"state='row-details'\">Row Detail</a></li>\n              <li><a href=\"#\" (click)=\"state='filter'\">Filtering</a></li>\n              <li><a href=\"#\" (click)=\"state='hidden'\">Hidden On Load</a></li>\n              <li><a href=\"#\" (click)=\"state='live'\">Live Data</a></li>\n            </ul>\n          </li>\n          <li>\n            <h4>Paging</h4>\n            <ul>\n              <li><a href=\"#\" (click)=\"state='client-paging'\">Client-side</a></li>\n              <li><a href=\"#\" (click)=\"state='server-paging'\">Server-side</a></li>\n            </ul>\n          </li>\n          <li>\n            <h4>Sorting</h4>\n            <ul>\n              <li><a href=\"#\" (click)=\"state='client-sorting'\">Client-side</a></li>\n              <li><a href=\"#\" (click)=\"state='server-sorting'\">Server-side</a></li>\n              <li><a href=\"#\" (click)=\"state='comparator-sorting'\">Comparator</a></li>\n            </ul>\n          </li>\n          <li>\n            <h4>Selection</h4>\n            <ul>\n              <li><a href=\"#\" (click)=\"state='cell-selection'\">Cell</a></li>\n              <li><a href=\"#\" (click)=\"state='single-selection'\">Single Row</a></li>\n              <li><a href=\"#\" (click)=\"state='multi-selection'\">Click Mulit Row</a></li>\n              <li><a href=\"#\" (click)=\"state='multishift-selection'\">Shift Multi Row</a></li>\n              <li><a href=\"#\" (click)=\"state='multidisable-selection'\">Disable Callback</a></li>\n            </ul>\n          </li>\n          <li>\n            <h4>Templates</h4>\n            <ul>\n              <li><a href=\"#\" (click)=\"state='inline'\">Inline</a></li>\n              <li><a href=\"#\" (click)=\"state='templateref'\">TemplateRef</a></li>\n            </ul>\n          </li>\n          <li>\n            <h4>Column</h4>\n            <ul>\n              <li><a href=\"#\" (click)=\"state='flex'\">Flex</a></li>\n              <li><a href=\"#\" (click)=\"state='toggle'\">Toggling</a></li>\n              <li><a href=\"#\" (click)=\"state='fixed'\">Fixed</a></li>\n              <li><a href=\"#\" (click)=\"state='force'\">Force</a></li>\n              <li><a href=\"#\" (click)=\"state='pinning'\">Pinning</a></li>\n            </ul>\n          </li>\n          <li>\n            <h4>\n              <a href=\"https://swimlane.gitbooks.io/angular2-data-table/\" target=\"_black\">Documentation</a>\n            </h4>\n          </li>\n        </ul>\n      </nav>\n      <content>\n        <!-- Basic -->\n        <basic-auto-demo *ngIf=\"!state\"></basic-auto-demo>\n        <basic-fixed-demo *ngIf=\"state === 'basic-fixed'\"></basic-fixed-demo>\n        <full-screen-demo *ngIf=\"state === 'full-screen'\"></full-screen-demo>\n        <inline-edit-demo *ngIf=\"state === 'inline-edit'\"></inline-edit-demo>\n        <virtual-scroll-demo *ngIf=\"state === 'virtual-scroll'\"></virtual-scroll-demo>\n        <horz-vert-scrolling-demo *ngIf=\"state === 'horz-vert-scrolling'\"></horz-vert-scrolling-demo>\n        <multiple-tables-demo *ngIf=\"state === 'multiple-tables'\"></multiple-tables-demo>\n        <row-details-demo *ngIf=\"state === 'row-details'\"></row-details-demo>\n        <filter-demo *ngIf=\"state === 'filter'\"></filter-demo>\n        <tabs-demo *ngIf=\"state === 'hidden'\"></tabs-demo>\n        <live-data-demo *ngIf=\"state === 'live'\"></live-data-demo>\n\n        <!-- Paging -->\n        <client-paging-demo *ngIf=\"state === 'client-paging'\"></client-paging-demo>\n        <server-paging-demo *ngIf=\"state === 'server-paging'\"></server-paging-demo>\n\n        <!-- Sorting -->\n        <client-sorting-demo *ngIf=\"state === 'client-sorting'\"></client-sorting-demo>\n        <server-sorting-demo *ngIf=\"state === 'server-sorting'\"></server-sorting-demo>\n        <comparator-sorting-demo *ngIf=\"state === 'comparator-sorting'\"></comparator-sorting-demo>\n        \n        <!-- Selection -->\n        <cell-selection-demo *ngIf=\"state === 'cell-selection'\"></cell-selection-demo>\n        <single-selection-demo *ngIf=\"state === 'single-selection'\"></single-selection-demo>\n        <multi-selection-demo *ngIf=\"state === 'multi-selection'\"></multi-selection-demo>\n        <multishift-selection-demo *ngIf=\"state === 'multishift-selection'\"></multishift-selection-demo>\n        <multidisable-selection-demo *ngIf=\"state === 'multidisable-selection'\"></multidisable-selection-demo>\n\n        <!-- Templates -->\n        <template-ref-demo *ngIf=\"state === 'templateref'\"></template-ref-demo>\n        <inline-templates-demo *ngIf=\"state === 'inline'\"></inline-templates-demo>\n\n        <!-- Columns -->\n        <column-flex-demo *ngIf=\"state === 'flex'\"></column-flex-demo>\n        <column-toggle-demo *ngIf=\"state === 'toggle'\"></column-toggle-demo>\n        <column-standard-demo *ngIf=\"state === 'fixed'\"></column-standard-demo>\n        <column-force-demo *ngIf=\"state === 'force'\"></column-force-demo>\n        <column-pinning-demo *ngIf=\"state === 'pinning'\"></column-pinning-demo>\n      </content>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ },

/***/ "./demo/basic/basic-auto.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var BasicAutoComponent = (function () {
    function BasicAutoComponent() {
        var _this = this;
        this.rows = [];
        this.columns = [
            { prop: 'name' },
            { name: 'Gender' },
            { name: 'Company' }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    BasicAutoComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    BasicAutoComponent = __decorate([
        core_1.Component({
            selector: 'basic-auto-demo',
            template: "\n    <div>\n      <h3>Fluid Row Heights</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columns]=\"columns\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\">\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BasicAutoComponent);
    return BasicAutoComponent;
}());
exports.BasicAutoComponent = BasicAutoComponent;


/***/ },

/***/ "./demo/basic/basic-fixed.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var BasicFixedComponent = (function () {
    function BasicFixedComponent() {
        var _this = this;
        this.rows = [];
        this.columns = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    BasicFixedComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    BasicFixedComponent = __decorate([
        core_1.Component({
            selector: 'basic-fixed-demo',
            template: "\n    <div>\n      <h3>Fix Row Height</h3>\n      <datatable\n        class=\"material striped\"\n        [rows]=\"rows\"\n        [columns]=\"columns\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"50\">\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BasicFixedComponent);
    return BasicFixedComponent;
}());
exports.BasicFixedComponent = BasicFixedComponent;


/***/ },

/***/ "./demo/basic/filter.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var FilterBarComponent = (function () {
    function FilterBarComponent() {
        var _this = this;
        this.rows = [];
        this.temp = [];
        this.columns = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.fetch(function (data) {
            // cache our list
            _this.temp = data.slice();
            // push our inital complete list
            _this.rows = data;
        });
    }
    FilterBarComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    FilterBarComponent.prototype.updateFilter = function (event) {
        var val = event.target.value;
        // filter our data
        var temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
    };
    FilterBarComponent = __decorate([
        core_1.Component({
            selector: 'filter-demo',
            template: "\n    <div>\n      <h3>Client-side Search and Filtering</h3>\n      <input\n        type='text'\n        style='padding:8px;margin:15px auto;width:30%;'\n        placeholder='Type to filter the name column...'\n        (keyup)='updateFilter($event)'\n      />\n      <datatable\n        class='material'\n        [columns]=\"columns\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\"\n        [limit]=\"10\"\n        [rows]='rows'>\n        </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], FilterBarComponent);
    return FilterBarComponent;
}());
exports.FilterBarComponent = FilterBarComponent;


/***/ },

/***/ "./demo/basic/fullscreen.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var FullScreenComponent = (function () {
    function FullScreenComponent() {
        var _this = this;
        this.rows = [];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    FullScreenComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/100k.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    FullScreenComponent = __decorate([
        core_1.Component({
            selector: 'full-screen-demo',
            template: "\n    <div>\n      <h3>Full Screen</h3>\n      <datatable\n        class=\"material fullscreen\"\n        style=\"top: 52px\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"0\"\n        [rowHeight]=\"50\"\n        [scrollbarV]=\"true\"\n        [scrollbarH]=\"true\"\n        [rows]=\"rows\">\n        <datatable-column name=\"Id\" [width]=\"80\"></datatable-column>\n        <datatable-column name=\"Name\" [width]=\"300\"></datatable-column>\n        <datatable-column name=\"Gender\"></datatable-column>\n        <datatable-column name=\"Age\"></datatable-column>\n        <datatable-column name=\"City\" [width]=\"300\" prop=\"address.city\"></datatable-column>\n        <datatable-column name=\"State\" [width]=\"300\" prop=\"address.state\"></datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], FullScreenComponent);
    return FullScreenComponent;
}());
exports.FullScreenComponent = FullScreenComponent;


/***/ },

/***/ "./demo/basic/inline.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var InlineEditComponent = (function () {
    function InlineEditComponent() {
        var _this = this;
        this.editing = {};
        this.rows = [];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    InlineEditComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    InlineEditComponent.prototype.updateValue = function (event, cell, cellValue, row) {
        this.editing[row.$$index + '-' + cell] = false;
        this.rows[row.$$index][cell] = event.target.value;
    };
    InlineEditComponent = __decorate([
        core_1.Component({
            selector: 'inline-edit-demo',
            template: "\n    <div>\n      <h3>Inline Editing</h3>\n      <datatable\n        #mydatatable\n        class=\"material\"\n        [headerHeight]=\"50\"\n        [limit]=\"5\"\n        [columnMode]=\"'force'\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\"\n        [rows]=\"rows\">\n        <datatable-column name=\"Name\">\n          <template let-value=\"value\" let-row=\"row\">\n            <span\n              title=\"Double click to edit\"\n              (dblclick)=\"editing[row.$$index + '-name'] = true\"\n              *ngIf=\"!editing[row.$$index + '-name']\">\n              {{value}}\n            </span>\n            <input\n              autofocus\n              (blur)=\"updateValue($event, 'name', value, row)\"\n              *ngIf=\"editing[row.$$index + '-name']\"\n              type=\"text\"\n              [value]=\"value\"\n            />\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Gender\">\n          <template let-row=\"row\" let-value=\"value\">\n             <span\n              title=\"Double click to edit\"\n              (dblclick)=\"editing[row.$$index + '-gender'] = true\"\n              *ngIf=\"!editing[row.$$index + '-gender']\">\n              {{value}}\n            </span>\n            <select\n              *ngIf=\"editing[row.$$index + '-gender']\"\n              (change)=\"updateValue($event, 'gender', value, row)\"\n              [value]=\"value\">\n              <option value=\"male\">Male</option>\n              <option value=\"female\">Female</option>\n            </select>\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Age\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], InlineEditComponent);
    return InlineEditComponent;
}());
exports.InlineEditComponent = InlineEditComponent;


/***/ },

/***/ "./demo/basic/live.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var LiveDataComponent = (function () {
    function LiveDataComponent() {
        var _this = this;
        this.rows = [];
        this.active = true;
        this.cols = [
            'Type', 'Organization', 'DateAdded', 'Tags'
        ];
        this.fetch(function (data) {
            _this.rows = data.map(function (d) {
                d.updated = Date.now().toString();
                return d;
            });
        });
        this.start();
    }
    LiveDataComponent.prototype.randomNum = function (start, end) {
        return Math.floor(Math.random() * end) + start;
    };
    LiveDataComponent.prototype.start = function () {
        if (!this.active)
            return;
        setTimeout(this.updateRandom.bind(this), 50);
    };
    LiveDataComponent.prototype.stop = function () {
        this.active = false;
    };
    LiveDataComponent.prototype.updateRandom = function () {
        var rowNum = this.randomNum(0, 5);
        var cellNum = this.randomNum(0, 4);
        var newRow = this.randomNum(0, 100);
        var prop = this.cols[cellNum];
        if (this.rows.length) {
            // let rows = [...this.rows];
            var row = this.rows[rowNum];
            row[prop] = Date.now().toString(); // this.rows[newRow][prop];
            row.updated = Date.now().toString();
        }
        this.start();
    };
    LiveDataComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/security.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    LiveDataComponent = __decorate([
        core_1.Component({
            selector: 'live-data-demo',
            template: "\n    <div>\n      <h3>\n        Live Data Demo ( not working ATM )\n        <small>\n          <a href=\"#\" (click)=\"start()\">Start</a>\n          <a href=\"#\" (click)=\"stop()\">Stop</a>\n        </small>\n      </h3>\n      <datatable\n        #mydatatable\n        class=\"material\"\n        [headerHeight]=\"50\"\n        [limit]=\"5\"\n        [columnMode]=\"'force'\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\"\n        [trackByProp]=\"'updated'\"\n        [rows]=\"rows\">\n        <datatable-column name=\"Type\" prop=\"Type\"></datatable-column>\n        <datatable-column name=\"Organization\" prop=\"Organization\"></datatable-column>\n        <datatable-column name=\"Date Added\" prop=\"DateAdded\"></datatable-column>\n        <datatable-column name=\"Tags\" prop=\"Tags\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n      </datatable>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], LiveDataComponent);
    return LiveDataComponent;
}());
exports.LiveDataComponent = LiveDataComponent;


/***/ },

/***/ "./demo/basic/multiple.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var MultipleTablesComponent = (function () {
    function MultipleTablesComponent() {
        this.columns1 = [
            { prop: 'name' },
            { name: 'Gender' },
            { name: 'Company' }
        ];
        this.columns2 = [
            { prop: 'name', Name: '^^NAME^^' },
            { name: 'Gender' }
        ];
        this.rows1 = [
            { name: 'Larry', gender: 'Male', company: 'Cisco' },
            { name: 'Lauren', gender: 'Female', company: 'HP' }
        ];
        this.rows2 = [
            { name: 'Callie', gender: 'Female' },
            { name: 'Maggie', gender: 'Female' }
        ];
    }
    MultipleTablesComponent = __decorate([
        core_1.Component({
            selector: 'multiple-tables-demo',
            template: "\n    <div>\n      <h3>Multiple Tables</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows1\"\n        [columns]=\"columns1\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"0\"\n        [rowHeight]=\"100\">\n      </datatable>\n      <br />\n      <datatable\n        class=\"material\"\n        [rows]=\"rows2\"\n        [columns]=\"columns2\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\">\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MultipleTablesComponent);
    return MultipleTablesComponent;
}());
exports.MultipleTablesComponent = MultipleTablesComponent;


/***/ },

/***/ "./demo/basic/row-detail.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var RowDetailsComponent = (function () {
    function RowDetailsComponent() {
        var _this = this;
        this.rows = [];
        this.expanded = {};
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    RowDetailsComponent.prototype.onPage = function (event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            console.log('paged!', event);
        }, 100);
    };
    RowDetailsComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/100k.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    RowDetailsComponent.prototype.toggleExpandRow = function (row) {
        console.log('Toggled Expand Row!', row);
        this.table.toggleExpandRow(row);
    };
    __decorate([
        core_1.ViewChild('mydatatable'), 
        __metadata('design:type', Object)
    ], RowDetailsComponent.prototype, "table", void 0);
    RowDetailsComponent = __decorate([
        core_1.Component({
            selector: 'row-details-demo',
            template: "\n    <div>\n      <h3>\n        Row Detail Demo\n        <small>\n          <a href=\"#\" (click)=\"mydatatable.expandAllRows()\">Expand All</a> | \n          <a href=\"#\" (click)=\"mydatatable.collapseAllRows()\">Collapse All</a>\n        </small>\n      </h3>\n      <datatable\n        #mydatatable\n        class='material expandable'\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"50\"\n        [detailRowHeight]=\"100\"\n        [scrollbarV]=\"50\"\n        [rows]='rows'\n        (page)=\"onPage($event)\">\n        <datatable-row-detail-template>\n          <template let-row=\"row\">\n            <div style=\"padding-left:35px;\">\n              <div><strong>Address</strong></div>\n              <div>{{row.address.city}}, {{row.address.state}}</div>\n            </div>\n          </template>\n        </datatable-row-detail-template>\n         <datatable-column\n          [width]=\"50\"\n          [resizeable]=\"false\"\n          [sortable]=\"false\"\n          [draggable]=\"false\"\n          [canAutoResize]=\"false\">\n          <template let-row=\"row\">\n            <a\n              href=\"#\"\n              [class.icon-right]=\"!row.$$expanded\"\n              [class.icon-down]=\"row.$$expanded\"\n              title=\"Expand/Collapse Row\"\n              (click)=\"toggleExpandRow(row)\">\n            </a>\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Index\" width=\"80\">\n          <template let-row=\"row\">\n            <strong>{{row.$$index}}</strong>\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Exapanded\" width=\"80\">\n          <template let-row=\"row\">\n            <strong>{{row.$$expanded === 1}}</strong>\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Name\" width=\"200\">\n          <template let-value=\"value\">\n            <strong>{{value}}</strong>\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Gender\" width=\"300\">\n          <template let-row=\"row\" let-value=\"value\">\n            <i [innerHTML]=\"row['name']\"></i> and <i>{{value}}</i>\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Age\" ></datatable-column>\n      </datatable>\n    </div>\n  ",
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], RowDetailsComponent);
    return RowDetailsComponent;
}());
exports.RowDetailsComponent = RowDetailsComponent;


/***/ },

/***/ "./demo/basic/scrolling.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var HorzVertScrolling = (function () {
    function HorzVertScrolling() {
        var _this = this;
        this.rows = [];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    HorzVertScrolling.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/100k.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    HorzVertScrolling = __decorate([
        core_1.Component({
            selector: 'horz-vert-scrolling-demo',
            template: "\n    <div>\n      <h3>Horizontal and Vertical Scrolling</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"0\"\n        [rowHeight]=\"50\"\n        [scrollbarV]=\"true\"\n        [scrollbarH]=\"true\">\n        <datatable-column name=\"Name\" [width]=\"300\"></datatable-column>\n        <datatable-column name=\"Gender\"></datatable-column>\n        <datatable-column name=\"Age\"></datatable-column>\n        <datatable-column name=\"City\" [width]=\"300\" prop=\"address.city\"></datatable-column>\n        <datatable-column name=\"State\" [width]=\"300\" prop=\"address.state\"></datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], HorzVertScrolling);
    return HorzVertScrolling;
}());
exports.HorzVertScrolling = HorzVertScrolling;


/***/ },

/***/ "./demo/basic/tabs.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var TabsDemoComponent = (function () {
    function TabsDemoComponent() {
        var _this = this;
        this.rows = [];
        this.tab1 = true;
        this.tab2 = false;
        this.tab3 = false;
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    TabsDemoComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/100k.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    TabsDemoComponent = __decorate([
        core_1.Component({
            selector: 'tabs-demo',
            template: "\n    <div>\n      <h3>Hidden By Default</h3>\n\n      <div style=\"width:75%;margin:0 auto\">\n        <div>\n          <button type=\"button\" (click)=\"tab1=true;tab2=false;tab3=false;\">Nothing</button>\n          <button type=\"button\" (click)=\"tab2=true;tab1=false;tab3=false;\">Hidden</button>\n          <button type=\"button\" (click)=\"tab3=true;tab1=false;tab2=false;\">NgIf</button>\n        </div>\n\n        <div [hidden]=\"!tab1\">\n          <p>Click a button to toggle table visibilities</p>\n        </div>\n\n        <div [hidden]=\"!tab2\">\n          <h4>hidden Table</h4>\n          <datatable\n            class='material'\n            [rows]='rows'\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"50\"\n            [scrollbarV]=\"true\">\n            <datatable-column name=\"Name\" width=\"200\"></datatable-column>\n            <datatable-column name=\"Gender\" width=\"300\"></datatable-column>\n            <datatable-column name=\"Age\" width=\"80\"></datatable-column>\n          </datatable>\n        </div>\n\n        <div *ngIf=\"tab3\">\n          <h4>ngIf Table</h4>\n          <datatable\n            class='material'\n            [rows]='rows'\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"50\"\n            [scrollbarV]=\"true\">\n            <datatable-column name=\"Name\" width=\"200\"></datatable-column>\n            <datatable-column name=\"Gender\" width=\"300\"></datatable-column>\n            <datatable-column name=\"Age\" width=\"80\"></datatable-column>\n          </datatable>\n        </div>\n      </div>\n\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TabsDemoComponent);
    return TabsDemoComponent;
}());
exports.TabsDemoComponent = TabsDemoComponent;


/***/ },

/***/ "./demo/basic/virtual.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var VirtualScrollComponent = (function () {
    function VirtualScrollComponent() {
        var _this = this;
        this.rows = [];
        this.expanded = {};
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    VirtualScrollComponent.prototype.onPage = function (event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            console.log('paged!', event);
        }, 100);
    };
    VirtualScrollComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/100k.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    VirtualScrollComponent = __decorate([
        core_1.Component({
            selector: 'virtual-scroll-demo',
            template: "\n    <div>\n      <h3>Virtual Scrolling with 100k Rows</h3>\n      <datatable\n        class='material'\n        [rows]='rows'\n        [columnMode]=\"'standard'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"50\"\n        [scrollbarV]=\"true\"\n        (page)=\"onPage($event)\">\n        <datatable-column name=\"Name\" width=\"200\">\n          <template let-value=\"value\">\n            <strong>{{value}}</strong>\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Gender\" width=\"300\">\n          <template let-row=\"row\" let-value=\"value\">\n            <i [innerHTML]=\"row['name']\"></i> and <i>{{value}}</i>\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Age\" width=\"80\">\n        </datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], VirtualScrollComponent);
    return VirtualScrollComponent;
}());
exports.VirtualScrollComponent = VirtualScrollComponent;


/***/ },

/***/ "./demo/bootstrap.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var platform_browser_dynamic_1 = __webpack_require__(3);
var hmr_1 = __webpack_require__("./node_modules/@angularclass/hmr/dist/index.js");
var module_1 = __webpack_require__("./demo/module.ts");
function main() {
    return platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(module_1.AppModule)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
if (undefined)
    hmr_1.bootloader(main);
if (!undefined)
    main();


/***/ },

/***/ "./demo/columns/column-flex.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var ColumnFlexComponent = (function () {
    function ColumnFlexComponent() {
        var _this = this;
        this.rows = [];
        this.fetch(function (data) {
            _this.rows = data.splice(0, 5);
        });
    }
    ColumnFlexComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    ColumnFlexComponent = __decorate([
        core_1.Component({
            selector: 'column-flex-demo',
            template: "\n    <div>\n      <h3>Flex Column Width Distribution</h3>\n      <datatable\n        class=\"material\"\n        [columnMode]=\"'flex'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\"\n        [rows]=\"rows\">\n        <datatable-column name=\"Name\" [flexGrow]=\"3\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Gender\" [flexGrow]=\"1\">\n          <template let-row=\"row\" let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Age\" [flexGrow]=\"1\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ColumnFlexComponent);
    return ColumnFlexComponent;
}());
exports.ColumnFlexComponent = ColumnFlexComponent;


/***/ },

/***/ "./demo/columns/column-force.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var ColumnForceComponent = (function () {
    function ColumnForceComponent() {
        var _this = this;
        this.rows = [];
        this.fetch(function (data) {
            _this.rows = data.splice(0, 5);
        });
    }
    ColumnForceComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    ColumnForceComponent = __decorate([
        core_1.Component({
            selector: 'column-force-demo',
            template: "\n    <div>\n      <h3>Force Fill Column Width Distribution</h3>\n      <datatable\n        class=\"material\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\"\n        [rows]=\"rows\">\n        <datatable-column name=\"Name\" [width]=\"100\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Gender\" [width]=\"100\">\n          <template let-row=\"row\" let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Age\" [width]=\"300\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ColumnForceComponent);
    return ColumnForceComponent;
}());
exports.ColumnForceComponent = ColumnForceComponent;


/***/ },

/***/ "./demo/columns/column-standard.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var ColumnStandardComponent = (function () {
    function ColumnStandardComponent() {
        var _this = this;
        this.rows = [];
        this.fetch(function (data) {
            _this.rows = data.splice(0, 5);
        });
    }
    ColumnStandardComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    ColumnStandardComponent = __decorate([
        core_1.Component({
            selector: 'column-standard-demo',
            template: "\n    <div>\n      <h3>Fixed Column Widths</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columnMode]=\"'standard'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\">\n        <datatable-column name=\"Name\" [width]=\"300\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Gender\" [width]=\"300\">\n          <template let-row=\"row\" let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Age\" [width]=\"300\">\n          <template let-value=\"value\">\n            {{value}}\n          </template>\n        </datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ColumnStandardComponent);
    return ColumnStandardComponent;
}());
exports.ColumnStandardComponent = ColumnStandardComponent;


/***/ },

/***/ "./demo/columns/column-toggle.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var ColumnToggleComponent = (function () {
    function ColumnToggleComponent() {
        this.rows = [
            {
                name: 'Claudine Neal',
                gender: 'female',
                company: 'Sealoud'
            },
            {
                name: 'Beryl Rice',
                gender: 'female',
                company: 'Velity'
            }
        ];
        this.columns = [
            { name: 'Name' },
            { name: 'Gender' },
            { name: 'Company' }
        ];
        this.allColumns = [
            { name: 'Name' },
            { name: 'Gender' },
            { name: 'Company' }
        ];
    }
    ColumnToggleComponent.prototype.toggle = function (col) {
        var isChecked = this.isChecked(col);
        if (isChecked) {
            this.columns = this.columns.filter(function (c) {
                return c.name !== col.name;
            });
        }
        else {
            this.columns = this.columns.concat([col]);
        }
    };
    ColumnToggleComponent.prototype.isChecked = function (col) {
        return this.columns.find(function (c) {
            return c.name === col.name;
        });
    };
    ColumnToggleComponent = __decorate([
        core_1.Component({
            selector: 'column-toggle-demo',
            template: "\n    <div>\n      <h3>Column Toggling</h3>\n      <div style='float:left;width:75%'>\n        <datatable\n          class='material'\n          [rows]='rows'\n          [columns]=\"columns\"\n          [columnMode]=\"'force'\"\n          [headerHeight]=\"50\"\n          [footerHeight]=\"50\"\n          [rowHeight]=\"'auto'\">\n          </datatable>\n      </div>\n      <div class='selected-column'>\n        <h4>Available Columns</h4>\n        <ul>\n          <li *ngFor='let col of allColumns'>\n            <input\n              type='checkbox'\n              [id]=\"col.name\"\n              (click)='toggle(col)'\n              [checked]='isChecked(col)'\n            />\n            <label [attr.for]=\"col.name\">{{col.name}}</label>\n          </li>\n        </ul>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ColumnToggleComponent);
    return ColumnToggleComponent;
}());
exports.ColumnToggleComponent = ColumnToggleComponent;


/***/ },

/***/ "./demo/columns/pinning.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var ColumnPinningComponent = (function () {
    function ColumnPinningComponent() {
        var _this = this;
        this.rows = [];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    ColumnPinningComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/100k.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    ColumnPinningComponent = __decorate([
        core_1.Component({
            selector: 'column-pinning-demo',
            template: "\n    <div>\n      <h3>Column Pinning</h3>\n      <datatable\n        class=\"material\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"50\"\n        [scrollbarV]=\"true\"\n        [scrollbarH]=\"true\"\n        [rows]=\"rows\">\n        <datatable-column\n          name=\"Name\"\n          [width]=\"300\"\n          [frozenLeft]=\"true\">\n        </datatable-column>\n        <datatable-column\n          name=\"Gender\">\n        </datatable-column>\n        <datatable-column\n          name=\"Age\">\n        </datatable-column>\n        <datatable-column\n          name=\"City\"\n          [width]=\"150\"\n          prop=\"address.city\">\n        </datatable-column>\n        <datatable-column\n          name=\"State\"\n          [width]=\"300\"\n          prop=\"address.state\"\n          [frozenRight]=\"true\">\n        </datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ColumnPinningComponent);
    return ColumnPinningComponent;
}());
exports.ColumnPinningComponent = ColumnPinningComponent;


/***/ },

/***/ "./demo/module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var platform_browser_1 = __webpack_require__(4);
var hmr_1 = __webpack_require__("./node_modules/@angularclass/hmr/dist/index.js");
var src_1 = __webpack_require__("./src/index.ts");
var app_component_1 = __webpack_require__("./demo/app.component.ts");
__webpack_require__("./src/components/datatable.scss");
__webpack_require__("./src/themes/material.scss");
// -- Basic
var basic_fixed_1 = __webpack_require__("./demo/basic/basic-fixed.ts");
var basic_auto_1 = __webpack_require__("./demo/basic/basic-auto.ts");
var virtual_1 = __webpack_require__("./demo/basic/virtual.ts");
var inline_1 = __webpack_require__("./demo/basic/inline.ts");
var scrolling_1 = __webpack_require__("./demo/basic/scrolling.ts");
var multiple_1 = __webpack_require__("./demo/basic/multiple.ts");
var fullscreen_1 = __webpack_require__("./demo/basic/fullscreen.ts");
var row_detail_1 = __webpack_require__("./demo/basic/row-detail.ts");
var filter_1 = __webpack_require__("./demo/basic/filter.ts");
var tabs_1 = __webpack_require__("./demo/basic/tabs.ts");
var live_1 = __webpack_require__("./demo/basic/live.ts");
// -- Paging
var paging_client_1 = __webpack_require__("./demo/paging/paging-client.ts");
var paging_server_1 = __webpack_require__("./demo/paging/paging-server.ts");
// -- Sorting
var sorting_comparator_1 = __webpack_require__("./demo/sorting/sorting-comparator.ts");
var sorting_server_1 = __webpack_require__("./demo/sorting/sorting-server.ts");
var sorting_client_1 = __webpack_require__("./demo/sorting/sorting-client.ts");
// -- Templates
var template_dom_1 = __webpack_require__("./demo/templates/template-dom.ts");
var template_obj_1 = __webpack_require__("./demo/templates/template-obj.ts");
// -- Selection
var selection_cell_1 = __webpack_require__("./demo/selection/selection-cell.ts");
var selection_multi_1 = __webpack_require__("./demo/selection/selection-multi.ts");
var selection_single_1 = __webpack_require__("./demo/selection/selection-single.ts");
var selection_shift_1 = __webpack_require__("./demo/selection/selection-shift.ts");
var selection_disabled_1 = __webpack_require__("./demo/selection/selection-disabled.ts");
// -- Columns
var column_toggle_1 = __webpack_require__("./demo/columns/column-toggle.ts");
var column_standard_1 = __webpack_require__("./demo/columns/column-standard.ts");
var column_force_1 = __webpack_require__("./demo/columns/column-force.ts");
var column_flex_1 = __webpack_require__("./demo/columns/column-flex.ts");
var pinning_1 = __webpack_require__("./demo/columns/pinning.ts");
var AppModule = (function () {
    function AppModule(appRef) {
        this.appRef = appRef;
    }
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        hmr_1.removeNgStyles();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                basic_auto_1.BasicAutoComponent,
                basic_fixed_1.BasicFixedComponent,
                fullscreen_1.FullScreenComponent,
                inline_1.InlineEditComponent,
                virtual_1.VirtualScrollComponent,
                scrolling_1.HorzVertScrolling,
                multiple_1.MultipleTablesComponent,
                row_detail_1.RowDetailsComponent,
                paging_client_1.ClientPagingComponent,
                paging_server_1.ServerPagingComponent,
                sorting_client_1.ClientSortingComponent,
                sorting_server_1.ServerSortingComponent,
                sorting_comparator_1.SortingComparatorComponent,
                selection_cell_1.CellSelectionComponent,
                selection_multi_1.MultiSelectionComponent,
                template_dom_1.InlineTemplatesComponent,
                template_obj_1.TemplateRefTemplatesComponent,
                column_flex_1.ColumnFlexComponent,
                column_toggle_1.ColumnToggleComponent,
                column_standard_1.ColumnStandardComponent,
                column_force_1.ColumnForceComponent,
                pinning_1.ColumnPinningComponent,
                filter_1.FilterBarComponent,
                tabs_1.TabsDemoComponent,
                selection_single_1.SingleSelectionComponent,
                live_1.LiveDataComponent,
                selection_shift_1.MultiShiftSelectionComponent,
                selection_disabled_1.MultiDisableSelectionComponent
            ],
            imports: [platform_browser_1.BrowserModule, src_1.Angular2DataTableModule],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ApplicationRef])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;


/***/ },

/***/ "./demo/paging/paging-client.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var ClientPagingComponent = (function () {
    function ClientPagingComponent() {
        var _this = this;
        this.rows = [];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    ClientPagingComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    ClientPagingComponent = __decorate([
        core_1.Component({
            selector: 'client-paging-demo',
            template: "\n    <div>\n      <h3>Client-side Paging</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columns]=\"[{name:'Name'},{name:'Gender'},{name:'Company'}]\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\"\n        [limit]=\"10\">\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ClientPagingComponent);
    return ClientPagingComponent;
}());
exports.ClientPagingComponent = ClientPagingComponent;


/***/ },

/***/ "./demo/paging/paging-server.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var ServerPagingComponent = (function () {
    function ServerPagingComponent() {
        this.rows = [];
        this.count = 0;
        this.offset = 0;
        this.limit = 10;
    }
    ServerPagingComponent.prototype.ngOnInit = function () {
        this.page(this.offset, this.limit);
    };
    ServerPagingComponent.prototype.page = function (offset, limit) {
        var _this = this;
        this.fetch(function (results) {
            _this.count = results.length;
            var start = offset * limit;
            var end = start + limit;
            var rows = _this.rows.slice();
            for (var i = start; i < end; i++) {
                rows[i] = results[i];
            }
            _this.rows = rows;
            console.log('Page Results', start, end, rows);
        });
    };
    ServerPagingComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    ServerPagingComponent.prototype.onPage = function (event) {
        console.log('Page Event', event);
        this.page(event.offset, event.limit);
    };
    ServerPagingComponent = __decorate([
        core_1.Component({
            selector: 'server-paging-demo',
            template: "\n    <div>\n      <h3>Server-side Paging</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columns]=\"[{name:'Name'},{name:'Gender'},{name:'Company'}]\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\"\n        [externalPaging]=\"true\"\n        [count]=\"count\"\n        [offset]=\"offset\"\n        [limit]=\"limit\"\n        (page)='onPage($event)'>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ServerPagingComponent);
    return ServerPagingComponent;
}());
exports.ServerPagingComponent = ServerPagingComponent;


/***/ },

/***/ "./demo/selection/selection-cell.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var CellSelectionComponent = (function () {
    function CellSelectionComponent() {
        var _this = this;
        this.rows = [];
        this.selected = [];
        this.columns = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    CellSelectionComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    CellSelectionComponent.prototype.onSelect = function (event) {
        console.log('Event: select', event, this.selected);
    };
    CellSelectionComponent.prototype.onActivate = function (event) {
        console.log('Event: activate', event);
    };
    CellSelectionComponent = __decorate([
        core_1.Component({
            selector: 'cell-selection-demo',
            template: "\n    <div>\n      <h3>Cell Selection</h3>\n      <datatable\n        class=\"material selection-cell\"\n        [rows]=\"rows\"\n        [columnMode]=\"'force'\"\n        [columns]=\"columns\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"50\"\n        [selected]=\"selected\"\n        [selectionType]=\"'cell'\"\n        (select)=\"onSelect($event)\"\n        (activate)=\"onActivate($event)\">\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CellSelectionComponent);
    return CellSelectionComponent;
}());
exports.CellSelectionComponent = CellSelectionComponent;


/***/ },

/***/ "./demo/selection/selection-disabled.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var MultiDisableSelectionComponent = (function () {
    function MultiDisableSelectionComponent() {
        var _this = this;
        this.rows = [];
        this.selected = [];
        this.columns = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    MultiDisableSelectionComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    MultiDisableSelectionComponent.prototype.onSelect = function (_a) {
        var selected = _a.selected;
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        (_b = this.selected).push.apply(_b, selected);
        var _b;
    };
    MultiDisableSelectionComponent.prototype.onActivate = function (event) {
        console.log('Activate Event', event);
    };
    MultiDisableSelectionComponent.prototype.checkSelectable = function (event) {
        console.log('Checking if selectable', event);
        return event.name !== 'Ethel Price';
    };
    MultiDisableSelectionComponent = __decorate([
        core_1.Component({
            selector: 'multidisable-selection-demo',
            template: "\n    <div>\n      <h3>Selection Callback to Disable Selections</h3>\n      <div style='float:left;width:75%'>\n        <datatable\n          class=\"material\"\n          [rows]=\"rows\"\n          [columnMode]=\"'force'\"\n          [columns]=\"columns\"\n          [headerHeight]=\"50\"\n          [footerHeight]=\"50\"\n          [rowHeight]=\"'auto'\"\n          [limit]=\"5\"\n          [selectCheck]=\"checkSelectable\"\n          [selected]=\"selected\"\n          [selectionType]=\"'multi'\"\n          (activate)=\"onActivate($event)\"\n          (select)='onSelect($event)'>\n        </datatable>\n      </div>\n\n      <div class='selected-column'>\n        <h4>Selections</h4>\n        <ul>\n          <li *ngFor='let sel of selected'>\n            {{sel.name}}\n          </li>\n          <li *ngIf=\"!selected.length\">No Selections</li>\n        </ul>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MultiDisableSelectionComponent);
    return MultiDisableSelectionComponent;
}());
exports.MultiDisableSelectionComponent = MultiDisableSelectionComponent;


/***/ },

/***/ "./demo/selection/selection-multi.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var MultiSelectionComponent = (function () {
    function MultiSelectionComponent() {
        var _this = this;
        this.rows = [];
        this.selected = [];
        this.columns = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    MultiSelectionComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    MultiSelectionComponent.prototype.onSelect = function (_a) {
        var selected = _a.selected;
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        (_b = this.selected).push.apply(_b, selected);
        var _b;
    };
    MultiSelectionComponent.prototype.onActivate = function (event) {
        console.log('Activate Event', event);
    };
    MultiSelectionComponent = __decorate([
        core_1.Component({
            selector: 'multi-selection-demo',
            template: "\n    <div>\n      <h3>Multi Select via Click</h3>\n      <div style='float:left;width:75%'>\n        <datatable\n          class=\"material\"\n          [rows]=\"rows\"\n          [columnMode]=\"'force'\"\n          [columns]=\"columns\"\n          [headerHeight]=\"50\"\n          [footerHeight]=\"50\"\n          [rowHeight]=\"'auto'\"\n          [limit]=\"5\"\n          [selected]=\"selected\"\n          [selectionType]=\"'multi'\"\n          (activate)=\"onActivate($event)\"\n          (select)='onSelect($event)'>\n        </datatable>\n      </div>\n\n      <div class='selected-column'>\n        <h4>Selections</h4>\n        <ul>\n          <li *ngFor='let sel of selected'>\n            {{sel.name}}\n          </li>\n          <li *ngIf=\"!selected.length\">No Selections</li>\n        </ul>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MultiSelectionComponent);
    return MultiSelectionComponent;
}());
exports.MultiSelectionComponent = MultiSelectionComponent;


/***/ },

/***/ "./demo/selection/selection-shift.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var MultiShiftSelectionComponent = (function () {
    function MultiShiftSelectionComponent() {
        var _this = this;
        this.rows = [];
        this.selected = [];
        this.columns = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    MultiShiftSelectionComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    MultiShiftSelectionComponent.prototype.onSelect = function (_a) {
        var selected = _a.selected;
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        (_b = this.selected).push.apply(_b, selected);
        var _b;
    };
    MultiShiftSelectionComponent.prototype.onActivate = function (event) {
        console.log('Activate Event', event);
    };
    MultiShiftSelectionComponent = __decorate([
        core_1.Component({
            selector: 'multishift-selection-demo',
            template: "\n    <div>\n      <h3>Multi Select via Shift</h3>\n      <div style='float:left;width:75%'>\n        <datatable\n          class=\"material\"\n          [rows]=\"rows\"\n          [columnMode]=\"'force'\"\n          [columns]=\"columns\"\n          [headerHeight]=\"50\"\n          [footerHeight]=\"50\"\n          [rowHeight]=\"'auto'\"\n          [limit]=\"5\"\n          [selected]=\"selected\"\n          [selectionType]=\"'multiShift'\"\n          (activate)=\"onActivate($event)\"\n          (select)='onSelect($event)'>\n        </datatable>\n      </div>\n\n      <div class='selected-column'>\n        <h4>Selections</h4>\n        <ul>\n          <li *ngFor='let sel of selected'>\n            {{sel.name}}\n          </li>\n          <li *ngIf=\"!selected.length\">No Selections</li>\n        </ul>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], MultiShiftSelectionComponent);
    return MultiShiftSelectionComponent;
}());
exports.MultiShiftSelectionComponent = MultiShiftSelectionComponent;


/***/ },

/***/ "./demo/selection/selection-single.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var SingleSelectionComponent = (function () {
    function SingleSelectionComponent() {
        var _this = this;
        this.rows = [];
        this.selected = [];
        this.columns = [
            { prop: 'name' },
            { name: 'Company' },
            { name: 'Gender' }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    SingleSelectionComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    SingleSelectionComponent.prototype.onSelect = function (_a) {
        var selected = _a.selected;
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        (_b = this.selected).push.apply(_b, selected);
        var _b;
    };
    SingleSelectionComponent.prototype.onActivate = function (event) {
        console.log('Activate Event', event);
    };
    SingleSelectionComponent = __decorate([
        core_1.Component({
            selector: 'single-selection-demo',
            template: "\n    <div>\n      <h3>Single Row Selection</h3>\n      <div style='float:left;width:75%'>\n        <datatable\n          class=\"material\"\n          [rows]=\"rows\"\n          [columnMode]=\"'force'\"\n          [columns]=\"columns\"\n          [headerHeight]=\"50\"\n          [footerHeight]=\"50\"\n          [rowHeight]=\"'auto'\"\n          [limit]=\"5\"\n          [selected]=\"selected\"\n          [selectionType]=\"'single'\"\n          (activate)=\"onActivate($event)\"\n          (select)='onSelect($event)'>\n        </datatable>\n      </div>\n\n      <div class='selected-column'>\n        <h4>Selections</h4>\n        <ul>\n          <li *ngFor='let sel of selected'>\n            {{sel.name}}\n          </li>\n          <li *ngIf=\"!selected.length\">No Selections</li>\n        </ul>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SingleSelectionComponent);
    return SingleSelectionComponent;
}());
exports.SingleSelectionComponent = SingleSelectionComponent;


/***/ },

/***/ "./demo/sorting/sorting-client.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var ClientSortingComponent = (function () {
    function ClientSortingComponent() {
        var _this = this;
        this.rows = [];
        this.columns = [
            { name: 'Company' },
            { name: 'Name' },
            { name: 'Gender' }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    ClientSortingComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            var data = JSON.parse(req.response);
            cb(data);
        };
        req.send();
    };
    ClientSortingComponent = __decorate([
        core_1.Component({
            selector: 'client-sorting-demo',
            template: "\n    <div>\n      <h3>Client-side Sorting</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columns]=\"columns\"\n        [sortType]=\"'multi'\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"50\"\n        [scrollbarV]=\"true\">\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ClientSortingComponent);
    return ClientSortingComponent;
}());
exports.ClientSortingComponent = ClientSortingComponent;


/***/ },

/***/ "./demo/sorting/sorting-comparator.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var SortingComparatorComponent = (function () {
    function SortingComparatorComponent() {
        var _this = this;
        this.rows = [];
        this.columns = [
            { name: 'Company', comparator: this.companyComparator.bind(this) },
            { name: 'Name', sortable: false },
            { name: 'Gender', sortable: false }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    SortingComparatorComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            var data = JSON.parse(req.response);
            cb(data.splice(0, 20));
        };
        req.send();
    };
    SortingComparatorComponent.prototype.companyComparator = function (propA, propB) {
        console.log('Sorting Comparator', propA, propB);
        // Just a simple sort function comparisoins
        if (propA.toLowerCase() < propB.toLowerCase())
            return -1;
        if (propA.toLowerCase() > propB.toLowerCase())
            return 1;
    };
    SortingComparatorComponent = __decorate([
        core_1.Component({
            selector: 'comparator-sorting-demo',
            template: "\n    <div>\n      <h3>Custom Sorting Comparator</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columns]=\"columns\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\">\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SortingComparatorComponent);
    return SortingComparatorComponent;
}());
exports.SortingComparatorComponent = SortingComparatorComponent;


/***/ },

/***/ "./demo/sorting/sorting-server.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var ServerSortingComponent = (function () {
    function ServerSortingComponent() {
        var _this = this;
        this.loading = false;
        this.rows = [];
        this.columns = [
            // we pass false to bypass the default
            // comparator function and use the event to sort
            { name: 'Company', sortable: true },
            { name: 'Name', sortable: true },
            { name: 'Gender', sortable: true }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    ServerSortingComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            var data = JSON.parse(req.response);
            cb(data.splice(0, 20));
        };
        req.send();
    };
    ServerSortingComponent.prototype.onSort = function (event) {
        var _this = this;
        // event was triggered, start sort sequence
        console.log('Sort Event', event);
        this.loading = true;
        // emulate a server request with a timeout
        setTimeout(function () {
            var rows = _this.rows.slice();
            // this is only for demo purposes, normally
            // your server would return the result for
            // you and you would just set the rows prop
            var sort = event.sorts[0];
            rows.sort(function (a, b) {
                return a[sort.prop].localeCompare(b[sort.prop]) * (sort.dir === 'desc' ? -1 : 1);
            });
            _this.rows = rows;
            _this.loading = false;
        }, 1000);
    };
    ServerSortingComponent = __decorate([
        core_1.Component({
            selector: 'server-sorting-demo',
            template: "\n    <div>\n      <h3>Server-side Sorting</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columns]=\"columns\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\"\n        [externalSorting]=\"true\"\n        [loadingIndicator]=\"loading\"\n        (sort)=\"onSort($event)\">\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ServerSortingComponent);
    return ServerSortingComponent;
}());
exports.ServerSortingComponent = ServerSortingComponent;


/***/ },

/***/ "./demo/templates/template-dom.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var InlineTemplatesComponent = (function () {
    function InlineTemplatesComponent() {
        var _this = this;
        this.rows = [];
        this.joke = 'knock knock';
        this.fetch(function (data) {
            _this.rows = data.splice(0, 5);
        });
    }
    InlineTemplatesComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    InlineTemplatesComponent = __decorate([
        core_1.Component({
            selector: 'inline-templates-demo',
            template: "\n    <div>\n      <h3>Expressive Templates</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\">\n        <datatable-column name=\"Name\">\n          <template let-column=\"column\">\n            Holla! {{column.name}}\n          </template>\n          <template let-value=\"value\">\n            Hi: <strong>{{value}}</strong>\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Gender\">\n          <template let-row=\"row\" let-value=\"value\">\n            My name is: <i [innerHTML]=\"row['name']\"></i> and <i>{{value}}</i>\n            <div>{{joke}}</div>\n          </template>\n        </datatable-column>\n        <datatable-column name=\"Age\">\n          <template let-value=\"value\">\n            <div style=\"border:solid 1px #ddd;margin:5px;padding:3px\">\n              <div style=\"background:#999;height:10px\" [style.width]=\"value + '%'\"></div>\n            </div>\n          </template>\n        </datatable-column>\n      </datatable>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], InlineTemplatesComponent);
    return InlineTemplatesComponent;
}());
exports.InlineTemplatesComponent = InlineTemplatesComponent;


/***/ },

/***/ "./demo/templates/template-obj.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var TemplateRefTemplatesComponent = (function () {
    function TemplateRefTemplatesComponent() {
        var _this = this;
        this.rows = [];
        this.columns = [];
        this.fetch(function (data) {
            _this.rows = data.splice(0, 5);
        });
    }
    TemplateRefTemplatesComponent.prototype.ngOnInit = function () {
        this.columns = [{
                cellTemplate: this.editTmpl,
                headerTemplate: this.hdrTpl,
                name: 'Gender'
            }];
    };
    TemplateRefTemplatesComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    __decorate([
        core_1.ViewChild('editTmpl'), 
        __metadata('design:type', core_1.TemplateRef)
    ], TemplateRefTemplatesComponent.prototype, "editTmpl", void 0);
    __decorate([
        core_1.ViewChild('hdrTpl'), 
        __metadata('design:type', core_1.TemplateRef)
    ], TemplateRefTemplatesComponent.prototype, "hdrTpl", void 0);
    TemplateRefTemplatesComponent = __decorate([
        core_1.Component({
            selector: 'template-ref-demo',
            template: "\n    <div>\n      <h3>TemplateRef via Column Property</h3>\n      <datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columns]=\"columns\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\">\n      </datatable>\n\n      <template #hdrTpl let-column=\"column\" >\n        <strong>Fancy</strong>: {{column.name}} !!\n      </template>\n\n      <template #editTmpl let-row=\"row\" let-value=\"value\" let-i=\"index\">\n        <img\n          *ngIf=\"value === 'male'\"\n          width=\"150\"\n          src=\"https://media.giphy.com/media/I8nepxWwlEuqI/giphy.gif\"\n        />\n        <img\n          *ngIf=\"value === 'female'\"\n          width=\"150\"\n          src=\"https://media.giphy.com/media/sxSVG3XHf7yww/giphy.gif\"\n        />\n      </template>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TemplateRefTemplatesComponent);
    return TemplateRefTemplatesComponent;
}());
exports.TemplateRefTemplatesComponent = TemplateRefTemplatesComponent;


/***/ },

/***/ "./node_modules/@angularclass/hmr/dist/helpers.js":
/***/ function(module, exports) {

"use strict";
"use strict";
// Hot Module Replacement
function bootloader(main) {
    if (document.readyState === 'complete') {
        main();
    }
    else {
        document.addEventListener('DOMContentLoaded', main);
    }
}
exports.bootloader = bootloader;
// create new elements
function createNewHosts(cmps) {
    var components = cmps.map(function (componentNode) {
        var newNode = document.createElement(componentNode.tagName);
        // display none
        var currentDisplay = newNode.style.display;
        newNode.style.display = 'none';
        var parentNode = componentNode.parentNode;
        parentNode.insertBefore(newNode, componentNode);
        return { currentDisplay: currentDisplay, newNode: newNode };
    });
    return function () {
        components.forEach(function (cmp) {
            cmp.newNode.style.display = cmp.currentDisplay;
            cmp.newNode = null;
            cmp.currentDisplay = null;
        });
    };
}
exports.createNewHosts = createNewHosts;
// remove old styles
function removeNgStyles() {
    Array.prototype.slice.call(document.head.querySelectorAll('style'), 0)
        .filter(function (style) { return style.innerText.indexOf('_ng') !== -1; })
        .map(function (el) { return el.remove(); });
}
exports.removeNgStyles = removeNgStyles;
// get input values
function getInputValues() {
    var inputs = document.querySelectorAll('input');
    return Array.prototype.slice.call(inputs).map(function (input) { return input.value; });
}
exports.getInputValues = getInputValues;
// set input values
function setInputValues($inputs) {
    var inputs = document.querySelectorAll('input');
    if ($inputs && inputs.length === $inputs.length) {
        $inputs.forEach(function (value, i) {
            var el = inputs[i];
            el.value = value;
            el.dispatchEvent(new CustomEvent('input', { detail: el.value }));
        });
    }
}
exports.setInputValues = setInputValues;
// get/set input values
function createInputTransfer() {
    var $inputs = getInputValues();
    return function restoreInputValues() {
        setInputValues($inputs);
    };
}
exports.createInputTransfer = createInputTransfer;
//# sourceMappingURL=helpers.js.map

/***/ },

/***/ "./node_modules/@angularclass/hmr/dist/index.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
// Hot Module Replacement
__export(__webpack_require__("./node_modules/@angularclass/hmr/dist/helpers.js"));
//# sourceMappingURL=index.js.map

/***/ },

/***/ "./src/components/body/body-cell.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
    function DataTableBodyCellComponent(element, renderer) {
        this.activate = new core_1.EventEmitter();
        this.isFocused = false;
        this.element = element.nativeElement;
        renderer.setElementClass(this.element, 'datatable-body-cell', true);
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
            if (!this.row || !this.column)
                return '';
            var prop = utils_1.deepValueGetter(this.row, this.column.prop);
            var userPipe = this.column.pipe;
            return userPipe ? userPipe.transform(prop) : prop;
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyCellComponent.prototype.onFocus = function (event) {
        this.isFocused = true;
    };
    DataTableBodyCellComponent.prototype.onBlur = function (event) {
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
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], DataTableBodyCellComponent.prototype, "sorts", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DataTableBodyCellComponent.prototype, "activate", void 0);
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
        core_1.HostListener('focus', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyCellComponent.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyCellComponent.prototype, "onBlur", null);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyCellComponent.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('dblclick', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyCellComponent.prototype, "onDblClick", null);
    __decorate([
        core_1.HostListener('keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyCellComponent.prototype, "onKeyDown", null);
    DataTableBodyCellComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body-cell',
            template: "\n    <div class=\"datatable-body-cell-label\">\n      <span\n        *ngIf=\"!column.cellTemplate\"\n        [innerHTML]=\"value\">\n      </span>\n      <template\n        *ngIf=\"column.cellTemplate\"\n        [ngTemplateOutlet]=\"column.cellTemplate\"\n        [ngOutletContext]=\"{ value: value, row: row, column: column }\">\n      </template>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableBodyCellComponent);
    return DataTableBodyCellComponent;
}());
exports.DataTableBodyCellComponent = DataTableBodyCellComponent;


/***/ },

/***/ "./src/components/body/body-row-wrapper.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
    function DataTableRowWrapperComponent(element, renderer) {
        this.expanded = false;
        renderer.setElementClass(element.nativeElement, 'datatable-row-wrapper', true);
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableRowWrapperComponent.prototype, "rowDetailTemplate", void 0);
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
    DataTableRowWrapperComponent = __decorate([
        core_1.Component({
            selector: 'datatable-row-wrapper',
            template: "\n    <ng-content></ng-content>\n    <div \n      *ngIf=\"expanded\"\n      [style.height.px]=\"detailRowHeight\" \n      class=\"datatable-row-detail\">\n      <template\n        *ngIf=\"rowDetailTemplate\"\n        [ngTemplateOutlet]=\"rowDetailTemplate\"\n        [ngOutletContext]=\"{ row: row }\">\n      </template>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableRowWrapperComponent);
    return DataTableRowWrapperComponent;
}());
exports.DataTableRowWrapperComponent = DataTableRowWrapperComponent;


/***/ },

/***/ "./src/components/body/body-row.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
    function DataTableBodyRowComponent(element, renderer) {
        this.activate = new core_1.EventEmitter();
        this.element = element.nativeElement;
        renderer.setElementClass(this.element, 'datatable-body-row', true);
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
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DataTableBodyRowComponent.prototype, "onKeyDown", null);
    DataTableBodyRowComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body-row',
            template: "\n    <div\n      *ngFor=\"let colGroup of columnsByPin; let i = index; trackBy: $colGroup?.type\"\n      class=\"datatable-row-{{colGroup.type}} datatable-row-group\"\n      [ngStyle]=\"stylesByGroup(colGroup.type)\">\n      <datatable-body-cell\n        *ngFor=\"let column of colGroup.columns; let ii = index; trackBy: column?.$$id\"\n        tabindex=\"-1\"\n        [row]=\"row\"\n        [column]=\"column\"\n        [rowHeight]=\"rowHeight\"\n        (activate)=\"onActivate($event, ii)\">\n      </datatable-body-cell>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableBodyRowComponent);
    return DataTableBodyRowComponent;
}());
exports.DataTableBodyRowComponent = DataTableBodyRowComponent;


/***/ },

/***/ "./src/components/body/body.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
    function DataTableBodyComponent(element, renderer) {
        this.selected = [];
        this.scroll = new core_1.EventEmitter();
        this.page = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.detailToggle = new core_1.EventEmitter();
        this.rowHeightsCache = new utils_1.RowHeightCache();
        this.temp = [];
        this.offsetY = 0;
        this.indexes = {};
        renderer.setElementClass(element.nativeElement, 'datatable-body', true);
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
         */
        get: function () {
            if (this.scrollbarV) {
                return this.rowHeightsCache.query(this.rowCount - 1);
            }
        },
        enumerable: true,
        configurable: true
    });
    DataTableBodyComponent.prototype.updateOffsetY = function (offset) {
        if (this.scrollbarV && offset) {
            // First get the row Index that we need to move to.
            var rowIndex = this.pageSize * offset;
            offset = this.rowHeightsCache.query(rowIndex - 1);
        }
        this.scroller.setOffset(offset || 0);
    };
    DataTableBodyComponent.prototype.onBodyScroll = function (_a) {
        var scrollYPos = _a.scrollYPos, scrollXPos = _a.scrollXPos, direction = _a.direction;
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
        this.updatePage(direction);
        this.updateRows();
    };
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
     * @param row  the row for which the height need to be calculated.
     * @returns {number}  height of the row.
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
     * @param row The row that needs to be placed in the 2D space.
     * @returns {{styles: string}}  Returns the CSS3 style to be applied
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
    DataTableBodyComponent.prototype.hideIndicator = function () {
        var _this = this;
        setTimeout(function () { return _this.loadingIndicator = false; }, 500);
    };
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
     *  Refreshes the full Row Height cache.  Should be used
     *  when the entire row array state has changed.
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
     * @param row The row for which the expansion needs to be toggled.
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
     * @param expanded When true, all rows are expanded and when false, all rows will be collapsed.
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
        __metadata('design:type', Object)
    ], DataTableBodyComponent.prototype, "detailRowHeight", void 0);
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
    ], DataTableBodyComponent.prototype, "rowDetailTemplate", void 0);
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
        core_1.ViewChild(scroller_component_1.ScrollerComponent), 
        __metadata('design:type', scroller_component_1.ScrollerComponent)
    ], DataTableBodyComponent.prototype, "scroller", void 0);
    DataTableBodyComponent = __decorate([
        core_1.Component({
            selector: 'datatable-body',
            template: "\n    <datatable-selection \n      #selector\n      [selected]=\"selected\"\n      [rows]=\"rows\"\n      [selectCheck]=\"selectCheck\"\n      [selectEnabled]=\"selectEnabled\"\n      [selectionType]=\"selectionType\"\n      [rowIdentity]=\"rowIdentity\"\n      (select)=\"select.emit($event)\"\n      (activate)=\"activate.emit($event)\">\n      <datatable-progress\n        *ngIf=\"loadingIndicator\">\n      </datatable-progress>\n      <datatable-scroller\n        *ngIf=\"rows.length\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [scrollHeight]=\"scrollHeight\"\n        [scrollWidth]=\"columnGroupWidths.total\"\n        (scroll)=\"onBodyScroll($event)\">\n        <datatable-row-wrapper \n          *ngFor=\"let row of temp; let i = index; trackBy: rowTrackingFn\"\n          [ngStyle]=\"getRowsStyles(row)\"\n          [rowDetailTemplate]=\"rowDetailTemplate\"\n          [detailRowHeight]=\"detailRowHeight\"\n          [row]=\"row\"\n          [expanded]=\"row.$$expanded === 1\">\n          <datatable-body-row\n            tabindex=\"-1\"\n            [isSelected]=\"selector.getRowSelected(row)\"\n            [innerWidth]=\"innerWidth\"\n            [offsetX]=\"offsetX\"\n            [columns]=\"columns\"\n            [rowHeight]=\"rowHeight\"\n            [row]=\"row\"\n            (activate)=\"selector.onActivate($event, i)\">\n          </datatable-body-row>\n        </datatable-row-wrapper>\n      </datatable-scroller>\n      <div\n        class=\"empty-row\"\n        *ngIf=\"!rows.length\"\n        [innerHTML]=\"emptyMessage\">\n      </div>\n    </datatable-selection>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableBodyComponent);
    return DataTableBodyComponent;
}());
exports.DataTableBodyComponent = DataTableBodyComponent;


/***/ },

/***/ "./src/components/body/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/components/body/progress-bar.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/components/body/scroller.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
    function ScrollerComponent(element) {
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.scroll = new core_1.EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
        this.element.classList.add('datatable-scroll');
    }
    ScrollerComponent.prototype.ngOnInit = function () {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement = this.element.parentElement.parentElement;
            this.parentElement.addEventListener('scroll', this.onScrolled.bind(this));
        }
    };
    ScrollerComponent.prototype.ngOnDestroy = function () {
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement.removeEventListener('scroll');
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
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ScrollerComponent);
    return ScrollerComponent;
}());
exports.ScrollerComponent = ScrollerComponent;


/***/ },

/***/ "./src/components/body/selection.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
        var multiShift = this.selectionType === types_1.SelectionType.multiShift;
        var multiClick = this.selectionType === types_1.SelectionType.multi;
        var selected = [];
        if (multiShift || multiClick) {
            if (multiShift && event.shiftKey) {
                var newSelected = this.selected.slice();
                selected = utils_1.selectRowsBetween(newSelected, this.rows, index, this.prevIndex, this.getRowSelectedIdx.bind(this));
            }
            else if (multiShift && !event.shiftKey) {
                selected.push(row);
            }
            else {
                var newSelected = this.selected.slice();
                selected = utils_1.selectRows(newSelected, row, this.getRowSelectedIdx.bind(this));
            }
        }
        else {
            selected.push(row);
        }
        if (this.selectCheck) {
            selected = selected.filter(this.selectCheck.bind(this));
        }
        this.selected = selected;
        this.prevIndex = index;
        this.select.emit({
            selected: selected
        });
    };
    DataTableSelectionComponent.prototype.onActivate = function (model, index) {
        var type = model.type, event = model.event, row = model.row;
        if (type === 'click' || type === 'dblclick') {
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
            template: "\n    <ng-content></ng-content>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableSelectionComponent);
    return DataTableSelectionComponent;
}());
exports.DataTableSelectionComponent = DataTableSelectionComponent;


/***/ },

/***/ "./src/components/column.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var DataTableColumnDirective = (function () {
    function DataTableColumnDirective() {
    }
    Object.defineProperty(DataTableColumnDirective.prototype, "hasHeaderTemplate", {
        get: function () {
            // this is a tad nasty but can't think of a better way
            // to differate if the prop is header vs cell
            return this.templates.length === 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableColumnDirective.prototype, "headerTemplate", {
        get: function () {
            if (!this.hasHeaderTemplate)
                return undefined;
            return this.templates.first;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableColumnDirective.prototype, "cellTemplate", {
        get: function () {
            if (this.hasHeaderTemplate)
                return this.templates.last;
            return this.templates.first;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
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
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "flexGrow", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "resizeable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "comparator", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "pipe", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "sortable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "draggable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "canAutoResize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableColumnDirective.prototype, "maxWidth", void 0);
    __decorate([
        core_1.ContentChildren(core_1.TemplateRef), 
        __metadata('design:type', core_1.QueryList)
    ], DataTableColumnDirective.prototype, "templates", void 0);
    DataTableColumnDirective = __decorate([
        core_1.Directive({
            selector: 'datatable-column',
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableColumnDirective);
    return DataTableColumnDirective;
}());
exports.DataTableColumnDirective = DataTableColumnDirective;


/***/ },

/***/ "./src/components/datatable.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var column_directive_1 = __webpack_require__("./src/components/column.directive.ts");
var row_detail_directive_1 = __webpack_require__("./src/components/row-detail.directive.ts");
var utils_2 = __webpack_require__("./src/utils/index.ts");
var DatatableComponent = (function () {
    function DatatableComponent(renderer, element) {
        // Enable vertical scrollbars
        this.scrollbarV = false;
        // Enable horz scrollbars
        this.scrollbarH = false;
        // The row height; which is necessary
        // to calculate the height for the lazy rendering.
        this.rowHeight = 30;
        // The detail row height is required especially when virtual scroll is enabled.
        this.detailRowHeight = 0;
        // Type of column width distribution.
        // Example: flex, force, standard
        this.columnMode = types_1.ColumnMode.standard;
        // The minimum header height in pixels.
        // pass falsey for no header
        // note: number|string does not work right
        this.headerHeight = 30;
        // The minimum footer height in pixels.
        // pass falsey for no footer
        this.footerHeight = 0;
        // if external paging is turned on
        this.externalPaging = false;
        // if external sorting is turned on
        this.externalSorting = false;
        // Page size
        this.limit = undefined;
        // Total count
        this.count = 0;
        // Page offset
        this.offset = 0;
        // Loading indicator
        this.loadingIndicator = false;
        // if you can reorder columns
        this.reorderable = true;
        // type of sorting
        this.sortType = types_1.SortType.single;
        // sorts
        this.sorts = [];
        // css class overrides
        this.cssClasses = {
            sortAscending: 'icon-down',
            sortDescending: 'icon-up',
            pagerLeftArrow: 'icon-left',
            pagerRightArrow: 'icon-right',
            pagerPrevious: 'icon-prev',
            pagerNext: 'icon-skip'
        };
        // message overrides for localization
        this.messages = {
            // Message to show when array is presented
            // but contains no values
            emptyMessage: 'No data to display',
            // Footer total message
            totalMessage: 'total'
        };
        // This will be used when displaying or selecting rows:
        // when tracking/comparing them, we'll use the value of this fn,
        // (`fn(x) === fn(y)` instead of `x === y`)
        this.rowIdentity = (function (x) { return x; });
        this.scroll = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.sort = new core_1.EventEmitter();
        this.page = new core_1.EventEmitter();
        this.detailToggle = new core_1.EventEmitter();
        this.reorder = new core_1.EventEmitter();
        this.resize = new core_1.EventEmitter();
        this.offsetX = 0;
        this.element = element.nativeElement;
        renderer.setElementClass(this.element, 'datatable', true);
    }
    Object.defineProperty(DatatableComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        // Rows
        set: function (val) {
            if (!this.externalSorting) {
                val = utils_1.sortRows(val, this.columns, this.sorts);
            }
            this._rows = val;
            this.recalculate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columns", {
        get: function () {
            return this._columns;
        },
        // Columns
        set: function (val) {
            if (val) {
                utils_2.setColumnDefaults(val);
                this.recalculateColumns(val);
            }
            this._columns = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedHeader", {
        get: function () {
            var headerHeight = this.headerHeight;
            return (typeof headerHeight === 'string') ?
                headerHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isFixedRow", {
        get: function () {
            var rowHeight = this.rowHeight;
            return (typeof rowHeight === 'string') ?
                rowHeight !== 'auto' : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isVertScroll", {
        get: function () {
            return this.scrollbarV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isHorScroll", {
        get: function () {
            return this.scrollbarH;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "isSelectable", {
        get: function () {
            return this.selectionType !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "columnTemplates", {
        get: function () {
            return this._columnTemplates;
        },
        set: function (val) {
            this._columnTemplates = val;
            if (val) {
                // only set this if results were brought back
                var arr = val.toArray();
                if (arr.length) {
                    // translate them to normal objects
                    this.columns = utils_2.translateTemplates(arr);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatatableComponent.prototype, "rowDetailTemplateChild", {
        get: function () {
            return this._rowDetailTemplateChild;
        },
        set: function (val) {
            this._rowDetailTemplateChild = val;
            if (val)
                this.rowDetailTemplate = val.rowDetailTemplate;
        },
        enumerable: true,
        configurable: true
    });
    DatatableComponent.prototype.ngOnInit = function () {
        // need to call this immediatly to size
        // if the table is hidden the visibility
        // listener will invoke this itself upon show
        this.recalculate();
    };
    DatatableComponent.prototype.ngAfterViewInit = function () {
        this.recalculate();
    };
    /**
     * Toggle the expansion of the row
     *
     * @param rowIndex
     */
    DatatableComponent.prototype.toggleExpandRow = function (row) {
        // Should we write a guard here??
        this.bodyComponent.toggleRowExpansion(row);
    };
    /**
     * API method to expand all the rows.
     */
    DatatableComponent.prototype.expandAllRows = function () {
        this.bodyComponent.toggleAllRows(true);
    };
    /**
     * API method to collapse all the rows.
     */
    DatatableComponent.prototype.collapseAllRows = function () {
        this.bodyComponent.toggleAllRows(false);
    };
    DatatableComponent.prototype.recalculate = function () {
        this.recalculateDims();
        this.recalculateColumns();
    };
    DatatableComponent.prototype.recalculateColumns = function (columns, forceIdx) {
        if (columns === void 0) { columns = this.columns; }
        if (!columns)
            return;
        var width = this.innerWidth;
        if (this.scrollbarV) {
            width = width - utils_2.scrollbarWidth;
        }
        if (this.columnMode === types_1.ColumnMode.force) {
            utils_1.forceFillColumnWidths(columns, width, forceIdx);
        }
        else if (this.columnMode === types_1.ColumnMode.flex) {
            utils_1.adjustColumnWidths(columns, width);
        }
        return columns;
    };
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
        this.pageSize = this.calcPageSize();
        this.rowCount = this.calcRowCount();
    };
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
    DatatableComponent.prototype.onBodyScroll = function (event) {
        this.offsetX = event.offsetX;
        this.scroll.emit(event);
    };
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
    DatatableComponent.prototype.calcPageSize = function (val) {
        if (val === void 0) { val = this.rows; }
        // Keep the page size constant even if the row has been expanded.
        // This is because an expanded row is still considered to be a child of
        // the original row.  Hence calculation would use rowHeight only.
        if (this.scrollbarV)
            return Math.ceil(this.bodyHeight / this.rowHeight);
        // if limit is passed, we are paging
        if (this.limit !== undefined)
            return this.limit;
        // otherwise use row length
        if (val)
            return val.length;
        // other empty :(
        return 0;
    };
    DatatableComponent.prototype.calcRowCount = function (val) {
        if (val === void 0) { val = this.rows; }
        if (!this.externalPaging) {
            if (!val)
                return 0;
            return val.length;
        }
        return this.count;
    };
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
        this.columns = cols;
        this.resize.emit({
            column: column,
            newValue: newValue
        });
    };
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
    DatatableComponent.prototype.onColumnSort = function (event) {
        var sorts = event.sorts;
        // this could be optimized better since it will resort
        // the rows again on the 'push' detection...
        if (this.externalSorting === false) {
            this.rows = utils_1.sortRows(this.rows, this.columns, sorts);
        }
        this.sorts = sorts;
        this.bodyComponent.updateOffsetY(0);
        this.sort.emit(event);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
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
    ], DatatableComponent.prototype, "detailRowHeight", void 0);
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
        __metadata('design:type', Number)
    ], DatatableComponent.prototype, "count", void 0);
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
        __metadata('design:type', core_1.TemplateRef)
    ], DatatableComponent.prototype, "rowDetailTemplate", void 0);
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
        __metadata('design:type', Object)
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
    ], DatatableComponent.prototype, "detailToggle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "reorder", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DatatableComponent.prototype, "resize", void 0);
    __decorate([
        core_1.HostBinding('class.fixed-header'), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "isFixedHeader", null);
    __decorate([
        core_1.HostBinding('class.fixed-row'), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "isFixedRow", null);
    __decorate([
        core_1.HostBinding('class.scroll-vertical'), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "isVertScroll", null);
    __decorate([
        core_1.HostBinding('class.scroll-horz'), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "isHorScroll", null);
    __decorate([
        core_1.HostBinding('class.selectable'), 
        __metadata('design:type', Object)
    ], DatatableComponent.prototype, "isSelectable", null);
    __decorate([
        core_1.ContentChildren(column_directive_1.DataTableColumnDirective), 
        __metadata('design:type', core_1.QueryList), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], DatatableComponent.prototype, "columnTemplates", null);
    __decorate([
        core_1.ContentChild(row_detail_directive_1.DatatableRowDetailDirective), 
        __metadata('design:type', row_detail_directive_1.DatatableRowDetailDirective), 
        __metadata('design:paramtypes', [row_detail_directive_1.DatatableRowDetailDirective])
    ], DatatableComponent.prototype, "rowDetailTemplateChild", null);
    __decorate([
        core_1.ViewChild(body_1.DataTableBodyComponent), 
        __metadata('design:type', body_1.DataTableBodyComponent)
    ], DatatableComponent.prototype, "bodyComponent", void 0);
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], DatatableComponent.prototype, "recalculate", null);
    DatatableComponent = __decorate([
        core_1.Component({
            selector: 'datatable',
            template: "\n    <div\n      visibility-observer\n      (visible)=\"recalculate()\">\n      <datatable-header\n        *ngIf=\"headerHeight\"\n        [sorts]=\"sorts\"\n        [sortType]=\"sortType\"\n        [scrollbarH]=\"scrollbarH\"\n        [innerWidth]=\"innerWidth\"\n        [offsetX]=\"offsetX\"\n        [columns]=\"columns\"\n        [headerHeight]=\"headerHeight\"\n        [sortAscendingIcon]=\"cssClasses.sortAscending\"\n        [sortDescendingIcon]=\"cssClasses.sortDescending\"\n        (sort)=\"onColumnSort($event)\"\n        (resize)=\"onColumnResize($event)\"\n        (reorder)=\"onColumnReorder($event)\">\n      </datatable-header>\n      <datatable-body\n        [rows]=\"rows\"\n        [scrollbarV]=\"scrollbarV\"\n        [scrollbarH]=\"scrollbarH\"\n        [loadingIndicator]=\"loadingIndicator\"\n        [rowHeight]=\"rowHeight\"\n        [rowCount]=\"rowCount\"\n        [offset]=\"offset\"\n        [trackByProp]=\"trackByProp\"\n        [columns]=\"columns\"\n        [pageSize]=\"pageSize\"\n        [offsetX]=\"offsetX\"\n        [rowDetailTemplate]=\"rowDetailTemplate\"\n        [detailRowHeight]=\"detailRowHeight\"\n        [selected]=\"selected\"\n        [innerWidth]=\"innerWidth\"\n        [bodyHeight]=\"bodyHeight\"\n        [selectionType]=\"selectionType\"\n        [emptyMessage]=\"messages.emptyMessage\"\n        [rowIdentity]=\"rowIdentity\"\n        [selectCheck]=\"selectCheck\"\n        (page)=\"onBodyPage($event)\"\n        (activate)=\"activate.emit($event)\"\n        (select)=\"select.emit($event)\"\n        (detailToggle)=\"detailToggle.emit($event)\"\n        (scroll)=\"onBodyScroll($event)\">\n      </datatable-body>\n      <datatable-footer\n        *ngIf=\"footerHeight\"\n        [rowCount]=\"rowCount\"\n        [pageSize]=\"pageSize\"\n        [offset]=\"offset\"\n        [footerHeight]=\"footerHeight\"\n        [totalMessage]=\"messages.totalMessage\"\n        [pagerLeftArrowIcon]=\"cssClasses.pagerLeftArrow\"\n        [pagerRightArrowIcon]=\"cssClasses.pagerRightArrow\"\n        [pagerPreviousIcon]=\"cssClasses.pagerPrevious\"\n        [pagerNextIcon]=\"cssClasses.pagerNext\"\n        (page)=\"onFooterPage($event)\">\n      </datatable-footer>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], DatatableComponent);
    return DatatableComponent;
}());
exports.DatatableComponent = DatatableComponent;


/***/ },

/***/ "./src/components/datatable.scss":
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ "./src/components/footer/footer.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
    function DataTableFooterComponent(element, renderer) {
        this.page = new core_1.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-footer', true);
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
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableFooterComponent);
    return DataTableFooterComponent;
}());
exports.DataTableFooterComponent = DataTableFooterComponent;


/***/ },

/***/ "./src/components/footer/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/components/footer/footer.component.ts"));
__export(__webpack_require__("./src/components/footer/pager.component.ts"));


/***/ },

/***/ "./src/components/footer/pager.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
    function DataTablePagerComponent(element, renderer) {
        this.change = new core_1.EventEmitter();
        this._count = 0;
        this._page = 1;
        this._size = 0;
        renderer.setElementClass(element.nativeElement, 'datatable-pager', true);
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
            template: "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\">\n          <i class=\"{{pagerPreviousIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\">\n          <i class=\"{{pagerLeftArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\">\n          <i class=\"{{pagerRightArrowIcon}}\"></i>\n        </a>\n      </li>\n      <li [class.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\">\n          <i class=\"{{pagerNextIcon}}\"></i>\n        </a>\n      </li>\n    </ul>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTablePagerComponent);
    return DataTablePagerComponent;
}());
exports.DataTablePagerComponent = DataTablePagerComponent;


/***/ },

/***/ "./src/components/header/header-cell.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
    }
    Object.defineProperty(DataTableHeaderCellComponent.prototype, "sorts", {
        get: function () {
            return this._sorts;
        },
        set: function (val) {
            this._sorts = val;
            this.sortDir = this.calcSortDir(val);
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
    DataTableHeaderCellComponent.prototype.sortClasses = function (dir) {
        var result = {};
        if (dir === types_1.SortDirection.asc) {
            result[("sort-asc " + this.sortAscendingIcon)] = true;
        }
        else if (dir === types_1.SortDirection.desc) {
            result[("sort-desc " + this.sortDescendingIcon)] = true;
        }
        return result;
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
        var newValue = utils_1.nextSortDir(this.sortType, this.sortDir);
        this.sort.emit({
            column: this.column,
            prevValue: this.sortDir,
            newValue: newValue
        });
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
            template: "\n    <div>\n      <span\n        class=\"datatable-header-cell-label draggable\"\n        *ngIf=\"!column.headerTemplate\"\n        (click)=\"onSort()\"\n        [innerHTML]=\"name\">\n      </span>\n      <template\n        *ngIf=\"column.headerTemplate\"\n        [ngTemplateOutlet]=\"column.headerTemplate\"\n        [ngOutletContext]=\"{ \n          column: column, \n          sortDir: sortDir\n        }\">\n      </template>\n      <span\n        class=\"sort-btn\"\n        [ngClass]=\"sortClasses(sortDir)\">\n      </span>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableHeaderCellComponent);
    return DataTableHeaderCellComponent;
}());
exports.DataTableHeaderCellComponent = DataTableHeaderCellComponent;


/***/ },

/***/ "./src/components/header/header.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
    function DataTableHeaderComponent(element, renderer) {
        this.sort = new core_1.EventEmitter();
        this.reorder = new core_1.EventEmitter();
        this.resize = new core_1.EventEmitter();
        renderer.setElementClass(element.nativeElement, 'datatable-header', true);
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
        core_1.HostBinding('style.width'), 
        __metadata('design:type', String)
    ], DataTableHeaderComponent.prototype, "headerWidth", null);
    DataTableHeaderComponent = __decorate([
        core_1.Component({
            selector: 'datatable-header',
            template: "\n    <div\n      orderable\n      (reorder)=\"onColumnReordered($event)\"\n      [style.width.px]=\"columnGroupWidths.total\"\n      class=\"datatable-header-inner\">\n      <div\n        *ngFor=\"let colGroup of columnsByPin; trackBy: colGroup?.type\"\n        [class]=\"'datatable-row-' + colGroup.type\"\n        [ngStyle]=\"stylesByGroup(colGroup.type)\">\n        <datatable-header-cell\n          *ngFor=\"let column of colGroup.columns; trackBy: column?.$$id\"\n          resizeable\n          [resizeEnabled]=\"column.resizeable\"\n          (resize)=\"onColumnResized($event, column)\"\n          long-press\n          (longPress)=\"drag = true\"\n          (longPressEnd)=\"drag = false\"\n          draggable\n          [dragX]=\"column.draggable && drag\"\n          [dragY]=\"false\"\n          [dragModel]=\"column\"\n          [headerHeight]=\"headerHeight\"\n          [column]=\"column\"\n          [sortType]=\"sortType\"\n          [sorts]=\"sorts\"\n          [sortAscendingIcon]=\"sortAscendingIcon\"\n          [sortDescendingIcon]=\"sortDescendingIcon\"\n          (sort)=\"onSort($event)\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DataTableHeaderComponent);
    return DataTableHeaderComponent;
}());
exports.DataTableHeaderComponent = DataTableHeaderComponent;


/***/ },

/***/ "./src/components/header/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/components/header/header.component.ts"));
__export(__webpack_require__("./src/components/header/header-cell.component.ts"));


/***/ },

/***/ "./src/components/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/components/datatable.component.ts"));
__export(__webpack_require__("./src/components/column.directive.ts"));
__export(__webpack_require__("./src/components/row-detail.directive.ts"));
__export(__webpack_require__("./src/components/header/index.ts"));
__export(__webpack_require__("./src/components/body/index.ts"));
__export(__webpack_require__("./src/components/footer/index.ts"));


/***/ },

/***/ "./src/components/row-detail.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var DatatableRowDetailDirective = (function () {
    function DatatableRowDetailDirective() {
    }
    Object.defineProperty(DatatableRowDetailDirective.prototype, "rowDetailTemplate", {
        get: function () {
            return this.template;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], DatatableRowDetailDirective.prototype, "template", void 0);
    DatatableRowDetailDirective = __decorate([
        core_1.Directive({
            selector: 'datatable-row-detail-template'
        }), 
        __metadata('design:paramtypes', [])
    ], DatatableRowDetailDirective);
    return DatatableRowDetailDirective;
}());
exports.DatatableRowDetailDirective = DatatableRowDetailDirective;


/***/ },

/***/ "./src/datatable.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var common_1 = __webpack_require__(2);
var components_1 = __webpack_require__("./src/components/index.ts");
var directives_1 = __webpack_require__("./src/directives/index.ts");
var Angular2DataTableModule = (function () {
    function Angular2DataTableModule() {
    }
    Angular2DataTableModule = __decorate([
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
                components_1.DataTableBodyCellComponent,
                components_1.DataTableSelectionComponent
            ],
            exports: [
                components_1.DatatableComponent,
                components_1.DatatableRowDetailDirective,
                components_1.DataTableColumnDirective
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Angular2DataTableModule);
    return Angular2DataTableModule;
}());
exports.Angular2DataTableModule = Angular2DataTableModule;


/***/ },

/***/ "./src/directives/draggable.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var Rx_1 = __webpack_require__(1);
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
            this.subscription = Rx_1.Observable.fromEvent(document, 'mousemove')
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
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DraggableDirective.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DraggableDirective.prototype, "onMousedown", null);
    DraggableDirective = __decorate([
        core_1.Directive({ selector: '[draggable]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DraggableDirective);
    return DraggableDirective;
}());
exports.DraggableDirective = DraggableDirective;


/***/ },

/***/ "./src/directives/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/directives/draggable.directive.ts"));
__export(__webpack_require__("./src/directives/long-press.directive.ts"));
__export(__webpack_require__("./src/directives/orderable.directive.ts"));
__export(__webpack_require__("./src/directives/resizeable.directive.ts"));
__export(__webpack_require__("./src/directives/visibility.directive.ts"));


/***/ },

/***/ "./src/directives/long-press.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
        get: function () { return this.longPressing; },
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
        if (this.pressing && !this.longPressing) {
            var xThres = (event.clientX - this.mouseX) > 10;
            var yThres = (event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    LongPressDirective.prototype.loop = function (event) {
        var _this = this;
        if (this.longPressing) {
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
        __metadata('design:type', Object)
    ], LongPressDirective.prototype, "press", null);
    __decorate([
        core_1.HostBinding('class.longpress'), 
        __metadata('design:type', Object)
    ], LongPressDirective.prototype, "isLongPress", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPressDirective.prototype, "onMouseDown", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
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


/***/ },

/***/ "./src/directives/orderable.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
            diffs.forEachChangedItem(subscribe.bind(this));
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


/***/ },

/***/ "./src/directives/resizeable.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var Rx_1 = __webpack_require__(1);
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
        var isHandle = event.target.classList.contains('resize-handle');
        var initialWidth = this.element.clientWidth;
        var mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            this.subscription = Rx_1.Observable.fromEvent(document, 'mousemove')
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
        core_1.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], ResizeableDirective.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
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


/***/ },

/***/ "./src/directives/visibility.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
        this.isVisible = false;
        this.visible = new core_1.EventEmitter();
        utils_1.checkVisibility(element.nativeElement, this.visbilityChange.bind(this), zone);
    }
    VisibilityDirective.prototype.visbilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        setTimeout(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
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


/***/ },

/***/ "./src/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/datatable.module.ts"));
__export(__webpack_require__("./src/types/index.ts"));
__export(__webpack_require__("./src/components/index.ts"));


/***/ },

/***/ "./src/themes/material.scss":
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ "./src/types/click.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
(function (ClickType) {
    ClickType[ClickType["single"] = 'single'] = "single";
    ClickType[ClickType["double"] = 'double'] = "double";
})(exports.ClickType || (exports.ClickType = {}));
var ClickType = exports.ClickType;


/***/ },

/***/ "./src/types/column-mode.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
(function (ColumnMode) {
    ColumnMode[ColumnMode["standard"] = 'standard'] = "standard";
    ColumnMode[ColumnMode["flex"] = 'flex'] = "flex";
    ColumnMode[ColumnMode["force"] = 'force'] = "force";
})(exports.ColumnMode || (exports.ColumnMode = {}));
var ColumnMode = exports.ColumnMode;


/***/ },

/***/ "./src/types/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/types/column-mode.type.ts"));
__export(__webpack_require__("./src/types/sort.type.ts"));
__export(__webpack_require__("./src/types/sort-direction.type.ts"));
__export(__webpack_require__("./src/types/selection.type.ts"));
__export(__webpack_require__("./src/types/click.type.ts"));


/***/ },

/***/ "./src/types/selection.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
(function (SelectionType) {
    SelectionType[SelectionType["single"] = 'single'] = "single";
    SelectionType[SelectionType["multi"] = 'multi'] = "multi";
    SelectionType[SelectionType["multiShift"] = 'multiShift'] = "multiShift";
    SelectionType[SelectionType["cell"] = 'cell'] = "cell";
})(exports.SelectionType || (exports.SelectionType = {}));
var SelectionType = exports.SelectionType;


/***/ },

/***/ "./src/types/sort-direction.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
(function (SortDirection) {
    SortDirection[SortDirection["asc"] = 'asc'] = "asc";
    SortDirection[SortDirection["desc"] = 'desc'] = "desc";
})(exports.SortDirection || (exports.SortDirection = {}));
var SortDirection = exports.SortDirection;


/***/ },

/***/ "./src/types/sort.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
(function (SortType) {
    SortType[SortType["single"] = 'single'] = "single";
    SortType[SortType["multi"] = 'multi'] = "multi";
})(exports.SortType || (exports.SortType = {}));
var SortType = exports.SortType;


/***/ },

/***/ "./src/utils/camel-case.ts":
/***/ function(module, exports) {

"use strict";
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


/***/ },

/***/ "./src/utils/column-helper.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var utils_1 = __webpack_require__("./src/utils/index.ts");
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


/***/ },

/***/ "./src/utils/column.ts":
/***/ function(module, exports) {

"use strict";
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
            totalWidth = totalWidth + parseInt(width, 0);
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


/***/ },

/***/ "./src/utils/debounce.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * Debounce a function
 * @param  {any}     func      function to executoe
 * @param  {number}  wait      wait duration
 * @param  {boolean} immediate wait or immediate executue
 */
function debounce(func, wait, immediate) {
    var timeout;
    var args;
    var context;
    var timestamp;
    var result;
    return function () {
        context = this;
        args = arguments;
        timestamp = new Date();
        function later() {
            var last = +new Date() - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            }
            else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                }
            }
        }
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
        }
        return result;
    };
}
exports.debounce = debounce;
/**
 * Debounce decorator
 *
 *  class MyClass {
 *    debounceable(10)
 *    myFn() { ... }
 *  }
 */
function debounceable(duration, immediate) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: debounce(descriptor.value, duration, immediate)
                });
                return this[key];
            }
        };
    };
}
exports.debounceable = debounceable;


/***/ },

/***/ "./src/utils/deep-getter.ts":
/***/ function(module, exports) {

"use strict";
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


/***/ },

/***/ "./src/utils/id.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * Creates a unique object id.
 * http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 */
function id() {
    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
}
exports.id = id;


/***/ },

/***/ "./src/utils/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
__export(__webpack_require__("./src/utils/visibility-observer.ts"));
__export(__webpack_require__("./src/utils/debounce.ts"));
__export(__webpack_require__("./src/utils/sort.ts"));
__export(__webpack_require__("./src/utils/row-height-cache.ts"));
__export(__webpack_require__("./src/utils/column-helper.ts"));


/***/ },

/***/ "./src/utils/keys.ts":
/***/ function(module, exports) {

"use strict";
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


/***/ },

/***/ "./src/utils/math.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
function forceFillColumnWidths(allColumns, expectedWidth, startIdx, defaultColWidth) {
    if (defaultColWidth === void 0) { defaultColWidth = 300; }
    var columnsToResize = startIdx > -1 ?
        allColumns.slice(startIdx, allColumns.length).filter(function (c) { return c.canAutoResize !== false; }) :
        allColumns.filter(function (c) { return c.canAutoResize !== false; });
    for (var _i = 0, columnsToResize_1 = columnsToResize; _i < columnsToResize_1.length; _i++) {
        var column = columnsToResize_1[_i];
        if (!column.$$oldWidth) {
            column.$$oldWidth = column.width;
        }
        // Initialize the starting width to original 
        // width whenever there is a resize/initialize event.
        column.width = column.$$oldWidth;
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
            if (exceedsWindow) {
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


/***/ },

/***/ "./src/utils/prefixes.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/utils/row-height-cache.ts":
/***/ function(module, exports) {

"use strict";
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


/***/ },

/***/ "./src/utils/scrollbar-width.ts":
/***/ function(module, exports) {

"use strict";
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


/***/ },

/***/ "./src/utils/selection.ts":
/***/ function(module, exports) {

"use strict";
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
            var idx = comparefn(row, selected);
            // if reverse shift selection (unselect) and the
            // row is already selected, remove it from selected
            if (reverse && idx > -1) {
                selected.splice(idx, 1);
                continue;
            }
            // if in the positive range to be added to `selected`, and
            // not already in the selected array, add it
            if (i >= range.start && i < range.end) {
                if (idx === -1) {
                    selected.push(row);
                }
            }
        }
    }
    return selected;
}
exports.selectRowsBetween = selectRowsBetween;


/***/ },

/***/ "./src/utils/sort.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
    if (!rows || !dirs || !columns)
        return rows;
    var cols = columns.reduce(function (obj, col) {
        if (col.comparator && typeof col.comparator === 'function') {
            obj[col.prop] = col.comparator;
        }
        return obj;
    }, {});
    return rows.slice().sort(function (a, b) {
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


/***/ },

/***/ "./src/utils/translate.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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


/***/ },

/***/ "./src/utils/visibility-observer.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
function checkVisibility(element, callback, zone) {
    var timeout;
    function check() {
        // https://davidwalsh.name/offsetheight-visibility
        var offsetHeight = element.offsetHeight, offsetWidth = element.offsetWidth;
        if (offsetHeight && offsetWidth) {
            clearTimeout(timeout);
            if (callback)
                zone.run(function () { return callback(); });
        }
        else {
            clearTimeout(timeout);
            zone.runOutsideAngular(function () {
                timeout = setTimeout(function () { return check(); }, 50);
            });
        }
    }
    check();
}
exports.checkVisibility = checkVisibility;


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

/***/ }

/******/ })
});
;
//# sourceMappingURL=app.map