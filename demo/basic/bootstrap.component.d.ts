export declare class BootstrapThemeComponent {
    rows: any[];
    loadingIndicator: boolean;
    reorderable: boolean;
    columns: ({
        prop: string;
        summaryFunc: () => any;
        name?: undefined;
    } | {
        name: string;
        summaryFunc: (cells: any) => string;
        prop?: undefined;
    } | {
        name: string;
        summaryFunc: () => any;
        prop?: undefined;
    })[];
    constructor();
    fetch(cb: any): void;
    private summaryForGender;
}
