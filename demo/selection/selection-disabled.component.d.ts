export declare class MultiDisableSelectionComponent {
    rows: any[];
    selected: any[];
    columns: any[];
    constructor();
    fetch(cb: any): void;
    onSelect({ selected }: {
        selected: any;
    }): void;
    onActivate(event: any): void;
    checkSelectable(event: any): boolean;
}
