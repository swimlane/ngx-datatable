"use strict";
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
    LongPressDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[long-press]' },] },
    ];
    /** @nocollapse */
    LongPressDirective.ctorParameters = [];
    LongPressDirective.propDecorators = {
        'duration': [{ type: core_1.Input },],
        'longPress': [{ type: core_1.Output },],
        'longPressing': [{ type: core_1.Output },],
        'longPressEnd': [{ type: core_1.Output },],
        'press': [{ type: core_1.HostBinding, args: ['class.press',] },],
        'isLongPress': [{ type: core_1.HostBinding, args: ['class.longpress',] },],
        'onMouseDown': [{ type: core_1.HostListener, args: ['mousedown', ['$event'],] },],
        'onMouseMove': [{ type: core_1.HostListener, args: ['mousemove', ['$event'],] },],
        'onMouseUp': [{ type: core_1.HostListener, args: ['mouseup',] },],
    };
    return LongPressDirective;
}());
exports.LongPressDirective = LongPressDirective;
//# sourceMappingURL=long-press.directive.js.map