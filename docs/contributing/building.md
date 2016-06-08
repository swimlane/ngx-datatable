# Building

This project uses [npm tasks](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) for builds.

```json
"check-updates": "npm-check --skip-unused",
"clean": "npm run clean:dist && npm run clean:release",
"clean:dist": "rimraf dist",
"clean:release": "rimraf release",
"build": "npm run clean && concurrently \"npm run build:ts\" \"npm run build:sass\"",
"build:ts": "tsc -p configs/tsconfig.json",
"build:sass": "node-sass -o dist/ src/",
"build:css": "postcss --use autoprefixer dist/*.css -d dist/",
"build:bundle": "concurrently \"npm run build:bundle-ng\" \"npm run build:bundle-core\" \"npm run build:bundle-rx\"",
"build:bundle-ng": "jspm bundle @angular/platform-browser-dynamic dist/bundle-ng.js",
"build:bundle-rx": "jspm bundle rxjs dist/bundle-rx.js",
"watch": "npm run clean:dist && concurrently \"npm run watch:ts\" \"npm run watch:sass\"",
"watch:ts": "tsc --watch -p configs/tsconfig.json",
"watch:sass": "npm run build:sass && node-sass -o dist/ -w src/",
"start": "concurrently \"npm run build:bundle\" \"npm run watch\" \"npm run start:server\"",
"start:server": "lite-server -c bs-config.js",
"release": "NODE_ENV=production npm run clean && concurrently \"npm run release:build\" \"npm run release:css\" && npm run release:minify",
"release:css": "node-sass -o release/ src/themes && node-sass -o release/ src/components",
"release:minify": "uglifyjs release/angular2-data-table.js --source-map release/angular2-data-table.min.js.map --source-map-url release/angular2-data-table.js.map --compress --mangle --screw-ie8 --output release/angular2-data-table.min.js",
"release:build": " npm run release:build:ts && npm run release:build:bundle",
"release:build:ts": "tsc -p configs/tsconfig-prod.json",
"release:build:bundle": "jspm build dist/main.js - npm:@angular/platform-browser-dynamic@2.0.0-rc.1 - npm:rxjs@5.0.0-beta.6 release/angular2-data-table.js",
"release:build:umd": "jspm build dist/main.js - npm:@angular/platform-browser-dynamic@2.0.0-rc.1 - npm:rxjs@5.0.0-beta.6 release/angular2-data-table.js --format umd --global-name angular2DataTable --global-deps \"{'rxjs/Rx.js': 'Rxjs/Rx.js', '@angular/core/index.js': '@angular/core/index.js'}\""
```