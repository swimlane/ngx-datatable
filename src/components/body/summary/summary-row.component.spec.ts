import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import {} from 'jasmine';

import { DataTableBodyRowComponent } from '../body-row.component';
import { DataTableBodyCellComponent } from '../body-cell.component';
import {
  DataTableSummaryRowComponent
} from './summary-row.component';

describe('DataTableSummaryRowComponent', () => {
  let fixture: ComponentFixture<DataTableSummaryRowComponent>;
  let component: DataTableSummaryRowComponent;
  let element;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataTableSummaryRowComponent,
        DataTableBodyRowComponent,
        DataTableBodyCellComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableSummaryRowComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
});
