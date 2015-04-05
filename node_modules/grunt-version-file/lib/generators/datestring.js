/*
 * grunt-version-file
 * https://github.com/raffishquartan/grunt-version-file
 *
 * Copyright (c) 2014 raffishquartan
 * Licensed under the MIT license.
 *
 * Class SRP: Abstract prototype for generator plugins
 */

"use strict";

var grunt = require("grunt");
var q = require("q");

module.exports = {
  label_value: function() {
    var deferred = q.defer();
    deferred.resolve({
      label: "datestring",
      value: grunt.template.today()
    });
    return deferred.promise;
  }
};
