module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'src/**/*.ts'
    ],
    preprocessors: {
      'src/**/*.ts': ['karma-typescript']
    },
    reporters: ['progress'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json'
    }
  });
};