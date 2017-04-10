export declare class ServerSortingComponent {
    loading: boolean;
    rows: any[];
    columns: {
        name: string;
        sortable: boolean;
    }[];
    constructor();
    fetch(cb: any): void;
    onSort(event: any): void;
}
