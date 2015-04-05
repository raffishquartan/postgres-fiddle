'use strict';

var _ = require('underscore');
var glob = require('glob');
var sinon = require('sinon');

var is_application_file = function(filename) {
  return !/.*_itest\.js/.test(filename) && !/.*_utest\.js/.test(filename);
};

module.exports = {
  /**
   * Return an array with all application JS files, filtering out test files (*_utest.js, *_itest.js)
   *
   * @param  {String} dir The directory to search inside
   * @return {Array}      Array of String with the relative paths to the files in dir
   */
  js_app_files_in_dir: function(dir) {
    return glob.sync(dir + '/**/*.js').filter(is_application_file);
  },

  /**
   * Returns the number of functions exported by a module
   * @param  {String} require_path The path to the module for require
   * @return {Number}              The number of functions
   */
  num_func_in_module: function(require_path) {
    return _.functions(require(require_path)).length;
  },

  /**
   * Returns a sinon stub that returns a mock promise whose `then` function that ignores the any function
   * passed to it and instead immediately returns a stub object with a `done` spy. This means that
   * functions inside then callbacks will not be called. The mock promise, then and done functions are
   * all Sinon spies.
   *
   * @return {Object} A mock promise that allows `{returnedObject}(arguments).then(function).done()`
   */
  stub_then_done: function() {
    var mock_then_done_promise = { then: sinon.spy(function() { return { done: sinon.spy() }; }) };
    return sinon.spy(function() { return mock_then_done_promise; });
  }
};
