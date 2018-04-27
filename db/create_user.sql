INSERT INTO users
(username, auth_id, firstName, lastName, picture)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;