"use strict";
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var ResizeableDirective = (function () {
    function ResizeableDirective(element) {
        this.resizeEnabled = true;
        this.resize = new core_1.EventEmitter();
        this.resizing = false;
        this.element = element.nativeElement;
        if (this.resizeEnabled) {
            var node = document.createElement('span');
            node.classList.add('resize-handle');
            this.element.appendChild(node);
        }
    }
    ResizeableDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ResizeableDirective.prototype.onMouseup = function () {
        this.resizing = false;
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
            this.resize.emit(this.element.clientWidth);
        }
    };
    ResizeableDirective.prototype.onMousedown = function (event) {
        var _this = this;
        var isHandle = event.target.classList.contains('resize-handle');
        var initialWidth = this.element.clientWidth;
        var mouseDownScreenX = event.screenX;
        if (isHandle) {
            event.stopPropagation();
            this.resizing = true;
            this.subscription = Rx_1.Observable.fromEvent(document, 'mousemove')
                .subscribe(function (e) { return _this.move(e, initialWidth, mouseDownScreenX); });
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
    ResizeableDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[resizeable]',
                    host: {
                        '[class.resizeable]': 'resizeEnabled'
                    }
                },] },
    ];
    /** @nocollapse */
    ResizeableDirective.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    ResizeableDirective.propDecorators = {
        'resizeEnabled': [{ type: core_1.Input },],
        'minWidth': [{ type: core_1.Input },],
        'maxWidth': [{ type: core_1.Input },],
        'resize': [{ type: core_1.Output },],
        'onMouseup': [{ type: core_1.HostListener, args: ['document:mouseup', ['$event'],] },],
        'onMousedown': [{ type: core_1.HostListener, args: ['mousedown', ['$event'],] },],
    };
    return ResizeableDirective;
}());
exports.ResizeableDirective = ResizeableDirective;
//# sourceMappingURL=resizeable.directive.js.map