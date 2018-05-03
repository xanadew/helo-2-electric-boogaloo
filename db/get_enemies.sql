SELECT * FROM helo
WHERE id != ($1) AND id NOT IN (
    SELECT friend_id FROM helo_friends
    RIGHT JOIN helo on helo_friends.friend_id = helo.id
    WHERE friend_id != ($1) OR user_id != ($1)
)