
/* COLlECTIONS 
 * 
 * Allows the user to agregate his/hers music library in collection
 */

CREATE TABLE tb_collection (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null UNIQUE,
  description TEXT,
  creationDate TEXT not null DEFAULT date('now'),
  lastAlterationDate TEXT DEFAULT date('now')
);

/* MUSIC or ALBUNS STYLES */

CREATE TABLE tb_style (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null UNIQUE,
  info TEXT,
  creationDate TEXT not null DEFAULT date('now'),
  lastAlterationDate TEXT DEFAULT date('now')
);

/* ARTISTS or BANDS*/

CREATE TABLE tb_artist_band (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null,
  birth_creation TEXT,
  death_dissolution TEXT,
  info TEXT,
  creationDate TEXT not null DEFAULT date('now'),
  lastAlterationDate TEXT DEFAULT date('now')
);

CREATE TABLE tb_artist_band_style (
  artist_band_fk INTEGER not null REFERENCES tb_artist_band(id) ON DELETE cascade,
  style_fk INTEGER not null REFERENCES tb_style(id) ON DELETE cascade,
  PRIMARY KEY (artist_band_fk, style_fk)
);

CREATE TABLE tb_artist_band_photo (
  id INTEGER PRIMARY KEY autoincrement,
  path TEXT not null UNIQUE,
  alt_text TEXT,
  artist_band_fk INTEGER not null REFERENCES tb_artist_band(id) ON DELETE cascade,
  creationDate TEXT not null DEFAULT date('now'),
  lastAlterationDate TEXT DEFAULT date('now')
);

/* ALBUNS */

CREATE TABLE tb_album (
  id INTEGER PRIMARY KEY autoincrement,
  name TEXT not null,
  year INTEGER,
  info TEXT,
  artist_band_fk INTEGER REFERENCES tb_artist_band(id),
  various_artists_bands INTEGER not null DEFAULT 0, -- Boolean
  CONSTRAINT various_artists_bands_ck CHECK ((various_artists_bands = 1) AND (artist_band_fk ISNULL)),
  creationDate TEXT not null DEFAULT date('now'),
  lastAlterationDate TEXT DEFAULT date('now')
);

CREATE TABLE tb_album_collection (
  album_fk INTEGER not null REFERENCES tb_album(id) ON DELETE cascade,
  collection_fk INTEGER not null REFERENCES tb_collection(id) ON DELETE cascade,
  PRIMARY KEY (album_fk, collection_fk)
);

CREATE TABLE tb_album_style (
  album_fk INTEGER not null REFERENCES tb_album(id) ON DELETE cascade,
  style_fk INTEGER not null REFERENCES tb_style(id) ON DELETE cascade,
  PRIMARY KEY (album_fk, style_fk) 
);

CREATE TABLE tb_album_photo (
  id INTEGER PRIMARY KEY autoincrement,
  path TEXT not null UNIQUE,
  alt_text TEXT,
  cover Integer not null DEFAULT 0,
  album_fk INTEGER not null REFERENCES tb_album(id) ON DELETE cascade,
  creationDate TEXT not null DEFAULT date('now'),
  lastAlterationDate TEXT DEFAULT date('now')
);

/* MUSICS */

CREATE TABLE tb_music (
  id INTEGER PRIMARY KEY autoincrement,
  title TEXT not null,
  path TEXT not null UNIQUE,
  album_fk INTEGER not null REFERENCES tb_album(id) ON DELETE cascade,
  artist_band_fk INTEGER REFERENCES tb_artist_band(id) ON DELETE cascade,
  track_number INTEGER,
  disc_number INTEGER,
  info TEXT,
  duration REAL not null,
  times_played INTEGER not null DEFAULT 0,
  evaluation INTEGER not null DEFAULT 0 CHECK (evaluation BETWEEN 0 and 5),
  creationDate TEXT not null DEFAULT date('now'),
  lastAlterationDate TEXT DEFAULT date('now')
);

CREATE TABLE tb_music_style (
  music_fk INTEGER not null REFERENCES tb_music(id) ON DELETE cascade,
  style_fk INTEGER not null REFERENCES tb_style(id) ON DELETE cascade,
  PRIMARY KEY (music_fk, style_fk) 
);

