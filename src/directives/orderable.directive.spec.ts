import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OrderableDirective } from '.';

@Component({
  selector: 'test-fixture-component',
  template: `
    <div orderable></div>
  `
})
class TestFixtureComponent {
}

describe('OrderableDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        OrderableDirective,
        TestFixtureComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestFixtureComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;

      /* This is required in order to resolve the `ContentChildren`.
       *  If we don't go through at least on change detection cycle
       *  the `draggables` will be `undefined` and `ngOnDestroy` will
       *  fail.
       */
      fixture.detectChanges();
    });
  }));

  describe('fixture', () => {
    let directive: OrderableDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.directive(OrderableDirective))
        .injector.get(OrderableDirective);
    });

    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have OrderableDirective directive', () => {
      expect(directive).toBeTruthy();
    });
  });
});
