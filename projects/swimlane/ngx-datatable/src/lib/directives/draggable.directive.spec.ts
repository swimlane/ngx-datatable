import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableDraggableDirective, DragEvent } from './datatable-draggable.directive';
import { DraggableHarness } from './testing/draggable.harness';

import Spy = jasmine.Spy;

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
  let dragStartSpy: Spy<() => void>;
  let dragEndSpy: Spy<() => void>;
  let dragMoveSpy: Spy<(event: DragEvent) => void>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(TestFixtureComponent);
    component = fixture.componentInstance;
    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(DraggableHarness);
    dragStartSpy = spyOn(component, 'dragStart');
    dragEndSpy = spyOn(component, 'dragEnd');
    dragMoveSpy = spyOn(component, 'dragMove');
  });

  it('should fire mouse drag events', async () => {
    jasmine.clock().install();
    await harness.mouseDown(0);
    jasmine.clock().tick(0); // Skip the delay of 0ms
    await fixture.whenStable();
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
    jasmine.clock().uninstall();
  });

  it('should fire touch drag events', async () => {
    jasmine.clock().install();
    await harness.touchStart(0);
    jasmine.clock().tick(0); // Skip the delay of 0ms
    await fixture.whenStable();
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
    jasmine.clock().uninstall();
  });

  it('should not start mouse dragging if disabled', async () => {
    jasmine.clock().install();
    component.enabled.set(false);
    await harness.mouseDown(0);
    await harness.mouseMove(1);
    await harness.mouseUp();
    jasmine.clock().tick(0); // Skip the delay of 0ms
    expect(dragStartSpy).not.toHaveBeenCalled();
    expect(dragEndSpy).not.toHaveBeenCalled();
    expect(dragMoveSpy).not.toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('should not start touch dragging if disabled', async () => {
    jasmine.clock().install();
    component.enabled.set(false);
    await harness.touchStart(0);
    await harness.touchMove(1);
    await harness.touchEnd();
    jasmine.clock().tick(0); // Skip the delay of 0ms
    expect(dragStartSpy).not.toHaveBeenCalled();
    expect(dragEndSpy).not.toHaveBeenCalled();
    expect(dragMoveSpy).not.toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  describe('with delay', () => {
    beforeEach(async () => {
      component.dragStartDelay.set(100);
      await fixture.whenStable();
    });

    it('should start dragging after the specified delay', async () => {
      jasmine.clock().install();
      await harness.touchStart(0);
      jasmine.clock().tick(100);
      await fixture.whenStable();
      expect(dragStartSpy).toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should skip dragging if not pressed long enough', async () => {
      jasmine.clock().install();
      await harness.mouseDown(0);
      jasmine.clock().tick(50);
      await harness.mouseUp();
      expect(dragStartSpy).not.toHaveBeenCalled();
      expect(dragEndSpy).not.toHaveBeenCalled();
      jasmine.clock().uninstall();
    });

    it('should not start dragging if waiting for the delay', async () => {
      jasmine.clock().install();
      await harness.mouseDown(0);
      jasmine.clock().tick(50);
      await harness.mouseMove(100);
      expect(dragMoveSpy).not.toHaveBeenCalled();
      jasmine.clock().uninstall();
    });
  });
});
