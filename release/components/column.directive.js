"use strict";
var core_1 = require('@angular/core');
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
    DataTableColumnDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'datatable-column',
                },] },
    ];
    /** @nocollapse */
    DataTableColumnDirective.ctorParameters = [];
    DataTableColumnDirective.propDecorators = {
        'name': [{ type: core_1.Input },],
        'prop': [{ type: core_1.Input },],
        'frozenLeft': [{ type: core_1.Input },],
        'frozenRight': [{ type: core_1.Input },],
        'flexGrow': [{ type: core_1.Input },],
        'resizeable': [{ type: core_1.Input },],
        'comparator': [{ type: core_1.Input },],
        'pipe': [{ type: core_1.Input },],
        'sortable': [{ type: core_1.Input },],
        'draggable': [{ type: core_1.Input },],
        'canAutoResize': [{ type: core_1.Input },],
        'minWidth': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'maxWidth': [{ type: core_1.Input },],
        'templates': [{ type: core_1.ContentChildren, args: [core_1.TemplateRef,] },],
    };
    return DataTableColumnDirective;
}());
exports.DataTableColumnDirective = DataTableColumnDirective;
//# sourceMappingURL=column.directive.js.map