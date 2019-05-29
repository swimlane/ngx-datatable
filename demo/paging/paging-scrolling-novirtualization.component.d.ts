import { MockServerResultsService } from "./mock-server-results-service";
import { CorporateEmployee } from "./model/corporate-employee";
import { Page } from "./model/page";
export declare class PagingScrollingNoVirtualizationComponent {
    private serverResultsService;
    page: Page;
    rows: CorporateEmployee[];
    constructor(serverResultsService: MockServerResultsService);
    ngOnInit(): void;
    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    setPage(pageInfo: any): void;
}
