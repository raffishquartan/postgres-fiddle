'use strict';

var exec = require('child_process').exec;

module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    // Configuration files and variables
    pkg: grunt.file.readJSON('package.json'),
    time: grunt.template.today("yyyymmdd-HHMM"),
    today: grunt.template.today('yyyy-mm-dd'),
    year: grunt.template.today('yyyy'),

    // Plugin tasks
    clean: {
      all: {
        src: ['build', '**/*~', '**/.*~', '.grunt', 'src/logs']
      }
    },

    // TODO Update jshint options to match code directory structure
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
          reporter: 'spec',
          clearRequireCache: true
        },
        src: [
          './**/*_utest.js',
          '!./build/**/*.js'
        ]
      },
      integration: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: [
          './**/*_itest.js',
          '!./build/**/*.js'
        ]
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
          src: ['build/out/**/*.js']
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
          src: ['build/out/**/*.css']
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
          src: ['build/out/**/*.html']
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
          src: ['build/out/**/*.sh']
        }
      }
    },

    // TODO? Needed for version_file
    'git-describe': {
      'options': {
        'failOnError': true
      },
      'main': {}
    },

    version_file: {
      main: {
        options: {
          out: 'build/out/postgres-fiddle/version.json',
          generator_list: ['datestring', 'npm_version', 'git_describe'],
          generator_dir: 'generators'
        }
      }
    },

    exec: {
      mkdir: {
        command: 'mkdir -p build/out/postgres-fiddle/logs build/dist'
      },
      copy: {
        command: 'cp -r src/* build/out/postgres-fiddle'
      },
      compress: {
        cwd: 'build/out',
        command: 'tar czf ../dist/postgres-fiddle.tar.gz-<%= pkg.version %>-<%= time %>.tar.gz postgres-fiddle'
      }
    }
  });

  grunt.registerTask('assemble', ['exec:mkdir', 'exec:copy']);
  grunt.registerTask('metadata', ['usebanner', 'version_file']);
  grunt.registerTask('test', ['jshint', 'mochaTest', 'git-is-clean']);

  grunt.registerTask('build', ['test', 'clean', 'assemble', 'metadata', 'exec:compress'])
};
