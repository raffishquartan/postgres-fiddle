/*
 * grunt-version-file
 * https://github.com/cfogelberg/grunt-version-file
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 *
 * Class SRP: Abstract prototype for generator plugins
 */

"use strict";

var grunt = require("grunt");
var q = require("q");

module.exports = {
  label_value: function() {
    var pkg = grunt.file.readJSON("package.json");
    var deferred = q.defer();
    deferred.resolve({
      label: "npm_version",
      value: pkg.version
    });
    return deferred.promise;
  }
};
