import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { DataTableSelectionComponent } from './selection.component';

describe('DataTableSelectionComponent', () => {
  let fixture: ComponentFixture<DataTableSelectionComponent>;
  let component: DataTableSelectionComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableSelectionComponent]
    });
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(DataTableSelectionComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
      });
    })
  );

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
