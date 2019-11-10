CREATE table User(
                   id INT AUTO_INCREMENT PRIMARY KEY,
                   username varchar(30) UNIQUE,
                   password varchar(300)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;