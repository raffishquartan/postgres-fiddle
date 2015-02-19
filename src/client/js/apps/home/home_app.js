define(function(require) {
  var PF = require('js/app-obj');

  PF.module('HomeApp', function(HomeApp, PF, Backbone, Marionette, $, _) {
    HomeApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        '': 'show_home',
      }
    });

    var API = {
      show_home: function() {
        var controller = require('js/apps/home/show/controller');
        controller.show_home();
      },
    };

    PF.on('home:show', function() {
      PF.navigate('');
      API.show_home();
    });

      PF.addInitializer(function(){
          new HomeApp.Router({
            controller: API
          });
      });
  });

  return PF.HomeApp;
})
