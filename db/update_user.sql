UPDATE users
SET firstName = $2, 
    lastName = $3,
    hairColor = $4,
    eyeColor = $5, 
    gender = $6, 
    hobby = $7, 
    birthDay = $8, 
    birthMonth = $9, 
    birthYear = $10
WHERE id = $1;
