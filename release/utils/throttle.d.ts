/**
 * Throttle a function
 */
export declare function throttle(func: any, wait: number, options?: any): (this: any) => any;
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
export declare function throttleable(duration: number, options?: any): (target: any, key: string | number | symbol, descriptor: PropertyDescriptor) => {
    configurable: boolean;
    enumerable: boolean;
    get: () => any;
};
