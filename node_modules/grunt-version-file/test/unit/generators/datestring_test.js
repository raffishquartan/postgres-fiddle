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

describe("DatestringGenerator", function() {
  var should = require("should");
  var datestring = require("../../../lib/generators/datestring");

  it("specifies a label_value method that returns a then'able object", function() {
    datestring.label_value.should.be.a.Function;
    datestring.label_value().should.be.a.Object;
    datestring.label_value().then.should.be.a.Function;
  });

  it("the then'able object resolves to an object with label and value", function() {
    datestring.label_value().then(function(result) {
      result.label.should.not.be.undefined;
      result.label.should.be.a.String;
      result.value.should.not.be.undefined;
    });
  });
});
