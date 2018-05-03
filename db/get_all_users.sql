SELECT * from helo
WHERE id != $1
LIMIT $3 OFFSET $2