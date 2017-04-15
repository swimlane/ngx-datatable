import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { DataTableBodyCellComponent, DataTableBodyRowComponent } from '.';

describe('DataTableBodyRowComponent', () => {
  let fixture: ComponentFixture<DataTableBodyRowComponent>;
  let component: DataTableBodyRowComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DataTableBodyCellComponent,
        DataTableBodyRowComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DataTableBodyRowComponent);
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
