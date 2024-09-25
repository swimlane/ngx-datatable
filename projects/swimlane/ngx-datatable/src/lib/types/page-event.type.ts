export interface PageEvent {
  count: number;
  pageSize: number;
  limit: number;
  offset: number;
}

export interface BodyPageEvent {
  offset: number;
}

export interface PagerPageEvent {
  page: number;
}
