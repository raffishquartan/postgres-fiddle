// NO LOGGING IN THIS FILE

require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: '$.fn.popover'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    backbone_picky: ['backbone'],
    marionette: {
      deps: ['jquery', 'underscore', 'backbone'],
      exports: 'Marionette'
    },
    underscore: {
      exports: '_'
    }
  },
  paths: {
    backbone: '/bower_components/backbone/backbone',
    backbone_picky: '/bower_components/backbone.picky/lib/amd/backbone.picky.min',
    bootstrap: '/bower_components/bootstrap/dist/js/bootstrap',
    jquery: '/bower_components/jquery/dist/jquery',
    marionette: '/bower_components/marionette/lib/backbone.marionette',
    moment: '/bower_components/moment/min/moment-with-locales.min',
    q: '/bower_components/q/q',
    text: '/bower_components/requirejs-text/text',
    underscore: '/bower_components/underscore/underscore'
  },
  urlArgs: 'bust=' + (new Date()).getTime() // development only
});
