import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * Directive that provides custom content for the summary row.
 * When applied, the summary row renders the provided template instead of
 * computing per-column aggregate values, enabling use cases like summary action bars.
 *
 * The row is rendered with sticky positioning at the top of the datatable body.
 *
 * @example
 * ```html
 * <ngx-datatable [rows]="rows" selectionType="checkbox" [(selected)]="selected">
 *   @if (selected.length) {
 *     <ng-template ngx-datatable-summary-row>
 *       <span>{{ selected.length }} selected</span>
 *       <button (click)="delete()">Delete</button>
 *     </ng-template>
 *   }
 * </ngx-datatable>
 * ```
 */
@Directive({
  selector: '[ngx-datatable-summary-row]'
})
export class DatatableSummaryRowDirective {
  readonly template = inject(TemplateRef<void>);
}
