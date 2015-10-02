'use strict';

var db = require( 'knex' )({
  client: 'sqlite3',
  connection: {
    filename: './pongbot.db'
  }
});

module.exports = db;
