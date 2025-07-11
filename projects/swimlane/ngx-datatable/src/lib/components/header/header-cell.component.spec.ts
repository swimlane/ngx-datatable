import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AfterViewInit, Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {
  InnerSortEvent,
  SortableTableColumnInternal,
  TableColumnInternal
} from '../../types/internal.types';
import { toInternalColumn } from '../../utils/column-helper';
import { DataTableHeaderCellComponent } from './header-cell.component';
import { HeaderCellHarness } from './testing/header-cell.harnes';

describe('DataTableHeaderCellComponent', () => {
  let fixture: ComponentFixture<DataTableHeaderCellComponent>;
  let component: DataTableHeaderCellComponent;
  let harness: HeaderCellHarness;

  beforeEach(waitForAsync(async () => {
    fixture = TestBed.createComponent(DataTableHeaderCellComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('column', {
      name: 'test',
      prop: 'test',
      resizeable: true,
      sortable: true
    });
    fixture.componentRef.setInput('sortType', 'single');
    fixture.componentRef.setInput('headerHeight', 50);
    fixture.componentRef.setInput('ariaHeaderCheckboxMessage', 'Select all rows');
    fixture.componentInstance.sort.subscribe(sort => {
      fixture.componentRef.setInput('sorts', [
        {
          prop: sort.column.name,
          dir: sort.newValue
        }
      ]);
    });
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, HeaderCellHarness);
  }));

  it('should emit new width on resize', async () => {
    spyOn(component.resizing, 'emit');
    const initialWidth = await harness.cellWidth();
    await harness.resizeCell(0, 100);
    const newWidth = 100 + initialWidth;
    expect(component.resizing.emit).toHaveBeenCalledWith({
      width: newWidth,
      column: {
        name: 'test',
        prop: 'test',
        resizeable: true,
        sortable: true
      } as TableColumnInternal<any>
    });
  });

  it('should emit sort event', async () => {
    spyOn(component.sort, 'emit');
    await harness.applySort();
    expect(component.sort.emit).toHaveBeenCalled();
  });

  it('should not render resize handle when showResizeHandle is false (last column)', async () => {
    fixture.componentRef.setInput('showResizeHandle', false);
    expect(await harness.hasResizeHandle()).toBe(false);
  });

  it('should render resize handle when showResizeHandle is true', async () => {
    fixture.componentRef.setInput('showResizeHandle', true);
    expect(await harness.hasResizeHandle()).toBe(true);
  });

  it('should emit select when checkbox is clicked', async () => {
    fixture.componentRef.setInput('column', {
      name: 'test',
      headerCheckboxable: true
    });
    spyOn(component.select, 'emit');
    await harness.selectAllRows();
    expect(component.select.emit).toHaveBeenCalled();
  });

  it('should toggle sort direction on sort button click', async () => {
    await harness.applySort();
    expect(await harness.getSortDirection()).toBe('asc');
    await harness.applySort();
    expect(await harness.getSortDirection()).toBe('desc');
  });

  it('should sort on enter key press', async () => {
    spyOn(component.sort, 'emit');
    await harness.applySort(true);
    expect(component.sort.emit).toHaveBeenCalled();
  });
});

@Component({
  imports: [DataTableHeaderCellComponent],
  template: `<datatable-header-cell
      sortType="single"
      headerHeight="50"
      [column]="column"
      (sort)="sort($event)"
    />
    <ng-template #headerCellTemplate let-sort="sortFn" let-column="column">
      <span class="custom-header">Custom Header for {{ column.name }}</span>
      <button class="custom-sort-button" type="button" (click)="sort($event)"
        >Custom sort button</button
      >
    </ng-template> `
})
class TestHeaderCellComponent implements AfterViewInit {
  column: TableColumnInternal<any> = toInternalColumn([
    {
      name: 'test',
      sortable: true
    }
  ])[0];

  readonly headerCellTemplate = viewChild('headerCellTemplate', { read: TemplateRef<any> });

  sort(event: InnerSortEvent) {}

  ngAfterViewInit() {
    this.column = { ...this.column, headerTemplate: this.headerCellTemplate() };
  }
}

describe('DataTableHeaderCellComponent with template', () => {
  let fixture: ComponentFixture<TestHeaderCellComponent>;
  let harness: HeaderCellHarness;

  beforeEach(waitForAsync(async () => {
    fixture = TestBed.createComponent(TestHeaderCellComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, HeaderCellHarness);
  }));

  it('should render custom header template', async () => {
    fixture.detectChanges();
    expect(await harness.getHeaderCellText()).toContain('Custom Header for test');
  });

  it('should call sort function on custom button click', async () => {
    spyOn(fixture.componentInstance, 'sort');
    await harness.clickCustomSortButton();
    expect(fixture.componentInstance.sort).toHaveBeenCalledWith({
      column: fixture.componentInstance.column as SortableTableColumnInternal<any>,
      prevValue: undefined,
      newValue: 'asc'
    });
  });
});
