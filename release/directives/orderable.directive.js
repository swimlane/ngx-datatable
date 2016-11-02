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
var draggable_directive_1 = require('./draggable.directive');
var OrderableDirective = (function () {
    function OrderableDirective(differs) {
        this.reorder = new core_1.EventEmitter();
        this.differ = differs.find({}).create(null);
    }
    OrderableDirective.prototype.ngAfterContentInit = function () {
        // HACK: Investigate Better Way
        this.updateSubscriptions();
        this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
    };
    OrderableDirective.prototype.ngOnDestroy = function () {
        this.draggables.forEach(function (d) {
            d.dragStart.unsubscribe();
            d.dragEnd.unsubscribe();
        });
    };
    OrderableDirective.prototype.updateSubscriptions = function () {
        var _this = this;
        var diffs = this.differ.diff(this.draggables.toArray());
        if (diffs) {
            var sub = function (_a) {
                var currentValue = _a.currentValue;
                currentValue.dragStart.subscribe(_this.onDragStart.bind(_this));
                currentValue.dragEnd.subscribe(_this.onDragEnd.bind(_this));
            };
            diffs.forEachAddedItem(sub.bind(this));
            diffs.forEachChangedItem(sub.bind(this));
            diffs.forEachRemovedItem(function (_a) {
                var previousValue = _a.previousValue;
                previousValue.dragStart.unsubscribe();
                previousValue.dragEnd.unsubscribe();
            });
        }
    };
    OrderableDirective.prototype.onDragStart = function () {
        this.positions = {};
        var i = 0;
        for (var _i = 0, _a = this.draggables.toArray(); _i < _a.length; _i++) {
            var dragger = _a[_i];
            var elm = dragger.element;
            this.positions[dragger.dragModel.prop] = {
                left: parseInt(elm.offsetLeft.toString(), 0),
                index: i++
            };
        }
    };
    OrderableDirective.prototype.onDragEnd = function (_a) {
        var element = _a.element, model = _a.model;
        var newPos = parseInt(element.offsetLeft.toString(), 0);
        var prevPos = this.positions[model.prop];
        var i = 0;
        for (var prop in this.positions) {
            var pos = this.positions[prop];
            var movedLeft = newPos < pos.left && prevPos.left > pos.left;
            var movedRight = newPos > pos.left && prevPos.left < pos.left;
            if (movedLeft || movedRight) {
                this.reorder.emit({
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
    ], OrderableDirective.prototype, "reorder", void 0);
    __decorate([
        core_1.ContentChildren(draggable_directive_1.DraggableDirective, { descendants: true }), 
        __metadata('design:type', core_1.QueryList)
    ], OrderableDirective.prototype, "draggables", void 0);
    OrderableDirective = __decorate([
        core_1.Directive({ selector: '[orderable]' }), 
        __metadata('design:paramtypes', [core_1.KeyValueDiffers])
    ], OrderableDirective);
    return OrderableDirective;
}());
exports.OrderableDirective = OrderableDirective;
//# sourceMappingURL=orderable.directive.js.map