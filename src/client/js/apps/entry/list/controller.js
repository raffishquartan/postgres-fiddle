define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/entry/list/controller');
  logger.trace('require:lambda -- enter');

  PF.module('EntryApp.List', function(List, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    List.controller = {
      show_list: function() {
        logger.trace('show_list -- enter');
        var Views = require('js/apps/entry/list/views');
        var view = new Views.List();
        PF.region_main.show(view);
        logger.trace('show_list -- exit');
      }
    };
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.EntryApp.List.controller;
});
