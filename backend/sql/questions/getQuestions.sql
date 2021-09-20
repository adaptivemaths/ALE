SELECT * 
FROM questions
WHERE
    "GCSE_Paper_Name"=${testId}
ORDER BY
    "QUESTION_NUMBER" ASC,
    "SUB_QUESTION_NO" ASC