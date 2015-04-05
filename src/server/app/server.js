'use strict';

var http = require('http');
var express = require('express');
var compression = require('compression');
var serve_favicon = require('serve-favicon');
var body_parser = require('body-parser');
var method_override = require('method-override');
var errorhandler = require('errorhandler');
var log4js = require('log4js');
var path = require('path');
var q = require('q');

var server_config = require('app/config/server');
var logger_module = require('app/util/logger');
var logger = logger_module.get('app/server');

process.on('uncaughtException', function(error) {
  if(logger) {
    logger.error('Uncaught exception, exiting: ' + error.name + ' ' + error.message);
    logger.error(error.stack);
  }
  else {
    console.error('BACKUP LOG TO CONSOLE IN CASE OF TOTAL SERVER/LOGGER FAILURE:\n' + error.stack);
  }
  process.exit();
});

Error.stackTraceLimit = Infinity;
q.longStackSupport = server_config.q_longStackSupport;
var app = express();
configure_express_middleware(app);
var http_server = http.createServer(app);
http_server.listen(server_config.http_port, function() {
  logger.info('Express HTTP server listening on port ' + server_config.http_port);
});



function configure_express_middleware(app) {
  var logger_config = require('app/config/logger');

  app.use(compression());
  app.use(serve_favicon(path.join(server_config.client_root, 'assets', 'images', 'favicons', 'favicon.ico')));
  app.use(log4js.connectLogger(logger_module.get_log4js('connect-appender'), {
    level: 'auto',
    layout: 'basic',
    immediate: true,
    format: logger_config.express_format,
    tokens: logger_config.custom_tokens
  }));
  app.use(body_parser.json());
  app.use(body_parser.urlencoded({ extended: false }));
  app.use(method_override('X-HTTP-Method'));          // Microsoft
  app.use(method_override('X-HTTP-Method-Override')); // Google/GData
  app.use(method_override('X-Method-Override'));      // IBM
  app.use('/api', require('app/api/router'));
  app.use('/assets', express.static(path.join(server_config.client_root, 'assets'),
    { maxAge: server_config.static_max_age }));
  app.use('/bower_components', express.static(path.join(server_config.client_root, 'bower_components'),
    { maxAge: server_config.static_max_age }));
  app.use('/js', express.static(path.join(server_config.client_root, 'js'), { maxAge: server_config.static_max_age }));
  app.use(function(req, res, next) { // Fall back to always sending index.html
    logger.debug('client request ' + req.originalUrl + ' (route: ' + JSON.stringify(req.route) +
      ') has fallen through to index.html catch');
    res.sendFile(path.join(server_config.client_root, 'index.html'));
  });
  // TODO not appropriate for a prod site, see SES / http://calv.info/node-and-express-tips/ for another approach:
  app.use(errorhandler());
}
