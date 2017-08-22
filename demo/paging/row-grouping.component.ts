import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'row-grouping-demo',
  template: `
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
        [rowHeight]="40"
        [customGroupStyle]="{'border-bottom': '1px solid black'}"

        [limit]="4">

        <ngx-datatable-column name="Exp. Pay." prop="" editable="true" frozenLeft="True">
          <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row" let-group="group">
              <input type="checkbox" id="ep1{{rowIndex}}" name="{{rowIndex}}" value="0" class="expectedpayment" (change)="checkGroup($event, row, rowIndex, group)" [checked]="row.exppayyes===1">
              <label for="ep1{{rowIndex}}"></label>
              <input type="checkbox" id="ep2{{rowIndex}}" name="{{rowIndex}}" value="1" class="expectedpayment2" (change)="checkGroup($event, row, rowIndex, group)" [checked]="row.exppayno===1">
              <label for="ep2{{rowIndex}}"></label>
              <input type="checkbox" id="ep3{{rowIndex}}" name="{{rowIndex}}" value="2" class="expectedpayment3" (change)="checkGroup($event, row, rowIndex, group)" [checked]="row.exppaypending===1">
              <label for="ep3{{rowIndex}}"></label>
          </ng-template>                    
        </ngx-datatable-column>

        <ngx-datatable-column name="Source" prop="source" editable="false" frozenLeft="True"></ngx-datatable-column>
        <ngx-datatable-column name="Name" prop="name" editable="true"></ngx-datatable-column>
        <ngx-datatable-column name="Gender" prop="gender"></ngx-datatable-column>
        <ngx-datatable-column name="Age" prop="age"></ngx-datatable-column>
        <ngx-datatable-column name="Comment" prop="comment">
          <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row" let-group="group" let-rowHeight="rowHeight">           
            <input autofocus
              (blur)="updateValue($event, 'comment', rowIndex)"
              type="text" 
              name="comment" 
              [value]="value"/>
          </ng-template>                
        </ngx-datatable-column>
        <ngx-datatable-column name="Group Comment" prop="groupcomment" isGroup="true">
          <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row" let-group="group" let-rowHeight="rowHeight">           
            <textarea 
              autofocus
              [ngStyle]="getGroupRowHeight(group, rowHeight)"
              (blur)="updateValue($event, 'groupcomment', rowIndex)"
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

        <ngx-datatable-column name="" prop="" isGroup="true" width="50">
          <ng-template ngx-datatable-cell-template let-row="row" let-group="group">
            <input type="button" name="Save" value="Save">
          </ng-template>
        </ngx-datatable-column>        

      </ngx-datatable>
    </div>
  `
})
export class RowGroupingComponent {

  /*

              *ngIf="editing[rowIndex + '-groupcomment']" 

 <span
              title="Double click to edit"
              (dblclick)="editing[rowIndex + '-groupcomment'] = true"
              *ngIf="!editing[rowIndex + '-groupcomment']">
              {{value}}
            </span>
*/

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

  getGroupRowHeight(group, rowHeight){
    var style={};

    style = {
              height: (group.length*40) + 'px',
              width: '100%'}

    return style;
  }

  checkGroup(event, row, rowIndex, group){

      console.log('row', row)
      console.log('group', group)
      console.log('rowIndex', rowIndex)

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

    //console.log('group.length', group.length);

    if (group.length===2){ //There are only 2 lines in a group
      if (["Calculated", "Funder"].indexOf(group[0].source)>-1 && ["Calculated", "Funder"].indexOf(group[1].source)>-1){ //Sources are funder and calculated
        if (group[0].startdate === group[1].startdate && group[0].enddate === group[1].enddate){ //Start dates and end dates match
          for (var index = 0; index < group.length; index++) {
            if (group[index].source != row.source)
            {
              if (event.target.value==='0'){ //expected payment yes selected
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
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

}
