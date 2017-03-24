import { Observable } from 'rxjs/Rx';
export declare class RxDemoComponent {
    rows: Observable<any[]>;
    columns: {
        prop: string;
    }[];
    constructor();
    fetch(cb: any): void;
}
