-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-03-2024 a las 20:46:12
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
-- Estructura de tabla para la tabla `gasto_gral`
--

CREATE TABLE `gasto_gral` (
  `id` int(11) NOT NULL,
  `id_providers` int(4) NOT NULL,
  `n_factura` varchar(20) DEFAULT NULL,
  `f_factura` date DEFAULT NULL,
  `importe_f` decimal(10,2) DEFAULT NULL,
  `desc_tem` decimal(10,2) DEFAULT NULL,
  `desc_iibb` decimal(10,2) DEFAULT NULL,
  `desc_iva` decimal(10,2) DEFAULT NULL,
  `desc_gan` decimal(10,2) DEFAULT NULL,
  `desc_suss` decimal(10,2) DEFAULT NULL,
  `importe_pagar` decimal(10,2) DEFAULT NULL,
  `a_fondo` varchar(25) DEFAULT NULL,
  `type` varchar(3) DEFAULT NULL,
  `saldo_fondo` decimal(10,2) DEFAULT NULL,
  `id_fondo` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gasto_gral`
--

INSERT INTO `gasto_gral` (`id`, `id_providers`, `n_factura`, `f_factura`, `importe_f`, `desc_tem`, `desc_iibb`, `desc_iva`, `desc_gan`, `desc_suss`, `importe_pagar`, `a_fondo`, `type`, `saldo_fondo`, `id_fondo`) VALUES
(2, 9, '0001-00000111', '2023-08-08', 251144.64, 3139.31, 12557.23, 21799.35, 3679.49, 2075.58, 207893.68, '202309', 'FF', 2222224.50, 1),
(4, 7, '0001-00000111', '2023-08-08', 700000.00, 9025.51, 36102.04, 62673.14, 13097.42, 5967.28, 595175.45, '202309', 'FF', 2758935.48, 1),
(5, 8, '0001-00000111', '2023-08-08', 120000.00, 1560.00, 1440.00, 12000.00, 10566.00, 29752.07, 64681.93, '202308', 'FF', 3247360.83, 2),
(6, 9, '0001-00000222', '2023-08-08', 130000.00, 3250.00, 6500.00, 0.00, 0.00, 0.00, 120250.00, '202308', 'FF', 3117360.83, 2),
(7, 7, '0015-0000051', '2023-10-25', 20000.00, 250.00, 1000.00, 1736.00, -943.40, 165.29, 17792.11, '202310', 'FF', 80000.00, 3),
(8, 9, '0016-0000061', '2023-10-25', 10000.00, 250.00, 500.00, 0.00, 0.00, 0.00, 9250.00, '202310', 'FF', 70000.00, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `gasto_gral`
--
ALTER TABLE `gasto_gral`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_providers` (`id_providers`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `gasto_gral`
--
ALTER TABLE `gasto_gral`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `gasto_gral`
--
ALTER TABLE `gasto_gral`
  ADD CONSTRAINT `gasto_gral_ibfk_1` FOREIGN KEY (`id_providers`) REFERENCES `providers` (`idproviders`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
