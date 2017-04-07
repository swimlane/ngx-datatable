import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
var ResizeableDirective = (function () {
    function ResizeableDirective(element) {
        this.resizeEnabled = true;
        this.resize = new EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
    }
    ResizeableDirective.prototype.ngAfterViewInit = function () {
        if (this.resizeEnabled) {
            var node = document.createElement('span');
            node.classList.add('resize-handle');
            this.element.appendChild(node);
        }
    };
    ResizeableDirective.prototype.ngOnDestroy = function () {
        this._destroySubscription();
    };
    ResizeableDirective.prototype.onMouseup = function () {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this._destroySubscription();
            this.resize.emit(this.element.clientWidth);
        }
    };
    ResizeableDirective.prototype.onMousedown = function (event) {
        var _this = this;
        var isHandle = (event.target).classList.contains('resize-handle');
        var initialWidth = this.element.clientWidth;
        var mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            var mouseup = Observable.fromEvent(document, 'mouseup');
            this.subscription = mouseup
                .subscribe(function (ev) { return _this.onMouseup(); });
            var mouseMoveSub = Observable.fromEvent(document, 'mousemove')
                .takeUntil(mouseup)
                .subscribe(function (e) { return _this.move(e, initialWidth, mouseDownScreenX); });
            this.subscription.add(mouseMoveSub);
        }
    };
    ResizeableDirective.prototype.move = function (event, initialWidth, mouseDownScreenX) {
        var movementX = event.screenX - mouseDownScreenX;
        var newWidth = initialWidth + movementX;
        var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
        var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
        if (overMinWidth && underMaxWidth) {
            this.element.style.width = newWidth + "px";
        }
    };
    ResizeableDirective.prototype._destroySubscription = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    };
    return ResizeableDirective;
}());
export { ResizeableDirective };
ResizeableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[resizeable]',
                host: {
                    '[class.resizeable]': 'resizeEnabled'
                }
            },] },
];
/** @nocollapse */
ResizeableDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
ResizeableDirective.propDecorators = {
    'resizeEnabled': [{ type: Input },],
    'minWidth': [{ type: Input },],
    'maxWidth': [{ type: Input },],
    'resize': [{ type: Output },],
    'onMousedown': [{ type: HostListener, args: ['mousedown', ['$event'],] },],
};
//# sourceMappingURL=resizeable.directive.js.map