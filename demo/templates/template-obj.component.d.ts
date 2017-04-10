import { TemplateRef } from '@angular/core';
export declare class TemplateRefTemplatesComponent {
    editTmpl: TemplateRef<any>;
    hdrTpl: TemplateRef<any>;
    rows: any[];
    columns: any[];
    constructor();
    ngOnInit(): void;
    fetch(cb: any): void;
}
