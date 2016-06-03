'use strict';
var fallback = require('connect-history-api-fallback');

module.exports = {
  logLevel: "warn",
  injectChanges: true,
  watchOptions: {
    ignored: ["node_modules", "jspm_packages"]
  },
  server: {
    middleware: [
      fallback({
        index: '/index.html',
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
      })
    ]
  }
};
