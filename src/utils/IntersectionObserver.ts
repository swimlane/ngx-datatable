export interface IntersectionObserver {
  root: HTMLElement;
  rootMargin: string;
  thresholds: Array<number>;
  disconnect: Function;
  observe: Function;
  takeRecords: Function;
  unobserve: Function;
}
