define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/about/about_app');
  logger.trace('require:lambda -- enter');

  PF.module('AboutApp', function(AboutApp, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    AboutApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'about': 'show_about',
      }
    });

    var API = {
      show_about: function() {
        logger.trace('API.show_about -- enter');
        var controller = require('js/apps/about/show/controller');
        controller.show_about();
        PF.execute('headerapp:set_active_navitem', 'about');
        logger.trace('API.show_about -- exit');
      },
    };

    PF.on('about:show', function() {
      logger.trace('PF.event - about:show -- enter');
      PF.navigate('about');
      API.show_about();
      logger.trace('PF.event - about:show -- exit');
    });

    PF.addInitializer(function() {
      logger.trace('PF.addInitializer -- enter');
      (function() {
        return new AboutApp.Router({
          controller: API
        });
      }());
      logger.trace('PF.addInitializer -- exit');
    });
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.AboutApp;
});
