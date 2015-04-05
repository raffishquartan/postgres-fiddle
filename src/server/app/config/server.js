'use strict';

var path = require('path');

/**
 * General application configuration not associated with a specific bucket
 */
module.exports = {
  http_port: 27973,
  server_root: __dirname,
  client_root: path.join(__dirname, '..', '..', '..', 'client'), // .. x3 to cancel out server/app/config
  q_longStackSupport: false,
  static_max_age: 1000
};
