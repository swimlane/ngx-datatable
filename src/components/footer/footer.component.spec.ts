import {
  async,
  TestBed
} from '@angular/core/testing';

import {
  DataTableFooterComponent,
  DataTablePagerComponent
} from '.';

describe('DataTableFooterComponent', () => {
  let fixture;
  let component: DataTableFooterComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DataTableFooterComponent,
        DataTablePagerComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableFooterComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });
  }));

  describe('fixture', () => {
    it('component is created', () => {
      expect(component).toBeTruthy();
    });
  });
});
