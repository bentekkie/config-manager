#!/usr/bin/env node
'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _sockets = require('../sockets');

var _sockets2 = _interopRequireDefault(_sockets);

var _http = require('http');

var _ini = require('ini');

var _ini2 = _interopRequireDefault(_ini);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Load config
 */

var args = process.argv;

/**
 * Module dependencies.
 */

console.log(args.length);
if (args.length !== 3) {
  throw new Error("config path not specified");
}
var configLocation = args[args.length - 1];
var config = {};
if (_fs2.default.existsSync(configLocation)) {
  config = _ini2.default.decode(_fs2.default.readFileSync(configLocation).toString());
}
config['Config Manager'] = {
  config: configLocation
};
_fs2.default.writeFileSync(configLocation, _ini2.default.encode(config));

/**
 * Get port from environment and store in Express.
 */
var app = (0, _app2.default)(configLocation);
var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = (0, _http.createServer)(app);
var sockets = (0, _sockets2.default)(server, configLocation);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
}