
exports.create = function( testCase ) {
    return new UnitTestRunner( testCase );
};

function UnitTestRunner( testCase ) {
    
//    console.log( testCase );
    
    runTests();
    
    function runTests() {
        
        var failureCount = 0;
        
        var startTime = new Date().getTime();
        
        for( var test in testCase.tests ) {
            testCase.setUp();
//            try {
//                console.log( test );
                testCase.tests[test]();
//            }
//            catch( err ) {
//                failureCount++;
//                console.log( err );
//            }
//            
        }
        
//        console.log( testCase.tests[0].name );
        
        var endTime = new Date().getTime();
        
        console.log( "Test run : " + testCase.tests.length + " , Failures: " + failureCount + ", Time elapsed: " + ( endTime - startTime ) + " miliSec" );
    }
    
    this.verify = function( ) {
        console.log( "verify" );
    };
}