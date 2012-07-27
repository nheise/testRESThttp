var assert = require('assert');
var format = require('util').format;

var headerUtil = require( 'RESThttp' ).httpHeaderUtil;

var check = {
  rangeFormat : 'bytes %d-%d/%d',
  start : 647567,
  end : 8374656,
  length : 7727090,
  size : 98675857
}

var headerWithStartEndRange = {
  'range' : 'bytes=' + check.start + '-' + check.end
}

var headerWithStartOnlyRange = {
  'range' : 'bytes=' + check.start + '-'
}

var headerWithEndOnlyRange = {
  'range' : 'bytes=-' + check.end
}
assert.ok( headerUtil.hasRange( headerWithStartEndRange ), 'hasRange should be true with rangeHeader' );
assert.equal( headerUtil.hasRange( {} ), false, 'hasRange should be false with noRangeHeader' );

assert.deepEqual( headerUtil.extractRange( headerWithStartEndRange ), { start : check.start, end : check.end, length : check.length },  'range should have start, end and length');
assert.deepEqual( headerUtil.extractRange( headerWithStartOnlyRange ), { start : check.start, end : undefined, length : undefined },  'range should have start and undefined end and length');

assert.deepEqual( headerUtil.extractRange( headerWithEndOnlyRange ), { start : 0, end : check.end, length : check.end + 1 },  'range should have start, end and length');

var rangeWithEnd = {
  start : check.start,
  end : check.end,
  length : check.length
}

var rangeWithoutEnd = {
  start : check.start,
  end : undefined,
  length : undefined
}

assert.equal( headerUtil.calcContentLength( rangeWithEnd, check.size ), check.end - check.start + 1, 'contentLength should be.' );
assert.equal( headerUtil.calcContentLength( rangeWithoutEnd, check.size ), check.size - check.start, 'contentLength should be.' );

assert.equal( headerUtil.createContentRangeString( rangeWithEnd, check.size ), format( check.rangeFormat, check.start, check.end, check.size ), 'content range with start and end.');
assert.equal( headerUtil.createContentRangeString( rangeWithoutEnd, check.size ), format( check.rangeFormat, check.start, check.size - 1, check.size ), 'content range with start only.');

console.log( 'HTTPHeaderUtilTest successful.' );
