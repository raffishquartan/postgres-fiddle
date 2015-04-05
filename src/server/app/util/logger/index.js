'use strict';

var log4js = require('log4js');
var _ = require('underscore');
var moment = require('moment');

/**
 * Map of log4js appender category names (also as specified in logger conf configurations) to log4js logger objects
 */
var log4js_loggers = {};

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
      _.each(this.destgroups, function(destgroup_name) {
        if(!log4js_loggers[destgroup_name]) {
          throw new Error('Unknown appender "' + destgroup_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[destgroup_name].trace(log_entry);
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
      _.each(this.destgroups, function(destgroup_name) {
        if(!log4js_loggers[destgroup_name]) {
          throw new Error('Unknown appender "' + destgroup_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[destgroup_name].debug(log_entry);
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
      _.each(this.destgroups, function(destgroup_name) {
        if(!log4js_loggers[destgroup_name]) {
          throw new Error('Unknown appender "' + destgroup_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[destgroup_name].info(log_entry);
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
      _.each(this.destgroups, function(destgroup_name) {
        if(!log4js_loggers[destgroup_name]) {
          throw new Error('Unknown appender "' + destgroup_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[destgroup_name].warn(log_entry);
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
      _.each(this.destgroups, function(destgroup_name) {
        if(!log4js_loggers[destgroup_name]) {
          throw new Error('Unknown appender "' + destgroup_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[destgroup_name].error(log_entry);
        }
      });
    }
  };

  this.is_fatal_enabled = function() {
    return this.level <= parse_level('fatal');
  };

  this.fatal = function(message) {
    if(this.is_fatal_enabled()) {
      var log_entry = assemble_log_entry(message, 'fatal');
      _.each(this.destgroups, function(destgroup_name) {
        if(!log4js_loggers[destgroup_name]) {
          throw new Error('Unknown appender "' + destgroup_name + '" requested by ' + this.group);
        }
        else {
          log4js_loggers[destgroup_name].fatal(log_entry);
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
 * Checks if a logger configuration is valid or not
 * @param  {[type]} config_to_validate The configuration to validate
 * @return {boolean}                   True if the configuration is valid, false otherwise
 */
var validate_config = function(config_to_validate) {
  if(!config_to_validate.group) {
    console.log('Invalid configuration: no valid group in ' + JSON.stringify(config_to_validate));
    return false;
  }
  else if(typeof(config_to_validate.level) !== 'number') {
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
};

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

/**
 * Configures log4js according to its specific config, then creates and caches a log4js logger to log4js_loggers as a
 * potential destination for each destgroup
 * @param  {string} log4js_config Path to the logger config JSON file
 */
var configure_log4js = function(log4js_config) {
  _.each(log4js_config.appenders, function(appender_obj) { // ensure log4js does not modify log messages
    appender_obj.layout = {};
    appender_obj.layout.type = 'messagePassThrough';
  });
  log4js.configure(log4js_config); // configure log4js appenders
  _.each(log4js_config.appenders, function(appender_obj) { // create log4js loggers - one for each appender
    if(!log4js_loggers[appender_obj.category]) {
      log4js_loggers[appender_obj.category] = log4js.getLogger(appender_obj.category);
      log4js_loggers[appender_obj.category].setLevel('TRACE'); // filter logging in this module, not in log4js
    }
  });
};

var raw_logger_config;
var cached_loggers = {};

module.exports = {
  /**
   * Returns a logger object. Also loads logger and caches log4js loggers (one or more per destgroup category) as nec.
   * @param  {string} group Get the logger for this group
   */
  get: function(group) {
    if(!raw_logger_config) {
      raw_logger_config = require('app/util/logger/logger_config.json');
      configure_log4js(raw_logger_config.log4js); // configure log4js, create appenders in cache for each appender
    }
    if(cached_loggers[group]) {
      return cached_loggers[group];
    }
    else {
      var logger_specific_config = get_group_config_clone(group, raw_logger_config.loggers);
      if(!validate_config(logger_specific_config)) {
        throw new Error('Invalid configuration for logger: ' + JSON.stringify(logger_specific_config));
      }
      else {
        cached_loggers[group] = new Logger(logger_specific_config);
        return cached_loggers[group];
      }
    }
  },

  /**
   * Get a plain log4js logger from the cache, possibly associated with one or more log4js appenders
   * @param  {[type]} logger_name The logger name to get
   * @return {[type]}             The log4js logger of this name
   */
  get_log4js: function(logger_name) {
    if(!log4js_loggers[logger_name]) {
      throw new Error('Unknown log4js logger_name - ensure appender with this category is in logger_config.json');
    }
    else {
      return log4js_loggers[logger_name];
    }
  }
};
