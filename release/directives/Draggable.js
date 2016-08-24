"use strict";
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
var Draggable = (function () {
    function Draggable(element) {
        this.dragX = true;
        this.dragY = true;
        this.onDragStart = new core_1.EventEmitter();
        this.onDragging = new core_1.EventEmitter();
        this.onDragEnd = new core_1.EventEmitter();
        this.dragging = false;
        this.element = element.nativeElement;
    }
    Draggable.prototype.onMouseup = function (event) {
        this.dragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.onDragEnd.emit({
                event: event,
                element: this.element,
                model: this.model
            });
        }
    };
    Draggable.prototype.onMousedown = function (event) {
        var _this = this;
        if (event.target.classList.contains('draggable')) {
            event.preventDefault();
            this.dragging = true;
            var mouseDownPos_1 = { x: event.clientX, y: event.clientY };
            this.subscription = Rx_1.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (ev) { return _this.move(ev, mouseDownPos_1); });
            this.onDragStart.emit({
                event: event,
                element: this.element,
                model: this.model
            });
        }
    };
    Draggable.prototype.move = function (event, mouseDownPos) {
        if (!this.dragging)
            return;
        var x = event.clientX - mouseDownPos.x;
        var y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = x + "px";
        if (this.dragY)
            this.element.style.top = y + "px";
        if (this.dragX || this.dragY) {
            this.element.classList.add('dragging');
            this.onDragging.emit({
                event: event,
                element: this.element,
                model: this.model
            });
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Draggable.prototype, "model", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Draggable.prototype, "dragX", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Draggable.prototype, "dragY", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragging", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Draggable.prototype, "onDragEnd", void 0);
    __decorate([
        core_1.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], Draggable.prototype, "onMousedown", null);
    Draggable = __decorate([
        core_1.Directive({ selector: '[draggable]' }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Draggable);
    return Draggable;
}());
exports.Draggable = Draggable;
//# sourceMappingURL=Draggable.js.map