"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var utils_1 = require('../utils');
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
var VisibilityDirective = (function () {
    function VisibilityDirective(element) {
        this.isVisible = false;
        this.visible = new core_1.EventEmitter();
        new utils_1.VisibilityObserver(element.nativeElement, this.visbilityChange.bind(this));
    }
    VisibilityDirective.prototype.visbilityChange = function () {
        var _this = this;
        // trigger zone recalc for columns
        setTimeout(function () {
            _this.isVisible = true;
            _this.visible.emit(true);
        });
    };
    __decorate([
        core_1.HostBinding('class.visible'), 
        __metadata('design:type', Boolean)
    ], VisibilityDirective.prototype, "isVisible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], VisibilityDirective.prototype, "visible", void 0);
    VisibilityDirective = __decorate([
        core_1.Directive({ selector: '[visibility-observer]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], VisibilityDirective);
    return VisibilityDirective;
}());
exports.VisibilityDirective = VisibilityDirective;
//# sourceMappingURL=visibility.directive.js.map