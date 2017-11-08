CREATE DATABASE `deaddrop` /*!40100 DEFAULT CHARACTER SET utf8 */;

use deaddrop;

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(300) NOT NULL,
  `timestamp` datetime NOT NULL,
  `latitude` decimal(13,10) NOT NULL,
  `longitude` decimal(13,10) NOT NULL,
  `creator_id` int(20),
  `creator_username` varchar(255),
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255),
  PRIMARY KEY (`id`),
  CONSTRAINT email_unique UNIQUE (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;