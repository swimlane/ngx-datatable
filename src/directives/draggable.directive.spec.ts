import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DraggableDirective } from '.';

@Component({
  selector: 'test-fixture-component',
  template: `
    <div draggable></div>
  `
})
class TestFixtureComponent {
}

describe('DraggableDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DraggableDirective,
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
    let directive: DraggableDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.directive(DraggableDirective))
        .injector.get(DraggableDirective);
    });

    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have DraggableDirective directive', () => {
      expect(directive).toBeTruthy();
    });
  });
});
