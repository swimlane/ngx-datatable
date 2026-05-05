import { ComponentHarness, parallel } from '@angular/cdk/testing';

import { PinDirection } from '../../../types/internal.types';

export class HeaderHarness extends ComponentHarness {
  static readonly hostSelector = 'datatable-header';
  private readonly columnCells = this.locatorForAll('[role="columnheader"]');
  private readonly row = this.locatorFor('[role="row"]');
  private readonly leftPinningGroup = this.locatorForAll(
    '.datatable-row-left [role="columnheader"]'
  );
  private readonly rightPinningGroup = this.locatorForAll(
    '.datatable-row-right [role="columnheader"]'
  );
  private readonly centerPinningGroup = this.locatorForAll(
    '.datatable-row-center [role="columnheader"]'
  );
  private readonly cellResizeHandle = this.locatorForAll('.resize-handle');
  private readonly columnCellsSortBtns = this.locatorForAll('[role="columnheader"] .sort-btn');
  private readonly activeSortColumn = this.locatorForAll('[role="columnheader"].sort-active');

  async getColumnCount(): Promise<number> {
    const cells = await this.columnCells();
    return cells.length;
  }

  async getColumnName(index: number): Promise<string> {
    const cells = await this.columnCells();
    const cell = cells[index];
    return cell.text();
  }

  async getHeaderRowWidth(): Promise<number> {
    const row = await this.row();
    return (await row.getDimensions()).width;
  }

  async getColumnPinningGroup(pinningDirection: PinDirection): Promise<number> {
    if (pinningDirection === 'left') {
      const leftGroup = await this.leftPinningGroup();
      return leftGroup.length;
    } else if (pinningDirection === 'center') {
      const centerGroup = await this.centerPinningGroup();
      return centerGroup.length;
    } else if (pinningDirection === 'right') {
      const rightGroup = await this.rightPinningGroup();
      return rightGroup.length;
    }
    return 0;
  }

  async getColumnWidth(index: number): Promise<number> {
    const cells = await this.columnCells();
    const cell = cells[index];
    const dimensions = await cell.getDimensions();
    return dimensions.width;
  }

  async resizeColumn(index: number, newWidth: number): Promise<void> {
    const resizeHandle = (await this.cellResizeHandle())[index];
    if (resizeHandle) {
      await resizeHandle.dispatchEvent('mousedown', { clientX: 0, screenX: 0 });
      // wait a cycle to skip dragStartDelay
      await new Promise(resolve => setTimeout(resolve, 0));
      const mouseMove = new MouseEvent('mousemove', { clientX: newWidth, screenX: newWidth });
      document.dispatchEvent(mouseMove);
      const mouseUp = new MouseEvent('mouseup');
      document.dispatchEvent(mouseUp);
    }
  }

  async hasResizeHandle(index: number): Promise<boolean> {
    const resizeHandles = await this.cellResizeHandle();
    return !!resizeHandles[index];
  }

  async applySortOnColumn(index: number): Promise<void> {
    const sortButton = (await this.columnCellsSortBtns())[index];
    await sortButton.click();
  }

  async getActiveSortColumn(): Promise<string[]> {
    const activeSortColumns = await this.activeSortColumn();
    return await parallel(() => activeSortColumns.map(el => el.text()));
  }

  async getTransformStyle(pinDirection: PinDirection): Promise<string> {
    const group = this.locatorForOptional(`.datatable-row-${pinDirection}`);
    return (await (await group())?.getAttribute('style')) ?? '';
  }
}
