define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/common/views');
  logger.trace('require:lambda -- enter');

  PF.module('Common.Views', function(Views, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    Views.PFItemView = Marionette.ItemView.extend({ __name: 'PFItemView' });
    Views.PFCollectionView = Marionette.CollectionView.extend({ __name: 'PFCollectionView' });
    Views.PFCompositeView = Marionette.CompositeView.extend({ __name: 'PFCompositeView' });
    Views.PFLayout = Marionette.LayoutView.extend({ __name: 'PFLayout' });
    Views.PFRegion = Marionette.Region.extend({ __name: 'PFRegion' });
    logger.trace('PF.module -- exit');
  });
  logger.trace('require:lambda -- exit');
});
