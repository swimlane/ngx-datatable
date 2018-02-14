import { TableColumn } from '../types';
import { DataTableColumnDirective } from '../components/columns';
/**
 * Sets the column defaults
 */
export declare function setColumnDefaults(columns: TableColumn[]): void;
export declare function isNullOrUndefined<T>(value: T | null | undefined): value is null | undefined;
/**
 * Translates templates definitions to objects
 */
export declare function translateTemplates(templates: DataTableColumnDirective[]): any[];
