define(function(require) {
  var config = {
    logger: {
      root: {
        js: {
          conf: {
            level: 'all',
            appenders: ['console']
          }
        }
      }
    }
  };

  return config;
});
