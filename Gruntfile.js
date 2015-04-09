'use strict';

var exec = require('child_process').exec;

module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    // Configuration files and variables
    build_name: '<%= pkg.name %>-<%= pkg.version %>-<%= time %>',
    pkg: grunt.file.readJSON('package.json'),
    time: grunt.template.today("yyyymmdd-HHMM"),
    today: grunt.template.today('yyyy-mm-dd'),
    year: grunt.template.today('yyyy'),

    // Plugin tasks
    clean: {
      all: {
        src: ['build', '**/*~', '**/.*~', '.grunt', 'src/logs', '**/*.pyc']
      }
    },

    jshint: {
      all: [
        'src/**/*.js',
        '!src/server/node_modules/**/*.js',
        '!src/client/bower_components/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    mochaTest: {
      unit: {
        options: {
          clearRequireCache: true,
          reporter: 'spec'
        },
        src: [
          './**/*_utest.js',
          '!./build/**/*.js'
        ]
      },
      integration: {
        options: {
          clearRequireCache: true,
          reporter: 'spec'
        },
        src: [
          './**/*_itest.js',
          '!./build/**/*.js'
        ]
      }
    },

    jasmine: {
      client: {
        src: [], // empty because files are sourced via requires
        options: {
          display: 'full', // default is 'full' but being explicit
          //keepRunner: true, // retains generated files in .grunt/grunt-contrib-jasmine, output in outfile location
          outfile: './src/client/jasmine_output.html',
          specs: './src/client/js/**/*_jtest.js',
          summary: true,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              baseUrl: './',
              shim: {
                backbone: {
                  deps: ['underscore', 'jquery'],
                  exports: 'Backbone'
                },
                marionette: {
                  deps: ['jquery', 'underscore', 'backbone'],
                  exports: 'Marionette'
                },
                underscore: {
                  exports: '_'
                }
              },
              paths: {
                backbone: 'bower_components/backbone/backbone',
                jquery: 'bower_components/jquery/dist/jquery',
                marionette: 'bower_components/marionette/lib/backbone.marionette',
                moment: 'bower_components/moment/min/moment-with-locales.min',
                underscore: 'bower_components/underscore/underscore'
              },
              urlArgs: 'bust=' + (new Date()).getTime() // no cache for testing / development only
            }
          }
        }
      }
    },

    usebanner: {
      js: {
        options: {
          banner: '/*\n' +
            ' * <%= pkg.name %> - v<%= pkg.version %> - <%= today %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * (C) 2015-<%= year %> <%= pkg.author.name %>\n' +
            ' */\n'
        },
        files: {
          src: ['build/out/**/*.js', '!build/out/**/node_modules/**', '!build/out/**/bower_components/**']
        }
      },
      css: {
        options: {
          banner: '/*\n' +
            ' * <%= pkg.name %> - v<%= pkg.version %> - <%= today %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * (C) 2015-<%= year %> <%= pkg.author.name %>\n' +
            ' */\n'
        },
        files: {
          src: ['build/out/**/*.css', '!build/out/**/node_modules/**', '!build/out/**/bower_components/**']
        }
      },
      html: {
        options: {
          banner: '<!--\n' +
            ' <%= pkg.name %> - v<%= pkg.version %> - <%= today %>\n' +
            ' <%= pkg.description %>\n' +
            ' (C) 2015-<%= year %> <%= pkg.author.name %>\n' +
            '-->\n'
        },
        files: {
          src: ['build/out/**/*.html', '!build/out/**/node_modules/**', '!build/out/**/bower_components/**']
        }
      },
      sh: {
        options: {
          banner: '#!/bin/bash\n' +
            '# <%= pkg.name %> - v<%= pkg.version %> - <%= today %>\n' +
            '# <%= pkg.description %>\n' +
            '# (C) 2015-<%= year %> <%= pkg.author.name %>\n'
        },
        files: {
          src: ['build/out/**/*.sh', '!build/out/**/node_modules/**', '!build/out/**/bower_components/**']
        }
      },
      py: {
        options: {
          banner: '#!/usr/bin/python\n' +
            '# <%= pkg.name %> - v<%= pkg.version %> - <%= today %>\n' +
            '# <%= pkg.description %>\n' +
            '# (C) 2015-<%= year %> <%= pkg.author.name %>\n'
        },
        files: {
          src: ['build/out/**/*.py', '!build/out/**/node_modules/**', '!build/out/**/bower_components/**']
        }
      }
    },

    version_file: {
      main: {
        options: {
          out: 'build/out/<%= build_name %>/version.json',
          generator_list: ['datestring', 'npm_version', 'git_describe'],
          generator_dir: 'generators'
        }
      }
    },

    exec: {
      compress: {
        cwd: 'build/out',
        command: 'tar czf ../dist/<%= build_name %>.tar.gz <%= build_name %>'
      },
      copy: {
        command: 'cp -r src/* build/out/<%= build_name %>'
      },
      mkdir: {
        command: 'mkdir -p build/out/<%= build_name %>/logs build/dist'
      },
    }
  });

  grunt.registerTask('assemble', ['exec:mkdir', 'exec:copy']);
  grunt.registerTask('metadata', ['usebanner', 'version_file']);
  grunt.registerTask('test', ['jshint', 'mochaTest', 'jasmine', 'git-is-clean']);
  grunt.registerTask('dirty_test', ['jshint', 'mochaTest', 'jasmine']);

  grunt.registerTask('build', ['test', 'clean', 'assemble', 'metadata', 'exec:compress']);
  grunt.registerTask('dirty_build', ['dirty_test', 'clean', 'assemble', 'metadata', 'exec:compress']);
};
