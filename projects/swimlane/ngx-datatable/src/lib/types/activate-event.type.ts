import { TableColumn } from './table-column.type';
import { TreeStatus } from '../components/body/body-cell.component';
import { RowOrGroup } from './group.type';

export interface ActivateEvent<TRow> {
  type: 'checkbox' | 'click' | 'dblclick' | 'keydown';
  event: Event;
  row: RowOrGroup<TRow>;
  group: TRow[];
  rowHeight: number;
  column: TableColumn;
  value: any;
  cellElement: HTMLElement;
  treeStatus?: TreeStatus;
}
