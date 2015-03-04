'use strict';

var log4js = require('log4js');
var _ = require('underscore');
var moment = require('moment');

/**
 * Map of log4js appender category names (also as specified in logger conf configurations) to log4js logger objects
 */
var log4js_loggers = {};

/**
 * A logger object, associated with a group and with some set of appenders attached to it
 * @param {Object} options Required and possible properties are String:level Array[String]:appenders, String:group
 */
var Logger = function(options) {
  // PRIVATE FUNCTIONS
  var that = this;

  var assemble_log_entry = function(message, level_string) {
    var timestamp = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    return timestamp + ' ' + level_string.toUpperCase() + ' [' + that.group + '] ' + message;
  };
  // END PRIVATE FUNCTIONS

  // PUBLIC PRIVILEGED FUNCTIONS
  // TODO: Refactor so that these methos are on the prototype, not the instance
  this.is_trace_enabled = function() {
    return this.level <= parse_level('trace');
  };

  this.trace = function(message) {
    if(this.is_trace_enabled()) {
      var log_entry = assemble_log_entry(message, 'trace');
      _.each(this.appenders, function(appender_name) {
        if(!log4js_loggers[appender_name]) {
          throw new Error('Unknown appender "' + appender_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[appender_name].trace(log_entry);
        }
      });
    }
  };

  this.is_debug_enabled = function() {
    return this.level <= parse_level('debug');
  };

  this.debug = function(message) {
    if(this.is_debug_enabled()) {
      var log_entry = assemble_log_entry(message, 'debug');
      _.each(this.appenders, function(appender_name) {
        if(!log4js_loggers[appender_name]) {
          throw new Error('Unknown appender "' + appender_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[appender_name].debug(log_entry);
        }
      });
    }
  };

  this.is_info_enabled = function() {
    return this.level <= parse_level('info');
  };

  this.info = function(message) {
    if(this.is_info_enabled()) {
      var log_entry = assemble_log_entry(message, 'info');
      _.each(this.appenders, function(appender_name) {
        if(!log4js_loggers[appender_name]) {
          throw new Error('Unknown appender "' + appender_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[appender_name].info(log_entry);
        }
      });
    }
  };

  this.is_warn_enabled = function() {
    return this.level <= parse_level('warn');
  };

  this.warn = function(message) {
    if(this.is_warn_enabled()) {
      var log_entry = assemble_log_entry(message, 'warn');
      _.each(this.appenders, function(appender_name) {
        if(!log4js_loggers[appender_name]) {
          throw new Error('Unknown appender "' + appender_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[appender_name].warn(log_entry);
        }
      });
    }
  };

  this.is_error_enabled = function() {
    return this.level <= parse_level('error');
  };

  this.error = function(message) {
    if(this.is_error_enabled()) {
      var log_entry = assemble_log_entry(message, 'error');
      _.each(this.appenders, function(appender_name) {
        if(!log4js_loggers[appender_name]) {
          throw new Error('Unknown appender "' + appender_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[appender_name].error(log_entry);
        }
      });
    }
  };

  this.is_fatal_enabled = function() {
    return this.level <= parse_level('fatal')
  };

  this.fatal = function(message) {
    if(this.is_fatal_enabled()) {
      var log_entry = assemble_log_entry(message, 'fatal');
      _.each(this.appenders, function(appender_name) {
        if(!log4js_loggers[appender_name]) {
          throw new Error('Unknown appender "' + appender_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[appender_name].fatal(log_entry);
        }
      });
    }
  };
  // END PUBLIC FUNCTIONS

  // CONFIGURE OBJECT
  this.group = options.group;
  this.level = options.level; // parsed to number in get_group_config_clone and before validation
  this.destgroups = options.destgroups;
  // END CONFIGURE OBJECT
};

/**
 * Converts level string from logger config into numerical value. Valid strings (case insensitive) are: all. trace,
 * debug, info, warn, error, fatal
 */
var parse_level = function(level_string) {
  var levels = {
    all:   0,
    trace: 100,
    debug: 200,
    info:  300,
    warn:  400,
    error: 500,
    fatal: 600,
    off:   9999
  };
  if(levels[level_string.toLowerCase()] !== undefined) { return levels[level_string.toLowerCase()]; }
  else { throw new Error('Unknown log level string: ' + level_string); }
};

/**
 * Checks if a logger configuration is valid or not
 * @param  {[type]} config_to_validate The configuration to validate
 * @return {boolean}                   True if the configuration is valid, false otherwise
 */
var validate_config = function(config_to_validate) {
  if(!config_to_validate.group) {
    console.log('Invalid configuration: no valid group in ' + JSON.stringify(config_to_validate));
    return false;
  }
  else if(typeof(config_to_validate.level) !== "number") {
    console.log('Invalid configuration: level is not parsed to a number in ' + JSON.stringify(config_to_validate));
    return false;
  }
  else if(config_to_validate.level < 0 || config_to_validate.level > parse_level('off')) {
    console.log('Invalid configuration: level is too big or too small in ' + JSON.stringify(config_to_validate));
    return false;
  }
  else if(!config_to_validate.destgroups.length) {
    console.log('Invalid configuration: destgroups is not a non-empty array in ' + JSON.stringify(config_to_validate));
    return false;
  }
  else {
    return true;
  }
}

/**
 * Returns the most specific conf in log_config for a given group. Throws an error if no valid configuration is found.
 *
 * E.g. if a logger config defines group configurations for js, js/foo and js/foo/bar/baz then the logger for
 * js/foo/bar/baz will use the config for js/foo/bar/baz, the logger for js/foo/bar will use the config for js/foo
 * and attempting to get the group configuration for baz will throw an error.
 *
 * @param  {String} group_string The group string to specify, /-delimited and assumed to begin with js
 * @param  {Object} log_config   The logger configuration
 * @return {Object}              A conf object with fields group, level and destgroups
 */
var get_group_config_clone = function(group_string, log_config) {
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
  if(!current_level.conf) {
    throw new Error('Group config for "' + group_string + '" is ' + current_level.conf);
  }
  else {
    var result = _.extend({ group: group_string }, current_level.conf); // TODO confirm deepy copy not needed
    result.level = parse_level(result.level);
    return result;
  }
};

var logger_config;
var existing_loggers = {};

/**
 * Loads and caches a log4js logger as a destination for each destgroup
 * @param  {string} logger_config_path Path to the logger config JSON file
 * @return {object}                    The logger configurations specified in the SL config
 */
var cache_appenders_return_loggers = function(logger_config_path) {
  var raw_config = require(logger_config_path);
  log4js.configure(raw_config['log4js']);
  for(var appender in raw_config['log4js'].appenders) {
    if(!log4js_loggers[appender]) {
      log4js_loggers[appender] = log4js.getLogger(appender);
    }
  }
  return raw_config.loggers
};

module.exports = {
  /**
   * Returns a logger object. Also loads logger and caches log4js loggers (one or more per destgroup category) as nec.
   * @param  {string} group Get the logger for this group
   */
  get_logger: function(group) {
    var logger_config;
    if(!logger_config) {
      logger_config = cache_appenders_return_loggers('app/util/logger/logger_config.json');
    }
    if(existing_loggers[group]) {
      return existing_loggers[group];
    }
    else {
      var logger_specific_config = get_group_config_clone(group, logger_config);
      if(!validate_config(logger_specific_config)) {
        throw new Error('Invalid configuration for logger: ' + JSON.stringify(logger_specific_config));
      }
      else {
        existing_loggers[group] = new Logger(logger_specific_config);
        return existing_loggers[group];
      }
    }
  }
};
