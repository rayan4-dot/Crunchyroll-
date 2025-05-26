-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 26, 2025 at 12:54 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Crunchyroll`
--

-- --------------------------------------------------------

--
-- Table structure for table `animes`
--

CREATE TABLE `animes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `content_status` enum('airing','finished','upcoming') NOT NULL,
  `approval_status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `approved_at` timestamp NULL DEFAULT NULL,
  `type` enum('OVA','movie','series','special') NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `cover_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `animes`
--

INSERT INTO `animes` (`id`, `title`, `description`, `category_id`, `content_status`, `approval_status`, `approved_at`, `type`, `featured`, `cover_image`, `created_at`, `updated_at`, `user_id`) VALUES
(1, 'Attack on Titan', 'In a world where humanity resides within enormous walled cities to protect themselves from Titans, giant humanoid creatures who eat humans seemingly without reason.', 15, 'airing', 'pending', NULL, 'series', 0, 'https://example.com/aot.jpg', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(2, 'One Piece', 'Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure ever left by the legendary Pirate, Gold Roger.', 16, 'airing', 'pending', NULL, 'series', 0, 'https://example.com/onepiece.jpg', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(3, 'Spirited Away', 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.', 19, 'airing', 'pending', NULL, 'movie', 0, 'https://example.com/spirited.jpg', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(4, 'Demon Slayer', 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly.', 15, 'airing', 'pending', NULL, 'series', 0, 'https://example.com/demonslayer.jpg', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(5, 'My Hero Academia', 'In a world where people with superpowers are the norm, Izuku Midoriya has dreams of becoming a hero despite being born Quirkless.', 15, 'airing', 'pending', NULL, 'series', 0, 'https://example.com/mha.jpg', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(6, 'Jujutsu Kaisen', 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.', 15, 'airing', 'pending', NULL, 'series', 0, 'https://example.com/jjk.jpg', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(7, 'Death Note', 'A high school student discovers a supernatural notebook that allows him to kill anyone by writing the victim\'s name while picturing their face.', 18, 'airing', 'pending', NULL, 'series', 0, 'https://example.com/deathnote.jpg', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(8, 'Your Name', 'Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?', 18, 'airing', 'pending', NULL, 'movie', 0, 'https://example.com/yourname.jpg', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(9, 'nisi ipsam voluptas', 'Labore est nihil distinctio magni eius a. Minus aut tempora assumenda adipisci sed rerum impedit optio.', 11, 'airing', 'pending', NULL, 'OVA', 0, 'https://via.placeholder.com/640x480.png/0033ee?text=anime+aliquam', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(10, 'consequatur id iste', 'Ullam omnis tenetur veniam in suscipit nesciunt distinctio quod. Ipsa eos quos blanditiis dolor nostrum vel architecto repellendus. Cumque quia debitis dolorem sint tenetur maxime vel sed. Dolorem perspiciatis quibusdam magnam quod quia cupiditate aut et.', 1, 'airing', 'pending', NULL, 'OVA', 0, 'https://via.placeholder.com/640x480.png/008888?text=anime+amet', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(11, 'qui consequatur rem', 'Dolor a at ullam ut soluta dignissimos. Nesciunt illum voluptate libero iusto. Exercitationem culpa quia quos maxime. Praesentium consequatur et voluptas.', 16, 'airing', 'pending', NULL, 'OVA', 0, 'https://via.placeholder.com/640x480.png/005577?text=anime+adipisci', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(12, 'nihil tempora ducimus', 'Doloremque est et qui ex qui. Quis omnis asperiores pariatur et amet provident natus. Suscipit nostrum dolore asperiores iusto rem.', 18, 'airing', 'pending', NULL, 'special', 0, 'https://via.placeholder.com/640x480.png/00bbcc?text=anime+hic', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(13, 'amet et sit', 'Sit et porro quis in ipsum repellat nulla. Rem occaecati fuga in delectus.', 17, 'airing', 'pending', NULL, 'movie', 0, 'https://via.placeholder.com/640x480.png/005566?text=anime+eum', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(14, 'quos vel non', 'Neque ullam maiores eaque eveniet qui. Corrupti ullam nam officia et consectetur nobis. Illum sunt natus fuga molestiae rerum consequatur. Quo doloribus minus repudiandae.', 7, 'airing', 'pending', NULL, 'special', 0, 'https://via.placeholder.com/640x480.png/006699?text=anime+soluta', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(15, 'officia neque quia', 'Iste odio enim eos et necessitatibus itaque laboriosam. In ipsum aut maiores reiciendis quia pariatur. Iste ullam corporis veritatis aut nesciunt aut omnis. Necessitatibus eveniet eius velit neque.', 19, 'airing', 'pending', NULL, 'series', 0, 'https://via.placeholder.com/640x480.png/003377?text=anime+molestias', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(16, 'hic aliquid maiores', 'Quo nesciunt sed corrupti cupiditate dicta. Qui molestias et ad laudantium minima nostrum assumenda. Et voluptatibus veniam architecto qui dolorum officiis. Modi eum officia cupiditate ut id. Nihil voluptas aliquam nobis commodi voluptas.', 5, 'airing', 'pending', NULL, 'special', 0, 'https://via.placeholder.com/640x480.png/009944?text=anime+unde', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(17, 'a enim architecto', 'Debitis aperiam labore nam aut. Assumenda veniam laborum perspiciatis reprehenderit a eligendi. Fuga pariatur illo et consequatur expedita quidem sed. Enim nam et blanditiis aut ab provident minima. Velit exercitationem eligendi ipsam distinctio non officiis adipisci aut.', 6, 'airing', 'pending', NULL, 'special', 0, 'https://via.placeholder.com/640x480.png/00ee11?text=anime+unde', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(18, 'nostrum non amet', 'Perspiciatis harum voluptas odit cupiditate aspernatur voluptatem dolorem. Quasi aperiam natus ut animi. Id est facere aut ipsum recusandae. Non est est ratione et placeat.', 12, 'airing', 'pending', NULL, 'movie', 0, 'https://via.placeholder.com/640x480.png/000044?text=anime+ut', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(19, 'quas dolor pariatur', 'Asperiores at maxime dolores laudantium repellendus. Vero numquam repellat tempore corporis. Necessitatibus ut autem quia debitis autem enim delectus illo. Labore et voluptatem iusto reprehenderit tempore voluptates.', 14, 'airing', 'pending', NULL, 'series', 0, 'https://via.placeholder.com/640x480.png/009988?text=anime+qui', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(20, 'asperiores et ad', 'Id quo facere sapiente ut rerum qui. Eveniet non iste pariatur itaque. Enim ut dignissimos aut dolorem aspernatur. Cupiditate quibusdam tenetur in ut nam.', 12, 'airing', 'pending', NULL, 'special', 0, 'https://via.placeholder.com/640x480.png/003366?text=anime+inventore', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(21, 'voluptas non et', 'Nemo sunt iste officiis porro sed et. Iste ea dolores sunt reiciendis. Et vel qui architecto magnam qui quibusdam. Qui quia est cupiditate eveniet nisi.', 2, 'airing', 'pending', NULL, 'series', 0, 'https://via.placeholder.com/640x480.png/004466?text=anime+quo', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(22, 'minus nulla quidem', 'Voluptatem sapiente sed vel est voluptatem ratione. In necessitatibus ipsam fugit perspiciatis consectetur ratione explicabo vel. Et maxime qui dolorum quod rem praesentium repellendus ut. Nam ut expedita nobis voluptatum amet et.', 19, 'airing', 'pending', NULL, 'OVA', 0, 'https://via.placeholder.com/640x480.png/0044aa?text=anime+officia', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(23, 'tempore qui sed', 'Delectus autem sed quia repudiandae odio. In vel nisi architecto ut. Eaque quasi id distinctio in aut et molestias. Fugiat voluptatem debitis odio impedit vel quas ut architecto.', 13, 'airing', 'pending', NULL, 'special', 0, 'https://via.placeholder.com/640x480.png/00bb66?text=anime+vel', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(24, 'accusamus in accusamus', 'Rem error debitis alias nemo. Placeat quisquam ipsam sint. Amet distinctio ea deserunt est. Qui numquam sunt hic rem.', 10, 'airing', 'pending', NULL, 'movie', 0, 'https://via.placeholder.com/640x480.png/00ee33?text=anime+officia', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(25, 'quisquam molestiae dolorem', 'Enim provident odio in sed aperiam omnis rerum voluptate. Velit sequi iure corporis eveniet. Numquam quisquam tempora exercitationem et ullam. Beatae est omnis quia est quia non accusamus.', 12, 'airing', 'pending', NULL, 'OVA', 0, 'https://via.placeholder.com/640x480.png/00ee00?text=anime+facere', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(26, 'aut commodi id', 'Reiciendis quaerat deleniti eum aliquam soluta consequatur. Vero enim quis ipsum sint magni. Placeat qui tempore dolores. Magnam qui id culpa explicabo.', 4, 'airing', 'pending', NULL, 'special', 0, 'https://via.placeholder.com/640x480.png/0099dd?text=anime+eos', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(27, 'ut voluptatem reprehenderit', 'Sint culpa facilis deleniti nemo explicabo fugiat tempora. Qui fuga est necessitatibus. Cumque consequatur voluptatem est et dolores. Et incidunt facilis consequatur alias numquam facilis et aliquid.', 6, 'airing', 'pending', NULL, 'OVA', 0, 'https://via.placeholder.com/640x480.png/004444?text=anime+fugit', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(28, 'repellat dolor voluptatem', 'Ducimus dolores et dolore modi ut non. Vel itaque sequi et. Officia soluta et ab iste maiores eveniet. Quibusdam debitis ipsam perferendis dolores iste iste.', 4, 'airing', 'pending', NULL, 'OVA', 0, 'https://via.placeholder.com/640x480.png/0011dd?text=anime+alias', '2025-05-25 01:37:59', '2025-05-25 01:37:59', NULL),
(29, 'Dragon ball', 'alien shit and superpower, inspired by superman and journey to the west', 1, 'airing', 'pending', NULL, 'series', 0, 'covers/ey6bsZz2gFkv26Xa1ayK0lklSvlVYYXEZDHZ6yp4.jpg', '2025-05-25 21:31:08', '2025-05-25 21:31:08', 2);

-- --------------------------------------------------------

--
-- Table structure for table `anime_uploaders`
--

CREATE TABLE `anime_uploaders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Action', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(2, 'Adventure', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(3, 'Comedy', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(4, 'Drama', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(5, 'Fantasy', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(6, 'Horror', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(7, 'Mecha', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(8, 'Mystery', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(9, 'Romance', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(10, 'Sci-Fi', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(11, 'Slice of Life', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(12, 'Sports', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(13, 'Supernatural', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(14, 'Thriller', '2025-05-25 01:37:56', '2025-05-25 01:37:56'),
(15, 'Action', '2025-05-25 01:37:59', '2025-05-25 01:37:59'),
(16, 'Adventure', '2025-05-25 01:37:59', '2025-05-25 01:37:59'),
(17, 'Comedy', '2025-05-25 01:37:59', '2025-05-25 01:37:59'),
(18, 'Drama', '2025-05-25 01:37:59', '2025-05-25 01:37:59'),
(19, 'Fantasy', '2025-05-25 01:37:59', '2025-05-25 01:37:59'),
(20, 'kudo', '2025-05-25 02:19:07', '2025-05-25 02:19:27');

-- --------------------------------------------------------

--
-- Table structure for table `episodes`
--

CREATE TABLE `episodes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `anime_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `video_file` varchar(255) DEFAULT NULL,
  `season` int(11) DEFAULT NULL,
  `episode_number` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `episodes`
--

INSERT INTO `episodes` (`id`, `anime_id`, `title`, `description`, `video_file`, `season`, `episode_number`, `created_at`, `updated_at`) VALUES
(1, 1, 'Episode 1', 'Episode 1 of Attack on Titan', NULL, 1, 1, '2025-05-25 01:40:41', '2025-05-25 01:40:41'),
(2, 1, 'Episode 2', 'Episode 2 of Attack on Titan', NULL, 1, 2, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(3, 1, 'Episode 3', 'Episode 3 of Attack on Titan', NULL, 1, 3, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(4, 1, 'Episode 4', 'Episode 4 of Attack on Titan', NULL, 1, 4, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(5, 1, 'Episode 5', 'Episode 5 of Attack on Titan', NULL, 1, 5, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(6, 1, 'Episode 6', 'Episode 6 of Attack on Titan', NULL, 1, 6, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(7, 1, 'Episode 7', 'Episode 7 of Attack on Titan', NULL, 1, 7, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(8, 1, 'Episode 8', 'Episode 8 of Attack on Titan', NULL, 1, 8, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(9, 1, 'Episode 9', 'Episode 9 of Attack on Titan', NULL, 1, 9, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(10, 1, 'Episode 10', 'Episode 10 of Attack on Titan', NULL, 1, 10, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(11, 1, 'Episode 11', 'Episode 11 of Attack on Titan', NULL, 1, 11, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(12, 1, 'Episode 12', 'Episode 12 of Attack on Titan', NULL, 1, 12, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(13, 2, 'Episode 1', 'Episode 1 of One Piece', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(14, 2, 'Episode 2', 'Episode 2 of One Piece', NULL, 1, 2, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(15, 2, 'Episode 3', 'Episode 3 of One Piece', NULL, 1, 3, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(16, 2, 'Episode 4', 'Episode 4 of One Piece', NULL, 1, 4, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(17, 2, 'Episode 5', 'Episode 5 of One Piece', NULL, 1, 5, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(18, 2, 'Episode 6', 'Episode 6 of One Piece', NULL, 1, 6, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(19, 2, 'Episode 7', 'Episode 7 of One Piece', NULL, 1, 7, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(20, 2, 'Episode 8', 'Episode 8 of One Piece', NULL, 1, 8, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(21, 2, 'Episode 9', 'Episode 9 of One Piece', NULL, 1, 9, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(22, 2, 'Episode 10', 'Episode 10 of One Piece', NULL, 1, 10, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(23, 2, 'Episode 11', 'Episode 11 of One Piece', NULL, 1, 11, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(24, 2, 'Episode 12', 'Episode 12 of One Piece', NULL, 1, 12, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(25, 3, 'Full Movie', 'The complete movie of Spirited Away', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(26, 4, 'Episode 1', 'Episode 1 of Demon Slayer', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(27, 4, 'Episode 2', 'Episode 2 of Demon Slayer', NULL, 1, 2, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(28, 4, 'Episode 3', 'Episode 3 of Demon Slayer', NULL, 1, 3, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(29, 4, 'Episode 4', 'Episode 4 of Demon Slayer', NULL, 1, 4, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(30, 4, 'Episode 5', 'Episode 5 of Demon Slayer', NULL, 1, 5, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(31, 4, 'Episode 6', 'Episode 6 of Demon Slayer', NULL, 1, 6, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(32, 4, 'Episode 7', 'Episode 7 of Demon Slayer', NULL, 1, 7, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(33, 4, 'Episode 8', 'Episode 8 of Demon Slayer', NULL, 1, 8, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(34, 4, 'Episode 9', 'Episode 9 of Demon Slayer', NULL, 1, 9, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(35, 4, 'Episode 10', 'Episode 10 of Demon Slayer', NULL, 1, 10, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(36, 4, 'Episode 11', 'Episode 11 of Demon Slayer', NULL, 1, 11, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(37, 4, 'Episode 12', 'Episode 12 of Demon Slayer', NULL, 1, 12, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(38, 5, 'Episode 1', 'Episode 1 of My Hero Academia', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(39, 5, 'Episode 2', 'Episode 2 of My Hero Academia', NULL, 1, 2, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(40, 5, 'Episode 3', 'Episode 3 of My Hero Academia', NULL, 1, 3, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(41, 5, 'Episode 4', 'Episode 4 of My Hero Academia', NULL, 1, 4, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(42, 5, 'Episode 5', 'Episode 5 of My Hero Academia', NULL, 1, 5, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(43, 5, 'Episode 6', 'Episode 6 of My Hero Academia', NULL, 1, 6, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(44, 5, 'Episode 7', 'Episode 7 of My Hero Academia', NULL, 1, 7, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(45, 5, 'Episode 8', 'Episode 8 of My Hero Academia', NULL, 1, 8, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(46, 5, 'Episode 9', 'Episode 9 of My Hero Academia', NULL, 1, 9, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(47, 5, 'Episode 10', 'Episode 10 of My Hero Academia', NULL, 1, 10, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(48, 5, 'Episode 11', 'Episode 11 of My Hero Academia', NULL, 1, 11, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(49, 5, 'Episode 12', 'Episode 12 of My Hero Academia', NULL, 1, 12, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(50, 6, 'Episode 1', 'Episode 1 of Jujutsu Kaisen', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(51, 6, 'Episode 2', 'Episode 2 of Jujutsu Kaisen', NULL, 1, 2, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(52, 6, 'Episode 3', 'Episode 3 of Jujutsu Kaisen', NULL, 1, 3, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(53, 6, 'Episode 4', 'Episode 4 of Jujutsu Kaisen', NULL, 1, 4, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(54, 6, 'Episode 5', 'Episode 5 of Jujutsu Kaisen', NULL, 1, 5, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(55, 6, 'Episode 6', 'Episode 6 of Jujutsu Kaisen', NULL, 1, 6, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(56, 6, 'Episode 7', 'Episode 7 of Jujutsu Kaisen', NULL, 1, 7, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(57, 6, 'Episode 8', 'Episode 8 of Jujutsu Kaisen', NULL, 1, 8, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(58, 6, 'Episode 9', 'Episode 9 of Jujutsu Kaisen', NULL, 1, 9, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(59, 6, 'Episode 10', 'Episode 10 of Jujutsu Kaisen', NULL, 1, 10, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(60, 6, 'Episode 11', 'Episode 11 of Jujutsu Kaisen', NULL, 1, 11, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(61, 6, 'Episode 12', 'Episode 12 of Jujutsu Kaisen', NULL, 1, 12, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(62, 7, 'Episode 1', 'Episode 1 of Death Note', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(63, 7, 'Episode 2', 'Episode 2 of Death Note', NULL, 1, 2, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(64, 7, 'Episode 3', 'Episode 3 of Death Note', NULL, 1, 3, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(65, 7, 'Episode 4', 'Episode 4 of Death Note', NULL, 1, 4, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(66, 7, 'Episode 5', 'Episode 5 of Death Note', NULL, 1, 5, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(67, 7, 'Episode 6', 'Episode 6 of Death Note', NULL, 1, 6, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(68, 7, 'Episode 7', 'Episode 7 of Death Note', NULL, 1, 7, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(69, 7, 'Episode 8', 'Episode 8 of Death Note', NULL, 1, 8, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(70, 7, 'Episode 9', 'Episode 9 of Death Note', NULL, 1, 9, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(71, 7, 'Episode 10', 'Episode 10 of Death Note', NULL, 1, 10, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(72, 7, 'Episode 11', 'Episode 11 of Death Note', NULL, 1, 11, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(73, 7, 'Episode 12', 'Episode 12 of Death Note', NULL, 1, 12, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(74, 8, 'Full Movie', 'The complete movie of Your Name', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(75, 9, 'Full Movie', 'The complete movie of nisi ipsam voluptas', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(76, 10, 'Full Movie', 'The complete movie of consequatur id iste', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(77, 11, 'Full Movie', 'The complete movie of qui consequatur rem', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(78, 12, 'Full Movie', 'The complete movie of nihil tempora ducimus', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(79, 13, 'Full Movie', 'The complete movie of amet et sit', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(80, 14, 'Full Movie', 'The complete movie of quos vel non', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(81, 15, 'Episode 1', 'Episode 1 of officia neque quia', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(82, 15, 'Episode 2', 'Episode 2 of officia neque quia', NULL, 1, 2, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(83, 15, 'Episode 3', 'Episode 3 of officia neque quia', NULL, 1, 3, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(84, 15, 'Episode 4', 'Episode 4 of officia neque quia', NULL, 1, 4, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(85, 15, 'Episode 5', 'Episode 5 of officia neque quia', NULL, 1, 5, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(86, 15, 'Episode 6', 'Episode 6 of officia neque quia', NULL, 1, 6, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(87, 15, 'Episode 7', 'Episode 7 of officia neque quia', NULL, 1, 7, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(88, 15, 'Episode 8', 'Episode 8 of officia neque quia', NULL, 1, 8, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(89, 15, 'Episode 9', 'Episode 9 of officia neque quia', NULL, 1, 9, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(90, 15, 'Episode 10', 'Episode 10 of officia neque quia', NULL, 1, 10, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(91, 15, 'Episode 11', 'Episode 11 of officia neque quia', NULL, 1, 11, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(92, 15, 'Episode 12', 'Episode 12 of officia neque quia', NULL, 1, 12, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(93, 16, 'Full Movie', 'The complete movie of hic aliquid maiores', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(94, 17, 'Full Movie', 'The complete movie of a enim architecto', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(95, 18, 'Full Movie', 'The complete movie of nostrum non amet', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(96, 19, 'Episode 1', 'Episode 1 of quas dolor pariatur', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(97, 19, 'Episode 2', 'Episode 2 of quas dolor pariatur', NULL, 1, 2, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(98, 19, 'Episode 3', 'Episode 3 of quas dolor pariatur', NULL, 1, 3, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(99, 19, 'Episode 4', 'Episode 4 of quas dolor pariatur', NULL, 1, 4, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(100, 19, 'Episode 5', 'Episode 5 of quas dolor pariatur', NULL, 1, 5, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(101, 19, 'Episode 6', 'Episode 6 of quas dolor pariatur', NULL, 1, 6, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(102, 19, 'Episode 7', 'Episode 7 of quas dolor pariatur', NULL, 1, 7, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(103, 19, 'Episode 8', 'Episode 8 of quas dolor pariatur', NULL, 1, 8, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(104, 19, 'Episode 9', 'Episode 9 of quas dolor pariatur', NULL, 1, 9, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(105, 19, 'Episode 10', 'Episode 10 of quas dolor pariatur', NULL, 1, 10, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(106, 19, 'Episode 11', 'Episode 11 of quas dolor pariatur', NULL, 1, 11, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(107, 19, 'Episode 12', 'Episode 12 of quas dolor pariatur', NULL, 1, 12, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(108, 20, 'Full Movie', 'The complete movie of asperiores et ad', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(109, 21, 'Episode 1', 'Episode 1 of voluptas non et', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(110, 21, 'Episode 2', 'Episode 2 of voluptas non et', NULL, 1, 2, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(111, 21, 'Episode 3', 'Episode 3 of voluptas non et', NULL, 1, 3, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(112, 21, 'Episode 4', 'Episode 4 of voluptas non et', NULL, 1, 4, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(113, 21, 'Episode 5', 'Episode 5 of voluptas non et', NULL, 1, 5, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(114, 21, 'Episode 6', 'Episode 6 of voluptas non et', NULL, 1, 6, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(115, 21, 'Episode 7', 'Episode 7 of voluptas non et', NULL, 1, 7, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(116, 21, 'Episode 8', 'Episode 8 of voluptas non et', NULL, 1, 8, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(117, 21, 'Episode 9', 'Episode 9 of voluptas non et', NULL, 1, 9, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(118, 21, 'Episode 10', 'Episode 10 of voluptas non et', NULL, 1, 10, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(119, 21, 'Episode 11', 'Episode 11 of voluptas non et', NULL, 1, 11, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(120, 21, 'Episode 12', 'Episode 12 of voluptas non et', NULL, 1, 12, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(121, 22, 'Full Movie', 'The complete movie of minus nulla quidem', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(122, 23, 'Full Movie', 'The complete movie of tempore qui sed', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(123, 24, 'Full Movie', 'The complete movie of accusamus in accusamus', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(124, 25, 'Full Movie', 'The complete movie of quisquam molestiae dolorem', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(125, 26, 'Full Movie', 'The complete movie of aut commodi id', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(126, 27, 'Full Movie', 'The complete movie of ut voluptatem reprehenderit', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42'),
(127, 28, 'Full Movie', 'The complete movie of repellat dolor voluptatem', NULL, 1, 1, '2025-05-25 01:40:42', '2025-05-25 01:40:42');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_03_20_000000_create_categories_table', 1),
(5, '2024_03_21_000000_create_animes_table', 1),
(6, '2024_05_24_000000_add_role_to_users_table', 1),
(7, '2025_05_24_230114_create_episodes_table', 1),
(8, '2025_05_24_230131_create_subtitles_table', 1),
(9, '2025_05_24_230145_create_user_activities_table', 1),
(10, '2025_05_24_230211_create_anime_uploaders_table', 1),
(11, '2025_05_24_230233_create_ratings_table', 1),
(12, '2025_05_24_230246_create_notifications_table', 1),
(13, '2025_05_24_230307_create_watchlist_table', 1),
(14, '2025_05_25_000632_create_personal_access_tokens_table', 1),
(15, '2025_05_25_002549_create_user_favorites_table', 1),
(16, '2025_05_25_002553_create_user_watch_later_table', 1),
(17, '2025_05_25_003000_add_featured_column_to_animes_table', 1),
(18, '2025_05_25_022857_create_roles_table', 1),
(19, '2025_05_25_022918_add_role_id_to_users_table', 1),
(21, '2024_03_21_000002_create_anime_uploaders_table', 2),
(22, '2024_03_23_000000_fix_anime_status_columns', 3),
(23, '2024_03_23_000001_add_video_file_to_episodes_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `read_status` tinyint(1) NOT NULL DEFAULT 0,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `anime_id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `user_id`, `anime_id`, `rating`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 4, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(2, 1, 4, 1, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(3, 1, 9, 3, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(4, 1, 10, 4, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(5, 1, 17, 4, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(6, 2, 3, 1, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(7, 2, 11, 2, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(8, 2, 12, 2, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(9, 2, 20, 4, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(10, 2, 28, 5, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(11, 3, 9, 3, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(12, 3, 10, 1, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(13, 3, 14, 1, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(14, 3, 18, 5, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(15, 3, 22, 2, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(16, 4, 1, 2, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(17, 4, 4, 5, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(18, 4, 5, 3, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(19, 4, 18, 3, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(20, 4, 25, 4, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(21, 5, 11, 5, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(22, 5, 16, 5, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(23, 5, 18, 5, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(24, 5, 19, 5, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(25, 5, 25, 5, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(26, 6, 8, 5, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(27, 6, 10, 4, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(28, 6, 12, 3, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(29, 6, 14, 4, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(30, 6, 18, 4, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(31, 7, 1, 4, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(32, 7, 5, 1, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(33, 7, 6, 3, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(34, 7, 23, 3, '2025-05-25 01:40:55', '2025-05-25 01:40:55'),
(35, 7, 24, 3, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(36, 8, 6, 5, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(37, 8, 8, 1, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(38, 8, 12, 5, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(39, 8, 13, 2, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(40, 8, 20, 3, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(41, 9, 6, 1, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(42, 9, 14, 2, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(43, 9, 20, 4, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(44, 9, 21, 1, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(45, 9, 22, 3, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(46, 10, 2, 5, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(47, 10, 4, 1, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(48, 10, 9, 1, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(49, 10, 21, 4, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(50, 10, 24, 2, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(51, 11, 1, 2, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(52, 11, 3, 2, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(53, 11, 6, 4, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(54, 11, 14, 2, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(55, 11, 19, 5, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(56, 12, 9, 3, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(57, 12, 14, 2, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(58, 12, 15, 2, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(59, 12, 21, 2, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(60, 12, 27, 1, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(61, 13, 8, 5, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(62, 13, 12, 1, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(63, 13, 15, 1, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(64, 13, 18, 1, '2025-05-25 01:40:56', '2025-05-25 01:40:56'),
(65, 13, 22, 4, '2025-05-25 01:40:56', '2025-05-25 01:40:56');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'user', '2025-05-25 01:30:06', '2025-05-25 01:30:06'),
(2, 'uploader', '2025-05-25 01:30:06', '2025-05-25 01:30:06'),
(3, 'admin', '2025-05-25 01:30:06', '2025-05-25 01:30:06');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1mjMmix4oQgIwGbe2iGXXhIyty5kKqBpIhNtBmnc', 1, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoicWNsSWlkTDZtbzBtOTBib2NoNExhREpxbzlsYkZCdFNvbnRicTdsaSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9wZW5kaW5nLWNvbnRlbnQiO31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1748212571),
('6QYsrRNpLPkjqSCebHT7cw0SEDolIi7LAWrm7USu', 2, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiRUlSeElEQWE3Q1JBUXNNVjRDbWhIR0lHVjRjYXlhOVN2M0U0SnB6SCI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQwOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvdXBsb2FkZXIvZGFzaGJvYXJkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mjt9', 1748213267),
('A8QcKkwcMEaZ5cWHXL1tS2YGxuf60CLaCiKvDfTC', 2, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZW9hbmo1a2lDTUtLUVp5V1E3NWxuUTd0cTVOZ05sTUJwa3hrTDFTbCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI7fQ==', 1748213556),
('ih0FTh8sKKrfezwgJj0ue0MN1IuC26GkU6MNAtYD', 2, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiOFozczlhWUprWU04Tnlzc0VPTzUxeTlSak1iWndlRDdzWkpoc3BiUiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI7fQ==', 1748213448),
('iXvbzwA7SD0HXDGWz8BLwqpQkDt8f71uTCOHsrN3', 2, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUzJvQlEzZEdVeXNFaENFWHFNYkUwU25QV0M0S2tWN1FSNTZhMzVlWCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovLzEyNy4wLjAuMTo4MDAwL3VwbG9hZGVyL2FuaW1lL2NyZWF0ZSI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIxOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToyO30=', 1748213305);

-- --------------------------------------------------------

--
-- Table structure for table `subtitles`
--

CREATE TABLE `subtitles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `episode_id` bigint(20) UNSIGNED NOT NULL,
  `language` varchar(255) NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role_id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 3, 'Admin User', 'admin@example.com', NULL, '$2y$12$eL.TmTTAQHa.gEnnC7Rwg.aj8qot6c6YeIs/lZGbXhdic7H2zrPqu', 'user', NULL, '2025-05-25 01:39:34', '2025-05-25 01:39:34'),
(2, 2, 'Uploader User', 'uploader@example.com', NULL, '$2y$12$YDDkbumF8wDHBeqUZoQZUudjZTHT7Nv2H3C1pBsiQA7jc4sezGhFG', 'user', NULL, '2025-05-25 01:39:35', '2025-05-25 01:39:35'),
(3, 1, 'Regular User', 'user@example.com', NULL, '$2y$12$dizMsGj.muenP0q0IeHUeuhlrckkulTHJYLymNsTkOCDmgq..SVSO', 'user', NULL, '2025-05-25 01:39:35', '2025-05-25 01:39:35'),
(4, 1, 'Prof. Sigurd Grant', 'mikayla.ward@example.net', '2025-05-25 01:39:35', '$2y$12$2azTqYLfHSRZJz5.vJltuOsOv7JzP/YDu9DHL3YW/S4IbA2baYaLG', 'user', 'M6JRf6nTtV', '2025-05-25 01:39:37', '2025-05-25 01:39:37'),
(5, 1, 'Joany Schmeler', 'veum.haskell@example.net', '2025-05-25 01:39:37', '$2y$12$2azTqYLfHSRZJz5.vJltuOsOv7JzP/YDu9DHL3YW/S4IbA2baYaLG', 'user', 'obwOipZHm5', '2025-05-25 01:39:37', '2025-05-25 01:39:37'),
(6, 1, 'Janelle Doyle', 'dickens.giovani@example.org', '2025-05-25 01:39:37', '$2y$12$2azTqYLfHSRZJz5.vJltuOsOv7JzP/YDu9DHL3YW/S4IbA2baYaLG', 'user', 'm06e1WWs2D', '2025-05-25 01:39:37', '2025-05-25 01:39:37'),
(7, 1, 'Winifred Halvorson', 'kreichel@example.com', '2025-05-25 01:39:37', '$2y$12$2azTqYLfHSRZJz5.vJltuOsOv7JzP/YDu9DHL3YW/S4IbA2baYaLG', 'user', 'JgQ6uILWcs', '2025-05-25 01:39:37', '2025-05-25 01:39:37'),
(8, 1, 'Mr. Cade Schmidt', 'gschaden@example.com', '2025-05-25 01:39:37', '$2y$12$2azTqYLfHSRZJz5.vJltuOsOv7JzP/YDu9DHL3YW/S4IbA2baYaLG', 'user', 'gnOIprGxrV', '2025-05-25 01:39:37', '2025-05-25 01:39:37'),
(9, 1, 'Devin Predovic', 'smitham.tyrel@example.org', '2025-05-25 01:39:37', '$2y$12$2azTqYLfHSRZJz5.vJltuOsOv7JzP/YDu9DHL3YW/S4IbA2baYaLG', 'user', 'uKbbgvbDlz', '2025-05-25 01:39:37', '2025-05-25 01:39:37'),
(10, 1, 'Roma Bayer', 'dino04@example.org', '2025-05-25 01:39:37', '$2y$12$2azTqYLfHSRZJz5.vJltuOsOv7JzP/YDu9DHL3YW/S4IbA2baYaLG', 'user', 'rTF5kJ7PMi', '2025-05-25 01:39:37', '2025-05-25 01:39:37'),
(11, 1, 'Prof. Claude Macejkovic II', 'armstrong.russell@example.org', '2025-05-25 01:39:37', '$2y$12$2azTqYLfHSRZJz5.vJltuOsOv7JzP/YDu9DHL3YW/S4IbA2baYaLG', 'user', 'yQ2ArunGnV', '2025-05-25 01:39:37', '2025-05-25 01:39:37'),
(12, 1, 'Fausto Hermann IV', 'helmer19@example.net', '2025-05-25 01:39:37', '$2y$12$2azTqYLfHSRZJz5.vJltuOsOv7JzP/YDu9DHL3YW/S4IbA2baYaLG', 'user', '75hQHFzKUT', '2025-05-25 01:39:37', '2025-05-25 01:39:37'),
(13, 1, 'Lincoln Labadie', 'zkoch@example.org', '2025-05-25 01:39:37', '$2y$12$2azTqYLfHSRZJz5.vJltuOsOv7JzP/YDu9DHL3YW/S4IbA2baYaLG', 'user', 'Bh8dMd7EAQ', '2025-05-25 01:39:37', '2025-05-25 01:39:37'),
(14, 2, 'Rayan elgue', 'elguerdaoui@gmail.com', NULL, '$2y$12$QrC1Xkxozs0zyCQM6OYIV.xvJAj4IBL9/Ndg0gkXqfZlacA/nfKja', 'user', NULL, '2025-05-25 02:22:00', '2025-05-25 02:22:00');

-- --------------------------------------------------------

--
-- Table structure for table `user_activities`
--

CREATE TABLE `user_activities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `anime_id` bigint(20) UNSIGNED NOT NULL,
  `action_type` enum('watch_history','favorites','watch_later','continue_watching') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_favorites`
--

CREATE TABLE `user_favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `anime_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_watch_later`
--

CREATE TABLE `user_watch_later` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `anime_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `anime_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animes`
--
ALTER TABLE `animes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `animes_category_id_foreign` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `anime_uploaders`
--
ALTER TABLE `anime_uploaders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `anime_uploaders_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `episodes_anime_id_foreign` (`anime_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ratings_user_id_foreign` (`user_id`),
  ADD KEY `ratings_anime_id_foreign` (`anime_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `subtitles`
--
ALTER TABLE `subtitles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subtitles_episode_id_foreign` (`episode_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- Indexes for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_activities_user_id_foreign` (`user_id`),
  ADD KEY `user_activities_anime_id_foreign` (`anime_id`);

--
-- Indexes for table `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_favorites_user_id_anime_id_unique` (`user_id`,`anime_id`),
  ADD KEY `user_favorites_anime_id_foreign` (`anime_id`);

--
-- Indexes for table `user_watch_later`
--
ALTER TABLE `user_watch_later`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_watch_later_user_id_anime_id_unique` (`user_id`,`anime_id`),
  ADD KEY `user_watch_later_anime_id_foreign` (`anime_id`);

--
-- Indexes for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `watchlist_user_id_foreign` (`user_id`),
  ADD KEY `watchlist_anime_id_foreign` (`anime_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animes`
--
ALTER TABLE `animes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `anime_uploaders`
--
ALTER TABLE `anime_uploaders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `episodes`
--
ALTER TABLE `episodes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `subtitles`
--
ALTER TABLE `subtitles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user_activities`
--
ALTER TABLE `user_activities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_favorites`
--
ALTER TABLE `user_favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_watch_later`
--
ALTER TABLE `user_watch_later`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `watchlist`
--
ALTER TABLE `watchlist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `animes`
--
ALTER TABLE `animes`
  ADD CONSTRAINT `animes_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `animes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `anime_uploaders`
--
ALTER TABLE `anime_uploaders`
  ADD CONSTRAINT `anime_uploaders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `episodes`
--
ALTER TABLE `episodes`
  ADD CONSTRAINT `episodes_anime_id_foreign` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_anime_id_foreign` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ratings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subtitles`
--
ALTER TABLE `subtitles`
  ADD CONSTRAINT `subtitles_episode_id_foreign` FOREIGN KEY (`episode_id`) REFERENCES `episodes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `user_activities`
--
ALTER TABLE `user_activities`
  ADD CONSTRAINT `user_activities_anime_id_foreign` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_activities_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_favorites`
--
ALTER TABLE `user_favorites`
  ADD CONSTRAINT `user_favorites_anime_id_foreign` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_watch_later`
--
ALTER TABLE `user_watch_later`
  ADD CONSTRAINT `user_watch_later_anime_id_foreign` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_watch_later_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD CONSTRAINT `watchlist_anime_id_foreign` FOREIGN KEY (`anime_id`) REFERENCES `animes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `watchlist_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
