import { Component } from '@angular/core';

@Component({
  selector: 'row-grouping-demo',
  template: `
    <script>

    function checkGroupCheckBoxes(group) {
      var values = [];
      var vehicles = document.getElementByName(group);

      alert(vehicles.length)
      /*
      for (var i=0, iLen=vehicles.length; i<iLen; i++) {
        if (vehicles[i].checked) {
          values.push(vehicles[i].value);
        }
      }
      // Do something with values
      alert("Vehicles: " + values.join(', '));
      return values;
      */
    }

    </script>
    <div>
      <h3>
        Row Grouping
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/paging/paging-client.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [groupRowsBy]="'age'"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [limit]="3">

        <ngx-datatable-column name="Exp. Pay." prop="exppay" editable="true">
          <ng-template ngx-datatable-cell-template let-value="value" let-row="row" let-group="group">
              <input type="checkbox" id="ep1{{row.$$index}}" name="{{row.age}}[]" value="0" class="expectedpayment" (change)="checkGroup($event, group)" [checked]="value===0">
              <label for="ep1{{row.$$index}}"></label>
              <input type="checkbox" id="ep2{{row.$$index}}" name="expectedpayment2" value="1" class="expectedpayment2"  [checked]="value===1">
              <label for="ep2{{row.$$index}}"></label>
              <input type="checkbox" id="ep3{{row.$$index}}" name="expectedpayment3" value="2" class="expectedpayment3"  [checked]="value===2">
              <label for="ep3{{row.$$index}}"></label>
          </ng-template>                    
        </ngx-datatable-column>

        <ngx-datatable-column name="Name" prop="name" editable="true"></ngx-datatable-column>
        <ngx-datatable-column name="Gender" prop="gender"></ngx-datatable-column>
        <ngx-datatable-column name="Age" prop="age"></ngx-datatable-column>
        <ngx-datatable-column name="Comment" prop="comment"></ngx-datatable-column>
        <ngx-datatable-column name="Group Comment" prop="groupcomment" isGroup="true">
          <ng-template ngx-datatable-cell-template let-value="value" let-row="row">
            <span
              title="Double click to edit"
              (dblclick)="editing[row.$$index + '-groupcomment'] = true"
              *ngIf="!editing[row.$$index + '-groupcomment']">
              {{value}}
            </span>
            <textarea style="height: 100%; width: 100%"
              autofocus
              (blur)="updateValue($event, 'groupcomment', value, row)"
              *ngIf="editing[row.$$index + '-groupcomment']"
              [value]="value">
            </textarea>
          </ng-template>        
        </ngx-datatable-column>

      </ngx-datatable>
    </div>
  `
})
export class RowGroupingComponent {

/*
            <input
              autofocus
              (blur)="updateValue($event, 'groupcomment', value, row)"
              *ngIf="editing[row.$$index + '-groupcomment']"
              type="text"
              [value]="value"
            />
*/

//        [columns]="[{name:'Name'},{name:'Gender'},{name:'Age'},{name:'comment'},{name:'groupcomment'}]"

  editing = {};  
  rows = [];
  
  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/forRowGrouping.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  checkGroup(event, group){
    console.log('group.length', group.length)
    /*
    console.log('event.target.value', event.target.value)
    console.log('event.target.value', event.target.name)
    console.log('event.target.value', event.target.id)
    console.log('event.target.value', event.target.checked)
    */
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

}
