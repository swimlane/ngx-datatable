import { Component, DebugElement, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DATATABLE_COMPONENT_TOKEN } from '../../utils/table-token';
import { DataTableFooterComponent } from './footer.component';

let fixture: ComponentFixture<TestFixtureComponent>;
let component: TestFixtureComponent;
let page: Page;

describe('DataTableFooterComponent', () => {
  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(TestFixtureComponent);
    component = fixture.componentInstance;
    page = new Page();
    page.detectChangesAndRunQueries();
  }));

  describe('div.datatable-footer-inner', () => {
    it(`should have a height`, () => {
      component.footerHeight = 123;
      page.detectChangesAndRunQueries();

      expect(page.datatableFooterInner.nativeElement.style.height).toEqual('123px');
    });

    it('should have `.selected-count` class when selectedMessage is set', () => {
      component.selectedMessage = 'selected';
      component.selectedCount = 1;
      page.detectChangesAndRunQueries();

      expect(page.datatableFooterInner.nativeElement).toHaveClass('selected-count');
    });

    it('should not have `.selected-count` class if selectedMessage is not set', () => {
      component.selectedMessage = undefined;
      page.detectChangesAndRunQueries();

      expect(page.datatableFooterInner.nativeElement).not.toHaveClass('selected-count');
    });
  });

  describe('when there is no template', () => {
    it('should not render a template', () => {
      component.footerTemplate = undefined;
      page.detectChangesAndRunQueries();

      expect(page.templateList).toBeNull();
    });

    it('should display the selected count and total if selectedMessage set', () => {
      component.footerTemplate = undefined;
      component.selectedMessage = 'selected';
      component.selectedCount = 7;
      component.rowCount = 10;
      component.totalMessage = 'total';
      page.detectChangesAndRunQueries();

      expect(page.pageCount.nativeElement.innerText).toEqual('7 selected / 10 total');
    });

    it('should display only the total if selectedMessage is not set', () => {
      component.footerTemplate = undefined;
      component.selectedMessage = undefined;
      component.rowCount = 100;
      component.totalMessage = 'total';
      page.detectChangesAndRunQueries();

      expect(page.pageCount.nativeElement.innerText).toEqual('100 total');
    });

    it('should render a DataTablePagerComponent', () => {
      component.footerTemplate = undefined;
      page.detectChangesAndRunQueries();

      expect(page.datatablePager).not.toBeNull();
    });

    it('should show & hide the DataTablePagerComponent', () => {
      component.rowCount = 200;
      component.pageSize = 5;
      page.detectChangesAndRunQueries();

      expect(page.datatablePager).toBeTruthy();

      component.rowCount = 1;
      component.pageSize = 2;
      page.detectChangesAndRunQueries();

      expect(page.datatablePager).toBeFalsy();
    });
  });

  describe('when there is a template', () => {
    it('should not render div.page-count or DatatablePagerComponent', () => {
      component.footerTemplate = { template: component.testTemplate };
      page.detectChangesAndRunQueries();

      expect(page.pageCount).toBeNull();
      expect(page.datatablePager).toBeNull();
    });

    it('should render the template', () => {
      page.detectChangesAndRunQueries();
      component.footerTemplate = { template: component.testTemplate };
      page.detectChangesAndRunQueries();

      expect(page.templateList).not.toBeNull();
    });

    it('should give the template proper context', () => {
      component.footerTemplate = { template: component.testTemplate };
      component.rowCount = 12;
      component.pageSize = 1;
      component.selectedCount = 4;
      component.offset = 0;
      page.detectChangesAndRunQueries();
      const listItems = page.templateList.queryAll(By.css('li'));

      expect(listItems[0].nativeElement.innerHTML).toContain('rowCount 12');
      expect(listItems[1].nativeElement.innerHTML).toContain('pageSize 1');
      expect(listItems[2].nativeElement.innerHTML).toContain('selectedCount 4');
      expect(listItems[3].nativeElement.innerHTML).toContain('curPage 1');
      expect(listItems[4].nativeElement.innerHTML).toContain('offset 0');
    });
  });
});

/**
 * we test DatatableFooterComponent by embedding it in a
 * test host component
 */
@Component({
  imports: [DataTableFooterComponent],
  template: `
    <datatable-footer
      [rowCount]="rowCount"
      [pageSize]="pageSize"
      [offset]="offset"
      [footerHeight]="footerHeight"
      [footerTemplate]="footerTemplate"
      [totalMessage]="totalMessage"
      [pagerLeftArrowIcon]="pagerLeftArrowIcon"
      [pagerRightArrowIcon]="pagerRightArrowIcon"
      [pagerPreviousIcon]="pagerPreviousIcon"
      [selectedCount]="selectedCount"
      [selectedMessage]="selectedMessage"
      [pagerNextIcon]="pagerNextIcon"
      (page)="onPageEvent()"
    />

    <ng-template
      #testTemplate
      let-rowCount="rowCount"
      let-pageSize="pageSize"
      let-selectedCount="selectedCount"
      let-curPage="curPage"
      let-offset="offset"
    >
      <ul id="template-list">
        <li>rowCount {{ rowCount }}</li>
        <li>pageSize {{ pageSize }}</li>
        <li>selectedCount {{ selectedCount }}</li>
        <li>curPage {{ curPage }}</li>
        <li>offset {{ offset }}</li>
      </ul>
    </ng-template>
  `,
  providers: [{ provide: DATATABLE_COMPONENT_TOKEN, useExisting: TestFixtureComponent }]
})
class TestFixtureComponent {
  footerHeight = 0;
  rowCount = 100;
  pageSize = 1;
  offset = 0;
  pagerLeftArrowIcon = '';
  pagerRightArrowIcon = '';
  pagerPreviousIcon = '';
  pagerNextIcon = '';
  totalMessage = '';
  footerTemplate?: { template: TemplateRef<any> };
  selectedCount = 0;
  selectedMessage?: string;

  /**
   * establishes a reference to a test template that can
   * selectively be passed to the DatatableFooterComponent
   * in these unit tests
   */
  @ViewChild('testTemplate', { read: TemplateRef, static: true })
  testTemplate!: TemplateRef<any>;

  // Used to mimic the DatatableComponent
  readonly _footerComponent = viewChild(DataTableFooterComponent);

  onPageEvent() {
    return;
  }
}

/**
 * a Page is a collection of references to DebugElements. it
 * makes for cleaner testing
 */
class Page {
  datatableFooter!: DebugElement;
  datatableFooterInner!: DebugElement;
  templateList!: DebugElement;
  pageCount!: DebugElement;
  datatablePager!: DebugElement;

  detectChangesAndRunQueries() {
    fixture.detectChanges();

    const de = fixture.debugElement;

    this.datatableFooter = de.query(By.css('datatable-footer'));
    this.datatableFooterInner = de.query(By.css('.datatable-footer-inner'));
    this.templateList = de.query(By.css('#template-list'));
    this.pageCount = de.query(By.css('.page-count'));
    this.datatablePager = de.query(By.css('ngx-datatable-pager'));
  }
}
