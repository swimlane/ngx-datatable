import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataTableBodyRowComponent } from './body-row.component';
import { DataTableBodyCellComponent } from './body-cell.component';

describe('DataTableBodyRowComponent', () => {
  let fixture: ComponentFixture<DataTableBodyRowComponent>;
  let component: DataTableBodyRowComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataTableBodyCellComponent, DataTableBodyRowComponent]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableBodyRowComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
