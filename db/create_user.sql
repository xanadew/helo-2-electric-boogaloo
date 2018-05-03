INSERT INTO helo
(auth_id, img)
VALUES
($1, 'https://robohash.org/me');
SELECT *  FROM helo WHERE auth_id = $1;