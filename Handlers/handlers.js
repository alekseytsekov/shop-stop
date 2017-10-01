/*jshint esversion: 6 */

const homeHandler = require('./home');
const filesHandler = require('./static-files');

function test() {
    console.log('test');
    return true;
}

module.exports = [ 
    homeHandler, 
    filesHandler 
];