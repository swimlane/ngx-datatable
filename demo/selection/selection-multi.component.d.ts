export declare class MultiSelectionComponent {
    rows: any[];
    selected: any[];
    columns: any[];
    constructor();
    fetch(cb: any): void;
    onSelect({ selected }: {
        selected: any;
    }): void;
    onActivate(event: any): void;
}
