'use strict';

//var pr = require('app/util/pr');
var logger_module = require('app/util/logger');
var logger = logger_module.get('app/api/entry/router');

var hard_coded_tags = ['foo', 'bar', 'baz'];
var hard_coded_entries = [{
  id: '0',
  body: 'This is entry 0. Here is some text.',
  date: new Date(2015, 2, 10),
  tags: ['foo', 'bar']
}, {
  id: '1',
  body: 'This is entry one. Here is some more text.',
  date: new Date(2015, 2, 10),
  tags: ['baz']
}, {
  id: '2',
  body: 'This is entry tertius III. Here is interesting text.',
  date: new Date(2015, 2, 12),
  tags: ['bar', 'baz']
}, {
  id: '3',
  body: 'this is entry iv i dont know punctuation',
  date: new Date(2015, 2, 11),
  tags: ['foo']
}, {
  id: '4',
  body: 'This is entry si4 with id 5 and a fullstop.',
  date: new Date(2015, 2, 13),
  tags: ['bar']
}, {
  id: '5',
  body: 'This is entry hex. Should I be a magical curse?',
  date: new Date(2015, 2, 14),
  tags: ['foo', 'bar', 'baz']
}];

/**
 * Returns JSON for all entries which match an (optional) tag string
 */
function get_entry(req, res, next) {
  logger.trace('get_entry - stub message');
  if(req.params.tag_string) {
    res.status(200).send(hard_coded_entries.filter(function(entry) {
      return entry.tags.indexOf(req.params.tag_string) !== -1;
    }));
  }
  else {
    res.status(200).send(hard_coded_entries);
  }
}

/**
 * Returns JSON for all tags
 */
function get_tags(req, res, next) {
  logger.trace('get_tags - stub message');
  res.status(200).send(hard_coded_tags);
}

var express = require('express');
var router = new express.Router();
router.get('/entry/:tag_string?', get_entry);
router.get('/tags', get_tags);

module.exports = router;
