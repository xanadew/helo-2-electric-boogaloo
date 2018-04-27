SELECT * FROM users
-- WHERE id != $1 AND id NOT IN (
--     SELECT friend_id FROM friends
--     JOIN users on friends.friend_id = users.id
--     WHERE friend_id != $1 OR user.id != $1
-- )