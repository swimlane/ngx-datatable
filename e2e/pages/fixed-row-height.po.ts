import {BasePage} from "./util/base.po";

export class FixedRowHeightPage extends BasePage {

  _pageTitle = 'Fix Row Height';
  _menuTitle = 'Fixed Row Height';

  navigateTo() {
    return super.navigateTo('/')
      .then(() =>
        this.menuItem(this._menuTitle).click()
      )
      .then(() => {
          expect(this.title).toBe(this._pageTitle)
      });
  }

}
