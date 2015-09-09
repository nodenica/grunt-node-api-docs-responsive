/*
 * grunt-iojs-api-docs
 * https://github.com/nodenica/grunt-iojs-api-docs.git
 *
 * Copyright (c) 2015 Paulo McNally <paulomcnally@gmail.com>
 * Licensed under the MIT license.
 */

'use strict';

var request = require('request');
var path = require('path');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('docs', 'Generate HTML files from node.js API Docs', function () {
    var done = this.async();
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      version: '',
      dest: './dest/',
      assets: '/assets'
    });

    // check if version is empty
    if (options.version === '') {
      grunt.log.warn('A version is required');
      return false;
    }

    // check if is a valid version format
    if (!/^[0-9]{1,}\.[0-9]{1,}\.[0-9]{1,}$/.test(options.version)) {
      grunt.log.warn('Invalid version format. Format: 0.0.0');
      return false;
    }

    // create directories
    grunt.file.mkdir(options.dest);
    grunt.file.mkdir(options.dest + options.version);
    grunt.file.mkdir(options.dest + options.version + options.assets);

    // set base url
    var urlBase = 'https://nodejs.org/download/release/v' + options.version + '/docs/api/';

    // call json file content
    request(urlBase + 'index.json', function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var json = JSON.parse(body);
        var list = [
          {
            name: 'index',
            title: 'node.js v' + options.version + ' Documentation',
            url: urlBase + 'index.html'
          }
        ];

        var assetsList = [
          {
            url: urlBase + 'assets/style.css'
          },
          {
            url: urlBase + 'assets/sh.css'
          },
          {
            url: urlBase + 'assets/sh_main.js'
          },
          {
            url: urlBase + 'assets/sh_javascript.min.js'
          }
        ];

        // filter only rows with file name
        json.desc.forEach(function(obj) {
          if (obj.type === 'text') {
            var name = obj.text.replace(/^\[.*\]\((.*)\.html\)$/, '$1');
            var title = obj.text.replace(/^\[(.*)\].*/, '$1');
            var url = urlBase + name + '.html';
            var itemObj = {
              name: name,
              title: title,
              url: url
            };
            list.push(itemObj);
          }
        });


        // added assets

        // last position to list
        var lastIndex = list.length - 1;

        // download assets
        assetsList.forEach(function(file) {
          request(file.url, function(error, response, body) {
            if (!error && response.statusCode === 200) {
              grunt.file.write(
                options.dest +
                options.version +
                options.assets +
                '/' +
                path.basename(file.url),
              body,
              {encoding: 'utf8'});
            }
          });
        });

        // download pages
        list.forEach(function(file) {
          // write html file
          request(file.url, function(error, response, body) {
            if (!error && response.statusCode === 200) {
              grunt.file.write(options.dest + options.version + '/' + file.name + '.html',
              body,
              {encoding: 'utf8'});
              grunt.log.writeln(file.name + ' Done!');
              if (list[lastIndex].name === file.name) {
                done();
              }
            }
          });
        });
      }
    });

  });

};
