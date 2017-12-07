"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
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
        this.table.rowDetail.toggleExpandRow(row);
    };
    RowDetailsComponent.prototype.onDetailToggle = function (event) {
        console.log('Detail Toggled', event);
    };
    __decorate([
        core_1.ViewChild('myTable')
    ], RowDetailsComponent.prototype, "table");
    RowDetailsComponent = __decorate([
        core_1.Component({
            selector: 'row-details-demo',
            template: "\n    <div>\n      <h3>\n        Row Detail Demo\n        <small>\n          <a href=\"https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/row-detail.component.ts\" target=\"_blank\">\n            Source\n          </a>\n        </small>\n        <small>\n          <a href=\"javascript:void(0)\" (click)=\"table.rowDetail.expandAllRows()\">Expand All</a> | \n          <a href=\"javascript:void(0)\" (click)=\"table.rowDetail.collapseAllRows()\">Collapse All</a>\n        </small>\n      </h3>\n      <ngx-datatable\n        #myTable\n        class='material expandable'\n        [columnMode]=\"'force'\"\n        [headerHeight]=\"50\"\n        [footerHeight]=\"50\"\n        [rowHeight]=\"50\"\n        [scrollbarV]=\"true\"\n        [rows]='rows'\n        (page)=\"onPage($event)\">\n        <!-- Row Detail Template -->\n        <ngx-datatable-row-detail [rowHeight]=\"100\" #myDetailRow (toggle)=\"onDetailToggle($event)\">\n          <ng-template let-row=\"row\" let-expanded=\"expanded\" ngx-datatable-row-detail-template>\n            <div style=\"padding-left:35px;\">\n              <div><strong>Address</strong></div>\n              <div>{{row.address.city}}, {{row.address.state}}</div>\n            </div>\n          </ng-template>\n        </ngx-datatable-row-detail>\n\n        <!-- Column Templates -->\n         <ngx-datatable-column\n          [width]=\"50\"\n          [resizeable]=\"false\"\n          [sortable]=\"false\"\n          [draggable]=\"false\"\n          [canAutoResize]=\"false\">\n          <ng-template let-row=\"row\" let-expanded=\"expanded\" ngx-datatable-cell-template>\n            <a\n              href=\"javascript:void(0)\"\n              [class.datatable-icon-right]=\"!expanded\"\n              [class.datatable-icon-down]=\"expanded\"\n              title=\"Expand/Collapse Row\"\n              (click)=\"toggleExpandRow(row)\">\n            </a>\n          </ng-template>\n        </ngx-datatable-column>\n        <ngx-datatable-column name=\"Index\" width=\"80\">\n          <ng-template let-rowIndex=\"rowIndex\" let-row=\"row\" ngx-datatable-cell-template>\n            <strong>{{rowIndex}}</strong>\n          </ng-template>\n        </ngx-datatable-column>\n        <ngx-datatable-column name=\"Expanded\" width=\"80\">\n          <ng-template let-row=\"row\" let-expanded=\"expanded\" ngx-datatable-cell-template>\n            <strong>{{expanded === 1}}</strong>\n          </ng-template>\n        </ngx-datatable-column>\n        <ngx-datatable-column name=\"Name\" width=\"200\">\n          <ng-template let-value=\"value\" ngx-datatable-cell-template>\n            <strong>{{value}}</strong>\n          </ng-template>\n        </ngx-datatable-column>\n        <ngx-datatable-column name=\"Gender\" width=\"300\">\n          <ng-template let-row=\"row\" let-value=\"value\" ngx-datatable-cell-template>\n            <i [innerHTML]=\"row['name']\"></i> and <i>{{value}}</i>\n          </ng-template>\n        </ngx-datatable-column>\n        <ngx-datatable-column name=\"Age\" ></ngx-datatable-column>\n      </ngx-datatable>\n    </div>\n  ",
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], RowDetailsComponent);
    return RowDetailsComponent;
}());
exports.RowDetailsComponent = RowDetailsComponent;
//# sourceMappingURL=row-detail.component.js.map