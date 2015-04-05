/*
 * grunt-version-file
 * https://github.com/cfogelberg/grunt-version-file
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 *
 * Class SRP: Abstract prototype for generator plugins
 */

var GeneratorFactory = function() {
};

var default_generator_init = function() {
};

GeneratorFactory.prototype.create = function(generator_config) {
  var check_valid_generator_config = function(gc) {
    var fields = Object.keys(gc);
    var initIndex = fields.indexOf("init");
    if(!(gc && gc.label_value && typeof(gc.label_value) === "function")) {
      throw new Error("Generator does not have label_value as a function");
    }
    else if(fields.length === 2 && (initIndex === -1 || typeof(gc.init) !== "function")) {
      throw new Error("Generator's second field must be an init function");
    }
    else if(fields.length === 0 || fields.length > 2) {
      throw new Error("Generator must have label_value and optionally init fields only");
    }
  };

  check_valid_generator_config(generator_config);
  var gen = {};
  gen.label_value = generator_config.label_value;
  gen.init = generator_config.init ? generator_config.init : default_generator_init;
  return gen;
};

module.exports = GeneratorFactory;
