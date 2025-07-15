import { ComponentHarness } from '@angular/cdk/testing';

export class DraggableHarness extends ComponentHarness {
  static readonly hostSelector = '.draggable';

  async mouseDown(x: number, y: number = 0): Promise<void> {
    return this.host().then(host => host.dispatchEvent('mousedown', { clientX: x, clientY: y }));
  }

  async touchStart(x: number, y: number = 0): Promise<void> {
    return this.host().then(host =>
      host.dispatchEvent('touchstart', {
        touches: [{ identifier: 'TEST', clientX: x, clientY: y }]
      })
    );
  }

  async mouseMove(x: number, y: number = 0): Promise<void> {
    return this.host().then(host => host.dispatchEvent('mousemove', { clientX: x, clientY: y }));
  }

  async touchMove(x: number, y: number = 0): Promise<void> {
    return this.host().then(host =>
      host.dispatchEvent('touchmove', { touches: [{ identifier: 'TEST', clientX: x, clientY: y }] })
    );
  }

  async mouseUp(): Promise<void> {
    return this.host().then(host => host.dispatchEvent('mouseup'));
  }

  async touchEnd(): Promise<void> {
    return this.host().then(host => host.dispatchEvent('touchend'));
  }
}
