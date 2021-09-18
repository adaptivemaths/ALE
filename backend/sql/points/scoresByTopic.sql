SELECT 
    topic, 
    round(SUM(score) / COUNT(lo), 2) AS score

FROM (
    SELECT 
        lo, 
        ((correct + 1.0) / (total + 2.0)) AS score,
        topic

    FROM (

        SELECT DISTINCT lo,
            CASE WHEN correct IS NULL THEN 0 ELSE correct END AS correct,
            CASE WHEN total IS NULL THEN 0 ELSE total END AS total,
            topic
            
        FROM 
            ( 
                SELECT DISTINCT lo, topic 
                FROM learning_objectives
            ) AS los
            
            NATURAL LEFT JOIN points

    ) AS ranking

    ORDER BY
        score ASC

    ) AS groups

GROUP BY topic

ORDER BY    
    topic