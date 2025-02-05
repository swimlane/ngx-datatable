import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { VisibilityDirective } from './visibility.directive';

@Component({
  selector: 'test-fixture-component',
  styles: [
    `
      div {
        width: 1px;
        height: 1px;
      }
    `
  ],
  template: ` <div visibilityObserver></div> `,
  imports: [VisibilityDirective]
})
class TestFixtureComponent {}

describe('VisibilityDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VisibilityDirective, TestFixtureComponent]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestFixtureComponent);
      component = fixture.componentInstance;
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
