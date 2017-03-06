import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DatatableRowDetailDirective, DatatableRowDetailTemplateDirective } from '.';

@Component({
  selector: 'test-fixture-component',
  template: `
    <ngx-datatable-row-detail id="t1"></ngx-datatable-row-detail>
    <ngx-datatable-row-detail id="t2">
      <ng-template ngx-datatable-row-detail-template></ng-template>
    </ngx-datatable-row-detail>
  `
})
class TestFixtureComponent {
}

describe('DatatableRowDetailDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DatatableRowDetailDirective,
        DatatableRowDetailTemplateDirective,
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
    let directive: DatatableRowDetailDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.directive(DatatableRowDetailDirective))
        .injector.get(DatatableRowDetailDirective);
    });

    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have at least one DatatableRowDetailDirective directive', () => {
      expect(directive).toBeTruthy();
    });
  });

  describe('directive #1', () => {
    let directive: DatatableRowDetailDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.css("#t1"))
        .injector.get(DatatableRowDetailDirective);
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
    let directive: DatatableRowDetailDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.css("#t2"))
        .injector.get(DatatableRowDetailDirective);
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
