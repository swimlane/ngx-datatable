"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
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
            template: "\n    <div>\n      <h3>\n        Hidden By Default\n        <small>\n          <a href=\"https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/tabs.component.ts\" target=\"_blank\">\n            Source\n          </a>\n        </small>\n      </h3>\n\n      <div style=\"width:75%;margin:0 auto\">\n        <div>\n          <button type=\"button\" (click)=\"tab1=true;tab2=false;tab3=false;\">Nothing</button>\n          <button type=\"button\" (click)=\"tab2=true;tab1=false;tab3=false;\">Hidden</button>\n          <button type=\"button\" (click)=\"tab3=true;tab1=false;tab2=false;\">NgIf</button>\n        </div>\n\n        <div [hidden]=\"!tab1\">\n          <p>Click a button to toggle table visibilities</p>\n        </div>\n\n        <div [hidden]=\"!tab2\">\n          <h4>hidden Table</h4>\n          <ngx-datatable\n            class='material'\n            [rows]='rows'\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"50\"\n            [scrollbarV]=\"true\">\n            <ngx-datatable-column name=\"Name\" width=\"200\"></ngx-datatable-column>\n            <ngx-datatable-column name=\"Gender\" width=\"300\"></ngx-datatable-column>\n            <ngx-datatable-column name=\"Age\" width=\"80\"></ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n\n        <div *ngIf=\"tab3\">\n          <h4>ngIf Table</h4>\n          <ngx-datatable\n            class='material'\n            [rows]='rows'\n            [columnMode]=\"'force'\"\n            [headerHeight]=\"50\"\n            [footerHeight]=\"50\"\n            [rowHeight]=\"50\"\n            [scrollbarV]=\"true\">\n            <ngx-datatable-column name=\"Name\" width=\"200\"></ngx-datatable-column>\n            <ngx-datatable-column name=\"Gender\" width=\"300\"></ngx-datatable-column>\n            <ngx-datatable-column name=\"Age\" width=\"80\"></ngx-datatable-column>\n          </ngx-datatable>\n        </div>\n      </div>\n\n    </div>\n  "
        })
    ], TabsDemoComponent);
    return TabsDemoComponent;
}());
exports.TabsDemoComponent = TabsDemoComponent;
//# sourceMappingURL=tabs.component.js.map