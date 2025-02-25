-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        8.0.25 - MySQL Community Server - GPL
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 blog 的数据库结构
CREATE DATABASE IF NOT EXISTS `blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blog`;

-- 导出  表 blog.admin 结构
CREATE TABLE IF NOT EXISTS `admin` (
  `id` bigint NOT NULL,
  `account` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  blog.admin 的数据：~0 rows (大约)
DELETE FROM `admin`;
INSERT INTO `admin` (`id`, `account`, `password`, `token`) VALUES
	(1, 'admin', '123456', '7c9157f2-9bdd-44f5-8bc8-545871123285');

-- 导出  表 blog.blog 结构
CREATE TABLE IF NOT EXISTS `blog` (
  `id` bigint NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text,
  `create_time` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  blog.blog 的数据：~15 rows (大约)
DELETE FROM `blog`;
INSERT INTO `blog` (`id`, `category_id`, `title`, `content`, `create_time`) VALUES
	(604952080793669, 604669766463557, 'hello', 'world', 1725530179100),
	(604952172466245, 604669766463557, 'hello2', 'world2  ', 1725530201481),
	(604952192114757, 604669766463557, '测试标题003', '测试内容003', 1725530206278),
	(604952284512325, 604658617081925, '测试标题004', '测试内容004', 1725530228836),
	(604952305303621, 604658617081925, '测试标题005', '测试内容005', 1725530233912),
	(609625074061381, 604683307216965, '123123', '<p>helloasdasdsa<img src="http://localhost:8080/upload/609625070628933.jpg" alt="" data-href="" style=""/></p>', 1726671046597),
	(609625873248325, 604683307216965, 'sadasd', '<p>hello123123123</p>', 1726671241711),
	(609625916825669, 604683307216965, '123123', '<p>helloasdasfaf</p>', 1726671252350),
	(609631527305285, 604683307216965, '23123', '<p>asdfasdsad</p>', 1726672622096),
	(609632318324805, 604683307216965, '123123123', '<p>sfsafasf</p>', 1726672815216),
	(609632644464709, 604683307216965, '123123123123123123', '<p>as</p>', 1726672894840),
	(609632914223173, 604669766463557, '啊实打实大苏打实打实', '<p>啊实打实大苏打</p>', 1726672960699),
	(609811667812421, 604658617081925, '为什么建议大家加快拥抱Kotlin，说点不一样的', 'hello', 1726716601712),
	(609812845297733, NULL, '23asdasdasd', '<p>Kotlin2017年起被Google正式宣布为Android的编程语言之一，随后在2019年进一步宣布Kotlin为Android的首选语言，普及速度逐渐加快，越来越多的公司和项目在引入Kotlin。</p><p>那Kotlin有哪些特点，为何建议大家要加快拥抱Kotlin的速度呢？</p><h4>方便性能优化</h4><p>这一点主要得益于Kotlin的协程，可以看看之前介绍协程的文章：<a href="https://link.juejin.cn?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU4ODY2ODg5Ng%3D%3D%26mid%3D2247484179%26idx%3D1%26sn%3Dd0eb0de6a6fafe734e5b628294a0bbb1%26chksm%3Dfdd8099ccaaf808a93ee028f1b3b6c8b2990d1456b6cb140f9809fb49d89022f48da53807a29%23rd" target="_blank">Android面试题之Kotlin协程一文搞定</a> 和 <a href="https://link.juejin.cn?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU4ODY2ODg5Ng%3D%3D%26mid%3D2247484179%26idx%3D1%26sn%3Dd0eb0de6a6fafe734e5b628294a0bbb1%26chksm%3Dfdd8099ccaaf808a93ee028f1b3b6c8b2990d1456b6cb140f9809fb49d89022f48da53807a29%26token%3D845902856%26lang%3Dzh_CN%23rd" target="_blank">Kotlin协程上下文和异常处理</a></p><p>协程帮我们很好的解决了一个问题，就是App开发过程中的线程管理。从JVM内存的角度来说，线程是一种宝贵的资源，每一个线程都占用内存，并且线程多了，线程之间的调度也会消耗CPU资源。<br><br>这里我们再来具体说说。</p><p>Kotlin 协程是一种协程 (Coroutine) 编程模型，是 Kotlin 标准库的一部分。协程可以看作是轻量级的线程，它们可以在线程中运行，但与传统线程不同，协程是非阻塞、低开销的，可以极大程度地提高并发任务的执行效率。</p><h4>Kotlin 协程解决的传统 Java 线程管理问题</h4><h5>1. 复杂的线程创建和管理</h5><p><strong>传统 Java：</strong></p><ul><li>使用 <code>Thread</code> 或 <code>ExecutorService</code> 来创建和管理线程，代码复杂，容易出错。</li><li>需要手动管理线程池，控制并发数量，防止资源耗尽。</li></ul><p><strong>Kotlin 协程：</strong></p><ul><li>使用 <code>launch</code>、<code>async</code> 等简洁的 API 就能轻松启动协程，不需要显式创建和管理线程。</li><li>通过 <code>CoroutineScope</code> 和 <code>CoroutineContext</code> 来管理协程的生命周期和上下文。</li></ul><p>示例：</p><pre><code class="language-hljs language">import kotlinx.coroutines.*\n\nfun main() = runBlocking { // this: CoroutineScope\n    launch { \n        delay(1000L)\n        println("Task from runBlocking")\n    }\n\n    launch {\n        delay(500L)\n        println("Task from scope") \n    }\n\n    println("Hello,")\n}\n</code></pre><h5>2. 线程的高内存消耗</h5><p><strong>传统 Java：</strong></p><ul><li>每个线程通常会占用较大的内存（Java 中默认线程栈大小为1MB），大量线程会导致较高的内存开销。</li></ul><p><strong>Kotlin 协程：</strong></p><ul><li>协程是轻量级的，可以在同一个线程中创建成千上万个协程，极大地减少了内存消耗。</li><li>协程的内存占用远小于传统线程。</li></ul><h5>3. 阻塞操作导致资源浪费</h5><p><strong>传统 Java：</strong></p><ul><li>线程执行阻塞操作（如 I/O 操作、网络请求等）时，整个线程会被挂起，资源利用率低。</li></ul><p><strong>Kotlin 协程：</strong></p><ul><li>协程支持挂起函数（suspend functions），在等待期间释放线程资源，不会阻塞线程。</li><li>使用 <code>suspend</code> 关键字进行非阻塞操作，使得程序的资源利用率更高。</li></ul><p>示例：</p><pre><code class="language-hljs language">suspend fun fetchData(): String {\n    delay(1000L)  // Simulate a network request\n    return "Data from network"\n}\n\nfun main() = runBlocking {\n    val result = fetchData()\n    println(result)\n}\n</code></pre><h4>4. 异常处理复杂度高</h4><p><strong>传统 Java：</strong></p><ul><li>异常处理需要在多个地方分散处理，异常传播机制复杂且容易遗漏捕获异常的地方。</li></ul><p><strong>Kotlin 协程：</strong></p><ul><li>协程通过结构化的并发（Structured Concurrency）机制，将协程的生命周期与作用域绑定，异常处理更加直观和集中。</li><li>使用 <code>try-catch</code> 块捕获协程中的异常，使用 <code>CoroutineExceptionHandler</code> 进行统一的异常处理。</li></ul><p>示例：</p><pre><code class="language-hljs language">fun main() = runBlocking {\n    val handler = CoroutineExceptionHandler { _, exception -&gt;\n        println("Caught $exception")\n    }\n\n    val job = GlobalScope.launch(handler) {\n        throw AssertionError()\n    }\n    job.join()\n}\n</code></pre><h5>总结</h5><p><strong>有了Kotlin的协程，就可以避免一个App内同时存在多个线程管理类、多个线程池的问题，减少OOM。</strong><br><br>同时，Kotlin 的协程通过其<strong>轻量级、高效并发、简洁的 API 设计、低内存开销和强大的异常处理能力</strong>，解决了传统 Java 中<strong>线程创建和管理的复杂度、高资源消耗、阻塞操作导致的资源浪费、以及异常处理复杂度高</strong>的问题，使异步编程变得更加可维护、高效和可靠。</p><h4>方便学习其他语言</h4><p>当我们学习一种新东西，发现有一些特点跟之前自己已经掌握的东西比较像，就会学起来比较快，我们学习开发语言也是如此。而Kotlin，个人认为和iOS的最新开发语言swift就有着很多相似之处。</p><h5>1. 语法简洁和现代化</h5><p>两种语言的语法都非常简洁，目的是减少样板代码（boilerplate），提高代码的可读性。</p><p>Kotlin 示例：</p><pre><code class="language-hljs language">fun main() {\n    val greeting = "Hello, World!"\n    println(greeting)\n}\n</code></pre><p>Swift 示例：</p><pre><code class="language-hljs language">let greeting = "Hello, World!"\nprint(greeting)\n</code></pre><h5>2. 类型推断</h5><p>两种语言都支持类型推断，减少了显式类型声明的必要。</p><p>Kotlin：</p><pre><code class="language-hljs language">val age = 30 // Int\n</code></pre><p>Swift：</p><pre><code class="language-hljs language">let age = 30 // Int\n</code></pre><h5>3. 可空类型和可空性检查（Null Safety）</h5><p>两种语言都引入了可空类型来避免空指针异常，提高程序的健壮性。</p><p>Kotlin：</p><pre><code class="language-hljs language">var name: String? = "John"\nname = null\n</code></pre><p>Swift：</p><pre><code class="language-hljs language">var name: String? = "John"\nname = nil\n</code></pre><p>像不像？</p><h5>4. 数据类和结构体</h5><p>两种语言都提供了简化数据模型定义的方式。Kotlin 使用 data classes，而 Swift 使用 struct。</p><p>Kotlin 数据类：</p><pre><code class="language-hljs language">data class User(val name: String, val age: Int)\n</code></pre><p>Swift 结构体：</p><pre><code class="language-hljs language">struct User {\n    let name: String\n    let age: Int\n}\n</code></pre><h5>5. 函数式编程支持</h5><p>两种语言都支持高阶函数和 lambda 表达式，促进了函数式编程理念的采用。<br></p><p>作者：AntDream<br>链接：https://juejin.cn/post/7373482380738215946<br>来源：稀土掘金<br>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p><p><br></p>', 1726716889184);

-- 导出  表 blog.category 结构
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 正在导出表  blog.category 的数据：~3 rows (大约)
DELETE FROM `category`;
INSERT INTO `category` (`id`, `name`) VALUES
	(604658617081925, '测试修改'),
	(604669766463557, '测试'),
	(604683307216965, '删除测试数据');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
