import { Component, ViewEncapsulation } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, Location } from '@angular/common';
import packageInfo from 'projects/stas-kh/ngx-datatable-with-ie-fix/package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss',
    '../../projects/stas-kh/ngx-datatable-with-ie-fix/src/lib/themes/material.scss',
    '../../projects/stas-kh/ngx-datatable-with-ie-fix/src/lib/themes/dark.scss',
    '../../projects/stas-kh/ngx-datatable-with-ie-fix/src/lib/themes/bootstrap.scss'
  ],
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
})
export class AppComponent {
  state: any;

  version = packageInfo.version;

  constructor(location: Location) {
    this.state = location.path(true);
  }
}
