define(function(require) {
  'use strict';

  var q = require('q');
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/entry/entities');

  PF.module('EntryApp.Entities', function(Entities, PF, Backbone, Marionette, $, _) {
    require('js/common/entities');

    Entities.Entry = PF.Entities.PFDatabaseModel.extend({

    });

    Entities.EntryCollection = PF.Entities.PFDatabaseCollection.extend({
      model: Entities.Entry
    });

    Entities.Tag = PF.Entities.PFDatabaseModel.extend({
      initialize: function() {
        _.extend(this, new Backbone.Picky.Selectable(this));
      }
    });

    Entities.TagCollection = PF.Entities.PFDatabaseCollection.extend({
      model: Entities.Tag,

      initialize: function() {
        _.extend(this, new Backbone.Picky.SingleSelect(this));
      }
    });

    var initialize_entries = function() {
      Entities.entry_collection - new Entities.EntryCollection([
        { field: 1, other_field: 2, etc: 'foo' },
        { field: 1, other_field: 2, etc: 'foo' }
      ]);
    };

    var initialize_tags = function() {
      Entities.tag_collection - new Entities.TagCollection([
        { field: 1, other_field: 2, etc: 'foo' },
        { field: 1, other_field: 2, etc: 'foo' }
      ]);
    };

    var API = {
      get_entry_promise: function() {
        var deferred = q.defer();
        if(Entities.tag_collection === undefined) {
          initialize_entries();
        }
        deferred.resolve(Entities.entry_collection);
        return deferred.promise;
      },

      get_tag_promise: function() {
        var deferred = q.defer();
        if(Entities.tag_collection === undefined) {
          initialize_tags();
        }
        deferred.resolve(Entities.tag_collection);
        return deferred.promise;
      }
    };

    PF.reqres.setHandler('entryapp:entities:entries', function() {
      return API.get_entry_promise();
    });

    PF.reqres.setHandler('entryapp:entities:tags', function() {
      return API.get_tag_promise();
    })
  });

  return undefined;
});
