import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TableColumnInternal } from '../../../types/internal.types';

@Component({
  selector: `ghost-loader`,
  templateUrl: `./ghost-loader.component.html`,
  styleUrls: [`./ghost-loader.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet]
})
export class DataTableGhostLoaderComponent {
  @Input() columns!: TableColumnInternal[];
  @Input({ transform: numberAttribute }) pageSize!: number;
  @Input() rowHeight!: number | 'auto' | ((row?: any) => number);
  @Input({ transform: numberAttribute }) ghostBodyHeight?: number;
  @Input({ transform: booleanAttribute }) cellMode = false;
}
