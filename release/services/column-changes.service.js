"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * service to make DatatableComponent aware of changes to
 * input bindings of DataTableColumnDirective
 */
var ColumnChangesService = /** @class */ (function () {
    function ColumnChangesService() {
        this.columnInputChanges = new rxjs_1.Subject();
    }
    Object.defineProperty(ColumnChangesService.prototype, "columnInputChanges$", {
        get: function () {
            return this.columnInputChanges.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ColumnChangesService.prototype.onInputChange = function () {
        this.columnInputChanges.next();
    };
    ColumnChangesService = __decorate([
        core_1.Injectable()
    ], ColumnChangesService);
    return ColumnChangesService;
}());
exports.ColumnChangesService = ColumnChangesService;
//# sourceMappingURL=column-changes.service.js.map