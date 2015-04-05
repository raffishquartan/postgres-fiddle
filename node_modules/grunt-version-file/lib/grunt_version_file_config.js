/*
 * grunt-version-file
 * https://github.com/cfogelberg/grunt-version-file
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 *
 * Class SRP: Validate and store GVF's overall configuration
 */

var grunt = require("grunt");
var path = require("path");

var GruntVersionFileConfig = function(config) {
  var check_config_is_good = function(config) {
    var valid_fields = ["out", "generator_dir", "generator_list"];

    if(config === undefined) {
      throw new Error("config undefined");
    }
    if(config.out === undefined || typeof(config.out) !== "string") {
      throw new Error("config.out undefined, not a string or does not exist");
    }

    if(config.generator_dir === undefined || typeof(config.generator_dir) !== "string") {
      throw new Error("config.generator_dir undefined or not a string");
    }
    var generator_path = path.join(__dirname, config.generator_dir);
    if(!grunt.file.exists(generator_path)) {
      throw new Error("config.generator_dir does not exist - expected path: " + generator_path);
    }


    if(typeof(config.generator_list) !== "object" || config.generator_list.length === undefined) {
      throw new Error("config.generator_list is not an array");
    }
    if(config.generator_list.length === 0) {
      throw new Error("config.generator_list array is empty");
    }

    var element_not_present = -1;
    var config_fields = Object.keys(config);
    for(var i in config_fields) {
      if(valid_fields.indexOf(config_fields[i]) === element_not_present) {
        throw new Error("config field '" + config_fields[i] + "' is not a valid config field");
      }
    }
  };

  check_config_is_good(config);
  this.out_val = config.out;
  this.generator_dir_val = config.generator_dir;
  this.generator_list_val = config.generator_list;
};

GruntVersionFileConfig.prototype.out_filepath = function() {
  return this.out_val;
};

GruntVersionFileConfig.prototype.generator_dir = function() {
  return this.generator_dir_val;
};

GruntVersionFileConfig.prototype.generator_list = function() {
  return this.generator_list_val;
};

module.exports = GruntVersionFileConfig;
