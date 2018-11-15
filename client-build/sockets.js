'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (server, configLocation) {

    var io = (0, _socket2.default)(server);
    io.on('connection', function (socket) {
        console.log("connected");
        socket.on('get file', function (path) {
            var pathArr = path.split('/');
            var type = _mimeTypes2.default.lookup(pathArr[pathArr.length - 1]);
            _fs2.default.readFile(path, 'utf8', function (err, contents) {
                if (err) {
                    return socket.emit('server_error', err);
                }
                socket.emit('get file complete', path, contents, type);
            });
        });
        socket.on('get language', function (language) {
            _fs2.default.readFile(require.resolve('codemirror/mode/' + language + '/' + language), 'utf8', function (err, contents) {
                if (err) {
                    return socket.emit('server_error', err);
                }
                socket.emit('get language complete', language, contents);
            });
        });
        socket.on('get config', function () {
            _fs2.default.readFile(configLocation, 'utf8', function (err, contents) {
                if (err) {
                    return socket.emit('server_error', err);
                }
                socket.emit('config', _ini2.default.parse(contents));
            });
        });
        socket.on('reload config', function () {
            _fs2.default.readFile(configLocation, 'utf8', function (err, contents) {
                if (err) {
                    return socket.emit('server_error', err);
                }
                io.emit('config', _ini2.default.parse(contents));
            });
        });
        socket.on('set file', function (path, contents) {
            _fs2.default.writeFile(path, contents, function (err) {
                if (err) {
                    return socket.emit('server_error', err);
                } else {

                    socket.emit('set file complete');
                    if (path === configLocation) {
                        io.emit('config', _ini2.default.parse(contents));
                    }
                }
            });
        });
        _fs2.default.readFile(configLocation, 'utf8', function (err, contents) {
            if (err) {
                return socket.emit('server_error', err);
            }
            socket.emit('config', _ini2.default.parse(contents));
        });

        _fs2.default.readdir(_path2.default.resolve(require.resolve('codemirror/mode/xml/xml').split(".")[0], '..', '..'), function (err, files) {
            if (err) {
                return socket.emit('server_error', err);
            }
            socket.emit('languages', files);
        });
    });
};

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ini = require('ini');

var _ini2 = _interopRequireDefault(_ini);

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }