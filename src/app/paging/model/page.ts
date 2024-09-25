/**
 * An object used to get page information from the server
 */
export interface Page {
  // The number of elements in the page
  size: number;
  // The total number of elements
  totalElements: number;
  // The total number of pages
  totalPages: number;
  // The current page number
  pageNumber: number;
}
