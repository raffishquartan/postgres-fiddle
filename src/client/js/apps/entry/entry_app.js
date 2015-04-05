define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/entry/entry_app');
  logger.trace('require:lambda -- enter');

  PF.module('EntryApp', function(EntryApp, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    EntryApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'entry(/:tag_string)': 'show_list'
      }
    });

    var API = {
      show_list: function(tag_string) {
        logger.trace('API.show_list -- enter - tag_string: ' + tag_string);
        var controller = require('js/apps/entry/list/controller');
        controller.show_list(tag_string);
        PF.execute('headerapp:set_active_navitem', 'entry');
        logger.trace('API.show_list -- exit');
      },
    };

    PF.on('entry:list', function(tag_string) {
      logger.trace('PF.event - entry:list -- enter - tag_string: ' + tag_string);
      PF.navigate('entry' + (tag_string ? '/' + tag_string : ''));
      API.show_list(tag_string);
      logger.trace('PF.event - entry:list -- exit');
    });

    PF.addInitializer(function(){
      logger.trace('PF.addInitializer -- enter');
      (function() {
        return new EntryApp.Router({
          controller: API
        });
      }());
      logger.trace('PF.addInitializer -- exit');
    });
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.EntryApp;
});
