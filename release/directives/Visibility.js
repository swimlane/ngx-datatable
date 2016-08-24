"use strict";
var core_1 = require('@angular/core');
var VisibilityObserver_1 = require('../utils/VisibilityObserver');
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibility-observer
 * 			(onVisibilityChange)="doSomething($event)">
 * 		</div>
 *
 */
var Visibility = (function () {
    function Visibility(element) {
        this.visible = false;
        this.onVisibilityChange = new core_1.EventEmitter();
        new VisibilityObserver_1.VisibilityObserver(element.nativeElement, this.visbilityChange.bind(this));
    }
    Visibility.prototype.visbilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        setTimeout(function () {
            _this.visible = true;
            _this.onVisibilityChange.emit(true);
        });
    };
    __decorate([
        core_1.HostBinding('class.visible'), 
        __metadata('design:type', Boolean)
    ], Visibility.prototype, "visible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Visibility.prototype, "onVisibilityChange", void 0);
    Visibility = __decorate([
        core_1.Directive({ selector: '[visibility-observer]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Visibility);
    return Visibility;
}());
exports.Visibility = Visibility;
//# sourceMappingURL=Visibility.js.map