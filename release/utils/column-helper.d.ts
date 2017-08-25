import { TableColumn } from '../types';
import { DataTableColumnDirective } from '../components/columns';
/**
 * Sets the column defaults
 */
export declare function setColumnDefaults(columns: TableColumn[]): void;
/**
 * Translates templates definitions to objects
 */
export declare function translateTemplates(templates: DataTableColumnDirective[]): any[];
