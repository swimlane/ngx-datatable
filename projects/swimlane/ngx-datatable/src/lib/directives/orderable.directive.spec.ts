/* eslint-disable @typescript-eslint/dot-notation */
import { Component, QueryList, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TableColumnInternal } from '../types/internal.types';
import { toInternalColumn } from '../utils/column-helper';
import { DraggableDirective } from './draggable.directive';
import { OrderableDirective } from './orderable.directive';

@Component({
  selector: 'test-fixture-component',
  imports: [OrderableDirective, DraggableDirective],
  template: `
    <div orderable>
      @for (item of draggables; track $index) {
        <div draggable [dragModel]="item"></div>
      }
    </div>
  `
})
class TestFixtureComponent {
  draggables: TableColumnInternal[] = [];
  @ViewChildren(DraggableDirective) draggableDirectives!: QueryList<DraggableDirective>;
}

describe('OrderableDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(TestFixtureComponent);
    component = fixture.componentInstance;
    /* This is required in order to resolve the `ContentChildren`.
     *  If we don't go through at least on change detection cycle
     *  the `draggables` will be `undefined` and `ngOnDestroy` will
     *  fail.
     */
    fixture.detectChanges();
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
      const checkAllSubscriptionsForActiveObservers = () => {
        const subs = directive.draggables().map(d => {
          expect(d.dragStart['listeners']).not.toHaveSize(0);
          expect(d.dragEnd['listeners']).not.toHaveSize(0);

          return {
            dragStart: d.dragStart['listeners'],
            dragEnd: d.dragEnd['listeners']
          };
        });

        subs.forEach(sub => {
          expect(sub.dragStart.length).toBe(1);
          expect(sub.dragEnd.length).toBe(1);
        });
      };

      const newDraggable = (name: string): TableColumnInternal => {
        return toInternalColumn([{ name }])[0];
      };

      beforeEach(() => {
        component.draggables = [newDraggable('d1'), newDraggable('d2'), newDraggable('d3')];
        fixture.detectChanges();

        checkAllSubscriptionsForActiveObservers();
      });

      it('then dragStart and dragEnd are unsubscribed from the removed draggable', () => {
        const unsubbed = component.draggableDirectives.toArray()[0];
        component.draggables.splice(0, 1);

        expect(unsubbed.dragStart['listeners']).not.toHaveSize(0);
        expect(unsubbed.dragEnd['listeners']).not.toHaveSize(0);
        fixture.detectChanges();

        expect(unsubbed.dragStart['listeners']).toHaveSize(0);
        expect(unsubbed.dragEnd['listeners']).toHaveSize(0);
      });
    });
  });
});
