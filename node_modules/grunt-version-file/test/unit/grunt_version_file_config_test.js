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

describe("GruntVersionFileConfig", function() {
  var GruntVersionFileConfig = require("../../lib/grunt_version_file_config");

  var OUT_FILEPATH_VALID = "build/out/version.json";
  var GENERATOR_DIR_VALID = "generators";
  var GENERATOR_LIST_VALID = ["datestring", "npm_version", "git_describe"];

  var CONFIG_VALID = {
    out: OUT_FILEPATH_VALID,
    generator_dir: GENERATOR_DIR_VALID,
    generator_list: GENERATOR_LIST_VALID
  };

  it("throws an error if the out parameter is not specified", function() {
    var conf = {
      generator_dir: GENERATOR_DIR_VALID,
      generator_list: GENERATOR_LIST_VALID
    };
    (function() {
      var gvfc = new GruntVersionFileConfig(conf);
    }).should.throw();
  });

  it("throws an error if the out paramter is not a string", function() {
    var conf = {
      out: 1,
      generator_dir: GENERATOR_DIR_VALID,
      generator_list: GENERATOR_LIST_VALID
    };
    (function() {
      var gvfc = new GruntVersionFileConfig(conf);
    }).should.throw();
  });

  it("throws an error if the generator_dir parameter does not exist", function() {
    var conf = {
      out: OUT_FILEPATH_VALID,
      generator_list: GENERATOR_LIST_VALID
    };
    (function() {
      var gvfc = new GruntVersionFileConfig(conf);
    }).should.throw();
  });

  it("throws an error if the generator_dir paramter is not a string", function() {
    var conf = {
      out: OUT_FILEPATH_VALID,
      generator_dir: 1,
      generator_list: GENERATOR_LIST_VALID
    };
    (function() {
      var gvfc = new GruntVersionFileConfig(conf);
    }).should.throw();
  });

  it("throws an error if the generator_dir does not exist", function() {
    var conf = {
      out: OUT_FILEPATH_VALID,
      generator_dir: "foo",
      generator_list: GENERATOR_LIST_VALID
    };
    (function() {
      var gvfc = new GruntVersionFileConfig(conf);
    }).should.throw();
  });

  it("throws an error if the generator_list parameter does not exist", function() {
    var conf = {
      out: OUT_FILEPATH_VALID,
      generator_dir: GENERATOR_DIR_VALID
    };
    (function() {
      var gvfc = new GruntVersionFileConfig(conf);
    }).should.throw();
  });

  it("throws an error if the generator_list is not an array of string", function() {
    var conf = {
      out: OUT_FILEPATH_VALID,
      generator_dir: GENERATOR_DIR_VALID,
      generator_list: "datestring"
    };
    (function() {
      var gvfc = new GruntVersionFileConfig(conf);
    }).should.throw();
  });

  it("throws an error if the generator_list is empty", function() {
    var conf = {
      out: OUT_FILEPATH_VALID,
      generator_dir: GENERATOR_DIR_VALID,
      generator_list: []
    };
    (function() {
      var gvfc = new GruntVersionFileConfig(conf);
    }).should.throw();
  });

  it("throws an error if the constructor parameter is undefined", function() {
    (function() {
      var gvfc = new GruntVersionFileConfig();
    }).should.throw();
  });

  it("returns the correct output path for the valid test config", function() {
    var gvfc = new GruntVersionFileConfig(CONFIG_VALID);
    gvfc.out_filepath().should.equal.OUT_FILEPATH_VALID;
  });

  it("stores the correct generator list for the valid test config", function() {
    var gvfc = new GruntVersionFileConfig(CONFIG_VALID);
    var list = gvfc.generator_list();
    list.length.should.equal(GENERATOR_LIST_VALID.length);
    var not_found_index_value = -1;
    for(var i in GENERATOR_LIST_VALID) {
      var gen_string = GENERATOR_LIST_VALID[i];
      list.indexOf(gen_string).should.not.equal.not_found_index_value;
    }
  });

  it("stores the correct generator dir for the valid test config", function() {
    var gvfc = new GruntVersionFileConfig(CONFIG_VALID);
    gvfc.generator_dir().should.equal.GENERATOR_DIR_VALID;
  });

  it("throws an error if there are any unrecognised config fields", function() {
    var conf = {
      out: OUT_FILEPATH_VALID,
      generator_dir: GENERATOR_DIR_VALID,
      generator_list: GENERATOR_LIST_VALID,
      extra_field: "foo"
    };
    (function() {
      var gvfc = new GruntVersionFileConfig(conf);
    }).should.throw();
  });
});
