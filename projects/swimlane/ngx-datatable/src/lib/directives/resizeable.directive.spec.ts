import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ResizeableDirective } from './resizeable.directive';

@Component({
  selector: 'test-fixture-component',
  template: ` <div resizeable></div> `,
  imports: [ResizeableDirective]
})
class TestFixtureComponent {}

describe('ResizeableDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResizeableDirective, TestFixtureComponent]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestFixtureComponent);
      component = fixture.componentInstance;
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
