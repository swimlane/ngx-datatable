export declare class ColumnToggleComponent {
    rows: {
        name: string;
        gender: string;
        company: string;
    }[];
    columns: {
        name: string;
    }[];
    allColumns: {
        name: string;
    }[];
    toggle(col: any): void;
    isChecked(col: any): {
        name: string;
    };
}
