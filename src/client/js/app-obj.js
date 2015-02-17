define(function(require) {
  var $ = require('jquery');
  var Backbone = require('backbone');
  var Marionette = require('marionette');

  // Set up app object
  var PF = new Marionette.Application();
  PF.config = require('js/app-config');

  // Set up regions
  PF.addRegions({
    'region_navbar': 'div#region_navbar',
    'region_main': 'div#region_main',
    'region_footer': 'div#region_footer'
  });

  // Set application to start after initialisation
  PF.on('initialize:after', function(options) {
    Backbone.history.start({ // assume router already required elsewhere, e.g. in main.js
      pushState: true
    });
  });

  return PF;
});
