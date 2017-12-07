"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var BootstrapThemeComponent = (function () {
    function BootstrapThemeComponent() {
        var _this = this;
        this.rows = [];
        this.loadingIndicator = true;
        this.reorderable = true;
        this.columns = [
            { prop: 'name' },
            { name: 'Gender' },
            { name: 'Company' }
        ];
        this.fetch(function (data) {
            _this.rows = data;
            setTimeout(function () { _this.loadingIndicator = false; }, 1500);
        });
    }
    BootstrapThemeComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    BootstrapThemeComponent = __decorate([
        core_1.Component({
            selector: 'basic-bootstrap-theme-demo',
            template: "\n    <div>\n      <h3>\n        Bootstrap Theme\n        <small>\n          <a href=\"https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/bootstrap.component.ts\" target=\"_blank\">\n            Source\n          </a>\n        </small>\n      </h3>\n      <ngx-datatable\n        class=\"bootstrap\"\n        [rows]=\"rows\"\n        [loadingIndicator]=\"loadingIndicator\"\n        [columns]=\"columns\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"40\"\n        [footerHeight]=\"40\"\n        [limit]=\"10\"\n        [rowHeight]=\"'auto'\"\n        [reorderable]=\"reorderable\">\n      </ngx-datatable>\n    </div>\n  "
        })
    ], BootstrapThemeComponent);
    return BootstrapThemeComponent;
}());
exports.BootstrapThemeComponent = BootstrapThemeComponent;
//# sourceMappingURL=bootstrap.component.js.map