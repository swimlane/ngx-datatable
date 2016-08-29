"use strict";
var core_1 = require('@angular/core');
var TableColumn_1 = require('../../models/TableColumn');
var deepGetter_1 = require('../../utils/deepGetter');
var DataTableBodyCell = (function () {
    function DataTableBodyCell(element) {
        element.nativeElement.classList.add('datatable-body-cell');
    }
    Object.defineProperty(DataTableBodyCell.prototype, "value", {
        get: function () {
            if (!this.row)
                return '';
            var prop = deepGetter_1.deepValueGetter(this.row, this.column.prop);
            var userPipe = this.column.pipe;
            return userPipe ? userPipe.transform(prop) : prop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableBodyCell.prototype, "width", {
        get: function () {
            return this.column.width + 'px';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', TableColumn_1.TableColumn)
    ], DataTableBodyCell.prototype, "column", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "row", void 0);
    __decorate([
        core_1.HostBinding('style.width'), 
        __metadata('design:type', Object)
    ], DataTableBodyCell.prototype, "width", null);
    DataTableBodyCell = __decorate([
        core_1.Component({
            selector: 'datatable-body-cell',
            template: "\n    <div class=\"datatable-body-cell-label\">\n      <span\n        *ngIf=\"!column.template\"\n        [innerHTML]=\"value\">\n      </span>\n      <template\n        *ngIf=\"column.template\"\n        [value]=\"value\"\n        [row]=\"row\"\n        [column]=\"column\"\n        [templateWrapper]=\"column.template\">\n      </template>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DataTableBodyCell);
    return DataTableBodyCell;
}());
exports.DataTableBodyCell = DataTableBodyCell;
//# sourceMappingURL=BodyCell.js.map