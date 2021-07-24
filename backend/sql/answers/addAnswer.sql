INSERT INTO responses  ("question_id", "username", "answer") VALUES
(${question_id}, ${username}, ${answer})
RETURNING *
