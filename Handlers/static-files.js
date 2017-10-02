/*jshint esversion: 6 */
const responseInfo = require('../Utils/responses');

const fs = require('fs');
const url = require('url');
const path = require('path');

module.exports = (req, res) => {

    req.pathname = req.pathname || url.parse(req.url).pathname;
    let method = req.method;

    // console.log('req.url');
    // console.log(req.url);

    if (req.pathname.startsWith('/Content/') && method === 'GET') {

        let filePath = path.normalize(path.join(__dirname, `..${req.pathname}`));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                log(err, true);
                res.writeHead(responseInfo.codes.notFound, responseInfo.contentType.textPlain);
                res.write('Source not found!');
                res.end();
                return;
            }

            //log(filePath);

            res.writeHead(responseInfo.codes.ok, getContentType(req.pathname));
            res.write(data);
            res.end();
        });

    } else {
        return true;
    }

};

function getContentType(url) {

    // console.log('type');
    // console.log(url);

    if (url.endsWith('.css')) {
        return 'text/css';
    } else if (url.endsWith('.ico')) {
        return 'image/x-icon';
    }else if (url.endsWith('.png')) {
        return 'image/png';
    } else if (url.endsWith('.js')) {
        return 'application/javascript';
    } else if (url.endsWith('.gif')) {
        return 'image/gif'; 
    }
}

function log(err, hasErr){
    
    if (hasErr) {
        console.log('------------');
        console.log('ERROR !!!');
    }

    console.log('------------');
    console.log(err);
    console.log('------------');
}

