import { Component, Input, ElementRef, Output, EventEmitter, Renderer, HostBinding } from '@angular/core';
var ScrollerComponent = (function () {
    function ScrollerComponent(element, renderer) {
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
    ScrollerComponent.prototype.ngOnInit = function () {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement = this.element.parentElement.parentElement;
            this.onScrollListener = this.renderer.listen(this.parentElement, 'scroll', this.onScrolled.bind(this));
        }
    };
    ScrollerComponent.prototype.ngOnDestroy = function () {
        if (this.scrollbarV || this.scrollbarH) {
            this.onScrollListener();
        }
    };
    ScrollerComponent.prototype.setOffset = function (offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
        }
    };
    ScrollerComponent.prototype.onScrolled = function (event) {
        var dom = event.currentTarget;
        this.scrollYPos = dom.scrollTop;
        this.scrollXPos = dom.scrollLeft;
        requestAnimationFrame(this.updateOffset.bind(this));
    };
    ScrollerComponent.prototype.updateOffset = function () {
        var direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.scroll.emit({
            direction: direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    };
    return ScrollerComponent;
}());
export { ScrollerComponent };
ScrollerComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-scroller',
                template: "\n    <ng-content></ng-content>\n  ",
                host: {
                    class: 'datatable-scroll'
                }
            },] },
];
/** @nocollapse */
ScrollerComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
]; };
ScrollerComponent.propDecorators = {
    'scrollbarV': [{ type: Input },],
    'scrollbarH': [{ type: Input },],
    'scrollHeight': [{ type: HostBinding, args: ['style.height.px',] }, { type: Input },],
    'scrollWidth': [{ type: HostBinding, args: ['style.width.px',] }, { type: Input },],
    'scroll': [{ type: Output },],
};
//# sourceMappingURL=scroller.component.js.map