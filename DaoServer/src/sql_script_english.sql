drop table if exists Comment;
DROP TABLE IF EXISTS Article;
DROP TABLE IF EXISTS Category;
Drop table if exists User;


CREATE table User(
  username varchar(30) primary key ,
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
                  last_edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                  image varchar(10000),
                  alt varchar(50),
                  category varchar(30),
                  importance boolean,
                  image_text varchar(50),
                  creator varchar(30),
                  CONSTRAINT foreign key (creator) REFERENCES User(username),
                  CONSTRAINT foreign key (category) REFERENCES Category(category)
);

CREATE table Comment(
                       id INT AUTO_INCREMENT PRIMARY KEY ,
                       text TEXT,
                       creation_date TIMESTAMP DEFAULT current_timestamp,
                     creator varchar(30),
                     article int,
                       CONSTRAINT foreign key (creator) REFERENCES User(username),
                       CONSTRAINT foreign key (article) REFERENCES Article(id)
);