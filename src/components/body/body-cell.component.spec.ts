import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { DataTableBodyCellComponent } from '.';
import { numericIndexGetter } from '../../utils/column-prop-getters';
import { setColumnDefaults } from '../../utils/column-helper';
import { TableColumn } from '../../types/table-column.type';

describe('DataTableBodyCellComponent', () => {
  let fixture: ComponentFixture<DataTableBodyCellComponent>;
  let component: DataTableBodyCellComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DataTableBodyCellComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableBodyCellComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('prop tests', () => {
    // verify there wasn't a mistake where the falsey 0 value
    // resulted in a code path for missing column prop
    it('should get value from zero-index prop', () => {
      component.row = ['Hello'];
      const columns: TableColumn[] = [
        { name: "First Column", prop: 0 }
      ];
      // users should never set columns on DataTableBodyCellComponent directly
      // setColumnDefaults will be run on columns before they are set on BodyCellComponent
      setColumnDefaults(columns);
      expect(columns[0].$$valueGetter).toBe(numericIndexGetter);

      component.column = columns[0];
      expect(component.value).toEqual('Hello');
    });
  });
});
