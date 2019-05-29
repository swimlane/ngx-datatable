import { ChangeDetectorRef } from '@angular/core';
export declare class FullScreenTreeComponent {
    private cd;
    rows: any[];
    lastIndex: number;
    constructor(cd: ChangeDetectorRef);
    fetch(cb: any): void;
    onTreeAction(event: any): void;
}
