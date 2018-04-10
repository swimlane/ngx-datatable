import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  DatatableComponent,
  DataTableHeaderCellComponent,
  DataTableBodyRowComponent,
  DataTableBodyCellComponent
} from '.';
import { NgxDatatableModule } from '../datatable.module';

let fixture: ComponentFixture<any>;
let component: any;

describe('DatatableComponent', () => {
  beforeEach(async(() => setupTest(TestFixtureComponent)));

  it('should sort date values', () => {
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

    component.rows = initialRows;
    component.columns = columns;
    fixture.detectChanges();

    // sort by `birthDate` ascending
    sortBy({ column: 1 });
    fixture.detectChanges();

    expect(textContent({ row: 1, column: 1 })).toContain('1978', 'Ascending');
    expect(textContent({ row: 2, column: 1 })).toContain('1980', 'Ascending');
    expect(textContent({ row: 3, column: 1 })).toContain('1995', 'Ascending');

    // sort by `birthDate` descending
    sortBy({ column: 1 });
    fixture.detectChanges();

    expect(textContent({ row: 1, column: 1 })).toContain('1995', 'Descending');
    expect(textContent({ row: 2, column: 1 })).toContain('1980', 'Descending');
    expect(textContent({ row: 3, column: 1 })).toContain('1978', 'Descending');
  });


  beforeEach(async(() => {
    TestBed.compileComponents();
  }));

  describe('When the column is sorted', () => {
    it('should sort a column with Date values', () => {
      const fixture = TestBed.createComponent(DatatableComponent);
      const initialRows = [
        {birthDate: new Date(1980, 12, 1)},
        {birthDate: new Date(1978, 8, 5)},
        {birthDate: new Date(1995, 4, 3)}
      ];
  
      const columns = [
        {
          prop: 'birthDate'
        }
      ];
  
      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;
  
      fixture.detectChanges();
  
      fixture.componentInstance.onColumnSort({
        sorts: [{prop: 'birthDate', dir: 'desc'}]
      });
  
      expect(fixture.componentInstance.internalRows[0]).toBe(initialRows[2]);
      expect(fixture.componentInstance.internalRows[1]).toBe(initialRows[0]);
      expect(fixture.componentInstance.internalRows[2]).toBe(initialRows[1]);
    });

    it('should sort a column with number values', () => {
      const fixture = TestBed.createComponent(DatatableComponent);
      const initialRows = [
        {id: 5},
        {id: 20},
        {id: 12}
      ];
  
      const columns = [
        {
          prop: 'id'
        }
      ];
  
      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;
  
      fixture.detectChanges();
  
      fixture.componentInstance.onColumnSort({
        sorts: [{prop: 'id', dir: 'desc'}]
      });
  
      expect(fixture.componentInstance.internalRows[0]).toBe(initialRows[1]);
      expect(fixture.componentInstance.internalRows[1]).toBe(initialRows[2]);
      expect(fixture.componentInstance.internalRows[2]).toBe(initialRows[0]);
    });

    it('should sort a column with string values', () => {
      const fixture = TestBed.createComponent(DatatableComponent);
      const initialRows = [
        {product: 'Computers'},
        {product: 'Bikes'},
        {product: 'Smartphones'}
      ];
  
      const columns = [
        {
          prop: 'product'
        }
      ];
  
      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;
  
      fixture.detectChanges();
  
      fixture.componentInstance.onColumnSort({
        sorts: [{prop: 'product', dir: 'desc'}]
      });
  
      expect(fixture.componentInstance.internalRows[0]).toBe(initialRows[2]);
      expect(fixture.componentInstance.internalRows[1]).toBe(initialRows[0]);
      expect(fixture.componentInstance.internalRows[2]).toBe(initialRows[1]);
    });

    it('should sort a column when the sorts input changes', () => {
      const fixture = TestBed.createComponent(DatatableComponent);
      const initialRows = [
        {product: 'Computers'},
        {product: 'Bikes'},
        {product: 'Smartphones'}
      ];
  
      const columns = [
        {
          prop: 'product'
        }
      ];
  
      fixture.componentInstance.rows = initialRows;
      fixture.componentInstance.columns = columns;
  
      fixture.detectChanges();
  
      fixture.componentInstance.sorts = [{prop: 'product', dir: 'desc'}];
  
      expect(fixture.componentInstance.internalRows[0]).toBe(initialRows[2]);
      expect(fixture.componentInstance.internalRows[1]).toBe(initialRows[0]);
      expect(fixture.componentInstance.internalRows[2]).toBe(initialRows[1]);
    });

  it('should sort number values', () => {
    const initialRows = [
      { id: 5  },
      { id: 20 },
      { id: 12 }
    ];

    const columns = [
      {
        prop: 'id'
      }
    ];

    component.rows = initialRows;
    component.columns = columns;
    fixture.detectChanges();

    // sort by `id` ascending
    sortBy({ column: 1 });
    fixture.detectChanges();

    expect(textContent({ row: 1, column: 1 })).toContain('5', 'Ascending');
    expect(textContent({ row: 2, column: 1 })).toContain('12', 'Ascending');
    expect(textContent({ row: 3, column: 1 })).toContain('20', 'Ascending');

    // sort by `id` descending
    sortBy({ column: 1 });
    fixture.detectChanges();

    expect(textContent({ row: 1, column: 1 })).toContain('20', 'Descending');
    expect(textContent({ row: 2, column: 1 })).toContain('12', 'Descending');
    expect(textContent({ row: 3, column: 1 })).toContain('5', 'Descending');
  });

  it('should sort string values', () => {
    const initialRows = [
      { product: 'Computers' },
      { product: 'Bikes' },
      { product: 'Smartphones'}
    ];

    const columns = [
      {
        prop: 'product'
      }
    ];

    component.rows = initialRows;
    component.columns = columns;
    fixture.detectChanges();

    // sort by `product` ascending
    sortBy({ column: 1 });
    fixture.detectChanges();

    expect(textContent({ row: 1, column: 1 })).toContain('Bikes', 'Ascending');
    expect(textContent({ row: 2, column: 1 })).toContain('Computers', 'Ascending');
    expect(textContent({ row: 3, column: 1 })).toContain('Smartphones', 'Ascending');

    // sort by `product` descending
    sortBy({ column: 1 });
    fixture.detectChanges();

    expect(textContent({ row: 1, column: 1 })).toContain('Smartphones', 'Descending');
    expect(textContent({ row: 2, column: 1 })).toContain('Computers', 'Descending');
    expect(textContent({ row: 3, column: 1 })).toContain('Bikes', 'Descending');
  });

  it('should sort with a custom comparator', () => {
    const initialRows = [
      { product: 'Smartphones'},
      { product: 'Cars' },
      { product: 'Bikes' }
    ];

    const columns = [
      {
        prop: 'product',
        comparator: (productA: string, productB: string) => {
          return productA.length - productB.length;
        }
      }
    ];

    component.rows = initialRows;
    component.columns = columns;
    fixture.detectChanges();

    // sort by `product` ascending
    sortBy({ column: 1 });
    fixture.detectChanges();

    expect(textContent({ row: 1, column: 1 })).toContain('Cars', 'Ascending');
    expect(textContent({ row: 2, column: 1 })).toContain('Bikes', 'Ascending');
    expect(textContent({ row: 3, column: 1 })).toContain('Smartphones', 'Ascending');

    // sort by `product` descending
    sortBy({ column: 1 });
    fixture.detectChanges();

    expect(textContent({ row: 1, column: 1 })).toContain('Smartphones', 'Descending');
    expect(textContent({ row: 2, column: 1 })).toContain('Bikes', 'Descending');
    expect(textContent({ row: 3, column: 1 })).toContain('Cars', 'Descending');

  });

  it('should sort using a stable sorting algorithm', () => {
    const initialRows = [
      { name: 'sed',        state: 'CA' },
      { name: 'dolor',      state: 'NY' },
      { name: 'ipsum',      state: 'NY' },
      { name: 'foo',        state: 'CA' },
      { name: 'bar',        state: 'CA' },
      { name: 'cat',        state: 'CA' },
      { name: 'sit',        state: 'CA' },
      { name: 'man',        state: 'CA' },
      { name: 'lorem',      state: 'NY' },
      { name: 'amet',       state: 'NY' },
      { name: 'maecennas',  state: 'NY' }
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
        comparator: (nameA: string, nameB: string) => {
          return nameA.length - nameB.length;
        }
      },
      {
        prop: 'state'
      }
    ];

    component.rows = initialRows;
    component.columns = columns;
    fixture.detectChanges();

    // sort by `name` ascending
    sortBy({ column: 1 });
    fixture.detectChanges();

    // sort by `state` descending
    sortBy({ column: 2 });
    fixture.detectChanges();
    sortBy({ column: 2 });
    fixture.detectChanges();

    expect(textContent({ row: 1, column: 1 })).toContain('amet');
    expect(textContent({ row: 2, column: 1 })).toContain('dolor');
    expect(textContent({ row: 3, column: 1 })).toContain('ipsum');
    expect(textContent({ row: 4, column: 1 })).toContain('lorem');
    expect(textContent({ row: 5, column: 1 })).toContain('maecennas');
    expect(textContent({ row: 6, column: 1 })).toContain('sed');
    expect(textContent({ row: 7, column: 1 })).toContain('foo');
    expect(textContent({ row: 8, column: 1 })).toContain('bar');
    expect(textContent({ row: 9, column: 1 })).toContain('cat');
    expect(textContent({ row: 10, column: 1 })).toContain('sit');
    expect(textContent({ row: 11, column: 1 })).toContain('man');
  });
  
  it('should sort correctly after push events', () => {
    const initialRows = [
      { name: 'sed',        state: 'CA' },
      { name: 'dolor',      state: 'NY' },
      { name: 'ipsum',      state: 'NY' },
      { name: 'foo',        state: 'CA' },
      { name: 'bar',        state: 'CA' },
      { name: 'cat',        state: 'CA' },
      { name: 'sit',        state: 'CA' },
      { name: 'man',        state: 'CA' },
      { name: 'lorem',      state: 'NY' },
      { name: 'amet',       state: 'NY' },
      { name: 'maecennas',  state: 'NY' }
    ];
    const additionalRows = [ ...initialRows ];
    
    const columns = [
      {
        prop: 'name',
        comparator: (nameA: string, nameB: string) => {
          return nameA.length - nameB.length;
        }
      },
      {
        prop: 'state'
      }
    ];

    component.rows = initialRows;
    component.columns = columns;
    fixture.detectChanges();

    // sort by `state` descending
    sortBy({ column: 2 });
    fixture.detectChanges();
    sortBy({ column: 2 });
    fixture.detectChanges();

    // sort by `name` ascending
    sortBy({ column: 1 });
    fixture.detectChanges();
    
    // mimic new `rows` data pushed to component
    component.rows = additionalRows;
    fixture.detectChanges();

    // sort by `state` descending
    sortBy({ column: 2 });
    fixture.detectChanges();
    sortBy({ column: 2 });
    fixture.detectChanges();
    
    expect(textContent({ row: 1, column: 1 })).toContain('amet');
    expect(textContent({ row: 2, column: 1 })).toContain('dolor');
    expect(textContent({ row: 3, column: 1 })).toContain('ipsum');
    expect(textContent({ row: 4, column: 1 })).toContain('lorem');
    expect(textContent({ row: 5, column: 1 })).toContain('maecennas');
    expect(textContent({ row: 6, column: 1 })).toContain('sed');
    expect(textContent({ row: 7, column: 1 })).toContain('foo');
    expect(textContent({ row: 8, column: 1 })).toContain('bar');
    expect(textContent({ row: 9, column: 1 })).toContain('cat');
    expect(textContent({ row: 10, column: 1 })).toContain('sit');
    expect(textContent({ row: 11, column: 1 })).toContain('man');
  });

  it('should set offset to 0 when sorting by a column', () => {
    const initialRows = [
      {id: 1},
      {id: 2},
      {id: 3}
    ];
  
    const columns = [
      {
        prop: 'id'
      }
    ];
  
    component.rows = initialRows;
    component.columns = columns;
    fixture.detectChanges();

    const datatableComponent = fixture.debugElement
      .query(By.directive(DatatableComponent))
      .componentInstance;
    datatableComponent.offset = 1;
    
    // sort by `id` descending
    sortBy({ column: 1 });
    fixture.detectChanges();
    sortBy({ column: 1 });
    fixture.detectChanges();

    expect(datatableComponent.offset).toBe(0);
  });

  it('should support array data', () => {
    const initialRows = [
      ['Hello', 123]
    ];
  
    const columns = [
      { prop: 0 },
      { prop: 1 }
    ];
  
    // previously, an exception was thrown from column-helper.ts setColumnDefaults()
    component.rows = initialRows;
    component.columns = columns;
    fixture.detectChanges();
  
    expect(textContent({ row: 1, column: 1 })).toContain('Hello');
    expect(textContent({ row: 1, column: 2 })).toContain('123');
  });
});

describe('DatatableComponent With Custom Templates', () => {
  beforeEach(async(() => setupTest(TestFixtureComponentWithCustomTemplates)));
  
  it('should sort when the table is initially rendered if `sorts` are provided', () => {
    const initialRows = [
      { id: 5  },
      { id: 20 },
      { id: 12 }
    ];
    
    const sorts = [
      {
        prop: 'id',
        dir: 'asc'
      }
    ];

    component.rows = initialRows;
    component.sorts = sorts;
    fixture.detectChanges();

    expect(textContent({ row: 1, column: 1 })).toContain('5', 'Ascending');
    expect(textContent({ row: 2, column: 1 })).toContain('12', 'Ascending');
    expect(textContent({ row: 3, column: 1 })).toContain('20', 'Ascending');
  });
});

@Component({
  template: `
    <ngx-datatable
      [columns]="columns"
      [rows]="rows"
      [sorts]="sorts">
    </ngx-datatable>
  `
})
class TestFixtureComponent {
  columns: any[] = [];
  rows: any[] = [];
  sorts: any[] = [];
}

@Component({
  template: `
    <ngx-datatable [rows]="rows" [sorts]="sorts">
      <ngx-datatable-column name="Id" prop="id">
        <ng-template let-column="column" ngx-datatable-header-template>
          {{ column.name }}
        </ng-template>
        <ng-template let-row="row" ngx-datatable-cell-template>
          {{ row.id }}
        </ng-template>
      </ngx-datatable-column>
    </ngx-datatable>
  `
})
class TestFixtureComponentWithCustomTemplates {
  rows: any[] = [];
  sorts: any[] = [];
}

function setupTest(componentClass) {
  return TestBed.configureTestingModule({
    declarations: [ componentClass ],
    imports: [ NgxDatatableModule ]
  })
  .compileComponents()
  .then(() => {
    fixture = TestBed.createComponent(componentClass);
    component = fixture.componentInstance;
  });
}


  describe('When rows are grouped', () => {
    let fixture;

    beforeEach(() => {
      fixture = TestBed.createComponent(DatatableComponent);
      fixture.componentInstance.rows = [
        { k: 'B', v: 1},
        { k: 'A', v: 2},
        { k: 'A', v: 1},
        { k: 'B', v: 3},
        { k: 'B', v: 2},
      ];

      fixture.componentInstance.columns = [
        { prop: 'k' },
        { prop: 'v' }
      ];
    });

    it('should sort groups according to component rows order', () => {
      fixture.componentInstance.groupRowsBy = 'k';
      fixture.detectChanges();
      
      expect(fixture.componentInstance.groupedRows[0].key).toBe('B');
      expect(fixture.componentInstance.groupedRows[1].key).toBe('A');
    });

    it('should sort group values according to component rows order', () => {
      fixture.componentInstance.groupRowsBy = 'k';
      fixture.detectChanges();
      
      expect(fixture.componentInstance.groupedRows[0].value).toEqual(
        fixture.componentInstance.rows.filter(r => r.k === 'B'));
      expect(fixture.componentInstance.groupedRows[1].value).toEqual(
        fixture.componentInstance.rows.filter(r => r.k === 'A'));
    });

    it('should take any value given to the groupedRows input', () => {
      const unrelatedGroupedRows = [{key: 'foo', value: [{x: 1, y: 2}]}];
      fixture.componentInstance.groupedRows = unrelatedGroupedRows;
      fixture.detectChanges();
      
      expect(fixture.componentInstance.groupedRows).toEqual(unrelatedGroupedRows);
    });

    it('should discard any value given to the groupedRows input if groupRowsBy is specified', () => {
      const unrelatedGroupedRows = [{key: 'foo', value: [{x: 1, y: 2}]}];
      fixture.componentInstance.groupedRows = unrelatedGroupedRows;
      fixture.componentInstance.groupRowsBy = 'k';
      fixture.detectChanges();
      
      expect(fixture.componentInstance.groupedRows).not.toEqual(unrelatedGroupedRows);
      expect(fixture.componentInstance.groupedRows[0].key).toBe('B');
      expect(fixture.componentInstance.groupedRows[1].key).toBe('A');
    });

    it('should not fail before rows are added', () => {
      fixture.componentInstance.rows = null;
      fixture.componentInstance.groupRowsBy = 'k';
      fixture.detectChanges();
      
      expect(fixture.componentInstance.groupedRows).not.toBeTruthy();
    });
      
    it('should no longer have grouped rows after clearing groupRowsBy', () => {
        fixture.componentInstance.groupRowsBy = 'k';
        fixture.detectChanges();
        
        fixture.componentInstance.groupRowsBy = null;
        fixture.detectChanges();
        
      expect(fixture.componentInstance.groupedRows).toBe(null);
    });
    
    describe('with sorts applied', () => {
      beforeEach(() => {
        fixture.componentInstance.groupRowsBy = 'k';
        fixture.componentInstance.sorts = [{prop: 'k', dir: 'asc'}];
        fixture.detectChanges();
      });
      
      it('should sort groups according to component rows order', () => {
        expect(fixture.componentInstance.groupedRows[0].key).toBe('A');
        expect(fixture.componentInstance.groupedRows[1].key).toBe('B');
      });
      
      it('should sort group values according to component sorts', () => {
        expect(fixture.componentInstance.groupedRows[0].value).toEqual(
          fixture.componentInstance.rows.filter(r => r.k === 'A'));
        expect(fixture.componentInstance.groupedRows[1].value).toEqual(
          fixture.componentInstance.rows.filter(r => r.k === 'B'));
      });
    });
    
    describe('after column sort', () => {
      // NOTE: Some use cases may achieve better user experience by disabling
      // row grouping when the user sorts by an unrelated column; these tests
      // simply probe the default behavior.

      beforeEach(() => {
        fixture.componentInstance.groupRowsBy = 'k';
        fixture.detectChanges();
        
        fixture.componentInstance.onColumnSort({
          sorts: [{prop: 'k', dir: 'asc'}]
        });
      });
      
      it('should sort groups according to component rows order', () => {
        expect(fixture.componentInstance.groupedRows[0].key).toBe('A');
        expect(fixture.componentInstance.groupedRows[1].key).toBe('B');
      });
      
      it('should sort group values according to component sorts', () => {
        expect(fixture.componentInstance.groupedRows[0].value).toEqual(
          fixture.componentInstance.rows.filter(r => r.k === 'A'));
        expect(fixture.componentInstance.groupedRows[1].value).toEqual(
          fixture.componentInstance.rows.filter(r => r.k === 'B'));
      });
    });
  });

});

/**
 * mimics the act of a user clicking a column to sort it
 */
function sortBy({ column }: { column: number }) {
  const columnIndex = column - 1;
  const headerCellDe = fixture.debugElement
    .queryAll(By.css('datatable-header-cell'))[columnIndex];
  const de = headerCellDe.query(By.css('span:last-child'));
  de.triggerEventHandler('click', null);
}

/**
 * test helper function to return text content of a cell within the
 * body of the ngx-datatable component
 */
function textContent({ row, column }: { row: number, column: number }) {
  const [ rowIndex, columnIndex ] = [ row - 1, column - 1];
  const bodyRowDe = fixture.debugElement
    .queryAll(By.directive(DataTableBodyRowComponent))[rowIndex];
  const bodyCellDe = bodyRowDe
    .queryAll(By.directive(DataTableBodyCellComponent))[columnIndex];
  
  return bodyCellDe.nativeElement.textContent;
}
