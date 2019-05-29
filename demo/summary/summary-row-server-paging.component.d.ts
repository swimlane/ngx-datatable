import { MockServerResultsService } from '../paging/mock-server-results-service';
import { CorporateEmployee } from '../paging/model/corporate-employee';
import { Page } from '../paging/model/page';
export declare class SummaryRowServerPagingComponent {
    private serverResultsService;
    page: Page;
    rows: CorporateEmployee[];
    columns: ({
        name: string;
        summaryFunc: (cells: any) => string;
    } | {
        name: string;
        summaryFunc: () => any;
    })[];
    constructor(serverResultsService: MockServerResultsService);
    ngOnInit(): void;
    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    setPage(pageInfo: any): void;
    getGenderSummary(): string;
}
