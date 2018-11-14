import createError from 'http-errors';
import express, { json, urlencoded, static as _static } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import basicAuth from 'express-basic-auth';
import indexRouter from './routes/index';
import fs from 'fs';
import ini from 'ini'




export default function(configLocation){
  var app = express();

  // view engine setup
  app.set('views', join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(basicAuth({
      authorizeAsync:true,
      challenge: true,
      authorizer:(user,pass,cb) => {
        fs.readFile(configLocation,'utf8',(err,contents) => {
          if(err){
            return cb(err,null)
          }
          let config = ini.decode(contents)
          if(config.username === undefined || config.password === undefined){
            return cb(null,true)
          }
          if(config.username === user && config.password === pass){
            return cb(null,true)
          }
          return cb(null,false)
        })
      }
  }))
  app.use(logger('dev'));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(_static(join(__dirname, '..','client','build')));

  app.use('/api', indexRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  return app
}
