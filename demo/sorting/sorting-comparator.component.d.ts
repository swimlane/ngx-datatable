export declare class SortingComparatorComponent {
    rows: any[];
    columns: ({
        name: string;
        comparator: any;
        sortable?: undefined;
    } | {
        name: string;
        sortable: boolean;
        comparator?: undefined;
    })[];
    constructor();
    fetch(cb: any): void;
    companyComparator(propA: any, propB: any): 1 | -1;
}
