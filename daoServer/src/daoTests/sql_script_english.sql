drop table if exists Comment;
DROP TABLE IF EXISTS Article;
DROP TABLE IF EXISTS Category;
Drop table if exists User;
Drop procedure if exists delete_article;
DROP procedure if exists user_create_user;
DROP procedure if exists validate_user;

CREATE table User(
                   id INT AUTO_INCREMENT PRIMARY KEY,
                   username varchar(30) UNIQUE,
                   password varchar(256),
                   salt BINARY(32)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
CREATE table Category(
  category VARCHAR(30) PRIMARY KEY
)ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
CREATE table Comment(
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      text TEXT,
                      creation_date TIMESTAMP DEFAULT current_timestamp,
                      creator INT,
                      article INT,
                      CONSTRAINT foreign key (creator) REFERENCES User(id),
                      CONSTRAINT foreign key (article) REFERENCES Article(id)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE procedure delete_article(IN artID int)
BEGIN
  delete from Comment where article = artID;

  delete from Article where id = artID;
END;

CREATE PROCEDURE user_create_user(
  IN name VARCHAR(30),
  IN password VARCHAR(30)
)
BEGIN
  DECLARE salt_pw BINARY(32);
  DECLARE hashed_pwd VARCHAR(256);

  SET salt_pw = RAND();
  SET hashed_pwd = password(CONCAT(password, salt_pw));

  INSERT INTO User VALUES(DEFAULT, name, hashed_pwd, salt_pw);
END;



CREATE PROCEDURE validate_user(IN uname VARCHAR(30), IN passwordIn VARCHAR(30))
BEGIN

  DECLARE salt_pw BINARY(32);
  DECLARE hashed_pwd VARCHAR(256);
  DECLARE stored_pwd VARCHAR(256);

  SELECT salt FROM User WHERE uname = User.username INTO salt_pw;
  SELECT password(CONCAT(passwordIn, salt_pw)) INTO hashed_pwd;
  SELECT password FROM User WHERE uname = username INTO stored_pwd;

  SELECT case when hashed_pwd = stored_pwd THEN 1 ELSE 0 END AS validationResult;

END;