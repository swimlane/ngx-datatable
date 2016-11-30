import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { ScrollerComponent } from '.';

describe('ScrollerComponent', () => {
  let fixture: ComponentFixture<ScrollerComponent>;
  let component: ScrollerComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ScrollerComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ScrollerComponent);
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
