import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DataTableRowDetailDirective, DataTableRowDetailTemplateDirective } from '.';

@Component({
  selector: 'test-fixture-component',
  template: `
    <swui-data-table-row-detail id="t1"></swui-data-table-row-detail>
    <swui-data-table-row-detail id="t2">
      <template swui-data-table-row-detail-template></template>
    </swui-data-table-row-detail>
  `
})
class TestFixtureComponent {
}

describe('DataTableRowDetailDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DataTableRowDetailDirective,
        DataTableRowDetailTemplateDirective,
        TestFixtureComponent
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestFixtureComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });
  }));

  describe('fixture', () => {
    let directive: DataTableRowDetailDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.directive(DataTableRowDetailDirective))
        .injector.get(DataTableRowDetailDirective);
    });

    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have at least one DataTableRowDetailDirective directive', () => {
      expect(directive).toBeTruthy();
    });
  });

  describe('directive #1', () => {
    let directive: DataTableRowDetailDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.css("#t1"))
        .injector.get(DataTableRowDetailDirective);
    });

    it('should be found', () => {
      expect(directive).toBeTruthy();
    });

    it('should not have a template', () => {
      fixture.detectChanges();
      expect(directive.template).toBeUndefined();
    });
  });

  describe('directive #2', () => {
    let directive: DataTableRowDetailDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.css("#t2"))
        .injector.get(DataTableRowDetailDirective);
    });

    it('should be found', () => {
      expect(directive).toBeTruthy();
    });

    it('should have a template', () => {
      fixture.detectChanges();
      expect(directive.template).toBeDefined();
    });
  });
});
