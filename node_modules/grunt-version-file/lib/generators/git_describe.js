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
    var deferred = q.defer();

    grunt.util.spawn({
      "cmd": "git",
      "args": [ "describe", "--tags", "--always", "--long", "--dirty" ]
    }, function(error, result, code) {
      if(error) {
        deferred.reject(error);
      }
      else {
        deferred.resolve({
          label: "git_describe",
          value: result.stdout
        });
      }
    });

    return deferred.promise;
  }
};
