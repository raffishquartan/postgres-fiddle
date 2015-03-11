'use strict';

var logger_module = require('app/util/logger');

function get_entry_json(req, res, next) {
  res.status(200).send('{ tag: "' + req.params.tag_string + '" }');
}

var express = require('express');
var router = new express.Router();
router.get('/:tag_string?', get_entry_json);

module.exports = router;
