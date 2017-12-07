"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ClientPagingComponent = (function () {
    function ClientPagingComponent() {
        var _this = this;
        this.rows = [];
        this.columns = [];
        this.fetch(function (data) {
            _this.rows = [
                {
                    "name": "Ethel Price",
                    "gender": "female",
                    "company": "Johnson, Johnson and Partners, LLC CMP DDC",
                    "age": 22
                }
            ];
        });
        this.columns = [{ prop: 'name' }, { prop: 'gender' }, { prop: 'Company' }];
        console.log(this.columns);
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
            template: "\n    <div>\n      <h3>\n        Client-side Paging\n        <small>\n          <a href=\"https://github.com/swimlane/ngx-datatable/blob/master/demo/paging/paging-client.component.ts\" target=\"_blank\">\n            Source\n          </a>\n        </small>\n      </h3>\n      <ngx-datatable\n        class=\"material\"\n        [rows]=\"rows\"\n        [columns]=\"columns\"\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"'auto'\"\n        [limit]=\"10\">\n      </ngx-datatable>\n    </div>\n  "
        })
    ], ClientPagingComponent);
    return ClientPagingComponent;
}());
exports.ClientPagingComponent = ClientPagingComponent;
//# sourceMappingURL=paging-client.component.js.map