import { TableColumn } from './table-column.type';
import { SortPropDir } from './sort-prop-dir.type';

export enum SortDirection {
  asc = 'asc',
  desc = 'desc'
}

export interface InnerSortEvent {
  column: TableColumn;
  prevValue: SortDirection;
  newValue: SortDirection;
}

export interface SortEvent extends InnerSortEvent {
  sorts: SortPropDir[];
}
