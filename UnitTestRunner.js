
exports.create = function( ) {
    return new UnitTestRunner( );
};

function UnitTestRunner( ) {
    
    var self = this;
    
    this.setUp;
    
    this.tests = [];
    
    process.on('exit', function () {
        for( var index in self.tests ) {
            self.tests[ index ].endTime = new Date().getTime();
            console.log( "Test run : " + self.tests[ index ].test.name + ", Time elapsed: " + ( self.tests[ index ].endTime - self.tests[ index ].startTime ) + " milis" );
        }
    });
    
    this.run = function() {
        
        for( var index in self.tests ) {
            self.setUp();

            self.tests[ index ].startTime = new Date().getTime();
            
            self.tests[ index ].test();
        }

    };
    
    this.add = function( test ) {
        self.tests.push( { test : test } );
    };
    
    this.verify = function( ) {
        console.log( "verify" );
    };
}