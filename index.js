//"use 'esversion: 6'";
/*jshint esversion: 6 */

const responseInfo = require('./Utils/responses.js');
const http = require('http');
const port = 3000;

const handlers = require('./Handlers/handlers.js');

http.createServer((request, response) => {
    
    console.log('---------------------------------------');
    console.log('req.url');
    console.log(request.url);
    console.log('---------------------------------------');

    let hasHandler = false;
    for (var handler of handlers) {

        if (!handler(request, response)) {
            hasHandler = true;
            break;
        }
    }

    if (!hasHandler) {

        console.log('*******************************************************************************************************');
        console.log(request.url);
        console.log('GRESHKA , unprocessed REQUEST');
        console.log('*******************************************************************************************************');

        response.writeHead(responseInfo.codes.notFound, responseInfo.contentType.textPlain);
        response.write('Error! Page not found!');
        response.end();
    }
}).listen(port);