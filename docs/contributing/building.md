# Building

This project uses [npm tasks](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) for builds.

### Pre-reqs
- Node >= 6.0.0
- Angular CLI
- TypeScript >= 2.0.0

### Commands
- `npm start`: Starts Webpack dev server
- `npm run release`: Builds code to `dist` folder
- `npm run test`: Runs E2E Tests
- `npm run package`: Runs builds, packages and copies results to `./release`

### Depedencies
- webpack (`npm install --global webpack`)
- webpack-dev-server (`npm install --global webpack-dev-server`)
- karma (`npm install --global karma-cli`)
- protractor (`npm install --global protractor`)
- typescript (`npm install --global typescript`)
