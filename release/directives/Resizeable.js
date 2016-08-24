"use strict";
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var Resizeable = (function () {
    function Resizeable(element) {
        this.resizeEnabled = true;
        this.onResize = new core_1.EventEmitter();
        this.prevScreenX = 0;
        this.resizing = false;
        this.element = element.nativeElement;
        if (this.resizeEnabled) {
            var node = document.createElement('span');
            node.classList.add('resize-handle');
            this.element.appendChild(node);
        }
    }
    Resizeable.prototype.onMouseup = function () {
        this.resizing = false;
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.onResize.emit(this.element.clientWidth);
        }
    };
    Resizeable.prototype.onMousedown = function (event) {
        var _this = this;
        var isHandle = event.target.classList.contains('resize-handle');
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            this.subscription = Rx_1.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (e) { return _this.move(e); });
        }
    };
    Resizeable.prototype.move = function (event) {
        var movementX = event.movementX || event.mozMovementX || (event.screenX - this.prevScreenX);
        var width = this.element.clientWidth;
        var newWidth = width + (movementX || 0);
        this.prevScreenX = event.screenX;
        var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = newWidth + "px";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Resizeable.prototype, "resizeEnabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Resizeable.prototype, "minWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Resizeable.prototype, "maxWidth", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Resizeable.prototype, "onResize", void 0);
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], Resizeable.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Resizeable.prototype, "onMousedown", null);
    Resizeable = __decorate([
        core_1.Directive({
            selector: '[resizeable]',
            host: {
                '[class.resizeable]': 'resizeEnabled'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Resizeable);
    return Resizeable;
}());
exports.Resizeable = Resizeable;
//# sourceMappingURL=Resizeable.js.map