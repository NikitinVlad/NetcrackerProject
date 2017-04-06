-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shop
-- ------------------------------------------------------
-- Server version	5.7.17-log

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
-- Table structure for table `basket`
--

DROP TABLE IF EXISTS `basket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basket` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basket`
--

LOCK TABLES `basket` WRITE;
/*!40000 ALTER TABLE `basket` DISABLE KEYS */;
INSERT INTO `basket` VALUES (9),(10),(11),(12),(13),(15),(16),(18),(28),(29),(30),(31),(33);
/*!40000 ALTER TABLE `basket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_b6tpfd3sd1ch530wfapd41nyq` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=394 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (305,'Барановичи'),(307,'Барань'),(308,'Белоозерск'),(309,'Береза'),(310,'Березино'),(311,'Березовка'),(304,'Бобруйск'),(306,'Борисов'),(312,'Браслав'),(313,'Брест'),(314,'Буда-Кошелево'),(315,'Быхов'),(316,'Василевичи'),(317,'Верхнедвинск'),(318,'Ветка'),(319,'Вилейка'),(320,'Витебск'),(321,'Волковыск'),(322,'Воложин'),(323,'Высокое'),(324,'Ганцевичи'),(325,'Глубокое'),(326,'Гомель'),(327,'Горки'),(328,'Городок'),(329,'Гродно'),(330,'Давид-Городок'),(331,'Дзержинск'),(332,'Дисна'),(333,'Добруш'),(334,'Докшицы'),(335,'Дрогичин'),(336,'Дубровно'),(337,'Дятлово'),(339,'Жабинка'),(340,'Житковичи'),(341,'Жлобин'),(338,'Жодино'),(342,'Заславль'),(343,'Иваново'),(344,'Ивацевичи'),(345,'Ивье'),(346,'Калинковичи'),(347,'Каменец'),(348,'Кировск'),(349,'Клецк'),(350,'Климовичи'),(351,'Кличев'),(352,'Кобрин'),(353,'Копыль'),(354,'Коссово'),(355,'Костюковичи'),(356,'Кричев'),(357,'Крупки'),(358,'Лепель'),(359,'Лида'),(360,'Логойск'),(361,'Лунинец'),(362,'Любань'),(363,'Ляховичи'),(365,'Малорита'),(366,'Марьина Горка'),(367,'Микашевичи'),(368,'Минск'),(369,'Миоры'),(370,'Могилев'),(364,'Мозырь'),(371,'Молодечно'),(372,'Мосты'),(373,'Мстиславль'),(374,'Мядель'),(376,'Наровля'),(377,'Несвиж'),(378,'Новогрудок'),(379,'Новолукомль'),(375,'Новополоцк'),(380,'Светлогорск'),(381,'Свислочь'),(382,'Сенно'),(383,'Скидель'),(384,'Славгород'),(385,'Слоним'),(386,'Слуцк'),(387,'Смолевичи'),(388,'Сморгонь'),(389,'Солигорск'),(390,'Старые Дороги'),(391,'Столбцы'),(392,'Столин'),(393,'Фаниполь');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mark`
--

DROP TABLE IF EXISTS `mark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mark` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_dojfjkmtg9d904dedrpj70cpy` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mark`
--

LOCK TABLES `mark` WRITE;
/*!40000 ALTER TABLE `mark` DISABLE KEYS */;
INSERT INTO `mark` VALUES (29,'AUDI'),(28,'BMW'),(31,'CITROEN'),(30,'FORD');
/*!40000 ALTER TABLE `mark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `id_mark` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_t7scy0aywovxuh4ricpub7sep` (`id_mark`),
  CONSTRAINT `FK_t7scy0aywovxuh4ricpub7sep` FOREIGN KEY (`id_mark`) REFERENCES `mark` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES (50,'X6',28),(51,'X7',28),(52,'A1',29),(53,'A2',29),(54,'A3',29),(55,'FIESTA',30),(56,'FOCUS',30),(57,'C4',31),(58,'JUMPER',31);
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poster`
--

DROP TABLE IF EXISTS `poster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `poster` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dimension` varchar(255) DEFAULT NULL,
  `fuel` varchar(255) DEFAULT NULL,
  `transmision` varchar(255) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `id_poster` bigint(20) DEFAULT NULL,
  `id_city` bigint(20) DEFAULT NULL,
  `id_file` bigint(20) DEFAULT NULL,
  `id_model` bigint(20) DEFAULT NULL,
  `id_user` bigint(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_efndvp3fr9dutacjbr5swerbx` (`id_poster`),
  KEY `FK_5147bosx6jvfp5o1x8e6ugy2k` (`id_city`),
  KEY `FK_2e2gyvf7buudujmc3n2ppu5o0` (`id_file`),
  KEY `FK_be7sesgb83qfmosici6itdelc` (`id_model`),
  KEY `FK_78i59r1awkaden835nugoe218` (`id_user`),
  CONSTRAINT `FK_2e2gyvf7buudujmc3n2ppu5o0` FOREIGN KEY (`id_file`) REFERENCES `file` (`id`),
  CONSTRAINT `FK_5147bosx6jvfp5o1x8e6ugy2k` FOREIGN KEY (`id_city`) REFERENCES `city` (`id`),
  CONSTRAINT `FK_78i59r1awkaden835nugoe218` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_be7sesgb83qfmosici6itdelc` FOREIGN KEY (`id_model`) REFERENCES `model` (`id`),
  CONSTRAINT `FK_efndvp3fr9dutacjbr5swerbx` FOREIGN KEY (`id_poster`) REFERENCES `basket` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poster`
--

LOCK TABLES `poster` WRITE;
/*!40000 ALTER TABLE `poster` DISABLE KEYS */;
/*!40000 ALTER TABLE `poster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `basket_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_587tdsv8u5cvheyo9i261xhry` (`login`),
  KEY `FK_lmpaem66nk2pcb0wvnud67xha` (`basket_id`),
  CONSTRAINT `FK_lmpaem66nk2pcb0wvnud67xha` FOREIGN KEY (`basket_id`) REFERENCES `basket` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (13,'n45@mail.ru','vl','3456','ROLE_USER',15,NULL),(20,'nikitin_vladislav1996@mail.ru','vlad','1111','ROLE_USER',18,'Влад'),(35,'dmi80@mail.ru','dmitri','1111111111','ROLE_USER',33,'Дмитрий');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-04 19:12:19
