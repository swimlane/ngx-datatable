import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SortPropDir } from '../types/public.types';
import { TableColumn } from '../types/table-column.type';
import { DataTableBodyCellComponent } from './body/body-cell.component';
import { DataTableBodyRowComponent } from './body/body-row.component';
import { DataTableColumnCellDirective } from './columns/column-cell.directive';
import { DataTableColumnHeaderDirective } from './columns/column-header.directive';
import { DataTableColumnDirective } from './columns/column.directive';
import { DatatableComponent } from './datatable.component';

describe('DatatableComponent', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;

  @Component({
    imports: [DatatableComponent],
    template: ` <ngx-datatable [columns]="columns()" [rows]="rows()" [sorts]="sorts()" /> `
  })
  class TestFixtureComponent {
    readonly columns = signal<TableColumn[]>([]);
    readonly rows = signal<Record<string, any>[]>([]);
    readonly sorts = signal<any[]>([]);
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFixtureComponent);
    component = fixture.componentInstance;
  });

  it('should sort date values', async () => {
    const initialRows = [
      { birthDate: new Date(1980, 11, 1) },
      { birthDate: new Date(1978, 8, 5) },
      { birthDate: new Date(1995, 4, 3) }
    ];

    const columns = [
      {
        prop: 'birthDate'
      }
    ];

    component.rows.set(initialRows);
    component.columns.set(columns);
    await fixture.whenStable();

    // sort by `birthDate` ascending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('1978');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('1980');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('1995');

    // sort by `birthDate` descending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('1995');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('1980');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('1978');
  });

  it('should sort number values', async () => {
    const initialRows = [{ id: 5 }, { id: 20 }, { id: 12 }];

    const columns = [
      {
        prop: 'id'
      }
    ];

    component.rows.set(initialRows);
    component.columns.set(columns);
    await fixture.whenStable();

    // sort by `id` ascending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('5');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('12');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('20');

    // sort by `id` descending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('20');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('12');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('5');
  });

  it('should sort string values', async () => {
    const initialRows = [
      { product: 'Computers' },
      { product: 'Bikes' },
      { product: 'Smartphones' }
    ];

    const columns = [
      {
        prop: 'product'
      }
    ];

    component.rows.set(initialRows);
    component.columns.set(columns);
    await fixture.whenStable();

    // sort by `product` ascending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('Bikes');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('Computers');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('Smartphones');

    // sort by `product` descending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('Smartphones');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('Computers');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('Bikes');
  });

  it('should sort with a custom comparator', async () => {
    const initialRows = [{ product: 'Smartphones' }, { product: 'Cars' }, { product: 'Bikes' }];

    const columns = [
      {
        prop: 'product',
        comparator: (productA: string, productB: string) => productA.length - productB.length
      }
    ];

    component.rows.set(initialRows);
    component.columns.set(columns);
    await fixture.whenStable();

    // sort by `product` ascending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('Cars');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('Bikes');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('Smartphones');

    // sort by `product` descending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('Smartphones');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('Bikes');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('Cars');
  });

  it('should sort using a stable sorting algorithm', async () => {
    const initialRows = [
      { name: 'sed', state: 'CA' },
      { name: 'dolor', state: 'NY' },
      { name: 'ipsum', state: 'NY' },
      { name: 'foo', state: 'CA' },
      { name: 'bar', state: 'CA' },
      { name: 'cat', state: 'CA' },
      { name: 'sit', state: 'CA' },
      { name: 'man', state: 'CA' },
      { name: 'lorem', state: 'NY' },
      { name: 'amet', state: 'NY' },
      { name: 'maecennas', state: 'NY' }
    ];

    /**
     * assume the following sort operations take place on `initialRows`:
     * 1) initialRows.sort(byLengthOfNameProperty) (Ascending)
     * 2) initialRows.sort(byState)                (Descending)
     *
     * in browsers that do not natively implement stable sort (such as Chrome),
     * the result could be:
     *
     *  [
     *    { name: 'maecennas',  state: 'NY' },
     *    { name: 'amet',       state: 'NY' },
     *    { name: 'dolor',      state: 'NY' },
     *    { name: 'ipsum',      state: 'NY' },
     *    { name: 'lorem',      state: 'NY' },
     *    { name: 'sed',        state: 'CA' },
     *    { name: 'cat',        state: 'CA' },
     *    { name: 'man',        state: 'CA' },
     *    { name: 'foo',        state: 'CA' },
     *    { name: 'bar',        state: 'CA' },
     *    { name: 'sit',        state: 'CA' }
     *  ]
     *
     * in browsers that natively implement stable sort the result is guaranteed
     * to be:
     *
     *  [
     *    { name: 'amet',       state: 'NY' },
     *    { name: 'dolor',      state: 'NY' },
     *    { name: 'ipsum',      state: 'NY' },
     *    { name: 'lorem',      state: 'NY' },
     *    { name: 'maecennas',  state: 'NY' },
     *    { name: 'sed',        state: 'CA' },
     *    { name: 'foo',        state: 'CA' },
     *    { name: 'bar',        state: 'CA' },
     *    { name: 'cat',        state: 'CA' },
     *    { name: 'sit',        state: 'CA' },
     *    { name: 'man',        state: 'CA' }
     *  ]
     */

    const columns = [
      {
        prop: 'name',
        comparator: (nameA: string, nameB: string) => nameA.length - nameB.length
      },
      {
        prop: 'state'
      }
    ];

    component.rows.set(initialRows);
    component.columns.set(columns);
    await fixture.whenStable();

    // sort by `name` ascending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    // sort by `state` descending
    sortBy({ column: 2 }, fixture);
    await fixture.whenStable();
    sortBy({ column: 2 }, fixture);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('dolor');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('ipsum');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('lorem');
    expect(textContent({ row: 4, column: 1 }, fixture)).toContain('amet');
    expect(textContent({ row: 5, column: 1 }, fixture)).toContain('maecennas');
    expect(textContent({ row: 6, column: 1 }, fixture)).toContain('sed');
    expect(textContent({ row: 7, column: 1 }, fixture)).toContain('foo');
    expect(textContent({ row: 8, column: 1 }, fixture)).toContain('bar');
    expect(textContent({ row: 9, column: 1 }, fixture)).toContain('cat');
    expect(textContent({ row: 10, column: 1 }, fixture)).toContain('sit');
    expect(textContent({ row: 11, column: 1 }, fixture)).toContain('man');
  });

  it('should sort correctly after push events', async () => {
    const initialRows = [
      { name: 'sed', state: 'CA' },
      { name: 'dolor', state: 'NY' },
      { name: 'ipsum', state: 'NY' },
      { name: 'foo', state: 'CA' },
      { name: 'bar', state: 'CA' },
      { name: 'cat', state: 'CA' },
      { name: 'sit', state: 'CA' },
      { name: 'man', state: 'CA' },
      { name: 'lorem', state: 'NY' },
      { name: 'amet', state: 'NY' },
      { name: 'maecennas', state: 'NY' }
    ];
    const additionalRows = [...initialRows];

    const columns = [
      {
        prop: 'name',
        comparator: (nameA: string, nameB: string) => nameA.length - nameB.length
      },
      {
        prop: 'state'
      }
    ];

    component.rows.set(initialRows);
    component.columns.set(columns);
    await fixture.whenStable();

    // sort by `state` descending
    sortBy({ column: 2 }, fixture);
    await fixture.whenStable();
    sortBy({ column: 2 }, fixture);
    await fixture.whenStable();

    // sort by `name` ascending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    // mimic new `rows` data pushed to component
    component.rows.set(additionalRows);

    // sort by `state` descending
    sortBy({ column: 2 }, fixture);
    await fixture.whenStable();
    sortBy({ column: 2 }, fixture);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('dolor');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('ipsum');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('lorem');
    expect(textContent({ row: 4, column: 1 }, fixture)).toContain('amet');
    expect(textContent({ row: 5, column: 1 }, fixture)).toContain('maecennas');
    expect(textContent({ row: 6, column: 1 }, fixture)).toContain('sed');
    expect(textContent({ row: 7, column: 1 }, fixture)).toContain('foo');
    expect(textContent({ row: 8, column: 1 }, fixture)).toContain('bar');
    expect(textContent({ row: 9, column: 1 }, fixture)).toContain('cat');
    expect(textContent({ row: 10, column: 1 }, fixture)).toContain('sit');
    expect(textContent({ row: 11, column: 1 }, fixture)).toContain('man');
  });

  it('should set offset to 0 when sorting by a column', async () => {
    const initialRows = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const columns = [
      {
        prop: 'id'
      }
    ];

    component.rows.set(initialRows);
    component.columns.set(columns);
    await fixture.whenStable();

    const datatableComponent: DatatableComponent = fixture.debugElement.query(
      By.directive(DatatableComponent)
    ).componentInstance;
    datatableComponent.offset.set(1);

    // sort by `id` descending
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();
    sortBy({ column: 1 }, fixture);
    await fixture.whenStable();

    expect(datatableComponent.offset()).toBe(0);
  });

  it('should support array data', async () => {
    const initialRows = [['Hello', 123]];

    const columns = [{ prop: 0 }, { prop: 1 }];

    // previously, an exception was thrown from column-helper.ts setColumnDefaults()
    component.rows.set(initialRows);
    component.columns.set(columns);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('Hello');
    expect(textContent({ row: 1, column: 2 }, fixture)).toContain('123');
  });
});

describe('DatatableComponent With Custom Templates', () => {
  @Component({
    imports: [
      DatatableComponent,
      DataTableColumnDirective,
      DataTableColumnCellDirective,
      DataTableColumnHeaderDirective
    ],
    template: `
      <ngx-datatable [rows]="rows()" [sorts]="sorts()">
        <ngx-datatable-column name="Id" prop="id">
          <ng-template let-column="column" ngx-datatable-header-template>
            {{ column.name }}
          </ng-template>
          <ng-template let-row="row" ngx-datatable-cell-template>
            {{ row.id }}
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column [prop]="columnTwoProp()">
          <ng-template let-column="column" ngx-datatable-header-template>
            {{ column.name }}
          </ng-template>
          <ng-template let-row="row" let-column="column" ngx-datatable-cell-template>
            {{ row[column.prop!] }}
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    `
  })
  // eslint-disable-next-line @angular-eslint/component-class-suffix
  class TestFixtureComponentWithCustomTemplates {
    readonly rows = signal<Record<string, any>[]>([]);
    readonly sorts = signal<SortPropDir[]>([]);
    readonly columnTwoProp = signal<string | undefined>(undefined);
  }

  let fixture: ComponentFixture<TestFixtureComponentWithCustomTemplates>;
  let component: TestFixtureComponentWithCustomTemplates;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFixtureComponentWithCustomTemplates);
    component = fixture.componentRef.instance;
  });

  it('should sort when the table is initially rendered if `sorts` are provided', async () => {
    component.rows.set([{ id: 5 }, { id: 20 }, { id: 12 }]);
    component.sorts.set([
      {
        prop: 'id',
        dir: 'asc' as const
      }
    ]);
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 1 }, fixture)).toContain('5');
    expect(textContent({ row: 2, column: 1 }, fixture)).toContain('12');
    expect(textContent({ row: 3, column: 1 }, fixture)).toContain('20');
  });

  it('should reflect changes to input bindings of `ngx-datatable-column`', async () => {
    /**
     * initially display `user` column as the second column in the table
     */
    component.rows.set([
      { id: 5, user: 'Sam', age: 35 },
      { id: 20, user: 'Bob', age: 50 },
      { id: 12, user: 'Joe', age: 60 }
    ]);
    component.columnTwoProp.set('user');
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 2 }, fixture)).toContain('Sam');
    expect(textContent({ row: 2, column: 2 }, fixture)).toContain('Bob');
    expect(textContent({ row: 3, column: 2 }, fixture)).toContain('Joe');

    /**
     * switch to displaying `age` column as the second column in the table
     */
    component.columnTwoProp.set('age');
    await fixture.whenStable();

    expect(textContent({ row: 1, column: 2 }, fixture)).toContain('35');
    expect(textContent({ row: 2, column: 2 }, fixture)).toContain('50');
    expect(textContent({ row: 3, column: 2 }, fixture)).toContain('60');
  });
});

describe('DatatableComponent With Frozen columns', () => {
  @Component({
    imports: [DatatableComponent, DataTableColumnDirective],
    template: `
      <ngx-datatable [rows]="rows()">
        <ngx-datatable-column name="Name" [width]="300" [frozenLeft]="true" />
        <ngx-datatable-column name="Gender" />
        <ngx-datatable-column name="Age" />
        <ngx-datatable-column name="City" prop="address.city" [width]="150" />
        <ngx-datatable-column
          name="State"
          prop="address.state"
          [width]="300"
          [frozenRight]="true"
        />
      </ngx-datatable>
    `
  })
  // eslint-disable-next-line @angular-eslint/component-class-suffix
  class TestFixtureComponentWithFrozenColumns {
    readonly rows = signal([
      {
        'id': 0,
        'name': 'Ramsey Cummings',
        'gender': 'male',
        'age': 52,
        'address': {
          'state': 'South Carolina',
          'city': 'Glendale'
        }
      },
      {
        'id': 1,
        'name': 'Stefanie Huff',
        'gender': 'female',
        'age': 70,
        'address': {
          'state': 'Arizona',
          'city': 'Beaverdale'
        }
      }
    ]);
  }

  let fixture: ComponentFixture<TestFixtureComponentWithFrozenColumns>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestFixtureComponentWithFrozenColumns);
    await fixture.whenStable();
  });

  it('should not allow frozen left column to be moved to non frozen groups', async () => {
    const datatableComponent = fixture.debugElement.query(
      By.directive(DatatableComponent)
    ).componentInstance;

    const column = datatableComponent.columnTemplates()[0];
    vi.spyOn(datatableComponent.reorder, 'emit');

    // Try to move 'Name' (frozenLeft) to index 2
    datatableComponent.onColumnReorder({ prevValue: 0, newValue: 2, column });
    await fixture.whenStable();
    expect(datatableComponent.reorder.emit).not.toHaveBeenCalled();
  });

  it('should not allow frozen right column to be moved to non frozen groups', async () => {
    const datatableComponent = fixture.debugElement.query(
      By.directive(DatatableComponent)
    ).componentInstance;

    const column = datatableComponent.columnTemplates()[4];
    vi.spyOn(datatableComponent.reorder, 'emit');

    // Try to move 'State' (frozenRight) to index 0 (should not move out of frozenRight group)
    datatableComponent.onColumnReorder({ prevValue: 4, newValue: 0, column });
    await fixture.whenStable();
    expect(datatableComponent.reorder.emit).not.toHaveBeenCalled();
  });

  it('should not allow moving non-frozen columns into frozenLeft or frozenRight groups', async () => {
    const datatableComponent = fixture.debugElement.query(By.directive(DatatableComponent))
      .componentInstance as DatatableComponent;

    const genderColumn = datatableComponent.columnTemplates()[1];
    const cityColumn = datatableComponent.columnTemplates()[3];
    vi.spyOn(datatableComponent.reorder, 'emit');

    // Try to move 'Gender' (non-frozen) to index 0 (frozenLeft group)
    datatableComponent.onColumnReorder({
      prevValue: 1,
      newValue: 0,
      column: genderColumn.column() as any
    });
    await fixture.whenStable();
    expect(datatableComponent.reorder.emit).not.toHaveBeenCalled();

    // Try to move 'City' (non-frozen) to index 4 (frozenRight group)
    datatableComponent.onColumnReorder({
      prevValue: 3,
      newValue: 4,
      column: cityColumn.column() as any
    });
    await fixture.whenStable();
    expect(datatableComponent.reorder.emit).not.toHaveBeenCalled();
  });
});
/**
 * mimics the act of a user clicking a column to sort it
 */
const sortBy = (
  {
    column
  }: {
    column: number;
  },
  fixture: ComponentFixture<unknown>
) => {
  const columnIndex = column - 1;
  const headerCellDe = fixture.debugElement.queryAll(By.css('datatable-header-cell'))[columnIndex];
  const de = headerCellDe.query(By.css('span:last-child'));
  de.triggerEventHandler('click', null);
};

/**
 * test helper function to return text content of a cell within the
 * body of the ngx-datatable component
 */
const textContent = (
  {
    row,
    column
  }: {
    row: number;
    column: number;
  },
  fixture: ComponentFixture<unknown>
) => {
  const [rowIndex, columnIndex] = [row - 1, column - 1];
  const bodyRowDe = fixture.debugElement.queryAll(By.directive(DataTableBodyRowComponent))[
    rowIndex
  ];
  const bodyCellDe = bodyRowDe.queryAll(By.directive(DataTableBodyCellComponent))[columnIndex];

  return bodyCellDe.nativeElement.textContent;
};
