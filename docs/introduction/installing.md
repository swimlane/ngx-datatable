# Installing

You can grab the latest release from the [Releases Page](https://github.com/swimlane/angular2-data-table/releases) in Github or via NPM.

* `npm install angular2-data-table`

Also, the release code is checked in and resides [here](https://github.com/swimlane/angular2-data-table/tree/master/release).

### Module Versions
We don't discriminate against module loaders and package in `UMD`, `ES6` and `CJS`.

- `release/angular2-data-table.js` - Multi-file ES5 Build
- `release/angular2-data-table.umd.js` - UMD Version
- `release/angular2-data-table.umd.min.js` - UMD Version Minified
- `release/angular2-data-table.cjs.js` - CommonJS Version
- `release/angular2-data-table.es.js` - ES6 Version

### CSS
Additionally you will need to include `./release/datatable.css`.

If you want to use material theme, include `./release/material.css`. For more information, visit the 'Themes' section.


### Integration with angular-cli
NOTE: These docs are for the pre-webpack angular-cli version. Stay tuned in for a guide for the new version.


#### 1. Install angular2-data-table via npm

```bash
npm i angular2-data-table --S
```

#### 2. Add `angular2-data-table.js` to `angular-cli-build.js` file to vendorNpmFiles array

After setup the `angular-cli-build.js` should look like this:

```js
var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
        // ...
        'angular2-data-table/**/*.js',
    ]
  });
};
```
After updating this file, make a fresh build to update the `dist` folder according to the new settings.
```bash
ng build
```

#### 3. Configure SystemJS mappings to know where to look for the table

SystemJS configuration is located in `system-config.ts` and after the custom configuration is done the related section should look like:


```javascript
/** Map relative paths to URLs. */
const map: any = {
  'angular2-data-table': 'vendor/angular2-data-table/release',
};

/** User packages configuration. */
const packages: any = {
   'vendor/angular2-data-table/release': {
      defaultExtension: 'js',
      main: 'angular2-data-table.js'
  }
};
```

#### 4. Edit the `tsconfig.json` configuration in `node_modules/angular2-data-table/tsconfig.json`

```
{
 "compilerOptions": {
 ...

 "lib":["es6","dom"],
    "types": [
      "node"
    ]
 }
```

#### 5. Export the interface IntersectionObserver from `node_modules/angular2-data-table/release/angular2-data-table.js`

```ts
export interface IntersectionObserver {
  root: HTMLElement;
  rootMargin: string;
  thresholds: Array<number>;
  disconnect: Function;
  observe: Function;
  takeRecords: Function;
  unobserve: Function;
}
```

Congratulations, you now have `angular2-data-table`  available to use in your project.

## Developing
If you are wanting to run the demos locally, just do:

- `npm i`
- `npm start`
- Browse to `http://localhost:9999`
