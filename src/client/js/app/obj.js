define(function(require) {
  'use strict';

  var Backbone = require('backbone');
  var Marionette = require('marionette');

  // Set up app object
  var PF = new Marionette.Application();
  PF.config = require('js/app/config');
  PF.logger = require('js/app/logger_builder')(PF.config.logger);
  var logger = PF.logger.get('root/js/app/obj');
  logger.debug('require:lambda -- entered, PF built, config loaded, logger initialised');

  // Set up regions
  PF.addRegions({
    'region_navbar': 'div#region_navbar',
    'region_main': 'div#region_main',
    'region_footer': 'div#region_footer'
  });

  // Routing helpers
  PF.navigate = function(route, options) {
    options = options || {};
    Backbone.history.navigate(route, options);
  };

  PF.get_current_route = function() {
    return Backbone.history.fragment;
  };

  // Log all events at trace
  PF.on('all', function(event_string) {
    var events_logger = PF.logger.get('root/events_logger');
    events_logger.trace('PF.event -- events logger: ' + event_string);
  });

  // Set application to start after initialisation
  PF.on('start', function(options) {
    logger.trace('PF.event - start -- enter');
    if(Backbone.history) {
      Backbone.history.start({ // assume router already required elsewhere, e.g. in main.js
        pushState: true
      });

      if(Backbone.history.fragment === '') {
        PF.trigger('home:show');
      }
    }
    else {
      logger.error('Backbone.history is falsey: ' + Backbone.history);
    }
    logger.trace('PF.event - start -- exit');
  });

  logger.debug('require:lambda -- exited, PF regions and on-start listener initialised');
  return PF;
});
