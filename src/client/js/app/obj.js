define(function(require) {
  var Backbone = require('backbone');
  var Marionette = require('marionette');

  // Set up app object
  var PF = new Marionette.Application();
  PF.config = require('js/app/config');
  PF.logger = require('js/app/logger_builder')(PF.config.logger);
  var logger = PF.logger.get_logger('root/js/app/obj');
  logger.debug('require:lambda - entered, PF built, config loaded, logger initialised');

  // Set up regions
  PF.addRegions({
    'region_navbar': 'div#region_navbar',
    'region_main': 'div#region_main',
    'region_footer': 'div#region_footer'
  });

  // Set application to start after initialisation
  PF.on('initialize:after', function(options) {
    logger.trace('PF.event:initialize:after - enter');
    Backbone.history.start({ // assume router already required elsewhere, e.g. in main.js
      pushState: true
    });
    logger.trace('PF.event:initialize:after - exit');
  });

  logger.debug('require:lambda - exit');
  return PF;
});
