import { TemplateRef } from '@angular/core';
export declare class DataTableColumnDirective {
    name: string;
    prop: string;
    frozenLeft: any;
    frozenRight: any;
    flexGrow: number;
    resizeable: boolean;
    comparator: Function;
    pipe: any;
    sortable: boolean;
    draggable: boolean;
    canAutoResize: boolean;
    minWidth: number;
    width: number;
    maxWidth: number;
    checkboxable: boolean;
    headerCheckboxable: boolean;
    cellTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
}
