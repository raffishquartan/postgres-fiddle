  define(function(require) {
  var PF = require('js/app/obj');

  PF.module('HomeApp.Show', function(Show, PF, Backbone, Marionette, $, _) {
    Show.controller = {
      show_home: function() {
        var Views = require('js/apps/home/show/views');
        var view = new Views.Home();
        PF.region_main.show(view);
      }
    };
  });

  return PF.HomeApp.Show.controller;
});
