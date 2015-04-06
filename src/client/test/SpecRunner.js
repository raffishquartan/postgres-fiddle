require.config({
  baseUrl: "../../../", // baseUrl to postgres-fiddle
  urlArgs: 'bust=' + (new Date()).getTime(), // prevent caching during testing / development only
  paths: {
    // Required by Jasmine - from dev-level node_modules
    jasmine: 'node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.1/jasmine',
    'jasmine-html': 'node_modules/grunt-contrib-jasmine/vendor/jasmine-2.0.1/jasmine-html',

    // Required by code being tested - assumes tests are being run in source repo
    backbone: 'src/client/bower_components/backbone/backbone',
    jquery: 'src/client/bower_components/jquery/dist/jquery',
    marionette: 'src/client/bower_components/marionette/lib/backbone.marionette'
  },
  shim: {
    // Required by Jasmine
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },

    // Required by application code being tested
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['jquery', 'underscore', 'backbone'],
      exports: 'Marionette'
    },
    underscore: {
      exports: '_'
    }
  }
});

define(function(require) {
  var jasmine = require('jasmine-html');
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];
  specs.push('../jastmine_itest.js');

  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });
});
