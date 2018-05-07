import { OnInit, TemplateRef } from '@angular/core';
export declare class SummaryRowCustomTemplateComponent implements OnInit {
    rows: any[];
    nameSummaryCell: TemplateRef<any>;
    columns: any[];
    constructor();
    ngOnInit(): void;
    fetch(cb: any): void;
    getNames(): string[];
    private summaryForGender(cells);
    private avgAge(cells);
}
