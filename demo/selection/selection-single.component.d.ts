export declare class SingleSelectionComponent {
    rows: any[];
    selected: any[];
    columns: any[];
    constructor();
    fetch(cb: any): void;
    onSelect({selected}: {
        selected: any;
    }): void;
    onActivate(event: any): void;
}
