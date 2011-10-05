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
		
		fileResponse.onContent( verify.invoke( function( data, encoding ) {
		   assertEquals( data, "Das ist eine Test Datei." );
		   test.stop();
		}, once ) );
		
		fileResponse.loadData( FILE_PATH );
	};
	
	this.fileResponseShouldReturnContentFromByte2ToByte4Test = function() {
		var test = this;
		
		fileResponse.onPartialContent( verify.invoke( function( data, encoding ) {
		   assertEquals( data, "s ist", "Partial content is not 's ist'" );
//		   console.log(data.toString('utf8', 0, data.size));
		   test.stop();
		}, once ) );
		
		fileResponse.loadData( FILE_PATH, "bytes=2-6" );
	};
	
	this.fileResponseShouldReturnContentFromByte5ToEndTest = function() {
		var test = this;
		
		fileResponse.onPartialContent( verify.invoke( function( data, encoding ) {
		   assertEquals( data, "st eine Test Datei.", "Partial content is not 'st eine Test Datei.'" );
		   test.stop();
		}, once ) );
		
		fileResponse.loadData( FILE_PATH, "bytes=5-" );
	};
	
	this.fileResponseShouldReturnContentFromStartToByte5Test = function() {
		var test = this;
		
		fileResponse.onPartialContent( verify.invoke( function( data, encoding ) {
		   assertEquals( data, "Das is", "Partial content is not 'Das is'" );
		   test.stop();
		}, once ) );
		
		fileResponse.loadData( FILE_PATH, "bytes=-5" );
	};
	
}