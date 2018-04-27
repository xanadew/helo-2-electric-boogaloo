DELETE FROM friends
WHERE friend_id = $1 AND match_id = $2
RETURNING *;