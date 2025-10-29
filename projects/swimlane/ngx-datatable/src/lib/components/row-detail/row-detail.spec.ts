import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTableColumnDirective } from '@siemens/ngx-datatable';

import { DatatableComponent } from '../datatable.component';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';
import { DatatableRowDetailDirective } from './row-detail.directive';

describe('DatatableRowDetailDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let table: DatatableComponent;

  interface TestRow {
    id: number;
    name: string;
  }

  @Component({
    imports: [
      DatatableComponent,
      DatatableRowDetailDirective,
      DatatableRowDetailTemplateDirective,
      DataTableColumnDirective
    ],
    template: `
      <ngx-datatable
        #myTable
        [rows]="rows()"
        [scrollbarV]="true"
        [rowHeight]="50"
        [headerHeight]="50"
        [footerHeight]="50"
        [externalPaging]="externalPaging()"
        [offset]="offset()"
      >
        <ngx-datatable-row-detail [rowHeight]="detailRowHeight" (toggle)="onDetailToggle($event)">
          <ng-template let-row="row" ngx-datatable-row-detail-template>
            <div>Detail for {{ row.name }}</div>
          </ng-template>
        </ngx-datatable-row-detail>

        <ngx-datatable-column name="id" />
        <ngx-datatable-column name="name" />
      </ngx-datatable>
    `
  })
  class TestFixtureComponent {
    readonly table = viewChild.required<DatatableComponent<TestRow>>('myTable');

    readonly rows = signal<TestRow[]>([
      { id: 1, name: 'Row 1' },
      { id: 2, name: 'Row 2' },
      { id: 3, name: 'Row 3' },
      { id: 4, name: 'Row 4' },
      { id: 5, name: 'Row 5' }
    ]);

    readonly externalPaging = signal<boolean>(false);
    readonly offset = signal<number>(0);

    detailRowHeight = jasmine.createSpy('detailRowHeight').and.returnValue(100);

    onDetailToggle(_event: any) {
      // Handle toggle event
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFixtureComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestFixtureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    table = component.table();
  });

  it('should stop calling rowHeight for collapsed details', () => {
    // Expand first and second rows
    table.rowDetail!.toggleExpandRow(component.rows()[0]);
    table.rowDetail!.toggleExpandRow(component.rows()[1]);
    fixture.detectChanges();

    // Collapse the first row
    table.rowDetail!.toggleExpandRow(component.rows()[0]);
    component.detailRowHeight.calls.reset();
    fixture.detectChanges();

    expect(component.detailRowHeight).toHaveBeenCalledWith(component.rows()[1], 1);
  });

  it('should call rowHeight with correct indices after expandAllRows', () => {
    component.detailRowHeight.calls.reset();

    // Expand all rows
    table.rowDetail!.expandAllRows();
    fixture.detectChanges();

    expect(component.detailRowHeight).toHaveBeenCalledWith(component.rows()[0], 0);
    expect(component.detailRowHeight).toHaveBeenCalledWith(component.rows()[1], 1);
    expect(component.detailRowHeight).toHaveBeenCalledWith(component.rows()[2], 2);
    expect(component.detailRowHeight).toHaveBeenCalledWith(component.rows()[3], 3);
    expect(component.detailRowHeight).toHaveBeenCalledWith(component.rows()[4], 4);
  });
});
