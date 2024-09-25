import { TableColumn } from './table-column.type';
import { SortDirection } from './sort-direction.type';
import { ActivateEvent } from './activate-event.type';
import { TreeStatus } from '../components/body/body-cell.component';
import { Observable } from 'rxjs';
import { RowOrGroup } from './group.type';

export interface HeaderCellContext {
  column: TableColumn;
  sortDir: SortDirection | 'asc' | 'desc';
  sortFn: () => void;
  allRowsSelected: boolean;
  selectFn: () => void;
}

export interface GroupContext<TRow> {
  group: RowOrGroup<TRow>;
  expanded: boolean;
  rowIndex: number;
}

export interface CellContext<TRow> {
  onCheckboxChangeFn: (event: Event) => void;
  activateFn: (event: ActivateEvent<TRow>) => void;
  row: RowOrGroup<TRow>;
  group: TRow[];
  value: any;
  column: TableColumn;
  rowHeight: number;
  isSelected: boolean;
  rowIndex: number;
  treeStatus: TreeStatus;
  disable$: Observable<boolean>;
  onTreeAction: () => void;
  expanded?: boolean;
}
