import { Component, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'column-async-pipe',
    template: `
    <div>
      <h3>
      Async Pipe
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/columns/column-force.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows"
        [columns]="columns"
        >
      </ngx-datatable>
    </div>
  `
})
export class ColumnAsyncPipeComponent {

    rows = [];

    columns: { prop: string, name: string, pipe?: PipeTransform }[] = [];

    constructor() {
        this.configureColumns();
        this.fetch((data) => {
            this.rows = data.splice(0, 5);
        });
    }

    configureColumns(): void {
        this.columns.push({
            prop: "name",
            name: "Name"
        });
        this.columns.push({
            prop: "gender",
            name: "Gender"
        });
        this.columns.push({
            prop: "age",
            name: "Age",
            pipe: {
                transform: this.asyncTransform
            }
        });
    }

    private asyncTransform(value: any, ...args: any[]): Observable<string> {
        let observable = new Observable<string>((observer) => {
            observer.next(value + " year old");
            observer.complete();
        });
        return observable;
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/company.json`);

        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
    }

}
