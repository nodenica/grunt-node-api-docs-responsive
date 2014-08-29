/*
 * grunt-node-api-docs-responsive
 *
 *
 * Copyright (c) 2014 Paulo McNally
 * Licensed under the MIT license.
 */
'use strict';
module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    docs: {
      'default_options': {
        options: {
          version: '0.10.31'
        }
      }
    }
  });
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  // By default, lint and run all tests.
  grunt.registerTask('default', ['docs']);
};
