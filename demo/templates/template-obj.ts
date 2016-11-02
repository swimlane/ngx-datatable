import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'template-ref-demo',
  template: `
    <div>
      <h3>TemplateRef via Column Property</h3>
      <datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'">
      </datatable>

      <template #hdrTpl let-column="column" >
        <strong>Fancy</strong>: {{column.name}} !!
      </template>

      <template #editTmpl let-row="row" let-value="value" let-i="index">
        <img
          *ngIf="value === 'male'"
          width="150"
          src="https://media.giphy.com/media/I8nepxWwlEuqI/giphy.gif"
        />
        <img
          *ngIf="value === 'female'"
          width="150"
          src="https://media.giphy.com/media/sxSVG3XHf7yww/giphy.gif"
        />
      </template>
    </div>
  `
})
export class TemplateRefTemplatesComponent {

  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @ViewChild('hdrTpl') hdrTpl: TemplateRef<any>;

  rows = [];
  columns = [];

  constructor() {
    this.fetch((data) => {
      this.rows = data.splice(0, 5);
    });
  }

  ngOnInit() {
    this.columns = [{
      cellTemplate: this.editTmpl,
      headerTemplate: this.hdrTpl,
      name: 'Gender'
    }];
  }

  fetch(cb) {
    let req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
