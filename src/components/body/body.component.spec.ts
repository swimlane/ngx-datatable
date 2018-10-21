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

  fdescribe('Row grouping', () => {

    var groupExpansionDefaultTestCases = [
      { value: true },
      { value: false }
    ];

    groupExpansionDefaultTestCases.forEach(function(testCase: any) {
      it('should apply default group expansion to all groups when default is ' + testCase.value.toString(), () => {
        let rows = [
          {
            key: '20', value: [
              {age: '20', name: 'name1'},
              {age: '20', name: 'name2'},
            ]
          },
          {
            key: '30', value: [
              {age: '30', name: 'name3'},
              {age: '30', name: 'name4'},
              {age: '30', name: 'name5'},
            ],
          },
          {
            key: '40', value: [
              {age: '40', name: 'name6'},
            ],
          }
        ];

        component.groupExpansionDefault =  testCase.value;
        component.rows = rows;
        rows.forEach(function(row) {
          let expanded = component.getRowExpanded(row);
          expect(expanded).toBe(testCase.value);
        });
      });
    });

    groupExpansionDefaultTestCases.forEach(function(testCase: any) {
      it('should apply default group expansion to all newly added groups when default expansion is ' + testCase.value.toString(), () => {
        let rows = [
          {
            key: '20', value: [
              {age: '20', name: 'name1'},
              {age: '20', name: 'name2'},
            ]
          },
          {
            key: '30', value: [
              {age: '30', name: 'name3'},
              {age: '30', name: 'name4'},
              {age: '30', name: 'name5'},
            ],
          },
          {
            key: '40', value: [
              {age: '40', name: 'name6'},
            ],
          }
        ];

        component.groupExpansionDefault =  testCase.value;
        component.rows = rows;

        let updatedRows = [
          {
            key: '20', value: [
              {age: '20', name: 'name1'},
              {age: '20', name: 'name2'},
              {age: '20', name: 'name7'},
            ]
          },
          {
            key: '30', value: [
              {age: '30', name: 'name3'},
              {age: '30', name: 'name4'},
            ],
          },
          {
            key: '50', value: [
              {age: '50', name: 'name8'},
            ],
          }
        ];

        updatedRows.forEach(function(row) {
          let expanded = component.getRowExpanded(row);
          expect(expanded).toBe(testCase.value);
        });
      });
    });

    groupExpansionDefaultTestCases.forEach(function(testCase: any) {
      it('should toggle group expansion state when requested when default expansion is ' + testCase.value.toString(), () => {
        let rows = [
          {
            key: '20', value: [
              {age: '20', name: 'name1'},
              {age: '20', name: 'name2'},
            ]
          },
          {
            key: '30', value: [
              {age: '30', name: 'name3'},
              {age: '30', name: 'name4'},
              {age: '30', name: 'name5'},
            ],
          },
          {
            key: '40', value: [
              {age: '40', name: 'name6'},
            ],
          }
        ];

        component.groupExpansionDefault =  testCase.value;
        component.rows = rows;

        // Toggle away from default.
        rows.forEach(function(row) {
          var expanded = component.getRowExpanded(row);
          component.toggleRowExpansion(row);
          expanded = component.getRowExpanded(row);
          expect(expanded).toBe(!testCase.value);
        });

        // Toggle back to default.
        rows.forEach(function(row) {
          var expanded = component.getRowExpanded(row);
          component.toggleRowExpansion(row);
          expanded = component.getRowExpanded(row);
          expect(expanded).toBe(testCase.value);
        });
      });
    });

    groupExpansionDefaultTestCases.forEach(function(testCase: any) {
      it('should preserve group expansion state when rows change when default expansion is ' + testCase.value.toString(), () => {
        let rows = [
          {
            key: '20', value: [
              {age: '20', name: 'name1'},
              {age: '20', name: 'name2'},
            ]
          },
          {
            key: '30', value: [
              {age: '30', name: 'name3'},
              {age: '30', name: 'name4'},
              {age: '30', name: 'name5'},
            ],
          },
          {
            key: '40', value: [
              {age: '40', name: 'name6'},
            ],
          }
        ];

        component.groupExpansionDefault =  testCase.value;
        component.rows = rows;

        // Toggle a row
        var expanded = component.getRowExpanded(rows[1]);
        component.toggleRowExpansion(rows[1]);

        // Update data
        let updatedRows = [
          {
            key: '20', value: [
              {age: '20', name: 'name1'},
              {age: '20', name: 'name2'},
              {age: '20', name: 'name7'},
            ]
          },
          {
            key: '30', value: [
              {age: '30', name: 'name3'},
              {age: '30', name: 'name4'},
            ],
          },
          {
            key: '50', value: [
              {age: '50', name: 'name8'},
            ],
          }
        ];

        component.rows = updatedRows;

        // First row should remain at default expansion value
        expanded = component.getRowExpanded(rows[0]);
        expect(expanded).toBe(testCase.value);

        // Toggled row should remain at toggled expansion value
        expanded = component.getRowExpanded(rows[1]);
        expect(expanded).toBe(!testCase.value);

        // Newly added row should be at default expansion value
        expanded = component.getRowExpanded(rows[2]);
        expect(expanded).toBe(testCase.value);
      });
    });
  });
});
