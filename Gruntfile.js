'use strict';

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
        ]
      },
      integration: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: [
          './**/*_itest.js',
        ]
      }
    },

    // POTENTIAL ISSUE: Does grunt-contrib-copy/tasks/copy.js use mode or just default it to false?
    copy: {
      build: {
        cwd: 'src',
        src: ['**'],
        dest: 'build/out',
        expand: true,
        mode: true
      }
    },

    mkdir: {
      build: {
        options: {
          create: ['build/out/server/logs']
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

    'git-describe': {
      'options': {
        'failOnError': true
      },
      'main': {}
    },

    compress: {
      main: {
        options: {
          archive: 'build/dist/postgres-fiddle-<%= pkg.version %>-<%= time %>.tar.gz',
          mode: 'tgz',
          pretty: true
        },
        files: [{
          cwd: 'build/out',
          expand: true,
          src: ['**'],
          dest: 'postgres-fiddle/'
        }]
      }
    },

    version_file: {
      main: {
        options: {
          out: 'build/out/version.json',
          generator_list: ['datestring', 'npm_version', 'git_describe'],
          generator_dir: 'generators'
        }
      }
    }
  });

  grunt.registerTask('assemble', ['copy', 'mkdir']);
  grunt.registerTask('metadata', ['usebanner', 'version_file']);
  grunt.registerTask('test', ['jshint', 'mochaTest']);

  grunt.registerTask('build', ['clean', 'assemble', 'metadata', 'compress', 'test']);
  grunt.registerTask('quick', ['clean', 'assemble', 'test']);

  // Running test before compress does not work - why?
  grunt.registerTask('broken_build', ['clean', 'assemble', 'test', 'compress'])
};
