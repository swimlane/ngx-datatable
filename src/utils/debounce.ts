export function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  return function() {
    context = this;
    args = arguments;
    timestamp = new Date();
    var later = function() {
      var last = new Date() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate)
          result = func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow)
      result = func.apply(context, args);
    return result;
  };
}

/**
 * Debounce decorator
 *
 *  class MyClass {
 *    debounceable(10)
 *    myFn() { ... }
 *  }
 */
export function debounceable (duration, immediate) {
  return function innerDecorator (target, key, descriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter () {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: debounce(descriptor.value, duration, immediate)
        });

        return this[key];
      }
    }
  }
}
