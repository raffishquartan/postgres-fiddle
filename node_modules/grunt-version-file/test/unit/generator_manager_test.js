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

describe("GeneratorManager", function() {
  var GeneratorManager = require("../../lib/generator_manager");

  var GENERATOR_DIR_VALID = "generators";
  var GENERATOR_LIST_VALID = ["datestring", "npm_version", "git_describe"];

  var CONFIG_VALID = {
    generator_dir: GENERATOR_DIR_VALID,
    generator_list: GENERATOR_LIST_VALID,
  };

  it("requires an options.generator_dir constructor argument", function() {
    (function() {
      var gm = new GeneratorManager({
        generator_list: GENERATOR_LIST_VALID,
      });
    }).should.throw();
  });

  it("throws an error when options.generator_dir is not a string", function() {
    (function() {
      var gm = new GeneratorManager({
        generator_list: GENERATOR_LIST_VALID,
        generator_dir: 1,
      });
    }).should.throw();
  });

  it("throws an error when options.generator_dir does not exist", function() {
    (function() {
      var gm = new GeneratorManager({
        generator_list: GENERATOR_LIST_VALID,
        generator_dir: "does-not-exist",
      });
    }).should.throw();
  });

  it("requires an options.generator_list constructor argument", function() {
    (function() {
      var gm = new GeneratorManager({
        generator_dir: GENERATOR_DIR_VALID,
      });
    }).should.throw();
  });

  it("throws an error when options.generator_list is not an array", function() {
    (function() {
      var gm = new GeneratorManager({
        generator_dir: GENERATOR_DIR_VALID,
        generator_list: "datestring-not-an-array",
      });
    }).should.throw();
  });

  it("throws an error when options.generator_list contains duplicates", function() {
    (function() {
      var gm = new GeneratorManager({
        generator_dir: GENERATOR_DIR_VALID,
        generator_list: GENERATOR_LIST_VALID.concat(GENERATOR_LIST_VALID),
      });
    }).should.throw();
  });

  it("throws an error when options.generator_list is empty", function() {
    (function() {
      var gm = new GeneratorManager({
        generator_dir: GENERATOR_DIR_VALID,
        generator_list: [],
      });
    }).should.throw();
  });

  it("returns the correct generator_map", function() {
    var gm = new GeneratorManager(CONFIG_VALID);
    var map = gm.generator_map();
    var expected_length = GENERATOR_LIST_VALID.length;
    Object.keys(map).length.should.equal.expected_length;
    for(var i in GENERATOR_LIST_VALID) {
      var gen = GENERATOR_LIST_VALID[i];
      map[gen].should.not.equal.undefined;
    }
  });

  it("throws an error when a gen. list member is not in generator_dir", function() {
    (function() {
      var gm = new GeneratorManager({
        generator_dir: GENERATOR_DIR_VALID,
        generator_list: ["not_valid_generator"],
      });
    }).should.throw();
  });

  it("throws an error when any unexpected options fields are defined", function() {
    (function() {
      var gm = new GeneratorManager({
        generator_dir: GENERATOR_DIR_VALID,
        generator_list: GENERATOR_LIST_VALID,
        extra: 1234
      });
    }).should.throw();
  });

  it("returns a then'able from generate", function() {
    var gm = new GeneratorManager(CONFIG_VALID);
    var result = gm.generate();
    result.should.not.be.undefined;
    result.should.be.an.Object;
    result.then.should.be.a.Function;
  });

  it("adds all generator labels/values to object_store argument", function() {
    var gm = new GeneratorManager(CONFIG_VALID);
    gm.generate().then(function(object_store) {
      var expected_length = GENERATOR_LIST_VALID.length;
      Object.keys(object_store).length.should.equal.expected_length;
      for(var i in GENERATOR_LIST_VALID) {
        var gen = GENERATOR_LIST_VALID[i];
        object_store[gen].should.not.equal.undefined;
      }
    });
  });
});
