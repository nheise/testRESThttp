
var assert = require('assert');

var contextFactory = require('../RESThttp/lib/ContextFactory.js');

var requestListener = { url : "/test/", headers : { accept : 'text/plain; q=0.6, text/html' }, method : 'GET' };
var responseStream = {
  writeHead : function( httpStatusCode, reasonPhrase, headers ) {
    assert.equal( httpStatusCode, 406 );
  },
  end : function() {}
};
var serverConfiguration = {};

var context = contextFactory.create( requestListener, responseStream, serverConfiguration );
setResourceLocatorInContext( context );

var FindAcceptedMediaType = require('../RESThttp/lib/requestProcessor/FindAcceptedMediaType.js').FindAcceptedMediaType;

var check = {
  successorNotInvoked : true,
  successorInvoked : false
};

new FindAcceptedMediaType( createSuccessor( function(){ check.successorNotInvoked = false;  } ) ).process( context );

context.request.accept.push( { type : 'application/json', q : 0.3 } );

new FindAcceptedMediaType( createSuccessor( function(){ check.successorInvoked = true; } ) ).process( context );

assert.ok( check.successorNotInvoked );
assert.ok( check.successorInvoked );

console.log('FindAcceptedMediaTypeTest successful');

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
            'application/pdf' : {},
            'application/json' : {}
          }
        }
      }
    ]
  });

  context.resourceLocator = modules.findResourceLocatorForURI('/test');
}
