import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, ChangeDetectorRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import type { DatatableComponent } from '../datatable.component';
import { DataTablePagerComponent } from './pager.component';
import { PagerHarness } from './testing/pager.harness';

describe('DataTablePagerComponent', () => {
  let fixture: ComponentFixture<DataTablePagerComponent>;
  let pager: DataTablePagerComponent;
  let harness: PagerHarness;

  beforeEach(async () => {
    TestBed.overrideComponent(DataTablePagerComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    });
    fixture = TestBed.createComponent(DataTablePagerComponent);
    pager = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, PagerHarness);
  });

  describe('totalPages', () => {
    it('should calculate totalPages', async () => {
      pager.size = 10;
      pager.count = 28;
      expect(await harness.pageCount()).toEqual(3);
    });

    it('should have 1 page if size is 0', async () => {
      pager.size = 0;
      pager.count = 28;
      expect(await harness.pageCount()).toEqual(1);
    });

    it('should have 1 page if count is 0', async () => {
      pager.size = 10;
      pager.count = 0;
      expect(await harness.pageCount()).toEqual(1);
    });
  });

  describe('canPrevious()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 100;
    });

    it('should return true if not on first page', async () => {
      pager.page = 2;
      expect(await harness.hasPrevious()).toBeTrue();
    });

    it('should return false if on first page', async () => {
      pager.page = 1;
      expect(await harness.hasPrevious()).toBeFalse();
    });
  });

  describe('canNext()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 100;
    });

    it('should return true if not on last page', async () => {
      pager.page = 2;
      expect(await harness.hasNext()).toBeTrue();
    });

    it('should return false if on last page', async () => {
      pager.page = 10;
      expect(await harness.hasNext()).toBeFalse();
    });
  });

  describe('prevPage()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 100;
    });

    it('should set current page to previous page', async () => {
      pager.page = 2;
      await harness.clickPrevious();
      expect(await harness.currentPage()).toEqual(1);
    });

    it('should emit change event', async () => {
      spyOn(pager.change, 'emit');
      pager.page = 2;
      await harness.clickPrevious();
      expect(pager.change.emit).toHaveBeenCalledWith({ page: 1 });
    });

    it('should not change page if already on first page', async () => {
      pager.page = 1;
      await harness.clickPrevious();
      expect(await harness.currentPage()).toEqual(1);
    });
  });

  describe('nextPage()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 100;
    });

    it('should set current page to next page', async () => {
      pager.page = 2;
      await harness.clickNext();
      expect(await harness.currentPage()).toEqual(3);
    });

    it('should emit change event', async () => {
      spyOn(pager.change, 'emit');
      pager.page = 2;
      await harness.clickNext();
      expect(pager.change.emit).toHaveBeenCalledWith({ page: 3 });
    });

    it('should not change page if already on last page', async () => {
      pager.page = 10;
      await harness.clickNext();
      expect(await harness.currentPage()).toEqual(10);
    });
  });

  describe('selectPage()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 100;
      pager.page = 1;
    });

    describe('with a new page', () => {
      it('should set current page', async () => {
        await harness.clickPage(3);
        expect(await harness.currentPage()).toEqual(3);
      });

      it('should emit change event', async () => {
        spyOn(pager.change, 'emit');
        await harness.clickPage(3);
        expect(pager.change.emit).toHaveBeenCalledWith({ page: 3 });
      });
    });

    describe('with the current page', () => {
      it('should not emit change event', async () => {
        spyOn(pager.change, 'emit');
        await harness.clickPage(pager.page);
        expect(pager.change.emit).not.toHaveBeenCalled();
      });
    });
  });

  describe('calcPages()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 73;
      pager.page = 1;
    });

    it('should return array with max 5 pages to display', async () => {
      expect(await harness.pageRange()).toEqual('1-5');
    });

    it('should return array with available pages to display', async () => {
      pager.count = 30;
      expect(await harness.pageRange()).toEqual('1-3');
    });

    it('should return array containing specified page', async () => {
      pager.page = 6;
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
      pager.size = 10;
      pager.count = 100;
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
        (pager as any).dataTable = { messages };
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
