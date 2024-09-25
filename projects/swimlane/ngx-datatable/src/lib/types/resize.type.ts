import { TableColumn } from './table-column.type';

export interface ColumnResizeEvent {
  column: TableColumn;
  prevValue: number;
  newValue: number;
}
