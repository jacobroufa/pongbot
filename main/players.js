'use strict';

var db = require( './db.js' );
var bookshelf = require( 'bookshelf' )( db );

var Player = require( './player.js' );

var Players = bookshelf.Collection.extend({

  model: Player

});

module.exports = Players;
