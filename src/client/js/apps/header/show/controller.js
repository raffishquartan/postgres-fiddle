define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/header/show/controller');
  logger.trace('require:lambda - enter');

  PF.module('HeaderApp.Show', function(Show, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module:HeaderApp.Show - enter');
    Show.controller = {
      show_header: function() {
        logger.trace('HeaderApp.Show.controller.show_header - enter');
        var Views = require('js/apps/header/show/views');
        var view = new Views.Header();
        PF.region_navbar.show(view);
        logger.trace('HeaderApp.Show.controller.show_header - exit');
      }
    };
    logger.trace('PF.module:HeaderApp.Show - exit');
  });

  logger.trace('require:lambda - exit');
  return PF.HeaderApp.Show.controller;
});
