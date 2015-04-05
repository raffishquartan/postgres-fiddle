define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/about/show/view');
  logger.trace('require:lambda -- enter');

  PF.module('AboutApp.Show.Views', function(Views, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    require('js/common/views');

    Views.About = PF.Common.Views.PFItemView.extend({
      template: _.template(require('text!js/apps/about/show/templates/about.html')),
    });
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.AboutApp.Show.Views;
});
