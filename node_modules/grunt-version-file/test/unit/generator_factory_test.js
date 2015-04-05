/*
 * grunt-version-file
 * https://github.com/cfogelberg/grunt-version-file
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */
// Allow indirectly-executed (should-executed) function literals to pass jshint IIFE warning:
/*jshint -W068 */
// Allow expressions (...should.be.a.Foo;)
/*jshint -W030 */

"use strict";

describe("GeneratorFactory", function() {
  var should = require("should");
  var GeneratorFactory = require("../../lib/generator_factory.js");

  it("has a create method", function() {
    var gf = new GeneratorFactory();
    gf.create.should.be.a.Function;
  });

  it("... that requires options.label_value", function() {
    var gf = new GeneratorFactory();
    var config_without_label_value = {};
    (function() {
      gf.create(config_without_label_value);
    }).should.throw();
  });

  it("... that requires options.label_value to be a function", function() {
    var gf = new GeneratorFactory();
    var config_without_label_value_function = { label_value: function() {}, label: "label" };
    (function() {
      gf.create(config_without_label_value_function);
    }).should.throw();
  });

  it("... creates objects with a label_value function", function() {
    var gf = new GeneratorFactory();
    var config = { label_value: function() {} };
    var generator = gf.create(config);
    generator.label_value.should.be.a.Function;
  });

  it("... that allows options.init", function() {
    var gf = new GeneratorFactory();
    var config_with_init = { label_value: function() {}, init: function() {} };
    var generator = gf.create(config_with_init);
    generator.init.should.be.a.Function;
    generator.label_value.should.be.a.Function;
  });

  it("... that requires options.init to be a function", function() {
    var gf = new GeneratorFactory();
    var config_with_nonfunction_init = { label_value: function() {}, init: "init" };
    (function() {
      gf.create(config_with_nonfunction_init);
    }).should.throw();
  });

  it("... that creates generators with a default init function", function() {
    var gf = new GeneratorFactory();
    var config = { label_value: function() {} };
    var generator = gf.create(config);
    generator.init.should.be.a.Function;
  });

  it("... that throws an error if it has a second non-init option", function() {
    var gf = new GeneratorFactory();
    var config = { label_value: function() {}, foo: function() {} };
    (function() {
      var generator = gf.create(config);
    }).should.throw();
  });

  it("... that throws an error if extra options are present", function() {
    var gf = new GeneratorFactory();
    var config_with_extra = { label_value: function() {}, init: function() {}, foo: function() {} };
    (function() {
      gf.create(config_with_extra);
    }).should.throw();
  });
});
