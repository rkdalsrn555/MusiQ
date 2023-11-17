-- --------------------------------------------------------
-- 호스트:                          k9a608a.p.ssafy.io
-- 서버 버전:                        11.1.2-MariaDB-1:11.1.2+maria~ubu2204 - mariadb.org binary distribution
-- 서버 OS:                        debian-linux-gnu
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 테이블 musiqdb.member 구조 내보내기
CREATE TABLE IF NOT EXISTS `member` (
  `id` uuid NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  `login_id` varchar(30) NOT NULL,
  `login_type` varchar(255) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 musiqdb.member:~29 rows (대략적) 내보내기
INSERT INTO `member` (`id`, `created_at`, `updated_at`, `deleted`, `login_id`, `login_type`, `password`) VALUES
	('f0b0b745-96f8-493a-8919-0b612f97f8d5', '2023-11-10 15:28:09.707272', '2023-11-10 15:28:09.707272', b'0', 'newbyungchul', '1', '$2a$10$0V055jTDNbsxRqTY0NbLO.FHCU.mxULwAqMDziQRrOaJj377FMl/m'),
	('e10fc3d4-e39d-4c5b-b403-0f2899259ce7', '2023-11-12 20:56:19.279246', '2023-11-12 20:56:19.279269', b'0', 'taemin', 'SIMPLE', '$2a$10$gYqlPamsvCVTTQRVyzYFk./jZPQ1FG3LM7oHPw6vwr12kArYiYPX.'),
	('81968540-6256-45da-ba08-11d83af1891c', '2023-11-14 12:08:47.246103', '2023-11-14 12:08:47.246146', b'0', 'qwerqwer', 'SIMPLE', '$2a$10$UV3IdLY3It2wHaEaD2WZ3.LgniXyOcerTiGyERyw9WGYTZQd8CToW'),
	('2cd2226a-a2c6-43e6-b67e-158c38c1caea', '2023-11-16 09:22:04.508748', '2023-11-16 09:22:04.508748', b'0', 'testww', 'SIMPLE', '$2a$10$RlHKx/JvD7RsC9LGfOSjQOlW7aVl7yjvAa74AfLf0iUTDU49zvOR.'),
	('e493e416-ca73-4092-8ff0-228793ead3f3', '2023-11-15 15:28:31.940672', '2023-11-15 15:28:31.940672', b'0', 'testtttt', 'SIMPLE', '$2a$10$.fOHLSV4wQSyYtQNWUzniuo0i8.7MkTwUx/55dVQ79bUr/FRxsI6C'),
	('90aedbdd-6c71-4e50-8293-27d1febff355', '2023-11-14 22:18:12.022142', '2023-11-14 22:18:12.022186', b'0', 'hanwha', 'SIMPLE', '$2a$10$nlmf3LaQ10hYE8gYx1QkteSWUeH7Q2k/x7.zjjO4mOTQs/YlaJ1aa'),
	('51be4b6c-6c14-41f6-ba16-29b5295488e9', '2023-11-11 21:30:04.337275', '2023-11-11 21:30:04.337325', b'0', 'pingu', 'SIMPLE', '$2a$10$T1Ei1tZBpy8i/70Ni2YYaOSuWUhGiN6gC98tZMEGtJOmU7kAF.0.2'),
	('84c45cba-af61-414f-82ea-481404261e9b', '2023-11-10 23:38:57.226149', '2023-11-10 23:38:57.226149', b'0', 'sogogijjang', 'SIMPLE', '$2a$10$pQlhr.fcxZxY/kEr592d7.g3CPhUQg3kfu6DM/.GJHYMP4mhkU8G.'),
	('5e11e31b-75f4-4b0d-8cde-562ed7f29a7a', '2023-11-10 18:12:22.888986', '2023-11-10 18:12:22.889074', b'0', 'huichan', 'SIMPLE', '$2a$10$1.ZxHrxtuPwh8xTtOFL9SuLL3u0t.V5KdjBYZ0SXTpu9pzJKM1PYG'),
	('387bfead-15a1-4982-bd7c-60b92f34c046', '2023-11-15 15:29:17.061635', '2023-11-15 15:29:17.061635', b'0', 'testttttt', 'SIMPLE', '$2a$10$9cvnJo..vuU1Tmmc2Vs3quo92or149P1kqs3VGOr08h6wftfYXr8e'),
	('cf8001ad-fe02-4552-b660-6aa5f375ac58', '2023-11-13 16:24:16.661148', '2023-11-13 16:24:16.661205', b'0', 'hwany', 'SIMPLE', '$2a$10$ooZ/B1EUGq.xUlonJEflEOb0GvDcd9T3PAhkSpUy2cX6YhAle60UW'),
	('0f94372c-a095-4490-ba13-6e6759a59d20', '2023-11-15 09:30:34.519145', '2023-11-15 09:30:34.519145', b'0', 'postman', 'SIMPLE', '$2a$10$zy8PwIwBAvwFF8X8d3m/5.RiSzbhOVcxxDApt09k5Unjtg0sQEPLO'),
	('450efe4e-5ac7-417c-bbae-76343b8aaf71', '2023-11-13 16:25:16.261261', '2023-11-13 16:25:16.261284', b'0', 'yohwan', 'SIMPLE', '$2a$10$9f0k7QxyclM6iQlLPP2FnOgoCJef5iw5MnYw5QrNC8Gxju9.eI6FG'),
	('197e8b81-0117-4975-bc04-763831eee11c', '2023-11-11 21:58:34.022583', '2023-11-11 21:58:34.022607', b'0', 'rkdalsrntest', 'SIMPLE', '$2a$10$aA6ITtC.Te9UA2zrtuzCs.M5Yu4XQVJ4jHetTw5spyTu0hXnBZe3W'),
	('429e5d70-8108-4dde-82a6-7bed6da04fd9', '2023-11-15 12:31:51.022909', '2023-11-15 12:31:51.022994', b'0', 'asdfasdf', 'SIMPLE', '$2a$10$GAG4J7eY935dqE0qO34qUumDzRP5jbbnK5WXNTj6zMdwk24Du2.mm'),
	('b5866b46-ecc5-43ca-bf8c-a187554dedda', '2023-11-11 17:40:11.922466', '2023-11-11 17:40:11.922466', b'0', 'testtwo', 'SIMPLE', '$2a$10$oYiA1odyg6NWZTegP9XOI.luNK40uuyW5D/UINgR.UALxF2zs7.ji'),
	('3499c151-7669-488d-9c85-a3fb066c8b7e', '2023-11-11 21:42:49.401324', '2023-11-11 21:42:49.401344', b'0', 'rkdalsrn', 'SIMPLE', '$2a$10$9FmAsiALMWbqkMV0bXsJu.CySvoDG4QMZFegJCiOmf9VhsJyeGrBu'),
	('bcad2859-670d-4652-b630-a9db08a62ba5', '2023-11-10 15:23:11.105807', '2023-11-10 15:23:11.105807', b'0', 'sogogi', 'SIMPLE', '$2a$10$N5OgZasgp7I00taAck2ysO0UMYcwUvEGG1HZEZuDXBIygHLRJVEKa'),
	('0c9fd69e-eeaa-4656-b2ac-ac171f531b16', '2023-11-16 09:45:35.894058', '2023-11-16 09:45:35.894058', b'0', 'testrr', 'SIMPLE', '$2a$10$QB2YJBTKgi4zqdRzPCWU7.JlCOJw1zxdbcbtf3YJ.iwULUEjB7Hee'),
	('a38b2b44-6b66-4024-8fd1-b8e4c52db83b', '2023-11-10 23:37:12.346767', '2023-11-10 23:37:12.346767', b'0', 'testone', 'SIMPLE', '$2a$10$3SDXCIGkgqCKuVAPIEhJ0emYyBrxMauiKQtNPxvEGvSQIWx4y9Kbm'),
	('4161ab43-ddec-49ba-b5d6-babf03612a14', '2023-11-16 09:47:27.342804', '2023-11-16 09:47:27.342804', b'0', 'testyy', 'SIMPLE', '$2a$10$txmH7M.42MvgJ3t/YUoNGOS.T/QkdM8u52JbYI21obrye4ma3E1Gq'),
	('87993755-1ca1-4882-af1e-bf1f6ca9e4b5', '2023-11-16 15:26:57.946110', '2023-11-16 15:26:57.946133', b'0', 'testvideo', 'SIMPLE', '$2a$10$UUNqnbKt3/50DrgOA4zrPO/dDnfvPYV8fUxaoPV2Jp5XFPZWPhDem'),
	('61038cea-db07-4a25-905c-c5f6f7e4d703', '2023-11-12 20:47:57.801412', '2023-11-12 20:47:57.801457', b'0', 'testdev', 'SIMPLE', '$2a$10$lGWfQ/JA1RgJ8jk1rPSDwOHsDoA0.UE6qbAtEt0BcjihgYkK/RxJa'),
	('3763e218-c5f6-4f0b-ad37-cc52567fba57', '2023-11-17 00:34:07.283038', '2023-11-17 00:34:07.283038', b'0', 'testuu', 'SIMPLE', '$2a$10$Srytivv5HS88LHksQ6UZYuycrl7aUBlPF8ToYFO.a4uAJPEX2MtGK'),
	('b8c49b0c-b125-4082-a9af-ce253e7a3268', '2023-11-16 09:46:43.290634', '2023-11-16 09:46:43.290634', b'0', 'testtt', 'SIMPLE', '$2a$10$f7Cw3zRZZ5/VsR0vETaOceQMF7.0gOZ9cgOetzWo5Q.nN/bXVQRiG'),
	('cb5b958e-e48d-43f7-b235-e3c77c1577b9', '2023-11-12 00:46:01.933785', '2023-11-12 00:46:01.933873', b'0', 'rkdalsrntesttest', 'SIMPLE', '$2a$10$lUO8vU2anO0M0JYRu7CSVOp6x6uB71EfXKsxgzIw5VrCeAICb29Gi'),
	('b06a6f6c-624d-4f6f-9ebc-ef5ab9fc17eb', '2023-11-12 18:50:49.161606', '2023-11-12 18:50:49.161606', b'0', 'testbc', 'SIMPLE', '$2a$10$PJcK/BcnbRUCQ07dF28lOe7lhSOWCU3RyhIpBNrp2s.RSQ7yYHNra'),
	('eab2d20e-d8a3-4646-a146-f333a5398c68', '2023-11-12 21:00:26.811213', '2023-11-12 21:00:26.811234', b'0', 'ggggh', 'SIMPLE', '$2a$10$/S0yOa/BMSdH95q8FdLdi.bNxmwP/Ar6ifmE5vOfoaai7GT6F5PFW'),
	('b26cc733-fc5f-4914-9188-fa6368c0dd47', '2023-11-16 09:21:26.560287', '2023-11-16 09:21:26.560287', b'0', 'testqq', 'SIMPLE', '$2a$10$daijkP.7MrVdfXaik0cvguZWB06EADRpYoV/yp1wz8xoehrS5Ux8S');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
