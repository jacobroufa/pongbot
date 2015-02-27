'use strict';

var Game = function Game( game, p1, p2, bot ) {

  if ( game instanceof Game ) {
    return game;
  }

  var sqlResult;

  this.db = bot.db;

  if ( typeof game === 'number' ) {

    this.db.get( 'SELECT * FROM games WHERE id = $game', {
      $game: game
      }, function( er, row ) {
        sqlResult = row;
      });

  } else if ( !game ) {

    this.db.run( 'INSERT INTO games (p1, p2) VALUES ( $p1, $p2 )', {
        $p1: p1.id,
        $p2: p2.id
      }, function() {
        sqlResult = this;
      });

  }

  console.log( sqlResult );

  this.id = sqlResult.id || sqlResult.lastId;
  this.p1_score = sqlResult.p1_score || 0;
  this.p2_score = sqlResult.p2_score || 0;
  this.winner = sqlResult.winner || false;

  this.active = false;
  this.activePlayer = false;

  this.p1 = p1;
  this.p2 = p2;

  this.rules = bot.rules || {
    alternateEnding: true,
    distance: 2,
    end: 21,
    interval: 5,
    loserEnding: true
  };

  return this;

};

Game.prototype.startGame = function startGame( player ) {

  this.active = true;

  this.activePlayer = player;

};

Game.prototype.addScore = function addScore( player ) {

  var field = player + '_score';

  this[field] += 1;

  this.db.run( 'UPDATE games SET $player = $score WHERE id = $id', {
    $player: field,
    $score: this[field],
    $id: this.id
  });

  if ( !this.endCheck()) {
    this.activeCheck();
  }

};

Game.prototype.activeCheck = function activeCheck() {

  var placement = placement( this.p1_score, this.p2_score );
  var leader = placement.leader;
  var loser = placement.loser;
  var end = this.rules.end;

  if ( this.rules.alternateEnding &&
    ( leader.score >= end - 1 ) &&
    ( loser.score >= end - 1 )) {
    this.switchActivePlayer();
    return false;
  }

  if ( this.rules.loserEnding &&
    ( leader.score >= end - 1 ) &&
    ( loser.score < end - 1 )) {
    this.activePlayer = loser.player;
    return false;
  }

  if (( leader.score + loser.score ) % this.rules.interval === 0 ) {
    this.switchActivePlayer();
    return false;
  }

};

Game.prototype.switchActivePlayer = function switchActivePlayer() {

  this.activePlayer = ( this.activePlayer === 'p1' ) ? 'p2' : 'p1';

};

Game.prototype.endCheck = function endCheck() {

  var placement = placement( this.p1_score, this.p2_score );
  var leader = placement.leader;
  var loser = placement.loser;

  var possible = ( leader.score > this.rules.end );
  var confirmed = ( leader.score - loser.score ) >= this.rules.distance;

  if ( possible && confirmed ) {
    this.recordWin( leader.player, loser.player );

    return true;
  }

  return false;

};

Game.prototype.recordWin = function recordWin( leader, loser ) {

  this.db.run( 'UPDATE games SET winner = $leader WHERE id = $id', {
    $leader: leader,
    $id: this.id
  });

  this.active = false;
  this.winner = leader;

  this[leader].recordWin();
  this[loser].recordLoss();

};

Game.prototype.placement = function placement(p1, p2) {
  var place = ( p1 > p2 );
  return {
    leader: {
      player: place ? 'p1' : 'p2',
      score : place ? p1 : p2
    },
    loser: {
      player: place ? 'p2' : 'p1',
      score: place ? p2 : p1
    }
  };
};

module.exports = Game;
