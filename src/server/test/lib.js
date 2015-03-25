'use strict';

var _ = require('underscore');
var glob = require('glob');

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

  num_func_in_module: function(require_path) {
    return _.functions(require(require_path)).length;
  }
};
