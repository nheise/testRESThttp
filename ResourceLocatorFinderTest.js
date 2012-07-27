
var assert = require('assert');

var contextFactory = require('../RESThttp/lib/ContextFactory.js');

var requestListener = { url : "/testHereNotAvailable/", headers : { accept : '*/*' } };
var responseStream = {
  writeHead : function( httpStatusCode, reasonPhrase, headers ) {
    assert.equal( httpStatusCode, 404 );
  },
  end : function() {}
};
var serverConfiguration = {};

var ResourceLocatorFinder = require('../RESThttp/lib/requestProcessor/ResourceLocatorFinder.js').ResourceLocatorFinder;
var context = contextFactory.create( requestListener, responseStream, serverConfiguration );

new ResourceLocatorFinder( {} ).process( context );

var successor = {
  process : function( context ) {
    assert.ok( context.resourceLocator != undefined );
  }
};

var modules = require('RESThttp').modules;

modules.put( {
  id : 'testModule',
  resourceLocators : [
    {
      uriPattern : '/testHereNotAvailable',
      methods : {
        GET : {
          '*/*' : {}
        }
      }
    }
  ]
});

new ResourceLocatorFinder( successor ).process( context );
