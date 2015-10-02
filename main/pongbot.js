'use strict';

var Pongbot = function Pongbot() {

  if ( !( this instanceof Pongbot )) {
    return new Pongbot();
  }

  /*var Edison = require( 'edison-io' );
  var Five = require( 'johnny-five' );

  this.board = new Five.Board({
    io: new Edison()
  });*/

  this.game = false;
  this.p1 = false;
  this.p2 = false;

  return this;

};

Pongbot.prototype.Player = require( './player.js' );
Pongbot.prototype.Players = require( './players.js' );
Pongbot.prototype.Game = require( './game.js' );

Pongbot.prototype.init = function init( opts ) {

  var p1 = {}, p2 = {};

  opts = opts || {};

  this.rules = opts.rules || {};

  if ( opts.p1 || this.p1 ) {
    p1 = {id: opts.p1 || this.p1};
  }

  if ( opts.p2 || this.p2 ) {
    p2 = {id: opts.p2 || this.p2};
  }

  this.p1 = new this.Player( p1 );
  this.p2 = new this.Player( p2 );

  this.players = new this.Players([this.p1, this.p2]);

  this.game = new this.Game(( opts.game || this.game ), this.rules, this.players );

  return true;

};

module.exports = Pongbot;
