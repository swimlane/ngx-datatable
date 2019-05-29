export declare class CheckboxSelectionComponent {
    rows: any[];
    selected: any[];
    constructor();
    fetch(cb: any): void;
    onSelect({ selected }: {
        selected: any;
    }): void;
    onActivate(event: any): void;
    add(): void;
    update(): void;
    remove(): void;
    displayCheck(row: any): boolean;
}
