"use strict";
var core_1 = require('@angular/core');
var Scroller = (function () {
    function Scroller(element) {
        this.scrollbarV = false;
        this.onScroll = new core_1.EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
        this.element.classList.add('datatable-scroll');
    }
    Object.defineProperty(Scroller.prototype, "scrollHeight", {
        get: function () {
            return (this.count * this.rowHeight) + 'px';
        },
        enumerable: true,
        configurable: true
    });
    Scroller.prototype.ngOnInit = function () {
        // manual bind so we don't always listen
        if (this.scrollbarV) {
            this.parentElement = this.element.parentElement.parentElement;
            this.parentElement.addEventListener('scroll', this.onScrolled.bind(this));
        }
    };
    Scroller.prototype.ngOnDestroy = function () {
        if (this.scrollbarV) {
            this.parentElement.removeEventListener('scroll');
        }
    };
    Scroller.prototype.onScrolled = function (event) {
        var dom = event.currentTarget;
        this.scrollYPos = dom.scrollTop;
        this.scrollXPos = dom.scrollLeft;
        requestAnimationFrame(this.updateOffset.bind(this));
    };
    Scroller.prototype.updateOffset = function () {
        var direction;
        if (this.scrollYPos < this.prevScrollYPos) {
            direction = 'down';
        }
        else if (this.scrollYPos > this.prevScrollYPos) {
            direction = 'up';
        }
        this.onScroll.emit({
            direction: direction,
            scrollYPos: this.scrollYPos,
            scrollXPos: this.scrollXPos
        });
        this.prevScrollYPos = this.scrollYPos;
        this.prevScrollXPos = this.scrollXPos;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "rowHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "count", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "scrollWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Scroller.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Scroller.prototype, "onScroll", void 0);
    Scroller = __decorate([
        core_1.Directive({
            selector: '[scroller]',
            host: {
                '[style.height]': 'scrollHeight',
                '[style.width]': 'scrollWidth + "px"'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Scroller);
    return Scroller;
}());
exports.Scroller = Scroller;
//# sourceMappingURL=Scroller.js.map