import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LongPressDirective } from '.';

@Component({
  selector: 'test-fixture-component',
  template: `
    <div long-press></div>
  `
})
class TestFixtureComponent {
}

describe('LongPressDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        LongPressDirective,
        TestFixtureComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestFixtureComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });
  }));

  describe('fixture', () => {
    let directive: LongPressDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.directive(LongPressDirective))
        .injector.get(LongPressDirective);
    });

    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have LongPressDirective directive', () => {
      expect(directive).toBeTruthy();
    });
  });
});
