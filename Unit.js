
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
	this.tests = {};
}

function Test( testCase, testFunction ) {
   
   var startTime = 0;
   var stopTime = 0;
   
   this.start = function() {
      startTime = new Date().getTime();
      testFunction.call( testCase );
   };
   
   this.stop = function() {
      if( stopTime == 0 ) {
         stopTime = new Date().getTime();
      }
   };
   
   this.duration = function() {
      return stopTime - startTime;
   };
}

function TestRunner( testCase ) {
	
	findTests();
	
	this.start = function() {
		for( var i in testCase.tests ) {
			var test = testCase.tests[ i ];
			testCase.setUp();
			test.start();
		}
	};
	
	process.on( 'exit', function() {
      for( var i in testCase.tests) {
         var test = testCase.tests[i];
         test.stop();
         console.log( "Test run : " + i
               + ", Time elapsed: "
               + test.duration()
               + " milis" );
      }
   } );
	
	function findTests() {
		for( var p in testCase ) {
			var object = testCase[p];
			if( isFunction( object ) && endsWithTest( p ) ) {
				testCase.tests[p] = new Test( testCase, object );
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