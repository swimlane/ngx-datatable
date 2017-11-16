import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DatatableGroupHeaderDirective } from './body-group-header.directive';
import { DatatableGroupHeaderTemplateDirective } from './body-group-header-template.directive';

@Component({
  selector: 'test-fixture-component',
  template: `
    <ngx-datatable-group-header id="t1"></ngx-datatable-group-header>
    <ngx-datatable-group-header id="t2">
      <ng-template ngx-datatable-group-header-template></ng-template>
    </ngx-datatable-group-header>
  `
})
class TestFixtureComponent {
}

describe('DatatableGroupHeaderDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DatatableGroupHeaderDirective,
        DatatableGroupHeaderTemplateDirective,
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
    let directive: DatatableGroupHeaderDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.directive(DatatableGroupHeaderDirective))
        .injector.get(DatatableGroupHeaderDirective);
    });

    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have at least one DatatableGroupHeaderDirective directive', () => {
      expect(directive).toBeTruthy();
    });
  });

  describe('directive #1', () => {
    let directive: DatatableGroupHeaderDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.css('#t1'))
        .injector.get(DatatableGroupHeaderDirective);
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
    let directive: DatatableGroupHeaderDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.css('#t2'))
        .injector.get(DatatableGroupHeaderDirective);
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
