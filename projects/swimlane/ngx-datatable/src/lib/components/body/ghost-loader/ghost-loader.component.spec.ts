import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AfterViewInit, Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataTableGhostLoaderComponent } from './ghost-loader.component';
import { GhostLoaderHarness } from './testing/ghost-loader.harness';

describe('DataTableGhostLoaderComponent', () => {
  let fixture: ComponentFixture<DataTableGhostLoaderComponent>;
  let loaderHarness: GhostLoaderHarness;

  beforeEach(waitForAsync(async () => {
    fixture = TestBed.createComponent(DataTableGhostLoaderComponent);
    fixture.componentRef.setInput('columns', [
      { prop: 'col1', width: 100 },
      { prop: 'col2', width: 200 }
    ]);
    fixture.componentRef.setInput('pageSize', 10);
    fixture.componentRef.setInput('rowHeight', 30);
    loaderHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, GhostLoaderHarness);
  }));

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
  template: `<ghost-loader pageSize="1" rowHeight="30" [columns]="columns" />
    <ng-template #customGhostCell><div>custom ghost cell</div></ng-template>`
})
class TestGhostLoaderComponent implements AfterViewInit {
  columns = [
    { prop: 'col1', width: 100 },
    { prop: 'col2', width: 200 }
  ];
  readonly ghostTemplate = viewChild('customGhostCell', { read: TemplateRef });

  ngAfterViewInit() {
    this.columns = this.columns.map(col => ({
      ...col,
      ghostCellTemplate: this.ghostTemplate()
    }));
  }
}

describe('with custom template', () => {
  let fixture: ComponentFixture<TestGhostLoaderComponent>;
  let loaderHarness: GhostLoaderHarness;

  beforeEach(waitForAsync(async () => {
    fixture = TestBed.createComponent(TestGhostLoaderComponent);
    loaderHarness = await TestbedHarnessEnvironment.harnessForFixture(fixture, GhostLoaderHarness);
  }));

  it('should render custom ghost cell template', async () => {
    fixture.detectChanges();
    const ghostCells = await loaderHarness.getGhostCellContent(0);
    expect(ghostCells).toBe('custom ghost cell');
  });
});
