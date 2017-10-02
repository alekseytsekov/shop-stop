/*jshint esversion: 6 */

const response = {};

response.codes = {
    ok : 200,
    notFound : 404,
    redirect : 302
};

response.contentType = {};
response.contentType.textPlain = { 'content-type' : 'text/plain'};
response.contentType.js = { 'content-type' : 'application/javascript'};
response.contentType.html = { 'content-type' : 'text/html'};

module.exports = response; 