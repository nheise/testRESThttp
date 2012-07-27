
var assert = require('assert');

var contextFactory = require('../RESThttp/lib/ContextFactory.js');
var InitialRequestProcessor = require('../RESThttp/lib/requestProcessor/InitialRequestProcessor.js').InitialRequestProcessor;

var requestListener = { url : "/test/", headers : { accept : '*/*' } };
var responseStream = {};
var serverConfiguration = {};

function checkContext( context ) {
  assert.deepEqual( context, contextFactory.create( requestListener, responseStream, serverConfiguration ) );
}

var requestProcessorChain = { 'process' : checkContext };

new InitialRequestProcessor( requestProcessorChain, serverConfiguration ).createContextAndStartProcess( requestListener, responseStream ); 

console.log('InitialRequestProcessorTest successful.');
