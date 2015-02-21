define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/footer/footer_app');
  logger.trace('require:lambda - enter');

  PF.module('FooterApp', function(FooterApp, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module:FooterApp - enter');
    var API = {
      show_footer: function() {
        logger.trace('FooterApp.API.show_footer - enter');
        var controller = require('js/apps/footer/show/controller');
        controller.show_footer();
        logger.trace('FooterApp.API.show_footer - exit');
      },
    };

    FooterApp.on("start", function() {
      logger.trace("FooterApp.event:start - enter");
      API.show_footer();
      logger.trace("FooterApp.event:start - exit");
    })
    logger.trace('PF.module:FooterApp - exit');
  });

  logger.trace('require:lambda - exit');
  return PF.FooterApp;
});
