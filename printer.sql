-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-08-2023 a las 14:28:02
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `signup`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `printer`
--

CREATE TABLE `printer` (
  `idprinter` int(11) NOT NULL,
  `piso` varchar(30) DEFAULT NULL,
  `oficina` varchar(50) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `numeroserie` varchar(30) DEFAULT NULL,
  `direccionip` varchar(30) DEFAULT NULL,
  `empresa` varchar(50) DEFAULT NULL,
  `fecha` varchar(9) DEFAULT NULL,
  `obs` varchar(100) DEFAULT NULL,
  `fechabaja` varchar(10) DEFAULT NULL,
  `toner` varchar(50) DEFAULT NULL,
  `utilidad` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `printer`
--

INSERT INTO `printer` (`idprinter`, `piso`, `oficina`, `marca`, `modelo`, `numeroserie`, `direccionip`, `empresa`, `fecha`, `obs`, `fechabaja`, `toner`, `utilidad`) VALUES
(2, 'P.B.', 'DPTO SALUD OCUPACIONAL', 'BROTHER', '8155', 'J5N270360', '172.16.73.168', 'CG', '8/8/2022', '', '', 'RD720-TN750', 'ALTO'),
(3, 'P.B.', 'DPTO SALUD OCUPACIONAL', 'BROTHER', '8150DN', 'F3N461125', '172.16.73.99', 'CG', '8/8/2022', '', '', 'RD720-TN750', 'ALTO'),
(4, 'P.B.', 'DPTO SALUD OCUPACIONAL', 'SAMSUNG', 'M4072FD', 'ZELLBJFJB0004VJ', '172.16.73.98', 'CG', '8/8/2022', '', '', 'MLT-D203U', ''),
(5, '1° Piso', 'MESA DE ENTRADA', 'BROTHER', '8155', 'J5N270450', '172.16.73.56', 'CG', '8/8/2022', '', '', 'RD720-TN750', 'ALTO'),
(6, '1° Piso', 'MESA DE ENTRADA', 'HP', 'LASER JET P1600DN', 'BCRC5F6VL98', 'SIN IP POR USB', 'SI.PRO.SA.', '8/8/2022', 'NAT', '', 'CB435/CB436/CE285A/CE278A', ''),
(7, '1° Piso', 'MESA DE ENTRADA', 'XEROX', 'WORKCENTER 3225', '3381724378', '172.16.73.116', 'SI.PRO.SA.', '8/8/2022', 'rota-para reparar', '', 'CBP-106R02778', 'ALTO'),
(8, '1° Piso', 'DPTO BIENESTAR ', 'HP', 'LASER JET P1600DN', 'BRBFC7VQXL', '172.16.73.237', 'SI.PRO.SA.', '8/8/2022', '', '', 'CB435/CB436/CE285A', ''),
(9, '1° Piso', 'SALUD MENTAL', 'BROTHER', 'HL-22', '', '', '', '', 'NO SE HACE MANTENIMIENTO', '', 'PRESTAMO', ''),
(10, '2° Piso', 'DPTO PLANIFICACION', 'XEROX', 'WC-3550', '3244440958', '172.16.73.63', 'CG', '8/8/2022', '', '', 'WC3550', 'ALTO'),
(11, '2° Piso', 'DPTO CONTROL Y GESTION', 'SAMSUNG', 'M4072FD', '07QWB9UG4A009NR', '172.16.73.201', 'CG', '11/8/2022', 'ALTA NUEVA', '', 'MLT-D203U', ''),
(12, '2° Piso', 'DPTO SELECCIÓN E INGRESO', 'BROTHER', '8155', 'H5N247625', '172.16.73.147', 'CG', '8/8/2022', '', '', 'RD720-TN750', 'ALTO'),
(13, '2° Piso', 'MARIO', 'SAMSUNG', 'ML-2165W', 'Z7C8B8GCBE015MT', 'SIN IP POR USB', 'SI.PRO.SA.', '8/8/2022', '', '', 'MLT-D101S', ''),
(14, '2° Piso', 'DPTO SELECCIÓN E INGRESO', 'BROTHER', '5450DN', 'U63079D3J211571', '172.16.73.', 'SI.PRO.SA.', '8/8/2022', '', '', 'RD720-TN750', ''),
(15, '2° Piso', 'SECRTARIA FABIO', 'HP', 'LASER JET P1505DN', 'BR8586JG3X', 'SIN IP POR USB', 'SI.PRO.SA.', '8/8/2022', 'SOF', '', 'CB435/CB436/CE285A/CE278A', ''),
(16, '3° Piso', 'DPTO RESIDENCIA', 'SAMSUNG', 'M4072FD', 'ZELLBJFJB0008JM', '172.16.73.48', 'CG', '8/8/2022', '', '', 'MLT-D203U', 'MEDIO'),
(17, '3° Piso', 'DPTO RESIDENCIA', 'HP', 'LASER JET P1102W', 'BRB5698F75', 'USB', 'SI.PRO.SA.', '8/8/2022', 'ESTA CONECTADA AL DR YASBEK', '', 'CB435/CB436/CE285A/CE278A', 'MEDIO'),
(18, '3° Piso', 'DPTO RESIDENCIA', 'HP ', 'LASER JET P1600DN', 'BRC5F172PK', 'USB', 'SI.PRO.SA.', '8/8/2022', 'ESTA CONECTADA ALE CHECA', '', 'CB435/CB436/CE285A', ''),
(19, '2° Piso', 'NIVEL CENTRAL - ZAYUN', 'SAMSUNG', 'M4072FD', 'ZELLBJAH70008HJ', 'SIN IP TODAVIA', 'CG', '22/8/2022', '', '', 'MLT-D203U', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `printer`
--
ALTER TABLE `printer`
  ADD UNIQUE KEY `idprinter` (`idprinter`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `printer`
--
ALTER TABLE `printer`
  MODIFY `idprinter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
