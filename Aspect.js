
exports.after = function( method, object, aspect ) {
    console.log( object );
    var original = object[ method ];
    
    object[ method ] = function() {
        var args = original.apply( this, arguments );
        return ret = aspect.apply( this, Array( args, null ) );
    };
};