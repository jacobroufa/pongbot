'use strict';

var db = require( './db.js' );
var bookshelf = require( 'bookshelf' )( db );

var Player = bookshelf.Model.extend({

  defaults: {
    name: 'player',
    intro: '',
    picture: '',
    wins: 0,
    losses: 0
  },

  initialize: function() {
    return this.save();
  },

  tableName: 'players',

  setName: function( name ) {
    return this.save({name: name});
  },

  setIntro: function( intro ) {
    return this.save({intro: intro});
  },

  setPicture: function( picture ) {
    return this.save({picture: picture});
  },

  recordWin: function() {
    var newScore = this.get( 'wins' ) + 1;

    return this.save({wins: newScore});
  },

  recordLoss: function() {
    var newScore = this.get( 'losses' ) + 1;

    return this.save({losses: newScore});
  }

});

module.exports = Player;
