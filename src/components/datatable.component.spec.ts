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

    it('should use a stable sorting algorithm', () => {
      const fixture = TestBed.createComponent(DatatableComponent);
      /**
       * the following `initialRows`, when sorted by the character length
       * of the value of the `name` property would result in the following
       * (unstable sort) in Chrome:
       *  [
       *    { name: 'cat' },
       *    { name: 'sed' },
       *    { name: 'man' },
       *    { name: 'foo' },
       *    { name: 'bar' },
       *    { name: 'sit' },
       *    { name: 'amet' },
       *    { name: 'dolor' },
       *    { name: 'ipsum' },
       *    { name: 'lorem' },
       *    { name: 'maecennas' }
       *  ]
       */
      const initialRows = [
        { name: 'sed' },
        { name: 'dolor' },
        { name: 'ipsum' },
        { name: 'foo' },
        { name: 'bar' },
        { name: 'cat' },
        { name: 'sit' },
        { name: 'man' },
        { name: 'lorem' },
        { name: 'amet' },
        { name: 'maecennas' }
      ];

      const columns = [
        {
          prop: 'name',
          comparator: (nameA: string, nameB: string) => {
            return nameA.length - nameB.length;
          }
        }
      ];

      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;

      fixture.detectChanges();

      fixture.componentInstance.onColumnSort({
        sorts: [{prop: 'name', dir: 'asc'}]
      });

      expect(fixture.componentInstance._internalRows[0]).toBe(initialRows[0]);
      expect(fixture.componentInstance._internalRows[1]).toBe(initialRows[3]);
      expect(fixture.componentInstance._internalRows[2]).toBe(initialRows[4]);
      expect(fixture.componentInstance._internalRows[3]).toBe(initialRows[5]);
      expect(fixture.componentInstance._internalRows[4]).toBe(initialRows[6]);
      expect(fixture.componentInstance._internalRows[5]).toBe(initialRows[7]);
      expect(fixture.componentInstance._internalRows[6]).toBe(initialRows[9]);
      expect(fixture.componentInstance._internalRows[7]).toBe(initialRows[1]);
      expect(fixture.componentInstance._internalRows[8]).toBe(initialRows[2]);
      expect(fixture.componentInstance._internalRows[9]).toBe(initialRows[8]);
      expect(fixture.componentInstance._internalRows[10]).toBe(initialRows[10]);
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

});
