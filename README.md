# angular2-data-table

`angular2-data-table` is a AngularJS directive for presenting large and complex data.  It has all the features you would expect from any other table but in a light package with _no external depedencies_. The table was designed to be extremely flexible and light; it doesn't make any assumptions about your data or how you: filter, sort or page it.

It was engineered from its conception to handle thousands of rows without sacrificing performance.  It was built for modern browsers using _TypeScript, CSS3 and HTML5_ and Angular `>=2.0.0-rc1`. This is the sister project of the [angular-data-table](https://github.com/swimlane/angular-data-table) that is designed for Angular 1.x.

## Features
- Light codebase / No external deps
- Column Reordering & Resizing
- Intelligent Column Width Algorithms ( Force fill / Flex-grow )
- Horizontal & Vertical Scrolling
- Integrated Pager
- Checkbox and Row Selection ( multi / single / keyboard / touch )
- Fixed AND Fluid height
- Decoupled theme'ing with included Google Material theme
- Client/Server Pagination & Sorting

## Roadmap
- Handle large data sets ( Virtual DOM )
- Virtual Paging
- Left and Right Column Pinning
- Decoupled Cell tooltips on overflow
- Decoupled Column Add/Removing Menu
- Expressive Syntax
- Rich header / column templates
- Tree Grids
- Row Grouping

## Tasks
This project uses [npm tasks](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) for builds.

```
  "check-updates": "npm-check --skip-unused",
  "clean": "rimraf dist",
  "build": "npm run clean && concurrently \"npm run build:ts\" \"npm run build:sass\"",
  "build:ts": "tsc",
  "build:sass": "node-sass -o dist/ src/",
  "build:css": "postcss --use autoprefixer dist/*.css -d dist/",
  "build:bundle": "concurrently \"npm run build:bundle-ng\" \"npm run build:bundle-core\" \"npm run build:bundle-rx\"",
  "build:bundle-ng": "jspm bundle @angular/platform-browser-dynamic dist/bundle-ng.js",
  "build:bundle-core": "jspm bundle core-js dist/bundle-core.js",
  "build:bundle-rx": "jspm bundle rxjs dist/bundle-rx.js",
  "build:release": "npm run build && jspm bundle dist/components/DataTable.js release/index.js",
  "watch": "npm run clean && concurrently \"npm run watch:ts\" \"npm run watch:sass\"",
  "watch:ts": "tsc --watch",
  "watch:sass": "npm run build:sass && node-sass -o dist/ -w src/",
  "start": "concurrently \"npm run build:bundle\" \"npm run watch\" \"npm run start:server\"",
  "start:server": "lite-server -c bs-config.js"
```

## Usage
```
  import { Component } from '@angular/core';
  import { DataTable } from 'angular2-data-table';

  @Component({
    selector: 'my-app',
    template: `
      <datatable
        [rows]="rows"
        [options]="options">
      </datatable>
    `,
    directives: [DataTable]
  })
  export class MyApp {
    options = {};
    rows = [];
  }
```

## Notable Angular2 Table Projects
- [ng2-table](https://github.com/valor-software/ng2-table)
- [angular2-datatable](https://github.com/mariuszfoltak/angular2-datatable)
- [sortable-table](https://github.com/FuelInteractive/fuel-ui)

## Credits
`angular2-data-table` is a [Swimlane](http://swimlane.com) open-source project; we believe in giving back to the open-source community by sharing some of the projects we build for our application. Swimlane is an automated cyber security operations and incident response platform that enables cyber security teams to leverage threat intelligence, speed up incident response and automate security operations.
