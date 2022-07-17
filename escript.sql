CREATE  DATABASE examen;
use examen;

DROP TABLE IF EXISTS `movimiento`;
DROP TABLE IF EXISTS `cuenta`;
DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `estado` bit(1),
  `password` varchar(255),
  `nombre` varchar(255),
  `genero` varchar(20),
  `edad` integer,
  `identificacion` varchar(11),
  `direccion` varchar(255),
  `telefono` varchar(10),
  PRIMARY KEY (`id`)
);
CREATE TABLE `cuenta` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `estado` bit(1),
  `numero_cuenta` bigint,
  `saldo_inicial` double,
  `tipo_cuenta` varchar(60),
  `cliente_id` varchar(36),
  PRIMARY KEY (`id`),
  KEY `fkclientID` (`cliente_id`),
  CONSTRAINT `fkclientID` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`)
);
CREATE TABLE `movimiento` (
  `id` varchar(36) NOT NULL DEFAULT (uuid()),
  `fecha` date,
  `valor` double,
  `saldo` double,
  `tipo_movimiento` varchar(60),
  `cuenta_id` varchar(36),
  PRIMARY KEY (`id`),
  KEY `FKcuentaID` (`cuenta_id`),
  CONSTRAINT `FKcuentaID` FOREIGN KEY (`cuenta_id`) REFERENCES `cuenta` (`id`)
);