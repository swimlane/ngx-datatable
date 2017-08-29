export declare class RowGroupingComponent {
    table: any;
    funder: any[];
    calculated: any[];
    pending: any[];
    groups: any[];
    editing: {};
    rows: any[];
    constructor();
    fetch(cb: any): void;
    getGroupRowHeight(group: any, rowHeight: any): {};
    checkGroup(event: any, row: any, rowIndex: any, group: any): void;
    updateValue(event: any, cell: any, rowIndex: any): void;
    toggleExpandGroup(group: any): void;
    onDetailToggle(event: any): void;
}
