export declare class BasicAutoComponent {
    rows: any[];
    loadingIndicator: boolean;
    reorderable: boolean;
    columns: ({
        prop: string;
        name?: undefined;
        sortable?: undefined;
    } | {
        name: string;
        prop?: undefined;
        sortable?: undefined;
    } | {
        name: string;
        sortable: boolean;
        prop?: undefined;
    })[];
    constructor();
    fetch(cb: any): void;
}
