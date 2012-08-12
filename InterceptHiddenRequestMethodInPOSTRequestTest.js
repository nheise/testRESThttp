
var assert = require('assert');
var stream = require('stream');

var contextFactory = require('../RESThttp/lib/ContextFactory.js');
var InterceptHiddenRequestMethodInPOSTRequest = require('../RESThttp/lib/requestProcessor/InterceptHiddenRequestMethodInPOSTRequest.js').InterceptHiddenRequestMethodInPOSTRequest;

function buildAndRunTest( requestListenerOptions, checkSuccessor ) {

  var requestListener = new stream.Stream()
  requestListener.readable = true;
  requestListener.url = '/test';
  requestListener.method = requestListenerOptions.method;
  requestListener.headers = requestListenerOptions.headers; 

  var responseStream = {};
  var serverConfiguration = {};

  var context = contextFactory.create( requestListener, responseStream, serverConfiguration );

  var successor = {
    process : checkSuccessor
  };

  new InterceptHiddenRequestMethodInPOSTRequest( checkSuccessor ).process( context );

  requestListener.emit( 'data', requestListenerOptions.data );
  requestListener.emit( 'end' );
};

buildAndRunTest( { 
  method : "POST",
  headers : {
    accept : 'text/html',
    'content-type' : 'application/x-www-form-urlencoded'
  },
  data : 'foo=hallo&_method=PUT'
},{
  process : function( context ) {
    assert.equal( context.request.method, 'PUT' );
    assert.deepEqual( context.request.data, { foo : 'hallo' } );
  }
});

buildAndRunTest( { 
  method : "POST",
  headers : {
    accept : 'text/html',
    'content-type' : 'application/json'
  },
  data : 'foo=hallo&_method=PUT'
},{
  process : function( context ) {
    assert.equal( context.request.method, 'POST' );
    assert.deepEqual( context.request.data, undefined );
  }
});

buildAndRunTest( { 
  method : "POST",
  headers : {
    accept : 'application/json',
    'content-type' : 'application/x-www-form-urlencoded'
  },
  data : 'foo=hallo&_method=DELETE'
},{
  process : function( context ) {
    assert.equal( context.request.method, 'DELETE' );
    assert.deepEqual( context.request.data, { foo : 'hallo' } );
  }
});

console.log('InterceptHiddenRequestMethodInPOSTRequestTest successful.');
