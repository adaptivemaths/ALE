SELECT * 
FROM questions
WHERE
    "GCSE_Paper_Name"=${GCSE_Paper_Name}
ORDER BY
    "QUESTION_NUMBER" ASC