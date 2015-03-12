'use strict';

var db_module = require('app/util/db');
var logger_module = require('app/util/logger');
var logger = logger_module.get_logger('app/api/entry/router');

function get_entry_json(req, res, next) {
  var query_promise = db_module.run_query('select * from pf.entry');

  query_promise
  .then(function(query_result) {
    query_result.on('row', function(row, result) {
      result.addRow(row);
    });
    query_result.on('error', function(err) {
      logger.error('ERROR: ' + JSON.stringify(err));
    });
    query_result.on('end', function(result) {
      logger.debug('QUERY ENDED: ' + JSON.stringify(result));
      query_promise.done();
    });
    res.status(200).send('{ tag: "' + req.params.tag_string + '" }');
  })
  .fail(function(err) {
    logger.error('Error getting connection from pool: ' + JSON.stringify(err));
    res.status(500).send('{ error_tag: "' + req.params.tag_string + '" }');
  });
}

var express = require('express');
var router = new express.Router();
router.get('/:tag_string?', get_entry_json);

module.exports = router;
