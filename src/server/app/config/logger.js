'use strict';

/**
 * Logger-specific configuration
 */
module.exports = {
  /*
  TODO: Modify log4js/lib/connect-logger to take option.tokens { key: func }, internally it should use a map
        of tokens to functions (currently it is hard-coded in to the format method); require moment for method
  TODO: Modify express format to use new jdate token, not date
  express_tokens: {
    jdate: function(req, res) { return moment().format('YYYY-MM-DD HH:mm:ss.SSS'); }
  },
  */
  express_format: '[:date] :remote-addr ":method :url HTTP/:http-version" :status ":referrer" ":user-agent"'
}
