
import { EventEmitter } from '@angular/core';
import { TableOptions } from '../models/TableOptions';
import { TableColumn } from '../models/TableColumn';
export declare class StateService {
    private options;
    private rows;
    private selected;
    onSelectionChange: EventEmitter<any>;
    onRowsUpdate: EventEmitter<any>;
    onPageChange: EventEmitter<any>;
    private scrollbarWidth;
    private offsetX;
    private offsetY;
    private innerWidth;
    private bodyHeight;
    newInstance(): string;
    getScrollbarWidth(key: string): number;
    setScollbarWidth(key: string, value: any): this;
    getOffsetX(key: string): number;
    setOffsetX(key: string, value: any): this;
    getOffsetY(key: string): number;
    setOffsetY(key: string, value: any): this;
    getInnerWidth(key: string): number;
    setInnerWidth(key: string, value: any): this;
    getBodyHeight(key: string): number;
    setBodyHeight(key: string, value: any): this;
    columnsByPin(key: string): {
        left: any[];
        center: any[];
        right: any[];
    };
    columnGroupWidths(key: string): {
        left: number;
        center: number;
        right: number;
        total: number;
    };
    rowCount(key: string): any;
    getRows(key: any): any[];
    pageSize(key: string): any;
    indexes(key: string): {
        first: number;
        last: number;
    };
    setSelected(key: string, selected: any[]): this;
    getSelected(key: string): any[];
    setRows(key: string, rows: Array<any>): this;
    setOptions(key: string, options: TableOptions): this;
    addOption(key: string, option: any): this;
    getOption(key: string, option: any): any;
    updateOption(key: string, option: string, value: any): this;
    deleteOption(key: string, option: any): void;
    getOptions(key: string): TableOptions;
    setPage(key: string, {type, value}: {
        type: any;
        value: any;
    }): void;
    nextSort(key: string, column: TableColumn): void;
}
