
var unit = require( './Unit.js' );

var assertEquals = unit.assertEquals;
var verify = unit.verify;
var once = unit.once;
var times = unit.times;

unit.run( TestCase );

function TestCase() {
	
	var objectUnderTest = {};

	this.setUp = function() {
		objectUnderTest.echo = 'Hello World !!!';
		objectUnderTest.callMe = function() {};
	};
	
	this.equalsTest = function() {
		objectUnderTest.echo = 'Hello test world.';
		assertEquals( objectUnderTest.echo, 'Hello test world.', 'Echo should be \'Hello test world.\'' );
		this.stop();
	};
	
	this.anotherEqualsTest = function() {
		assertEquals( objectUnderTest.echo, 'Hello World !!!', 'Echo should be \'Hello World !!!\'' );
		this.stop();
	};
	
	this.invokationTest = function() {
      var callit = verify.invoke( objectUnderTest.callMe, once );
      callit();
      this.stop();
   };
   
   this.invokationCallThreeTimesTest = function() {
      var callit = verify.invoke( objectUnderTest.callMe, times( 3 ) );
      callit();
      callit();
      callit();
      this.stop();
   };
	
}