var unit = require( './unit/Unit.js' );

var assertEquals = unit.assertEquals;
var assertFail = unit.assertFail;
var verify = unit.verify;
var once = unit.once;

var httpRequestHeaderUtil = require( '../RESThttp/lib/HTTPRequestHeaderUtil.js' );

unit.run( HTTPRequestHeaderUtilTest );

function HTTPRequestHeaderUtilTest() {
   
   var start = 647567;
   var end = 8374656;
   var size = 98675857;
   
   this.setUp = function(){};
   
   this.extractRangeWithStartAndEndTest = function() {
     
      var range = httpRequestHeaderUtil.extractRange( { range : "bytes=" + start + "-" + end }, size);
      
      assertEquals( range.start, start, "start" );
      assertEquals( range.end, end, "end" );
      
   };
   
   this.extractRangeWithStartAndNoEndTest = function() {
	     
      var range = httpRequestHeaderUtil.extractRange( { range : "bytes=" + start + "-" }, size);
      
      assertEquals( range.start, start, "start" );
      assertEquals( range.end, size, "end" );
      
   };
   
   this.extractRangeWithNoStartAndButEndTest = function() {
	     
      var range = httpRequestHeaderUtil.extractRange( { range : "bytes=-" + end }, size);
      
      assertEquals( range.start, 0, "start" );
      assertEquals( range.end, end, "end" );
      
   };
   
   this.createContentRangeStringTest = function() {
	     
      var contentRrange = httpRequestHeaderUtil.createContentRangeString( { start : start, end : end}, size);
      
      assertEquals( contentRrange, 'bytes ' + start + '-' + end + '/' + size, "ContentRange" );
      
   };
   
}