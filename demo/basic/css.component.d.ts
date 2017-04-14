export declare class RowCssComponent {
    rows: any[];
    expanded: {};
    timeout: any;
    constructor();
    fetch(cb: any): void;
    getRowClass(row: any): {
        'age-is-ten': boolean;
    };
    getCellClass({row, column, value}: {
        row: any;
        column: any;
        value: any;
    }): any;
}
