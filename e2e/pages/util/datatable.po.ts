import {browser, by, element, ElementArrayFinder} from "protractor";

export class NgxDataTablePo {

  columns(): ElementArrayFinder {
    return element.all(by.css('datatable-header-cell'))
  }

  rows(): ElementArrayFinder {
    return element.all(by.css('datatable-row-wrapper'))
  }

  columnByIdx(idx) {
    return this.columns()
      .get(idx)
  }

  get columnCount(): any {
    return this.columns().count();
  }

  columnText(idx) {
    return this.columns()
      .get(idx)
      .getText()
  }

  drag(colFromIdx, colToIdx) {
    let distance = colFromIdx > colToIdx
      ? -200
      : 200;

    // works on browser of 1000 x 1000
    if (colFromIdx + colToIdx == 2) {
      distance *= 2;
    }

    return this.columnByIdx(colFromIdx).$('.draggable').getWebElement()
      .then(el => browser.actions()
        .mouseDown(el)
        .perform()
      )
      .then(() => {
        browser.sleep(600)
      })
      // .then(() => this.columnByIdx(colToIdx).$('.draggable').getWebElement())
      .then((el) => browser.actions()
        .mouseMove({ x: distance, y: 0})
        .mouseUp()
        .perform()
      );
  }

  rowSize(idx: number): any {
    return this.rows().get(idx)
      .getWebElement()
      .then(_ => _.getSize())
  }


}
