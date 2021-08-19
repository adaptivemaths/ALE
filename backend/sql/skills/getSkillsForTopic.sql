SELECT *
FROM skills
NATURAL JOIN learning_objectives
WHERE
    topic = ${topic}