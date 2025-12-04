import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { RowIndex } from '../../types/internal.types';
import { TableColumn } from '../../types/table-column.type';
import { toInternalColumn } from '../../utils/column-helper';
import { DataTableBodyRowComponent } from './body-row.component';

describe('DataTableBodyRowComponent', () => {
  @Component({
    imports: [DataTableBodyRowComponent],
    template: `
      <datatable-body-row
        ariaRowCheckboxMessage=""
        cssClasses=""
        [rowHeight]="40"
        [rowIndex]="rowIndex()"
        [row]="row()"
        [columns]="columns()"
      />
    `
  })
  class TestHostComponent {
    readonly rowIndex = signal<RowIndex>({ index: 0 });
    readonly row = signal<any>({ prop: 'value' });
    readonly columns = signal<TableColumn[]>(toInternalColumn([{ prop: 'prop' }]));
  }

  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [ScrollbarHelper, provideZonelessChangeDetection()]
    });
  });

  beforeEach(async () => {
    await TestBed.compileComponents();
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
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
});
