'use strict';

// No logger defined or used because file code is just Express glue

var express = require('express');
var router = new express.Router();

router.use('/entry', require('app/api/entry/router'));

module.exports = router;
