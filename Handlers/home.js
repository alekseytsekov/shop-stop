/*jshint esversion: 6 */
const responseInfo = require('../Utils/responses');

const fs = require('fs');
const url = require('url');
const path = require('path');
const queryString = require('querystring');

const db = require('../Config/database.js');

module.exports = (req, res) => {

    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../Views/Home/index.html'));
    
        fs.readFile(filePath, (err, data) => {

            if (err) {
                res.writeHead(responseInfo.codes.notFound, responseInfo.contentType.textPlain);
                res.write("404 - Source not found!");
                res.end();
                return;
            }

            let filter = getFilterFromRequest(req);
            //console.log('-- filter: ' + filter.searchquery);

            console.log('-- start loading products ...');
            let content = getAllProductsAsHtml(filter.searchquery);
            console.log('-- end loading products ...');

            let html = data.toString().replace('{content}', content);

            res.writeHead(responseInfo.codes.ok, responseInfo.contentType.html);
            res.write(html);
            res.end();
        });
    } else {
        return true;
    }
};

function getFilterFromRequest(req) {
    let queryData = queryString.parse(url.parse(req.url).query);

    return queryData;
}

function getAllProductsAsHtml(filter) {

    let products = db.products.getAll();
    let content = '';

    if (filter !== undefined) {
        
        products = products.filter(x => x.name.toLowerCase().includes(filter.toLowerCase()));
    }

    for (let product of products) {
        content += `<div class="product-card">
                        <image class="product-img" src="${product.image}"></image>
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                    </div>`;
    }

    return content;
}