"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var section_header_template_directive_1 = require("./section-header-template.directive");
var DatatableSectionHeaderDirective = /** @class */ (function () {
    function DatatableSectionHeaderDirective() {
        /**
         * Height of the header.
         * This is required especially when virtual scroll is enabled.
         *
         * @type {number|function(row?:any,index?:number): number}
         * @memberOf DatatableSectionHeaderDirective
         */
        this.height = 0;
        /**
         * Section visbility was toggled.
         *
         * @type {EventEmitter<any>}
         * @memberOf DatatableSectionDirective
         */
        this.toggle = new core_1.EventEmitter();
    }
    /**
     * Toggle the expansion of the section
     *
     * @param section
     * @memberOf DatatableSectionDirective
     */
    DatatableSectionHeaderDirective.prototype.toggleExpandSection = function (section) {
        this.toggle.emit({
            type: 'section',
            value: section
        });
    };
    /**
     * API method to expand all the sections.
     *
     * @memberOf DatatableSectionDirective
     */
    DatatableSectionHeaderDirective.prototype.expandAllSections = function () {
        this.toggle.emit({
            type: 'all',
            value: true
        });
    };
    /**
     * API method to collapse all the sections.
     *
     * @memberOf DatatableSectionDirective
     */
    DatatableSectionHeaderDirective.prototype.collapseAllSections = function () {
        this.toggle.emit({
            type: 'all',
            value: false
        });
    };
    DatatableSectionHeaderDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'ngx-datatable-section-header' },] },
    ];
    /** @nocollapse */
    DatatableSectionHeaderDirective.ctorParameters = function () { return []; };
    DatatableSectionHeaderDirective.propDecorators = {
        'height': [{ type: core_1.Input },],
        'template': [{ type: core_1.Input }, { type: core_1.ContentChild, args: [section_header_template_directive_1.DatatableSectionHeaderTemplateDirective, { read: core_1.TemplateRef },] },],
        'toggle': [{ type: core_1.Output },],
    };
    return DatatableSectionHeaderDirective;
}());
exports.DatatableSectionHeaderDirective = DatatableSectionHeaderDirective;
//# sourceMappingURL=section-header.directive.js.map