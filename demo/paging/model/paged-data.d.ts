import { Page } from "./page";
/**
 * An array of data with an associated page object used for paging
 */
export declare class PagedData<T> {
    data: T[];
    page: Page;
}
