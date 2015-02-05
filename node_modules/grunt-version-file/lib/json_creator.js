/*
 * grunt-version-file
 * https://github.com/raffishquartan/grunt-version-file
 *
 * Copyright (c) 2014 raffishquartan
 * Licensed under the MIT license.
 *
 * Class SRP: Create JSON string for serialisation
 */

function JsonCreator(options) {
}

JsonCreator.prototype.create_string = function(object_store) {
  if(typeof(object_store) !== "object") {
    throw new Error("JsonCreator.create_string requires an object paramter");
  }
  return JSON.stringify(object_store, undefined, 2);
};

module.exports = JsonCreator;
