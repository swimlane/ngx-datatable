import {FixedRowHeightPage} from "../pages/fixed-row-height.po";
import {all} from "q";

describe('Fixed row height', () => {

  let fixedRowHeight;

  beforeAll(() => {
    fixedRowHeight = new FixedRowHeightPage();

    fixedRowHeight.navigateTo();
  });

  it('should show 3 columns', () => {
    expect(fixedRowHeight.table.columnCount).toBe(3);
  });

  it('should have same rowheights for row 1 & 2', () => {

    all([
      fixedRowHeight.table.rowSize(0),
      fixedRowHeight.table.rowSize(1)
    ])
      .then((sizes) => {
        let [row1, row2] = sizes;

        expect(row1.height).toBe(row2.height);
      });
  });

});
