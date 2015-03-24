'use strict';

var _ = require('underscore');

/**
 * https://gist.github.com/kethinov/6658166 - requires a trailing slash on the dir argument
 */
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

/**
 * Requires a trailing slash on the dir argument because walk_sync does
 */
var js_application_files_in_dir = function(dir) {
  return walk_sync(dir).filter(function(filename) {
    return /\.js$/.test(filename) && !/_itest\.js$/.test(filename) && !/_utest\.js$/.test(filename);
  });
};

/**
 * Requires a trailing slash on the dir argument because js_application_files_in_dir does
 */
var num_files_in_dirtree = function(dir) {
  return js_application_files_in_dir(dir).length;
};

/**
 * https://gist.github.com/kethinov/6658166 - requires a trailing slash on the dir argument
 */
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

/**
 * Requires a trailing slash on the dir argument because walk_sync_path does
 */
var js_application_files_in_dir_path = function(dir) {
  return walk_sync_path(dir).filter(function(filename) {
    return /\.js$/.test(filename) && !/_itest\.js$/.test(filename) && !/_utest\.js$/.test(filename);
  });
};

var num_module_func = function(require_path) {
  return _.functions(require(require_path)).length;
};

module.exports = {
  /**
   * https://gist.github.com/kethinov/6658166 - requires a trailing slash on the dir argument
   */
  walk_sync: walk_sync,

  /**
   * Requires a trailing slash on the dir argument because walk_sync does
   */
  js_application_files_in_dir: js_application_files_in_dir,

  /**
   * Requires a trailing slash on the dir argument because js_application_files_in_dir and walk_sync does
   */
  num_files_in_dirtree: num_files_in_dirtree,

  /**
   * https://gist.github.com/kethinov/6658166 - requires a trailing slash on the dir argument
   */
  walk_sync_path: walk_sync_path,

  /**
   * Requires a trailing slash on the dir argument because walk_sync_path does
   */
  js_application_files_in_dir_path: js_application_files_in_dir_path,

  num_module_func: num_module_func
};
