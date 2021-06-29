-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-06-2021 a las 04:43:47
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reclamos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunas`
--

CREATE TABLE `comunas` (
  `ID` int(11) NOT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `comunas`
--

INSERT INTO `comunas` (`ID`, `nombre`) VALUES
(1, 'Arica'),
(2, 'Camarones'),
(3, 'General Lagos'),
(4, 'Putre'),
(5, 'Alto Hospicio'),
(6, 'Iquique'),
(7, 'Camiña'),
(8, 'Colchane'),
(9, 'Huara'),
(10, 'Pica'),
(11, 'Pozo Almonte'),
(12, 'Tocopilla'),
(13, 'María Elena'),
(14, 'Calama'),
(15, 'Ollague'),
(16, 'San Pedro de Atacama'),
(17, 'Antofagasta'),
(18, 'Mejillones'),
(19, 'Sierra Gorda'),
(20, 'Taltal'),
(21, 'Chañaral'),
(22, 'Diego de Almagro'),
(23, 'Copiapó'),
(24, 'Caldera'),
(25, 'Tierra Amarilla'),
(26, 'Vallenar'),
(27, 'Alto del Carmen'),
(28, 'Freirina'),
(29, 'Huasco'),
(30, 'La Serena'),
(31, 'Coquimbo'),
(32, 'Andacollo'),
(33, 'La Higuera'),
(34, 'Paihuano'),
(35, 'Vicuña'),
(36, 'Ovalle'),
(37, 'Combarbalá'),
(38, 'Monte Patria'),
(39, 'Punitaqui'),
(40, 'Río Hurtado'),
(41, 'Illapel'),
(42, 'Canela'),
(43, 'Los Vilos'),
(44, 'Salamanca'),
(45, 'La Ligua'),
(46, 'Cabildo'),
(47, 'Zapallar'),
(48, 'Papudo'),
(49, 'Petorca'),
(50, 'Los Andes'),
(51, 'San Esteban'),
(52, 'Calle Larga'),
(53, 'Rinconada'),
(54, 'San Felipe'),
(55, 'Llaillay'),
(56, 'Putaendo'),
(57, 'Santa María'),
(58, 'Catemu'),
(59, 'Panquehue'),
(60, 'Quillota'),
(61, 'La Cruz'),
(62, 'La Calera'),
(63, 'Nogales'),
(64, 'Hijuelas'),
(65, 'Valparaíso'),
(66, 'Viña del Mar'),
(67, 'Concón'),
(68, 'Quintero'),
(69, 'Puchuncaví'),
(70, 'Casablanca'),
(71, 'Juan Fernández'),
(72, 'San Antonio'),
(73, 'Cartagena'),
(74, 'El Tabo'),
(75, 'El Quisco'),
(76, 'Algarrobo'),
(77, 'Santo Domingo'),
(78, 'Isla de Pascua'),
(79, 'Quilpué'),
(80, 'Limache'),
(81, 'Olmué'),
(82, 'Villa Alemana'),
(83, 'Colina'),
(84, 'Lampa'),
(85, 'Tiltil'),
(86, 'Santiago'),
(87, 'Vitacura'),
(88, 'San Ramón'),
(89, 'San Miguel'),
(90, 'San Joaquín'),
(91, 'Renca'),
(92, 'Recoleta'),
(93, 'Quinta Normal'),
(94, 'Quilicura'),
(95, 'Pudahuel'),
(96, 'Providencia'),
(97, 'Peñalolén'),
(98, 'Pedro Aguirre Cerda'),
(99, 'Ñuñoa'),
(100, 'Maipú'),
(101, 'Macul'),
(102, 'Lo Prado'),
(103, 'Lo Espejo'),
(104, 'Lo Barnechea'),
(105, 'Las Condes'),
(106, 'La Reina'),
(107, 'La Pintana'),
(108, 'La Granja'),
(109, 'La Florida'),
(110, 'La Cisterna'),
(111, 'Independencia'),
(112, 'Huechuraba'),
(113, 'Estación Central'),
(114, 'El Bosque'),
(115, 'Conchalí'),
(116, 'Cerro Navia'),
(117, 'Cerrillos'),
(118, 'Puente Alto'),
(119, 'San José de Maipo'),
(120, 'Pirque'),
(121, 'San Bernardo'),
(122, 'Buin'),
(123, 'Paine'),
(124, 'Calera de Tango'),
(125, 'Melipilla'),
(126, 'Alhué'),
(127, 'Curacaví'),
(128, 'María Pinto'),
(129, 'San Pedro'),
(130, 'Isla de Maipo'),
(131, 'El Monte'),
(132, 'Padre Hurtado'),
(133, 'Peñaflor'),
(134, 'Talagante'),
(135, 'Codegua'),
(136, 'Coínco'),
(137, 'Coltauco'),
(138, 'Doñihue'),
(139, 'Graneros'),
(140, 'Las Cabras'),
(141, 'Machalí'),
(142, 'Malloa'),
(143, 'Mostazal'),
(144, 'Olivar'),
(145, 'Peumo'),
(146, 'Pichidegua'),
(147, 'Quinta de Tilcoco'),
(148, 'Rancagua'),
(149, 'Rengo'),
(150, 'Requínoa'),
(151, 'San Vicente de Tagua Tagua'),
(152, 'Chépica'),
(153, 'Chimbarongo'),
(154, 'Lolol'),
(155, 'Nancagua'),
(156, 'Palmilla'),
(157, 'Peralillo'),
(158, 'Placilla'),
(159, 'Pumanque'),
(160, 'San Fernando'),
(161, 'Santa Cruz'),
(162, 'La Estrella'),
(163, 'Litueche'),
(164, 'Marchigüe'),
(165, 'Navidad'),
(166, 'Paredones'),
(167, 'Pichilemu'),
(168, 'Curicó'),
(169, 'Hualañé'),
(170, 'Licantén'),
(171, 'Molina'),
(172, 'Rauco'),
(173, 'Romeral'),
(174, 'Sagrada Familia'),
(175, 'Teno'),
(176, 'Vichuquén'),
(177, 'Talca'),
(178, 'San Clemente'),
(179, 'Pelarco'),
(180, 'Pencahue'),
(181, 'Maule'),
(182, 'San Rafael'),
(183, 'Curepto'),
(184, 'Constitución'),
(185, 'Empedrado'),
(186, 'Río Claro'),
(187, 'Linares'),
(188, 'San Javier'),
(189, 'Parral'),
(190, 'Villa Alegre'),
(191, 'Longaví'),
(192, 'Colbún'),
(193, 'Retiro'),
(194, 'Yerbas Buenas'),
(195, 'Cauquenes'),
(196, 'Chanco'),
(197, 'Pelluhue'),
(198, 'Bulnes'),
(199, 'Chillán'),
(200, 'Chillán Viejo'),
(201, 'El Carmen'),
(202, 'Pemuco'),
(203, 'Pinto'),
(204, 'Quillón'),
(205, 'San Ignacio'),
(206, 'Yungay'),
(207, 'Cobquecura'),
(208, 'Coelemu'),
(209, 'Ninhue'),
(210, 'Portezuelo'),
(211, 'Quirihue'),
(212, 'Ránquil'),
(213, 'Treguaco'),
(214, 'San Carlos'),
(215, 'Coihueco'),
(216, 'San Nicolás'),
(217, 'Ñiquén'),
(218, 'San Fabián'),
(219, 'Alto Biobío'),
(220, 'Antuco'),
(221, 'Cabrero'),
(222, 'Laja'),
(223, 'Los Ángeles'),
(224, 'Mulchén'),
(225, 'Nacimiento'),
(226, 'Negrete'),
(227, 'Quilaco'),
(228, 'Quilleco'),
(229, 'San Rosendo'),
(230, 'Santa Bárbara'),
(231, 'Tucapel'),
(232, 'Yumbel'),
(233, 'Concepción'),
(234, 'Coronel'),
(235, 'Chiguayante'),
(236, 'Florida'),
(237, 'Hualpén'),
(238, 'Hualqui'),
(239, 'Lota'),
(240, 'Penco'),
(241, 'San Pedro de La Paz'),
(242, 'Santa Juana'),
(243, 'Talcahuano'),
(244, 'Tomé'),
(245, 'Arauco'),
(246, 'Cañete'),
(247, 'Contulmo'),
(248, 'Curanilahue'),
(249, 'Lebu'),
(250, 'Los Álamos'),
(251, 'Tirúa'),
(252, 'Angol'),
(253, 'Collipulli'),
(254, 'Curacautín'),
(255, 'Ercilla'),
(256, 'Lonquimay'),
(257, 'Los Sauces'),
(258, 'Lumaco'),
(259, 'Purén'),
(260, 'Renaico'),
(261, 'Traiguén'),
(262, 'Victoria'),
(263, 'Temuco'),
(264, 'Carahue'),
(265, 'Cholchol'),
(266, 'Cunco'),
(267, 'Curarrehue'),
(268, 'Freire'),
(269, 'Galvarino'),
(270, 'Gorbea'),
(271, 'Lautaro'),
(272, 'Loncoche'),
(273, 'Melipeuco'),
(274, 'Nueva Imperial'),
(275, 'Padre Las Casas'),
(276, 'Perquenco'),
(277, 'Pitrufquén'),
(278, 'Pucón'),
(279, 'Saavedra'),
(280, 'Teodoro Schmidt'),
(281, 'Toltén'),
(282, 'Vilcún'),
(283, 'Villarrica'),
(284, 'Valdivia'),
(285, 'Corral'),
(286, 'Lanco'),
(287, 'Los Lagos'),
(288, 'Máfil'),
(289, 'Mariquina'),
(290, 'Paillaco'),
(291, 'Panguipulli'),
(292, 'La Unión'),
(293, 'Futrono'),
(294, 'Lago Ranco'),
(295, 'Río Bueno'),
(297, 'Osorno'),
(298, 'Puerto Octay'),
(299, 'Purranque'),
(300, 'Puyehue'),
(301, 'Río Negro'),
(302, 'San Juan de la Costa'),
(303, 'San Pablo'),
(304, 'Calbuco'),
(305, 'Cochamó'),
(306, 'Fresia'),
(307, 'Frutillar'),
(308, 'Llanquihue'),
(309, 'Los Muermos'),
(310, 'Maullín'),
(311, 'Puerto Montt'),
(312, 'Puerto Varas'),
(313, 'Ancud'),
(314, 'Castro'),
(315, 'Chonchi'),
(316, 'Curaco de Vélez'),
(317, 'Dalcahue'),
(318, 'Puqueldón'),
(319, 'Queilén'),
(320, 'Quellón'),
(321, 'Quemchi'),
(322, 'Quinchao'),
(323, 'Chaitén'),
(324, 'Futaleufú'),
(325, 'Hualaihué'),
(326, 'Palena'),
(327, 'Lago Verde'),
(328, 'Coihaique'),
(329, 'Aysén'),
(330, 'Cisnes'),
(331, 'Guaitecas'),
(332, 'Río Ibáñez'),
(333, 'Chile Chico'),
(334, 'Cochrane'),
(335, 'O\'Higgins'),
(336, 'Tortel'),
(337, 'Natales'),
(338, 'Torres del Paine'),
(339, 'Laguna Blanca'),
(340, 'Punta Arenas'),
(341, 'Río Verde'),
(342, 'San Gregorio'),
(343, 'Porvenir'),
(344, 'Primavera'),
(345, 'Timaukel'),
(346, 'Cabo de Hornos'),
(347, 'Antártica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regiones`
--

CREATE TABLE `regiones` (
  `ID` int(11) NOT NULL,
  `nombre` varchar(60) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `regiones`
--

INSERT INTO `regiones` (`ID`, `nombre`) VALUES
(1, 'Arica y Parinacota'),
(2, 'Tarapaca'),
(3, 'Antofagasta'),
(4, 'Atacama'),
(5, 'Coquimbo'),
(6, 'Valparaiso'),
(7, 'Metropolitana'),
(8, 'O\'Higgins'),
(9, 'Maule'),
(10, 'Ñuble'),
(11, 'Bio Bio'),
(12, 'La Araucania'),
(13, 'Los Rios'),
(14, 'Los Lagos'),
(15, 'Aysen'),
(16, 'Magallanes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `autor` int(8) NOT NULL,
  `categoria` tinyint(2) UNSIGNED NOT NULL,
  `prioridad` tinyint(1) UNSIGNED NOT NULL,
  `estado` tinyint(1) UNSIGNED NOT NULL,
  `asunto` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `respuesta` varchar(255) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `ticket`
--

INSERT INTO `ticket` (`id`, `autor`, `categoria`, `prioridad`, `estado`, `asunto`, `descripcion`, `respuesta`) VALUES
(1, 19135592, 5, 2, 1, 'Nuevo Software de Administración', 'Se requiere de nuevo software de administración de propiedades', 'Empezamos a trabajar en él la semana pasada, pronto recibirán noticias.'),
(2, 19135592, 1, 1, 0, 'Cambio en Software: puerto deportivo', 'Es necesario que se registre los códigos RFID explícitamente en las visualizaciones de los amarres del backoffice', ''),
(3, 19135592, 3, 1, 2, 'Problema al actualizar posición de guardias', 'Invalida respuesta del GPS al mandar posición actual', 'Se solucionó, el problema estaba en las tarjetas SIM de los handheld'),
(4, 1000000, 2, 0, 0, 'Problema con Totems Autoservicio', 'Hay un problema a la hora de pagar con Webpay a través de los tótems', ''),
(5, 1000000, 4, 2, 0, 'Captors', 'Hacen falta Captors para el puerto deportivo ubicado en Concepción debido a los saqueos ocurridos durante la crisis social, con la apertura se hace necesario urgentemente estos dispositivos en el recinto.', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombre_usuario` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `nombres` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `apellidos` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `rut` int(8) UNSIGNED NOT NULL,
  `direccion` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `comuna` int(3) UNSIGNED NOT NULL,
  `region` int(2) UNSIGNED NOT NULL,
  `mail` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_spanish2_ci NOT NULL,
  `rol` tinyint(1) NOT NULL,
  `token` varchar(255) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombre_usuario`, `nombres`, `apellidos`, `rut`, `direccion`, `comuna`, `region`, `mail`, `password`, `rol`, `token`) VALUES
('gundis', 'Gundi Salvus', 'Valheimr', 1000000, 'Valheim 1223.1232, 23123.44', 341, 16, 'gundis@thistinto.cl', '$2y$10$OzkS/g.9C0z3.n7KUI58WeQ8frFHnwZs.Y9/xhutVVjjcVya3vVGK', 1, ''),
('hilasha', 'Gonzalo Esteban', 'Escobar León', 19135592, 'Junta Nacional #1626', 100, 7, 'g.leonesteban@gmail.com', '$2y$10$Pzmd12kQZruyv2O0ghXqXOzAXxC2sZFbMxiuj.TLA/MqntyAD8jrW', 0, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comunas`
--
ALTER TABLE `comunas`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`rut`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comunas`
--
ALTER TABLE `comunas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=348;

--
-- AUTO_INCREMENT de la tabla `regiones`
--
ALTER TABLE `regiones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
