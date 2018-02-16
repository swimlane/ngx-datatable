const testWebpackConfig = require('./webpack.test');
process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports =  function(config) {
  var configuration = {
    basePath: '',
    singleRun: true,
    frameworks: ['jasmine'],
    exclude: [],
    files: [ 
      { pattern: './config/spec-bundle.js', watched: false } 
    ],
    preprocessors: { 
      './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] 
    },
    webpack: testWebpackConfig({ env: 'test' }),
    webpackMiddleware: { stats: 'errors-only'},
    reporters: [ 'mocha', 'coverage', 'remap-coverage' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      },
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html',
      lcovonly: './coverage/lcov.info'
    }
  };

  if (process.env.TRAVIS){
    configuration.browsers = [
      'ChromeTravisCi'
    ];
  }

  config.set(configuration);
};
