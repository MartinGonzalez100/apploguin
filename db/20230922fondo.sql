-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-09-2023 a las 16:16:43
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
-- Estructura de tabla para la tabla `fondo`
--

CREATE TABLE `fondo` (
  `id` int(11) NOT NULL,
  `tipe` varchar(4) NOT NULL,
  `importe` decimal(10,2) NOT NULL,
  `period` varchar(8) NOT NULL,
  `date` date DEFAULT NULL,
  `operating_fund` decimal(10,2) DEFAULT NULL,
  `security` decimal(10,2) DEFAULT NULL,
  `cooperative` decimal(10,2) DEFAULT NULL,
  `meal` decimal(10,2) DEFAULT NULL,
  `others` decimal(10,2) DEFAULT NULL,
  `balance` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fondo`
--

INSERT INTO `fondo` (`id`, `tipe`, `importe`, `period`, `date`, `operating_fund`, `security`, `cooperative`, `meal`, `others`, `balance`) VALUES
(1, 'FF', 3458935.48, '202309', '2023-09-07', 672750.00, 973185.48, 435000.00, 1378000.00, 0.00, 3458935.48),
(2, 'FF', 3367360.83, '202308', '2023-08-07', 672750.00, 822000.52, 323468.00, 1446900.00, 22541.34, 3367360.83);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fondo`
--
ALTER TABLE `fondo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fondo`
--
ALTER TABLE `fondo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
