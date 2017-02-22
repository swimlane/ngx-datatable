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
      let fixture = TestBed.createComponent(DatatableComponent);
      let initialRows = [
        {id: 1},
        {id: 2},
        {id: 3}
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
        sorts: [{prop: 'foo', dir: 'desc'}]
      });

      fixture.componentInstance.sort
        .subscribe(() => {
        });

      expect(fixture.componentInstance.rows).not.toBe(initialRows);
    });
  });

  it('should set offset to 0 when sorting by a column', () => {
    let fixture = TestBed.createComponent(DatatableComponent);
    let initialRows = [
      {id: 1},
      {id: 2},
      {id: 3}
    ];

    let columns = [
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

});
