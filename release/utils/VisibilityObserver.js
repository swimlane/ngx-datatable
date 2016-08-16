"use strict";
var VisibilityObserver = (function () {
    function VisibilityObserver(element, callback) {
        this.callback = callback;
        this.runPolyfill(element);
    }
    VisibilityObserver.prototype.runPolyfill = function (element) {
        var _this = this;
        var checkVisibility = function () {
            var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width && height) {
                if (_this.callback)
                    _this.callback();
            }
            else {
                setTimeout(function () { return checkVisibility(); }, 10);
            }
        };
        checkVisibility();
    };
    VisibilityObserver.prototype.isVisible = function (boundingClientRect, intersectionRect) {
        return ((intersectionRect.width * intersectionRect.height) /
            (boundingClientRect.width * boundingClientRect.height) >= 0.5);
    };
    VisibilityObserver.prototype.visibleTimerCallback = function (element, observer) {
        delete element.visibleTimeout;
        this.processChanges(observer.takeRecords());
        if ('isVisible' in element) {
            delete element.isVisible;
            if (this.callback)
                this.callback();
            observer.unobserve(element);
        }
    };
    VisibilityObserver.prototype.processChanges = function (changes) {
        var _this = this;
        changes.forEach(function (changeRecord) {
            var element = changeRecord.target;
            element.isVisible = _this.isVisible(changeRecord.boundingClientRect, changeRecord.intersectionRect);
            if ('isVisible' in element) {
                element.visibleTimeout = setTimeout(_this.visibleTimerCallback.bind(_this), 1000, element, _this.observer);
            }
            else {
                if ('visibleTimeout' in element) {
                    clearTimeout(element.visibleTimeout);
                    delete element.visibleTimeout;
                }
            }
        });
    };
    return VisibilityObserver;
}());
exports.VisibilityObserver = VisibilityObserver;
//# sourceMappingURL=VisibilityObserver.js.map