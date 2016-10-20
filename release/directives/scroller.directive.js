"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Scroller = (function () {
    function Scroller(element) {
        this.scrollbarV = false;
        this.scrollbarH = false;
        this.onScroll = new core_1.EventEmitter();
        this.scrollYPos = 0;
        this.scrollXPos = 0;
        this.prevScrollYPos = 0;
        this.prevScrollXPos = 0;
        this.element = element.nativeElement;
        this.element.classList.add('datatable-scroll');
    }
    Scroller.prototype.ngOnInit = function () {
        // manual bind so we don't always listen
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement = this.element.parentElement.parentElement;
            this.parentElement.addEventListener('scroll', this.onScrolled.bind(this));
        }
    };
    Scroller.prototype.ngOnDestroy = function () {
        if (this.scrollbarV || this.scrollbarH) {
            this.parentElement.removeEventListener('scroll');
        }
    };
    Scroller.prototype.setOffset = function (offsetY) {
        if (this.parentElement) {
            this.parentElement.scrollTop = offsetY;
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
    ], Scroller.prototype, "limit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "scrollWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Scroller.prototype, "scrollbarV", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Scroller.prototype, "scrollbarH", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Scroller.prototype, "onScroll", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Scroller.prototype, "scrollHeight", void 0);
    Scroller = __decorate([
        core_1.Directive({
            selector: '[scroller]',
            host: {
                '[style.height]': 'scrollHeight + "px"',
                '[style.width]': 'scrollWidth + "px"'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Scroller);
    return Scroller;
}());
exports.Scroller = Scroller;
//# sourceMappingURL=scroller.directive.js.map