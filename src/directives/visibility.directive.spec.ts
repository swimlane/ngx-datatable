import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { VisibilityDirective } from '.';

@Component({
  selector: 'test-fixture-component',
  styles: [`
    div {
      width: 1px;
      height: 1px;
    }
  `],
  template: `
    <div visibilityObserver></div>
  `
})
class TestFixtureComponent {
}

describe('VisibilityDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        VisibilityDirective,
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
    let directive: VisibilityDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.directive(VisibilityDirective))
        .injector.get(VisibilityDirective);
    });

    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have VisibilityDirective directive', () => {
      expect(directive).toBeTruthy();
    });
  });
});
