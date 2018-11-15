'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

/* GET home page. */
router.route('/file').get(function (req, res, next) {
  var path = req.query.path;
  if (path[0] !== "/") return next(new Error("Path must be absolute"));
  _fs2.default.readFile(path, 'utf8', function (err, contents) {
    if (err) {
      return next(err);
    }
    res.send({
      path: path,
      contents: contents });
  });
}).post(function (req, res) {
  console.log(req.body.file);
  res.status(200).send("recieved");
});

router.route('/ls').get(function (req, res, next) {
  var path = req.query.path || _os2.default.homedir();
  console.log(path);
  _fs2.default.readdir(path, { withFileTypes: true }, function (err, items) {
    if (err) {
      return next(err);
    }
    res.send({
      path: path,
      files: items.map(function (item) {
        return {
          name: item,
          isDirectory: _fs2.default.statSync((0, _path.join)(path, item)).isDirectory()
        };
      }) });
  });
});
exports.default = router;