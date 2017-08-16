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
        [scrollbarH]="true"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'Auto'"
        [limit]="3">

        <ngx-datatable-column name="Exp. Pay." prop="" editable="true" frozenLeft="True">
          <ng-template ngx-datatable-cell-template let-value="value" let-row="row" let-group="group">
              <input type="checkbox" id="ep1{{row.$$index}}" name="{{row.$$index}}" value="0" class="expectedpayment" (change)="checkGroup($event, row, group)" [checked]="row.exppayyes===1">
              <label for="ep1{{row.$$index}}"></label>
              <input type="checkbox" id="ep2{{row.$$index}}" name="{{row.$$index}}" value="1" class="expectedpayment2" (change)="checkGroup($event, row, group)" [checked]="row.exppayno===1">
              <label for="ep2{{row.$$index}}"></label>
              <input type="checkbox" id="ep3{{row.$$index}}" name="{{row.$$index}}" value="2" class="expectedpayment3" (change)="checkGroup($event, row, group)" [checked]="row.exppaypending===1">
              <label for="ep3{{row.$$index}}"></label>
          </ng-template>                    
        </ngx-datatable-column>

        <ngx-datatable-column name="Source" prop="source" editable="false"></ngx-datatable-column>
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
        <ngx-datatable-column name="Group Status" prop="groupstatus" isGroup="true">
          <ng-template ngx-datatable-cell-template let-value="value" let-row="row" let-group="group">
            <span>
              {{value}}
            </span>          
          </ng-template>
        </ngx-datatable-column>

      </ngx-datatable>
    </div>
  `
})
export class RowGroupingComponent {

//[disabled]="exppay1Disable($event, )"

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

  funder = []
  calculated = []
  pending = []
  groups = []
  
  editing = {};  
  rows = [];

  //expectedPayment = {group: number, this.funder, this.calculated, this.pending};
  
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

  checkGroup(event, row, group){

      var groupStatus: string = "Pending";
      var expectedPaymentDealtWith:boolean = true;

      row.exppayyes=0
      row.exppayno=0
      row.exppaypending=0
        
      if (event.target.checked)
        if (event.target.value==0){ //expected payment yes selected
          row.exppayyes=1
        }
        else if (event.target.value==1){ //expected payment yes selected
          row.exppayno=1
        }
        else if (event.target.value==2){ //expected payment yes selected              
          row.exppaypending=1
        }


      //console.log('filtered', group.filter(row => row.source==='Calculated'))      

    //console.log('row exp pay 0', group[0].exppayyes, group[0].exppayno, group[0].exppaypending)
    //console.log('row exp pay 1', group[1].exppayyes, group[1].exppayno, group[1].exppaypending)

    if (group.length===2){ //There are only 2 lines in a group
      //console.log(["Calculated", "Funder"].indexOf(group[0].source))
      //console.log(["Calculated", "Funder"].indexOf(group[1].source))
      if (["Calculated", "Funder"].indexOf(group[0].source)>-1 && ["Calculated", "Funder"].indexOf(group[1].source)>-1){ //Sources are funder and calculated
        if (group[0].startdate === group[1].startdate && group[0].enddate === group[1].enddate){ //Start dates and end dates match
          for (var index = 0; index < group.length; index++) {
            if (group[index].$$index == row.$$index){
              console.log('here first');            
            }
            else{
              if (event.target.value==0){ //expected payment yes selected
                group[index].exppayyes=0;
                group[index].exppaypending=0;
                group[index].exppayno=1;
              }
            }

            if (group[index].exppayyes === 0 && group[index].exppayno === 0 && group[index].exppaypending === 0)
              expectedPaymentDealtWith = false;
            console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
          }
        }
      }
    }
    else{
      for (var index = 0; index < group.length; index++) {
        if (group[index].exppayyes === 0 && group[index].exppayno === 0 && group[index].exppaypending === 0)
          expectedPaymentDealtWith = false;
        console.log('expectedPaymentDealtWith', expectedPaymentDealtWith);
      }      
    }

    //check if there is a pending selected payment or a row that does not have any expected payment selected
    if (group.filter(row => row.exppaypending===1).length===0 && group.filter(row => row.exppaypending===0 && row.exppayyes===0 && row.exppayno===0).length===0)
    //if (expectedPaymentDealtWith)
    {
      console.log('expected payment dealt with')
      //check if can set the group status
      const numberOfExpPayYes = group.filter(row => row.exppayyes===1).length;
      const numberOfSourceFunder = group.filter(row => row.exppayyes===1 && row.source==='Funder').length;
      const numberOfSourceCalculated = group.filter(row => row.exppayyes===1 && row.source==='Calculated').length;
      const numberOfSourceManual = group.filter(row => row.exppayyes===1 && row.source==='Manual').length;

      console.log('numberOfExpPayYes', numberOfExpPayYes)
      console.log('numberOfSourceFunder', numberOfSourceFunder)
      console.log('numberOfSourceCalculated', numberOfSourceCalculated)
      console.log('numberOfSourceManual', numberOfSourceManual)

      if (numberOfExpPayYes>0)
        if (numberOfExpPayYes === numberOfSourceFunder)
          groupStatus = 'Funder Selected'
        else if (numberOfExpPayYes === numberOfSourceCalculated)
          groupStatus = 'Calculated Selected'
        else if (numberOfExpPayYes === numberOfSourceManual)
          groupStatus = 'Manual Selected'  
        else
          groupStatus = 'Hybrid Selected'
    }

    group[0].groupstatus = groupStatus;

    console.log('group', group);

  console.log('group.length', group.length)

  console.log('event.target.value', event.target.value)

    /*
    for (var index = 0; index < group.length; index++) {
      var element = group[index];
      
    }
    console.log('group.length', group.length)
    
    
    console.log('event.target.name', event.target.name)
    console.log('event.target.id', event.target.id)
    console.log('event.target.checked', event.target.checked)
    */
    
  }

  updateValue(event, cell, cellValue, row) {
    this.editing[row.$$index + '-' + cell] = false;
    this.rows[row.$$index][cell] = event.target.value;
  }

}
