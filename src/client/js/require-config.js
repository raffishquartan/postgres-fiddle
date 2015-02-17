require.config({
  shim: {
    bootstrap: {
      deps: ["jquery"],
      exports: "$.fn.popover"
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    marionette: {
      deps: ["jquery", "underscore", "backbone"],
      exports: "Marionette"
    },
    underscore: {
      exports: "_"
    }
  },
  paths: {
    backbone: "../bower_components/backbone/backbone",
    bootstrap: "../bower_components/bootstrap/dist/js/bootstrap",
    jquery: "../bower_components/jquery/dist/jquery",
    require: "../bower_components/requirejs/require",
    marionette: "../bower_components/marionette/lib/backbone.marionette",
    underscore: "../bower_components/underscore/underscore"
  },
  urlArgs: "bust=" + (new Date()).getTime() // development only
});
