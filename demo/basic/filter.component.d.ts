import { DatatableComponent } from '../../src/components/datatable.component';
export declare class FilterBarComponent {
    rows: any[];
    temp: any[];
    columns: ({
        prop: string;
        name?: undefined;
    } | {
        name: string;
        prop?: undefined;
    })[];
    table: DatatableComponent;
    constructor();
    fetch(cb: any): void;
    updateFilter(event: any): void;
}
