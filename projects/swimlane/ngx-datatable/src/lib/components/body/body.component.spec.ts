import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { toInternalColumn } from '../../utils/column-helper';
import { DATATABLE_COMPONENT_TOKEN } from '../../utils/table-token';
import { DataTableBodyRowComponent } from './body-row.component';
import { DataTableBodyComponent } from './body.component';
import { DataTableGhostLoaderComponent } from './ghost-loader/ghost-loader.component';
import { ScrollerComponent } from './scroller.component';

describe('DataTableBodyComponent', () => {
  let fixture: ComponentFixture<DataTableBodyComponent>;
  let component: DataTableBodyComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [ScrollbarHelper, { provide: DATATABLE_COMPONENT_TOKEN, useValue: {} }]
    });
    fixture = TestBed.createComponent(DataTableBodyComponent);
    fixture.componentRef.setInput('rowDragEvents', new EventEmitter<any>());
    fixture.componentRef.setInput('innerWidth', 400);
    fixture.componentRef.setInput('rowIdentity', (row: any) => row);
    fixture.componentRef.setInput('summaryPosition', 'top');
    fixture.componentRef.setInput('summaryHeight', 50);
    fixture.componentRef.setInput('ariaGroupHeaderCheckboxMessage', 'Select all rows');
    fixture.componentRef.setInput('ariaRowCheckboxMessage', 'Select row');
    fixture.componentRef.setInput('cssClasses', {});
    fixture.componentRef.setInput('rowHeight', 'auto');
    fixture.componentRef.setInput('offsetX', 0);
    component = fixture.componentInstance;
  });

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Paging', () => {
    it('should have correct indexes for normal paging with rows > pageSize', () => {
      fixture.componentRef.setInput('externalPaging', false);
      fixture.componentRef.setInput('rows', [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9 },
        { num: 10 }
      ]);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('offset', 1);
      fixture.componentRef.setInput('rowCount', 20);
      const expectedIndexes = { first: 10, last: 20 };
      expect(component.indexes()).toEqual(expectedIndexes);
    });

    it('should have correct indexes for normal paging with rows < pageSize', () => {
      fixture.componentRef.setInput('externalPaging', false);
      fixture.componentRef.setInput('rows', [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }]);
      fixture.componentRef.setInput('pageSize', 5);
      fixture.componentRef.setInput('offset', 1);
      fixture.componentRef.setInput('rowCount', 9);
      const expectedIndexes = { first: 5, last: 9 };
      expect(component.indexes()).toEqual(expectedIndexes);
    });

    it('should have correct indexes for external paging with rows > pageSize', () => {
      fixture.componentRef.setInput('externalPaging', true);
      fixture.componentRef.setInput('rows', [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9 },
        { num: 10 }
      ]);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('offset', 1);
      fixture.componentRef.setInput('rowCount', 20);
      const expectedIndexes = { first: 0, last: 10 };
      expect(component.indexes()).toEqual(expectedIndexes);
    });

    it('should have correct indexes for external paging with rows < pageSize', () => {
      fixture.componentRef.setInput('externalPaging', true);
      fixture.componentRef.setInput('rows', [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }]);
      fixture.componentRef.setInput('pageSize', 5);
      fixture.componentRef.setInput('offset', 1);
      fixture.componentRef.setInput('rowCount', 9);
      const expectedIndexes = { first: 0, last: 5 };
      expect(component.indexes()).toEqual(expectedIndexes);
    });

    it('should render ghost rows based rowCount', async () => {
      fixture.componentRef.setInput('trackByProp', 'num');
      fixture.componentRef.setInput('rows', [{ num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }]);
      fixture.componentRef.setInput('columns', toInternalColumn([{ name: 'num', prop: 'num' }]));
      fixture.componentRef.setInput('externalPaging', true);
      fixture.componentRef.setInput('scrollbarV', true);
      fixture.componentRef.setInput('virtualization', true);
      fixture.componentRef.setInput('rowHeight', 50);
      fixture.componentRef.setInput('ghostLoadingIndicator', true);
      fixture.componentRef.setInput('bodyHeight', 200);
      fixture.componentRef.setInput('pageSize', 5);
      fixture.componentRef.setInput('rowCount', 10);
      fixture.componentRef.setInput('offset', 0);
      await fixture.whenStable();
      expect(component.indexes()).toEqual({ first: 0, last: 5 });
      fixture.debugElement
        .query(By.directive(ScrollerComponent))
        .triggerEventHandler('scroll', { scrollYPos: 250, scrollXPos: 0 });
      await fixture.whenStable();
      expect(component.indexes()).toEqual({ first: 5, last: 10 });
      expect(
        fixture.debugElement.queryAll(By.directive(DataTableGhostLoaderComponent))
      ).toHaveLength(5);
    });
  });

  describe('with disableCheck', () => {
    beforeEach(() => {
      fixture.componentRef.setInput(
        'columns',
        toInternalColumn([{ name: 'value', prop: 'value' }])
      );
      fixture.componentRef.setInput('disableRowCheck', (row: any) => row.disabled);
    });

    it('should disable rows', async () => {
      fixture.componentRef.setInput('rows', [
        { value: '1', disabled: false },
        { value: '2', disabled: true }
      ]);
      fixture.componentRef.setInput('rowCount', 2);
      fixture.componentRef.setInput('pageSize', 2);
      fixture.componentRef.setInput('offset', 0);
      await fixture.whenStable();
      let rows = fixture.debugElement.queryAll(By.directive(DataTableBodyRowComponent));
      expect(rows[0].classes['row-disabled']).toBeFalsy();
      expect(rows[1].classes['row-disabled']).toBe(true);
      fixture.componentRef.setInput('rows', [
        { value: '1', disabled: true },
        { value: '2', disabled: false }
      ]);
      await fixture.whenStable();
      rows = fixture.debugElement.queryAll(By.directive(DataTableBodyRowComponent));
      expect(rows[0].classes['row-disabled']).toBe(true);
      expect(rows[1].classes['row-disabled']).toBeFalsy();
    });

    it('should disable grouped rows', async () => {
      fixture.componentRef.setInput('groupedRows', [
        {
          key: 'g1',
          value: [
            { value: '1', disabled: false },
            { value: '2', disabled: true }
          ]
        }
      ]);
      fixture.componentRef.setInput('groupExpansionDefault', true);
      fixture.componentRef.setInput('rows', ['dummy']);
      fixture.componentRef.setInput('rowCount', 2);
      fixture.componentRef.setInput('pageSize', 2);
      fixture.componentRef.setInput('offset', 0);
      await fixture.whenStable();
      const rows = fixture.debugElement.queryAll(By.directive(DataTableBodyRowComponent));
      expect(rows[0].classes['row-disabled']).toBeFalsy();
      expect(rows[1].classes['row-disabled']).toBe(true);
    });
  });

  describe('with row grouping and row details', () => {
    it('should expand group and then expand row details within the group', async () => {
      const row1 = { value: '1', id: 1 };
      const row2 = { value: '2', id: 2 };
      const group = {
        key: 'g1',
        value: [row1, row2]
      };

      fixture.componentRef.setInput(
        'columns',
        toInternalColumn([{ name: 'value', prop: 'value' }])
      );
      fixture.componentRef.setInput('groupedRows', [group]);
      fixture.componentRef.setInput('groupExpansionDefault', false);
      fixture.componentRef.setInput('rows', ['dummy']);
      fixture.componentRef.setInput('rowCount', 2);
      fixture.componentRef.setInput('pageSize', 2);
      fixture.componentRef.setInput('offset', 0);
      fixture.componentRef.setInput('rowIdentity', (row: any) => row.id ?? row.key);

      await fixture.whenStable();

      // Initially, group should be collapsed
      expect(component.getGroupExpanded(group)).toBe(false);
      expect(component.rowExpansions()).toHaveLength(0);

      // Expand the group
      component.toggleGroupExpansion(group);
      await fixture.whenStable();

      expect(component.getGroupExpanded(group)).toBe(true);
      expect(component.groupExpansions()).toHaveLength(1);
      expect(component.groupExpansions()[0]).toBe(group);

      // Now expand row detail for the first row in the group
      component.toggleRowExpansion(row1);
      await fixture.whenStable();

      expect(component.getRowExpanded(row1)).toBe(true);
      expect(component.rowExpansions()).toHaveLength(1);
      expect(component.rowExpansions()[0]).toBe(row1);

      // Group should still be expanded
      expect(component.getGroupExpanded(group)).toBe(true);

      // Expand row detail for the second row as well
      component.toggleRowExpansion(row2);
      await fixture.whenStable();

      expect(component.getRowExpanded(row2)).toBe(true);
      expect(component.rowExpansions()).toHaveLength(2);
      expect(component.rowExpansions()).toContain(row1);
      expect(component.rowExpansions()).toContain(row2);

      // Collapse the first row detail
      component.toggleRowExpansion(row1);
      await fixture.whenStable();

      expect(component.getRowExpanded(row1)).toBe(false);
      expect(component.rowExpansions()).toHaveLength(1);
      expect(component.rowExpansions()[0]).toBe(row2);

      // Group should still be expanded
      expect(component.getGroupExpanded(group)).toBe(true);
    });
  });
});
