export declare class VirtualScrollComponent {
    rows: any[];
    expanded: {};
    timeout: any;
    constructor();
    onPage(event: any): void;
    fetch(cb: any): void;
    getRowClass(row: any): {
        'age-is-ten': boolean;
    };
}
