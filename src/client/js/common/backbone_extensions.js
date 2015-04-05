/**
 * This require does two things:
 * - Extends Backbone.Model, .View, .Router and .Collection to use named constructors for more informative debugging
 * - Changes Backbone.Model.toString and Backbone.Collection.toString for more informative debugging
 * The .module() call references the Entities module but no new members are assigned. The changes to Backbone are
 * executed via an IIFE.
 *
 * Based on:
 * - http://stackoverflow.com/a/15034014/1149568
 * - http://stackoverflow.com/a/14869218/1149568
 */
define(function(require) {
  'use strict';

  var PF = require('js/app/obj');
  PF.module('Entities', function(Entities, PF, Backbone, Marionette, $, _) {
    (function () {
      function createNamedConstructor(name, constructor) {
        // Explicitly allow use of Function constructor here
        /* jshint -W054 */
        var fn = new Function('constructor', 'return function ' + name + '() {\n' +
          '  // wrapper function created dynamically for "' + name + '" constructor to allow instances to be\n' +
          '  // identified in the debugger\n' +
          '  constructor.apply(this, arguments);\n' +
          '};');
        return fn(constructor);
      }

      var original_extend = Backbone.View.extend; // Model, Collection, Router and View shared the same extend function
      var name_property = '__name';

      var newExtend = function(protoProps, classProps) {
        if (protoProps && protoProps.hasOwnProperty(name_property)) {
          var name = protoProps[name_property]; // NB: this does not check that name_property is a valid identifier
          // wrap constructor from protoProps if supplied or 'this' (the function we are extending)
          var constructor = protoProps.hasOwnProperty('constructor') ? protoProps.constructor : this;
          protoProps = _.extend(protoProps, {
            constructor: createNamedConstructor(name, constructor)
          });
        }
        return original_extend.call(this, protoProps, classProps);
      };

      Backbone.Model.prototype[name_property] = 'Model';
      Backbone.Collection.prototype[name_property] = 'Collection';
      Backbone.Router.prototype[name_property] = 'Router';
      Backbone.View.prototype[name_property] = 'View';

      Backbone.Model.prototype.toString = function() {
        return this[name_property] + '(cid: ' + this.cid + ', attr: ' + JSON.stringify(this.attributes) + ')';
      };

      Backbone.Collection.prototype.toString = function() {
        return this[name_property] + '(models: ' + JSON.stringify(this.models) + ')';
      };

      Backbone.View.prototype.toString = function() {
        return this[name_property] + '(cid: ' + this.cid + ', outerHTML: ' + this.$el.prop('outerHTML') + ')';
      };

      Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = newExtend;
    })();
  });

  return undefined;
});
