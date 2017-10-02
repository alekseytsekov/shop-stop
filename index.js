//"use 'esversion: 6'";
/*jshint esversion: 6 */

const responseInfo = require('./Utils/responses.js');
const http = require('http');
const port = 3000;

const handlers = require('./Handlers/handlers.js');

http.createServer((request, response) => {
    
    let hasHandler = false;
    for (var handler of handlers) {

        if (!handler(request, response)) {
            hasHandler = true;
            log(request);
            break;
        }
    }

    if (!hasHandler) {

        log(request, true);

        response.writeHead(responseInfo.codes.notFound, responseInfo.contentType.textPlain);
        response.write('Error! Page not found!');
        response.end();
    }
}).listen(port);

function log(request, isError = false) {

    let type = 'Success';
    if (isError) {
        type = 'ERROR';
    }

    console.log(`${type}: ${request.url}`);
}