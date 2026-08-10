import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  effect,
  ElementRef,
  inject,
  InjectionToken,
  Injector,
  input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { RowOrGroup } from '../../types/public.types';

/**
 * This component is passed as ng-template and rendered by BodyComponent.
 * BodyComponent uses rowDefInternal to first inject actual row template.
 * This component will render that actual row template.
 */
@Component({
  selector: 'datatable-row-def',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `@if (rowDef.rowDefInternal().rowTemplate) {
    <ng-container
      [ngTemplateOutlet]="rowDef.rowDefInternal().rowTemplate"
      [ngTemplateOutletContext]="rowContext"
    />
  }`,
  styleUrl: './body-row-def.component.scss'
})
export class DatatableRowDefComponent {
  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  rowDef = inject(ROW_DEF_TOKEN);
  rowContext = {
    ...this.rowDef.rowDefInternal(),
    disabled: this.rowDef.rowDefInternalDisabled()
  };

  /**
   * When `true`, clones of this row get the measured column widths stamped onto them.
   * The clone is detached from the table grid, it has no parent tracks to inherit.
   */
  readonly preserveColumnWidthsOnClone = input(false, { transform: booleanAttribute });

  constructor() {
    effect(onCleanup => {
      if (!this.preserveColumnWidthsOnClone()) {
        return;
      }
      const originalCloneNode = this.host.cloneNode;
      this.host.cloneNode = (deep?: boolean) => {
        const clone = originalCloneNode.call(this.host, deep) as HTMLElement;
        const gridTemplateColumns = this.measureGridTemplateColumns();
        if (gridTemplateColumns) {
          clone.style.gridTemplateColumns = gridTemplateColumns;
        }
        return clone;
      };
      onCleanup(() => (this.host.cloneNode = originalCloneNode));
    });
  }

  private measureGridTemplateColumns(): string {
    const cells = this.host.querySelectorAll<HTMLElement>('datatable-body-cell');
    return Array.from(cells)
      .map(cell => `${cell.getBoundingClientRect().width}px`)
      .join(' ');
  }
}

@Directive({
  selector: '[rowDef]'
})
export class DatatableRowDefDirective {
  static ngTemplateContextGuard(
    _dir: DatatableRowDefDirective,
    ctx: unknown
  ): ctx is RowDefContext {
    return true;
  }
}

/**
 * @internal To be used internally by ngx-datatable.
 */
@Directive({
  selector: '[rowDefInternal]'
})
export class DatatableRowDefInternalDirective implements OnInit {
  vc = inject(ViewContainerRef);

  readonly rowDefInternal = input.required<RowDefContext>();
  readonly rowDefInternalDisabled = input<boolean>();

  ngOnInit(): void {
    this.vc.createEmbeddedView(
      this.rowDefInternal().template,
      {
        ...this.rowDefInternal()
      },
      {
        injector: Injector.create({
          providers: [
            {
              provide: ROW_DEF_TOKEN,
              useValue: this
            }
          ]
        })
      }
    );
  }
}
const ROW_DEF_TOKEN = new InjectionToken<DatatableRowDefInternalDirective>('RowDef');
interface RowDefContext {
  template: TemplateRef<unknown>;
  rowTemplate: TemplateRef<unknown>;
  row: RowOrGroup<unknown>;
  index: number;
}
