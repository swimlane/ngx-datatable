import { ComponentHarness } from '@angular/cdk/testing';

export class DraggableHarness extends ComponentHarness {
  static readonly hostSelector = '.draggable';

  async mouseDown(x: number, y: number = 0): Promise<void> {
    return this.host().then(host => host.dispatchEvent('mousedown', { clientX: x, clientY: y }));
  }

  async touchStart(x: number, y: number = 0): Promise<void> {
    return this.host().then(host =>
      host.dispatchEvent('touchstart', {
        touches: { item: () => ({ identifier: 666, clientX: x, clientY: y }) }
      })
    );
  }

  async mouseMove(x: number, y: number = 0): Promise<void> {
    document.dispatchEvent(
      new MouseEvent('mousemove', {
        clientX: x,
        clientY: y
      })
    );
  }

  async touchMove(x: number, y: number = 0): Promise<void> {
    const moveEvent = new Event('touchmove');
    Object.assign(moveEvent, {
      touches: [{ identifier: 666, clientX: x, clientY: y } as any]
    });
    document.dispatchEvent(moveEvent);
  }

  async mouseUp(): Promise<void> {
    document.dispatchEvent(new MouseEvent('mouseup'));
  }

  async touchEnd(): Promise<void> {
    document.dispatchEvent(new TouchEvent('touchend'));
  }
}
