
/* COLlECTIONS 
 * 
 * Allows the user to agregate his/hers music library in collection
*/

CREATE TABLE tb_collection (
    id INTEGER PRIMARY KEY autoincrement,
    name TEXT not null UNIQUE,
    description TEXT
);

/* MUSIC STYLES */

CREATE TABLE tb_style (
    id INTEGER PRIMARY KEY autoincrement,
    name TEXT not null UNIQUE,
    info TEXT
);

/* ARTIST or BANDS*/

CREATE TABLE tb_artist_band (
    id INTEGER PRIMARY KEY autoincrement,
    name TEXT not null,
    birth_creation TEXT,
    death_dissolution TEXT,
    info TEXT
);

CREATE TABLE tb_artist_band_style (
    artist_band_fk INTEGER not null REFERENCES tb_artist_band(id),
    style_fk INTEGER not null REFERENCES tb_style(id),
    PRIMARY KEY (artist_band_fk, style_fk)
);

CREATE TABLE tb_artist_band_photo (
    id INTEGER PRIMARY KEY autoincrement,
    path TEXT not null UNIQUE,
    alt_text TEXT,
    artist_band_fk INTEGER not null REFERENCES tb_artist_band(id) ON DELETE CASCADE
);

/* MUSICS */