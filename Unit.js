
var assert = require( 'assert' );

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
	
}

function TestRunner( testCase ) {
	
	var tests = [];
	
	findTests();
	
	this.start = function() {
		for( var i in tests ) {
			var test = tests[ i ];
			testCase.setUp();
			test.call( testCase );
		}
	};
	
	function findTests() {
		for( var p in testCase ) {
			var object = testCase[p];
			if( isFunction( object ) && endsWithTest( p ) ) {
				tests.push( object );
			}
		}
	}
	
	function isFunction( object ) {
		return typeof object == 'function';
	}
	
	function endsWithTest( name ) {
		var start = name.length - 4;
		return name.substring( start, name.length ) == 'Test';
	}
}

exports.assertFail = function( actual, expected, message, operator ) {
	assert.fail( actual, expected, message, operator );
};

exports.assertEquals = function( actual, expected, message ) {
	assert.equal( actual, expected, message );
};