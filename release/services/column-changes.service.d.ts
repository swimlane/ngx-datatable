import { Observable } from 'rxjs';
/**
 * service to make DatatableComponent aware of changes to
 * input bindings of DataTableColumnDirective
 */
export declare class ColumnChangesService {
    private columnInputChanges;
    readonly columnInputChanges$: Observable<undefined>;
    onInputChange(): void;
}
