exports.test = function( tests ) {
   new UnitTestRunner( tests ).run();
};

function UnitTestRunner( tests ) {

   var self = this;

   this.tests = tests || [];
   
   addFunctionsToTests();
   
   prepareExpectations();
   
   process.on( 'exit', function() {
      for( var index in self.tests) {
         var test = self.tests[index];
         if( test.endTime == undefined ) {
            test.endTime = new Date().getTime();
         }
         console.log( "Test run : " + test.name
               + ", Time elapsed: "
               + ( test.endTime - test.startTime )
               + " milis" );
      }
   } );

   this.run = function() {

      for( var index in self.tests) {
         var test = self.tests[index];
         
         test.setUp();

         test.startTime = new Date().getTime();

         test.test();
      }

   };
   
   function addFunctionsToTests() {
      for( var index in self.tests) {
         var test = self.tests[index];

         test.testDev = test;
         test.reportCall = reportCall;
         test.reportFinish = reportFinish;
      }
   }
   
   function prepareExpectations() {
      for( var index in self.tests) {
         var test = self.tests[index];
         
         for( var expectation in test.expectations) {
            if( test.expectations[ expectation ] ) {
               test.expectations[ expectation ].actual = 0;
            }
         }
      }
   }
   
   function reportCall( testName, functionName ) {
      for( var index in self.tests) {
         var test = self.tests[index];
         
         if( test.name == testName ) {
            for( var expectation in test.expectations ) {
               if( test.expectations[ expectation ].call == functionName ) {
                  test.expectations[ expectation ].actual++;
               }
            }
         }
      }
   }
   
   function reportFinish( testName ) {
      for( var index in this.tests) {
         var test = this.tests[index];
         if( test.name == testName ) {
            test.endTime = new Date().getTime();
         }
      }
   }
}
