var fileResponses = require('RESThttp').fileResponses;

var assert = require('assert');
var fs = require('fs');

var check = {
  filePathStrategy : function ( context ){ return './resources/test.txt'; },
  filePathStrategyFileNotExitsts : function ( context ){ return './resources/testNotThere.txt'; },
  testFileContent : 'Das ist eine Test Datei.'
};

function streamFileResponseTest( config ) {
  var writeStream = fs.createWriteStream( '/dev/null' );

  writeStream.writeHead = function( httpStatusCode, reasonPhrase, headers ) {
    config.responseStreamCheck( httpStatusCode, reasonPhrase, headers );
  };

  writeStream.on( 'pipe', function( src ) {
    assert.equal( src.path, config.filePathStrategy(), 'File path' ); 
    src.on( 'data', function ( buffer ) {
      config.bufferContentCheck( buffer );
    } );
  } );
  writeStream.on( 'error', function( exception ) { console.log('error');console.log(exception); } );

  var context = {
    request : {
      headers : config.request.headers
    },
    requestListener : {
    },
    responseStream : writeStream,
    response : { headers : {} }
  };

  var streamFileResponse = fileResponses.createStreamFileResponse( config.filePathStrategy ); 
  streamFileResponse( context );
}

// stream file response complete content
streamFileResponseTest( {
  filePathStrategy : check.filePathStrategy,
  request : { headers : {} },
  responseStreamCheck : function( httpStatusCode, reasonPhrase, headers ) {
    assert.equal( httpStatusCode, 200, 'http status code' );
    assert.equal( reasonPhrase, 'OK', 'reason phrase' );
    assert.equal( headers['accept-ranges'], 'bytes', 'accept range in response header' );
    assert.equal( headers['content-length'], check.testFileContent.length, 'content length in response header' );
  },
  bufferContentCheck : function( buffer ) {
    assert.equal( buffer.toString(), check.testFileContent, 'response content' );
  }
});

// stream file response begin and end range
streamFileResponseTest( {
  filePathStrategy : check.filePathStrategy,
  request : { 
    headers : {
      'range' : 'bytes=3-6'
    }
  },
  responseStreamCheck : function( httpStatusCode, reasonPhrase, headers ) {
    assert.equal( httpStatusCode, 206, 'http status code' );
    assert.equal( reasonPhrase, 'Partial Content', 'reason phrase' );
    assert.equal( headers['accept-ranges'], 'bytes', 'accept range in response header' );
    assert.equal( headers['content-length'], 4, 'content length in response header' );
    assert.equal( headers['content-range'], 'bytes 3-6/24', 'content range in response header' );
  },
  bufferContentCheck : function( buffer ) {
   assert.equal( buffer.toString(), check.testFileContent.slice( 3, 7 ), 'response content' );
  }
});

// stream file response start range only
streamFileResponseTest( {
  filePathStrategy : check.filePathStrategy,
  request : {
    headers : {
      'range' : 'bytes=3-'
    }
  },
  responseStreamCheck : function( httpStatusCode, reasonPhrase, headers ) {
    assert.equal( httpStatusCode, 206, 'http status code' );
    assert.equal( reasonPhrase, 'Partial Content', 'reason phrase' );
    assert.equal( headers['accept-ranges'], 'bytes', 'accept range in response header' );
    assert.equal( headers['content-length'], 21, 'content length in response header' );
    assert.equal( headers['content-range'], 'bytes 3-23/24', 'content range in response header' );
  },
  bufferContentCheck : function( buffer ) {
   assert.equal( buffer.toString(), check.testFileContent.slice( 3 ), 'response content' );
  }
});

// stream file response end range only
streamFileResponseTest( {
  filePathStrategy : check.filePathStrategy,
  request : {
    headers : {
      'range' : 'bytes=-6'
    }
  },
  responseStreamCheck : function( httpStatusCode, reasonPhrase, headers ) {
    assert.equal( httpStatusCode, 206, 'http status code' );
    assert.equal( reasonPhrase, 'Partial Content', 'reason phrase' );
    assert.equal( headers['accept-ranges'], 'bytes', 'accept range in response header' );
    assert.equal( headers['content-length'], 7, 'content length in response header' );
    assert.equal( headers['content-range'], 'bytes 0-6/24', 'content range in response header' );
  },
  bufferContentCheck : function( buffer ) {
   assert.equal( buffer.toString(), check.testFileContent.slice( 0, 7 ), 'response content' );
  }
});

// error file not found
streamFileResponseTest( {
  filePathStrategy : check.filePathStrategyFileNotExitsts,
  request : {
    headers : {
      'range' : 'bytes=-6'
    }
  },
  responseStreamCheck : function( httpStatusCode, reasonPhrase, headers ) {
    assert.equal( httpStatusCode, 404, 'http status code' );
    assert.equal( reasonPhrase, 'Not Found', 'reason phrase' );
  }
});

console.log( 'FileResponsesTest successful.' );
