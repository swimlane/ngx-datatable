var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
let LongPressDirective = class LongPressDirective {
    constructor() {
        this.pressEnabled = true;
        this.duration = 500;
        this.longPressStart = new EventEmitter();
        this.longPressing = new EventEmitter();
        this.longPressEnd = new EventEmitter();
        this.mouseX = 0;
        this.mouseY = 0;
    }
    get press() { return this.pressing; }
    get isLongPress() {
        return this.isLongPressing;
    }
    onMouseDown(event) {
        // don't do right/middle clicks
        if (event.which !== 1 || !this.pressEnabled)
            return;
        // don't start drag if its on resize handle
        const target = event.target;
        if (target.classList.contains('resize-handle'))
            return;
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
        this.pressing = true;
        this.isLongPressing = false;
        const mouseup = Observable.fromEvent(document, 'mouseup');
        this.subscription = mouseup.subscribe((ev) => this.onMouseup());
        this.timeout = setTimeout(() => {
            this.isLongPressing = true;
            this.longPressStart.emit({
                event,
                model: this.pressModel
            });
            this.subscription.add(Observable.fromEvent(document, 'mousemove')
                .takeUntil(mouseup)
                .subscribe((mouseEvent) => this.onMouseMove(mouseEvent)));
            this.loop(event);
        }, this.duration);
        this.loop(event);
    }
    onMouseMove(event) {
        if (this.pressing && !this.isLongPressing) {
            const xThres = Math.abs(event.clientX - this.mouseX) > 10;
            const yThres = Math.abs(event.clientY - this.mouseY) > 10;
            if (xThres || yThres) {
                this.endPress();
            }
        }
    }
    loop(event) {
        if (this.isLongPressing) {
            this.timeout = setTimeout(() => {
                this.longPressing.emit({
                    event,
                    model: this.pressModel
                });
                this.loop(event);
            }, 50);
        }
    }
    endPress() {
        clearTimeout(this.timeout);
        this.isLongPressing = false;
        this.pressing = false;
        this._destroySubscription();
        this.longPressEnd.emit({
            model: this.pressModel
        });
    }
    onMouseup() {
        this.endPress();
    }
    ngOnDestroy() {
        this._destroySubscription();
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
    __metadata("design:type", Boolean)
], LongPressDirective.prototype, "pressEnabled", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], LongPressDirective.prototype, "pressModel", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], LongPressDirective.prototype, "duration", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LongPressDirective.prototype, "longPressStart", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LongPressDirective.prototype, "longPressing", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], LongPressDirective.prototype, "longPressEnd", void 0);
__decorate([
    HostBinding('class.press'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], LongPressDirective.prototype, "press", null);
__decorate([
    HostBinding('class.longpress'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], LongPressDirective.prototype, "isLongPress", null);
__decorate([
    HostListener('mousedown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], LongPressDirective.prototype, "onMouseDown", null);
LongPressDirective = __decorate([
    Directive({ selector: '[long-press]' })
], LongPressDirective);
export { LongPressDirective };
//# sourceMappingURL=long-press.directive.js.map