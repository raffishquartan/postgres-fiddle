define(function(require) {
  var PF = require('js/app/obj');
  var logger = PF.logger.get_logger('root/js/common/views');
  logger.trace('require:lambda -- enter');

  PF.module('Common.Views', function(Views, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    Views.PFItemView = Marionette.ItemView.extend();
    Views.PFCollectionView = Marionette.CollectionView.extend();
    Views.PFCompositeView = Marionette.CompositeView.extend();
    Views.PFLayout = Marionette.LayoutView.extend();
    Views.PFRegion = Marionette.Region.extend();
    logger.trace('PF.module -- exit');
  });
  logger.trace('require:lambda -- exit');
});
