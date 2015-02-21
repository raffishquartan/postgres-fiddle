define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/home/show/controller');
  logger.trace('require:lambda - enter');

  PF.module('HomeApp.Show', function(Show, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module:HomeApp.Show - enter');
    Show.controller = {
      show_home: function() {
        logger.trace('HomeApp.Show.controller.show_home - enter');
        var Views = require('js/apps/home/show/views');
        var view = new Views.Home();
        PF.region_main.show(view);
        logger.trace('HomeApp.Show.controller.show_home - exit');
      }
    };
    logger.trace('PF.module:HomeApp.Show - exit');
  });

  logger.trace('require:lambda - exit');
  return PF.HomeApp.Show.controller;
});
