define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/home/show/view');
  logger.trace('require:lambda - enter');

  PF.module('HomeApp.Show.Views', function(Views, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module:HomeApp.Show.Views - enter');
    require('js/common/views');

    Views.Home = PF.Common.Views.PFItemView.extend({
      template: _.template(require('text!js/apps/home/show/templates/home.html')),
    });
    logger.trace('PF.module:HomeApp.Show.Views - exit');
  });

  logger.trace('require:lambda - exit');
  return PF.HomeApp.Show.Views;
});
