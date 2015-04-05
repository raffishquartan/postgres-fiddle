define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/common/base_entities');
  logger.trace('require:lambda -- enter');

  PF.module('Entities', function(Entities, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    require('js/common/backbone_extensions');

    Entities.PFDatabaseModel = Backbone.Model.extend({ __name: 'PFDatabaseModel' });
    Entities.PFDatabaseCollection = Backbone.Collection.extend({ __name: 'PFDatabaseCollection' });

    // Base class for model which represent client-only data, i.e. not directly fetched or saved to server
    Entities.PFClientOnlyModel = Backbone.Model.extend({ __name: 'PFClientOnlyModel' });
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
    Entities.PFClientOnlyCollection = Backbone.Collection.extend({ __name: 'PFClientOnlyCollection' });
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
