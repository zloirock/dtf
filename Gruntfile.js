module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-karma');
  return grunt.initConfig({
    karma: {
      unit: {
        configFile: './tests/karma.conf.js'
      },
      continuous: {
        configFile: './tests/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    }
  });
};