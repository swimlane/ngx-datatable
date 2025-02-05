import { ChangeDetectionStrategy, Component, Input, numberAttribute } from '@angular/core';
import { TableColumn } from '../../../types/table-column.type';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: `ghost-loader`,
  templateUrl: `./ghost-loader.component.html`,
  styleUrls: [`./ghost-loader.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet]
})
export class DataTableGhostLoaderComponent {
  @Input() columns: TableColumn[];
  @Input({ transform: numberAttribute }) pageSize: number;
  @Input() rowHeight: number | 'auto' | ((row?: any) => number);
  @Input({ transform: numberAttribute }) ghostBodyHeight: number;
}
