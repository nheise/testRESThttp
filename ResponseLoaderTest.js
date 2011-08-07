/**
 * 
 */
var assert = require('assert');

var responseLoader = require( '../RESThttp/lib/ResponseLoader.js' ).responseLoader;

var mediaType = require('../RESThttp/lib/MediaType.js');

var header = {};

header.setContentType = function( mediaType ) { };

var htmlResponse = responseLoader[mediaType.TEXT_HTML]( header );

var htmlResponse1 = responseLoader[mediaType.TEXT_HTML]( header );

assert.notEqual(htmlResponse, htmlResponse1);

console.log("ResponseLoader test succeed.");