/**
 * Schema builder for the Pong Bot
 */

--
-- players
--
CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  intro TEXT DEFAULT NULL,
  picture TEXT DEFAULT NULL,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0
);

--
-- games
--
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY,
  p1 INTEGER NOT NULL,
  p2 INTEGER NOT NULL,
  p1_score INTEGER DEFAULT 0,
  p2_score INTEGER DEFAULT 0,
  winner TEXT DEFAULT NULL,
  game_time TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(p1) REFERENCES players(id),
  FOREIGN KEY(p2) REFERENCES players(id)
);
