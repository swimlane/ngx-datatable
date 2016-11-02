import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div>
      <nav>
        <h3>angular2-data-table</h3>
        <ul class="main-ul">
          <li>
            <h4>Basic</h4>
            <ul>
              <li><a href="#" (click)="setState('basic-auto')">Auto Height</a></li>
              <li><a href="#" (click)="setState('basic-fixed')">Fixed Height</a></li>
              <li><a href="#" (click)="setState('full-screen')">Full Screen</a></li>
              <li><a href="#" (click)="setState('inline-edit')">Inline Editing</a></li>
              <li><a href="#" (click)="setState('horz-vert-scrolling')">Horz/Vert Scrolling</a></li>
              <li><a href="#" (click)="setState('multiple-tables')">Multiple Instances</a></li>
              <li><a href="#" (click)="setState('row-details')">Row Detail</a></li>
            </ul>
          </li>
          <li>
            <h4>Paging</h4>
            <ul>
              <li><a href="#" (click)="setState('client-paging')">Client-side</a></li>
              <li><a href="#" (click)="setState('server-paging')">Server-side</a></li>
            </ul>
          </li>
          <li>
            <h4>Sorting</h4>
            <ul>
              <li><a href="#" (click)="setState('client-sorting')">Client-side</a></li>
              <li><a href="#" (click)="setState('server-sorting')">Server-side</a></li>
              <li><a href="#" (click)="setState('comparator-sorting')">Comparator</a></li>
            </ul>
          </li>
          <li>
            <h4>Selection</h4>
            <ul>
              <li><a href="#" (click)="setState('cell-selection')">Cell</a></li>
              <li><a href="#" (click)="setState('multiple-selection')">Multi</a></li>
            </ul>
          </li>
          <li>
            <h4>Templates</h4>
            <ul>
              <li><a href="#" (click)="setState('inline')">Inline</a></li>
              <li><a href="#" (click)="setState('templateref')">TemplateRef</a></li>
            </ul>
          </li>
          <li>
            <h4>Column</h4>
            <ul>
              <li><a href="#" (click)="setState('flex')">Flex</a></li>
              <li><a href="#" (click)="setState('toggle')">Toggling</a></li>
              <li><a href="#" (click)="setState('fixed')">Fixed</a></li>
              <li><a href="#" (click)="setState('force')">Force</a></li>
              <li><a href="#" (click)="setState('pinning')">Pinning</a></li>
            </ul>
          </li>
          <li><a href="https://swimlane.gitbooks.io/angular2-data-table/content/" target="_black">Documentation</a>
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

        <!-- Paging -->
        <client-paging-demo *ngIf="state === 'row-details'"></client-paging-demo>
        <server-paging-demo *ngIf="state === 'server-details'"></server-paging-demo>

        <!-- Sorting -->
        <client-sorting-demo *ngIf="state === 'client-sorting'"></client-sorting-demo>
        <client-sorting-demo *ngIf="state === 'server-sorting'"></client-sorting-demo>
        <comparator-sorting-demo *ngIf="state === 'comparator-sorting'"></comparator-sorting-demo>
        
        <!-- Selection -->
        <cell-selection-demo *ngIf="state === 'cell-selection'"></cell-selection-demo>
        <multi-selection-demo *ngIf="state === 'multi-selection'"></multi-selection-demo>

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

  state: string;

  setState(state) {
    this.state = state;
  }

}
