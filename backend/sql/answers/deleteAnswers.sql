DELETE FROM answers
WHERE
    user_id = ${userId} AND
    question_id IN ( SELECT question_id 
                     FROM questions 
                     WHERE 
                         "GCSE_Paper_Name" = ${GCSE_Paper_Name} )