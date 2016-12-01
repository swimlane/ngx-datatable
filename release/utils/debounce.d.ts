
/**
 * Debounce a function
 * @param  {any}     func      function to executoe
 * @param  {number}  wait      wait duration
 * @param  {boolean} immediate wait or immediate executue
 */
export declare function debounce(func: Function, wait: number, immediate?: boolean): () => any;
/**
 * Debounce decorator
 *
 *  class MyClass {
 *    debounceable(10)
 *    myFn() { ... }
 *  }
 */
export declare function debounceable(duration: number, immediate?: boolean): (target: Function, key: string, descriptor: any) => {
    configurable: boolean;
    enumerable: any;
    get: () => any;
};
