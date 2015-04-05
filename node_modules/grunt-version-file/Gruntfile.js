/*
 * grunt-version-file
 * https://github.com/cfogelberg/grunt-version-file
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    clean: {
      all: {
        src: [ "test/tmp", "test/coverage", "**/*~", "**/.*~" ]
      }
    },

    jshint: {
      all: [ "test/**/*.js", "tasks/**/*.js", "lib/**/*.js" ],
      options: {
        jshintrc: ".jshintrc",
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: "spec",
          clearRequireCache: true,
          require: "test/blanket"
        },
        src: ["test/**/*.js", "!test/blanket.js"]
      },
      coverage_html: {
        options: {
          reporter: "html-cov",
          quiet: true,
          captureFile: "test/coverage/coverage.html"
        },
        src: ["test/**/*.js"]
      },
      "mocha-lcov-reporter": {
        options: {
          reporter: "mocha-lcov-reporter",
          quiet: true,
          captureFile: "test/coverage/lcov.info"
        },
        src: ["test/**/*.js"]
      },
      "travis-cov": {
        options: {
          reporter: "travis-cov"
        },
        src: ["test/**/*.js"]
      }
    },

    // To submit coverage to coveralls.io run COVERALLS_REPO_TOKEN=<token_val>
    coveralls: {
      options: {
        force: true
      },
      all: {
        src: "test/coverage/lcov.info"
      }
    },

    bump: {
      options: {
        files: ["package.json"],
        updateConfigs: ["pkg"],
        commit: false,
        createTag: false,
        push: false
      }
    }
  });

  grunt.loadTasks("tasks");
  grunt.loadNpmTasks("grunt-bump");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-coveralls");
  grunt.loadNpmTasks("grunt-mocha-test");
  grunt.registerTask("test", ["jshint", "mochaTest"]);
  grunt.registerTask("default", ["clean", "test", "coveralls"]);
};
