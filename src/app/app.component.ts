import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import packageInfo from 'projects/ngx-datatable/package.json';

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

  readonly dark = signal(false);

  routeActivate(outlet: RouterOutlet): void {
    this.dark.set(outlet.activatedRoute.snapshot.data.dark);
  }
}
