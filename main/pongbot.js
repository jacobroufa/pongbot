'use strict';

module.exports = function pongbot() {

  if ( !( this instanceof pongbot )) {
    return new pongbot();
  }

  var sql = require( 'sqlite3' );
  var edison = require( 'edison-io' );
  var five = require( 'johnny-five' );

  this.db = new sql.Database( '../db/pongbot.db' );

  this.board = new five.Board({
    io: new edison()
  });

  this.game = false;
  this.p1 = false;
  this.p2 = false;

  return this;

}

pongbot.prototype.init = function init( opts ) {

  this.p1 = new pongbot.Player( opts.p1 || this.p1, this );
  this.p2 = new pongbot.Player( opts.p2 || this.p2, this );

  this.game = new pongbot.Game(( opts.game || this.game ), this.p1, this.p2, this );

  return true;

};

pongbot.prototype.Player = require( '.player.js' );
pongbot.prototype.Game = require( './game.js' );
