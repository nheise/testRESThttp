var runner = require( './UnitTestRunner.js' ).create();

var FILE_PATH = './resources/test.txt';

var assert = require( 'assert' );

var fileReaderFactory = require( '../RESThttp/lib/FileReader.js' );

var fileReader = {};

runner.setUp = function() {
    fileReader = fileReaderFactory.createFileReader();
};

runner.add( function readFromPositionToPositionMustReturnTheContentInGivenRange() {

    function readWithRangeCallback( buffer, bytesRead, contentSize ) {
        console.log( 'content-size:' + contentSize );
        console.log( bytesRead + ' bytes read.' );
        console.log( 'content:' + buffer );
        assert.equal( contentSize, 24 );
        assert.equal( bytesRead, 4 );
        assert.equal( buffer, "as i" );
    };

    var errorCallback = function( err ) {
        assert.fail( err, err, "readFromPositionToPosition should not fail." );
    };

    var closeCallback = function() {
        console.log( "file closed." );
    };

    fileReader.onError( errorCallback );
    fileReader.onData( readWithRangeCallback );
    fileReader.onClose( closeCallback );

    var range = {
        begin : 1,
        end : 4
    };

    fileReader.readFromPositionToPosition( FILE_PATH, range.begin, range.end );
    
} );

runner.add( function callReadWithoutRangeShouldReadTheHoleFile() {
    var fileReader = fileReaderFactory.createFileReader();

    var readCallback = function( buffer, bytesRead ) {
        console.log( bytesRead + ' bytes read.' );
        console.log( 'content:' + buffer );
        assert.equal( bytesRead, 24 );
        assert.equal( buffer, "Das ist eine Test Datei." );
    };

    var errorCallback = function( err ) {
        assert.fail( err, err, "readFromPositionToPosition should not fail." );
    };

    var closeCallback = function() {
        console.log( "file closed." );
    };

    fileReader.onError( errorCallback );
    fileReader.onData( readCallback );
    fileReader.onClose( closeCallback );

    fileReader.read( FILE_PATH );
} );

runner.run();