define(function(require) {
  var PF = require('js/app-obj');

  PF.module('HomeApp.Show.Views', function(Views, PF, Backbone, Marionette, $, _) {
    require('js/common/views');

    Views.Home = PF.Common.Views.PFItemView.extend({
      template: _.template(require('text!js/apps/home/show/templates/home.html')),
    });
  });

  return PF.HomeApp.Show.Views;
});
