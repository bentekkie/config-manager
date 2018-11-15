#!/usr/bin/env node

/**
 * Module dependencies.
 */

import creatApp from '../app';
import io from '../sockets'
import { createServer } from 'http';
import ini from 'ini'
import fs from 'fs'

/**
 * Load config
 */

const args = process.argv;
console.log(args.length)
if(args.length !== 3){
  throw new Error("config path not specified")
}
var configLocation = args[args.length-1]
let config = {}
if(fs.existsSync(configLocation)){
    config = ini.decode(fs.readFileSync(configLocation).toString())   
}
config['Config Manager'] = {
    config:configLocation
} 
fs.writeFileSync(configLocation,ini.encode(config))

/**
 * Get port from environment and store in Express.
 */
var app = creatApp(configLocation)
var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);


/**
 * Create HTTP server.
 */

var server = createServer(app);
var sockets = io(server,configLocation)
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

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}