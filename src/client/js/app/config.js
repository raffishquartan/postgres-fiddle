// NO LOGGING IN THIS FILE

define(function(require) {
  'use strict';

  var config = {
    logger: {
      root: {
        js: {
          conf: {
            level: 'info',
            appenders: ['console']
          },
          common: {
            conf: {
              level: 'debug',
              appenders: ['console']
            }
          },
          apps: {
            conf: {
              level: 'info',
              appenders: ['console']
            },
            entry: {
              conf: {
                level: 'trace',
                appenders: ['console']
              }
            }
          }
        },
        events_logger: {
          conf: {
            level: 'trace',
            appenders: ['console']
          }
        }
      }
    }
  };

  return config;
});
