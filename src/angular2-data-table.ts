import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { DataTable } from './components/DataTable';
import { DataTableColumn } from './components/DataTableColumn';
import { DataTableHeader } from './components/header/Header';
import { DataTableBody } from './components/body/Body';
import { DataTableFooter } from './components/footer/Footer';
import { DataTableHeaderCell } from './components/header/HeaderCell';
import { DataTablePager } from './components/footer/Pager';
import { DataTableBodyRow } from './components/body/BodyRow';
import { ProgressBar } from './components/body/ProgressBar';
import { DataTableBodyCell } from './components/body/BodyCell';

// Services
import { StateService } from './services/State';

// Directives
import { Visibility } from './directives/Visibility';
import { LongPress } from './directives/LongPress';
import { Resizeable } from './directives/Resizeable';
import { Orderable } from './directives/Orderable';
import { Draggable } from './directives/Draggable';
import { Scroller } from './directives/Scroller';
import { TemplateWrapper } from './directives/TemplateWrapper';

// Model/Enums
import { ColumnMode } from 'enums/ColumnMode';
import { SortType } from 'enums/SortType';
import { SortDirection } from 'enums/SortDirection';
import { SelectionType } from 'enums/SelectionType';
import { TableOptions } from './models/TableOptions';
import { TableColumn } from './models/TableColumn';
import { Sort } from './models/Sort';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Visibility,
    DataTable,
    DataTableColumn,
    DataTableHeader,
    DataTableHeaderCell,
    Draggable,
    Resizeable,
    Orderable,
    LongPress,
    DataTableBody,
    DataTableFooter,
    DataTablePager,
    ProgressBar,
    DataTableBodyRow,
    DataTableBodyCell,
    Scroller,
    TemplateWrapper
  ],
  providers: [
    StateService
  ],
  exports: [
    DataTable,
    DataTableColumn
  ]
})
export class Angular2DataTableModule { }

export {
  TableOptions,
  TableColumn,
  Sort,
  SelectionType,
  ColumnMode,
  SortDirection,
  SortType
};
