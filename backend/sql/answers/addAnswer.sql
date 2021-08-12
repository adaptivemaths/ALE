INSERT INTO answers  ("question_id", "user_id", "answer") VALUES
(${question_id}, ${userId}, ${answer})
RETURNING *
