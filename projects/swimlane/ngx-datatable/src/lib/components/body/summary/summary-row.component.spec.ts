import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, ComponentRef, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import { TableColumnInternal } from '../../../types/internal.types';
import { toInternalColumn } from '../../../utils/column-helper';
import { DataTableSummaryRowComponent } from './summary-row.component';
import { SummaryHarness } from './testing/summary.harness';

describe('DataTableSummaryRowComponent', () => {
  let fixture: ComponentFixture<DataTableSummaryRowComponent>;
  let componentRef: ComponentRef<DataTableSummaryRowComponent>;
  let harness: SummaryHarness;

  let rows: any[];
  let columns: TableColumnInternal[];

  beforeEach(() => {
    rows = [
      { col1: 10, col2: 20 },
      { col1: 1, col2: 30 }
    ];
    columns = toInternalColumn([{ prop: 'col1' }, { prop: 'col2' }]);
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: false }]
    });
    fixture = TestBed.createComponent(DataTableSummaryRowComponent);

    fixture.componentRef.setInput('columns', columns);
    fixture.componentRef.setInput('rows', rows);
    fixture.componentRef.setInput('rowHeight', 30);
    fixture.autoDetectChanges();

    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, SummaryHarness);
    componentRef = fixture.componentRef;
  });

  describe('Visibility', () => {
    it('should not be visible when there are no columns', async () => {
      componentRef.setInput('columns', []);
      componentRef.setInput('rows', rows);
      expect(await harness.hasSummaryRow()).toBe(false);
    });

    it('should not be visible when there are no rows', async () => {
      componentRef.setInput('columns', columns);
      componentRef.setInput('rows', []);
      expect(await harness.hasSummaryRow()).toBe(false);
    });

    it('should be visible when there are rows and columns', async () => {
      componentRef.setInput('columns', columns);
      componentRef.setInput('rows', rows);
      expect(await harness.hasSummaryRow()).toBe(true);
    });
  });

  describe('Computing', () => {
    beforeEach(() => {
      componentRef.setInput('columns', columns);
      componentRef.setInput('rows', rows);
    });

    describe('Default Summary Function', () => {
      it('should be used when no other provided', async () => {
        const col1Text = await harness.getSummaryRowCellText(0);
        const col2Text = await harness.getSummaryRowCellText(1);

        expect(col1Text).toBe((rows[0].col1 + rows[1].col1).toString());
        expect(col2Text).toBe((rows[0].col2 + rows[1].col2).toString());
      });

      it('should works with empty row', async () => {
        componentRef.setInput('rows', [{ col1: null, col2: undefined }, { col1: null }]);

        const col1Text = await harness.getSummaryRowCellText(0);
        const col2Text = await harness.getSummaryRowCellText(1);

        expect(col1Text).toBe('');
        expect(col2Text).toBe('');
      });

      it('should not compute a result if there are non-number cells', async () => {
        componentRef.setInput('rows', [
          { col1: 'aaa', col2: 'xxx' },
          { col1: 'bbb', col2: 34 }
        ]);

        const col1Text = await harness.getSummaryRowCellText(0);
        const col2Text = await harness.getSummaryRowCellText(1);

        expect(col1Text).toBe('');
        expect(col2Text).toBe('');
      });

      it('should not compute a result if there are non-number cells', async () => {
        componentRef.setInput('rows', [
          { col1: 'aaa', col2: 'xxx' },
          { col1: 'bbb', col2: 34 }
        ]);

        const col1Text = await harness.getSummaryRowCellText(0);
        const col2Text = await harness.getSummaryRowCellText(1);

        expect(col1Text).toBe('');
        expect(col2Text).toBe('');
      });
    });

    it('should not compute if null is set as a summary function', async () => {
      columns[0].summaryFunc = null;
      componentRef.setInput('columns', [...columns]);
      const col1Text = await harness.getSummaryRowCellText(0);
      expect(col1Text).toBe('');
    });

    it('should use provided summary function', async () => {
      const sum1 = 22;
      const sum2 = 'test sum';
      const spy1 = vi.fn().mockReturnValue(sum1);
      const spy2 = vi.fn().mockReturnValue(sum2);
      columns[0].summaryFunc = spy1;
      columns[1].summaryFunc = spy2;

      componentRef.setInput('columns', [...columns]);

      const col1Text = await harness.getSummaryRowCellText(0);
      const col2Text = await harness.getSummaryRowCellText(1);

      expect(vi.mocked(spy1)).toHaveBeenCalled();
      expect(vi.mocked(spy2)).toHaveBeenCalled();

      expect(vi.mocked(spy1).mock.lastCall![0]).toEqual([rows[0].col1, rows[1].col1]);
      expect(vi.mocked(spy2).mock.lastCall![0]).toEqual([rows[0].col2, rows[1].col2]);

      expect(col1Text).toBe(sum1.toString());
      expect(col2Text).toBe(sum2.toString());
    });

    describe('Pipe', () => {
      it('should use provided pipe', async () => {
        const transformed = '$22';
        const transformSpy = vi.fn().mockReturnValue(transformed);

        columns[0].pipe = { transform: transformSpy };
        componentRef.setInput('columns', [...columns]);
        await fixture.whenStable();

        const col1Text = await harness.getSummaryRowCellText(0);

        expect(vi.mocked(transformSpy)).toHaveBeenCalled();
        expect(col1Text).toBe(transformed);
      });
    });
  });
});

@Component({
  imports: [DataTableSummaryRowComponent],
  template: `
    <datatable-summary-row [rows]="rows" [columns]="columns" [rowHeight]="30" [template]="tpl()" />
    <ng-template #summaryTpl>
      <span class="custom-content">Custom summary content</span>
    </ng-template>
  `
})
class TestHostComponent {
  rows = [{ col1: 10 }];
  columns: TableColumnInternal[] = toInternalColumn([{ prop: 'col1' }]);
  readonly tpl = viewChild<TemplateRef<void>>('summaryTpl');
}

describe('DataTableSummaryRowComponent with template', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
  });

  it('should render custom template content instead of computed columns', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.custom-content')?.textContent).toBe('Custom summary content');
    expect(el.querySelector('datatable-body-row')).toBeNull();
  });
});
