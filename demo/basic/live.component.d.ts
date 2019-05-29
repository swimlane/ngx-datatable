import { ChangeDetectorRef } from '@angular/core';
export declare class LiveDataComponent {
    private cd;
    mydatatable: any;
    count: number;
    rows: any[];
    active: boolean;
    temp: any[];
    cols: any;
    constructor(cd: ChangeDetectorRef);
    randomNum(start: number, end: number): number;
    start(): void;
    stop(): void;
    add(): void;
    remove(): void;
    updateRandom(): void;
    fetch(cb: any): void;
}
