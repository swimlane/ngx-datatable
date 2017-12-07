"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var BasicAutoComponent = (function () {
    function BasicAutoComponent() {
        var _this = this;
        this.rows = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [
            { prop: 'name' },
            { name: 'Gender' },
            { name: 'Company', sortable: false }
        ];
        this.fetch(function (data) {
            _this.rows = data;
            setTimeout(function () { _this.loadingIndicator = false; }, 1500);
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
            template: "\n    <div>\n      <h3>\n        Fluid Row Heights \n        <small>\n          <a href=\"https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/basic-auto.component.ts\" target=\"_blank\">\n            Source\n          </a>\n        </small>\n      </h3>\n      <ngx-datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [loadingIndicator]=\"loadingIndicator\"\n        [columns]=\"columns\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\"\n        [reorderable]=\"reorderable\">\n      </ngx-datatable>\n    </div>\n  "
        })
    ], BasicAutoComponent);
    return BasicAutoComponent;
}());
exports.BasicAutoComponent = BasicAutoComponent;
//# sourceMappingURL=basic-auto.component.js.map