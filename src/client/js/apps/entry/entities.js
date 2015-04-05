define(function(require) {
  'use strict';

  var q = require('q');
  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/entry/entities');

  PF.module('EntryApp.Entities', function(Entities, PF, Backbone, Marionette, $, _) {
    require('js/common/base_entities');

    Entities.Entry = PF.Entities.PFDatabaseModel.extend({
      __name: 'Entry',
      urlRoot: '/api/entry/entry'
    });

    Entities.EntryCollection = PF.Entities.PFDatabaseCollection.extend({
      __name: 'EntryCollection',
      url: '/api/entry/entry',
      model: Entities.Entry
    });

    Entities.Tag = PF.Entities.PFDatabaseModel.extend({
      __name: 'Tag',
      urlRoot: '/api/entry/tag',
      initialize: function() {
        _.extend(this, new Backbone.Picky.Selectable(this));
      }
    });

    Entities.TagCollection = PF.Entities.PFDatabaseCollection.extend({
      __name: 'TagCollection',
      url: '/api/entry/tag',
      model: Entities.Tag,

      initialize: function() {
        _.extend(this, new Backbone.Picky.SingleSelect(this));
      }
    });

    var API = {
      // TODO: Use tag_string to filter returned entries when fetching from DB
      get_entries_promise: function(tag_string) {
        logger.trace('API.get_entries_promise -- enter');
        var deferred = q.defer();
        var entry_collection = new Entities.EntryCollection();
        entry_collection.fetch({
          success: function(entry_collection) { deferred.resolve(entry_collection); },
          error: function() { deferred.resolve(undefined); }
        });
        return deferred.promise;
      },

      get_tags_promise: function() {
        logger.trace('API.get_tags_promise -- enter');
        var deferred = q.defer();
        var tag_collection = new Entities.TagCollection();
        tag_collection.fetch({
          success: function(tag_collection) { deferred.resolve(tag_collection); },
          error: function() { deferred.resolve(undefined); }
        });
        return deferred.promise;
      }
    };

    PF.reqres.setHandler('entryapp:entities:entries', function(tag_string) {
      return API.get_entries_promise(tag_string);
    });

    PF.reqres.setHandler('entryapp:entities:tags', function() {
      return API.get_tags_promise();
    });
  });

  return undefined;
});
