import { TemplateRef, QueryList } from '@angular/core';
export declare class DataTableColumn {
    name: any;
    prop: any;
    isExpressive: any;
    frozenLeft: any;
    frozenRight: any;
    flexGrow: any;
    resizeable: any;
    comparator: any;
    pipe: any;
    sortable: any;
    draggable: any;
    canAutoResize: any;
    minWidth: any;
    width: any;
    maxWidth: any;
    templates: QueryList<TemplateRef<any>>;
    readonly hasHeaderTemplate: boolean;
    readonly headerTemplate: TemplateRef<any>;
    readonly cellTemplate: TemplateRef<any>;
}
