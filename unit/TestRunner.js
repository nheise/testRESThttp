
var Test = require( './Test.js' ).Test;

exports.TestRunner = 

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
};