import {
  async,
  TestBed
} from '@angular/core/testing';

import { DataTablePagerComponent } from './pager.component';

describe('DataTablePagerComponent', () => {
  let fixture;
  let pager: DataTablePagerComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      DataTablePagerComponent
    ]
  }));

  beforeEach(async(() => {
    TestBed.compileComponents();

    fixture = TestBed.createComponent(DataTablePagerComponent);
    pager = fixture.componentInstance;
    element = fixture.nativeElement;
  }));

  describe('size', () => {
    it('should be defined', () => {
      expect(pager.size).toBeDefined();
    });

    it('should default to 0', () => {
      expect(pager.size).toEqual(0);
    });
  });

  describe('count', () => {
    it('should be defined', () => {
      expect(pager.count).toBeDefined();
    });

    it('should default to 0', () => {
      expect(pager.count).toEqual(0);
    });
  });

  describe('page', () => {
    it('should be defined', () => {
      expect(pager.page).toBeDefined();
    });

    it('should default to 1', () => {
      expect(pager.page).toEqual(1);
    });
  });

  describe('totalPages', () => {
    it('should be defined', () => {
      expect(pager.totalPages).toBeDefined();
    });

    it('should default to 1', () => {
      expect(pager.totalPages).toEqual(1);
    });

    it('should calculate totalPages', () => {
      pager.size = 10;
      pager.count = 28;
      expect(pager.totalPages).toEqual(3);
    });

    it('should have 1 page if size is 0', () => {
      pager.size = 0;
      pager.count = 28;
      expect(pager.totalPages).toEqual(1);
    });

    it('should have 1 page if count is 0', () => {
      pager.size = 10;
      pager.count = 0;
      expect(pager.totalPages).toEqual(1);
    });
  });

  describe('canPrevious()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 100;
    });

    it('should return true if not on first page', () => {
      pager.page = 2;
      expect(pager.canPrevious()).toEqual(true);
    });

    it('should return false if on first page', () => {
      pager.page = 1;
      expect(pager.canPrevious()).toEqual(false);
    });
  });

  describe('canNext()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 100;
    });

    it('should return true if not on last page', () => {
      pager.page = 2;
      expect(pager.canNext()).toEqual(true);
    });

    it('should return false if on last page', () => {
      pager.page = 10;
      expect(pager.canNext()).toEqual(false);
    });
  });

  describe('prevPage()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 100;
    });

    it('should set current page to previous page', () => {
      pager.page = 2;
      pager.prevPage();
      expect(pager.page).toEqual(1);
    });

    it('should emit change event', () => {
      spyOn(pager.change, 'emit');
      pager.page = 2;
      pager.prevPage();
      expect(pager.change.emit).toHaveBeenCalledWith({ page: 1 });
    });

    it('should not change page if already on first page', () => {
      pager.page = 1;
      pager.prevPage();
      expect(pager.page).toEqual(1);
    });
  });

  describe('nextPage()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 100;
    });

    it('should set current page to next page', () => {
      pager.page = 2;
      pager.nextPage();
      expect(pager.page).toEqual(3);
    });

    it('should emit change event', () => {
      spyOn(pager.change, 'emit');
      pager.page = 2;
      pager.nextPage();
      expect(pager.change.emit).toHaveBeenCalledWith({ page: 3 });
    });

    it('should not change page if already on last page', () => {
      pager.page = 10;
      pager.nextPage();
      expect(pager.page).toEqual(10);
    });
  });

  describe('selectPage()', () => {
    beforeEach(() => {
      pager.size = 10;
      pager.count = 100;
      pager.page = 1;
    });

    describe('with a new page', () => {
      it('should set current page', () => {
        pager.selectPage(3);
        expect(pager.page).toEqual(3);
      });

      it('should emit change event', () => {
        spyOn(pager.change, 'emit');
        pager.selectPage(3);
        expect(pager.change.emit).toHaveBeenCalledWith({ page: 3 });
      });
    });

    describe('with the current page', () => {
      it('should not emit change event', () => {
        spyOn(pager.change, 'emit');
        pager.selectPage(pager.page);
        expect(pager.change.emit).not.toHaveBeenCalled();
      });
    });

    describe('with a non-existing page', () => {
      it('should not set current page', () => {
        pager.selectPage(30);
        expect(pager.page).toEqual(1);

        pager.selectPage(0);
        expect(pager.page).toEqual(1);
      });

      it('should not emit change event', () => {
        spyOn(pager.change, 'emit');
        pager.selectPage(30);
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

    it('should return array with max 5 pages to display', () => {
      const pages = pager.calcPages(1);
      expect(pages.length).toEqual(5);
      expect(pages[0].number).toEqual(1);
      expect(pages[4].number).toEqual(5);
    });

    it('should return array with available pages to display', () => {
      pager.count = 30;
      const pages = pager.calcPages(1);
      expect(pages.length).toEqual(3);
      expect(pages[0].number).toEqual(1);
      expect(pages[2].number).toEqual(3);
    });

    xit('should return array containing specified page', () => {
      const pages = pager.calcPages(6);
      expect(pages.length).toEqual(3);
      expect(pages[0].number).toEqual(6);
      expect(pages[2].number).toEqual(8);
    });

    xit('should use current page if no page is specified', () => {
      pager.page = 7;
      const pages = pager.calcPages();
      expect(pages.length).toEqual(3);
      expect(pages[0].number).toEqual(6);
      expect(pages[2].number).toEqual(8);
    });

    xit('should return empty array if specified page does not exist', () => {
      const pages = pager.calcPages(16);
      expect(pages.length).toEqual(0);
    });
  });
});
