import { TemplateRef, ViewContainerRef, SimpleChange } from '@angular/core';
export declare class TemplateWrapper {
    private viewContainer;
    templateWrapper: TemplateRef<any>;
    value: any;
    row: any;
    column: any;
    private embeddedViewRef;
    constructor(viewContainer: ViewContainerRef);
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
