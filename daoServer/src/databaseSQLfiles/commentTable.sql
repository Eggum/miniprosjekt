CREATE table Comment(
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      text TEXT,
                      creation_date TIMESTAMP DEFAULT current_timestamp,
                      creator INT,
                      article INT,
                      CONSTRAINT foreign key (creator) REFERENCES User(id),
                      CONSTRAINT foreign key (article) REFERENCES Article(id)
);