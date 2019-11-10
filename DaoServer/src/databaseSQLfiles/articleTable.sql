CREATE table Article(
                      id INT AUTO_INCREMENT PRIMARY KEY ,
                      title varchar(30) NOT NULL ,
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
)ENGINE=InnoDB DEFAULT CHARSET=latin1;