"use strict";

var log4js = require("log4js");
module.exports = {
  server: log4js.getLogger("server"),
  express: log4js.getLogger("express"),
  configure: function() {
    log4js.configure("logger/log4js.json");
  }
};
