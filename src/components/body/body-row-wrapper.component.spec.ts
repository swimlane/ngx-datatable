import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { DataTableRowWrapperComponent } from '.';

describe('DataTableRowWrapperComponent', () => {
  let fixture: ComponentFixture<DataTableRowWrapperComponent>;
  let component: DataTableRowWrapperComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DataTableRowWrapperComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableRowWrapperComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });
  }));

  /*
  describe('fixture', () => {
    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });
  });
  */
});
