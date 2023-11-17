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

-- 테이블 musiqdb.unable_music 구조 내보내기
CREATE TABLE IF NOT EXISTS `unable_music` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hint` varchar(50) NOT NULL,
  `run_time` int(11) NOT NULL,
  `singer` varchar(20) NOT NULL,
  `title` varchar(50) NOT NULL,
  `url` varchar(255) NOT NULL,
  `year` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 musiqdb.unable_music:~2 rows (대략적) 내보내기
INSERT INTO `unable_music` (`id`, `hint`, `run_time`, `singer`, `title`, `url`, `year`) VALUES
	(1, 'ㄴ ㅇㄹㅅㄹㅇㅇ', 207, 'DJDOC', '나 이런사람이야', 'https://youtube.com/watch?v=8beUKh3kpW0&si=81MHVu1J-p2_TYhu', '2010'),
	(2, 'ㅅㄴㄱ', 205, '용준형', '소나기', 'https://youtube.com/watch?v=MAUs0vTczko&si=zuN6zNTNbHHu7DKN', '2015');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
