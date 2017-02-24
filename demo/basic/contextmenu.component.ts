import { Component } from '@angular/core';

@Component({
  selector: 'contextmenu-demo',
  template: `
    <div>
      <h3>
        Context Menu Event
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/basic/contextmenu.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <div class="info">
        <p><strong>Note:</strong> angular2-data-table does not provide a context menu feature.
        This demonstrates how you would access the <code>contextmenu</code> event
        to display your own custom context menu.</p>
        <p *ngIf="rawEvent"><strong>Mouse position:</strong> <code>(x: {{rawEvent?.x}}, y: {{rawEvent?.y}})</code></p>
        <p *ngIf="contextmenuRow"><strong>Row:</strong> {{contextmenuRow?.name}}</p>
        <p *ngIf="contextmenuColumn"><strong>Header:</strong>
          name: {{contextmenuColumn?.name}}
          prop: {{contextmenuColumn?.prop}}
        </p>
      </div>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        (tableContextmenu)="onTableContextMenu($event)">
      </ngx-datatable>
    </div>
  `
})
export class ContextMenuDemoComponent {

  rows = [];

  columns = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  rawEvent: MouseEvent;
  contextmenuRow: any;
  contextmenuColumn: any;

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  onTableContextMenu(contextMenuEvent) {
    console.log(contextMenuEvent);

    this.rawEvent = contextMenuEvent.event;
    if (contextMenuEvent.type == 'body') {
      this.contextmenuRow = contextMenuEvent.content;
      this.contextmenuColumn = undefined;
    } else {
      this.contextmenuColumn = contextMenuEvent.content;
      this.contextmenuRow = undefined;
    }

    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();
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
