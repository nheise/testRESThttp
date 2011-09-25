var runner = require( './UnitTestRunner.js' );

var FILE_PATH = './resources/test.txt';

var assert = require( 'assert' );

var fileReaderFactory = require( '../RESThttp/lib/FileReader.js' );

var fileReader = {};

function setUp() {
    fileReader = fileReaderFactory.createFileReader();
};

function errorCallback( err ) {
    assert.fail( err, err, "readFromPositionToPosition should not fail." );
};

function closeCallback( testName ) {
    this.reportFinish( testName );
};

runner.test( [
  { name : 'readFromPositionToPositionMustReturnTheContentInGivenRange',
    setUp: setUp,
    expectations : [ { call : 'readWithRangeCallback', exspected : 1 } ], 
    test : function() {
       var self = this;
       
       function readWithRangeCallback( buffer, bytesRead, contentSize ) {
           console.log( 'content-size:' + contentSize );
           console.log( bytesRead + ' bytes read.' );
           console.log( 'content:' + buffer );
           assert.equal( contentSize, 24 );
           assert.equal( bytesRead, 4 );
           assert.equal( buffer, "as i" );
           self.reportCall( 'readFromPositionToPositionMustReturnTheContentInGivenRange', 'readWithRangeCallback' );
       };

       fileReader.onError( errorCallback );
       fileReader.onData( readWithRangeCallback );
       fileReader.onClose( function() {
          self.reportFinish( 'readFromPositionToPositionMustReturnTheContentInGivenRange' );
       });

       var range = {
           begin : 1,
           end : 4
       };

       fileReader.readFromPositionToPosition( FILE_PATH, range.begin, range.end );
   }
  },
  { name : 'callReadWithoutRangeShouldReadTheHoleFile',
    setUp: setUp,
    test : function() {
       var self = this;

       function readCallback( buffer, bytesRead ) {
           console.log( bytesRead + ' bytes read.' );
           console.log( 'content:' + buffer );
           assert.equal( bytesRead, 24 );
           assert.equal( buffer, "Das ist eine Test Datei." );
       };

       fileReader.onError( errorCallback );
       fileReader.onData( readCallback );
       fileReader.onClose( function() {
          self.reportFinish( 'callReadWithoutRangeShouldReadTheHoleFile' );
       });

       fileReader.read( FILE_PATH );
   }
  }
] );

