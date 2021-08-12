SELECT *
FROM answers
NATURAL JOIN questions
WHERE 
    user_id = ${userId} AND "GCSE_Paper_Name" = ${GCSE_Paper_Name}
