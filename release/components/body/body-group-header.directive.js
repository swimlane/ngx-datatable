"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var body_group_header_template_directive_1 = require("./body-group-header-template.directive");
var DatatableGroupHeaderDirective = /** @class */ (function () {
    function DatatableGroupHeaderDirective() {
    }
    /**
     * Toggle the expansion of a group
     */
    /**
       * Toggle the expansion of a group
       */
    DatatableGroupHeaderDirective.prototype.toggleExpandGroup = /**
       * Toggle the expansion of a group
       */
    function (group) {
        this.toggle.emit({
            type: 'group',
            value: group
        });
    };
    /**
     * API method to expand all groups.
     */
    /**
       * API method to expand all groups.
       */
    DatatableGroupHeaderDirective.prototype.expandAllGroups = /**
       * API method to expand all groups.
       */
    function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * API method to collapse all groups.
     */
    /**
       * API method to collapse all groups.
       */
    DatatableGroupHeaderDirective.prototype.collapseAllGroups = /**
       * API method to collapse all groups.
       */
    function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    return DatatableGroupHeaderDirective;
}());
exports.DatatableGroupHeaderDirective = DatatableGroupHeaderDirective;
//# sourceMappingURL=body-group-header.directive.js.map