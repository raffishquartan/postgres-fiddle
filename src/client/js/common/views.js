define(function(require) {
  var PF = require('js/app/obj');

  PF.module('Common.Views', function(Views, PF, Backbone, Marionette, $, _) {
    Views.PFItemView = Marionette.ItemView.extend();

    Views.PFCollectionView = Marionette.CollectionView.extend();

    Views.PFCompositeView = Marionette.CompositeView.extend();

    Views.PFLayout = Marionette.LayoutView.extend();
  });
});
