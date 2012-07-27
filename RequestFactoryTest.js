
var assert = require('assert');

var requestFactory = require('../RESThttp/lib/RequestFactory.js');

var requestListener = {
  url : '/test/',
  method : 'GET',
  headers : {
    accept : 'text/*;q=0.3, text/html;q=0.7, text/html;level=1, text/html;level=2;q=0.4, */*;q=0.5'
  }
};

var request = requestFactory.create( requestListener );

assert.equal( request.uri, requestListener.url );
assert.equal( request.method, requestListener.method );
assert.deepEqual( request.headers, requestListener.headers );

console.log('RequestFactoryTest successful.');
