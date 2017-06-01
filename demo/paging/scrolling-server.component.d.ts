import { MockServerResultsService } from "./mock-server-results-service";
import { CorporateEmployee } from "./model/corporate-employee";
import { Page } from "./model/page";
export declare class ServerScrollingComponent {
    private serverResultsService;
    lastPage: Page;
    rows: CorporateEmployee[];
    constructor(serverResultsService: MockServerResultsService);
    ngOnInit(): void;
    onPage(pageNumber: number): void;
    /**
     * Populate the table with new data based on the page number
     * @param pageNumber The page number to add
     */
    addPage(pageNumber: number): void;
}
