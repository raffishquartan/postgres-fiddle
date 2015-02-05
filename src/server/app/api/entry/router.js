'use strict';

function get_entry_json(req, res) {
  res.status(200).send('{ foo: "bar" }');
}

var express = require('express');
var router = new express.Router();
router.get('/:tag_string?', get_entry_json);

module.exports = router;
