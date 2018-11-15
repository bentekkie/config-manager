'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (configLocation) {
  var app = (0, _express2.default)();

  // view engine setup
  app.set('views', (0, _path.join)(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use((0, _expressBasicAuth2.default)({
    authorizeAsync: true,
    challenge: true,
    authorizer: function authorizer(user, pass, cb) {
      _fs2.default.readFile(configLocation, 'utf8', function (err, contents) {
        if (err) {
          return cb(err, null);
        }
        var config = _ini2.default.decode(contents);
        if (config.username === undefined || config.password === undefined) {
          return cb(null, true);
        }
        if (config.username === user && config.password === pass) {
          return cb(null, true);
        }
        return cb(null, false);
      });
    }
  }));
  app.use((0, _morgan2.default)('dev'));
  app.use((0, _express.json)());
  app.use((0, _express.urlencoded)({ extended: false }));
  app.use((0, _cookieParser2.default)());
  app.use((0, _express.static)((0, _path.join)(__dirname, '..', 'client', 'build')));

  app.use('/api', _index2.default);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next((0, _httpErrors2.default)(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  return app;
};

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressBasicAuth = require('express-basic-auth');

var _expressBasicAuth2 = _interopRequireDefault(_expressBasicAuth);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ini = require('ini');

var _ini2 = _interopRequireDefault(_ini);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }