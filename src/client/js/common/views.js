define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/app/obj');
  logger.trace('require:lambda - enter');

  PF.module('Common.Views', function(Views, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module:Common.Views - enter');
    Views.PFItemView = Marionette.ItemView.extend();

    Views.PFCollectionView = Marionette.CollectionView.extend();

    Views.PFCompositeView = Marionette.CompositeView.extend();

    Views.PFLayout = Marionette.LayoutView.extend();
    logger.trace('PF.module:Common.Views - exit');
  });
  logger.trace('require:lambda - exit');
});
