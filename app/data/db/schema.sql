DROP DATABASE IF EXISTS celebrities_db;
CREATE database celebrities_db;

USE celebrities_db;

CREATE TABLE celebrities
(
	id INT NOT NULL,
    celebrity VARCHAR(100) NULL,
    score INT NULL,
	zodiac VARCHAR(100) NULL,
    compatible_sign VARCHAR(1000) NULL,
    compatible_score VARCHAR(1000) NULL,
	PRIMARY KEY (id)
);

SELECT * FROM celebrities;
