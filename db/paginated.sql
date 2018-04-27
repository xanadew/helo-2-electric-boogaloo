SELECT * from users
WHERE id != $1
LIMIT 4 OFFSET $2