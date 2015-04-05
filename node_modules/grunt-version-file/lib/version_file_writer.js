/*
 * grunt-version-file
 * https://github.com/cfogelberg/grunt-version-file
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 *
 * Class SRP: Assemble and write JSON version file to disk
 */

function VersionFileWriter(options) {
  var check_options_defined = function(options) {
    if(!options) {
      throw new Error("VersionFileWriter constructor options = " + options);
    }
  };

  var check_valid_output_creator = function(output_creator) {
    if(output_creator === undefined || typeof(output_creator) !== "object") {
      throw new Error("VersionFileWriter requires options.output_creator to be an object");
    }
  };

  var check_valid_generator_manager = function(generator_manager) {
    if(generator_manager === undefined || typeof(generator_manager) !== "object") {
      throw new Error("VersionFileWriter requires options.generator_manager to be an object");
    }
  };

  var check_valid_out = function(out) {
    if(out === undefined || typeof(out) !== "string") {
      throw new Error("VersionFileWriter requires options.out to be a string");
    }
  };

  var check_valid_async_done = function(async_done) {
    if(async_done === undefined || typeof(async_done) !== "function") {
      throw new Error("VersionFileWriter requires options.async_done to be a function");
    }
  };

  var check_no_extra_options_properties = function(options) {
    var properties = Object.keys(options);
    if(properties.length > 4) {
      throw new Error("VersionFileWriter options has unexpected keys: " + properties);
    }
  };

  check_options_defined(options);
  check_valid_output_creator(options.output_creator);
  check_valid_generator_manager(options.generator_manager);
  check_valid_out(options.out);
  check_valid_async_done(options.async_done);
  check_no_extra_options_properties(options);

  this.output_creator = options.output_creator;
  this.generator_manager = options.generator_manager;
  this.out = options.out;
  this.async_done = options.async_done;
}

VersionFileWriter.prototype.write_version_file = function() {
  var grunt = require("grunt");
  var that = this;
  this.generator_manager.generate()
  .then(function(object_store) {
    var output_string = that.output_creator.create_string(object_store);
    grunt.file.write(that.out, output_string); // is sync
    that.async_done();
  });
};

module.exports = VersionFileWriter;
