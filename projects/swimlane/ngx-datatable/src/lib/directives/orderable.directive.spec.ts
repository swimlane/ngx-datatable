import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { By } from '@angular/platform-browser';

import { OrderableDirective } from './orderable.directive';
import { DraggableDirective } from './draggable.directive';
import { id } from '../utils/id';

@Component({
  selector: 'test-fixture-component',
  template: `
    <div orderable>
      @for (item of draggables; track $index) {
      <div draggable [dragModel]="item"></div>
      }
    </div>
  `,
  imports: [OrderableDirective, DraggableDirective]
})
class TestFixtureComponent {
  draggables = [];
  @ViewChildren(DraggableDirective) draggableDirectives!: QueryList<DraggableDirective>;
}

describe('OrderableDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OrderableDirective, TestFixtureComponent, DraggableDirective]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestFixtureComponent);
      component = fixture.componentInstance;
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

    describe('when a draggable is removed', () => {
      function checkAllSubscriptionsForActiveObservers() {
        const subs = directive.draggables.map(d => {
          expect(d.dragEnd.isStopped).toBe(false);
          expect(d.dragStart.isStopped).toBe(false);

          return {
            dragStart: d.dragStart.observers,
            dragEnd: d.dragEnd.observers
          };
        });

        subs.forEach(sub => {
          expect(sub.dragStart.length).toBe(1);
          expect(sub.dragEnd.length).toBe(1);
        });
      }

      function newDraggable() {
        return {
          $$id: id()
        };
      }

      beforeEach(() => {
        component.draggables = [newDraggable(), newDraggable(), newDraggable()];
        fixture.detectChanges();

        checkAllSubscriptionsForActiveObservers();
      });

      it('then dragStart and dragEnd are unsubscribed from the removed draggable', () => {
        const unsubbed = component.draggableDirectives.toArray()[0];
        component.draggables.splice(0, 1);

        expect(unsubbed.dragStart.isStopped).toBe(false);
        expect(unsubbed.dragEnd.isStopped).toBe(false);
        fixture.detectChanges();

        expect(unsubbed.dragStart.isStopped).toBe(true);
        expect(unsubbed.dragEnd.isStopped).toBe(true);
      });
    });
  });
});
