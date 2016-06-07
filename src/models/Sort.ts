import { SortDirection } from './SortDirection';

export class Sort {

  prop: string;

  dir: SortDirection;

  constructor(props: any) {
    Object.assign(this, props);
  }

}
