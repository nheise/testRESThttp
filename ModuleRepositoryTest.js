
var assert = require('assert');

var mediaType = require('RESThttp').mediaType;

var moduleRepository = require('RESThttp').modules;

var module = {
  id : 'testModule',
  resourceLocators : [
    {
      uriPattern : '/testmodule/resource1',
      methods : {
        GET : {
          'application/json' : { }
        }
      }
    }
  ]
}

moduleRepository.put( module );

var resourceLocator = moduleRepository.findResourceLocatorForURI( '/testmodule/resource1' );
assert.ok( resourceLocator.supportRequestMethod( 'GET' ) );
assert.ok( resourceLocator.isMediaTypeSupportedForMethod( mediaType.APPLICATION_JSON, 'GET' ) );
assert.equal( resourceLocator.isMediaTypeSupportedForMethod( mediaType.TEXT_HTML, 'GET' ), false );
assert.equal( resourceLocator.isMediaTypeSupportedForMethod( mediaType.APPLICATION_JSON, 'POST' ), false );

console.log( 'ModuleRepositoryTest successful.' );
