/*jshint esversion: 6 */

const homeHandler = require('./home');
const filesHandler = require('./static-files');
const productHandler = require('./product.js');

function test() {
    console.log('test');
    return true;
}

module.exports = [ 
    homeHandler, 
    filesHandler,
    productHandler
];