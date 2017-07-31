import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { DataTableGroupWrapperComponent } from '.';

describe('DataTableGroupWrapperComponent', () => {
  let fixture: ComponentFixture<DataTableGroupWrapperComponent>;
  let component: DataTableGroupWrapperComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DataTableGroupWrapperComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableGroupWrapperComponent);
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
