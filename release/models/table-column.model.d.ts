import { PipeTransform } from '@angular/core';
/**
 * Default Column Options
 * @type {object}
 */
export declare class TableColumn {
    $$id: string;
    $$oldWidth: number;
    isExpressive: boolean;
    frozenLeft: boolean;
    frozenRight: boolean;
    flexGrow: number;
    minWidth: number;
    maxWidth: number;
    width: number;
    resizeable: boolean;
    comparator: any;
    pipe: PipeTransform;
    sortable: boolean;
    draggable: boolean;
    canAutoResize: boolean;
    name: string;
    prop: string;
    cellTemplate: any;
    headerTemplate: any;
    private _width;
    private _minWidth;
    constructor(props?: any);
}
