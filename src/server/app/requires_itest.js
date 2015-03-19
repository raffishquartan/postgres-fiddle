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
var js_application_files_in_dir = function(dir) {
  return walk_sync(dir).filter(function(filename) {
    return /\.js$/.test(filename) && !/_itest\.js$/.test(filename) && !/_utest\.js$/.test(filename);
  });
};

// Requires a trailing slash on the dir argument because js_application_files_in_dir and walk_sync does
var num_files_in_dirtree = function(dir) {
  return js_application_files_in_dir(dir).length;
};

describe('requires', function() {
  it('failed requires should throw errors', function() {
    (function() {
      require('this/file/does/not/exist');
    }).should.throw();
  });

  describe('api', function() {
    var tests_executed = 0;

    it('app/api/entry/router', function() {
      tests_executed++;
      var result = require('app/api/entry/router');
      result.should.not.be.undefined;
    });

    // This test must be last in its suite
    it('all api js files should be tested', function() {
      tests_executed.should.equal(num_files_in_dirtree('./src/server/app/api/'));
    });
  });

  describe('config', function() {
    var tests_executed = 0;

    it('app/config/database', function() {
      tests_executed++;
      var result = require('app/config/database');
      result.should.not.be.undefined;
    });

    it('app/config/logger', function() {
      tests_executed++;
      var result = require('app/config/logger');
      result.should.not.be.undefined;
    });

    it('app/config/server', function() {
      tests_executed++;
      var result = require('app/config/server');
      result.should.not.be.undefined;
    });

    // This test must be last in its suite
    it('all config js files should be tested', function() {
      tests_executed.should.equal(num_files_in_dirtree('./src/server/app/config/'));
    });
  });

  describe('util', function() {
    var tests_executed = 0;

    it('app/util/logger', function() {
      tests_executed++;
      var result = require('app/util/logger');
      result.should.not.be.undefined;
    });

    it('app/util/pr', function() {
      tests_executed++;
      var result = require('app/util/pr');
      result.should.not.be.undefined;
    });

    it('app/util/pr/entry', function() {
      tests_executed++;
      var result = require('app/util/pr/entry');
      result.should.not.be.undefined;
    });

    // This test must be last in its suite
    it('all util js files should be tested', function() {
      tests_executed.should.equal(num_files_in_dirtree('./src/server/app/util/'));
    });
  });
});
