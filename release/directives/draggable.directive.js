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
var DraggableDirective = (function () {
    function DraggableDirective(element) {
        this.dragX = true;
        this.dragY = true;
        this.dragStart = new core_1.EventEmitter();
        this.dragging = new core_1.EventEmitter();
        this.dragEnd = new core_1.EventEmitter();
        this.isDragging = false;
        this.element = element.nativeElement;
    }
    DraggableDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    DraggableDirective.prototype.onMouseup = function (event) {
        this.isDragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.dragEnd.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.prototype.onMousedown = function (event) {
        var _this = this;
        if (event.target.classList.contains('draggable')) {
            event.preventDefault();
            this.isDragging = true;
            var mouseDownPos_1 = { x: event.clientX, y: event.clientY };
            this.subscription = Rx_1.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (ev) { return _this.move(ev, mouseDownPos_1); });
            this.dragStart.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.prototype.move = function (event, mouseDownPos) {
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
            this.dragging.emit({
                event: event,
                element: this.element,
                model: this.dragModel
            });
        }
    };
    DraggableDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[draggable]' },] },
    ];
    /** @nocollapse */
    DraggableDirective.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    DraggableDirective.propDecorators = {
        'dragModel': [{ type: core_1.Input },],
        'dragX': [{ type: core_1.Input },],
        'dragY': [{ type: core_1.Input },],
        'dragStart': [{ type: core_1.Output },],
        'dragging': [{ type: core_1.Output },],
        'dragEnd': [{ type: core_1.Output },],
        'onMouseup': [{ type: core_1.HostListener, args: ['document:mouseup', ['$event'],] },],
        'onMousedown': [{ type: core_1.HostListener, args: ['mousedown', ['$event'],] },],
    };
    return DraggableDirective;
}());
exports.DraggableDirective = DraggableDirective;
//# sourceMappingURL=draggable.directive.js.map