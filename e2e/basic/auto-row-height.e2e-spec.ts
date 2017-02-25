import {AutoRowHeightPage} from "../pages/auto-row-height.po";
import {all} from "q";

describe('Auto row height', () => {

  let autoRowHeight;

  beforeAll(() => {
    autoRowHeight = new AutoRowHeightPage();

    autoRowHeight.navigateTo();
  });

  it('should show 3 columns', () => {
    expect(autoRowHeight.table.columnCount).toBe(3);
  });

  it('should have a bigger first row', () => {

    all([
      autoRowHeight.table.rowSize(0),
      autoRowHeight.table.rowSize(1)
    ])
      .then((sizes) => {
        let [row1, row2] = sizes;

        expect(row1.height > row2.height).toBe(true);
      });
  });

});
