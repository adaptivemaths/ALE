INSERT INTO answers  ("question_id", "username", "answer") VALUES
(${question_id}, ${username}, ${answer})
RETURNING *