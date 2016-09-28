import { SortDirection } from 'types/sort-direction.type';

export class Sort {

  prop: string;

  dir: SortDirection;

  constructor(props: any) {
    Object.assign(this, props);
  }

}
