import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ResizeableDirective } from '.';

@Component({
  selector: 'test-fixture-component',
  template: `
    <div resizeable></div>
  `
})
class TestFixtureComponent {
}

describe('ResizeableDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ResizeableDirective,
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
    let directive: ResizeableDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.directive(ResizeableDirective))
        .injector.get(ResizeableDirective);
    });

    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have ResizeableDirective directive', () => {
      expect(directive).toBeTruthy();
    });
  });
});
