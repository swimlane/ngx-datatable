export declare class ContextMenuDemoComponent {
    rows: any[];
    columns: ({
        prop: string;
    } | {
        name: string;
    })[];
    rawEvent: MouseEvent;
    contextmenuRow: any;
    constructor();
    onContextMenu(contextMenuEvent: any): void;
    fetch(cb: any): void;
}
