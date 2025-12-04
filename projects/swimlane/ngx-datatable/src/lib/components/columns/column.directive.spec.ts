import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Row } from '../../types/public.types';
import { DataTableColumnDirective } from './column.directive';

@Component({
  selector: 'test-fixture-component',
  imports: [DataTableColumnDirective],
  template: `
    <ngx-datatable-column id="t1" />
    <ngx-datatable-column id="t2" [name]="columnName()">
      <ng-template />
      <ng-template />
    </ngx-datatable-column>
  `
})
class TestFixtureComponent {
  readonly columnName = signal<string | undefined>(undefined);
}

describe('DataTableColumnDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(TestFixtureComponent);
    component = fixture.componentInstance;
  });

  describe('fixture', () => {
    let directive: DataTableColumnDirective<Row>;

    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.directive(DataTableColumnDirective))
        .injector.get(DataTableColumnDirective);
    });

    it('should have a component instance', () => {
      expect(component).toBeTruthy();
    });

    it('should have at least one DataTableColumnDirective directive', () => {
      expect(directive).toBeTruthy();
    });
  });

  describe('directive #1', () => {
    let directive: DataTableColumnDirective<Row>;

    beforeEach(async () => {
      directive = fixture.debugElement.query(By.css('#t1')).injector.get(DataTableColumnDirective);
      await fixture.whenStable();
    });

    it('should have undefined inputs by default', () => {
      expect(directive.name()).toBeUndefined();
      expect(directive.prop()).toBeUndefined();
      expect(directive.frozenRight()).toBe(false);
      expect(directive.frozenLeft()).toBe(false);
      expect(directive.flexGrow()).toBeUndefined();
      expect(directive.resizeable()).toBeUndefined();
      expect(directive.comparator()).toBeUndefined();
      expect(directive.pipe()).toBeUndefined();
      expect(directive.sortable()).toBeUndefined();
      expect(directive.draggable()).toBeUndefined();
      expect(directive.canAutoResize()).toBeUndefined();
      expect(directive.minWidth()).toBeUndefined();
      expect(directive.width()).toBeUndefined();
      expect(directive.maxWidth()).toBeUndefined();
      expect(directive.treeLevelIndent()).toBeUndefined();
    });
  });

  describe('directive #2', () => {
    it('should update name signal when input changes', async () => {
      const directive = fixture.debugElement
        .query(By.css('#t2'))
        .injector.get(DataTableColumnDirective);

      component.columnName.set('Column A');
      await fixture.whenStable();

      expect(directive.name()).toBe('Column A');

      component.columnName.set('Column B');
      await fixture.whenStable();

      expect(directive.name()).toBe('Column B');
    });
  });
});
