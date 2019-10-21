module.exports = function(config) {
  config.set({
    frameworks: ['qunit'],
    basePath: '.',
    files: [
      '../index.js',
      '../tests/tests.js'
    ],
    singleRun: false,
  });
};
