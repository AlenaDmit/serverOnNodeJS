'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 4321;

_http2.default.createServer(function (req, res) {
    var url = req.url;
    var params = "";
    if (url.indexOf("?") >= 0) {
        params = url.substr(url.indexOf("?") + 1);
        url = url.slice(0, url.indexOf("?"));
    }
    res.setHeader("MyName", "Alena");
    console.log(url);
    console.log(params);

    switch (url) {
        case '/hello':
            res.end('Hello, stranger');
            break;

        case '/mur.txt':
        case '/mur2.txt':
            console.log('I got this!');
            console.log(__dirname);

            (0, _util.promisify)(_fs2.default.readFile)(_path2.default.join(__dirname, req.url)).then(function (data) {
                return res.end(String(data));
            }).catch(function (error) {
                return res.end('Cannot serve this file');
            });
            break;

        case '/moment':
            res.end((0, _moment2.default)().format('DD-MM-YYYY HH:mm'));

        case '/length':
            res.end("Length: " + params.length);

        default:
    }

    // res.end('I always say the same thing!');

    // if (req.url === '/quit') {
    //     process.exit(); // мгновенное прекращение работы сервера
    // }
    //
    // if (req.url === '/stop') {
    //     process.nextTick( () => {throw new Error('Stop!')} ); // прекращение работы сервера при следующем запросе
    // }

    // res.end('Server is working!');
}).listen(PORT, function () {
    return console.log('Started: ' + PORT + ' number ' + process.pid);
});
