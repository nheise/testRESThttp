/**
 * 
 */
var unit = require( './unit/Unit.js' );

var assertEquals = unit.assertEquals;
var assertNotEquals = unit.assertNotEquals;
var assertFail = unit.assertFail;
var verify = unit.verify;
var once = unit.once;

var FILE_PATH = './resources/test.txt';

var mediaType = require( '../RESThttp/lib/MediaType.js' );

var httpResponseHeader = require( '../RESThttp/lib/HTTPResponseHeader.js' );

var fileResponseFactory = require( '../RESThttp/lib/FileResponse.js' );

unit.run( FileResponseTest );

function FileResponseTest() {
	
	var header = {};
	
	var fileResponse = {};
	
	this.setUp = function() {
		header = httpResponseHeader.createHTTPResponseHeader( mediaType.TEXT_HTML );
		fileResponse = fileResponseFactory.createFileResponse( header, 'utf8' );
	};
	
	this.fileResponseFactoryShouldNotReturnTheSameInstacesAtCreateFileResponseTest = function() {
		var anOtherFileResponse = fileResponseFactory.createFileResponse( header, 'utf8' );
		assertNotEquals( fileResponse, anOtherFileResponse, "fileResponse should not equal an onther fileResponse." );
	};
	
	this.fileResponseShouldReturnTheHoleFileWhenNoRangeIsGivenTest = function() {
		var test = this;
		
		fileResponse.onContent( function( data, encoding ) {
		   assertEquals( data, "Das ist eine Test Datei." );
		   test.stop();
		} );
		
		fileResponse.loadData( FILE_PATH );
	};
	
	this.fileResponseShouldReturnContentInRangeWhenRangeIsGivenTest = function() {
		var test = this;
		
		fileResponse.onPartialContent( function( data, encoding ) {
		   assertEquals( data, "as i", "Partial content is not 'as i'" );
		   //console.log(data.toString('utf8', 0, data.size));
		   var headerFields = header.getFields();
		   assertEquals( headerFields['content-range'], 'bytes 1-4/24' );
		   test.stop();
		} );
		
		fileResponse.loadData( FILE_PATH, "bytes=1-4" );
	};
	
}