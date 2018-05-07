import { Observable } from 'rxjs';
export declare class RxDemoComponent {
    rows: Observable<any[]>;
    columns: {
        name: string;
    }[];
    constructor();
    fetch(cb: any): void;
}
