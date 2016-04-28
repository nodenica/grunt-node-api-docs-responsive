/*
* grunt-iojs-api-docs
* https://github.com/nodenica/grunt-iojs-api-docs.git
*
* Copyright (c) 2015 Paulo McNally <paulomcnally@gmail.com>
* Licensed under the MIT license.
*/

'use strict';

var version = '6.0.0';

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
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            cwd: 'dest/' + version,
            src: [ '**' ],
            dest: '/home/polin/github/nodenica/node-documentation-android-pro/app/src/main/assets/en'
          },
          {
            expand: true,
            cwd: 'dest/' + version,
            src: [ '**' ],
            dest: '/home/polin/github/nodenica/node-documentation-android-free/app/src/main/assets/en'
          }
        ],
      },
    }
  });
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  // By default, lint and run all tests.
  grunt.registerTask('default', [
    'docs',
    'copy'
  ]);
};
