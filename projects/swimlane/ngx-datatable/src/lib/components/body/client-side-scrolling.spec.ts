import { inputBinding, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TableColumn } from '../../types/table-column.type';
import { DatatableComponent } from '../datatable.component';

const ROW_HEIGHT = 40;
const expectedOffset = (index: number): number => index * ROW_HEIGHT;

describe('Client-side Scrolling – DatatableComponent.scrollToRow', () => {
  let fixture: ComponentFixture<DatatableComponent>;
  let datatable: DatatableComponent;
  /** The datatable-body element, which is the scrollable container. */
  let bodyEl: HTMLElement;

  let columnsSig: WritableSignal<TableColumn[]>;
  let rowsSig: WritableSignal<{ id: number; name: string }[]>;
  let rowHeight: WritableSignal<number>;
  let scrollbarV: WritableSignal<boolean>;
  let virtualization: WritableSignal<boolean>;
  let limit: WritableSignal<number | undefined>;
  let groupRowsBy: WritableSignal<string | undefined>;
  let treeToRelation: WritableSignal<string | undefined>;

  beforeEach(async () => {
    columnsSig = signal<TableColumn[]>([{ name: 'ID', prop: 'id' }]);
    rowsSig = signal(Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `Row ${i + 1}` })));
    rowHeight = signal(ROW_HEIGHT);
    scrollbarV = signal(true);
    virtualization = signal(true);
    limit = signal(undefined);
    groupRowsBy = signal(undefined);
    treeToRelation = signal(undefined);

    fixture = TestBed.createComponent(DatatableComponent, {
      bindings: [
        inputBinding('columns', columnsSig),
        inputBinding('rows', rowsSig),
        inputBinding('rowHeight', rowHeight),
        inputBinding('scrollbarV', scrollbarV),
        inputBinding('virtualization', virtualization),
        inputBinding('limit', limit),
        inputBinding('groupRowsBy', groupRowsBy),
        inputBinding('treeToRelation', treeToRelation)
      ]
    });
    await fixture.whenStable();

    datatable = fixture.componentInstance;
    bodyEl = fixture.debugElement.query(By.css('datatable-body')).nativeElement as HTMLElement;
  });

  describe('With virtualization', () => {
    it('should scroll to the first row (offset 0)', () => {
      datatable.scrollToRow(rowsSig()[0]);
      expect(bodyEl.scrollTop).toBeCloseTo(expectedOffset(0));
    });

    it('should scroll to the last row', () => {
      datatable.scrollToRow(rowsSig()[49]);
      expect(bodyEl.scrollTop).toBeCloseTo(expectedOffset(49));
    });

    it('should scroll to a middle row', () => {
      datatable.scrollToRow(rowsSig()[9]);
      expect(bodyEl.scrollTop).toBeCloseTo(expectedOffset(9));
    });

    it('should use instant behavior when specified', () => {
      const scrollToSpy = vi.spyOn(bodyEl, 'scrollTo');
      datatable.scrollToRow(rowsSig()[9], { behavior: 'instant' });
      expect(scrollToSpy).toHaveBeenCalledWith({ top: expectedOffset(9), behavior: 'instant' });
    });

    describe('block option', () => {
      /** Body viewport height established by the test harness. */
      let viewportHeight: number;

      beforeEach(async () => {
        // Force a deterministic viewport height so block calculations are predictable.
        bodyEl.style.height = '200px';
        await fixture.whenStable();
        viewportHeight = bodyEl.clientHeight;
      });

      it('should scroll to start by default', () => {
        datatable.scrollToRow(rowsSig()[20]);
        expect(bodyEl.scrollTop).toBeCloseTo(expectedOffset(20));
      });

      it('should scroll with block: "start"', () => {
        datatable.scrollToRow(rowsSig()[20], { block: 'start' });
        expect(bodyEl.scrollTop).toBeCloseTo(expectedOffset(20));
      });

      it('should scroll with block: "center"', () => {
        datatable.scrollToRow(rowsSig()[20], { block: 'center' });
        const expected = Math.max(
          0,
          expectedOffset(20) - Math.max(0, (viewportHeight - ROW_HEIGHT) / 2)
        );
        expect(bodyEl.scrollTop).toBeCloseTo(expected);
      });

      it('should scroll with block: "end"', () => {
        datatable.scrollToRow(rowsSig()[20], { block: 'end' });
        const expected = Math.max(0, expectedOffset(21) - viewportHeight);
        expect(bodyEl.scrollTop).toBeCloseTo(expected);
      });

      it('should clamp negative tops to 0 (e.g. block: "end" on first row)', () => {
        datatable.scrollToRow(rowsSig()[0], { block: 'end' });
        expect(bodyEl.scrollTop).toBe(0);
      });

      describe('block: "nearest"', () => {
        it('should scroll up to row top when row is above the viewport', () => {
          bodyEl.scrollTop = expectedOffset(30);
          datatable.scrollToRow(rowsSig()[5], { block: 'nearest' });
          expect(bodyEl.scrollTop).toBeCloseTo(expectedOffset(5));
        });

        it('should scroll down so row bottom aligns when row is below the viewport', () => {
          bodyEl.scrollTop = 0;
          datatable.scrollToRow(rowsSig()[49], { block: 'nearest' });
          const expected = Math.max(0, expectedOffset(50) - viewportHeight);
          expect(bodyEl.scrollTop).toBeCloseTo(expected);
        });

        it('should not change scroll position when row is already fully visible', () => {
          const currentTop = expectedOffset(2);
          bodyEl.scrollTop = currentTop;
          datatable.scrollToRow(rowsSig()[3], { block: 'nearest' });
          expect(bodyEl.scrollTop).toBeCloseTo(currentTop);
        });
      });
    });
  });

  describe('Without virtualization', () => {
    beforeEach(async () => {
      virtualization.set(false);
      await fixture.whenStable();
    });

    it('should scroll to the first row (offset 0)', () => {
      datatable.scrollToRow(rowsSig()[0]);
      expect(bodyEl.scrollTop).toBeCloseTo(expectedOffset(0));
    });

    it('should scroll to the last row', () => {
      datatable.scrollToRow(rowsSig()[49]);
      expect(bodyEl.scrollTop).toBeCloseTo(expectedOffset(49));
    });

    it('should scroll to a middle row', () => {
      datatable.scrollToRow(rowsSig()[9]);
      expect(bodyEl.scrollTop).toBeCloseTo(expectedOffset(9));
    });

    it('should use smooth behavior when specified', () => {
      const rowWrappers = bodyEl.querySelectorAll('datatable-row-wrapper');
      const scrollIntoViewSpy = vi.spyOn(rowWrappers[9], 'scrollIntoView');
      datatable.scrollToRow(rowsSig()[9], { behavior: 'smooth' });
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });

    it.each(['start', 'center', 'end', 'nearest'] as const)(
      'should forward block: "%s" to native scrollIntoView',
      block => {
        const rowWrappers = bodyEl.querySelectorAll('datatable-row-wrapper');
        const scrollIntoViewSpy = vi.spyOn(rowWrappers[9], 'scrollIntoView');
        datatable.scrollToRow(rowsSig()[9], { block });
        expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: undefined, block });
      }
    );
  });

  describe('Guard conditions', () => {
    it('should throw when scrollbarV is false', async () => {
      scrollbarV.set(false);
      await fixture.whenStable();

      expect(() => datatable.scrollToRow(rowsSig()[0])).toThrowError(
        'Vertical scrolling is not enabled.'
      );
    });

    it('should throw when the row is not in the table', () => {
      const unknownRow = { id: 999, name: 'Ghost' };
      expect(() => datatable.scrollToRow(unknownRow)).toThrowError(/Row not found/);
    });

    it('should throw when rows are grouped', async () => {
      groupRowsBy.set('id');
      await fixture.whenStable();

      expect(() => datatable.scrollToRow(rowsSig()[0])).toThrowError(
        'Scrolling is not supported with grouped rows.'
      );
    });

    it('should throw when treeToRelation is set', async () => {
      treeToRelation.set('parentId');
      await fixture.whenStable();

      expect(() => datatable.scrollToRow(rowsSig()[0])).toThrowError(
        'Scrolling is not supported with tree data.'
      );
    });

    it('should throw when a page limit is set', async () => {
      limit.set(10);
      await fixture.whenStable();

      expect(() => datatable.scrollToRow(rowsSig()[0])).toThrowError(
        'Scrolling is not supported with limit'
      );
    });
  });
});
