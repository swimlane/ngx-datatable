"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
    }
    ProgressBarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'datatable-progress',
                    template: "\n    <div class=\"progress-linear\" role=\"progressbar\">\n      <div class=\"container\">\n        <div class=\"bar\"></div>\n      </div>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    ProgressBarComponent.ctorParameters = function () { return []; };
    return ProgressBarComponent;
}());
exports.ProgressBarComponent = ProgressBarComponent;
//# sourceMappingURL=progress-bar.component.js.map