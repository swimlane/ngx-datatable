var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ElementRef, Output, EventEmitter, Renderer, HostBinding, ChangeDetectionStrategy } from '@angular/core';
let ScrollerComponent = class ScrollerComponent {
    constructor(element, renderer) {
        this.renderer = renderer;
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.scroll = new EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
    }
    ngOnInit() {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement = this.element.parentElement.parentElement;
            this.onScrollListener = this.renderer.listen(this.parentElement, 'scroll', this.onScrolled.bind(this));
        }
    }
    ngOnDestroy() {
        if (this.scrollbarV || this.scrollbarH) {
            this.onScrollListener();
        }
    }
    setOffset(offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    }
    onScrolled(event) {
        const dom = event.currentTarget;
        this.scrollYPos = dom.scrollTop;
        this.scrollXPos = dom.scrollLeft;
        requestAnimationFrame(this.updateOffset.bind(this));
    }
    updateOffset() {
        let direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.scroll.emit({
            direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ScrollerComponent.prototype, "scrollbarV", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], ScrollerComponent.prototype, "scrollbarH", void 0);
__decorate([
    HostBinding('style.height.px'),
    Input(),
    __metadata("design:type", Number)
], ScrollerComponent.prototype, "scrollHeight", void 0);
__decorate([
    HostBinding('style.width.px'),
    Input(),
    __metadata("design:type", Number)
], ScrollerComponent.prototype, "scrollWidth", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ScrollerComponent.prototype, "scroll", void 0);
ScrollerComponent = __decorate([
    Component({
        selector: 'datatable-scroller',
        template: `
    <ng-content></ng-content>
  `,
        host: {
            class: 'datatable-scroll'
        },
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ElementRef, Renderer])
], ScrollerComponent);
export { ScrollerComponent };
//# sourceMappingURL=scroller.component.js.map