import { Component } from '@angular/core';

@Component({
    selector: 'material-tabs-demo',
    template: `<div>
        <h3>
            Datatable inside Material Tabs
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/material/material-tabs.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
        <mat-tab-group>
                   <mat-tab label="Flex">
                       <column-flex-demo></column-flex-demo>
                   </mat-tab>
                   <mat-tab label="Force">
                       <column-force-demo></column-force-demo>
                   </mat-tab>
                   <mat-tab label="Standard">
                       <column-standard-demo></column-standard-demo>
                   </mat-tab>
        </mat-tab-group>
    </div>`,
})
export class MaterialTabsComponent {

}
