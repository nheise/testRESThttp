
var assert = require('assert');

var QuickSort = require('../../RESThttp/lib/util/ArrayUtil.js').QuickSort;

var array = [ 6, 7, 2, 1, 8, 4, 3, 20, 11 ];
var sortedArray = new QuickSort( array ).sortAsc();
assert.deepEqual( sortedArray, [ 1, 2, 3, 4, 6, 7, 8, 11, 20 ] );

var sortedArray = new QuickSort( array ).sortDesc();
assert.deepEqual( sortedArray, [ 20, 11, 8, 7, 6, 4, 3, 2, 1 ] );

var array = [ { a:'b', q:6 }, { a:'b', q:7 }, { a:'b', q:2 }, { a:'b', q:1 }, { a:'b', q:8 }, { a:'b', q:4 }, { a:'b', q:3 }, { a:'b', q:20 }, { a:'b', q:11 } ];
sortedArray =  new QuickSort( array, function( ob ) { return ob.q; } ).sortAsc();
assert.deepEqual( sortedArray, 
[ { a: 'b', q: 1 },
  { a: 'b', q: 2 },
  { a: 'b', q: 3 },
  { a: 'b', q: 4 },
  { a: 'b', q: 6 },
  { a: 'b', q: 7 },
  { a: 'b', q: 8 },
  { a: 'b', q: 11 },
  { a: 'b', q: 20 } ] );

console.log('ArrayUtilTest successful.');
