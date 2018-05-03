-- UPDATE users
-- SET firstName = $2, 
--     lastName = $3,
--     hairColor = $4,
--     eyeColor = $5, 
--     gender = $6, 
--     hobby = $7, 
--     birthDay = $8, 
--     birthMonth = $9, 
--     birthYear = $10
-- WHERE id = $1;

UPDATE helo
SET first_name = $2,
    last_name = $3,
    gender = $4,
    hair_color = $5,
    eye_color = $6,
    hobby = $7,
    bday = $8,
    bmonth = $9,
    byear = $10
WHERE id = $1;
SELECT * FROM helo WHERE id = $1;