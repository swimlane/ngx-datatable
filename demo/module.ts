import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxDatatableModule } from '../src';
import { AppComponent } from './app.component';

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
import { RxDemoComponent } from './basic/rx';
import { ContextMenuDemoComponent } from './basic/contextmenu';

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
import { MultiDisableSelectionComponent } from './selection/selection-disabled';
import { CheckboxSelectionComponent } from './selection/selection-chkbox';
import { MultiClickSelectionComponent } from './selection/selection-multi-click';

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
    MultiDisableSelectionComponent,
    RxDemoComponent,
    ContextMenuDemoComponent,
    CheckboxSelectionComponent,
    MultiClickSelectionComponent
  ],
  imports: [BrowserModule, NgxDatatableModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
