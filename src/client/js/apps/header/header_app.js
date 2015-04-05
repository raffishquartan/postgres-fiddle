define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/header/header_app');
  logger.trace('require:lambda -- enter');

  PF.module('HeaderApp', function(HeaderApp, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    var API = {
      show_header: function() {
        logger.trace('API.show_header -- enter');
        var controller = require('js/apps/header/show/controller');
        controller.show_header();
        logger.trace('API.show_header -- exit');
      },
    };

    PF.commands.setHandler('headerapp:set_active_navitem', function(url) {
      HeaderApp.Show.controller.set_active_navitem(url);
    });

    HeaderApp.on('start', function() {
      logger.trace('HeaderApp.event - start -- enter');
      API.show_header();
      logger.trace('HeaderApp.event - start -- exit');
    });
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.HeaderApp;
});
