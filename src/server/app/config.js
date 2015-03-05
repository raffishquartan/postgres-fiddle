'use strict';

var path = require('path');

module.exports = {
  http_port: 27973,
  database_string: 'postgres://postgres_fiddle:postgres_fiddle@localhost:5432/postgres_fiddle',
  server_root: __dirname,
  client_root: path.join(__dirname, '..', '..', 'client'),
  logger: {
    /*
    TODO: Modify log4js/lib/connect-logger to take option.tokens { key: func }, internally it should use a map
          of tokens to functions (currently it is hard-coded in to the format method); require moment for method
    TODO: Modify express format to use new jdate token, not date
    express_tokens: {
      jdate: function(req, res) { return moment().format('YYYY-MM-DD HH:mm:ss.SSS'); }
    },
    */
    express_format: '[:date] :remote-addr ":method :url HTTP/:http-version" :status ":referrer" ":user-agent"'
  }};
