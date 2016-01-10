# grunt-node-api-docs-responsive

Generate responsive HTML files from NodeJS API Docs

### Run

    $ npm install

    $ grunt

### Change NodeJS version

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
              version: '5.4.0' // change me
            }
          }
        }
      });
      // Actually load this plugin's task(s).
      grunt.loadTasks('tasks');
      // By default, lint and run all tests.
      grunt.registerTask('default', ['docs']);
    };
