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
) ENGINE=InnoDB AUTO_INCREMENT=13650017 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (13650001,'Ali','Pati','13650001@uin-suka.ac.id','M','1998-03-02','2018-02-01 00:00:00'),(13650002,'Sugeng','Kalimantan','13650002@uin-suka.ac.id','M','1998-04-02','2018-02-01 00:00:00'),(13650003,'Marni','Yogyakarta','13650003@uin-suka.ac.id','F','1998-05-02','2018-02-01 00:00:00'),(13650004,'Budi Sunarto','Banjar','13650004@uin-suka.ac.id','M','1998-05-02','2018-03-01 00:00:00'),(13650005,'Sila sila','Wonogiri','13650005@uin-suka.ac.id','F','1998-05-26','2018-03-01 00:00:00'),(13650006,'Painem','Wonogiri','13650006@uin-suka.ac.id','M','1998-05-22','2018-03-01 00:00:00'),(13650007,'putri','bangka','13650007@uin-suka.ac.id','F','1998-07-02','2018-02-01 00:00:00'),(13650008,'MARNI',' PALAGAN','MARNI@UIN-SUKA.AC.ID','F','1997-06-04','2018-03-13 11:39:48'),(13650009,'SUSILO',' JHSAHKSA','SUSILO@JHDKAH.AH.DKSAJ','M','1994-06-15','2018-03-13 11:40:59'),(13650010,'hdadj',' fdskndfks','dadak@sdka.hew','F','2018-03-31','2018-03-13 12:02:14'),(13650011,'bsjbak',' sdakha','shada@dhuk.co.id','M','2018-03-30','2018-03-13 12:03:16'),(13650012,'hdkahsda',' sakdhalasd','ahakhdaksd@jbkas.idoa','F','2018-03-29','2018-03-13 12:04:21'),(13650013,'fjgjjj',' jjgkk','dhfh@kgk.fh','F','2018-03-29','2018-03-13 12:06:34'),(13650014,'hkh',' bkkasd','shdkahd@fsdla.ciehw','F','2018-03-28','2018-03-13 12:08:36'),(13650015,'bdkakdsd','hdsksa ','sak@sadka.nskhdsa','F','2018-03-29','2018-03-13 12:09:13'),(13650016,'jsaa',' mhsdakdka','hdskahska@hlsjl.jhdska','F','2018-03-04','2018-03-13 12:11:14');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
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

-- Dump completed on 2018-03-13 12:45:05
