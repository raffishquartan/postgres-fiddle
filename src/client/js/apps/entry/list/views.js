define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/apps/entry/list/view');
  logger.trace('require:lambda -- enter');

  PF.module('EntryApp.List.Views', function(Views, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    require('js/common/views');

    Views.List = PF.Common.Views.PFItemView.extend({
      template: _.template(require('text!js/apps/entry/list/templates/list.html')),
    });
    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.EntryApp.List.Views;
});
