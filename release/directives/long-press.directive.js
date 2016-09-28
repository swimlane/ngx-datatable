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
var LongPress = (function () {
    function LongPress() {
        this.duration = 500;
        this.onLongPress = new core_1.EventEmitter();
        this.onLongPressing = new core_1.EventEmitter();
        this.onLongPressEnd = new core_1.EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    Object.defineProperty(LongPress.prototype, "press", {
        get: function () { return this.pressing; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LongPress.prototype, "longPress", {
        get: function () { return this.longPressing; },
        enumerable: true,
        configurable: true
    });
    LongPress.prototype.onMouseDown = function (event) {
        var _this = this;
        // don't do right/middle clicks
        if (event.which !== 1)
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.longPressing = false;
        this.timeout = setTimeout(function () {
            _this.longPressing = true;
            _this.onLongPress.emit(event);
            _this.loop(event);
        }, this.duration);
        this.loop(event);
    };
    LongPress.prototype.onMouseMove = function (event) {
        if (this.pressing && !this.longPressing) {
            var xThres = (event.clientX - this.mouseX) > 10;
            var yThres = (event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    };
    LongPress.prototype.loop = function (event) {
        var _this = this;
        if (this.longPressing) {
            this.timeout = setTimeout(function () {
                _this.onLongPressing.emit(event);
                _this.loop(event);
            }, 50);
        }
    };
    LongPress.prototype.endPress = function () {
        clearTimeout(this.timeout);
        this.longPressing = false;
        this.pressing = false;
        this.onLongPressEnd.emit(true);
    };
    LongPress.prototype.onMouseUp = function () { this.endPress(); };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LongPress.prototype, "duration", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPress.prototype, "onLongPress", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPress.prototype, "onLongPressing", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LongPress.prototype, "onLongPressEnd", void 0);
    __decorate([
        core_1.HostBinding('class.press'), 
        __metadata('design:type', Object)
    ], LongPress.prototype, "press", null);
    __decorate([
        core_1.HostBinding('class.longpress'), 
        __metadata('design:type', Object)
    ], LongPress.prototype, "longPress", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseDown", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseMove", null);
    __decorate([
        core_1.HostListener('mouseup'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LongPress.prototype, "onMouseUp", null);
    LongPress = __decorate([
        core_1.Directive({ selector: '[long-press]' }), 
        __metadata('design:paramtypes', [])
    ], LongPress);
    return LongPress;
}());
exports.LongPress = LongPress;
//# sourceMappingURL=long-press.directive.js.map