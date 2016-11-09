"use strict";
var core_1 = require('@angular/core');
var utils_1 = require('../utils');
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibility-observer
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
var VisibilityDirective = (function () {
    function VisibilityDirective(element, zone) {
        this.isVisible = false;
        this.visible = new core_1.EventEmitter();
        utils_1.checkVisibility(element.nativeElement, this.visbilityChange.bind(this), zone);
    }
    VisibilityDirective.prototype.visbilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        setTimeout(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
    };
    VisibilityDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[visibility-observer]' },] },
    ];
    /** @nocollapse */
    VisibilityDirective.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
    ];
    VisibilityDirective.propDecorators = {
        'isVisible': [{ type: core_1.HostBinding, args: ['class.visible',] },],
        'visible': [{ type: core_1.Output },],
    };
    return VisibilityDirective;
}());
exports.VisibilityDirective = VisibilityDirective;
//# sourceMappingURL=visibility.directive.js.map