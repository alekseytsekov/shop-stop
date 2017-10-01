/*jshint esversion: 6 */
const responseInfo = require('../Utils/responses');

const fs = require('fs');
const url = require('url');
const path = require('path');

module.exports = (req, res) => {

    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../Views/Home/index.html'));
    
        fs.readFile(filePath, (err, data) => {

            if (err) {
                console.log('IMA GRESHKA    !!!!');
                console.log(err);
                res.writeHead(responseInfo.codes.notFound, responseInfo.contentType.textPlain);
                res.write("404 - Source not found!");
                res.end();
                return;
            }

            res.writeHead(responseInfo.codes.ok, responseInfo.contentType.html);
            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};

