import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, ChangeDetectorRef, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DATATABLE_COMPONENT_TOKEN } from '../../utils/table-token';
import type { DatatableComponent } from '../datatable.component';
import { DatatablePagerComponent } from './pager.component';
import { PagerHarness } from './testing/pager.harness';

describe('DataTablePagerComponent', () => {
  let fixture: ComponentFixture<DatatablePagerComponent>;
  let pager: DatatablePagerComponent;
  let harness: PagerHarness;
  const footer = {
    curPage: signal(0),
    pageSize: signal(1),
    rowCount: signal(0),
    pagerNextIcon: signal(''),
    pagerRightArrowIcon: signal(''),
    pagerLeftArrowIcon: signal(''),
    pagerPreviousIcon: signal(''),
    page: { emit: ({ page }: { page: number }) => footer.curPage.set(page) }
  };

  beforeEach(async () => {
    TestBed.overrideComponent(DatatablePagerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default,
        providers: [
          {
            provide: DATATABLE_COMPONENT_TOKEN,
            useValue: { _footerComponent: signal(footer) }
          }
        ]
      }
    });
    fixture = TestBed.createComponent(DatatablePagerComponent);
    pager = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, PagerHarness);
  });

  describe('totalPages', () => {
    it('should calculate totalPages', async () => {
      footer.pageSize.set(10);
      footer.rowCount.set(28);
      expect(await harness.pageCount()).toEqual(3);
    });

    it('should have 1 page if size is 0', async () => {
      footer.pageSize.set(0);
      footer.rowCount.set(28);
      expect(await harness.pageCount()).toEqual(1);
    });

    it('should have 1 page if count is 0', async () => {
      footer.pageSize.set(10);
      footer.rowCount.set(0);
      expect(await harness.pageCount()).toEqual(1);
    });
  });

  describe('canPrevious()', () => {
    beforeEach(() => {
      footer.pageSize.set(10);
      footer.rowCount.set(100);
    });

    it('should return true if not on first page', async () => {
      footer.curPage.set(2);
      expect(await harness.hasPrevious()).toBeTrue();
    });

    it('should return false if on first page', async () => {
      footer.curPage.set(1);
      expect(await harness.hasPrevious()).toBeFalse();
    });
  });

  describe('canNext()', () => {
    beforeEach(() => {
      footer.pageSize.set(10);
      footer.rowCount.set(100);
    });

    it('should return true if not on last page', async () => {
      footer.curPage.set(2);
      expect(await harness.hasNext()).toBeTrue();
    });

    it('should return false if on last page', async () => {
      footer.curPage.set(10);
      expect(await harness.hasNext()).toBeFalse();
    });
  });

  describe('prevPage()', () => {
    beforeEach(() => {
      footer.pageSize.set(10);
      footer.rowCount.set(100);
    });

    it('should set current page to previous page', async () => {
      footer.curPage.set(2);
      await harness.clickPrevious();
      expect(await harness.currentPage()).toEqual(1);
    });

    it('should emit change event', async () => {
      spyOn(footer.page, 'emit');
      footer.curPage.set(2);
      await harness.clickPrevious();
      expect(footer.page.emit).toHaveBeenCalledWith({ page: 1 });
    });

    it('should not change page if already on first page', async () => {
      footer.curPage.set(1);
      await harness.clickPrevious();
      expect(await harness.currentPage()).toEqual(1);
    });
  });

  describe('nextPage()', () => {
    beforeEach(() => {
      footer.pageSize.set(10);
      footer.rowCount.set(100);
    });

    it('should set current page to next page', async () => {
      footer.curPage.set(2);
      await harness.clickNext();
      expect(await harness.currentPage()).toEqual(3);
    });

    it('should emit change event', async () => {
      spyOn(footer.page, 'emit');
      footer.curPage.set(2);
      await harness.clickNext();
      expect(footer.page.emit).toHaveBeenCalledWith({ page: 3 });
    });

    it('should not change page if already on last page', async () => {
      footer.curPage.set(10);
      await harness.clickNext();
      expect(await harness.currentPage()).toEqual(10);
    });
  });

  describe('selectPage()', () => {
    beforeEach(() => {
      footer.pageSize.set(10);
      footer.rowCount.set(100);
      footer.curPage.set(1);
    });

    describe('with a new page', () => {
      it('should set current page', async () => {
        await harness.clickPage(3);
        expect(await harness.currentPage()).toEqual(3);
      });

      it('should emit change event', async () => {
        spyOn(footer.page, 'emit');
        await harness.clickPage(3);
        expect(footer.page.emit).toHaveBeenCalledWith({ page: 3 });
      });
    });

    describe('with the current page', () => {
      it('should not emit change event', async () => {
        spyOn(footer.page, 'emit');
        await harness.clickPage(footer.curPage());
        expect(footer.page.emit).not.toHaveBeenCalled();
      });
    });
  });

  describe('calcPages()', () => {
    beforeEach(() => {
      footer.pageSize.set(10);
      footer.rowCount.set(73);
      footer.curPage.set(1);
    });

    it('should return array with max 5 pages to display', async () => {
      expect(await harness.pageRange()).toEqual('1-5');
    });

    it('should return array with available pages to display', async () => {
      footer.rowCount.set(30);
      expect(await harness.pageRange()).toEqual('1-3');
    });

    it('should return array containing specified page', async () => {
      footer.curPage.set(6);
      expect(await harness.pageRange()).toEqual('4-8');
    });
  });

  describe('localisation', () => {
    let firstButton: DebugElement;
    let previousButton: DebugElement;
    let nextButton: DebugElement;
    let lastButton: DebugElement;
    let pageButtons: { button: DebugElement; page: number }[];
    beforeEach(() => {
      footer.pageSize.set(10);
      footer.rowCount.set(100);
      fixture.detectChanges();
      [firstButton, previousButton, nextButton, lastButton] = fixture.debugElement
        .queryAll(By.css('a[role=button]'))
        .filter(it => !it.parent!.classes.pages);
      pageButtons = fixture.debugElement
        .queryAll(By.css('li.pages'))
        .map((button, index) => ({ button, page: index + 1 }));
    });

    const ariaLabel = (element: DebugElement): string | null => {
      return element?.attributes['aria-label'] ?? null;
    };

    describe('takes messages-overrides from table', () => {
      const setMessages = (messages: DatatableComponent['messages']) => {
        (pager as any).datatable = { messages };
        // do a change detection on the real changeDetectionRef
        fixture.componentRef.injector.get(ChangeDetectorRef).detectChanges();
      };

      it('first button', () => {
        setMessages({ ariaFirstPageMessage: 'link: first page' });
        expect(ariaLabel(firstButton)).toEqual('link: first page');
      });

      it('previous button', () => {
        setMessages({ ariaPreviousPageMessage: 'link: previous page' });
        expect(ariaLabel(previousButton)).toEqual('link: previous page');
      });

      it('next button', () => {
        setMessages({ ariaNextPageMessage: 'link: next page' });
        expect(ariaLabel(nextButton)).toEqual('link: next page');
      });

      it('last button', () => {
        setMessages({ ariaLastPageMessage: 'link: last page' });
        expect(ariaLabel(lastButton)).toEqual('link: last page');
      });

      it('page buttons', () => {
        setMessages({ ariaPageNMessage: 'link: page' });
        for (const { button, page } of pageButtons) {
          expect(ariaLabel(button)).withContext(`${page} button`).toEqual(`link: page ${page}`);
        }
      });
    });
  });
});
