import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute
} from '@angular/core';

import { TableColumnInternal } from '../../../types/internal.types';

@Component({
  selector: 'ghost-loader',
  imports: [NgTemplateOutlet],
  templateUrl: './ghost-loader.component.html',
  styleUrl: './ghost-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableGhostLoaderComponent {
  @Input() columns!: TableColumnInternal[];
  @Input({ transform: numberAttribute }) pageSize!: number;
  @Input() rowHeight!: number | 'auto' | ((row?: any) => number);
  @Input({ transform: numberAttribute }) ghostBodyHeight?: number;
  @Input({ transform: booleanAttribute }) cellMode = false;
}
