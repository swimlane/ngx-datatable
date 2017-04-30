import { Observable } from "rxjs";
import { PagedData } from "./model/paged-data";
import { CorporateEmployee } from "./model/corporate-employee";
import { Page } from "./model/page";
/**
 * A server used to mock a paged data result from a server
 */
export declare class MockServerResultsService {
    /**
     * A method that mocks a paged server response
     * @param page The selected page
     * @returns {any} An observable containing the employee data
     */
    getResults(page: Page): Observable<PagedData<CorporateEmployee>>;
    /**
     * Package companyData into a PagedData object based on the selected Page
     * @param page The page data used to get the selected data from companyData
     * @returns {PagedData<CorporateEmployee>} An array of the selected data and page
     */
    private getPagedData(page);
}
