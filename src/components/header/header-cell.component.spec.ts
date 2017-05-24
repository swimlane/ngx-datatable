import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectionType } from '../../types/selection.type';
import { SortDirection } from '../../types/sort-direction.type';
import { SortType } from '../../types/sort.type';
import { TableColumn } from '../../types/table-column.type';

import { DataTableHeaderCellComponent } from './index';

describe('DataTableHeaderCellComponent', () => {
  let fixture: ComponentFixture<DataTableHeaderCellComponent>;
  let component: DataTableHeaderCellComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataTableHeaderCellComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableHeaderCellComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('should apply proper css classes using columnCssClasses()', () => {
    it('should only apply datatable-header-cell class by default', () => {
      expect(component.columnCssClasses).toEqual('datatable-header-cell');
    });

    it('should apply default and sortable class if sortable is true', () => {
      const columns: TableColumn[] = [
        {
          sortable: true
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.columnCssClasses).toEqual('datatable-header-cell sortable');
    });

    it('should apply default and resizeable class if resizeable is true', () => {
      const columns: TableColumn[] = [
        {
          resizeable: true
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.columnCssClasses).toEqual('datatable-header-cell resizeable');
    });

    it('should apply default, sortable, and resizeable', () => {
      const columns: TableColumn[] = [
        {
          sortable: true,
          resizeable: true
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.columnCssClasses).toEqual('datatable-header-cell sortable resizeable');
    });

    it('should apply default, sortable, risizeable, utilizing headerClass as empty', () => {
      const columns: TableColumn[] = [
        {
          sortable: true,
          resizeable: true,
          headerClass: ''
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.columnCssClasses).toEqual('datatable-header-cell sortable resizeable');
    });

    it('should apply default, sortable, risizeable, utilizing headerClass as string', () => {
      const columns: TableColumn[] = [
        {
          sortable: true,
          resizeable: true,
          headerClass: 'foo'
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.columnCssClasses).toEqual('datatable-header-cell sortable resizeable foo');
    });

    it('should apply default, sortable, risizeable, utilizing headerClass as function', () => {
      const columns: TableColumn[] = [
        {
          sortable: true,
          resizeable: true,
          headerClass: () => {
            return ' foo-function';
          }
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.columnCssClasses).toEqual('datatable-header-cell sortable resizeable foo-function');
    });

    it('should apply default, sortable, risizeable, utilizing headerClass as function returning object', () => {
      const columns: TableColumn[] = [
        {
          sortable: true,
          resizeable: true,
          headerClass: () => {
            return {fooObject: true};
          }
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.columnCssClasses).toEqual('datatable-header-cell sortable resizeable fooObject');
    });

    it('should apply default and sortDir classes ascending', () => {
      component.sortDir = SortDirection.asc;

      const columns: TableColumn[] = [{}];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.columnCssClasses).toEqual('datatable-header-cell sort-active sort-asc');
    });

    it('should apply default and sortDir classes descending', () => {
      component.sortDir = SortDirection.desc;

      const columns: TableColumn[] = [{}];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.columnCssClasses).toEqual('datatable-header-cell sort-active sort-desc');
    });
  });

  describe('should return the name specified using name()', () => {
    it('name should contain foo', () => {
      const columns: TableColumn[] = [
        {
          name: 'foo'
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.name).toEqual('foo');
    });
  });

  describe('calcSortDir()', () => {
    it('should return the dir specified if prop is found', () => {
      const columns: TableColumn[] = [
        {
          prop: 'foo'
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.calcSortDir([{prop: 'foo', dir: 'desc'}])).toEqual('desc');
    });

    it('should return undefined if the column prop does not match', () => {
      const columns: TableColumn[] = [
        {
          prop: 'foo'
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.calcSortDir([{prop: 'bar', dir: 'desc'}])).toBeUndefined();
    });
  });

  describe('onSort()', () => {
    it('should not emit sort event if sortable is false', () => {
      spyOn(component.sort, 'emit').and.callThrough();

      const columns: TableColumn[] = [
        {
          sortable: false
        }
      ];

      component.column = columns[0];
      component.onSort();
      fixture.detectChanges();

      expect(component.sort.emit).not.toHaveBeenCalled();
    });

    it('should emit sort event with sortable true', () => {
      spyOn(component.sort, 'emit').and.callThrough();

      const columns: TableColumn[] = [
        {
          sortable: true
        }
      ];

      component.column = columns[0];
      component.onSort();
      fixture.detectChanges();

      expect(component.sort.emit).toHaveBeenCalledWith({
        column: {sortable: true},
        prevValue: undefined,
        newValue: 'asc'
      });
    });

    it('should emit sort event with providing sortType single and sortDir ascending', () => {
      spyOn(component.sort, 'emit').and.callThrough();

      const columns: TableColumn[] = [
        {
          sortable: true
        }
      ];

      component.column = columns[0];
      component.sortType = SortType.single;
      component.sortDir = SortDirection.asc;
      component.onSort();
      fixture.detectChanges();

      expect(component.sort.emit).toHaveBeenCalledWith({
        column: {sortable: true},
        prevValue: 'asc',
        newValue: 'desc'
      });
    });

    it('should emit sort event with providing sortType single and sortDir descending', () => {
      spyOn(component.sort, 'emit').and.callThrough();

      const columns: TableColumn[] = [
        {
          sortable: true
        }
      ];

      component.column = columns[0];
      component.sortType = SortType.single;
      component.sortDir = SortDirection.desc;
      component.onSort();
      fixture.detectChanges();

      expect(component.sort.emit).toHaveBeenCalledWith({
        column: {sortable: true},
        prevValue: 'desc',
        newValue: 'asc'
      });
    });

    it('should emit sort event with providing sortType multi and sortDir ascending', () => {
      spyOn(component.sort, 'emit').and.callThrough();

      const columns: TableColumn[] = [
        {
          sortable: true
        }
      ];

      component.column = columns[0];
      component.sortType = SortType.multi;
      component.sortDir = SortDirection.asc;
      component.onSort();
      fixture.detectChanges();

      expect(component.sort.emit).toHaveBeenCalledWith({
        column: {sortable: true},
        prevValue: 'asc',
        newValue: 'desc'
      });
    });

    it('should emit sort event with providing sortType multi and sortDir descending', () => {
      spyOn(component.sort, 'emit').and.callThrough();

      const columns: TableColumn[] = [
        {
          sortable: true
        }
      ];

      component.column = columns[0];
      component.sortType = SortType.multi;
      component.sortDir = SortDirection.desc;
      component.onSort();
      fixture.detectChanges();

      expect(component.sort.emit).toHaveBeenCalledWith({
        column: {sortable: true},
        prevValue: 'desc',
        newValue: undefined
      });
    });
  });

  describe('isCheckboxable()', () => {
    it('should not be checkboxable with header false', () => {
      const columns: TableColumn[] = [
        {
          headerCheckboxable: false,
          checkboxable: true
        }
      ];

      component.selectionType = SelectionType.checkbox;

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.isCheckboxable).toEqual(false);
    });

    it('should not be checkboxable with checkboxable false', () => {
      const columns: TableColumn[] = [
        {
          headerCheckboxable: true,
          checkboxable: false
        }
      ];

      component.selectionType = SelectionType.checkbox;

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.isCheckboxable).toEqual(false);
    });

    it('should not be checkboxable with selection type as not checkbox', () => {
      const columns: TableColumn[] = [
        {
          headerCheckboxable: true,
          checkboxable: true
        }
      ];

      component.selectionType = SelectionType.multi;

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.isCheckboxable).toEqual(false);
    });

    it('should be checkboxable', () => {
      const columns: TableColumn[] = [
        {
          headerCheckboxable: true,
          checkboxable: true
        }
      ];

      component.selectionType = SelectionType.checkbox;

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.isCheckboxable).toEqual(true);
    });
  });

  describe('calcSortClass()', () => {
    it('should by default only set the sort-btn class', () => {
      const columns: TableColumn[] = [
        {
          sortable: false
        }
      ];

      component.column = columns[0];
      fixture.detectChanges();

      expect(component.calcSortClass(undefined)).toEqual('sort-btn');
    });

    it('should apply sort-btn, sort-asc, and an icon classes', () => {
      const columns: TableColumn[] = [
        {
          sortable: false
        }
      ];

      component.column = columns[0];
      component.sortAscendingIcon = 'icon';
      fixture.detectChanges();

      expect(component.calcSortClass(SortDirection.asc)).toEqual('sort-btn sort-asc icon');
    });

    it('should apply sort-btn, sort-desc, and an icon classes', () => {
      const columns: TableColumn[] = [
        {
          sortable: false
        }
      ];

      component.column = columns[0];
      component.sortDescendingIcon = 'icon';
      fixture.detectChanges();

      expect(component.calcSortClass(SortDirection.desc)).toEqual('sort-btn sort-desc icon');
    });
  });
});
