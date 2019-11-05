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

insert into Category values ('Kultur');
insert into Category values ('Sport');
insert into Category values ('Kjendis');
insert into Category values ('Nyheter');
insert into Category values ('Utenriks');


insert into User (username, password) values ('Ola Nordman', 'passord123');
insert into User (username, password) values ('Kari Nordman', 'KariErKulest');
insert into User (username, password) values ('user123', '123');

insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Ny butikk i sentrum', 'fwfewfew', 'https://images.unsplash.com/photo-1562865657-162a8fabcf28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1054&q=80', 'alt teskt', 'Kultur', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Bankran på båten', 'raneren kom seg unna', 'https://images.unsplash.com/photo-1570942872213-1242607a35eb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1853&q=80', 'alt teskt', 'Nyheter', 0, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Ny blomsterbutikk åpnes', 'fewajiowa fjiowoøa jiewo jiawfo fjwieo fjiwoa jfiow fjiw jifwo ajfiowaej fiowj fiowe fjiowe fjiowajfiow jioweajifoawjioewø jfioawø jefioawøj feioawøj fiowjeo fjweøofjwioejfiowjfiowjfioe', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'alt teskt', 'Kultur', 1,  'bilde beskrivelse', 'user123');

insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Blabla', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1518057111178-44a106bad636?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Spennende artikkel', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('FE fiw fjfiooø', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1548032885-b5e38734688a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1814&q=80', 'alt teskt', 'Kultur', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('fewfefff', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1481437156560-3205f6a55735?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1071&q=80', 'alt teskt', 'Sport', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('lkjf fewop a', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Afew jov fewkl', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1536520872842-24a7ef829afc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'alt teskt', 'Utenriks', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nytt gulv', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1517586979036-b7d1e86b3345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'alt teskt', 'Kultur', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Tv blir lagt ned', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1484313544071-4d67c88b99be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80', 'alt teskt', 'Kultur', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('few kopf fkopf', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('pqopwq fofpw  dwffe', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1505276452202-6df1db49945a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80', 'alt teskt', 'Nyheter', 1, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('fwo jfoew j iø', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1486129273931-27820249c615?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Nyheter', 0, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 'alt teskt', 'Utenriks', 0, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1546552768-9e3a94b38a59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Nyheter', 0, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Nyheter', 0, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1531053326607-9d349096d887?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Utenriks', 0, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1485908953667-cf6d88997642?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1020&q=80', 'alt teskt', 'Sport', 0, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 'alt teskt', 'Utenriks', 0, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1541958409-7618fd1ad26e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80', 'alt teskt', 'Nyheter', 0, 'bilde beskrivelse', 'user123');
insert into Article (title, text, image, alt, category, importance, image_text, creator) VALUES ('Nå kommer kulda', 'det er meldt -10 grader', 'https://images.unsplash.com/photo-1551415923-a2297c7fda79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80', 'alt teskt', 'Sport', 0, 'bilde beskrivelse', 'user123');