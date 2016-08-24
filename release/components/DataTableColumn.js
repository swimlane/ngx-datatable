"use strict";
var core_1 = require('@angular/core');
var TableColumn_1 = require('../models/TableColumn');
var DataTableColumn = (function () {
    function DataTableColumn() {
    }
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.QueryList)
    ], DataTableColumn.prototype, "template", void 0);
    DataTableColumn = __decorate([
        core_1.Directive({
            selector: 'datatable-column',
            inputs: TableColumn_1.TableColumn.getProps()
        }), 
        __metadata('design:paramtypes', [])
    ], DataTableColumn);
    return DataTableColumn;
}());
exports.DataTableColumn = DataTableColumn;
//# sourceMappingURL=DataTableColumn.js.map