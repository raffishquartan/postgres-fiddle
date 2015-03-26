// Allow statements that are not assignments or function calls (e.g. should statements)
/* jshint -W030 */

'use strict';

require('should');

var test_lib = require('test/lib');

describe('requires', function() {
  it('failed requires should throw errors', function() {
    (function() {
      require('this/file/does/not/exist');
    }).should.throw();
  });

  describe('api', function() {
    var tests_executed = 0;

    it('app/api/router', function() {
      tests_executed++;
      var result = require('app/api/router');
      result.should.not.be.undefined;
    });

    it('app/api/entry/router', function() {
      tests_executed++;
      var result = require('app/api/entry/router');
      result.should.not.be.undefined;
    });

    it('app/api/entry/router_impl', function() {
      tests_executed++;
      var result = require('app/api/entry/router_impl');
      result.should.not.be.undefined;
    });

    // This test must be last in its suite
    it('all api js files should be tested', function() {
      tests_executed.should.equal(test_lib.js_app_files_in_dir('./src/server/app/api/').length);
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
      tests_executed.should.equal(test_lib.js_app_files_in_dir('./src/server/app/config/').length);
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
      tests_executed.should.equal(test_lib.js_app_files_in_dir('./src/server/app/util/').length);
    });
  });
});
