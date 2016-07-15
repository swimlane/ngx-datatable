'use strict';

module.exports = {
  logLevel: "warn",
  reloadDelay: 200, //browserify stream write time
  injectChanges: true,
  watchOptions: {
    ignored: ["node_modules"]
  }
};
