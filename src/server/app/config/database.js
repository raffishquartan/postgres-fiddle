'use strict';

/**
 * Database-specific configuration
 */
module.exports = {
  name: 'postgres_fiddle',
  user: 'postgres_fiddle',
  password: 'postgres_fiddle',
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  database_name_check_before_sync: /postgres_fiddle/,
  schema: 'pfsq',
  pool: {
    maxConnections: 10,
    minConnections: 3,
    maxIdleTime: 30000
  }
};
