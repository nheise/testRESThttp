var assert = require('assert');

var responseUtil = require('RESThttp').responseUtil;
var responseFactory = require('../RESThttp/lib/ResponseFactory.js');

var context;

function setUpContext( checkWriteHead, checkEnd ) {
  context = {};
  context.responseStream = {
    writeHead : checkWriteHead,
    end : checkEnd || function(){}
  };
  context.response = responseFactory.create();//{ headers : {}, encoding : 'utf8' };
}

setUpContext( 
  function( httpStatusCode, reasonPhrase, headers ) {
    assert.equal( httpStatusCode, 200, 'status code should be 200' );
    assert.equal( reasonPhrase, 'OK', 'reason phrase should be OK' );
  },
  function() {
    assert( false, 'should never be invoked.' );
  }
);
responseUtil.writeHead200( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 200, 'status code should be 200' );
  assert.equal( reasonPhrase, 'OK', 'reason phrase should be OK' );
},
function( data, encoding ) {
  assert.equal( data, "", 'data should be an empty string' );
  assert.equal( encoding, 'utf8', 'encoding should be utf8' );
});
responseUtil.send200( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 201, 'status code should be 201' );
  assert.equal( reasonPhrase, 'Created', 'reason phrase should be Created' );
},
function( data, encoding ) {
  assert.equal( data, "", 'data should be an empty string' );
  assert.equal( encoding, 'utf8', 'encoding should be utf8' );
});
responseUtil.send201( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 206, 'status code should be 206' );
  assert.equal( reasonPhrase, 'Partial Content', 'reason phrase should be partial content' );
});
responseUtil.writeHead206( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 206, 'status code should be 206' );
  assert.equal( reasonPhrase, 'Partial Content', 'reason phrase should be partial content' );
},
function( data, encoding ) {
  assert.equal( data, "", 'data should be an empty string' );
  assert.equal( encoding, 'utf8', 'encoding should be utf8' );
});
responseUtil.send206( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 302, 'status code should be 302' );
  assert.equal( reasonPhrase, 'Found', 'reason phrase should be Found' );
},
function( data, encoding ) {
  assert.equal( data, "", 'data should be an empty string' );
  assert.equal( encoding, 'utf8', 'encoding should be utf8' );
});
responseUtil.send302( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 303, 'status code should be 303' );
  assert.equal( reasonPhrase, 'See Other', 'reason phrase should be Found' );
},
function( data, encoding ) {
  assert.equal( data, "", 'data should be an empty string' );
  assert.equal( encoding, 'utf8', 'encoding should be utf8' );
});
responseUtil.send303( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 307, 'status code should be 307' );
  assert.equal( reasonPhrase, 'Temporary Redirect', 'reason phrase should be Temporary Redirect' );
},
function( data, encoding ) {
  assert.equal( data, "", 'data should be an empty string' );
  assert.equal( encoding, 'utf8', 'encoding should be utf8' );
});
responseUtil.send307( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 404, 'status code should be 404' );
  assert.equal( reasonPhrase, 'Not Found', 'reason phrase should be Not Found' );
});
responseUtil.send404( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 405, 'status code should be 405' );
  assert.equal( reasonPhrase, 'Method Not Allowed.', 'reason phrase should be Method Not Allowed.' );
});
responseUtil.send405( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 406, 'status code should be 406' );
  assert.equal( reasonPhrase, 'Not Acceptable.', 'reason phrase should be Not Acceptable.' );
});
responseUtil.send406( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 415, 'status code should be 415' );
  assert.equal( reasonPhrase, 'Unsupported Media Type.', 'reason phrase should be Unsupported Media Type.' );
});
responseUtil.send415( context );

setUpContext( function( httpStatusCode, reasonPhrase, headers ) {
  assert.equal( httpStatusCode, 500, 'status code should be 500' );
  assert.equal( reasonPhrase, 'Internal Server Error.', 'reason phrase should be Internal Server Error.' );
});
responseUtil.send500( context );

console.log( 'ResponseUtilTest successful.' );
