import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import packageInfo from 'projects/swimlane/ngx-datatable/package.json';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
})
export class AppComponent {
  version = packageInfo.version;

  readonly dark = signal(false);

  routeActivate(outlet: RouterOutlet): void {
    this.dark.set(outlet.activatedRoute.snapshot.data.dark);
  }
}
