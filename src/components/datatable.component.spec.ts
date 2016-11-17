import {TestBed, async} from '@angular/core/testing';
import {DatatableComponent} from './datatable.component';
import {Angular2DataTableModule} from '../datatable.module';
describe('Datatable component', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Angular2DataTableModule ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents();
  }));

  describe('When the column is sorted with a custom comparator', () => {

    it('should return a new array', () => {
      let fixture = TestBed.createComponent(DatatableComponent);
      let initialRows = [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ];

      fixture.componentInstance.rows = initialRows;

      fixture.detectChanges();

      expect(fixture.componentInstance.rows).toBe(initialRows);

      fixture.componentInstance.onColumnSort({
        column: {
          comparator: (rows, sorts) => {
            let temp = [ ...rows ];
            return temp;
          }
        }
      });

      fixture.componentInstance.sort
        .subscribe(() => {
          console.log('sorted event');
        });

      expect(fixture.componentInstance.rows).not.toBe(initialRows);
    });
  });

});
