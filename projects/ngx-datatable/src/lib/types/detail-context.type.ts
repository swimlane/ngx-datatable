import { Observable } from 'rxjs';

export interface RowDetailContext<TRow> {
  row: TRow;
  expanded: boolean;
  rowIndex: number;
  disableRow$?: Observable<boolean>
}
