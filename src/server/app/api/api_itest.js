// Allow statements that are not assignments or function calls (e.g. should statements)
/* jshint -W030 */

'use strict';

var should = require('should');

var test_lib = require('test/lib');

describe('exported functions - api', function() {
  /**
   * Map of module name to the number of functions that module exports
   * @type {Object}
   */
  var f_exported_cnt = {};

  // This test must be last in its suite
  it('tests check for all expected exported functions', function() {
    var js_files = test_lib.js_application_files_in_dir_path('./src/server/app/api/').filter(function(filename) {
      return !/.*\/router.js/.test(filename);
    });
    js_files.forEach(function(js_file) {
      var req_path = js_file.replace(/\.\/src\/server\//, '').replace(/\.js$/, '');
      should(f_exported_cnt[req_path]).not.be.type('undefined', req_path + ' exports not checked') &&
        f_exported_cnt[req_path].should.equal(test_lib.num_module_func(req_path),
          req_path + ' only ' + f_exported_cnt[req_path] + ' of ' + test_lib.num_module_func(req_path) + ' functions checked');
    });
  });
});
