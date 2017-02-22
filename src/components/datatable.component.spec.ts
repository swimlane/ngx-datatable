import {TestBed, async} from '@angular/core/testing';
import {DatatableComponent} from './datatable.component';
import {NgxDatatableModule} from '../datatable.module';
describe('Datatable component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NgxDatatableModule ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents();
  }));

  describe('When data for rows change', () => {
    it('should not alter offset if there is enough data to display in table', () => {
      let fixture = TestBed.createComponent(DatatableComponent);
      let initialRows = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
      ];
      let columns = [
        {
          prop: 'foo'
        }
      ];
      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;
      fixture.componentInstance.limit = 1;

      fixture.detectChanges();

      expect(fixture.componentInstance.offset).toBe(0);

      fixture.componentInstance.offset = 5;
      fixture.componentInstance.rows = initialRows.filter((r) => r.id < 6);

      fixture.detectChanges();

      expect(fixture.componentInstance.offset).toBe(5);
    });

    it('should reduce offset to minimum number that can display table data', () => {
      let fixture = TestBed.createComponent(DatatableComponent);
      let initialRows = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
      ];
      let columns = [
        {
          prop: 'foo'
        }
      ];

      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;
      fixture.componentInstance.limit = 1;

      fixture.detectChanges();

      expect(fixture.componentInstance.offset).toBe(0);

      fixture.componentInstance.offset = 5;

      fixture.detectChanges();

      expect(fixture.componentInstance.offset).toBe(5);

      fixture.componentInstance.rows = initialRows.filter((r) => r.id < 3);

      fixture.detectChanges();

      expect(fixture.componentInstance.offset).toBe(2);
    });
  });
  describe('When the column is sorted with a custom comparator', () => {

    it('should return a new array', () => {
      let fixture = TestBed.createComponent(DatatableComponent);
      let initialRows = [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ];

      let columns = [
        {
          prop: 'foo',
          comparator: (propA, propB) => {
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
        sorts: [{ prop: 'foo', dir: 'desc' }]
      });

      fixture.componentInstance.sort
        .subscribe(() => {
          console.log('sorted event');
        });

      expect(fixture.componentInstance.rows).not.toBe(initialRows);
    });
  });

});
