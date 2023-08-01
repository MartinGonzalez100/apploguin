-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-08-2023 a las 14:29:00
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
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
(37, 'angeles', 'angeles@angeles.com', '6baf106d71ed92d651acfb2f871df4a7'),
(38, 'martineg', 'martineg100@hotmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(39, 'maria', 'maria@maria.com', '6baf106d71ed92d651acfb2f871df4a7'),
(45, 'maria', 'maria@maria.com', '6baf106d71ed92d651acfb2f871df4a7'),
(46, 'angeles', 'angeles@angeles.com', '6baf106d71ed92d651acfb2f871df4a7'),
(47, 'martineg', 'martineg100@hotmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(48, 'maria', 'maria@maria.com', '6baf106d71ed92d651acfb2f871df4a7'),
(49, 'angeles', 'angeles@angeles.com', '6baf106d71ed92d651acfb2f871df4a7'),
(50, 'martineg', 'martineg100@hotmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(51, 'maria', 'maria@maria.com', '6baf106d71ed92d651acfb2f871df4a7'),
(52, 'angeles', 'angeles@angeles.com', '6baf106d71ed92d651acfb2f871df4a7'),
(53, 'martineg', 'martineg100@hotmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(54, 'maria', 'maria@maria.com', '6baf106d71ed92d651acfb2f871df4a7'),
(55, 'angeles', 'angeles@angeles.com', '6baf106d71ed92d651acfb2f871df4a7'),
(56, 'martineg', 'martineg100@hotmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(57, 'maria', 'maria@maria.com', '6baf106d71ed92d651acfb2f871df4a7'),
(58, 'angeles', 'angeles@angeles.com', '6baf106d71ed92d651acfb2f871df4a7'),
(59, 'martineg', 'martineg100@hotmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(60, 'martin', 'martineg100@gmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(61, 'martin', 'martineg100@gmail.com', '6baf106d71ed92d651acfb2f871df4a7'),
(62, 'martin', 'martineg100@gmail.com', '6baf106d71ed92d651acfb2f871df4a7');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
