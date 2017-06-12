import { TableColumn } from '../types';
import { DataTableColumnDirective } from '../components/columns';
/**
 * Sets the column defaults
 *
 * @export
 * @param {any[]} columns
 * @returns
 */
export declare function setColumnDefaults(columns: TableColumn[]): void;
/**
 * Translates templates definitions to objects
 *
 * @export
 * @param {DataTableColumnDirective[]} templates
 * @returns {any[]}
 */
export declare function translateTemplates(templates: DataTableColumnDirective[]): any[];
