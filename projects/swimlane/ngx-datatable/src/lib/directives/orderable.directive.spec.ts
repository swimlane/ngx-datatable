/* eslint-disable @typescript-eslint/dot-notation */
import { Component, QueryList, signal, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TableColumnInternal } from '../types/internal.types';
import { toInternalColumn } from '../utils/column-helper';
import { DatatableDraggableDirective } from './datatable-draggable.directive';
import { OrderableDirective } from './orderable.directive';

@Component({
  selector: 'test-fixture-component',
  imports: [OrderableDirective, DatatableDraggableDirective],
  template: `
    <div orderable>
      @for (item of draggables(); track $index) {
        <div datatableDraggable [dragModel]="item"></div>
      }
    </div>
  `
})
class TestFixtureComponent {
  readonly draggables = signal<TableColumnInternal[]>([]);
  @ViewChildren(DatatableDraggableDirective)
  draggableDirectives!: QueryList<DatatableDraggableDirective>;
}

describe('OrderableDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestFixtureComponent);
    component = fixture.componentInstance;
    /* This is required in order to resolve the `ContentChildren`.
     *  If we don't go through at least on change detection cycle
     *  the `draggables` will be `undefined` and `ngOnDestroy` will
     *  fail.
     */
    await fixture.whenStable();
  });

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
          expect(d.dragStart['listeners']).not.toHaveLength(0);
          expect(d.dragEnd['listeners']).not.toHaveLength(0);

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

      beforeEach(async () => {
        component.draggables.set([newDraggable('d1'), newDraggable('d2'), newDraggable('d3')]);
        await fixture.whenStable();

        checkAllSubscriptionsForActiveObservers();
      });

      it('then dragStart and dragEnd are unsubscribed from the removed draggable', async () => {
        const unsubbed = component.draggableDirectives.toArray()[0];
        component.draggables.update(items => items.slice(1));

        expect(unsubbed.dragStart['listeners']).not.toHaveLength(0);
        expect(unsubbed.dragEnd['listeners']).not.toHaveLength(0);
        await fixture.whenStable();

        expect(unsubbed.dragStart['listeners']).toHaveLength(0);
        expect(unsubbed.dragEnd['listeners']).toHaveLength(0);
      });
    });
  });
});
