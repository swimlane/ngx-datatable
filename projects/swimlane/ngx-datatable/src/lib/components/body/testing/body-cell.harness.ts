import { ComponentHarness, TestElement } from '@angular/cdk/testing';

export class BodyCellHarness extends ComponentHarness {
  static readonly hostSelector = 'datatable-body-cell';

  private bodyCell = this.locatorForOptional('.datatable-body-cell-label');

  private treeToggleButton = this.locatorForOptional('button.datatable-tree-button');

  async getBodyCellText(): Promise<string> {
    const cell = await this.bodyCell();
    return cell?.text() ?? '';
  }

  private async getCheckbox(): Promise<TestElement | null> {
    const checkbox = await this.locatorForOptional('[aria-label="checkbox message"]')();
    return checkbox;
  }

  async toggleCheckbox(): Promise<void> {
    const checkbox = await this.getCheckbox();
    if (checkbox) {
      await checkbox.click();
    }
  }

  async hasCheckbox(): Promise<boolean> {
    const checkbox = await this.getCheckbox();
    return !!checkbox;
  }

  async getTreeToggleButtonStatus(): Promise<string | null> {
    const button = await this.treeToggleButton();
    return button ? button.getAttribute('aria-label') : null;
  }

  async hasTreeToggleButton(): Promise<boolean> {
    const button = await this.treeToggleButton();
    return !!button;
  }

  async clickTreeToggleButton(): Promise<void> {
    const button = await this.treeToggleButton();
    if (button) {
      await button.click();
    }
  }

  async bodyCellWidth(): Promise<number> {
    const cell = await this.host();
    const width = await cell?.getProperty('offsetWidth');
    return width ? Number(width) : 0;
  }
}
