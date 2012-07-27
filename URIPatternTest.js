
var assert = require('assert');

var uriPattern = require('../RESThttp/lib/URIPattern.js');


function checkPattern( patternString, okWith, mustFailWith, checkArgs ) {

  var pattern = uriPattern.create( patternString );

  for( index in okWith ) {
    assert.ok( pattern.match( okWith[index] ) );
  }
  for( index in mustFailWith ) {
    assert.equal( pattern.match( mustFailWith[index] ), false );
  }
  for( index in checkArgs ) {
    var vars = pattern.resolveArgs( checkArgs[index].uri );
    assert.deepEqual( vars, checkArgs[index].checkVars );
  }
}

checkPattern( "/test", 
            [ "/test", "/test/" ], 
            [ "test", "test/", "/test1", "/test1/", "/test1/value1", "/test1/value1/" ],
            [ { uri : "/test", checkVars : {} },
              { uri : "/test/", checkVars : {} } ] );
checkPattern( "/test2/{var1}",
            [ "/test2/value1", "/test2/value1/" ],
            [ "/test", "/test1/", "/test1/value1", "/test2/value1/value2" ],
            [ { uri : "/test2/value1", checkVars : { var1 : "value1" } },
              { uri : "/test2/value1/", checkVars : { var1 : "value1" } } ] );
checkPattern( "/test3/{var1}/{var2}",
            [ "/test3/value1/value2", "/test3/value1/value2/" ],
            [ "/test3", "/test3/", "/test3/value1", "/test3/value1/value2/value3", "/test3/value1/value2/value3/" ],
            [ { uri : "/test3/value1/value2", checkVars : { var1 : "value1", var2 : "value2" } },
              { uri : "/test3/value1/value2/", checkVars : { var1 : "value1", var2 : "value2" } } ] );

console.log("URIMatcherTest successful.");
