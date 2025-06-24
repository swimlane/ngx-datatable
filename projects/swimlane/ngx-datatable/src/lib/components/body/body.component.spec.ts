import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableBodyComponent } from './body.component';
import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { DatatableComponentToken } from '../../utils/table-token';
import { By } from '@angular/platform-browser';
import { DataTableBodyRowComponent } from './body-row.component';
import { toInternalColumn } from '../../utils/column-helper';
import { ScrollerComponent } from './scroller.component';
import { DataTableGhostLoaderComponent } from './ghost-loader/ghost-loader.component';

describe('DataTableBodyComponent', () => {
  let fixture: ComponentFixture<DataTableBodyComponent>;
  let component: DataTableBodyComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTableBodyComponent],
      providers: [ScrollbarHelper, { provide: DatatableComponentToken, useValue: {} }]
    }).compileComponents();
    fixture = TestBed.createComponent(DataTableBodyComponent);
    component = fixture.componentInstance;
  });

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

    it('should render ghost rows based rowCount', () => {
      component.trackByProp = 'num';
      component.rows = [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }];
      component.externalPaging = true;
      component.scrollbarV = true;
      component.virtualization = true;
      component.rowHeight = 50;
      component.ghostLoadingIndicator = true;
      component.bodyHeight = 200;
      component.pageSize = 5;
      component.rowCount = 10;
      component.offset = 0;
      fixture.detectChanges();
      expect(component.indexes()).toEqual({ first: 0, last: 5 });
      fixture.debugElement
        .query(By.directive(ScrollerComponent))
        .triggerEventHandler('scroll', { scrollYPos: 250, scrollXPos: 0 });
      fixture.detectChanges();
      expect(component.indexes()).toEqual({ first: 5, last: 10 });
      expect(fixture.debugElement.queryAll(By.directive(DataTableGhostLoaderComponent))).toHaveSize(
        5
      );
    });
  });

  describe('with disableCheck', () => {
    beforeEach(() => {
      component.columns = toInternalColumn([{ name: 'value', prop: 'value' }]);
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
});
