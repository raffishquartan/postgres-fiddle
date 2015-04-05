define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/header/show/view');
  logger.trace('require:lambda -- enter');

  PF.module('HeaderApp.Show.Views', function(Views, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    require('js/common/views');

    Views.NavItemView = PF.Common.Views.PFItemView.extend({
      __name: 'NavItemView',
      template: _.template(require('text!js/apps/header/show/templates/navitem.html')),
      tagName: 'li',

      triggers: {
        'click a.js-navitem': 'navigate'
      },

      onRender: function() {
        if(this.model.selected) {
          this.$el.addClass('active');
        }
      }
    });

    Views.Header = PF.Common.Views.PFCompositeView.extend({
      __name: 'Header',
      template: _.template(require('text!js/apps/header/show/templates/header.html')),
      childView: Views.NavItemView,
      childViewContainer: 'ul.js-navbar-items',

      triggers: {
        'click a.js-brand': 'brand_clicked'
      }
    });

    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.HeaderApp.Show.Views;
});
