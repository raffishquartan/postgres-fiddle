define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/home/home_app');
  logger.trace('require:lambda -- enter');

  PF.module('HomeApp', function(HomeApp, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    HomeApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'home': 'show_home'
      }
    });

    var API = {
      show_home: function() {
        logger.trace('API.show_home -- enter');
        var controller = require('js/apps/home/show/controller');
        controller.show_home();
        PF.execute('headerapp:set_active_navitem', 'home');
        logger.trace('API.show_home -- exit');
      },
    };

    PF.on('home:show', function() {
      logger.trace('PF.event - home:show -- enter');
      PF.navigate('home');
      API.show_home();
      logger.trace('PF.event - home:show -- exit');
    });

    PF.addInitializer(function(){
      logger.trace('PF.addInitializer -- enter');
      (function() {
        return new HomeApp.Router({
          controller: API
        });
      }());
      logger.trace('PF.addInitializer -- exit');
    });
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.HomeApp;
});
