INSERT INTO teachers (email, first_name, last_name, school) VALUES
(${email}, ${firstName}, ${lastName}, ${school})
RETURNING *