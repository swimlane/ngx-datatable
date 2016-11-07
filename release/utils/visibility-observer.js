"use strict";
/**
 * Observes changes to an elements visibility.
 * https://medium.com/@amcdnl/javascript-s-new-intersectionobserver-cdce8a73bef8#.evn5twug3
 *
 * Example:
 *
 * 		var elm = document.getElementById("panda");
 * 	 	new VisibilityObserver(elm, function() {
 * 			alert('PAndas rock!');
 * 	  });
 *
 */
var VisibilityObserver = (function () {
    function VisibilityObserver(element, callback, zone) {
        this.callback = callback;
        /*
        // this is not working...
        if(window.IntersectionObserver) {
          this.observer = new IntersectionObserver(
            this.processChanges.bind(this), { threshold: [0.5] });
    
          this.observer.observe(element);
        } else { this.runPolyfill(element); }
        */
        this.runPolyfill(element, zone);
    }
    VisibilityObserver.prototype.runPolyfill = function (element, zone) {
        var _this = this;
        var checkVisibility = function () {
            var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width && height) {
                clearTimeout(_this.timeout);
                if (_this.callback) {
                    zone.run(_this.callback.bind(_this));
                }
            }
            else {
                clearTimeout(_this.timeout);
                zone.runOutsideAngular(function () {
                    _this.timeout = setTimeout(function () { return checkVisibility(); }, 50);
                });
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
        // Process any pending observations
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
                // Transitioned from hidden to visible
                element.visibleTimeout = setTimeout(_this.visibleTimerCallback.bind(_this), 1000, element, _this.observer);
            }
            else {
                // Transitioned from visible to hidden
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
//# sourceMappingURL=visibility-observer.js.map