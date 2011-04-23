
var assert = require('assert');

var FILE_PATH = './resources/test.txt';

var fileReaderFactory = require('../lib/FileReader.js');

var fileReader1 = fileReaderFactory.createFileReader();

var readWithRangeCallback = function(buffer, bytesRead, contentSize) {        
    console.log('content-size:' + contentSize);
    console.log(bytesRead + ' bytes read.');
    console.log('content:' + buffer);
    assert.equal(contentSize, 24);
    assert.equal(bytesRead, 4);
    assert.equal(buffer, "as i");
};

var errorCallback = function(err) {
    console.log(err);
};

var closeCallback = function() {
	console.log("file closed.");
};

fileReader1.onError(errorCallback);
fileReader1.onData(readWithRangeCallback);
fileReader1.onClose(closeCallback);

var range = { begin: 1, end: 4 };

fileReader1.readFromPositionToPosition(FILE_PATH, range.begin, range.end);

var fileReader2 = fileReaderFactory.createFileReader();

var readCallback = function(buffer, bytesRead, contentSize) {        
    console.log('content-size:' + contentSize);
    console.log(bytesRead + ' bytes read.');
    console.log('content:' + buffer);
    assert.equal(contentSize, 24);
    assert.equal(bytesRead, 24);
    assert.equal(buffer, "Das ist eine Test Datei.");
};

fileReader2.onError(errorCallback);
fileReader2.onData(readCallback);
fileReader2.onClose(closeCallback);

fileReader2.read(FILE_PATH);