define(function(require) {
  var Log4js = require('log4js');
  var _ = require('underscore');

  /**
   * Returns the most specific conf in log_config for a given group.
   *
   * E.g. if a logger config defines group configurations for js, js/foo and js/foo/bar/baz then the logger for
   * js/foo/bar/baz will use the config for js/foo/bar/baz, the logger for js/foo/bar will use the config for js/foo
   * and attempting to get the group configuration for baz will throw an error.
   *
   * @param  {String} group_string The group string to specify, /-delimited and assumed to begin with js
   * @param  {Object} log_config   The logger configuration
   * @return {Object}              A conf object with fields level and appenders
   */
  var get_group_config = function(group_string, log_config) {
    var group_elements = group_string.split('/');
    var current_level = log_config;
    for(var i = 0; i < group_elements.length; ++i) {
      var current_group = group_elements[i];
      if(current_level[current_group]) {
        current_level = current_level[current_group];
      }
      else {
        break;
      }
    }
    if(!current_level._conf) {
      throw new Error('Group config for "' + group_string + '" is ' + current_level._conf);
    }
    else {
      return current_level._conf;
    }
  }

  /**
   * Converts level string from logger config into Log4js enum. Valid strings (case insensitive) are:
   * - all
   * - trace
   * - debug
   * - info
   * - warn
   * - error
   * - fatal
   */
  var parse_level = function(level_string) {
    switch(level_string.toLowerCase()) {
      case 'all':   return Log4js.Level.ALL;
      case 'trace': return Log4js.Level.TRACE;
      case 'debug': return Log4js.Level.DEBUG;
      case 'info':  return Log4js.Level.INFO;
      case 'warn':  return Log4js.Level.WARN;
      case 'error': return Log4js.Level.ERROR;
      case 'fatal': return Log4js.Level.FATAL;
      case 'off':   return Log4js.Level.OFF;
      default: throw new Error('Unknown Log4js.Level string: ' + level_string);
    }
  }

  /**
   * Returns an appropriate appender object for an appender string from a logger config. Valid strings (case
   * insensitive) are:
   * - console
   */
  var parse_appender = function(appender_string) {
    switch(appender_string.toLowerCase()) {
      case 'console': return new ConsoleAppender(true);
      default: throw new Error('Unknown Log4js appender string: ' + appender_string);
    }
  }

  /**
   * Returned from this module, can be used to build logs according to the log_config parameter
   */
  var logger_builder = function(log_config) {
    return {
      /**
       * Returns a logger object that is configured according to the application config.logger property
       * @param  {String} group The logger group - usually the path to the javascript file
       * @return {Object}       A logger object for {{group}}
       */
      get_logger: function(group) {
        var logger_config = get_group_config(group, log_config);
        var logger = Log4js.getLogger(group);
        logger.setLevel(parse_level(logger_config.level));
        _.each(logger_config.appenders, function(appender) {
          logger.addAppender(parse_appender(appender));
        });
        return logger;
      }
    };
  };

  return logger_builder;
});
