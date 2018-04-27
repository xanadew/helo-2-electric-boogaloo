INSERT INTO friends
(match_id, friend_id)
VALUES
($1, $2)
RETURNING *;