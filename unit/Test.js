
exports.Test = 
   
function Test( testCase, testFunction ) {
   
   var startTime = 0;
   var stopTime = 0;
   
   this.start = function() {
      startTime = new Date().getTime();
      testFunction.call( this );
   };
   
   this.stop = function() {
      if( stopTime == 0 ) {
         stopTime = new Date().getTime();
      }
   };
   
   this.duration = function() {
      return stopTime - startTime;
   };
};