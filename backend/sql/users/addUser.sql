INSERT INTO "users" ("username", "first_name", "last_name") VALUES
(${email}, ${firstName}, ${lastName})
RETURNING *