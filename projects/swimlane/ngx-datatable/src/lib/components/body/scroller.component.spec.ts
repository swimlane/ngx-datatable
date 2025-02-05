import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ScrollerComponent } from './scroller.component';

describe('ScrollerComponent', () => {
  let fixture: ComponentFixture<ScrollerComponent>;
  let component: ScrollerComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ScrollerComponent]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ScrollerComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
