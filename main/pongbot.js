'use strict';

var Pongbot = function Pongbot() {

  if ( !( this instanceof Pongbot )) {
    return new Pongbot();
  }

  var Sql = require( 'sqlite3' );
  var Edison = require( 'edison-io' );
  var Five = require( 'johnny-five' );

  this.db = new Sql.Database( '../db/pongbot.db' );

  this.board = new Five.Board({
    io: new Edison()
  });

  this.game = false;
  this.p1 = false;
  this.p2 = false;

  return this;

};

Pongbot.prototype.init = function init( opts ) {

  this.rules = opts.rules || {};

  this.p1 = new Pongbot.Player( opts.p1 || this.p1, this );
  this.p2 = new Pongbot.Player( opts.p2 || this.p2, this );

  this.game = new Pongbot.Game(( opts.game || this.game ), this.p1, this.p2, this );

  return true;

};

Pongbot.prototype.Player = require( '.player.js' );
Pongbot.prototype.Game = require( './game.js' );

module.exports = Pongbot;
