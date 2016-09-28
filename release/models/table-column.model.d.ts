import { PipeTransform } from '@angular/core';
/**
 * Default Column Options
 * @type {object}
 */
export declare class TableColumn {
    static getProps(): string[];
    $$id: string;
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
    template: any;
    headerTemplate: any;
    constructor(props?: any);
}
