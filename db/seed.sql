CREATE TABLE IF NOT EXISTS friends
(match_id INTEGER, friend_id INTEGER);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    auth_id TEXT,
    firstName VARCHAR(40),
    lastName VARCHAR(40),
    hairColor VARCHAR(20),
    eyeColor VARCHAR(20),
    gender VARCHAR(10),
    hobby VARCHAR(50),
    birthDay INTEGER,
    birthMonth VARCHAR(20),
    birthYear INTEGER,
    picture TEXT
);