import { ComponentHarness } from '@angular/cdk/testing';

export class GhostLoaderHarness extends ComponentHarness {
  static readonly hostSelector = 'ghost-loader';

  private ghostElements = this.locatorForAll('.ghost-element');
  private ghostCells = this.locatorForAll('.ghost-cell');

  async getGhostElementCount(): Promise<number> {
    const elements = await this.ghostElements();
    return elements.length;
  }

  async getGhostCellCount(): Promise<number> {
    const cells = await this.ghostCells();
    return cells.length;
  }

  async getGhostCellContent(index: number): Promise<string> {
    const cells = await this.ghostCells();
    if (index < 0 || index >= cells.length) {
      throw new Error(`Index ${index} is out of bounds for ghost cells.`);
    }
    return cells[index].text();
  }
}
