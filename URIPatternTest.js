/**
 * 
 */

var assert = require('assert');

var uriPattern = require('../RESThttp/lib/URIPattern.js');

var uriPatterns = [
	uriPattern.create("/test/{id}"),
	uriPattern.create("/products/{category}/{id}")
];
var uris = [
	"/test/1234",
	"/products/shoes/1234"
];

for(index in uris) {
	assert.ok(uriPatterns[index].match(uris[index]), "no hit");
}

var vars = uriPatterns[1].resolve(uris[1]);
assert.equal(vars.category, "shoes");
assert.equal(vars.id, "1234");

console.log("URIMatcher Test successful!");
