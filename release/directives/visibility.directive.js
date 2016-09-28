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
var utils_1 = require('utils');
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
        new utils_1.VisibilityObserver(element.nativeElement, this.visbilityChange.bind(this));
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
//# sourceMappingURL=visibility.directive.js.map