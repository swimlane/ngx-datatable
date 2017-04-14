import { TemplateRef } from '@angular/core';
import { TableColumnProp } from '../../types';
export declare class DataTableColumnDirective {
    name: string;
    prop: TableColumnProp;
    frozenLeft: any;
    frozenRight: any;
    flexGrow: number;
    resizeable: boolean;
    comparator: any;
    pipe: any;
    sortable: boolean;
    draggable: boolean;
    canAutoResize: boolean;
    minWidth: number;
    width: number;
    maxWidth: number;
    checkboxable: boolean;
    headerCheckboxable: boolean;
    headerClass: string | ((data: any) => string | any);
    cellClass: string | ((data: any) => string | any);
    cellTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
}
