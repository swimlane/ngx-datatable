export interface IntersectionObserver {
  root: HTMLElement;
  rootMargin: string;
  thresholds: Array<number>;
  disconnect: Function;
  observe: Function;
  takeRecords: Function;
  unobserve: Function;
}


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
export class VisibilityObserver {

  observer: IntersectionObserver;
  callback: any;

  constructor(element, callback) {
    this.callback = callback;

    /*
    // this is not working...
    if(window.IntersectionObserver) {
      this.observer = new IntersectionObserver(
        this.processChanges.bind(this), { threshold: [0.5] });

      this.observer.observe(element);
    } else { this.runPolyfill(element); }
    */

   this.runPolyfill(element);
  }

  runPolyfill(element) {
    let checkVisibility = () => {
      const { width, height } = element.getBoundingClientRect();

      if (width && height) {
        this.callback && this.callback();
      } else {
        setTimeout(() => checkVisibility(), 10);
      }
    };

    checkVisibility();
  }

  isVisible(boundingClientRect, intersectionRect) {
    return ((intersectionRect.width * intersectionRect.height) /
            (boundingClientRect.width * boundingClientRect.height) >= 0.5);
  }

  visibleTimerCallback(element, observer) {
    delete element.visibleTimeout;

    // Process any pending observations
    this.processChanges(observer.takeRecords());

    if ('isVisible' in element) {
      delete element.isVisible;
      this.callback && this.callback();
      observer.unobserve(element);
    }
  }

  processChanges(changes) {
    changes.forEach((changeRecord) => {
      let element = changeRecord.target;

      element.isVisible = this.isVisible(
        changeRecord.boundingClientRect,
        changeRecord.intersectionRect);

      if ('isVisible' in element) {
        // Transitioned from hidden to visible
        element.visibleTimeout = setTimeout(
          this.visibleTimerCallback.bind(this),
          1000,
          element,
          this.observer);
      } else {
        // Transitioned from visible to hidden
        if ('visibleTimeout' in element) {
          clearTimeout(element.visibleTimeout);
          delete element.visibleTimeout;
        }
      }
    });
  }

}
