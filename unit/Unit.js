
var assert = require( 'assert' );

var TestRunner = require( './TestRunner.js' ).TestRunner;

exports.run = function( testCaseFunction ) {
	var testCase = createTestCase( testCaseFunction );
	
	var runner = new TestRunner( testCase );
	runner.start();
};

function createTestCase( testCaseFunction ) {
	testCaseFunction.prototype = new TestCase();
	return new testCaseFunction();
};

function TestCase() {
	this.tests = {};
}

exports.assertFail = function( actual, expected, message, operator ) {
	assert.fail( actual, expected, message, operator );
};

exports.assertEquals = function( actual, expected, message ) {
	assert.equal( actual, expected, message );
};

exports.assertThrows = function( block, error, message ) {
   assert.throws( block, error, message );
};

exports.never = 0;
exports.once = 1;
exports.times = function( int ) {
  return int;
};

var verify = {};
exports.verify = verify;

verify.invoke = function( method, times ) {
  return new InvokationCheck( method, times ).caller;
};

function InvokationCheck( method, times ) {
   
   var invokations = 0;
   
   process.on( 'exit', function() {
      if( invokations > times ) {
         assert.fail( invokations, times, "invokation check fail.\n" + method + "\nshould be invoked " + times + " times, but has " + invokations + " invokation(s).", ">" );
      }
      if( invokations < times ) {
         assert.fail( invokations, times, "invokation check fail.\n" + method + "\nshould be invoked " + times + " times, but has " + invokations + " invokation(s).", "<" );
      }
   });
   
   this.caller = function() {
      invokations ++;
      method.apply( this, arguments );
   };
   
}