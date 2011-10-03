/**
 * 
 */
var assert = require( 'assert' );

var FILE_PATH = './resources/test.txt';

var mediaType = require( '../RESThttp/lib/MediaType.js' );

var httpResponseHeader = require( '../RESThttp/lib/HTTPResponseHeader.js' );

var fileResponseFactory = require( '../RESThttp/lib/FileResponse.js' );

var header = httpResponseHeader.createHTTPResponseHeader( mediaType.TEXT_HTML );
var headerForResponseWithRange = httpResponseHeader.createHTTPResponseHeader( mediaType.TEXT_HTML );

var fileResponse = fileResponseFactory.createFileResponse( header, 'utf8' );
var fileResponseWithRange = fileResponseFactory.createFileResponse( headerForResponseWithRange, 'utf8' );

assert.notEqual( fileResponse, fileResponseWithRange );

fileResponse.onContent( function( data, encoding ) {
   assert.equal( data, "Das ist eine Test Datei." );
   console.log( "test ok." );
} );

fileResponseWithRange.onPartialContent( function( data, encoding ) {
   assert.equal( data, "as i", "Partial content is not 'as i'" );
   //console.log(data.toString('utf8', 0, data.size));
   var headerFields = headerForResponseWithRange.getFields();
   assert.equal( headerFields['content-range'], 'bytes 1-4/24' );
   console.log( "range test ok." );
} );

//fileResponse.loadData( FILE_PATH );
fileResponseWithRange.loadData( FILE_PATH, "bytes=1-4" );