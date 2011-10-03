var unit = require( './unit/Unit.js' );

var assertEquals = unit.assertEquals;
var assertFail = unit.assertFail;
var verify = unit.verify;
var once = unit.once;

var FILE_PATH = './resources/test.txt';

var fileReaderFactory = require( '../RESThttp/lib/FileReader.js' );

unit.run( FileReaderTest );

function FileReaderTest() {

   var fileReader = {};
   
   this.setUp = function() {
       fileReader = fileReaderFactory.createFileReader();
   };
   
   this.readFromPositionToPositionMustReturnTheContentInGivenRangeTest = function() {
      var test = this;
      
     function readWithRangeCallback( buffer, bytesRead, contentLength ) {
         assertEquals( contentLength, 24 );
         assertEquals( bytesRead, 4, "bytes read should be 4");
         assertEquals( buffer, "as i" );
     };

     fileReader.onError( errorCallback );
     fileReader.onData( verify.invoke( readWithRangeCallback, once ) );
     fileReader.onClose( function() {
        test.stop();
     });

     var range = {
         offset : 1,
         length : 4
     };

     fileReader.read( FILE_PATH, range );
   };
   
   this.readWithoutRangeShouldReadTheHoleFileTest = function() {
      var test = this;

      function readCallback( buffer, bytesRead ) {
          assertEquals( bytesRead, 24 );
          assertEquals( buffer, "Das ist eine Test Datei." );
      };

      fileReader.onError( errorCallback );
      fileReader.onData( verify.invoke( readCallback, once ) );
      fileReader.onClose( function() {
         test.stop();
      });

      fileReader.read( FILE_PATH );
   };
   
   function errorCallback( err ) {
       assertFail( err, err, "readFromPositionToPosition should not fail." );
   };
}