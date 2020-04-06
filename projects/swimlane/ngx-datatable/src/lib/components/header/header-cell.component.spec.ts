import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { DataTableHeaderCellComponent } from './header-cell.component';

describe('DataTableHeaderCellComponent', () => {
  let fixture: ComponentFixture<DataTableHeaderCellComponent>;
  let component: DataTableHeaderCellComponent;
  let element: any;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableHeaderCellComponent]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableHeaderCellComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
