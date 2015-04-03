'use strict';

/**
 * Logger-specific configuration
 */
module.exports = {
  // TODO: When log4js version updated to include my PR, add express_tokens and override :date with custom token
  express_format: '[:date] :remote-addr ":method :url HTTP/:http-version" :status ":referrer" ":user-agent"'
};
