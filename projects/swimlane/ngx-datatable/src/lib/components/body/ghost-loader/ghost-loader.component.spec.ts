import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataTableGhostLoaderComponent } from './ghost-loader.component';

describe('DataTableGhostLoaderComponent', () => {
  let fixture: ComponentFixture<DataTableGhostLoaderComponent>;
  let component: DataTableGhostLoaderComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataTableGhostLoaderComponent]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableGhostLoaderComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
