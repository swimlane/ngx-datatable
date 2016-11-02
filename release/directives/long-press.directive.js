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
var LongPressDirective = (function () {
    function LongPressDirective() {
        this.duration = 500;
        this.longPress = new core_1.EventEmitter();
        this.longPressing = new core_1.EventEmitter();
        this.longPressEnd = new core_1.EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    Object.defineProperty(LongPressDirective.prototype, "press", {
        get: function () { return this.pressing; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPressDirective.prototype, "isLongPress", {
        get: function () { return this.longPressing; },
        enumerable: true,
        configurable: true
    });
    LongPressDirective.prototype.onMouseDown = function (event) {
        var _this = this;
        // don't do right/middle clicks
        if (event.which !== 1)
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        this.timeout = setTimeout(function () {
            _this.isLongPressing = true;
            _this.longPress.emit(event);
            _this.loop(event);
        }, this.duration);
        this.loop(event);
    };
    LongPressDirective.prototype.onMouseMove = function (event) {
        if (this.pressing && !this.longPressing) {
            var xThres = (event.clientX - this.mouseX) > 10;
            var yThres = (event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    LongPressDirective.prototype.loop = function (event) {
        var _this = this;
        if (this.longPressing) {
            this.timeout = setTimeout(function () {
                _this.longPressing.emit(event);
                _this.loop(event);
            }, 50);
        }
    };
    LongPressDirective.prototype.endPress = function () {
        clearTimeout(this.timeout);
        this.isLongPressing = false;
        this.pressing = false;
        this.longPressEnd.emit(true);
    };
    LongPressDirective.prototype.onMouseUp = function () { this.endPress(); };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LongPressDirective.prototype, "duration", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPressDirective.prototype, "longPress", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPressDirective.prototype, "longPressing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPressDirective.prototype, "longPressEnd", void 0);
    __decorate([
        core_1.HostBinding('class.press'), 
        __metadata('design:type', Object)
    ], LongPressDirective.prototype, "press", null);
    __decorate([
        core_1.HostBinding('class.longpress'), 
        __metadata('design:type', Object)
    ], LongPressDirective.prototype, "isLongPress", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPressDirective.prototype, "onMouseDown", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPressDirective.prototype, "onMouseMove", null);
    __decorate([
        core_1.HostListener('mouseup'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LongPressDirective.prototype, "onMouseUp", null);
    LongPressDirective = __decorate([
        core_1.Directive({ selector: '[long-press]' }), 
        __metadata('design:paramtypes', [])
    ], LongPressDirective);
    return LongPressDirective;
}());
exports.LongPressDirective = LongPressDirective;
//# sourceMappingURL=long-press.directive.js.map