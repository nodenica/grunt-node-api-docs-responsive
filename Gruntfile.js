/*
* grunt-iojs-api-docs
* https://github.com/nodenica/grunt-iojs-api-docs.git
*
* Copyright (c) 2015 Paulo McNally <paulomcnally@gmail.com>
* Licensed under the MIT license.
*/

'use strict';

var version = '4.1.1';

module.exports = function(grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    docs: {
      'default_options': {
        options: {
          version: version,
          dest: './dest/'
        },

      }
    }
  });
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  // By default, lint and run all tests.
  grunt.registerTask('default', ['docs']);
};
