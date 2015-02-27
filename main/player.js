'use strict';

var Player = function Player( player, bot ) {

  if ( player instanceof Player ) {
    return player;
  }

  this.db = bot.db;

  if ( typeof player === 'number' ) {
    // do stuff
  } else if ( !player ) {
    // do other stuff
  }

  return this;

};

Player.prototype.recordWin = function recordWin() {
  // record a win for the player
};

Player.prototype.recordLoss = function recordLoss() {
  // record a loss for the player
};

module.exports = Player;
