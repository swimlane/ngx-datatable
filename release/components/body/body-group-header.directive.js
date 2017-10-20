"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var body_group_header_template_directive_1 = require("./body-group-header-template.directive");
var DatatableGroupHeaderDirective = (function () {
    function DatatableGroupHeaderDirective() {
        /**
         * The detail row height is required especially
         * when virtual scroll is enabled.
         */
        this.rowHeight = 0;
        /**
         * Group visbility was toggled.
         */
        this.toggle = new core_1.EventEmitter();
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
     * API method to expand all groups.
     */
    DatatableGroupHeaderDirective.prototype.expandAllGroups = function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * API method to collapse all groups.
     */
    DatatableGroupHeaderDirective.prototype.collapseAllGroups = function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    DatatableGroupHeaderDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'ngx-datatable-group-header' },] },
    ];
    /** @nocollapse */
    DatatableGroupHeaderDirective.ctorParameters = function () { return []; };
    DatatableGroupHeaderDirective.propDecorators = {
        'rowHeight': [{ type: core_1.Input },],
        'template': [{ type: core_1.Input }, { type: core_1.ContentChild, args: [body_group_header_template_directive_1.DatatableGroupHeaderTemplateDirective, { read: core_1.TemplateRef },] },],
        'toggle': [{ type: core_1.Output },],
    };
    return DatatableGroupHeaderDirective;
}());
exports.DatatableGroupHeaderDirective = DatatableGroupHeaderDirective;
//# sourceMappingURL=body-group-header.directive.js.map