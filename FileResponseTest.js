/**
 * 
 */
var assert = require('assert');

var FILE_PATH = './resources/test.txt';

var mediaType = require('../lib/MediaType.js');

var fileResponseRepository = require( '../lib/FileResponse.js' );

var fileResponse = fileResponseRepository.createFileResponse(mediaType.TEXT_HTML, 'utf8');
var fileResponseWithRange = fileResponseRepository.createFileResponse(mediaType.TEXT_HTML, 'utf8');

assert.notEqual(fileResponse, fileResponseWithRange);

fileResponse.onContent( function( header, data, encoding ) {
	assert.equal(data, "Das ist eine Test Datei.");
	console.log("test ok.");
} );

fileResponseWithRange.onPartialContent( function( header, data, encoding ) {
	assert.equal(data, "as i");
	console.log("range test ok.");
} );

fileResponse.loadData( FILE_PATH );
fileResponseWithRange.loadData( FILE_PATH, "bytes=1-4" );