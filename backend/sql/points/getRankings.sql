SELECT 
    lo, 
    ((correct + 1.0) / (total + 2.0)) AS score

FROM (

	SELECT DISTINCT lo,
		CASE WHEN correct IS NULL THEN 0 ELSE correct END AS correct,
		CASE WHEN total IS NULL THEN 0 ELSE total END AS total

	FROM 
        ( SELECT DISTINCT lo FROM learning_objectives ) AS los
        NATURAL LEFT JOIN points

) AS ranking

ORDER BY 
    ((correct + 1.0) / (total + 2.0)) ASC