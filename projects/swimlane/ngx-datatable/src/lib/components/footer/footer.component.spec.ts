import {
  Component,
  DebugElement,
  provideZonelessChangeDetection,
  signal,
  Signal,
  TemplateRef,
  viewChild
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DATATABLE_COMPONENT_TOKEN } from '../../utils/table-token';
import { DataTableFooterComponent } from './footer.component';

let fixture: ComponentFixture<TestFixtureComponent>;
let component: TestFixtureComponent;
let page: Page;

describe('DataTableFooterComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(TestFixtureComponent);
    component = fixture.componentInstance;
    page = new Page();
    await page.detectChangesAndRunQueries();
  });

  describe('div.datatable-footer-inner', () => {
    it(`should have a height`, async () => {
      component.footerHeight.set(123);
      await page.detectChangesAndRunQueries();

      expect(page.datatableFooterInner.nativeElement.style.height).toEqual('123px');
    });

    it('should have `.selected-count` class when selectedMessage is set', async () => {
      component.selectedMessage.set('selected');
      component.selectedCount.set(1);
      await page.detectChangesAndRunQueries();

      expect(page.datatableFooterInner.nativeElement).toHaveClass('selected-count');
    });

    it('should not have `.selected-count` class if selectedMessage is not set', async () => {
      component.selectedMessage.set(undefined);
      await page.detectChangesAndRunQueries();

      expect(page.datatableFooterInner.nativeElement).not.toHaveClass('selected-count');
    });
  });

  describe('when there is no template', () => {
    it('should not render a template', async () => {
      component.footerTemplate.set(undefined);
      await page.detectChangesAndRunQueries();

      expect(page.templateList).toBeNull();
    });

    it('should display the selected count and total if selectedMessage set', async () => {
      component.footerTemplate.set(undefined);
      component.selectedMessage.set('selected');
      component.selectedCount.set(7);
      component.rowCount.set(10);
      component.totalMessage.set('total');
      await page.detectChangesAndRunQueries();

      expect(page.pageCount.nativeElement.innerText).toEqual('7 selected / 10 total');
    });

    it('should display only the total if selectedMessage is not set', async () => {
      component.footerTemplate.set(undefined);
      component.selectedMessage.set(undefined);
      component.rowCount.set(100);
      component.totalMessage.set('total');
      await page.detectChangesAndRunQueries();

      expect(page.pageCount.nativeElement.innerText).toEqual('100 total');
    });

    it('should render a DataTablePagerComponent', async () => {
      component.footerTemplate.set(undefined);
      await page.detectChangesAndRunQueries();

      expect(page.datatablePager).not.toBeNull();
    });

    it('should show & hide the DataTablePagerComponent', async () => {
      component.rowCount.set(200);
      component.pageSize.set(5);
      await page.detectChangesAndRunQueries();

      expect(page.datatablePager).toBeTruthy();

      component.rowCount.set(1);
      component.pageSize.set(2);
      await page.detectChangesAndRunQueries();

      expect(page.datatablePager).toBeFalsy();
    });
  });

  describe('when there is a template', () => {
    it('should not render div.page-count or DatatablePagerComponent', async () => {
      component.footerTemplate.set({ template: component.testTemplate });
      await page.detectChangesAndRunQueries();

      expect(page.pageCount).toBeNull();
      expect(page.datatablePager).toBeNull();
    });

    it('should render the template', async () => {
      await page.detectChangesAndRunQueries();
      component.footerTemplate.set({ template: component.testTemplate });
      await page.detectChangesAndRunQueries();

      expect(page.templateList).not.toBeNull();
    });

    it('should give the template proper context', async () => {
      component.footerTemplate.set({ template: component.testTemplate });
      component.rowCount.set(12);
      component.pageSize.set(1);
      component.selectedCount.set(4);
      component.offset.set(0);
      await page.detectChangesAndRunQueries();
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
      [rowCount]="rowCount()"
      [groupCount]="undefined"
      [pageSize]="pageSize()"
      [offset]="offset()"
      [footerHeight]="footerHeight()"
      [footerTemplate]="footerTemplate()"
      [totalMessage]="totalMessage()"
      [pagerLeftArrowIcon]="pagerLeftArrowIcon()"
      [pagerRightArrowIcon]="pagerRightArrowIcon()"
      [pagerPreviousIcon]="pagerPreviousIcon()"
      [selectedCount]="selectedCount()"
      [selectedMessage]="selectedMessage()"
      [pagerNextIcon]="pagerNextIcon()"
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
  readonly footerHeight = signal(0);
  readonly rowCount = signal(100);
  readonly pageSize = signal(1);
  readonly offset = signal(0);
  readonly pagerLeftArrowIcon = signal('');
  readonly pagerRightArrowIcon = signal('');
  readonly pagerPreviousIcon = signal('');
  readonly pagerNextIcon = signal('');
  readonly totalMessage = signal('');
  readonly footerTemplate = signal<{ template: Signal<TemplateRef<any>> } | undefined>(undefined);
  readonly selectedCount = signal(0);
  readonly selectedMessage = signal<string | undefined>(undefined);
  readonly messages = signal({});

  /**
   * establishes a reference to a test template that can
   * selectively be passed to the DatatableFooterComponent
   * in these unit tests
   */
  readonly testTemplate = viewChild.required('testTemplate', { read: TemplateRef });

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

  async detectChangesAndRunQueries() {
    await fixture.whenStable();

    const de = fixture.debugElement;

    this.datatableFooter = de.query(By.css('datatable-footer'));
    this.datatableFooterInner = de.query(By.css('.datatable-footer-inner'));
    this.templateList = de.query(By.css('#template-list'));
    this.pageCount = de.query(By.css('.page-count'));
    this.datatablePager = de.query(By.css('ngx-datatable-pager'));
  }
}
