
var assert = require('assert');

var headerKeys = require('RESThttp').httpHeaderUtil.keys;
var contextFactory = require('../RESThttp/lib/ContextFactory.js');

var requestListener = { url : "/test/hallo", headers : { accept : 'application/json; q=0.6, text/html' }, method : 'GET' };
var responseStream = {
  writeHead : function( httpStatusCode, reasonPhrase, headers ) {
    assert.equal( httpStatusCode, 406 );
  },
  end : function() {}
};
var serverConfiguration = {};

var context = contextFactory.create( requestListener, responseStream, serverConfiguration );
setResourceLocatorInContext( context );
context.response.headers[headerKeys.CONTENT_TYPE] = 'application/json';

var ResolveRequestArgsAndExecuteRequestHandler = require('../RESThttp/lib/requestProcessor/ResolveRequestArgsAndExecuteRequestHandler.js').ResolveRequestArgsAndExecuteRequestHandler;

var check = {
  requestHandlerInvoked : false
};

new ResolveRequestArgsAndExecuteRequestHandler().process( context );

assert.ok( check.requestHandlerInvoked );

console.log('ResolveRequestArgsAndExecuteRequestHandlerTest successful');

function setResourceLocatorInContext( context ) {
  var modules = require('RESThttp').modules;

  modules.put( {
    id : 'testModule',
    resourceLocators : [
      {
        uriPattern : '/test/{var1}',
        methods : {
          GET : {
            'application/pdf' : {},
            'application/json' : function( context ) {
              check.requestHandlerInvoked = true;
              assert.equal( context.request.args.var1, 'hallo' );
            }
          }
        }
      }
    ]
  });

  context.resourceLocator = modules.findResourceLocatorForURI('/test/hallo');
}
