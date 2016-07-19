# Installing

You can grab the latest release from the [Releases Page](https://github.com/swimlane/angular2-data-table/releases) in Github, npm or jspm.

* `npm install angular2-data-table`
* `jspm install github:swimlane/angular2-data-table`

Also, the release code is checked in and resides [here](https://github.com/swimlane/angular2-data-table/tree/master/release).

### Module Versions
We don't discriminate module loaders and package in `UMD`, `ES6` and `CJS`.

- `release/angular2-data-table.js` - UMD Version
- `release/angular2-data-table.min.js` - UMD Version Minified
- `release/angular2-data-table.cjs.js` - CommonJS Version
- `release/angular2-data-table.es.js` - ES6 Version

### CSS
Additionally you will need to include `./release/datatable.css`.

If you want to use material theme, include `./release/material.css`. For more information, visit the 'Themes' section.

### Development
If you are wanting to run the demos or build locally, you will need to run `npm run install:global` to installed nesc dev deps.
