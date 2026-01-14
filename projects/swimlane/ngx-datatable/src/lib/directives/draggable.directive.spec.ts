import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import type { Mock } from 'vitest';

import { DatatableDraggableDirective, DragEvent } from './datatable-draggable.directive';
import { DraggableHarness } from './testing/draggable.harness';

@Component({
  selector: 'test-fixture-component',
  imports: [DatatableDraggableDirective],
  template: `
    <div
      [datatableDraggable]="enabled()"
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
  let dragStartSpy: Mock<() => void>;
  let dragEndSpy: Mock<() => void>;
  let dragMoveSpy: Mock<(event: DragEvent) => void>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestFixtureComponent);
    component = fixture.componentInstance;
    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(DraggableHarness);
    dragStartSpy = vi.spyOn(component, 'dragStart');
    dragEndSpy = vi.spyOn(component, 'dragEnd');
    dragMoveSpy = vi.spyOn(component, 'dragMove');
  });

  it('should fire mouse drag events', async () => {
    vi.useFakeTimers();
    await harness.mouseDown(0);
    vi.advanceTimersByTime(0); // Skip the delay of 0ms
    await fixture.whenStable();
    expect(dragStartSpy).toHaveBeenCalled();
    await harness.mouseMove(100);
    expect(dragMoveSpy).toHaveBeenCalledWith(
      expect.objectContaining({ currentX: 100, initialX: 0 })
    );
    await harness.mouseMove(200);
    expect(dragMoveSpy).toHaveBeenCalledWith(
      expect.objectContaining({ currentX: 200, initialX: 0 })
    );
    await harness.mouseUp();
    expect(dragEndSpy).toHaveBeenCalled();
    await harness.mouseMove(200);
    expect(dragMoveSpy).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('should fire touch drag events', async () => {
    vi.useFakeTimers();
    await harness.touchStart(0);
    vi.advanceTimersByTime(0); // Skip the delay of 0ms
    await fixture.whenStable();
    expect(dragStartSpy).toHaveBeenCalled();
    await harness.touchMove(100);
    expect(dragMoveSpy).toHaveBeenCalledWith(
      expect.objectContaining({ currentX: 100, initialX: 0 })
    );
    await harness.touchMove(200);
    expect(dragMoveSpy).toHaveBeenCalledWith(
      expect.objectContaining({ currentX: 200, initialX: 0 })
    );
    await harness.touchEnd();
    expect(dragEndSpy).toHaveBeenCalled();
    await harness.touchMove(200);
    expect(dragMoveSpy).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });

  it('should not start mouse dragging if disabled', async () => {
    vi.useFakeTimers();
    component.enabled.set(false);
    await harness.mouseDown(0);
    await harness.mouseMove(1);
    await harness.mouseUp();
    vi.advanceTimersByTime(0); // Skip the delay of 0ms
    expect(dragStartSpy).not.toHaveBeenCalled();
    expect(dragEndSpy).not.toHaveBeenCalled();
    expect(dragMoveSpy).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should not start touch dragging if disabled', async () => {
    vi.useFakeTimers();
    component.enabled.set(false);
    await harness.touchStart(0);
    await harness.touchMove(1);
    await harness.touchEnd();
    vi.advanceTimersByTime(0); // Skip the delay of 0ms
    expect(dragStartSpy).not.toHaveBeenCalled();
    expect(dragEndSpy).not.toHaveBeenCalled();
    expect(dragMoveSpy).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should detach pointer listeners when disabled', async () => {
    component.enabled.set(false);
    await fixture.whenStable();

    const hostElement = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
    const addEventListenerSpy = vi.spyOn(hostElement, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(hostElement, 'removeEventListener');

    try {
      component.enabled.set(true);
      await fixture.whenStable();

      const addEventCalls = addEventListenerSpy.mock.calls.filter(
        ([type]) => type === 'mousedown' || type === 'touchstart'
      );
      expect(addEventCalls).toHaveLength(2);

      component.enabled.set(false);
      await fixture.whenStable();

      const removeEventCalls = removeEventListenerSpy.mock.calls.filter(
        ([type]) => type === 'mousedown' || type === 'touchstart'
      );
      expect(removeEventCalls).toHaveLength(2);

      addEventCalls.forEach(([type, handler]) => {
        expect(
          removeEventCalls.some(
            ([removedType, removedHandler]) => removedType === type && removedHandler === handler
          )
        ).toBe(true);
      });
    } finally {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    }
  });

  describe('with delay', () => {
    beforeEach(async () => {
      component.dragStartDelay.set(100);
      await fixture.whenStable();
    });

    it('should start dragging after the specified delay', async () => {
      vi.useFakeTimers();
      await harness.touchStart(0);
      vi.advanceTimersByTime(100);
      await fixture.whenStable();
      expect(dragStartSpy).toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('should skip dragging if not pressed long enough', async () => {
      vi.useFakeTimers();
      await harness.mouseDown(0);
      vi.advanceTimersByTime(50);
      await harness.mouseUp();
      expect(dragStartSpy).not.toHaveBeenCalled();
      expect(dragEndSpy).not.toHaveBeenCalled();
      vi.useRealTimers();
    });

    it('should not start dragging if waiting for the delay', async () => {
      vi.useFakeTimers();
      await harness.mouseDown(0);
      vi.advanceTimersByTime(50);
      await harness.mouseMove(100);
      expect(dragMoveSpy).not.toHaveBeenCalled();
      vi.useRealTimers();
    });
  });
});
