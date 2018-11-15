import createError, { HttpError } from 'http-errors';
import express, { json, urlencoded, static as _static, Response, Request } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import basicAuth from 'express-basic-auth';
import fs from 'fs';
import ini from 'ini'
import { NextFunction } from 'express-serve-static-core';


export class App {
  readonly app = express();
  
  constructor(configLocation: string) {

    // view engine setup
    this.app.set('views', join(__dirname, 'views'));
    this.app.set('view engine', 'pug');
    this.app.use(basicAuth({
      authorizeAsync: true,
      challenge: true,
      authorizer: (user, pass, cb) => {
        fs.readFile(configLocation, 'utf8', (err, contents) => {
          if (err) {
            return cb(err, undefined)
          }
          let config = ini.decode(contents)
          if (config.username === undefined || config.password === undefined) {
            return cb(null, true)
          }
          if (config.username === user && config.password === pass) {
            return cb(null, true)
          }
          return cb(null, false)
        })
      }
    }))
    this.app.use(logger('dev'));
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(_static(join(__dirname, '..','client')));

    // catch 404 and forward to error handler
    this. app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    this.app.use((err : HttpError, req: Request, res : Response, next : NextFunction) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
}
