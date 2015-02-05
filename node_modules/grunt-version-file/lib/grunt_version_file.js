/*
 * grunt-version-file
 * https://github.com/cfogelberg/grunt-version-file
 *
 * Copyright (c) 2014 Christo Fogelberg
 * Licensed under the MIT license.
 *
 * Class SRP: Register GVF with Grunt as a plugin
 */

"use strict";

var GruntVersionFileConfig = require("../lib/grunt_version_file_config");
var GeneratorManager = require("../lib/generator_manager");
var JsonCreator = require("../lib/json_creator");
var VersionFileWriter = require("../lib/version_file_writer");

function GruntVersionFile(task) {
  this.task = task;
  this.options = task.options(GruntVersionFile.Defaults);
  this.async_done = task.async();
}

GruntVersionFile.prototype.run = function() {
  var config = new GruntVersionFileConfig(this.options);
  var vfw = new VersionFileWriter({
    output_creator: new JsonCreator(),
    generator_manager: new GeneratorManager({
      generator_dir: config.generator_dir(),
      generator_list: config.generator_list()
    }),
    out: config.out_filepath(),
    async_done: this.async_done
  });
  vfw.write_version_file();
};

GruntVersionFile.Defaults = {
  generator_dir: "generators",
  generator_list: [
    "datestring",
    "npm_version",
    "git_describe"
  ]
};

GruntVersionFile.task_name = "version_file";
GruntVersionFile.task_description = "Writes a JSON version file  with code provenance info for this build";
GruntVersionFile.register_with_grunt = function(grunt) {
  grunt.registerMultiTask(GruntVersionFile.task_name, GruntVersionFile.task_description, function() {
    var task = new GruntVersionFile(this);
    task.run();
  });
};

// Add variables Grunt expects in camelc case...
GruntVersionFile.taskName = GruntVersionFile.task_name;
GruntVersionFile.taskDescription = GruntVersionFile.task_description;
GruntVersionFile.registerWithGrunt = GruntVersionFile.register_with_grunt;

module.exports = GruntVersionFile;
