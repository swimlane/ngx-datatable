import { Observable } from 'rxjs';
import { RowOrGroup } from './group.type';

export interface RowDetailContext<TRow> {
  row: RowOrGroup<TRow>;
  expanded: boolean;
  rowIndex: number;
  disableRow$?: Observable<boolean>;
}
