/*
 * grunt-node-api-docs-responsive
 *
 *
 * Copyright (c) 2014 Paulo McNally
 * Licensed under the MIT license.
 */

'use strict';
var request = require('request');
var marked = require('marked');
var util = require('util');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('docs',
  'Generate responsive HTML files from NodeJS API Docs', function () {
    var done = this.async();
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      version: '',
      dest: './dest/',
      template: {
        src: './template/',
        index: 'index.html',
        header: 'header.html',
        footer: 'footer.html'
      }
    });

    grunt.file.mkdir(options.dest);
    grunt.file.mkdir(options.dest + options.version);

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

    // read template files
    var htmlHeader = grunt.file.read(options.template.src +
      options.template.header, {encoding: 'utf8'});
    var htmlFooter = grunt.file.read(options.template.src +
      options.template.footer, {encoding: 'utf8'});
    var htmlIndex = grunt.file.read(options.template.src +
      options.template.index, {encoding: 'utf8'});

    // check if header is empty
    if (htmlHeader === '') {
      grunt.log.warn('Error loading header file');
      return false;
    }

    // check if footer is empty
    if (htmlHeader === '') {
      grunt.log.warn('Error loading header file');
      return false;
    }

    // build file html content
    var buildHtml = function(title, markdown) {
      var header = util.format(htmlHeader, title);
      return header + marked(markdown) + htmlFooter;
    };

    // build index.html file
    var buildIndexHtml = function(files) {
      var lines = '';
      files.forEach(function(file) {
        lines = lines +
          util.format('<a href="%s.html" class="list-group-item">%s</a>',
            file.name, file.title);
      });
      grunt.file.write(options.dest + options.version + '/index.html',
        util.format(htmlIndex, options.version, lines),
        {encoding: 'utf8'});
      grunt.log.writeln('Index Done!');
    };

    // set base url
    var urlBase = 'http://nodejs.org/dist/v' + options.version + '/docs/api/';

    // call json file content
    request(urlBase + 'index.json', function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var json = JSON.parse(body);
        var list = [];

        // filter only rows with file name
        json.desc.forEach(function(obj) {
          if (obj.type === 'text') {
            var name = obj.text.replace(/^\[.*\]\((.*)\.html\)$/, '$1');
            var title = obj.text.replace(/^\[(.*)\].*/, '$1');
            var url = 'https://raw.githubusercontent.com/joyent/node/v' +
              options.version + '-release/doc/api/' + name + '.markdown';
            var itemObj = {
              name: name,
              title: title,
              url: url
            };
            list.push(itemObj);
          }
        });

        // last position to list
        var lastIndex = list.length - 1;

        list.forEach(function(file) {
          // write html file
          request(file.url, function(error, response, body) {
            if (!error && response.statusCode === 200) {
              grunt.file.write(options.dest + options.version + '/' + file.name + '.html',
                buildHtml(file.title, body),
                {encoding: 'utf8'});
              grunt.log.writeln(file.name + ' Done!');
              if (list[lastIndex].name === file.name) {
                buildIndexHtml(list);
                done();
              }
            }
          });
        });
      }
    });
  });

};
