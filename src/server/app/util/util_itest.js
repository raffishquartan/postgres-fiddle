// Allow statements that are not assignments or function calls (e.g. should statements)
/* jshint -W030 */

'use strict';

var should = require('should');

var test_lib = require('test/lib');

describe('exported functions - util', function() {
  /**
   * Map of module name to the number of functions that module exports
   * @type {Object}
   */
  var f_exported_cnt = {};

  it('app/util/logger/index', function() {
    var name = 'app/util/logger/index';
    var module = require(name);
    f_exported_cnt[name] = 0;
    module.get.should.be.a.function;
    f_exported_cnt[name]++;
    module.get_log4js.should.be.a.function;
    f_exported_cnt[name]++;
  });

  /** Sequelize object has .sq object field for Sequelize and a .pr object field for all the models - no funcs */
  it('app/util/pr/index', function() {
    var name = 'app/util/pr/index';
    f_exported_cnt[name] = 0;
  });


  /** Sequelize model module export is a function, not an object with functions - rely on Sequelize tests - no funcs */
  it('app/util/pr/entry', function() {
    var name = 'app/util/pr/entry';
    f_exported_cnt[name] = 0;
  });

  // This test must be last in its suite
  it('tests check for all expected exported functions', function() {
    var js_files = test_lib.js_application_files_in_dir_path('./src/server/app/util/').filter(function(filename) {
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
