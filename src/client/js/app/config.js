define(function(require) {
  var config = {
    logger: {
      root: {
        js: {
          _conf: {
            level: "all",
            appenders: ["console"]
          }
        }
      }
    }
  };

  return config;
});
