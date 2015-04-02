define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/common/base_entities');
  logger.trace('require:lambda -- enter');

  PF.module('Entities', function(Entities, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    Entities.PFDatabaseModel = Backbone.Model.extend({
      idAttribute: '_id',
    });

    Entities.PFDatabaseCollection = Backbone.Collection.extend();

    // Base class for model which represent client-only data, i.e. not directly fetched or saved to server
    Entities.PFClientOnlyModel = Backbone.Model.extend();
    Entities.PFClientOnlyModel.prototype.sync = function() {
      logger.warn('Entities.PFClientOnlyModel.sync called, method does nothing and returns null');
      return null;
    };
    Entities.PFClientOnlyModel.prototype.fetch = function() {
      logger.warn('Entities.PFClientOnlyModel.fetch called, method does nothing and returns null');
      return null;
    };
    Entities.PFClientOnlyModel.prototype.save = function() {
      logger.warn('Entities.PFClientOnlyModel.save called, method does nothing and returns null');
      return null;
    };

    // Base class for collections which represent client-only data, i.e. not directly fetched or saved to server
    Entities.PFClientOnlyCollection = Backbone.Collection.extend();
    Entities.PFClientOnlyCollection.prototype.sync = function() {
      logger.warn('Entities.PFClientOnlyCollection.sync called, method does nothing and returns null');
      return null;
    };
    Entities.PFClientOnlyCollection.prototype.fetch = function() {
      logger.warn('Entities.PFClientOnlyCollection.fetch called, method does nothing and returns null');
      return null;
    };
    Entities.PFClientOnlyCollection.prototype.save = function() {
      logger.warn('Entities.PFClientOnlyCollection.save called, method does nothing and returns null');
      return null;
    };
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return undefined;
});
