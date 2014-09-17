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
          version: '0.10.32',
          dest: './dest/'
        },

      }
    },
    // copy files
    copy: {
      files: {
        cwd: './assets',  // set working folder / root to copy
        src: '**/*',           // copy all files and subfolders
        dest: './dest/assets',    // destination folder
        expand: true           // required when using cwd
      }
    }
  });
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // By default, lint and run all tests.
  grunt.registerTask('default',['docs', 'copy']);
};
