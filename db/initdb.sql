CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL UNIQUE,
	username varchar(50) UNIQUE,
	fullName varchar(255),
	password varchar(255) NOT NULL,
	email varchar(255) NOT NULL UNIQUE,
    roles varchar(255),
	createdOn timestamp NOT NULL,
    lastLogin timestamp,
	PRIMARY KEY (ID)
);