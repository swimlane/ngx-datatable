import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';
import {} from 'jasmine';

import { DataTableBodyRowComponent } from '../body-row.component';
import { DataTableBodyCellComponent } from '../body-cell.component';
import {
  DataTableSummaryRowComponent
} from './summary-row.component';
import { ISummaryColumn } from './';
import { ScrollbarHelper } from '../../../';
import { setColumnDefaults } from '../../../utils';

describe('DataTableSummaryRowComponent', () => {
  let fixture: ComponentFixture<DataTableSummaryRowComponent>;
  let component: DataTableSummaryRowComponent;
  let element: DebugElement;

  let rows: any[];
  let columns: ISummaryColumn[];

  beforeEach(() => {
    rows = [
      { col1: 10, col2: 20 },
      { col1: 1, col2: 30 },
    ];
    columns = [
      { prop: 'col1' }, { prop: 'col2' }
    ];
    setColumnDefaults(columns);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataTableSummaryRowComponent,
        DataTableBodyRowComponent,
        DataTableBodyCellComponent,
      ],
      providers: [
        ScrollbarHelper,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableSummaryRowComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  function triggerChange() {
    component.ngOnChanges();
    fixture.detectChanges();
  }

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Visibility', () => {
    it('should not be visible when there are no columns', () => {
      component.rows = rows;
      triggerChange();
      expect(element.query(By.css('datatable-body-row'))).toBeNull();
    });

    it('should not be visible when there are no rows', () => {
      component.columns = columns;
      triggerChange();
      expect(element.query(By.css('datatable-body-row'))).toBeNull();
    });

    it('should be visible when there are rows and columns', () => {
      component.columns = columns;
      component.rows = rows;
      triggerChange();
      expect(element.query(By.css('datatable-body-row'))).not.toBeNull();
    });
  });

  describe('Computing', () => {
    beforeEach(() => {
      component.columns = columns;
      component.rows = rows;
      triggerChange();
    });

    describe('Default Summary Function', () => {
      it('should be used when no other provided', () => {
        expect(component.summaryRow['col1']).toEqual(rows[0]['col1'] + rows[1]['col1']);
        expect(component.summaryRow['col2']).toEqual(rows[0]['col2'] + rows[1]['col2']);
      });

      it('should works with empty row', () => {
        component.rows = [
          { col1: null, col2: undefined },
          { col1: null, },
        ];

        triggerChange();

        expect(component.summaryRow['col1']).toBeNull();
        expect(component.summaryRow['col2']).toBeNull();
      });

      it('should not compute a result if there are non-number cells', () => {
        component.rows = [
          { col1: 'aaa', col2: 'xxx' },
          { col1: 'bbb', col2: 34 },
        ];

        triggerChange();
        expect(component.summaryRow['col1']).toEqual(null);
        expect(component.summaryRow['col2']).toEqual(null);
      });
    });

    it('should not compute if null is set as a summary function', () => {
      columns[0].summaryFunc = null;

      triggerChange();

      expect(component.summaryRow['col1']).toEqual(null);
    });

    it('should use provided summary function', () => {
      const sum1 = 22;
      const sum2 = 'test sum';
      const spy1 = jasmine.createSpy('spy1').and.returnValue(sum1);
      const spy2 = jasmine.createSpy('spy2').and.returnValue(sum2);
      columns[0].summaryFunc = spy1;
      columns[1].summaryFunc = spy2;

      triggerChange();

      expect(spy1.calls.any()).toBeTruthy();
      expect(spy2.calls.any()).toBeTruthy();

      expect(spy1.calls.mostRecent().args[0]).toEqual([ rows[0]['col1'], rows[1]['col1'] ]);
      expect(spy2.calls.mostRecent().args[0]).toEqual([ rows[0]['col2'], rows[1]['col2'] ]);

      expect(component.summaryRow['col1']).toEqual(sum1);
      expect(component.summaryRow['col2']).toEqual(sum2);
    });

    describe('Pipe', () => {
      it('should use provided pipe', () => {
        const transformed = '$22';
        const transformSpy = jasmine.createSpy('transform').and.returnValue(transformed);

        columns[0].pipe = { transform: transformSpy };
        triggerChange();

        expect(transformSpy.calls.any()).toBeTruthy();
        expect(component.summaryRow['col1']).toEqual(transformed);
      });
    });
  });
});
