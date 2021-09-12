DO $$
BEGIN
IF 
    ${lo} NOT IN (
        SELECT lo 
        FROM points 
        WHERE
            user_id = ${userId} 
    )
THEN
    INSERT INTO points(user_id, lo, correct, total)
    VALUES (${userId}, ${lo}, 0, 0);
END IF;

UPDATE points 
SET 
    total = total + 1   
WHERE
    user_id = ${userId} AND lo = ${lo};


IF 
    ${correct} = 'true'
THEN 
    UPDATE points 
    SET 
        correct = correct + 1
    WHERE
        user_id = ${userId} AND lo = ${lo};
END IF;
END
$$