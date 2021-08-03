SELECT *
FROM answers
NATURAL JOIN questions
WHERE 
    username = ${username} AND "GCSE_Paper_Name" = ${GCSE_Paper_Name}
