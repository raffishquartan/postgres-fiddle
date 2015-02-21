define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/header/show/view');
  logger.trace('require:lambda - enter');

  PF.module('HeaderApp.Show.Views', function(Views, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module:HeaderApp.Show.Views - enter');
    require('js/common/views');

    Views.Header = PF.Common.Views.PFItemView.extend({
      template: _.template(require('text!js/apps/header/show/templates/header.html')),
    });
    logger.trace('PF.module:HeaderApp.Show.Views - exit');
  });

  logger.trace('require:lambda - exit');
  return PF.HeaderApp.Show.Views;
});
