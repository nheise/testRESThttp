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
   
   this.setUp = function(){};
   
   this.extractRangeWithStartAndEndInformationTest = function() {
     
      var range = httpRequestHeaderUtil.extractRange( { range : "bytes=" + start + "-" + end }, 100);
      
      assertEquals( range.start, start, "start" );
      assertEquals( range.end, end, "end" );
      
   };
   
}