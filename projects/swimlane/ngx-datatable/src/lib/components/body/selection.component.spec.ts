import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataTableSelectionComponent } from './selection.component';

describe('DataTableSelectionComponent', () => {
  let fixture: ComponentFixture<DataTableSelectionComponent>;
  let component: DataTableSelectionComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataTableSelectionComponent]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableSelectionComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
