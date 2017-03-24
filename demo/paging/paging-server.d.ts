export declare class ServerPagingComponent {
    rows: any[];
    count: number;
    offset: number;
    limit: number;
    ngOnInit(): void;
    page(offset: any, limit: any): void;
    fetch(cb: any): void;
    onPage(event: any): void;
}
