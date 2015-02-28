define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/header/entities');

  PF.module('HeaderApp.Entities', function(Entities, PF, Backbone, Marionette, $, _) {
    require('js/common/entities');

    Entities.NavItem = PF.Entities.PFClientOnlyModel.extend({
      initialize: function() {
        logger.trace('NavItem.initialize -- enter w/ url: ' + this.get('url'));
        _.extend(this, new Backbone.Picky.Selectable(this));
        logger.trace('NavItem.initialize -- exit');
      }
    });

    Entities.NavItemCollection = PF.Entities.PFClientOnlyCollection.extend({
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
        { name: 'Wins',       url: 'wins',  nav_trigger: 'NULLOP-NYI',  icon: 'glyphicon-th-list' },
        { name: 'About',      url: 'about', nav_trigger: 'about:show',  icon: 'glyphicon-tree-conifer' }
      ]);
      logger.trace('initialize_navitems -- exit');
    };

    var API = {
      get_navitems: function() {
        logger.trace('API.get_navitems -- enter');
        if(Entities.navitem_collection === undefined) {
          logger.trace('API.get_navitems -- initializing navitems');
          initialize_navitems();
        }
        logger.trace('API.get_navitems -- exit');
        return Entities.navitem_collection;
      }
    };

    PF.reqres.setHandler('headerapp:entities:navitems', function() {
      logger.trace('PF.reqres - headerapp:entities:navitems -- enter');
      var result = API.get_navitems();
      logger.trace('PF.reqres - headerapp:entities:navitems -- exit');
      return result;
    })
  });

  return undefined;
});
