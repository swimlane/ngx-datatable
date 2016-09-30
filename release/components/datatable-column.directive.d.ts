import { TemplateRef, QueryList } from '@angular/core';
export declare class DataTableColumn {
    templates: QueryList<TemplateRef<any>>;
    readonly hasHeaderTemplate: boolean;
    readonly headerTemplate: TemplateRef<any>;
    readonly cellTemplate: TemplateRef<any>;
}
