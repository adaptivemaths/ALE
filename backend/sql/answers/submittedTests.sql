SELECT DISTINCT "GCSE_Paper_Name" 
FROM answers
NATURAL JOIN questions
WHERE 
    username = ${username}
