// Extra variables that live on Global that
// will be replaced by webpack DefinePlugin
declare var ENV: string;
declare var APP_VERSION: string;
declare var IS_PRODUCTION: boolean;
declare var HMR: boolean;

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

// HACK: This is only for demo page hmr
interface AppWindow {
  state: any;
}

interface Window extends AppWindow {}

interface ErrorConstructor extends ErrorStackTraceLimit {}

interface IntersectionObserver {
  root: HTMLElement;
  rootMargin: string;
  thresholds: Array<number>;
  disconnect: Function;
  observe: Function;
  takeRecords: Function;
  unobserve: Function;
}
