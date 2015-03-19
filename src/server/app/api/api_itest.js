// Allow statements that are not assignments or function calls (e.g. should statements)
/* jshint -W030 */

'use strict';

var should = require('should');
var _ = require('underscore');

// https://gist.github.com/kethinov/6658166 - requires a trailing slash on the dir argument
var walk_sync_path = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walk_sync_path(dir + file + '/', filelist);
    }
    else {
      filelist.push(dir + file);
    }
  });
  return filelist;
};

// Requires a trailing slash on the dir argument because walk_sync does
var js_application_files_in_dir = function(dir) {
  return walk_sync_path(dir).filter(function(filename) {
    return /\.js$/.test(filename) && !/_itest\.js$/.test(filename) && !/_utest\.js$/.test(filename);
  });
};

var num_module_func = function(require_path) {
  return _.functions(require(require_path)).length;
};

describe('exported functions - api', function() {
  /**
   * Map of module name to the number of functions that module exports
   * @type {Object}
   */
  var f_exported_cnt = {};

  // This test must be last in its suite
  it('tests check for all expected exported functions', function() {
    var js_files = js_application_files_in_dir('./src/server/app/api/').filter(function(filename) {
      return !/.*\/router.js/.test(filename);
    });
    js_files.forEach(function(js_file) {
      var req_path = js_file.replace(/\.\/src\/server\//, '').replace(/\.js$/, '');
      should(f_exported_cnt[req_path]).not.be.type('undefined', req_path + ' exports not checked') &&
        f_exported_cnt[req_path].should.equal(num_module_func(req_path),
          req_path + ' only ' + f_exported_cnt[req_path] + ' of ' + num_module_func(req_path) + ' functions checked');
    });
  });
});
