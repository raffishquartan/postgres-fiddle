define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/apps/entry/list/view');
  logger.trace('require:lambda -- enter');

  PF.module('EntryApp.List.Views', function(Views, PF, Backbone, Marionette, $, _) {
    logger.trace('PF.module -- enter');
    require('js/common/views');

    Views.Tag = PF.Common.Views.PFItemView.extend({
      __name: 'Tag',
      template: _.template(require('text!js/apps/entry/list/templates/tag.html')),
      tagName: 'li',

      triggers: {
        'click a.js-tag': 'navigate'
      }
    });

    Views.Tags = PF.Common.Views.PFCompositeView.extend({
      __name: 'Tags',
      template: _.template(require('text!js/apps/entry/list/templates/tags.html')),
      childView: Views.Tag,
      childViewContainer: 'ul.js-tag-items'
    });

    Views.Entry = PF.Common.Views.PFItemView.extend({
      __name: 'Entry',
      template: _.template(require('text!js/apps/entry/list/templates/entry.html')),
      tagName: 'li',

      triggers: {
        'click a.js-tag': 'navigate'
      }
    });

    Views.Entries = PF.Common.Views.PFCompositeView.extend({
      __name: 'Entries',
      template: _.template(require('text!js/apps/entry/list/templates/entries.html')),
      childView: Views.Entry,
      childViewContainer: 'ul.js-entry-items'
    });

    Views.ListLayout = PF.Common.Views.PFLayout.extend({
      __name: 'ListLayout',
      template: _.template(require('text!js/apps/entry/list/templates/list_layout.html')),
      regions: {
        tags_region: '#tags_region',
        entries_region: '#entries_region'
      }
    });

    logger.trace('PF.module -- exit');
  });

  logger.trace('require:lambda -- exit');
  return PF.EntryApp.List.Views;
});
