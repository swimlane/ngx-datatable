export declare class DarkThemeComponent {
    rows: any[];
    loadingIndicator: boolean;
    reorderable: boolean;
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
