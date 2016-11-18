import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import {
  DataTableBodyComponent,
  DataTableBodyRowComponent,
  DataTableRowWrapperComponent,
  DataTableBodyCellComponent,
  DataTableSelectionComponent,
  ProgressBarComponent,
  ScrollerComponent
} from '.';

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
        ProgressBarComponent,
        ScrollerComponent
      ]
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
});
