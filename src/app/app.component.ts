import { Component, signal } from '@angular/core';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import packageInfo from 'projects/swimlane/ngx-datatable/package.json';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  imports: [RouterLink, RouterOutlet]
})
export class AppComponent {
  version = packageInfo.version;

  dark = signal(false);

  routeActivate(outlet: RouterOutlet): void {
    this.dark.set(outlet.activatedRoute.snapshot.data.dark);
  }
}
