// NO LOGGING IN THIS FILE

define(function(require) {
  'use strict';

  var config = {
    logger: {
      root: {
        js: {
          conf: {
            level: 'warn', // configure.py: js
            appenders: ['console']
          }
        },
        events_logger: {
          conf: {
            level: 'warn', // configure.py: events_logger
            appenders: ['console']
          }
        }
      }
    }
  };

  return config;
});
