/**
 * 
 */
var assert = require('assert');

var responseLoader = require( '../lib/ResponseLoader.js' ).responseLoader;

var mediaType = require('../lib/MediaType.js');

var htmlResponse = responseLoader[mediaType.TEXT_HTML]();

var htmlResponse1 = responseLoader[mediaType.TEXT_HTML]();

assert.notEqual(htmlResponse, htmlResponse1);

console.log("ResponseLoader test succeed.");