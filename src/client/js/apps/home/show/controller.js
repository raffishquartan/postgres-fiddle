define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/home/show/controller');
  logger.trace('require:lambda -- enter');

  PF.module('HomeApp.Show', function(Show, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    Show.controller = {
      show_home: function() {
        logger.trace('show_home -- enter');
        var Views = require('js/apps/home/show/views');
        var view = new Views.Home();
        PF.region_main.show(view);
        logger.trace('show_home -- exit');
      }
    };
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.HomeApp.Show.controller;
});
