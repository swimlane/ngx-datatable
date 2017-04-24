import {TestBed, async} from '@angular/core/testing';
import {DatatableComponent} from './datatable.component';
import {NgxDatatableModule} from '../datatable.module';
describe('Datatable component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxDatatableModule]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents();
  }));

  describe('When the column is sorted with a custom comparator', () => {

    it('should return a new array', () => {
      const fixture = TestBed.createComponent(DatatableComponent);
      const initialRows = [
        {id: 1},
        {id: 2},
        {id: 3}
      ];

      const columns = [
        {
          prop: 'foo',
          comparator: (propA: string, propB: string) => {
            if (propA.toLowerCase() > propB.toLowerCase()) return -1;
            if (propA.toLowerCase() < propB.toLowerCase()) return 1;
          }
        }
      ];

      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;

      fixture.detectChanges();

      expect(fixture.componentInstance.rows).toBe(initialRows);

      fixture.componentInstance.onColumnSort({
        sorts: [{prop: 'foo', dir: 'desc'}]
      });

      fixture.componentInstance.sort
        .subscribe();

      expect(fixture.componentInstance.rows).not.toBe(initialRows);
    });
  });

  it('should set offset to 0 when sorting by a column', () => {
    const fixture = TestBed.createComponent(DatatableComponent);
    const initialRows = [
      {id: 1},
      {id: 2},
      {id: 3}
    ];

    const columns = [
      {
        prop: 'id'
      }
    ];

    fixture.componentInstance.rows = initialRows;
    fixture.componentInstance.columns = columns;
    fixture.componentInstance.offset = 1;

    fixture.detectChanges();

    fixture.componentInstance.onColumnSort({
      sorts: [{prop: 'id', dir: 'desc'}]
    });

    expect(fixture.componentInstance.offset).toBe(0);
  });

  describe('table with numeric prop', () => {
    it('should support array data', () => {
      const fixture = TestBed.createComponent(DatatableComponent);

      const tableInstance = fixture.componentInstance;
      tableInstance.rows = [
        ['Hello', 123]
      ];

      tableInstance.columns = [
        { prop: 0 },
        { prop: 1 }
      ];

      // previously, an exception was thrown from column-helper.ts setColumnDefaults()
      fixture.detectChanges();

      expect(tableInstance.columns).toBeTruthy();
    });
  });

});
