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

describe("VersionFileWriter", function() {
  var should = require("should");
  var GeneratorManager = require("../../lib/generator_manager");
  var JsonCreator = require("../../lib/json_creator");
  var VersionFileWriter = require("../../lib/version_file_writer");

  var OUTPUT_CREATOR_VALID = new JsonCreator();
  var GENERATOR_MANAGER_VALID = new GeneratorManager({
    generator_dir: "generators",
    generator_list: ["datestring", "npm_version"],
  });
  var OUT_VALID = "test/tmp/build/out/version.json";
  var ASYNC_DONE_STUB = function() { return "stub-async-done"; };

  var VALID_OPTIONS = {
    output_creator: OUTPUT_CREATOR_VALID,
    generator_manager: GENERATOR_MANAGER_VALID,
    out: OUT_VALID,
    async_done: ASYNC_DONE_STUB
  };

  it("throws an error if no options are passed to consructor", function() {
    (function() {
      var vfw = new VersionFileWriter();
    }).should.throw();
  });

  it("constructor requires options.output_creator", function() {
    (function() {
      var vfw = new VersionFileWriter({
        generator_manager: GENERATOR_MANAGER_VALID,
        out: OUT_VALID,
        async_done: ASYNC_DONE_STUB
      });
    }).should.throw();
  });

  it("constructor requires options.generator_manager", function() {
    (function() {
      var vfw = new VersionFileWriter({
        output_creator: OUTPUT_CREATOR_VALID,
        out: OUT_VALID,
        async_done: ASYNC_DONE_STUB
      });
    }).should.throw();
  });

  it("constructor requires options.out", function() {
    (function() {
      var vfw = new VersionFileWriter({
        output_creator: OUTPUT_CREATOR_VALID,
        generator_manager: GENERATOR_MANAGER_VALID,
        async_done: ASYNC_DONE_STUB
      });
    }).should.throw();
  });

  it("constructor requires options.out to be a string", function() {
    (function() {
      var vfw = new VersionFileWriter({
        output_creator: OUTPUT_CREATOR_VALID,
        generator_manager: GENERATOR_MANAGER_VALID,
        async_done: ASYNC_DONE_STUB,
        out: 1
      });
    }).should.throw();
  });

  it("constructor requires options.async_done", function() {
    (function() {
      var vfw = new VersionFileWriter({
        output_creator: OUTPUT_CREATOR_VALID,
        generator_manager: GENERATOR_MANAGER_VALID,
        out: OUT_VALID
      });
    }).should.throw();
  });

  it("constructor requires options.async_done to be a function", function() {
    (function() {
      var vfw = new VersionFileWriter({
        output_creator: OUTPUT_CREATOR_VALID,
        generator_manager: GENERATOR_MANAGER_VALID,
        out: OUT_VALID,
        async_done: "will not work"
      });
    }).should.throw();
  });

  it("throws an error if extra options are passed to ctor", function() {
    (function() {
      var vfw = new VersionFileWriter({
        output_creator: OUTPUT_CREATOR_VALID,
        generator_manager: GENERATOR_MANAGER_VALID,
        out: OUT_VALID,
        async_done: ASYNC_DONE_STUB,
        extra_option_to_ctor: "foo"
      });
    }).should.throw();
  });

  it("has a write_version_file method", function() {
    var vfw = new VersionFileWriter(VALID_OPTIONS);
    vfw.write_version_file.should.be.a.Function;
  });

  it.skip("writes valid options correctly", function() {
    var vfw = new VersionFileWriter(VALID_OPTIONS);
    vfw.write_version_file();
    // TODO: After write is completed, test that written file matches expected string
  });
});
