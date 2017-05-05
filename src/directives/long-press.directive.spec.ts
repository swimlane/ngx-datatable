import { async, TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LongPressDirective } from './long-press.directive';

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

    it('should have isLongPress set to false', () => {
      expect(directive.isLongPress).toBeFalsy();
    });

    /*
    describe('When the mouse is clicked for 500 ms', () => {

      it('isLongPress should returns true', fakeAsync(() => {

        directive.onMouseDown(new MouseEvent('mousedown'));
        expect(directive.isLongPress).toBe(false);

        tick(500);
        expect(directive.isLongPress).toBe(true);

        directive.isLongPressing = false;
        tick(50); //clear last timer
      }));
    });
    */
    
  });

});
