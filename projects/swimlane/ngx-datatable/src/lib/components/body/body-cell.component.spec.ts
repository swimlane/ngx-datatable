import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, ComponentRef, computed, signal, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { toInternalColumn } from '../../utils/column-helper';
import { numericIndexGetter } from '../../utils/column-prop-getters';
import { DataTableBodyCellComponent } from './body-cell.component';
import { BodyCellHarness } from './testing/body-cell.harness';

@Component({
  selector: 'mock-cell-template',
  imports: [DataTableBodyCellComponent],
  template: `<ng-template #template let-row="row">Custom Cell Template {{ row.id }} </ng-template>
    <datatable-body-cell
      ariaRowCheckboxMessage="checkbox message"
      [row]="row()"
      [column]="column()"
      [cssClasses]="{
        treeStatusLoading: 'icon datatable-icon-loading',
        treeStatusExpanded: 'icon datatable-icon-down',
        treeStatusCollapsed: 'icon datatable-icon-up'
      }"
    /> `
})
class MockCellTemplateComponent {
  readonly row = signal({ id: 1 });
  readonly column = computed(
    () => toInternalColumn([{ prop: 'id', cellTemplate: this.template() }])[0]
  );
  readonly template = viewChild('template', { read: TemplateRef<any> });
}

describe('DataTableBodyCellComponent', () => {
  let fixture: ComponentFixture<DataTableBodyCellComponent>;
  let component: ComponentRef<DataTableBodyCellComponent>;
  let harness: BodyCellHarness;

  beforeEach(async () => {
    fixture = TestBed.createComponent(DataTableBodyCellComponent);
    component = fixture.componentRef;
    component.setInput('row', ['Hello']);
    component.setInput('column', { width: signal(0) });
    component.setInput('ariaRowCheckboxMessage', 'checkbox message');
    component.setInput('cssClasses', {
      treeStatusLoading: 'icon datatable-icon-loading',
      treeStatusExpanded: 'icon datatable-icon-down',
      treeStatusCollapsed: 'icon datatable-icon-up'
    });
    harness = await TestbedHarnessEnvironment.harnessForFixture(fixture, BodyCellHarness);
  });

  it('should get value from zero-index prop', async () => {
    const columns = toInternalColumn([{ name: 'First Column', prop: 0 }]);
    expect(columns[0].$$valueGetter).toBe(numericIndexGetter);

    component.setInput('column', columns[0]);

    const cellText = await harness.getBodyCellText();
    expect(cellText).toEqual('Hello');
  });

  it('should have min width when column has minWidth', async () => {
    const columns = toInternalColumn([{ name: 'Min Width Column', prop: 0, minWidth: 500 }]);
    component.setInput('column', columns[0]);

    expect(await harness.bodyCellWidth()).toBe(500);
  });

  it('should honour maxWidth when provided', async () => {
    const columns = toInternalColumn([{ name: 'Min Width Column', prop: 0, maxWidth: 10 }]);
    component.setInput('column', columns[0]);

    expect(await harness.bodyCellWidth()).toBe(10);
  });

  describe('checkboxable', () => {
    beforeEach(() => {
      component.setInput('row', { id: 1 });
      const columns = toInternalColumn([{ name: 'Checkbox', prop: 'id', checkboxable: true }]);
      component.setInput('column', columns[0]);
    });

    it('should rendder checkbox', async () => {
      expect(await harness.hasCheckbox()).toBe(true);
    });

    it('should emit activate event on checkbox click', async () => {
      expect(await harness.hasCheckbox()).not.toBeNull();

      const activateEventSpy = vi.spyOn(component.instance.activate, 'emit');

      await harness.toggleCheckbox();
      expect(activateEventSpy).toHaveBeenCalled();
    });

    it('should not emit activate event on checkbox click when disabled', async () => {
      component.setInput('disabled', true);
      expect(await harness.hasCheckbox()).toBe(true);

      const activateEventSpy = vi.spyOn(component.instance.activate, 'emit');

      await harness.toggleCheckbox();
      expect(activateEventSpy).not.toHaveBeenCalled();
    });
  });

  describe('treeToggle', () => {
    beforeEach(() => {
      component.setInput('row', { id: 1 });
      const columns = toInternalColumn([{ name: 'Tree', prop: 'id', isTreeColumn: true }]);
      component.setInput('column', columns[0]);
    });

    it('should render tree toggle button when isTreeColumn is true', async () => {
      const button = await harness.hasTreeToggleButton();
      expect(button).toBe(true);
    });

    it('should be collapsed by default', async () => {
      const isCollapsed = await harness.getTreeToggleButtonStatus();
      expect(isCollapsed).toBe('collapsed');
    });

    it('should emit treeAction event on button click', async () => {
      const button = await harness.hasTreeToggleButton();
      expect(button).toBe(true);

      const treeActionSpy = vi.spyOn(component.instance.treeAction, 'emit');

      await harness.clickTreeToggleButton();
      expect(treeActionSpy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('cell template', () => {
    let templateFixture: ComponentFixture<MockCellTemplateComponent>;
    beforeEach(async () => {
      templateFixture = TestBed.createComponent(MockCellTemplateComponent);
      harness = await TestbedHarnessEnvironment.harnessForFixture(templateFixture, BodyCellHarness);
      await templateFixture.whenStable();
    });

    it('should render custom cell template when provided along with cell context', async () => {
      const cellText = await harness.getBodyCellText();
      expect(cellText).toBe('Custom Cell Template 1'); // Assuming the template renders this text
    });
  });
});
