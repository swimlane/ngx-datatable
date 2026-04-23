import { ChangeDetectorRef, inputBinding, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TableColumn } from '../types/table-column.type';
import { DataTableBodyCellComponent } from './body/body-cell.component';
import { DataTableBodyRowComponent } from './body/body-row.component';
import { DatatableComponent } from './datatable.component';

interface TestRow {
  name: string;
}

describe('DatatableComponent change-detection inputs', () => {
  let fixture: ComponentFixture<DatatableComponent<TestRow>>;
  let rowsSig: WritableSignal<TestRow[]>;
  let checkRowListChanges: WritableSignal<boolean>;
  let checkRowPropertyChanges: WritableSignal<boolean>;

  const renderedRowCount = () =>
    fixture.debugElement.queryAll(By.directive(DataTableBodyRowComponent)).length;

  const cellText = (rowIndex: number, columnIndex: number) => {
    const bodyRow = fixture.debugElement.queryAll(By.directive(DataTableBodyRowComponent))[
      rowIndex
    ];
    const bodyCell = bodyRow.queryAll(By.directive(DataTableBodyCellComponent))[columnIndex];
    return (bodyCell.nativeElement as HTMLElement).textContent?.trim();
  };

  beforeEach(async () => {
    const columnsSig = signal<TableColumn[]>([{ name: 'Name', prop: 'name' }]);
    rowsSig = signal<TestRow[]>([{ name: 'Ada' }, { name: 'Grace' }]);
    checkRowListChanges = signal(true);
    checkRowPropertyChanges = signal(true);

    fixture = TestBed.createComponent(DatatableComponent<TestRow>, {
      bindings: [
        inputBinding('columns', columnsSig),
        inputBinding('rows', rowsSig),
        inputBinding('checkRowListChanges', checkRowListChanges),
        inputBinding('checkRowPropertyChanges', checkRowPropertyChanges)
      ]
    });
    await fixture.whenStable();
  });

  describe('checkRowListChanges', () => {
    it('renders rows appended in place when enabled (default)', async () => {
      expect(renderedRowCount()).toBe(2);

      // Mutate the rows array in place – same reference, new item appended.
      rowsSig().push({ name: 'Hedy' });
      // The in-place push leaves all signal references untouched, so
      // nothing dirties the OnPush datatable on its own. Marking it
      // dirty manually triggers its `ngDoCheck`, which is what runs the
      // IterableDiffer.
      fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
      await fixture.whenStable();

      expect(renderedRowCount()).toBe(3);
    });

    it('does not render rows appended in place when disabled', async () => {
      checkRowListChanges.set(false);
      await fixture.whenStable();
      expect(renderedRowCount()).toBe(2);

      rowsSig().push({ name: 'Hedy' });
      fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
      await fixture.whenStable();

      // Row count stays at 2: the IterableDiffer is never consulted, so
      // the in-place push is invisible to the table.
      expect(renderedRowCount()).toBe(2);
    });
  });

  describe('checkRowPropertyChanges', () => {
    it('renders property mutations on an existing row when enabled (default)', async () => {
      expect(cellText(0, 0)).toBe('Ada');

      // Mutate a property on the existing row object – same reference.
      rowsSig()[0].name = 'Ada Lovelace';
      // Re-emit the rows signal with a new array reference so the table's
      // body-row is visited during CD; the per-row KeyValueDiffer then
      // detects the in-place property change and marks the row for update.
      rowsSig.set(rowsSig().slice());
      await fixture.whenStable();

      expect(cellText(0, 0)).toBe('Ada Lovelace');
    });

    it('does not render property mutations on an existing row when disabled', async () => {
      checkRowPropertyChanges.set(false);
      await fixture.whenStable();
      expect(cellText(0, 0)).toBe('Ada');

      rowsSig()[0].name = 'Ada Lovelace';
      rowsSig.set(rowsSig().slice());
      await fixture.whenStable();

      // Old cell text is still rendered: the per-row KeyValueDiffer is
      // never consulted, so the in-place mutation is invisible.
      expect(cellText(0, 0)).toBe('Ada');
    });
  });
});
