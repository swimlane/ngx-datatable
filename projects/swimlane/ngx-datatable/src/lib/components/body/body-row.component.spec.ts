import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ScrollbarHelper } from '../../services/scrollbar-helper.service';
import { RowIndex } from '../../types/internal.types';
import { TableColumn } from '../../types/table-column.type';
import { toInternalColumn } from '../../utils/column-helper';
import { DataTableBodyRowComponent } from './body-row.component';

describe('DataTableBodyRowComponent', () => {
  @Component({
    imports: [DataTableBodyRowComponent],
    template: ` <datatable-body-row [rowIndex]="rowIndex" [row]="row" [columns]="columns" /> `
  })
  class TestHostComponent {
    rowIndex: RowIndex = { index: 0 };
    row: any = { prop: 'value' };
    columns: TableColumn[] = toInternalColumn([{ prop: 'prop' }]);
  }

  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [ScrollbarHelper]
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should apply odd/event without groups', () => {
    component.rowIndex = { index: 0 };
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.directive(DataTableBodyRowComponent))
      .nativeElement as HTMLElement;
    expect(element.classList).toContain('datatable-row-even');
    component.rowIndex = { index: 3 };
    fixture.detectChanges();
    expect(element.classList).toContain('datatable-row-odd');
  });

  it('should apply event odd/even if row is grouped', () => {
    component.rowIndex = { index: 1, indexInGroup: 0 };
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.directive(DataTableBodyRowComponent))
      .nativeElement as HTMLElement;
    expect(element.classList).toContain('datatable-row-even');
    component.rowIndex = { index: 666, indexInGroup: 3 };
    fixture.detectChanges();
    expect(element.classList).toContain('datatable-row-odd');
  });
});
