define(function(require) {
  'use strict';

  var q = require('q');

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/entry/list/controller');
  logger.trace('require:lambda -- enter');

  PF.module('EntryApp.List', function(List, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    List.controller = {
      show_list: function(tag_string) {
        logger.trace('show_list -- enter - ' + tag_string);
        require('js/apps/entry/entities');
        var tags_promise = PF.request('entryapp:entities:tags');
        var entries_promise = PF.request('entryapp:entities:entries', tag_string);
        q.all([tags_promise, entries_promise])
        .spread(function(tags, entries) {
          var Views = require('js/apps/entry/list/views');
          var view = new Views.ListLayout();

          var tags_view = new Views.Tags({ collection: tags });
          tags_view.on('childview:navigate', function(args) {
            logger.trace('event - tags_view:childview:navigate -- enter w/ ' + args.model.get('value'));
            PF.trigger('entry:list', args.model.get('value'));
          });

          var FWC = require('js/common/filtering_wrapper_collection').FilteringWrapperCollection;
          var filterable_entries = FWC({
            collection: entries,
            filter_generator: function() {
              return function(entry) {
                return _.any(entry.get('tags'), function(tag) { return tag.value === tag_string; });
              };
            }
          });
          filterable_entries.filter(tag_string);

          var entries_view = new Views.Entries({ collection: filterable_entries });

          view.on('show', function() {
            view.tags_region.show(tags_view);
            view.entries_region.show(entries_view);
          });

          PF.region_main.show(view);
        });

        logger.trace('show_list -- exit');
      }
    };
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.EntryApp.List.controller;
});
