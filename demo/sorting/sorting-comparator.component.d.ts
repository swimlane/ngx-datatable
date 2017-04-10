export declare class SortingComparatorComponent {
    rows: any[];
    columns: ({
        name: string;
        comparator: any;
    } | {
        name: string;
        sortable: boolean;
    })[];
    constructor();
    fetch(cb: any): void;
    companyComparator(propA: any, propB: any): 1 | -1;
}
