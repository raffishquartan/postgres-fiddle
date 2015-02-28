define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/header/show/controller');
  logger.trace('require:lambda -- enter');

  PF.module('HeaderApp.Show', function(Show, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    Show.controller = {
      show_header: function() {
        logger.trace('HeaderApp.Show.controller.show_header -- enter');
        require('js/apps/header/entities');
        var Views = require('js/apps/header/show/views');
        var navitem_collection = PF.request('headerapp:entities:navitems');
        var view = new Views.Header({ collection: navitem_collection });
        PF.region_navbar.show(view);
        logger.trace('HeaderApp.Show.controller.show_header -- exit');
      }
    };
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.HeaderApp.Show.controller;
});
