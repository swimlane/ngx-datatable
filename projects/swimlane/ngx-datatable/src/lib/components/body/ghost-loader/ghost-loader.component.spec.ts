import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, computed, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { toInternalColumn } from '../../../utils/column-helper';
import { DataTableGhostLoaderComponent } from './ghost-loader.component';
import { GhostLoaderHarness } from './testing/ghost-loader.harness';

describe('DataTableGhostLoaderComponent', () => {
  let fixture: ComponentFixture<DataTableGhostLoaderComponent>;
  let loaderHarness: GhostLoaderHarness;

  beforeEach(async () => {
    fixture = TestBed.createComponent(DataTableGhostLoaderComponent);
    fixture.componentRef.setInput(
      'columns',
      toInternalColumn([
        { prop: 'col1', width: 100 },
        { prop: 'col2', width: 200 }
      ])
    );
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('rowHeight', 30);
    loaderHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, GhostLoaderHarness);
  });

  it('should create 5 ghost elements if page size is 5', async () => {
    fixture.componentRef.setInput('pageSize', 5);
    const count = await loaderHarness.getGhostElementCount();
    expect(count).toBe(5);
  });

  it('should create ghost cells for each column', async () => {
    const cellCount = await loaderHarness.getGhostCellCount();
    expect(cellCount).toBe(
      fixture.componentInstance.columns().length * fixture.componentInstance.pageSize()
    );
  });
});

@Component({
  selector: 'test-ghost-loader',
  imports: [DataTableGhostLoaderComponent],
  template: `<ghost-loader pageSize="1" [rowHeight]="30" [columns]="columns()" />
    <ng-template #customGhostCell><div>custom ghost cell</div></ng-template>`
})
class TestGhostLoaderComponent {
  readonly columns = computed(() =>
    toInternalColumn([
      { prop: 'col1', width: 100, ghostCellTemplate: this.ghostTemplate() },
      { prop: 'col2', width: 200 }
    ])
  );
  readonly ghostTemplate = viewChild.required('customGhostCell', { read: TemplateRef });
}

describe('with custom template', () => {
  let fixture: ComponentFixture<TestGhostLoaderComponent>;
  let loaderHarness: GhostLoaderHarness;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestGhostLoaderComponent);
    loaderHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, GhostLoaderHarness);
  });

  it('should render custom ghost cell template', async () => {
    await fixture.whenStable();
    const ghostCells = await loaderHarness.getGhostCellContent(0);
    expect(ghostCells).toBe('custom ghost cell');
  });
});
