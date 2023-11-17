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

-- 테이블 musiqdb.multi_mode_game_start_log 구조 내보내기
CREATE TABLE IF NOT EXISTS `multi_mode_game_start_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `multi_mode_create_game_room_log_id` int(11) NOT NULL,
  `nicknames` varchar(255) NOT NULL,
  `room_manager_nickname` varchar(255) NOT NULL,
  `started_at` datetime(6) NOT NULL,
  `title` varchar(255) NOT NULL,
  `years` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 musiqdb.multi_mode_game_start_log:~19 rows (대략적) 내보내기
INSERT INTO `multi_mode_game_start_log` (`id`, `multi_mode_create_game_room_log_id`, `nicknames`, `room_manager_nickname`, `started_at`, `title`, `years`) VALUES
	(1, 33, '히짱짱이 ', '히짱짱이', '2023-11-17 03:16:31.994068', 'asd', '1970'),
	(2, 35, '히짱짱이 ', '히짱짱이', '2023-11-17 03:19:56.264020', 'ㅇㅋㅇㅋ', '2023'),
	(3, 36, '장충동왕족발보쌈 ', '장충동왕족발보쌈', '2023-11-17 03:28:23.870667', 'ㅁㄴㅇ', '2023'),
	(4, 40, '히짱짱이 ', '히짱짱이', '2023-11-17 03:37:44.653744', '마지막', '1970'),
	(5, 42, '이렇게 사랑한다최강한화 히짱짱이 ', '히짱짱이', '2023-11-17 03:39:58.403736', 'ㅁㅁㅁ', '2023'),
	(6, 44, '히짱짱이 ', '히짱짱이', '2023-11-17 10:52:14.763034', 'ddd', '2023'),
	(7, 45, '장충동왕족발보쌈 ', '장충동왕족발보쌈', '2023-11-17 10:54:17.030648', 'fbdf', '2023'),
	(8, 46, '장충동왕족발보쌈 ', '장충동왕족발보쌈', '2023-11-17 10:55:32.753372', 'dvsd', '2023'),
	(9, 47, '장충동왕족발보쌈 ', '장충동왕족발보쌈', '2023-11-17 10:56:28.134544', 'ㄴㅇㅍ', '2023'),
	(10, 48, '히짱짱이 ', '히짱짱이', '2023-11-17 10:57:47.202588', 'ㅇㅇ', '2023'),
	(11, 49, '장충동왕족발보쌈 ', '장충동왕족발보쌈', '2023-11-17 10:58:32.150658', 'ㄴㅇㄹ', '2023'),
	(12, 50, '히짱짱이 ', '히짱짱이', '2023-11-17 10:59:39.626508', 'ㅇㅇㅇㅇ', '2023'),
	(13, 51, '이렇게 장충동왕족발보쌈 ', '이렇게', '2023-11-17 11:04:36.160424', 'asdasd', '2000 2010 2015 2022 2021 2020 2023'),
	(14, 52, '히짱짱이 ', '히짱짱이', '2023-11-17 11:05:00.993954', 'ㅇㅇㅇ', '2023'),
	(15, 53, '히짱짱이 ', '히짱짱이', '2023-11-17 11:05:33.960808', 'dd', '2023'),
	(16, 54, '히짱짱이 ', '히짱짱이', '2023-11-17 11:12:39.839901', 'sd', '2023'),
	(17, 54, 'qwer 히짱짱이 ', '히짱짱이', '2023-11-17 11:22:59.702147', 'sd', '2023'),
	(18, 55, '히짱짱이 ', '히짱짱이', '2023-11-17 11:38:53.843456', 'sd', '1970 2023'),
	(19, 56, '히짱짱이 ', '히짱짱이', '2023-11-17 11:43:06.498700', 'sd', '2023');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
