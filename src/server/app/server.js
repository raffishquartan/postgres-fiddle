'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var log4js = require('log4js');

var C = require('app/config');
var L = require('app/util/logger');

process.on('uncaughtException', function(error) {
  if(L && L.server && L.server.error) {
    L.server.error('Uncaught exception, exiting. Error details:');
    L.server.error(error.stack);
  }
  else {
    console.error('BACKUP LOG TO CONSOLE IN CASE OF TOTAL SERVER/LOGGER FAILURE:\n' + error.stack);
  }
  process.exit();
});

Error.stackTraceLimit = Infinity;
L.configure();
var app = express();
configure_express_middleware(app);
var http_server = http.createServer(app);
http_server.listen(C.http_port, function() {
  L.server.info('Express HTTP server listening on port %d', C.http_port);
});



function configure_express_middleware(app) {
  app.use(express.favicon(path.join(C.client_root, 'assets', 'images', 'favicons', 'favicon.ico')));
  app.use(express.compress());
  app.use(log4js.connectLogger(L.express, { level: 'auto', format: C.express_logger_format }));
  // TODO express.limit (connect.limit) is being removed in connect 3.0.0 - consider using https://github.com/stream-utils/raw-body
  app.use(express.limit('16kb'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use('/api', require('app/api/wins/router'));
  app.use(express.static(C.client_root)); // send web app if it's not an api route
  app.use(express.errorHandler()); // not appropriate for a prod site, see SES / http://calv.info/node-and-express-tips/ for another approach
};
