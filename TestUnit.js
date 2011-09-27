
var unit = require( './Unit.js' );

var assertEquals = unit.assertEquals;

unit.run( TestCase );

function TestCase() {
	
	var objectUnderTest = {};

	this.setUp = function() {
		objectUnderTest.echo = 'Hello World !!!';
	};
	
	this.equalsTest = function() {
		objectUnderTest.echo = 'Hello test world.';
		assertEquals( objectUnderTest.echo, 'Hello test world.', 'Echo should be \'Hello test world.\'' );
	};
	
	this.anotherEqualsTest = function() {
		assertEquals( objectUnderTest.echo, 'Hello World !!!', 'Echo should be \'Hello World !!!\'' );
	};
	
}