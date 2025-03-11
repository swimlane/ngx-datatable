import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataTableBodyComponent } from './body.component';
import { DataTableBodyRowComponent } from './body-row.component';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { By } from '@angular/platform-browser';
import { DatatableComponentToken } from '../../utils/table-token';

describe('DataTableBodyComponent', () => {
  let fixture: ComponentFixture<DataTableBodyComponent>;
  let component: DataTableBodyComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataTableBodyComponent],
      providers: [ScrollbarHelper, { provide: DatatableComponentToken, useValue: {} }]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableBodyComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Paging', () => {
    it('should have correct indexes for normal paging with rows > pageSize', () => {
      component.externalPaging = false;
      component.rows = [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9 },
        { num: 10 }
      ];
      component.pageSize = 10;
      component.offset = 1;
      component.rowCount = 20;
      const expectedIndexes = { first: 10, last: 20 };
      component.updateIndexes();
      expect(component.indexes()).toEqual(expectedIndexes);
    });

    it('should have correct indexes for normal paging with rows < pageSize', () => {
      component.externalPaging = false;
      component.rows = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }];
      component.pageSize = 5;
      component.offset = 1;
      component.rowCount = 9;
      const expectedIndexes = { first: 5, last: 9 };
      component.updateIndexes();
      expect(component.indexes()).toEqual(expectedIndexes);
    });

    it('should have correct indexes for external paging with rows > pageSize', () => {
      component.externalPaging = true;
      component.rows = [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9 },
        { num: 10 }
      ];
      component.pageSize = 10;
      component.offset = 1;
      component.rowCount = 20;
      const expectedIndexes = { first: 0, last: 10 };
      component.updateIndexes();
      expect(component.indexes()).toEqual(expectedIndexes);
    });

    it('should have correct indexes for external paging with rows < pageSize', () => {
      component.externalPaging = true;
      component.rows = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }];
      component.pageSize = 5;
      component.offset = 1;
      component.rowCount = 9;
      const expectedIndexes = { first: 0, last: 5 };
      component.updateIndexes();
      expect(component.indexes()).toEqual(expectedIndexes);
    });
  });

  describe('with disableCheck', () => {
    beforeEach(() => {
      component.columns = [{ name: 'value', $$id: 'id', $$valueGetter: obj => obj.value }];
      component.disableRowCheck = (row: any) => row.disabled;
    });

    it('should disable rows', () => {
      component.rows = [
        { value: '1', disabled: false },
        { value: '2', disabled: true }
      ];
      component.rowCount = 2;
      component.pageSize = 2;
      component.offset = 0;
      component.updateIndexes();
      fixture.detectChanges();
      let rows = fixture.debugElement.queryAll(By.directive(DataTableBodyRowComponent));
      expect(rows[0].classes['row-disabled']).toBeFalsy();
      expect(rows[1].classes['row-disabled']).toBeTrue();
      component.rows = [
        { value: '1', disabled: true },
        { value: '2', disabled: false }
      ];
      fixture.detectChanges();
      rows = fixture.debugElement.queryAll(By.directive(DataTableBodyRowComponent));
      expect(rows[0].classes['row-disabled']).toBeTrue();
      expect(rows[1].classes['row-disabled']).toBeFalsy();
    });

    it('should disable grouped rows', () => {
      component.groupedRows = [
        {
          key: 'g1',
          value: [
            { value: '1', disabled: false },
            { value: '2', disabled: true }
          ]
        }
      ];
      component.rows = ['dummy'];
      component.rowCount = 2;
      component.pageSize = 2;
      component.offset = 0;
      component.updateIndexes();
      fixture.detectChanges();
      const rows = fixture.debugElement.queryAll(By.directive(DataTableBodyRowComponent));
      expect(rows[0].classes['row-disabled']).toBeFalsy();
      expect(rows[1].classes['row-disabled']).toBeTrue();
    });
  });

  describe('Summary row', () => {
    it('should not return custom styles for a bottom summary row if a scrollbar mode is off', () => {
      const styles = component.bottomSummaryRowsStyles();
      expect(styles).toBeFalsy();
    });

    it('should return custom styles for a bottom summary row if a scrollbar mode is on', () => {
      component.rowHeight = 50;
      component.scrollbarV = true;
      component.virtualization = true;
      component.rows = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }];
      const styles = component.bottomSummaryRowsStyles();
      expect(styles).toBeDefined();
    });
  });
});
