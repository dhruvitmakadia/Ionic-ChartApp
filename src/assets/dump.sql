CREATE TABLE IF NOT EXISTS covid(id INTEGER PRIMARY KEY AUTOINCREMENT, lable TEXT, confirmed INTEGER, deceased INTEGER,recovered INTEGER);


INSERT or IGNORE INTO covid(id, lable, confirmed, deceased, recovered) VALUES (1, '1', 10, 5, 5);
INSERT or IGNORE INTO covid(id, lable, confirmed, deceased, recovered) VALUES (2, '2', 12, 6, 6);
INSERT or IGNORE INTO covid(id, lable, confirmed, deceased, recovered) VALUES (3, '3', 11, 4, 7);
INSERT or IGNORE INTO covid(id, lable, confirmed, deceased, recovered) VALUES (4, '4', 22, 10, 12);
INSERT or IGNORE INTO covid(id, lable, confirmed, deceased, recovered) VALUES (5, '5', 11, 3, 8);
