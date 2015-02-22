'use strict';

module.exports = function Game( game, p1, p2, bot ) {

  if ( game instanceof Game ) {
    return game;
  }

  var sql;

  if ( typeof game == 'number' ) {
    sql = 'SELECT * FROM games WHERE id = ' + game;
  } else if ( !game ) {
    sql = 'INSERT INTO games (p1, p2) VALUES (' + p1.id + ', ' + p2.id + ')';
  }

  // execute sql here and make the result available for the Game object

  this.id = sqlResult.id;
  this.p1_score = sqlResult.p1_score;
  this.p2_score = sqlResult.p2_score;
  this.winner = sqlResult.winner;

  this.active = false;
  this.activePlayer = false;

  this.p1 = p1;
  this.p2 = p2;

  this.rules = bot.rules || {
    distance: 2,
    end: 21,
    interval: 5
  };

  this.db = bot.db;

  return this;

};

Game.prototype.startGame = function startGame( player ) {

  this.active = true;

  this.activePlayer = player;

  return true;

};

Game.prototype.addScore = function addScore( player ) {

  var field = player + '_score';

  this[field] += 1;

  var sql = 'UPDATE games SET ' + field + ' = ' + this[field].score + ' WHERE id = ' + this.id;

  // execute sql

  if ( !this.endCheck()) {
    this.activeCheck();
  }

  return true;

};

// TODO: make this method respect an endInterval rule if set
Game.prototype.activeCheck = function activeCheck() {

  if (( this.p1_score + this.p2_score) % this.rules.interval === 0 ) {
    this.switchActivePlayer();
  }

  return true;

};

Game.prototype.switchActivePlayer = function switchActivePlayer() {

  this.activePlayer = ( this.activePlayer === 'p1' ) ? 'p2' : 'p1';

  return true;

};

Game.prototype.endCheck = function endCheck() {

  var leader = ( this.p1_score > this.p2_score ) ? 'p1' : 'p2';
  var loser = ( leader === 'p1' ) ? 'p2' : 'p1';
  var possible = ( leader > this.rules.end );
  var confirmed = ( leader - loser ) >= this.rules.distance;

  if ( possible && confirmed ) {
    this.recordWin( leader, loser );

    return true;
  }

  return false;

};

Game.prototype.recordWin = function recordWin( leader, loser ) {

  var sql = 'UPDATE games SET winner = ' + leader + ' WHERE id = ' + this.id;

  // execute sql;

  this.active = false;
  this.winner = leader;

  this[leader].recordWin();
  this[loser].recordLoss();

};
