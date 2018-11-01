import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import {} from 'jasmine';

import {
  DataTableBodyComponent,
  DataTableBodyRowComponent,
  DataTableRowWrapperComponent,
  DataTableBodyCellComponent,
  DataTableSelectionComponent,
  DataTableSummaryRowComponent,
  ProgressBarComponent,
  ScrollerComponent
} from '.';
import { ScrollbarHelper } from '../../services';

describe('DataTableBodyComponent', () => {
  let fixture: ComponentFixture<DataTableBodyComponent>;
  let component: DataTableBodyComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DataTableBodyComponent,
        DataTableBodyRowComponent,
        DataTableRowWrapperComponent,
        DataTableBodyCellComponent,
        DataTableSelectionComponent,
        DataTableSummaryRowComponent,
        ProgressBarComponent,
        ScrollerComponent
      ],
      providers: [ScrollbarHelper]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableBodyComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });
  }));

  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Paging', () => {

    it('should have correct indexes for normal paging with rows > pageSize', () => {
      component.externalPaging = false;
      component.rows = [ {num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10} ];
      component.pageSize = 10;
      component.offset = 1;
      component.rowCount = 20;
      const expectedIndexes = { first: 10, last: 20};
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });

    it('should have correct indexes for normal paging with rows < pageSize', () => {
      component.externalPaging = false;
      component.rows = [ {num: 1}, {num: 2}, {num: 3}, {num: 4} ];
      component.pageSize = 5;
      component.offset = 1;
      component.rowCount = 9;
      const expectedIndexes = { first: 5, last: 9};
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });

    it('should have correct indexes for external paging with rows > pageSize', () => {
      component.externalPaging = true;
      component.rows = [ {num: 1}, {num: 2}, {num: 3}, {num: 4}, {num: 5}, {num: 6}, {num: 7}, {num: 8}, {num: 9}, {num: 10} ];
      component.pageSize = 10;
      component.offset = 1;
      component.rowCount = 20;
      const expectedIndexes = { first: 0, last: 10};
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });

    it('should have correct indexes for external paging with rows < pageSize', () => {
      component.externalPaging = true;
      component.rows = [ {num: 1}, {num: 2}, {num: 3}, {num: 4} ];
      component.pageSize = 5;
      component.offset = 1;
      component.rowCount = 9;
      const expectedIndexes = { first: 0, last: 5};
      component.updateIndexes();
      expect(component.indexes).toEqual(expectedIndexes);
    });

  });

  describe('Summary row', () => {
    it('should not return custom styles for a bottom summary row if a scrollbar mode is off', () => {
      const styles = component.getBottomSummaryRowStyles();
      expect(styles).toBeFalsy();
    });

    it('should return custom styles for a bottom summary row if a scrollbar mode is on', () => {
      component.rowHeight = 50;
      component.scrollbarV = true;
      component.virtualization = true;
      component.rows = [ {num: 1}, {num: 2}, {num: 3}, {num: 4} ];
      const styles = component.getBottomSummaryRowStyles();
      expect(styles).toBeDefined();
    });
  });
});
