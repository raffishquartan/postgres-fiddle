define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/about/show/controller');
  logger.trace('require:lambda -- enter');

  PF.module('AboutApp.Show', function(Show, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    Show.controller = {
      show_about: function() {
        logger.trace('AboutApp.Show.controller.show_about -- enter');
        var Views = require('js/apps/about/show/views');
        var view = new Views.About();
        PF.region_main.show(view);
        logger.trace('AboutApp.Show.controller.show_about -- exit');
      }
    };
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.AboutApp.Show.controller;
});
