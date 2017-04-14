export declare class BasicAutoComponent {
    rows: any[];
    loadingIndicator: boolean;
    reorderable: boolean;
    columns: ({
        prop: string;
    } | {
        name: string;
    })[];
    constructor();
    fetch(cb: any): void;
}
