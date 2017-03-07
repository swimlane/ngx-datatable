import {BasePage} from "./util/base.po";

export class AutoRowHeightPage extends BasePage {

  _pageTitle = 'Fluid Row Heights';

  navigateTo() {
    return super.navigateTo('/')
      .then(() => {
          expect(this.title).toBe(this._pageTitle)
      });
  }

}
