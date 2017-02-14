import {browser, by, element } from "protractor";
import {NgxDataTablePo} from "./datatable.po";

export class BasePage {

  table: NgxDataTablePo = new NgxDataTablePo();

  navigateTo(url) {
    browser.driver.manage().window().setSize(1000, 1000);

    return browser.get(url)
  }

  get title(): any {
    return element(by.css('content div>h3')).getText();
  }

  menuItem(label): any {
    return element.all(by.css('.main-ul a'))
      .filter(el => el.getText().then(menuItem => menuItem == label))
      .first();
  }

  printColumns() {
    this.table.columns()
      .map(el => el.getText().then(_ => _))
      .then(cols => console.log(cols));
  }


}
