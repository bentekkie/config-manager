#!/usr/bin/env node

/**
 * Module dependencies.
 */

import {App} from '../app';
import {Sockets} from '../sockets'
import { createServer } from 'http';
import ini from 'ini'
import fs from 'fs'
import os from 'os'
import path from 'path'
import yargs, { Arguments, Argv } from 'yargs'

/**
 * Load config
 */
yargs.command('$0 [configLocation]', 'start the server', (yargs) => 
  yargs
    .positional('configLocation', {
      describe: 'Location of config file',
      default: path.resolve(os.homedir(),'.config','config-manager.ini')
    })
, (argv) => {
  if (argv.verbose) console.info(`starting server on :${argv.port} using config at ${argv.configLocation}`)
  startServer(argv.configLocation,argv.port)
})
.option('verbose', {
  alias: 'v',
  default: false
})
.option('port', {
  alias: 'p',
  default: normalizePort(process.env.PORT || '5000')
})
.argv;
    

function normalizePort(val : any) {
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

function startServer(configLocation : string, port: number){
  let config : {
    [key : string] : any
  } = {}
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
  var app = new App(configLocation).app
  port = normalizePort(process.env.PORT || '5000');
  app.set('port', port);


  /**
   * Create HTTP server.
   */

  var server = createServer(app);
  var sockets = new Sockets(server,configLocation)
  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Normalize a port into a number, string, or false.
   */

  

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error : any) {
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
}