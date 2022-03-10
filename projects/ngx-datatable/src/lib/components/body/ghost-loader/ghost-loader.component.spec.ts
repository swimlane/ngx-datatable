import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DataTableGhostLoaderComponent } from './ghost-loader.component';

describe('DataTableGhostLoaderComponent', () => {
  let fixture: ComponentFixture<DataTableGhostLoaderComponent>;
  let component: DataTableGhostLoaderComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableGhostLoaderComponent]
    });
  });

  beforeEach(
    waitForAsync(() => {
      TestBed.compileComponents().then(() => {
        fixture = TestBed.createComponent(DataTableGhostLoaderComponent);
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
