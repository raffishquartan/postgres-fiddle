define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/header/entities');

  PF.module('HeaderApp.Entities', function(Entities, PF, Backbone, Marionette, $, _) {
    require('js/entities/common');

    Entities.NavItem = PF.Entities.PFClientOnlyModel.extend({
      initialize: function() {
        require('backbone_picky');
        _.extend(this, new Backbone.Picky.Selectable(this));
      }
    });

    Entities.NavItemCollection = PF.Entities.PFClientOnlyCollection.extend({
      initialize: function() {
        require('backbone_picky');
        _.extend(this, new Backbone.Picky.SingleSelect(this));
      }
    });

    var initialize_navitems = function() {
      logger.trace('HeaderApp.Entities - initialize_navitems -- enter');
      Entities.navitem_collection = new Entities.NavItemCollection([
        { name: 'Home Page',  url: 'home',    icon: 'glyphicon-home' },
        { name: 'Wins',       url: 'wins',    icon: 'glyphicon-th-list' },
        { name: 'About',      url: 'about',   icon: 'glyphicon-tree-conifer' }
      ]);
      logger.trace('HeaderApp.Entities - initialize_navitems -- exit');
    };

    var API = {
      get_navitems: function() {
        logger.trace('HeaderApp.Entities - API.get_navitems -- enter');
        if(Entities.navitem_collection === undefined) {
          logger.trace('HeaderApp.Entities - API.get_navitems -- initializing navitems');
          initialize_navitems();
        }
        logger.trace('HeaderApp.Entities - API.get_navitems -- exit');
        return Entities.navitem_collection;
      }
    };

    PF.reqres.setHandler('headerapp:entities:navitems', function() {
      logger.trace('PF.reqres - headerapp:entitites:navitems -- enter, exit');
      return API.get_navitems();
    })
  });

  return undefined;
});
