INSERT INTO "users" ("username", "first_name", "last_name", "password") VALUES
(${username}, ${firstName}, ${lastName}, ${password})
RETURNING *