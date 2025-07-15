import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DragEvent, DraggableDirective } from './draggable.directive';
import { DraggableHarness } from './testing/draggable.harness';

import Spy = jasmine.Spy;

@Component({
  selector: 'test-fixture-component',
  imports: [DraggableDirective],
  template: `
    <div
      [draggable]="enabled()"
      [dragStartDelay]="dragStartDelay()"
      (dragStart)="dragStart()"
      (dragEnd)="dragEnd()"
      (dragMove)="dragMove($event)"
    ></div>
  `
})
class TestFixtureComponent {
  readonly dragStartDelay = signal(0);
  readonly enabled = signal(true);

  dragStart(): void {}

  dragEnd(): void {}

  dragMove(event: DragEvent): void {}
}

describe('DraggableDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let harness: DraggableHarness;
  let dragStartSpy: Spy<() => void>;
  let dragEndSpy: Spy<() => void>;
  let dragMoveSpy: Spy<(event: DragEvent) => void>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestFixtureComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, DraggableHarness);
    dragStartSpy = spyOn(component, 'dragStart');
    dragEndSpy = spyOn(component, 'dragEnd');
    dragMoveSpy = spyOn(component, 'dragMove');
  });

  it('should fire mouse drag events', fakeAsync(() => async () => {
    await harness.mouseDown(0);
    tick(); // Skip the delay of 0ms
    expect(dragStartSpy).toHaveBeenCalled();
    await harness.mouseMove(100);
    expect(dragMoveSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ currentX: 100, initialX: 0 })
    );
    await harness.mouseMove(200);
    expect(dragMoveSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ currentX: 200, initialX: 0 })
    );
    await harness.mouseUp();
    expect(dragEndSpy).toHaveBeenCalled();
    await harness.mouseMove(200);
    expect(dragMoveSpy).toHaveBeenCalledTimes(2);
  }));

  it('should fire touch drag events', fakeAsync(() => async () => {
    await harness.touchStart(0);
    tick(); // Skip the delay of 0ms
    expect(dragStartSpy).toHaveBeenCalled();
    await harness.touchMove(100);
    expect(dragMoveSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ currentX: 100, initialX: 0 })
    );
    await harness.touchMove(200);
    expect(dragMoveSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ currentX: 200, initialX: 0 })
    );
    await harness.touchEnd();
    expect(dragEndSpy).toHaveBeenCalled();
    await harness.touchMove(200);
    expect(dragMoveSpy).toHaveBeenCalledTimes(2);
  }));

  it('should not start mouse dragging if disabled', fakeAsync(() => async () => {
    component.enabled.set(false);
    await harness.mouseDown(0);
    await harness.mouseMove(1);
    await harness.mouseUp();
    tick(); // Skip the delay of 0ms
    expect(dragStartSpy).not.toHaveBeenCalled();
    expect(dragEndSpy).not.toHaveBeenCalled();
    expect(dragMoveSpy).not.toHaveBeenCalled();
  }));

  it('should not start touch dragging if disabled', fakeAsync(() => async () => {
    component.enabled.set(false);
    await harness.touchStart(0);
    await harness.touchMove(1);
    await harness.touchEnd();
    tick(); // Skip the delay of 0ms
    expect(dragStartSpy).not.toHaveBeenCalled();
    expect(dragEndSpy).not.toHaveBeenCalled();
    expect(dragMoveSpy).not.toHaveBeenCalled();
  }));

  describe('with delay', () => {
    beforeEach(() => {
      component.dragStartDelay.set(100);
    });

    it('should start dragging after the specified delay', fakeAsync(() => async () => {
      await harness.touchStart(0);
      tick(100);
      expect(dragStartSpy).toHaveBeenCalled();
    }));

    it('should skip dragging if not pressed long enough', fakeAsync(() => async () => {
      await harness.mouseDown(0);
      tick(50);
      await harness.mouseUp();
      expect(dragStartSpy).not.toHaveBeenCalled();
      expect(dragEndSpy).not.toHaveBeenCalled();
    }));

    it('should not start dragging if waiting for the delay', fakeAsync(() => async () => {
      await harness.mouseDown(0);
      tick(50);
      await harness.mouseMove(100);
      expect(dragMoveSpy).not.toHaveBeenCalled();
    }));
  });
});
