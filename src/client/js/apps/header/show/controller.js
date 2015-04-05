define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/header/show/controller');
  logger.trace('require:lambda -- enter');

  PF.module('HeaderApp.Show', function(Show, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    Show.controller = {
      show_header: function() {
        logger.trace('show_header -- enter');
        require('js/apps/header/entities');
        var Views = require('js/apps/header/show/views');
        var navitem_collection_promise = PF.request('headerapp:entities:navitems');
        navitem_collection_promise.then(function(navitem_collection) {
          var view = new Views.Header({ collection: navitem_collection });

          view.on('brand_clicked', function() {
            logger.trace('event - brand_clicked -- enter');
            PF.trigger('home:show');
            logger.trace('event - brand_clicked -- exit');
          });

          view.on('childview:navigate', function(args) {
            logger.trace('event - childview:navigate -- enter w/ ' + args.model.get('nav_trigger'));
            PF.trigger(args.model.get('nav_trigger'));
            logger.trace('event - childview:navigate -- exit');
          });

          PF.region_navbar.show(view);
        });
        logger.trace('show_header -- exit');
      },

      set_active_navitem: function(url) {
        logger.debug('set_active_navitem -- setting ' + url + ' to active');
        require('backbone_picky');
        require('js/apps/header/entities');
        var navitem_collection_promise = PF.request('headerapp:entities:navitems');
        navitem_collection_promise.then(function(navitem_collection) {
          var navitem_to_select = navitem_collection.find(function(navitem) {
            return navitem.get('url') === url;
          });
          if(navitem_to_select) {
            navitem_to_select.select();
            navitem_collection.trigger('reset');
          }
          else { // deselect all nav items in this menu (navitem url is not in this menu)
            logger.warn('Navitem to select is not in main navbar: ' + url);
            navitem_collection.each(function(navitem) {
              navitem.deselect();
            });
            navitem_collection.trigger('reset');
          }
        });
        logger.trace('set_active_navitem -- exit');
      }
    };
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.HeaderApp.Show.controller;
});
