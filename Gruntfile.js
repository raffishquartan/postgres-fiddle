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
                src: ['build', 'test/out', 'test/tmp', '**/*~', '**/.*~']
            }
        },

        // TODO Update jshint options to match code directory structure
        jshint: {
            all: [
                'src/**/*.js',
                '!src/server/node_modules/**/*.js',
                '!src/client/bower_components/**/*.js',
                '!src/client/node_modules/**/*.js',
                '!src/test/blanket.js'

            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

//        Stubbed out for now
//        mochaTest: {
//            test: {
//                options: {
//                    reporter: 'spec',
//                    clearRequireCache: true,
//                    require: 'test/blanket'
//                },
//                src: [
//                    'test/**/*.js',
//                    '!test/blanket.js',
//                    '!test/out/server/node_modules/**/*.js',
//                    '!test/out/client/bower_components/**/*.js'
//                ]
//            }
//        },

        // POTENTIAL ISSUE: Does grunt-contrib-copy/tasks/copy.js use mode or just default it to false?
        copy: {
            build: {
                cwd: 'src',
                src: ['**'],
                dest: 'build/out',
                expand: true,
                mode: true
            },
            test: {
                cwd: 'src',
                src: ['**'],
                dest: 'test/out',
                expand: true,
                mode: true
            }
        },

        mkdir: {
            build: {
                options: {
                    create: ['build/out/server/logs']
                }
            },
            test: {
                options: {
                    create: ['test/out/server/logs']
                }
            }
        },

        usebanner: {
            js: {
                options: {
                    banner: '/*\n' +
                        ' * <%= pkg.name %> - version <%= pkg.version %>:<%= mode %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        ' * <%= pkg.description %>\n' +
                        ' * (C) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                        ' */\n'
                },
                files: {
                    src: ['build/out/**/*.js', 'test/out/**/*.js']
                }
            },

            css: {
                options: {
                    banner: '/*\n' +
                        ' * <%= pkg.name %> - version <%= pkg.version %>:<%= mode %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        ' * <%= pkg.description %>\n' +
                        ' * (C) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                        ' */\n'
                },
                files: {
                    src: ['build/out/**/*.css', 'test/out/**/*.css']
                }
            },

            html: {
                options: {
                    banner: '<!--\n' +
                        ' <%= pkg.name %> - version <%= pkg.version %>:<%= mode %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        ' <%= pkg.description %>\n' +
                        ' (C) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                        '-->\n'
                },
                files: {
                    src: ['build/out/**/*.html', 'test/out/**/*.html']
                }
            },

            sh: {
                options: {
                    banner: '#!/bin/bash\n' +
                        '# <%= pkg.name %> - version <%= pkg.version %>:<%= mode %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '# <%= pkg.description %>\n' +
                        '# (C) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n'
                },
                files: {
                    src: ['build/out/**/*.sh', 'test/out/**/*.sh']
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
                    archive: 'build/dist/postgres-fiddle-<%= pkg.version %>-<%= mode %>-' +
                        '<%= grunt.template.today("yyyymmdd-HHMM") %>.tar.gz',
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

    grunt.registerTask('assemble', ['copy', 'mkdir', 'usebanner', 'version_file']);
    grunt.registerTask('test', ['jshint', 'mochaTest']);
    grunt.registerTask('build', ['clean', 'assemble', 'compress', 'test']);

    // Running test before compress does not work - why?
    grunt.registerTask('broken_build', ['clean', 'assemble', 'test', 'compress'])
};
