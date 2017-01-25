import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  styleUrls: ['../src/themes/material.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div>
      <nav>
        <h3>ngx-datatable <small>({{version}})</small></h3>
        <ul class="main-ul">
          <li>
            <h4>Documentation</h4>
            <ul>
              <li>
                <a href="https://swimlane.gitbooks.io/ngx-datatable/content/" target="_black">Online</a>
              </li>
              <li>
                <a href="https://www.gitbook.com/download/pdf/book/swimlane/ngx-datatable" target="_black">PDF</a>
              </li>
            </ul>
          </li>
          <li>
            <h4>Basic</h4>
            <ul>
              <li><a href="#" (click)="state=''">Auto Row Height</a></li>
              <li><a href="#" (click)="state='basic-fixed'">Fixed Row Height</a></li>
              <li><a href="#" (click)="state='virtual-scroll'">10k Rows</a></li>
              <li><a href="#" (click)="state='full-screen'">Full Screen</a></li>
              <li><a href="#" (click)="state='inline-edit'">Inline Editing</a></li>
              <li><a href="#" (click)="state='horz-vert-scrolling'">Horz/Vert Scrolling</a></li>
              <li><a href="#" (click)="state='multiple-tables'">Multiple Instances</a></li>
              <li><a href="#" (click)="state='row-details'">Row Detail</a></li>
              <li><a href="#" (click)="state='filter'">Filtering</a></li>
              <li><a href="#" (click)="state='hidden'">Hidden On Load</a></li>
              <li><a href="#" (click)="state='live'">Live Data</a></li>
              <li><a href="#" (click)="state='rx'">RxJS</a></li>
              <li><a href="#" (click)="state='contextmenu'">Context Menu</a></li>
            </ul>
          </li>
          <li>
            <h4>Paging</h4>
            <ul>
              <li><a href="#" (click)="state='client-paging'">Client-side</a></li>
              <li><a href="#" (click)="state='server-paging'">Server-side</a></li>
            </ul>
          </li>
          <li>
            <h4>Sorting</h4>
            <ul>
              <li><a href="#" (click)="state='client-sorting'">Client-side</a></li>
              <li><a href="#" (click)="state='server-sorting'">Server-side</a></li>
              <li><a href="#" (click)="state='comparator-sorting'">Comparator</a></li>
            </ul>
          </li>
          <li>
            <h4>Selection</h4>
            <ul>
              <li><a href="#" (click)="state='cell-selection'">Cell</a></li>
              <li><a href="#" (click)="state='single-selection'">Single Row</a></li>
              <li><a href="#" (click)="state='multi-selection'">Multi Row</a></li>
              <li><a href="#" (click)="state='multi-click-selection'">Multi Click Row</a></li>
              <li><a href="#" (click)="state='multidisable-selection'">Disable Callback</a></li>
              <li><a href="#" (click)="state='chkbox-selection'">Checkbox</a></li>
            </ul>
          </li>
          <li>
            <h4>Templates</h4>
            <ul>
              <li><a href="#" (click)="state='inline'">Inline</a></li>
              <li><a href="#" (click)="state='templateref'">TemplateRef</a></li>
            </ul>
          </li>
          <li>
            <h4>Column</h4>
            <ul>
              <li><a href="#" (click)="state='flex'">Flex</a></li>
              <li><a href="#" (click)="state='toggle'">Toggling</a></li>
              <li><a href="#" (click)="state='fixed'">Fixed</a></li>
              <li><a href="#" (click)="state='force'">Force</a></li>
              <li><a href="#" (click)="state='pinning'">Pinning</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <content>
        <!-- Basic -->
        <basic-auto-demo *ngIf="!state"></basic-auto-demo>
        <basic-fixed-demo *ngIf="state === 'basic-fixed'"></basic-fixed-demo>
        <full-screen-demo *ngIf="state === 'full-screen'"></full-screen-demo>
        <inline-edit-demo *ngIf="state === 'inline-edit'"></inline-edit-demo>
        <virtual-scroll-demo *ngIf="state === 'virtual-scroll'"></virtual-scroll-demo>
        <horz-vert-scrolling-demo *ngIf="state === 'horz-vert-scrolling'"></horz-vert-scrolling-demo>
        <multiple-tables-demo *ngIf="state === 'multiple-tables'"></multiple-tables-demo>
        <row-details-demo *ngIf="state === 'row-details'"></row-details-demo>
        <filter-demo *ngIf="state === 'filter'"></filter-demo>
        <tabs-demo *ngIf="state === 'hidden'"></tabs-demo>
        <live-data-demo *ngIf="state === 'live'"></live-data-demo>
        <rx-demo *ngIf="state === 'rx'"></rx-demo>
        <contextmenu-demo *ngIf="state === 'contextmenu'"></contextmenu-demo>

        <!-- Paging -->
        <client-paging-demo *ngIf="state === 'client-paging'"></client-paging-demo>
        <server-paging-demo *ngIf="state === 'server-paging'"></server-paging-demo>

        <!-- Sorting -->
        <client-sorting-demo *ngIf="state === 'client-sorting'"></client-sorting-demo>
        <server-sorting-demo *ngIf="state === 'server-sorting'"></server-sorting-demo>
        <comparator-sorting-demo *ngIf="state === 'comparator-sorting'"></comparator-sorting-demo>
        
        <!-- Selection -->
        <cell-selection-demo *ngIf="state === 'cell-selection'"></cell-selection-demo>
        <single-selection-demo *ngIf="state === 'single-selection'"></single-selection-demo>
        <multi-selection-demo *ngIf="state === 'multi-selection'"></multi-selection-demo>
        <multidisable-selection-demo *ngIf="state === 'multidisable-selection'"></multidisable-selection-demo>
        <chkbox-selection-demo *ngIf="state === 'chkbox-selection'"></chkbox-selection-demo>
        <multi-click-selection-demo *ngIf="state === 'multi-click-selection'"></multi-click-selection-demo>

        <!-- Templates -->
        <template-ref-demo *ngIf="state === 'templateref'"></template-ref-demo>
        <inline-templates-demo *ngIf="state === 'inline'"></inline-templates-demo>

        <!-- Columns -->
        <column-flex-demo *ngIf="state === 'flex'"></column-flex-demo>
        <column-toggle-demo *ngIf="state === 'toggle'"></column-toggle-demo>
        <column-standard-demo *ngIf="state === 'fixed'"></column-standard-demo>
        <column-force-demo *ngIf="state === 'force'"></column-force-demo>
        <column-pinning-demo *ngIf="state === 'pinning'"></column-pinning-demo>
      </content>
    </div>
  `
})
export class AppComponent {

  get state() {
    return window.state;
  }

  set state(state) {
    window.state = state;
  }

  version: string = APP_VERSION;

  constructor() {
    // this.state = 'chkbox-selection';
  }

}
