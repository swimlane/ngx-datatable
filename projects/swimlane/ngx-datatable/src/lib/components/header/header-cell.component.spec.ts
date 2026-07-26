import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inputBinding,
  outputBinding,
  signal,
  TemplateRef,
  viewChild,
  WritableSignal
} from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';

import {
  InnerSortEvent,
  SortableTableColumnInternal,
  TableColumnInternal
} from '../../types/internal.types';
import { SortPropDir } from '../../types/public.types';
import { toInternalColumn } from '../../utils/column-helper';
import { DataTableHeaderCellComponent } from './header-cell.component';
import { HeaderCellHarness } from './testing/header-cell.harnes';

describe('DataTableHeaderCellComponent', () => {
  let fixture: ComponentFixture<DataTableHeaderCellComponent>;
  let component: DataTableHeaderCellComponent;
  let harness: HeaderCellHarness;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: false }]
    });
    fixture = TestBed.createComponent(DataTableHeaderCellComponent);
    fixture.componentRef.setInput('ariaHeaderCheckboxMessage', 'Select all rows');
    fixture.componentRef.setInput('sortType', 'single');
    component = fixture.componentInstance;
    fixture.componentRef.setInput('column', {
      name: 'test',
      prop: 'test',
      resizeable: true,
      sortable: true,
      width: signal(0)
    });
    fixture.componentInstance.sort.subscribe(sort => {
      fixture.componentRef.setInput('sorts', [
        {
          prop: sort.column.name,
          dir: sort.newValue
        }
      ]);
    });
    fixture.autoDetectChanges();
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, HeaderCellHarness);
  });

  it('should emit new width on resize', async () => {
    vi.spyOn(component.resizing, 'emit');
    const initialWidth = await harness.cellWidth();
    await harness.resizeCell(0, 100);
    const newWidth = 100 + initialWidth;
    await fixture.whenStable();
    expect(component.resizing.emit).toHaveBeenCalledWith({
      width: newWidth,
      column: {
        name: 'test',
        prop: 'test',
        resizeable: true,
        sortable: true,
        width: expect.any(Function)
      } as TableColumnInternal<any>
    });
  });

  it('should emit sort event', async () => {
    vi.spyOn(component.sort, 'emit');
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
      headerCheckboxable: true,
      width: signal(0)
    });
    vi.spyOn(component.select, 'emit');
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
    vi.spyOn(component.sort, 'emit');
    await harness.applySort(true);
    expect(component.sort.emit).toHaveBeenCalled();
  });
});

@Component({
  imports: [DataTableHeaderCellComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <datatable-header-cell
      sortType="single"
      ariaHeaderCheckboxMessage="checked"
      [column]="column()"
      (sort)="sort($event)"
    />
    <ng-template #headerCellTemplate let-sort="sortFn" let-column="column">
      <span class="custom-header">Custom Header for {{ column.name }}</span>
      <button class="custom-sort-button" type="button" (click)="sort($event)">
        Custom sort button
      </button>
    </ng-template>
  `
})
class TestHeaderCellComponent implements AfterViewInit {
  readonly column = signal<TableColumnInternal<any>>(
    toInternalColumn([
      {
        name: 'test',
        sortable: true
      }
    ])[0]
  );

  readonly headerCellTemplate = viewChild('headerCellTemplate', { read: TemplateRef<any> });

  sort(event: InnerSortEvent) {}

  ngAfterViewInit() {
    this.column.set({ ...this.column(), headerTemplate: this.headerCellTemplate() });
  }
}

describe('DataTableHeaderCellComponent with template', () => {
  let fixture: ComponentFixture<TestHeaderCellComponent>;
  let harness: HeaderCellHarness;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestHeaderCellComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, HeaderCellHarness);
  });

  it('should render custom header template', async () => {
    await fixture.whenStable();
    expect(await harness.getHeaderCellText()).toContain('Custom Header for test');
  });

  it('should call sort function on custom button click', async () => {
    vi.spyOn(fixture.componentInstance, 'sort');
    await harness.clickCustomSortButton();
    expect(fixture.componentInstance.sort).toHaveBeenCalledWith({
      column: fixture.componentInstance.column() as SortableTableColumnInternal<any>,
      prevValue: undefined,
      newValue: 'asc'
    });
  });
});

describe('DataTableHeaderCellComponent - custom sort icons', () => {
  let fixture: ComponentFixture<DataTableHeaderCellComponent>;
  let harness: HeaderCellHarness;
  let sorts: WritableSignal<SortPropDir[]>;
  const column = signal({
    name: 'test',
    prop: 'test',
    sortable: true,
    resizeable: false,
    width: signal(20)
  });
  const sortAscendingIcon = signal('icon up');
  const sortDescendingIcon = signal('icon down');

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: false }]
    });
    sorts = signal<SortPropDir[]>([]);
    fixture = TestBed.createComponent(DataTableHeaderCellComponent, {
      bindings: [
        inputBinding('sortType', () => 'single'),
        inputBinding('ariaHeaderCheckboxMessage', () => 'Select All'),
        inputBinding('sortAscendingIcon', sortAscendingIcon),
        inputBinding('sortDescendingIcon', sortDescendingIcon),
        inputBinding('column', column),
        inputBinding('sorts', sorts),
        inputBinding('showResizeHandle', () => false),
        outputBinding('sort', (event: InnerSortEvent) => {
          sorts.set([{ prop: event.column.prop!, dir: event.newValue! }]);
        })
      ]
    });
    fixture.autoDetectChanges();
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, HeaderCellHarness);
  });

  it('should apply custom sortAscendingIcon class when toggling to ascending sort', async () => {
    await harness.applySort();
    await fixture.whenStable();

    const sortBtn = fixture.nativeElement.querySelector('.sort-btn');

    expect(sortBtn).toHaveClass('sort-btn');
    expect(sortBtn).toHaveClass('sort-asc');
    expect(sortBtn).toHaveClass('icon');
    expect(sortBtn).toHaveClass('up');
    expect(sortBtn).not.toHaveClass('datatable-icon-up');
  });

  it('should apply custom sortDescendingIcon class when toggling to descending sort', async () => {
    await harness.applySort();
    await fixture.whenStable();
    await harness.applySort();
    await fixture.whenStable();

    const sortButton = fixture.nativeElement.querySelector('.sort-btn');
    expect(sortButton).toHaveClass('sort-btn');
    expect(sortButton).toHaveClass('sort-desc');
    expect(sortButton).toHaveClass('icon');
    expect(sortButton).toHaveClass('down');
    expect(sortButton).not.toHaveClass('datatable-icon-down');
  });
});
