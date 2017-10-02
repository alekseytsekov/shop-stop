/*jshint esversion: 6 */

const addProductRoute = '/product/add';

const resInfo = require('../Utils/responses.js');

const fs = require('fs');
const url = require('url');
const path = require('path');
const queryString = require('querystring');
const db = require('../Config/database.js');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === addProductRoute && req.method === 'GET') {
        
        let filePath = path.normalize(path.join(__dirname, '../Views/Products/add.html'));

        fs.readFile(filePath, 'utf8', (err,data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.writeHead(resInfo.codes.ok, resInfo.contentType.html);
            res.write(data);
            res.end();
        });

    } else if(req.pathname === addProductRoute && req.method === 'POST'){
        let dataString = '';

        req.on('data', (data) => {
            dataString += data;
        });

        req.on('end', () => {
            let product = queryString.parse(dataString);
 
            console.log('-- ' + JSON.stringify(product));

            db.products.add(product);

            res.writeHead(resInfo.codes.redirect, {
                Location : '/'
            });

            res.end();
        });

    } else {
        return true;
    }
}