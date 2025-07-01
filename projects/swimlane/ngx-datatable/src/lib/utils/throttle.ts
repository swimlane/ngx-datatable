/**
 * Throttle a function
 */
export const throttle = (func: any, wait: number, options?: any) => {
  options = options || {};
  let args: any;
  let result: any;
  let timeout: any = null;
  let previous = 0;

  const later = () => {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    result = func(...args);
  };

  return (...argsNew: any[]) => {
    const now = +new Date();

    if (!previous && options.leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);
    args = argsNew;

    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func(...args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
};

/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
export const throttleable = (duration: number, options?: any) => {
  return (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function () {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: throttle(descriptor.value.bind(this), duration, options)
        });

        return (this as any)[key];
      }
    };
  };
};
