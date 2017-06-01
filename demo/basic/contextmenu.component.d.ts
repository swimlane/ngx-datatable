export declare class ContextMenuDemoComponent {
    rows: any[];
    columns: ({
        prop: string;
    } | {
        name: string;
    })[];
    rawEvent: MouseEvent;
    contextmenuRow: any;
    contextmenuColumn: any;
    constructor();
    onTableContextMenu(contextMenuEvent: any): void;
    fetch(cb: any): void;
}
