export declare class LiveDataComponent {
    count: number;
    rows: any[];
    active: boolean;
    temp: any[];
    cols: any;
    constructor();
    randomNum(start: number, end: number): number;
    start(): void;
    stop(): void;
    add(): void;
    remove(): void;
    updateRandom(): void;
    fetch(cb: any): void;
}
