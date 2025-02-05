import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataTableHeaderCellComponent } from './header-cell.component';

describe('DataTableHeaderCellComponent', () => {
  let fixture: ComponentFixture<DataTableHeaderCellComponent>;
  let component: DataTableHeaderCellComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataTableHeaderCellComponent]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableHeaderCellComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
