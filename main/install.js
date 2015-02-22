// symlink the js file to wherever it needs to go
// /node_app_slot maybe?
var fs = require( 'fs' );

fs.symlink( './main', './node_app_slot', 'dir', function( err ) {
  if ( err ) {
    throw err;
  }
});


// run the sql generation so the database exists and is ready to use
var sql = require( 'sqlite3' ).verbose();

var db = new sql.Database( './db/pongbot.db' );

db.on( 'open', function( err ) {
  if ( this.open ) {
    console.log( 'database exists' )
  } else {
    throw err;
  }
});
