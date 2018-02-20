export declare class ContextMenuDemoComponent {
    rows: any[];
    columns: ({
        prop: string;
        name?: undefined;
    } | {
        name: string;
        prop?: undefined;
    })[];
    rawEvent: any;
    contextmenuRow: any;
    contextmenuColumn: any;
    constructor();
    onTableContextMenu(contextMenuEvent: any): void;
    fetch(cb: any): void;
}
