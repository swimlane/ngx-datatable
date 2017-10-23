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

  describe('When the column is sorted', () => {
    it('should sort a column with Date values', () => {
      const fixture = TestBed.createComponent(DatatableComponent);
      const initialRows = [
        {birthDate: new Date(1980, 12, 1)},
        {birthDate: new Date(1978, 8, 5)},
        {birthDate: new Date(1995, 4, 3)}
      ];
  
      const columns = [
        {
          prop: 'birthDate'
        }
      ];
  
      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;
  
      fixture.detectChanges();
  
      fixture.componentInstance.onColumnSort({
        sorts: [{prop: 'birthDate', dir: 'desc'}]
      });
  
      expect(fixture.componentInstance._internalRows[0]).toBe(initialRows[2]);
      expect(fixture.componentInstance._internalRows[1]).toBe(initialRows[0]);
      expect(fixture.componentInstance._internalRows[2]).toBe(initialRows[1]);
    });

    it('should sort a column with number values', () => {
      const fixture = TestBed.createComponent(DatatableComponent);
      const initialRows = [
        {id: 5},
        {id: 20},
        {id: 12}
      ];
  
      const columns = [
        {
          prop: 'id'
        }
      ];
  
      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;
  
      fixture.detectChanges();
  
      fixture.componentInstance.onColumnSort({
        sorts: [{prop: 'id', dir: 'desc'}]
      });
  
      expect(fixture.componentInstance._internalRows[0]).toBe(initialRows[1]);
      expect(fixture.componentInstance._internalRows[1]).toBe(initialRows[2]);
      expect(fixture.componentInstance._internalRows[2]).toBe(initialRows[0]);
    });

    it('should sort a column with string values', () => {
      const fixture = TestBed.createComponent(DatatableComponent);
      const initialRows = [
        {product: 'Computers'},
        {product: 'Bikes'},
        {product: 'Smartphones'}
      ];
  
      const columns = [
        {
          prop: 'product'
        }
      ];
  
      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;
  
      fixture.detectChanges();
  
      fixture.componentInstance.onColumnSort({
        sorts: [{prop: 'product', dir: 'desc'}]
      });
  
      expect(fixture.componentInstance._internalRows[0]).toBe(initialRows[2]);
      expect(fixture.componentInstance._internalRows[1]).toBe(initialRows[0]);
      expect(fixture.componentInstance._internalRows[2]).toBe(initialRows[1]);
    });
  });

  describe('When the column is sorted with a custom comparator', () => {

    xit('should return a new array', () => {
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

      expect(fixture.componentInstance._internalRows).toBe(initialRows);

      fixture.componentInstance.onColumnSort({
        sorts: [{prop: 'foo', dir: 'desc'}]
      });

      fixture.componentInstance.sort
        .subscribe();

      expect(fixture.componentInstance._internalRows).not.toBe(initialRows);
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


  describe('table with row grouping', () => {
    let fixture;

    beforeEach(() => {
      fixture = TestBed.createComponent(DatatableComponent);
      fixture.componentInstance.rows = [
        { k: 'B', v: 1},
        { k: 'A', v: 2},
        { k: 'A', v: 1},
        { k: 'B', v: 3},
        { k: 'B', v: 2},
      ];

      fixture.componentInstance.columns = [
        { prop: 'k' },
        { prop: 'v' }
      ];
    });

    it('should sort groups according to component rows order', () => {
      fixture.componentInstance.groupRowsBy = 'k';
      fixture.detectChanges();
      
      expect(fixture.componentInstance.groupedRows[0].key).toBe('B');
      expect(fixture.componentInstance.groupedRows[1].key).toBe('A');
    });

    it('should sort group values according to component rows order', () => {
      fixture.componentInstance.groupRowsBy = 'k';
      fixture.detectChanges();
      
      expect(fixture.componentInstance.groupedRows[0].value).toEqual(
        fixture.componentInstance.rows.filter(r => r.k === 'B'));
      expect(fixture.componentInstance.groupedRows[1].value).toEqual(
        fixture.componentInstance.rows.filter(r => r.k === 'A'));
    });
  });

});
