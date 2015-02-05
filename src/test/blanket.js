/*
 * grunt-set-app-mode
 * https://github.com/raffishquartan/grunt-set-app-mode
 *
 * Copyright (c) 2014 raffishquartan
 * Licensed under the MIT license.
 */

var path = require('path');
require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: [ path.join(__dirname, "..", "lib"), path.join(__dirname, "..", "tasks") ]
});
