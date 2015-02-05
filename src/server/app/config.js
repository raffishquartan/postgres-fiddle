'use strict';

var path = require('path');

module.exports = {
  http_port: 27973,
  database_string: 'postgres://postgres_fiddle:postgres_fiddle@localhost:5432/postgres_fiddle',
  server_root: __dirname,
  client_root: path.join(__dirname, '..', '..', '..', 'client'),
  express_logger_format: ':remote-addr - [:date] ":method :url HTTP/:http-version" :status ":referrer" ":user-agent"',
};
