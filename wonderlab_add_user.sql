-- MySQL dump 10.13  Distrib 5.7.21, for osx10.13 (x86_64)
--
-- Host: localhost    Database: wonderlabs
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary table structure for view `count_gender`
--

DROP TABLE IF EXISTS `count_gender`;
/*!50001 DROP VIEW IF EXISTS `count_gender`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `count_gender` AS SELECT 
 1 AS `gender`,
 1 AS `frek_gen`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `frek_month`
--

DROP TABLE IF EXISTS `frek_month`;
/*!50001 DROP VIEW IF EXISTS `frek_month`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `frek_month` AS SELECT 
 1 AS `month`,
 1 AS `Frek`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `months`
--

DROP TABLE IF EXISTS `months`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `months` (
  `id` int(11) DEFAULT NULL,
  `month` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `months`
--

LOCK TABLES `months` WRITE;
/*!40000 ALTER TABLE `months` DISABLE KEYS */;
INSERT INTO `months` VALUES (1,'JANUARY'),(2,'FEBRUARY'),(3,'MARCH'),(4,'APRIL'),(5,'MAY'),(6,'JUNE'),(7,'JULY'),(8,'AUGUST'),(9,'SEPTEMBER'),(10,'OCTOBER'),(11,'NOVEMBER'),(12,'DESEMBER');
/*!40000 ALTER TABLE `months` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `id_student` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  `email_student` varchar(25) DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_student`),
  UNIQUE KEY `email_student` (`email_student`)
) ENGINE=InnoDB AUTO_INCREMENT=13650034 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (13650001,'Ali','Pati','13650001@uin-suka.ac.id','F','1998-03-02','2018-02-01 00:00:00'),(13650002,'sugeng','Kalimantan','13650002@gmail.com','M','1998-04-02','2018-02-01 00:00:00'),(13650003,'Marni','Yogyakarta','13650003@uin-suka.ac.id','F','1998-05-02','2018-02-01 00:00:00'),(13650004,'Budi Sunarto','Banjar','13650004@uin-suka.ac.id','M','1998-05-02','2018-03-01 00:00:00'),(13650005,'Sila sila','Wonogiri','13650005@uin-suka.ac.id','F','1998-05-26','2018-03-01 00:00:00'),(13650006,'Painem','Wonogiri','13650006@uin-suka.ac.id','M','1998-05-22','2018-03-01 00:00:00'),(13650007,'putri','bangka','13650007@uin-suka.ac.id','F','1998-07-02','2018-02-01 00:00:00'),(13650008,'MARNI',' PALAGAN','MARNI@UIN-SUKA.AC.ID','F','1997-06-04','2018-03-13 11:39:48'),(13650009,'SUSILO',' JHSAHKSA','SUSILO@JHDKAH.AH.DKSAJ','M','1994-06-15','2018-03-13 11:40:59'),(13650014,'Muhammad ',' bkkasd','zuhdy@gmail.com','M','1995-06-12','2018-03-13 12:08:36'),(13650015,'Budi Doremi','Pangkal ','13650015@uin-suka.ac.id','M','2010-01-11','2018-03-13 12:09:13'),(13650016,'jsaa','bandung','hdskahska@hlsjl.jhdska','F','2004-02-28','2018-03-13 12:11:14'),(13650017,'namira',' bojong','namira@un-suka.ac.id','F','1994-06-07','2018-03-15 15:19:44'),(13650018,'budi','ciawi','budi@gin.com','M','2018-03-14','2018-03-15 15:20:44'),(13650019,'bambang','jawa tengah ','bambang@hd.co','M','2018-03-06','2018-03-15 16:58:48'),(13650020,'nada','semarang','nada@gmail.com','F','2015-03-12','2018-03-16 10:59:08'),(13650021,'amah','semrang ','amag@gmail.com','F','2011-03-10','2018-03-16 11:00:16'),(13650022,'nimas','solo ','niams@gmail.com','F','2014-06-18','2018-03-16 11:01:37'),(13650023,'bila','bogorr ','bila@gmail.com','F','2011-02-01','2018-03-16 11:03:43'),(13650024,'zaki','bogor','zaki@gmail.com','M','2009-03-04','2018-03-16 11:07:38'),(13650025,'fatih','bogor ','fatih@gmail.com','M','2011-02-03','2018-03-16 11:36:48'),(13650026,'ajhy','bogor ','ajhy@gamil.com','M','2013-02-07','2018-03-16 11:39:16'),(13650027,'faiz','klaten ','faiz@gmail.com','M','1995-02-07','2018-03-16 11:43:10'),(13650028,'reyhan','klaten ','reyhan@gmail.com','M','2014-02-04','2018-03-16 11:43:44'),(13650029,'kang adi','bandung ','adi@gmail.com','M','2015-02-10','2018-03-16 11:48:47'),(13650030,'milea',' jalan buah batu','milea@gmail.com','F','1998-06-09','2018-03-16 11:51:31'),(13650032,'nisa',' banjar','nisa@gmail.com','F','1995-01-31','2018-01-16 00:00:00'),(13650033,'sinta',' jombang','sinta@gmail.com','F','1993-03-10','2018-03-18 14:02:59');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(60) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `resetPasswordToken` varchar(50) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'ayya','3ba14f266f6ae02ddd538931d0a3bbd6a64ed7f1','ayyaa.ats12@gmail.com','dab9660544247093cd197722624f00f1467aa863','2018-03-20 10:17:45'),(5,'admin','7332a33342b1f8a8ff76dd0cba71536a86c4c4a4','tsura.san12@gmail.com',NULL,NULL),(8,'fatih','11b6f6ca61336a155d84ec1c6bd14a6ec9e581cc','fatih@gmail.com',NULL,NULL),(10,'nilam','a901a47acafabfdcf5a44970eba5ee98408504fb','nilam@gmail.com',NULL,NULL),(11,'bagus','aeeebfddfce2ba311c4a1749094535b81afeaf2e','bagus@gmail.com',NULL,NULL),(12,'mama','0a831e2cc9329c71797e1580530a2d38da3dd6f3','mama@gmail.com',NULL,NULL),(13,'evania','1f76e2bc29fc19bd920e047ba156a02e4129e631','evan.nhea@gmail.com',NULL,NULL),(14,'Qisti','684e902d59d37148c1aef0976617bcbdf92b1e16','qisti.rahmah@gmail.com','7c22661a341586a3decc80641b6cd1d07c7ab56e','2018-03-20 10:24:49'),(15,'Azma','f79ae7a14e2359edeefaa59c8572b9c55fc74377','vy.phera@gmail.com','1984495526f7afa57589bdd2ecef3b060c6d08bb','2018-03-20 10:18:28'),(16,'budi','5dcc1be3ab66c5a5010e692c146b33fa11a41e2d','budha@ksdhla.com',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `age` int(3) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `count_gender`
--

/*!50001 DROP VIEW IF EXISTS `count_gender`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `count_gender` AS select `student`.`gender` AS `gender`,count(0) AS `frek_gen` from `student` group by `student`.`gender` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `frek_month`
--

/*!50001 DROP VIEW IF EXISTS `frek_month`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `frek_month` AS select month(`student`.`date_time`) AS `month`,count(0) AS `Frek` from `student` group by month(`student`.`date_time`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-20 14:31:18
