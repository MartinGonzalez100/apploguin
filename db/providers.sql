-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-08-2023 a las 20:50:52
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
-- Estructura de tabla para la tabla `providers`
--

CREATE TABLE `providers` (
  `idproviders` int(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  `businessname` varchar(50) NOT NULL,
  `cuit` varchar(20) NOT NULL,
  `iibb` float NOT NULL,
  `tem` float NOT NULL,
  `iva` float NOT NULL,
  `gan` float NOT NULL,
  `suss` float NOT NULL,
  `cellphone` varchar(20) NOT NULL,
  `address` varchar(50) NOT NULL,
  `cbu` varchar(50) NOT NULL,
  `factura` int(1) NOT NULL,
  `dateupdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `providers`
--

INSERT INTO `providers` (`idproviders`, `name`, `businessname`, `cuit`, `iibb`, `tem`, `iva`, `gan`, `suss`, `cellphone`, `address`, `cbu`, `factura`, `dateupdate`) VALUES
(1, 'DGRHS', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.2, 1.3, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', 0, '0000-00-00'),
(7, 'PROVIDENCIA NOA', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.2, 1.3, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', 0, '0000-00-00'),
(8, 'COOP SAN LORENZO', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.2, 1.3, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', 0, '0000-00-00'),
(9, 'CEGE', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.2, 1.3, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', 0, '0000-00-00'),
(10, 'LIBRERIA SAN PABLO', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.2, 1.3, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', 0, '0000-00-00'),
(11, 'LIMPPLUS', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.2, 1.3, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', 0, '0000-00-00'),
(12, 'DGRHS', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.2, 1.3, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', 0, '0000-00-00'),
(13, 'DGRHS', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.2, 1.3, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', 0, '0000-00-00'),
(14, 'DGRHS', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.2, 1.3, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', 0, '0000-00-00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`idproviders`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `providers`
--
ALTER TABLE `providers`
  MODIFY `idproviders` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
