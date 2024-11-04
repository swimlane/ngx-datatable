import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataTableRowWrapperComponent } from './body-row-wrapper.component';
import { DatatableComponentToken } from '../../utils/table-token';

describe('DataTableRowWrapperComponent', () => {
  let fixture: ComponentFixture<DataTableRowWrapperComponent>;
  let component: DataTableRowWrapperComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataTableRowWrapperComponent],
      providers: [
        {
          provide: DatatableComponentToken,
          useValue: {}
        }
      ]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableRowWrapperComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
