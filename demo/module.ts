import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { Angular2DataTableModule } from '../src';
import { AppComponent } from './app.component';
import '../src/components/datatable.scss';
import '../src/themes/material.scss';

// -- Basic
import { BasicFixedComponent } from './basic/basic-fixed';
import { BasicAutoComponent } from './basic/basic-auto';
import { VirtualScrollComponent } from './basic/virtual';
import { InlineEditComponent } from './basic/inline';
import { HorzVertScrolling } from './basic/scrolling';
import { MultipleTablesComponent } from './basic/multiple';
import { FullScreenComponent } from './basic/fullscreen';
import { RowDetailsComponent } from './basic/row-detail';
import { FilterBarComponent } from './basic/filter';
import { TabsDemoComponent } from './basic/tabs';
import { LiveDataComponent } from './basic/live';

// -- Paging
import { ClientPagingComponent } from './paging/paging-client';
import { ServerPagingComponent } from './paging/paging-server';

// -- Sorting
import { SortingComparatorComponent } from './sorting/sorting-comparator';
import { ServerSortingComponent } from './sorting/sorting-server';
import { ClientSortingComponent } from './sorting/sorting-client';

// -- Templates
import { InlineTemplatesComponent } from './templates/template-dom';
import { TemplateRefTemplatesComponent } from './templates/template-obj';

// -- Selection
import { CellSelectionComponent } from './selection/selection-cell';
import { MultiSelectionComponent } from './selection/selection-multi';
import { SingleSelectionComponent } from './selection/selection-single';
import { MultiShiftSelectionComponent } from './selection/selection-shift';
import { MultiDisableSelectionComponent } from './selection/selection-disabled';

// -- Columns
import { ColumnToggleComponent } from './columns/column-toggle';
import { ColumnStandardComponent } from './columns/column-standard';
import { ColumnForceComponent } from './columns/column-force';
import { ColumnFlexComponent } from './columns/column-flex';
import { ColumnPinningComponent } from './columns/pinning';

@NgModule({
  declarations: [
    AppComponent,
    BasicAutoComponent,
    BasicFixedComponent,
    FullScreenComponent,
    InlineEditComponent,
    VirtualScrollComponent,
    HorzVertScrolling,
    MultipleTablesComponent,
    RowDetailsComponent,
    ClientPagingComponent,
    ServerPagingComponent,
    ClientSortingComponent,
    ServerSortingComponent,
    SortingComparatorComponent,
    CellSelectionComponent,
    MultiSelectionComponent,
    InlineTemplatesComponent,
    TemplateRefTemplatesComponent,
    ColumnFlexComponent,
    ColumnToggleComponent,
    ColumnStandardComponent,
    ColumnForceComponent,
    ColumnPinningComponent,
    FilterBarComponent,
    TabsDemoComponent,
    SingleSelectionComponent,
    LiveDataComponent,
    MultiShiftSelectionComponent,
    MultiDisableSelectionComponent
  ],
  imports: [BrowserModule, Angular2DataTableModule],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private appRef: ApplicationRef) { }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    store.disposeOldHosts = createNewHosts(cmpLocation);
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
