export declare class SummaryRowSimpleComponent {
    rows: any[];
    columns: ({
        name: string;
        summaryFunc: (cells: any) => string;
        prop?: undefined;
    } | {
        prop: string;
        summaryFunc: (cells: any) => number;
        name?: undefined;
    })[];
    enableSummary: boolean;
    summaryPosition: string;
    constructor();
    fetch(cb: any): void;
    onSummaryStateChange(a: any): void;
    private summaryForGender;
    private avgAge;
}
