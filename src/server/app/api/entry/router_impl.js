'use strict';

var _ = require('underscore');

var logger_module = require('app/util/logger');
var logger = logger_module.get('app/api/entry/router_impl');

/*
var pr = require('pr');
var q = require('q');
pr.sq.sync({ force: true })
.then(function() {
  var hard_coded_tag_promises = q.all([
    pr.pr.entry.tag.create({value: 'foo'}),
    pr.pr.entry.tag.create({value: 'bar'}),
    pr.pr.entry.tag.create({value: 'baz'})
  ]);

  var hard_coded_entry_promises = q.all([
    pr.pr.entry.entry.create({
      body: 'This is entry 0. Here is some text.',
      date: new Date(2015, 2, 10)
    }), pr.pr.entry.entry.create({
      body: 'This is entry one. Here is some more text.',
      date: new Date(2015, 2, 10)
    }), pr.pr.entry.entry.create({
      body: 'This is entry tertius III. Here is interesting text.',
      date: new Date(2015, 2, 12)
    }), pr.pr.entry.entry.create({
      body: 'this is entry iv i dont know punctuation',
      date: new Date(2015, 2, 11)
    }), pr.pr.entry.entry.create({
      body: 'This is entry si4 with id 5 and a fullstop.',
      date: new Date(2015, 2, 13)
    }), pr.pr.entry.entry.create({
      body: 'This is entry hex. Should I be a magical curse?',
      date: new Date(2015, 2, 14)
    })
  ]);
  return q.all([hard_coded_tag_promises, hard_coded_entry_promises]);
})
.spread(function(hard_coded_tags, hard_coded_entries) {
  return q.all([
    hard_coded_entries[0].setTags([hard_coded_tags[0], hard_coded_tags[1]]),
    hard_coded_entries[1].setTags([hard_coded_tags[2]]),
    hard_coded_entries[2].setTags([hard_coded_tags[1], hard_coded_tags[2]]),
    hard_coded_entries[3].setTags([hard_coded_tags[0]]),
    hard_coded_entries[4].setTags([hard_coded_tags[1]]),
    hard_coded_entries[5].setTags([hard_coded_tags[0], hard_coded_tags[1], hard_coded_tags[2]])
  ]);
})
.done();
*/

module.exports = {
  /**
   * Returns JSON for all entries which match an (optional) tag string, does not call next()
   */
  get_entries: function (pr, req, res, next) {
    logger.trace('exports.get_entries -- enter');
    if(req.params.tag_string) {
      pr.pr.entry.tag.find({
        where: { value: req.params.tag_string },
        include: [{ model: pr.pr.entry.entry, include: [pr.pr.entry.tag] }]
      })
      .then(function(tag) {
        res.status(200).send(_.map(tag.entries, function(entry) {
          return entry.get({ plain: true});
        }));
      })
      .done();
    }
    else {
      pr.pr.entry.entry.findAll({ include: [{model: pr.pr.entry.tag }]})
      .then(function(entry_instances) {
        res.status(200).send(_.map(entry_instances, function(entry) { return entry.get({ plain: true }); }));
      })
      .done();
    }
  },

  /**
   * Returns JSON for all tags, does not call next()
   */
  get_tags: function (pr, req, res, next) {
    logger.trace('exports.get_tags -- enter');
    pr.pr.entry.tag.findAll()
    .then(function(tag_instances) {
      res.status(200).send(_.map(tag_instances, function(tag) { return tag.get({ plain: true}); }));
    });
  }
};
