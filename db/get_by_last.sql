SELECT * FROM users
WHERE lastName = $2
AND id != $1
LIMIT 4 OFFSET $3;