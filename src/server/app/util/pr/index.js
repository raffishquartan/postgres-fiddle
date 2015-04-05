'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');

var logger_module = require('app/util/logger');
var logger = logger_module.get('app/util/pr/index');
var database_config = require('app/config/database');

var sq = new Sequelize(database_config.name, database_config.user, database_config.password, {
  dialect: database_config.dialect,
  host: database_config.host,
  port: database_config.port,
  define: {
    paranoid: true,
    createdAt: 'sq_created_at',
    updatedAt: 'sq_updated_at',
    deletedAt: 'sq_deleted_at',
    underscored: true,
    schema: database_config.schema,
    freezeTableName: true
  },
  sync: {
    match: database_config.database_name_check_before_sync, // match regex against DB name before sync'ing, for safety
    logging: function(msg) {
      logger.debug('sq:sync -- ' + msg);
    }
  },
  logging: function(msg) {
    logger.debug('sq -- ' + msg);
  },
  pool: database_config.pool
});

// Import all modules
var pr_module_files = fs.readdirSync(__dirname).filter(function(filename) {
  return filename !== 'index.js';
});
var pr = {};
pr_module_files.forEach(function(pr_module_file) {
  var module_name = pr_module_file.replace(/\..+$/, '');
  pr[module_name] = sq.import(path.join(__dirname, '/', module_name));
});


// Define relationships across modules
(function(pr) {
  // When needed - define cross module model relationships here
})(pr);

// Export connection: { sq, pr(.modules.models) }
module.exports = {
  sq: sq,
  pr: pr
};
