/**
 * Throttle a function
 *
 * @export
 * @param {*} func
 * @param {number} wait
 * @param {*} [options]
 * @returns
 */
export declare function throttle(func: any, wait: number, options?: any): () => any;
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 *
 * @export
 * @param {number} duration
 * @param {*} [options]
 * @returns
 */
export declare function throttleable(duration: number, options?: any): (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => {
    configurable: boolean;
    enumerable: boolean;
    get: () => any;
};
