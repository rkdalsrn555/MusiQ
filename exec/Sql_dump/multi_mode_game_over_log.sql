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

-- 테이블 musiqdb.multi_mode_game_over_log 구조 내보내기
CREATE TABLE IF NOT EXISTS `multi_mode_game_over_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ended_at` datetime(6) NOT NULL,
  `exps` varchar(255) NOT NULL,
  `multi_mode_create_game_room_log_id` int(11) NOT NULL,
  `nicknames` varchar(255) NOT NULL,
  `play_time` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `years` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 musiqdb.multi_mode_game_over_log:~8 rows (대략적) 내보내기
INSERT INTO `multi_mode_game_over_log` (`id`, `ended_at`, `exps`, `multi_mode_create_game_room_log_id`, `nicknames`, `play_time`, `title`, `years`) VALUES
	(1, '2023-11-17 03:39:03.040088', '0.0 ', 40, '히짱짱이 ', 78, '마지막', '1970'),
	(2, '2023-11-17 03:39:13.486132', '0.0 ', 40, '히짱짱이 ', 88, '마지막', '1970'),
	(3, '2023-11-17 03:42:26.089784', '40.0 10.0 20.0 ', 42, '이렇게 사랑한다최강한화 히짱짱이 ', 147, 'ㅁㅁㅁ', '2023'),
	(4, '2023-11-17 03:42:36.050850', '40.0 10.0 20.0 ', 42, '이렇게 사랑한다최강한화 히짱짱이 ', 157, 'ㅁㅁㅁ', '2023'),
	(5, '2023-11-17 10:54:32.061382', '100.0 ', 44, '히짱짱이 ', 137, 'ddd', '2023'),
	(6, '2023-11-17 11:14:22.063614', '30.0 ', 54, '히짱짱이 ', 102, 'sd', '2023'),
	(7, '2023-11-17 11:41:57.056117', '20.0 ', 55, '히짱짱이 ', 183, 'sd', '1970 2023'),
	(8, '2023-11-17 11:44:27.031733', '10.0 ', 56, '히짱짱이 ', 80, 'sd', '2023');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
