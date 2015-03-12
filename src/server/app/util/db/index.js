'use strict';

var q = require('q');
var pg = require('pg');
var util = require('util');
var events = require('events');

var database_config = require('app/config/database');
var logger_module = require('app/util/logger');
var logger = logger_module.get_logger('app/util/db/index');

var QueryResult = function(options) {
  events.EventEmitter.call(this);
  this.pg_query_result = options.pg_query_result;
  this.done = options.done;

  var that = this;
  this.pg_query_result.on('row', function(row, result) {
    that.emit('row', row, result);
  });
  this.pg_query_result.on('end', function(result) {
    that.emit('end', result);
  });
  this.pg_query_result.on('error', function(err) {
    that.emit('error', err);
  });
};

util.inherits(QueryResult, events.EventEmitter);

module.exports = {
  /**
   * Returns a promise for a QueryResult object that emits row, end and error results from the query
   * @param  {String} sql
   * @return {QueryResult}
   */
  run_query: function(sql) {
    logger.debug('exports.run_query - ' + sql);
    var deferred = q.defer();
    pg.connect(database_config.conn_string, function(err, client, done) {
      client.on('notice', function(msg) {
        logger.info('exports.run_query:client:notice - libpq client notice - ' + msg);
      });
      client.on('error', function(err) {
        logger.error('exports.run_query:client:error - ' + err);
      });
      if(err) {
        deferred.reject(new Error(err));
      }
      else {
        deferred.resolve(new QueryResult({
          pg_query_result: client.query(sql),
          done: done
        }));
      }
    });
    return deferred.promise;
  }
};
