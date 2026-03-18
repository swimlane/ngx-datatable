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
      datatable.scrollToRow(rowsSig()[9], 'instant');
      expect(scrollToSpy).toHaveBeenCalledWith({ top: expectedOffset(9), behavior: 'instant' });
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
      datatable.scrollToRow(rowsSig()[9], 'smooth');
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
    });
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
