import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { DataTableBodyRowComponent } from './body-row.component';
import { DataTableBodyCellComponent } from './body-cell.component';

describe('DataTableBodyRowComponent', () => {
  let fixture: ComponentFixture<DataTableBodyRowComponent>;
  let component: DataTableBodyRowComponent;
  let element: any;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableBodyCellComponent, DataTableBodyRowComponent]
    });
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(DataTableBodyRowComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
      });
    })
  );

  /*
  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
  */
});
