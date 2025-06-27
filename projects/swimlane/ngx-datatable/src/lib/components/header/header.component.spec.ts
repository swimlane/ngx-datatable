import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableHeaderComponent } from './header.component';
import { TableColumnInternal } from '../../types/internal.types';

describe('DataTableHeaderComponent', () => {
  let component: DataTableHeaderComponent;
  let fixture: ComponentFixture<DataTableHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataTableHeaderComponent]
    });
    fixture = TestBed.createComponent(DataTableHeaderComponent);
    component = fixture.componentInstance;
  });

  it('should not show resize handle for last column', () => {
    const columns = [createColumn('a'), createColumn('b'), createColumn('c')];
    component.columns = columns;
    fixture.detectChanges();

    const lastId = component.lastColumnId();
    expect(lastId).toBe('c');

    // Query all header cells
    const headerCells: NodeList = fixture.nativeElement.querySelectorAll('datatable-header-cell');
    expect(headerCells.length).toBe(3);

    columns.forEach((col, idx) => {
      const showResizeHandle = lastId !== col.$$id && col.resizeable;
      const hasResizeHandle = !!(headerCells[idx] as Element).querySelector('.resize-handle');
      if (col.$$id === 'c') {
        // Last column, should not have resize handle
        expect(hasResizeHandle).toBeFalse();
        expect(showResizeHandle).toBeFalse();
      } else {
        expect(showResizeHandle).toBeTrue();
        expect(hasResizeHandle).toBeTrue();
      }
    });
  });

  it('should show resize handle only if resizeable is true', () => {
    const columns = [createColumn('a', true), createColumn('b', false), createColumn('c', true)];
    component.columns = columns;
    fixture.detectChanges();

    const lastId = component.lastColumnId();
    expect(lastId).toBe('c');

    // Query all header cells
    const headerCells: NodeList = fixture.nativeElement.querySelectorAll('datatable-header-cell');
    expect(headerCells.length).toBe(3);

    columns.forEach((col, idx) => {
      const showResizeHandle = !!(lastId !== col.$$id && col.resizeable);
      const hasResizeHandle = !!(headerCells[idx] as Element).querySelector('.resize-handle');
      expect(hasResizeHandle).toBe(showResizeHandle);
    });
    expect(lastId !== columns[0].$$id && columns[0].resizeable).toBeTrue();
    expect(lastId !== columns[1].$$id && columns[1].resizeable).toBeFalse();
    expect(lastId !== columns[2].$$id && columns[2].resizeable).toBeFalse();
  });

  it('should handle single column (no resize handle)', () => {
    const columns = [createColumn('only')];
    component.columns = columns;
    fixture.detectChanges();

    const lastId = component.lastColumnId();
    expect(lastId).toBe('only');

    // Query all header cells
    const headerCells: NodeList = fixture.nativeElement.querySelectorAll('datatable-header-cell');
    expect(headerCells.length).toBe(1); // Only one column

    const hasResizeHandle = !!(headerCells[0] as Element).querySelector('.resize-handle');
    expect(hasResizeHandle).toBeFalse(); // No resize handle for single column
    expect(lastId !== columns[0].$$id && columns[0].resizeable).toBeFalse();
  });
});

function createColumn(id: string, resizeable = true): TableColumnInternal {
  return {
    $$id: id,
    prop: id,
    draggable: true,
    dragging: false,
    resizeable,
    width: 100,
    minWidth: 50,
    maxWidth: 200,
    isTarget: false
  } as any;
}
