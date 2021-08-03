DELETE FROM answers
WHERE
    username = ${username} AND
    question_id IN ( SELECT question_id 
                     FROM questions 
                     WHERE 
                         "GCSE_Paper_Name" = ${GCSE_Paper_Name} )