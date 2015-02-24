define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/about/about_app');
  logger.trace('require:lambda - enter');

  PF.module('AboutApp', function(AboutApp, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module:AboutApp - enter');
    AboutApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'about': 'show_about',
      }
    });

    var API = {
      show_about: function() {
        logger.trace('AboutApp.API.show_about - enter');
        var controller = require('js/apps/about/show/controller');
        controller.show_about();
        logger.trace('AboutApp.API.show_about - exit');
      },
    };

    PF.on('about:show', function() {
      logger.trace('PF.event:about:show AboutApp - enter');
      PF.navigate('about');
      API.show_about();
      logger.trace('PF.event:about:show AboutApp - exit');
    });

    PF.addInitializer(function(){
      logger.trace('PF.addInitializer:AboutApp - enter');
      new AboutApp.Router({
        controller: API
      });
      logger.trace('PF.addInitializer:AboutApp - exit');
    });
    logger.trace('PF.module:AboutApp - exit');
  });

  logger.trace('require:lambda - exit');
  return PF.AboutApp;
});
