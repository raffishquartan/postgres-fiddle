define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  var logger = PF.logger.get('root/js/common/filtering_wrapper_collection');

  PF.module('Entities', function(Entities, PF, Backbone, Marionette, $, _) {
    /**
     * Returns a collection decorated with filtering functionality, does not need to be called with 'new'
     *
     * @param {Object} options.collection The original backbone collection to filter
     * @param {Function} options.filter_generator A function that takes a criterion and returns a filtering function
     */
    Entities.FilteringWrapperCollection = function(options) {
      var original = options.collection;
      var filtered = new original.constructor();
      var current_criterion; // used to cache the current criterion ,for use on original:reset or :add
      var current_strategy; // used to cache the current strategy, for use on original:reset or :add

      filtered.add(original.models);
      filtered.filter_generator = options.filter_generator;

      // Create private reset function for filtered, wrap public methods w/ warning logs
      // NB: add is used by reset and set is used by add so their warns are conditional
      // logs (apart from add, which is used by reset, and set, used by add)
      var filtered_reset_pointer = filtered.reset;
      var doing_filtered_reset = false;
      var filtered_reset = function() {
        doing_filtered_reset = true;
        filtered_reset_pointer.apply(filtered, arguments);
        doing_filtered_reset = false;
      };
      filtered.add = function() {
        if(!doing_filtered_reset) {
          logger.warn('FilteringWrapperCollection should not be modified directly');
        }
        filtered.constructor.prototype.add.apply(filtered, arguments);
      };
      filtered.set = function() {
        if(!doing_filtered_reset) {
          logger.warn('FilteringWrapperCollection should not be modified directly');
        }
        filtered.constructor.prototype.set.apply(filtered, arguments);
      };
      filtered.remove = function() {
        logger.warn('FilteringWrapperCollection should not be modified directly');
        filtered.constructor.prototype.remove.apply(filtered, arguments);
      };
      filtered.reset = function() {
        logger.warn('FilteringWrapperCollection should not be modified directly');
        filtered.constructor.prototype.reset.apply(filtered, arguments);
      };
      filtered.push = function() {
        logger.warn('FilteringWrapperCollection should not be modified directly');
        filtered.constructor.prototype.push.apply(filtered, arguments);
      };
      filtered.pop = function() {
        logger.warn('FilteringWrapperCollection should not be modified directly');
        filtered.constructor.prototype.pop.apply(filtered, arguments);
      };
      filtered.shift = function() {
        logger.warn('FilteringWrapperCollection should not be modified directly');
        filtered.constructor.prototype.shift.apply(filtered, arguments);
      };
      filtered.unshift = function() {
        logger.warn('FilteringWrapperCollection should not be modified directly');
        filtered.constructor.prototype.unshift.apply(filtered, arguments);
      };

      /**
       * Applies the filter criterion and filter strategy to the collection, returning the matching models
       *
       * @param  {[type]} filter_criterion A function that takes a model and returns true or false ('filter') or,
       *                                   an object hash with property/value pairs ('where')
       * @param  {String} filter_strategy  Either 'filter' (a custom function) or 'where' (use _.where)
       * @param  {[type]} collection       The collection to apply the filter to, defaults to original
       * @return {[type]}                  An array of models selected by the filter
       */
      var apply_filter = function(filter_criterion, filter_strategy, collection) {
        logger.debug('applying filter: ' + JSON.stringify(arguments));
        var collection_to_filter = collection || original;
        var criterion = filter_criterion;
        var items = [];
        if(criterion) {
          if(filter_strategy === 'filter') {
            if(!filtered.filter_generator)  {
              logger.error('Attempted to use "filter" function, but none was defined');
              throw('Attempted to use "filter" function, but none was defined');
            }
            var filter_generator = filtered.filter_generator(criterion);
            items = collection_to_filter.filter(filter_generator);
          }
          else {
            items = collection_to_filter.where(criterion);
          }
        }
        else {
          items = collection_to_filter.models;
        }
        current_criterion = criterion;
        return items;
      };

      filtered.filter = function(filter_criterion){
        current_strategy = 'filter';
        var items = apply_filter(filter_criterion, current_strategy);
        // reset the filtered collection with the new items
        filtered_reset(items);
        return filtered;
      };

      filtered.where = function(filter_criterion){
        current_strategy = 'where';
        var items = apply_filter(filter_criterion, current_strategy);
        // reset the filtered collection with the new items
        filtered_reset(items);
        return filtered;
      };

      // when the original collection is reset, the filtered collection will re-filter itself and end up with the
      // new filtered result set
      original.on('reset', function(){
        var items = apply_filter(current_criterion, current_strategy);
        // reset the filtered collection with the new items
        filtered_reset(items);
      });

      // if the original collection gets models added to it:
      // 1. create a new collection
      // 2. filter it
      // 3. add the filtered models (i.e. the models that were added *and*
      //     match the filtering criterion) to the `filtered` collection
      original.on('add', function(models){
        var coll = new original.constructor();
        coll.add(models);
        var items = apply_filter(current_criterion, current_strategy, coll);
        filtered.add(items);
      });

      return filtered;
    };
  });

  return PF.Entities;
});
