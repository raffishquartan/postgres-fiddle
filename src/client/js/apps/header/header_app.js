define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/header/header_app');
  logger.trace('require:lambda - enter');

  PF.module('HeaderApp', function(HeaderApp, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module:HeaderApp - enter');
    var API = {
      show_header: function() {
        logger.trace('HeaderApp.API.show_header - enter');
        var controller = require('js/apps/header/show/controller');
        controller.show_header();
        logger.trace('HeaderApp.API.show_header - exit');
      },
    };

    HeaderApp.on("start", function() {
      logger.trace("HeaderApp.event:start - enter");
      API.show_header();
      logger.trace("HeaderApp.event:start - exit");
    })
    logger.trace('PF.module:HeaderApp - exit');
  });

  logger.trace('require:lambda - exit');
  return PF.HeaderApp;
});
