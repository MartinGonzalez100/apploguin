-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-09-2023 a las 21:52:24
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
  `others` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `fondo`
--

INSERT INTO `fondo` (`id`, `tipe`, `importe`, `period`, `date`, `operating_fund`, `security`, `cooperative`, `meal`, `others`) VALUES
(1, 'FF', 3458935.48, '202309', '2023-09-07', 672750.00, 973185.48, 435000.00, 1378000.00, 0.00),
(2, 'FF', 3367360.83, '202308', '2023-08-07', 672750.00, 822000.52, 323468.00, 1446900.00, 22541.34);

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
  `saldo_fondo` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `gasto_gral`
--

INSERT INTO `gasto_gral` (`id`, `id_providers`, `n_factura`, `f_factura`, `importe_f`, `desc_tem`, `desc_iibb`, `desc_iva`, `desc_gan`, `desc_suss`, `importe_pagar`, `a_fondo`, `saldo_fondo`) VALUES
(2, 7, '0001-00000111', '2023-08-08', 251144.64, 3139.31, 12557.23, 21799.35, 3679.49, 2075.58, 207893.68, 'julio 23', 2222224.50),
(4, 7, '0001-00000111', '2023-08-08', 722040.84, 9025.51, 36102.04, 62673.14, 13097.42, 5967.28, 595175.45, 'julio 23', 555555.00),
(5, 8, '0001-00000111', '2023-08-08', 125000.00, 300.30, 400.40, 300.00, 400.00, 800.00, 43000.00, 'agosto 23', 35000.00),
(6, 9, '0001-00000222', '2023-08-08', 142470.00, 3561.75, 7123.50, 0.00, 0.00, 0.00, 131784.75, 'agosto 23', 333333.00);

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `providers`
--

CREATE TABLE `providers` (
  `idproviders` int(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  `businessname` varchar(50) NOT NULL,
  `cuit` varchar(20) NOT NULL,
  `tem` float DEFAULT NULL,
  `iibb` float DEFAULT NULL,
  `iva` float DEFAULT NULL,
  `gan` float DEFAULT NULL,
  `suss` float DEFAULT NULL,
  `cellphone` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `cbu` varchar(50) DEFAULT NULL,
  `factura` varchar(1) DEFAULT NULL,
  `dateupdate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `providers`
--

INSERT INTO `providers` (`idproviders`, `name`, `businessname`, `cuit`, `tem`, `iibb`, `iva`, `gan`, `suss`, `cellphone`, `address`, `cbu`, `factura`, `dateupdate`) VALUES
(1, 'DGRHS', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.3, 1.2, 10, 20, 30, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', '0', '0000-00-00'),
(7, 'LA PROVIDENCIA DEL NOA SRL', 'LA PROVIDENCIA DEL NOA SRL', '30685683950', 1.25, 5, 8.68, 2, 1, '', '', '', 'B', '0000-00-00'),
(8, 'COOP SAN LORENZO', 'COOP SAN LORENZO', '11111111111', 1.3, 1.2, 10, 20, 30, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', '0', '0000-00-00'),
(9, 'CEGE', 'CEGE', '11111111111', 2.5, 5, 0, 0, 0, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', '0', '0000-00-00'),
(10, 'LIBRERIA SAN PABLO', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.3, 1.2, 10, 20, 30, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', '0', '0000-00-00'),
(11, 'LIMPPLUS', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.3, 1.2, 1.1, 2.2, 3.3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', '0', '0000-00-00'),
(12, 'DGRHS', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.3, 1.2, 10000, 2022, 353.33, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', '0', '0000-00-00'),
(13, 'DGRHS', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.3, 1.2, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', '0', '0000-00-00'),
(14, 'DGRHS', 'Dir Gral de RRHH en salud - SiProSa', '11111111111', 1.3, 1.2, 1, 2, 3, '3814678943', 'calle sin nombre 196', '1212121212121212121212121', '0', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(20, 'martin', 'martineg100@gmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(21, 'martin100', 'martineg100@hotmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(22, 'maria', 'maria@maria.com', '6baf106d71ed92d651acfb2f871df4a7'),
(23, 'angeles', 'amgeles@angeles.com', '6baf106d71ed92d651acfb2f871df4a7'),
(24, 'martin', 'martineg100@gmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(25, 'martin100', 'martineg100@hotmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(26, 'maria', 'maria@maria.com', '6baf106d71ed92d651acfb2f871df4a7'),
(27, 'angeles', 'amgeles@angeles.com', '6baf106d71ed92d651acfb2f871df4a7'),
(28, 'martin', 'martineg100@gmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(29, 'martin100', 'martineg100@hotmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(30, 'maria', 'maria@maria.com', '6baf106d71ed92d651acfb2f871df4a7'),
(31, 'angeles', 'amgeles@angeles.com', '6baf106d71ed92d651acfb2f871df4a7');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `viewgralname`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `viewgralname` (
`id` int(11)
,`id_providers` int(4)
,`n_factura` varchar(20)
,`f_factura` date
,`importe_f` decimal(10,2)
,`desc_tem` decimal(10,2)
,`desc_iibb` decimal(10,2)
,`desc_iva` decimal(10,2)
,`desc_gan` decimal(10,2)
,`desc_suss` decimal(10,2)
,`importe_pagar` decimal(10,2)
,`a_fondo` varchar(25)
,`saldo_fondo` decimal(10,2)
,`idproviders` int(4)
,`name` varchar(50)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `viewgralname`
--
DROP TABLE IF EXISTS `viewgralname`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `viewgralname`  AS SELECT `gasto_gral`.`id` AS `id`, `gasto_gral`.`id_providers` AS `id_providers`, `gasto_gral`.`n_factura` AS `n_factura`, `gasto_gral`.`f_factura` AS `f_factura`, `gasto_gral`.`importe_f` AS `importe_f`, `gasto_gral`.`desc_tem` AS `desc_tem`, `gasto_gral`.`desc_iibb` AS `desc_iibb`, `gasto_gral`.`desc_iva` AS `desc_iva`, `gasto_gral`.`desc_gan` AS `desc_gan`, `gasto_gral`.`desc_suss` AS `desc_suss`, `gasto_gral`.`importe_pagar` AS `importe_pagar`, `gasto_gral`.`a_fondo` AS `a_fondo`, `gasto_gral`.`saldo_fondo` AS `saldo_fondo`, `providers`.`idproviders` AS `idproviders`, `providers`.`name` AS `name` FROM (`gasto_gral` left join `providers` on(`gasto_gral`.`id_providers` = `providers`.`idproviders`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `fondo`
--
ALTER TABLE `fondo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gasto_gral`
--
ALTER TABLE `gasto_gral`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_providers` (`id_providers`);

--
-- Indices de la tabla `printer`
--
ALTER TABLE `printer`
  ADD UNIQUE KEY `idprinter` (`idprinter`);

--
-- Indices de la tabla `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`idproviders`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `fondo`
--
ALTER TABLE `fondo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `gasto_gral`
--
ALTER TABLE `gasto_gral`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `printer`
--
ALTER TABLE `printer`
  MODIFY `idprinter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `providers`
--
ALTER TABLE `providers`
  MODIFY `idproviders` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
