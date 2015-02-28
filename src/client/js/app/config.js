// NO LOGGING IN THIS FILE

define(function(require) {
  var config = {
    logger: {
      root: {
        js: {
          conf: {
            level: 'debug',
            appenders: ['console']
          },
          apps: {
            conf: {
              level: 'debug',
              appenders: ['console']
            },
            header: {
              conf: {
                level: 'trace',
                appenders: ['console']
              }
            }
          }
        }
      }
    }
  };

  return config;
});
