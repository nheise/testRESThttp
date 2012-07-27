
var assert = require('assert');

var contextFactory = require('../RESThttp/lib/ContextFactory.js');

var requestListener = { url : "/test/", headers : { accept : '*/*' }, method : 'POST' };
var responseStream = {
  writeHead : function( httpStatusCode, reasonPhrase, headers ) {
    assert.equal( httpStatusCode, 405 );
  },
  end : function() {}
};
var serverConfiguration = {};

var context = contextFactory.create( requestListener, responseStream, serverConfiguration );
setResourceLocatorInContext( context );

var ResourceLocatorSupportsRequestMethod = require('../RESThttp/lib/requestProcessor/ResourceLocatorSupportsRequestMethod.js').ResourceLocatorSupportsRequestMethod;

var check = {
  successorNotInvoked : true,
  successorInvoked : false
};

new ResourceLocatorSupportsRequestMethod( createSuccessor( function(){ check.successorNotInvoked = false;  } ) ).process( context );

context.request.method = 'GET';

new ResourceLocatorSupportsRequestMethod( createSuccessor( function(){ check.successorInvoked = true; } ) ).process( context );

assert.ok( check.successorNotInvoked );
assert.ok( check.successorInvoked );

console.log('ResourceLocatorSupportsRequestMethodTest successful');

function createSuccessor( check ) {
  return {
    process : function( context ) {
      check( context );
    }
  };
}

function setResourceLocatorInContext( context ) {
  var modules = require('RESThttp').modules;

  modules.put( {
    id : 'testModule',
    resourceLocators : [
      {
        uriPattern : '/test',
        methods : {
          GET : {
            '*/*' : {}
          }
        }
      }
    ]
  });

  context.resourceLocator = modules.findResourceLocatorForURI('/test');  
}
