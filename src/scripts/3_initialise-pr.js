'use strict';

var pr = require('../server/app/util/pr');
var q = require('../server/node_modules/q');

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
.then(function() {
  pr.sq.close();
})
.done();
