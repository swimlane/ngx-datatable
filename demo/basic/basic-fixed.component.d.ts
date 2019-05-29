export declare class BasicFixedComponent {
    rows: any[];
    columns: ({
        prop: string;
        name?: undefined;
    } | {
        name: string;
        prop?: undefined;
    })[];
    constructor();
    fetch(cb: any): void;
}
