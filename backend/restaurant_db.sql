CREATE DATABASE  IF NOT EXISTS `restaurant_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `restaurant_db`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 34.68.249.113    Database: restaurant_db
-- ------------------------------------------------------
-- Server version	5.7.25-google-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `HOURS`
--

DROP TABLE IF EXISTS `HOURS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HOURS` (
  `RestaurantID` int(11) NOT NULL AUTO_INCREMENT,
  `DayOfWeek` enum('mon','tue','wed','thu','fri','sat','sun') NOT NULL,
  `OpenTime` time DEFAULT NULL,
  `CloseTime` time DEFAULT NULL,
  PRIMARY KEY (`RestaurantID`,`DayOfWeek`),
  CONSTRAINT `Hours_RestaurantID` FOREIGN KEY (`RestaurantID`) REFERENCES `RESTAURANT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HOURS`
--

LOCK TABLES `HOURS` WRITE;
/*!40000 ALTER TABLE `HOURS` DISABLE KEYS */;
INSERT INTO `HOURS` VALUES (1,'mon','12:00:00','20:00:00'),(1,'tue','12:00:00','20:00:00'),(1,'wed','12:00:00','20:00:00'),(1,'thu','12:00:00','22:00:00'),(1,'fri','11:00:00','22:00:00'),(1,'sat','17:00:00','20:00:00'),(1,'sun','17:00:00','20:00:00'),(2,'mon','11:00:00','20:00:00'),(2,'tue','11:00:00','20:00:00'),(2,'wed','11:00:00','20:00:00'),(2,'thu','11:00:00','22:00:00'),(2,'fri','11:00:00','22:00:00'),(2,'sat','17:00:00','20:00:00'),(2,'sun','17:00:00','20:00:00'),(3,'mon','12:00:00','20:00:00'),(3,'tue','12:00:00','20:00:00'),(3,'wed','12:00:00','20:00:00'),(3,'thu','12:00:00','22:00:00'),(3,'fri','11:00:00','22:00:00'),(3,'sat','17:00:00','20:00:00'),(3,'sun','17:00:00','20:00:00'),(4,'mon','11:00:00','20:00:00'),(4,'tue','11:00:00','20:00:00'),(4,'wed','11:00:00','20:00:00'),(4,'thu','11:00:00','22:00:00'),(4,'fri','11:00:00','22:00:00'),(4,'sat','12:00:00','21:00:00'),(4,'sun','12:00:00','21:00:00');
/*!40000 ALTER TABLE `HOURS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MENU`
--

DROP TABLE IF EXISTS `MENU`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MENU` (
  `Id` int(32) NOT NULL AUTO_INCREMENT,
  `RestaurantId` int(11) NOT NULL,
  `Link` varchar(200) NOT NULL,
  `Height` int(11) NOT NULL,
  `Width` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Menu_Restaurant` (`RestaurantId`),
  CONSTRAINT `Menu_Restaurant` FOREIGN KEY (`RestaurantId`) REFERENCES `RESTAURANT` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MENU`
--

LOCK TABLES `MENU` WRITE;
/*!40000 ALTER TABLE `MENU` DISABLE KEYS */;
INSERT INTO `MENU` VALUES (1,1,'https://user-images.githubusercontent.com/27871855/79630073-91dbaf00-81a2-11ea-89eb-ce3c6015a26e.jpg',650,633),(2,1,'https://user-images.githubusercontent.com/27871855/79630073-91dbaf00-81a2-11ea-89eb-ce3c6015a26e.jpg',650,633),(3,1,'https://user-images.githubusercontent.com/27871855/79630073-91dbaf00-81a2-11ea-89eb-ce3c6015a26e.jpg',650,633),(4,2,'https://user-images.githubusercontent.com/27871855/79630073-91dbaf00-81a2-11ea-89eb-ce3c6015a26e.jpg',650,633),(5,3,'https://user-images.githubusercontent.com/27871855/79630073-91dbaf00-81a2-11ea-89eb-ce3c6015a26e.jpg',650,633);
/*!40000 ALTER TABLE `MENU` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESERVATION`
--

DROP TABLE IF EXISTS `RESERVATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESERVATION` (
  `ID` varchar(45) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `Notes` varchar(100) DEFAULT NULL,
  `NumberOfGuests` int(11) NOT NULL,
  `TableID` int(11) NOT NULL,
  `RestaurantID` int(11) DEFAULT NULL,
  `Name` varchar(45) NOT NULL,
  `Phone` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `RestaurantID_idx` (`TableID`),
  KEY `Reservation_Restaurant_idx` (`RestaurantID`),
  CONSTRAINT `Reservation_Restaurant` FOREIGN KEY (`RestaurantID`) REFERENCES `RESTAURANT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reservation_Table` FOREIGN KEY (`TableID`) REFERENCES `TABLE` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESERVATION`
--

LOCK TABLES `RESERVATION` WRITE;
/*!40000 ALTER TABLE `RESERVATION` DISABLE KEYS */;
INSERT INTO `RESERVATION` VALUES ('1','2021-01-01','12:00:00','Vegan',2,1,1,'Emma','021889900','emma@gmail.com'),('80gyicblgk954awny','2020-04-19','18:00:00','shrimp allergy',3,1,1,'John','027123987','john@gmail.com');
/*!40000 ALTER TABLE `RESERVATION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RESTAURANT`
--

DROP TABLE IF EXISTS `RESTAURANT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RESTAURANT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `OwnerId` int(11) NOT NULL,
  `Image` varchar(200) DEFAULT NULL,
  `DateAdded` date NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Name_UNIQUE` (`Name`),
  KEY `Restaurant_User` (`OwnerId`),
  CONSTRAINT `Restaurant_User` FOREIGN KEY (`OwnerId`) REFERENCES `USER` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=328 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RESTAURANT`
--

LOCK TABLES `RESTAURANT` WRITE;
/*!40000 ALTER TABLE `RESTAURANT` DISABLE KEYS */;
INSERT INTO `RESTAURANT` (ID, Name, OwnerId, DateAdded) VALUES (1,'KCF',1,CURDATE()),(2,'Mendat Ramen',1,CURDATE()),(3,'Nantoz',1,DATE_ADD(CURDATE(), INTERVAL -2 MONTH)),(4,'Uni Zushi',1, DATE_ADD(CURDATE(), INTERVAL -3 MONTH));
/*!40000 ALTER TABLE `RESTAURANT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REVIEW`
--

DROP TABLE IF EXISTS `REVIEW`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REVIEW` (
  `Id` int(32) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `RestaurantId` int(11) NOT NULL,
  `Review` text NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Review_Restaurant` (`RestaurantId`),
  CONSTRAINT `Review_Restaurant` FOREIGN KEY (`RestaurantId`) REFERENCES `RESTAURANT` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REVIEW`
--

LOCK TABLES `REVIEW` WRITE;
/*!40000 ALTER TABLE `REVIEW` DISABLE KEYS */;
INSERT INTO `REVIEW` VALUES (1,'Anon',1,'Best fried chicken');
/*!40000 ALTER TABLE `REVIEW` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TABLE`
--

DROP TABLE IF EXISTS `TABLE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TABLE` (
  `ID` int(11) NOT NULL,
  `RestaurantID` int(11) NOT NULL,
  `MinGuests` int(11) NOT NULL,
  `MaxGuests` int(11) NOT NULL,
  PRIMARY KEY (`ID`,`RestaurantID`),
  KEY `Table_Restaurant_idx` (`RestaurantID`),
  CONSTRAINT `Table_Restaurant` FOREIGN KEY (`RestaurantID`) REFERENCES `RESTAURANT` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TABLE`
--

LOCK TABLES `TABLE` WRITE;
/*!40000 ALTER TABLE `TABLE` DISABLE KEYS */;
INSERT INTO `TABLE` VALUES (1,1,1,4),(1,2,1,3),(1,3,1,4),(1,4,1,3),(2,1,3,8),(2,2,1,3),(2,3,4,10),(2,4,1,3),(3,1,2,6),(3,4,4,10),(4,1,1,4);
/*!40000 ALTER TABLE `TABLE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Phone` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=384 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,'Bob','Builder','0800838383','bob@burgers.com');
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-19 21:21:31
