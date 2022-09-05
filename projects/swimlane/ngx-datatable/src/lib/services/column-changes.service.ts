import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

/**
 * service to make DatatableComponent aware of changes to
 * input bindings of DataTableColumnDirective
 */
@Injectable()
export class ColumnChangesService {
  private columnInputChanges = new Subject<void>();

  get columnInputChanges$(): Observable<void> {
    return this.columnInputChanges.asObservable();
  }

  onInputChange(): void {
    this.columnInputChanges.next();
  }
}
