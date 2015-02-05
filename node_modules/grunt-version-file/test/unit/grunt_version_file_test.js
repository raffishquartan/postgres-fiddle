/*
 * grunt-version-file
 * https://github.com/cfogelberg/grunt-version-file
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 */

"use strict";

describe("GruntVersionFile", function() {
  var should = require("should");
  var grunt = require("grunt");
  var GruntVersionFile = require("../../lib/grunt_version_file");

  it("registers itself with grunt", function() {
    should.exist(GruntVersionFile.registerWithGrunt);
    GruntVersionFile.registerWithGrunt(grunt);
    should.exist(grunt.task._tasks[GruntVersionFile.taskName]);
    grunt.task._tasks[GruntVersionFile.taskName].info.should.equal(GruntVersionFile.taskDescription);
  });
});
