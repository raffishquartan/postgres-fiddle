define(function(require) {
  'use strict';

  var q = require('q');
  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/header/entities');

  PF.module('HeaderApp.Entities', function(Entities, PF, Backbone, Marionette, $, _) {
    require('js/common/base_entities');

    Entities.NavItem = PF.Entities.PFClientOnlyModel.extend({
      __name: 'NavItem',
      initialize: function() {
        logger.trace('NavItem.initialize -- enter w/ url: ' + this.get('url'));
        _.extend(this, new Backbone.Picky.Selectable(this));
        logger.trace('NavItem.initialize -- exit');
      }
    });

    Entities.NavItemCollection = PF.Entities.PFClientOnlyCollection.extend({
      __name: 'NavItemCollection',
      model: Entities.NavItem,

      initialize: function() {
        logger.trace('NavItemCollection.initialize -- enter');
        _.extend(this, new Backbone.Picky.SingleSelect(this));
        logger.trace('NavItemCollection.initialize -- exit');
      }
    });

    var initialize_navitems = function() {
      logger.trace('initialize_navitems -- enter');
      Entities.navitem_collection = new Entities.NavItemCollection([
        { name: 'Home Page',  url: 'home',  nav_trigger: 'home:show',   icon: 'glyphicon-home' },
        { name: 'Entries',    url: 'entry', nav_trigger: 'entry:list',  icon: 'glyphicon-th-list' },
        { name: 'About',      url: 'about', nav_trigger: 'about:show',  icon: 'glyphicon-tree-conifer' }
      ]);
      logger.trace('initialize_navitems -- exit');
    };

    var API = {
      get_navitem_promise: function() {
        logger.trace('API.get_navitems_promise -- enter');
        var deferred = q.defer();
        if(Entities.navitem_collection === undefined) {
          logger.trace('API.get_navitems_promise -- initializing navitems');
          initialize_navitems();
        }
        deferred.resolve(Entities.navitem_collection);
        logger.trace('API.get_navitems_promise -- exit');
        return deferred.promise;
      }
    };

    PF.reqres.setHandler('headerapp:entities:navitems', function() {
      logger.trace('PF.reqres - headerapp:entities:navitems -- enter');
      var result = API.get_navitem_promise();
      logger.trace('PF.reqres - headerapp:entities:navitems -- exit');
      return result;
    });
  });

  return undefined;
});
