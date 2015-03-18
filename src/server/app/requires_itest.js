// Allow statements that are not assignments or function calls (e.g. should statements)
/* jshint -W030 */

'use strict';

require('should');

// https://gist.github.com/kethinov/6658166 - requires a trailing slash on the dir argument
var walk_sync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walk_sync(dir + file + '/', filelist);
    }
    else {
      filelist.push(file);
    }
  });
  return filelist;
};

// Requires a trailing slash on the dir argument because walk_sync does
var js_files_in_dir = function(dir) {
  return walk_sync(dir).filter(function(filename) {
    return /\.js$/.test(filename);
  });
};

describe('requires', function() {
  it('failed requires should throw errors', function() {
    (function() {
      require('this/file/does/not/exist');
    }).should.throw();
  });

  describe('api', function() {
    var api_tests_executed = 0;

    it('app/api/entry/router', function() {
      api_tests_executed++;
      var result = require('app/api/entry/router');
      result.should.not.be.undefined;
    });

    // This test must be last in its suite
    it('all api js files should be tested', function() {
      var api_js_files = js_files_in_dir('./src/server/app/api/');
      api_tests_executed.should.equal(api_js_files.length);
    });
  });

  describe('config', function() {
    var config_tests_executed = 0;

    it('app/config/database', function() {
      config_tests_executed++;
      var result = require('app/config/database');
      result.should.not.be.undefined;
    });

    it('app/config/logger', function() {
      config_tests_executed++;
      var result = require('app/config/database');
      result.should.not.be.undefined;
    });

    it('app/config/server', function() {
      config_tests_executed++;
      var result = require('app/config/database');
      result.should.not.be.undefined;
    });

    // This test must be last in its suite
    it('all config js files should be tested', function() {
      var config_js_files = js_files_in_dir('./src/server/app/config/');
      config_tests_executed.should.equal(config_js_files.length);
    });
  });

  describe('util', function() {
    var config_tests_executed = 0;

    it('app/util/logger', function() {
      config_tests_executed++;
      var result = require('app/util/logger');
      result.should.not.be.undefined;
    });

    it('app/util/pr', function() {
      config_tests_executed++;
      var result = require('app/util/pr');
      result.should.not.be.undefined;
    });

    it('app/util/pr/entry', function() {
      config_tests_executed++;
      var result = require('app/util/pr/entry');
      result.should.not.be.undefined;
    });

    // This test must be last in its suite
    it('all util js files should be tested', function() {
      var config_js_files = js_files_in_dir('./src/server/app/util/');
      config_tests_executed.should.equal(config_js_files.length);
    });
  });
});
