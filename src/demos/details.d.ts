import { TableOptions } from 'angular2-data-table';
import '../themes/material.scss';
export declare class App {
    rows: any[];
    expanded: {};
    options: TableOptions;
    constructor();
    fetch(cb: any): void;
}
