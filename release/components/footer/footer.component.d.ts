import { EventEmitter, TemplateRef } from '@angular/core';
export declare class DataTableFooterComponent {
    footerHeight: number;
    rowCount: number;
    pageSize: number;
    offset: number;
    pagerLeftArrowIcon: string;
    pagerRightArrowIcon: string;
    pagerPreviousIcon: string;
    pagerNextIcon: string;
    totalMessage: string;
    footerTemplate: TemplateRef<any>;
    selectedCount: number;
    selectedMessage: string | boolean;
    page: EventEmitter<any>;
    readonly isVisible: boolean;
    readonly curPage: number;
}
