drop table if exists Comment;
DROP TABLE IF EXISTS Article;
DROP TABLE IF EXISTS Category;
Drop table if exists User;


CREATE table User(
                   id INT AUTO_INCREMENT PRIMARY KEY,
                   username varchar(30) UNIQUE,
                   password varchar(300)
);

CREATE table Category(
  category VARCHAR(30) PRIMARY KEY
);

CREATE table Article(
                      id INT AUTO_INCREMENT PRIMARY KEY ,
                      title VARCHAR(30) NOT NULL ,
                      text LONGTEXT NOT NULL,
                      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      last_edited integer,
                      image varchar(10000),
                      alt varchar(50),
                      category varchar(30),
                      importance boolean,
                      image_text varchar(50),
                      creator INT,
                      CONSTRAINT foreign key (creator) REFERENCES User(id),
                      CONSTRAINT foreign key (category) REFERENCES Category(category)
);

CREATE table Comment(
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      text TEXT,
                      creation_date TIMESTAMP DEFAULT current_timestamp,
                      creator INT,
                      article int,
                      CONSTRAINT foreign key (creator) REFERENCES User(id),
                      CONSTRAINT foreign key (article) REFERENCES Article(id)
);