import { Component, signal, ViewEncapsulation } from '@angular/core';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import packageInfo from 'projects/swimlane/ngx-datatable/package.json';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss',
    '../../projects/swimlane/ngx-datatable/src/lib/themes/material.scss',
    '../../projects/swimlane/ngx-datatable/src/lib/themes/dark.scss',
    '../../projects/swimlane/ngx-datatable/src/lib/themes/bootstrap.scss'
  ],
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  standalone: false
})
export class AppComponent {
  version = packageInfo.version;

  dark = signal(false);

  routeActivate(outlet: RouterOutlet): void {
    this.dark.set(outlet.activatedRoute.snapshot.data.dark);
  }
}
