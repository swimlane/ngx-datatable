import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DataTableColumnDirective } from '.';
import { ColumnChangesService } from '../../services/column-changes.service';

@Component({
  selector: 'test-fixture-component',
  template: `
    <ngx-datatable-column id="t1"></ngx-datatable-column>
    <ngx-datatable-column id="t2" [name]="columnName">
      <ng-template></ng-template>
      <ng-template></ng-template>
    </ngx-datatable-column>
  `
})
class TestFixtureComponent {
  columnName: string;
}

describe('DataTableColumnDirective', () => {
  let fixture: ComponentFixture<TestFixtureComponent>;
  let component: TestFixtureComponent;
  let element;

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DataTableColumnDirective,
        TestFixtureComponent
      ],
      providers: [
        {
          provide: ColumnChangesService,
          useValue: {
            onInputChange: jasmine.createSpy('onInputChange')
          }
        }
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
    let directive: DataTableColumnDirective;
    
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
    let directive: DataTableColumnDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.css('#t1'))
        .injector.get(DataTableColumnDirective);
    });

    it('should be found', () => {
      expect(directive).toBeTruthy();
    });

    it('should have undefined inputs by default', () => {
      fixture.detectChanges();
      expect(directive.name).toBeUndefined();
      expect(directive.prop).toBeUndefined();
      expect(directive.frozenRight).toBeUndefined();
      expect(directive.frozenLeft).toBeUndefined();
      expect(directive.flexGrow).toBeUndefined();
      expect(directive.resizeable).toBeUndefined();
      expect(directive.comparator).toBeUndefined();
      expect(directive.pipe).toBeUndefined();
      expect(directive.sortable).toBeUndefined();
      expect(directive.draggable).toBeUndefined();
      expect(directive.canAutoResize).toBeUndefined();
      expect(directive.minWidth).toBeUndefined();
      expect(directive.width).toBeUndefined();
      expect(directive.maxWidth).toBeUndefined();
      expect(directive.treeLevelIndent).toBeUndefined();
    });
  });

  describe('directive #2', () => {
    let directive: DataTableColumnDirective;
    
    beforeEach(() => {
      directive = fixture.debugElement
        .query(By.css('#t2'))
        .injector.get(DataTableColumnDirective);
    });

    it('should be found', () => {
      expect(directive).toBeTruthy();
    });

    it('should not notify of changes if its the first change', () => {
      component.columnName = 'Column A';
      fixture.detectChanges();
      
      expect(TestBed.get(ColumnChangesService).onInputChange).not.toHaveBeenCalled();
    });

    it('notifies of subsequent changes', () => {
      component.columnName = 'Column A';
      fixture.detectChanges();
      
      expect(TestBed.get(ColumnChangesService).onInputChange).not.toHaveBeenCalled();
      
      component.columnName = 'Column B';
      fixture.detectChanges();
      
      expect(TestBed.get(ColumnChangesService).onInputChange).toHaveBeenCalled();
    });
  });
});
