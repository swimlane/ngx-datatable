var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
/**
 * Draggable Directive for Angular2
 *
 * Inspiration:
 *   https://github.com/AngularClass/angular2-examples/blob/master/rx-draggable/directives/draggable.ts
 *   http://stackoverflow.com/questions/35662530/how-to-implement-drag-and-drop-in-angular2
 *
 */
let DraggableDirective = class DraggableDirective {
    constructor(element) {
        this.dragX = true;
        this.dragY = true;
        this.dragStart = new EventEmitter();
        this.dragging = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.isDragging = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        if (changes['dragEventTarget'] && changes['dragEventTarget'].currentValue && this.dragModel.dragging) {
            this.onMousedown(changes['dragEventTarget'].currentValue);
        }
    }
    ngOnDestroy() {
        this._destroySubscription();
    }
    onMouseup(event) {
        if (!this.isDragging)
            return;
        this.isDragging = false;
        this.element.classList.remove('dragging');
        if (this.subscription) {
            this._destroySubscription();
            this.dragEnd.emit({
                event,
                element: this.element,
                model: this.dragModel
            });
        }
    }
    onMousedown(event) {
        // we only want to drag the inner header text
        const isDragElm = event.target.classList.contains('draggable');
        if (isDragElm && (this.dragX || this.dragY)) {
            event.preventDefault();
            this.isDragging = true;
            const mouseDownPos = { x: event.clientX, y: event.clientY };
            const mouseup = Observable.fromEvent(document, 'mouseup');
            this.subscription = mouseup
                .subscribe((ev) => this.onMouseup(ev));
            const mouseMoveSub = Observable.fromEvent(document, 'mousemove')
                .takeUntil(mouseup)
                .subscribe((ev) => this.move(ev, mouseDownPos));
            this.subscription.add(mouseMoveSub);
            this.dragStart.emit({
                event,
                element: this.element,
                model: this.dragModel
            });
        }
    }
    move(event, mouseDownPos) {
        if (!this.isDragging)
            return;
        const x = event.clientX - mouseDownPos.x;
        const y = event.clientY - mouseDownPos.y;
        if (this.dragX)
            this.element.style.left = `${x}px`;
        if (this.dragY)
            this.element.style.top = `${y}px`;
        this.element.classList.add('dragging');
        this.dragging.emit({
            event,
            element: this.element,
            model: this.dragModel
        });
    }
    _destroySubscription() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], DraggableDirective.prototype, "dragEventTarget", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], DraggableDirective.prototype, "dragModel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DraggableDirective.prototype, "dragX", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], DraggableDirective.prototype, "dragY", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DraggableDirective.prototype, "dragStart", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DraggableDirective.prototype, "dragging", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], DraggableDirective.prototype, "dragEnd", void 0);
DraggableDirective = __decorate([
    Directive({ selector: '[draggable]' }),
    __metadata("design:paramtypes", [ElementRef])
], DraggableDirective);
export { DraggableDirective };
//# sourceMappingURL=draggable.directive.js.map