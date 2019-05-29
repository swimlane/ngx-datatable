import { ElementRef } from "@angular/core";
import { Observable } from "rxjs";
import { CorporateEmployee } from "./model/corporate-employee";
declare class PagedData<T> {
    data: T[];
}
/**
 * A server used to mock a paged data result from a server
 */
export declare class MockServerResultsService {
    getResults(offset: number, limit: number): Observable<PagedData<CorporateEmployee>>;
}
export declare class ServerScrollingComponent {
    private serverResultsService;
    private el;
    readonly headerHeight = 50;
    readonly rowHeight = 50;
    readonly pageLimit = 10;
    rows: CorporateEmployee[];
    isLoading: boolean;
    constructor(serverResultsService: MockServerResultsService, el: ElementRef);
    ngOnInit(): void;
    onScroll(offsetY: number): void;
    private loadPage;
}
export {};
