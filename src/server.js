import http from 'http';
import path from 'path';
import fs from 'fs';
import {promisify as $} from 'util';
import moment from 'moment';

const PORT = 4321;

http
.createServer(
    (req, res) => {
        let url = req.url;
        let params = '';
        if (url.indexOf('?') >=0 ) {
            params = url.substr(url.indexOf('?') + 1);
            url = url.slice(0, url.indexOf('?'));
        }
        res.setHeader('MyName', 'Alena');
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

                $(fs.readFile)(path.join(__dirname, req.url))
                    .then(data => res.end(String(data)))
                    .catch(error => res.end('Cannot serve this file'));
                break;

            case '/moment':
                res.end(moment().format('DD-MM-YYYY HH:mm'));

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
    }
)

.listen(PORT, () => console.log(`Started: ${PORT} number ${process.pid}`));