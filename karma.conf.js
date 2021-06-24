// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-junit-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false,
      jasmine: {
        random: false
      }
    },
    HeadlessChrome:{
      base: 'ChromeHeadless',
      flags: ['--no-sandbox']
    },
    remapIstanbulReporter: {
      dir : 'reports/test-results/coverage',
      reports: {
        html: 'coverage',
        lcovonly: 'reports/test-results/coverage/coverage.lcov'
      }
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'reports/coverage/app-base'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml','junit'],
    htmlReporter: {
      outputFile: 'reports/unit/units.html',

      // Optional 
      pageTitle: 'Vida - Tests Unitarios',
      subPageTitle: 'Presentacion HTML de los test unitarios',
      dir: 'reports/html/'
    },
    junitReporter: {
      outputDir: 'reports/unit',
      outputFile: 'test-results.xml',
      suite: '',
      useBrowserName: false
   },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
