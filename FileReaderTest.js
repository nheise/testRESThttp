
var assert = require('assert');

var FILE_PATH = './resources/test.txt';

var fileReaderFactory = require('../RESThttp/lib/FileReader.js');

var fileReader;

var setUp = function() {
    fileReader = fileReaderFactory.createFileReader();
};

var tests = {};

tests['readFromPositionToPositionMustReturnTheContentInGivenRange'] = function() {
    
    var readWithRangeCallback = function(buffer, bytesRead, contentSize) {        
        console.log('content-size:' + contentSize);
        console.log(bytesRead + ' bytes read.');
        console.log('content:' + buffer);
        assert.equal(contentSize, 24);
        assert.equal(bytesRead, 4);
        assert.equal(buffer, "as i");
    };
    
    var errorCallback = function(err) {
        assert.fail( err, err, "readFromPositionToPosition should not fail.");
    };

    var closeCallback = function() {
        console.log("file closed.");
    };
    
    fileReader.onError(errorCallback);
    fileReader.onData(readWithRangeCallback);
    fileReader.onClose(closeCallback);
    
    var range = { begin: 1, end: 4 };

    fileReader.readFromPositionToPosition(FILE_PATH, range.begin, range.end);
    
};

tests['callReadWithoutRangeShouldReadTheHoleFile'] = function() {
    var fileReader = fileReaderFactory.createFileReader();

    var readCallback = function(buffer, bytesRead) {
        console.log(bytesRead + ' bytes read.');
        console.log('content:' + buffer);
        assert.equal(bytesRead, 24);
        assert.equal(buffer, "Das ist eine Test Datei.");
    };
    
    var errorCallback = function(err) {
        assert.fail( err, err, "readFromPositionToPosition should not fail.");
    };

    var closeCallback = function() {
        console.log("file closed.");
    };

    fileReader.onError(errorCallback);
    fileReader.onData(readCallback);
    fileReader.onClose(closeCallback);

    fileReader.read(FILE_PATH);
};

;(function() {
	
	var failureCount = 0;
	
	var startTime = new Date().getTime();
	
    for( var test in tests ) {
        setUp();
        try {
        	tests[test]();
        }
        catch( err ) {
        	fialureCount++;
        	console.log( err );
        }
        
    }
    
    var endTime = new Date().getTime();
    
    console.log( "Test run : " + tests.length + " , Failures: " + failureCount + ", Time elapsed: " + ( endTime - startTime ) + " miliSec" );
})();
