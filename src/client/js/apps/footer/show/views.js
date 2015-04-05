define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/footer/show/view');
  logger.trace('require:lambda -- enter');

  PF.module('FooterApp.Show.Views', function(Views, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    require('js/common/views');

    Views.Footer = PF.Common.Views.PFItemView.extend({
      template: _.template(require('text!js/apps/footer/show/templates/footer.html')),
    });
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.FooterApp.Show.Views;
});
