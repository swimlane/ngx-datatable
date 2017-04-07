import { Component, ChangeDetectionStrategy } from '@angular/core';
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
    }
    return ProgressBarComponent;
}());
export { ProgressBarComponent };
ProgressBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'datatable-progress',
                template: "\n    <div class=\"progress-linear\" role=\"progressbar\">\n      <div class=\"container\">\n        <div class=\"bar\"></div>\n      </div>\n    </div>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ProgressBarComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=progress-bar.component.js.map