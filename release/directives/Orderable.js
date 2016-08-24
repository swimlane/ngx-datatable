"use strict";
var core_1 = require('@angular/core');
var Draggable_1 = require('./Draggable');
var Orderable = (function () {
    function Orderable() {
        this.onReorder = new core_1.EventEmitter();
    }
    Orderable.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.drags.forEach(function (d) {
            return d.onDragStart.subscribe(_this.onDragStart.bind(_this)) &&
                d.onDragEnd.subscribe(_this.onDragEnd.bind(_this));
        });
    };
    Orderable.prototype.onDragStart = function () {
        this.positions = {};
        var i = 0;
        for (var _i = 0, _a = this.drags.toArray(); _i < _a.length; _i++) {
            var dragger = _a[_i];
            var elm = dragger.element;
            this.positions[dragger.model.prop] = {
                left: parseInt(elm.offsetLeft.toString(), 0),
                index: i++
            };
        }
    };
    Orderable.prototype.onDragEnd = function (_a) {
        var element = _a.element, model = _a.model;
        var newPos = parseInt(element.offsetLeft.toString(), 0);
        var prevPos = this.positions[model.prop];
        var i = 0;
        for (var prop in this.positions) {
            var pos = this.positions[prop];
            var movedLeft = newPos < pos.left && prevPos.left > pos.left;
            var movedRight = newPos > pos.left && prevPos.left < pos.left;
            if (movedLeft || movedRight) {
                this.onReorder.emit({
                    prevIndex: prevPos.index,
                    newIndex: i,
                    model: model
                });
            }
            i++;
        }
        element.style.left = 'auto';
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Orderable.prototype, "onReorder", void 0);
    __decorate([
        core_1.ContentChildren(Draggable_1.Draggable), 
        __metadata('design:type', core_1.QueryList)
    ], Orderable.prototype, "drags", void 0);
    Orderable = __decorate([
        core_1.Directive({ selector: '[orderable]' }), 
        __metadata('design:paramtypes', [])
    ], Orderable);
    return Orderable;
}());
exports.Orderable = Orderable;
//# sourceMappingURL=Orderable.js.map