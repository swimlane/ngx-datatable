import { SortDirection } from './SortDirection';

export class Sort {

  prop: string;

  dir: SortDirection;

  constructor(props) {
    Object.assign(this, props);
  }

}
