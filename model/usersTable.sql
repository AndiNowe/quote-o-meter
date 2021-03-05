DROP TABLE IF EXISTS users;

CREATE TABLE users ( 
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(300),
    email VARCHAR(20) NOT NULL,
    games_id INT NOT NULL,
    FOREIGN KEY(games_id) REFERENCES games(id) ON DELETE CASCADE
    ); 

INSERT INTO 'users' VALUES
    ('Akira', 'Mitoshi', 'kikiToro', '', 'ghibi@studio.com', 11)
    ('Sam', 'Eagle', 'muppetsTreasure', '', 'jim@henson.com', 8)
    ('Gwendolyn', 'Brienne', 'GOTBadass', '', 'got@hbo.com',10)