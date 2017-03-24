export declare class BasicAutoComponent {
    rows: any[];
    loadingIndicator: boolean;
    columns: ({
        prop: string;
    } | {
        name: string;
    })[];
    constructor();
    fetch(cb: any): void;
}
