import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { RowIndex } from '../../types/internal.types';
import { columnsByPinArr, gridColumnTemplate } from '../../utils/column';
import { toInternalColumn } from '../../utils/column-helper';
import { DataTableBodyRowComponent } from './body-row.component';

describe('DataTableBodyRowComponent', () => {
  @Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DataTableBodyRowComponent],
    template: `
      <div style="display: grid" [style.grid-template-columns]="gridTemplate()">
        <datatable-body-row
          ariaRowCheckboxMessage=""
          [cssClasses]="{}"
          [rowHeight]="40"
          [rowIndex]="rowIndex()"
          [row]="row()"
          [columns]="columns()"
        />
      </div>
    `
  })
  class TestHostComponent {
    readonly rowIndex = signal<RowIndex>({ index: 0 });
    readonly row = signal<any>({ prop: 'value' });
    readonly columns = signal(toInternalColumn([{ prop: 'prop' }]));
    readonly gridTemplate = computed(() => gridColumnTemplate(columnsByPinArr(this.columns())));
  }

  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [ScrollbarHelper]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should apply odd/event without groups', async () => {
    component.rowIndex.set({ index: 0 });
    await fixture.whenStable();
    const element = fixture.debugElement.query(By.directive(DataTableBodyRowComponent))
      .nativeElement as HTMLElement;
    expect(element.classList).toContain('datatable-row-even');
    component.rowIndex.set({ index: 3 });
    await fixture.whenStable();
    expect(element.classList).toContain('datatable-row-odd');
  });

  it('should apply event odd/even if row is grouped', async () => {
    component.rowIndex.set({ index: 1, indexInGroup: 0 });
    await fixture.whenStable();
    const element = fixture.debugElement.query(By.directive(DataTableBodyRowComponent))
      .nativeElement as HTMLElement;
    expect(element.classList).toContain('datatable-row-even');
    component.rowIndex.set({ index: 666, indexInGroup: 3 });
    await fixture.whenStable();
    expect(element.classList).toContain('datatable-row-odd');
  });

  it('should enforce column minWidth via the shared grid track', async () => {
    component.columns.set(toInternalColumn([{ prop: 'prop', width: 50, minWidth: 500 }]));
    await fixture.whenStable();
    const cell = fixture.debugElement.query(By.css('datatable-body-cell'))
      .nativeElement as HTMLElement;
    expect(cell.offsetWidth).toBe(500);
  });

  it('should enforce column maxWidth via the shared grid track', async () => {
    component.columns.set(toInternalColumn([{ prop: 'prop', width: 50, maxWidth: 10 }]));
    await fixture.whenStable();
    const cell = fixture.debugElement.query(By.css('datatable-body-cell'))
      .nativeElement as HTMLElement;
    expect(cell.offsetWidth).toBe(10);
  });
});
