INSERT INTO "users" ("username", "first_name", "last_name", "password") VALUES
(${email}, ${firstName}, ${lastName}, ${password})
RETURNING *