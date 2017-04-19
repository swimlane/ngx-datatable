import {
    Component, Input, PipeTransform, HostBinding, ElementRef
} from '@angular/core';

import { TableColumn } from '../../types/table-column.type';

@Component({
    selector: 'datatable-summary-row-cell',
    template: `
        <div class="datatable-summary-row-cell-label">
            <span [title]="title"
                  [innerHTML]="innerHtml">
            </span>
        </div>
    `,
    host: {
        class: 'datatable-summary-row-cell'
    }
})
export class DataTableSummaryRowCellComponent {
    @Input() row: any;
    @Input() column: TableColumn;
    @Input() rowHeight: number;

    @HostBinding('class')
    get columnCssClasses(): any {
        let cls = 'datatable-summary-row-cell';
        if(this.column.cellClass) {
            if(typeof this.column.cellClass === 'string') {
                cls += ' ' + this.column.cellClass;
            } else if(typeof this.column.cellClass === 'function') {
                const res = this.column.cellClass({
                    row: this.row,
                    column: this.column,
                    value: this.value
                });

                if(typeof res === 'string') {
                    cls += res;
                } else if(typeof res === 'object') {
                    const keys = Object.keys(res);
                    for(const k of keys) {
                        if(res[k] === true) cls += ` ${k}`;
                    }
                }
            }
        }
        return cls;
    }

    @HostBinding('style.width.px')
    get width(): number {
        return this.column.width;
    }

    @HostBinding('style.height')
    get height(): string|number {
        const height = this.rowHeight;
        if(isNaN(height)) return height;
        return height + 'px';
    }

    get title(): any {
        let title = '';
        const label = this.label;
        if(label !== '') {
            title += this.label + ' ';
        }

        title += this.value;

        return title;
    }

    get innerHtml(): any {
        let innerHtml = '';
        const label = this.label;
        if(label !== '') {
            innerHtml += '<span class="datatable-summary-row-cell-label-title">';
            innerHtml += this.label;
            innerHtml += '</span> ';
        }
        innerHtml += this.value;

        return innerHtml;
    }

    get label(): any {
        if (!this.row || !this.column) return '';
        const val = this.column.$$valueGetter(this.row, this.column.prop);

        if(val.label !== undefined && val.label !== '') {
            return val.label;
        }

        return '';
    }

    get value(): any {
        if (!this.row || !this.column) return '';
        let val = this.column.$$valueGetter(this.row, this.column.prop);
        const userPipe: PipeTransform = this.column.pipe;

        if(val.value !== undefined) {
            val = val.value;
        }

        if(userPipe) return userPipe.transform(val);
        if(val !== undefined) return val;
        return '';
    }

    element: any;

    constructor(element: ElementRef) {
        this.element = element.nativeElement;
    }
}
