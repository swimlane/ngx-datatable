import {
  async,
  TestBed
} from '@angular/core/testing';

import {
  DataTableHeaderCellComponent
} from '.';

describe('DataTableHeaderCellComponent', () => {
  let fixture;
  let component: DataTableHeaderCellComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DataTableHeaderCellComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableHeaderCellComponent);
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
