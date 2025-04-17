-- 创建链接表
CREATE TABLE IF NOT EXISTS links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    link TEXT NOT NULL,
    avatar TEXT NOT NULL,
    descr TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建说说表
CREATE TABLE IF NOT EXISTS talkings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    tags TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建朋友圈表
CREATE TABLE IF NOT EXISTS friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    auther TEXT NOT NULL,
    date TEXT NOT NULL,
    link TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建配置表
CREATE TABLE IF NOT EXISTS configs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 初始化链接数据
INSERT INTO links (name, link, avatar, descr) VALUES 
('韩小韩博客', 'https://www.vvhan.com', 'https://q1.qlogo.cn/g?b=qq&nk=1655466387&s=640', '运气是计划之外的东西.'),
('韩小韩API', 'https://api.vvhan.com', 'https://api.vvhan.com/static/images/logo.webp', '免费Web API数据接口调用服务平台.');

-- 初始化说说数据
INSERT INTO talkings (date, tags, content) VALUES 
('2025-02-12 19:36:16', '["树","夕阳"]', '好美🌲<p class="vh-img-flex"><img src="https://i0.wp.com/shp.qpic.cn/collector/1655466387/937ec070-8448-4c7b-9c8b-abd41ce892cb/0"></p>'),
('2024-10-08 18:18:18', '["日常","工作"]', '下班！'),
('2024-10-05 16:16:06', '["日常"]', '记录第一条说说');

-- 初始化朋友圈数据
INSERT INTO friends (title, auther, date, link, content) VALUES 
('Astro 中使用 Lenis 增加鼠标滚动阻尼感', '韩小韩博客', '2025-03-06', 'https://www.vvhan.com/article/Lenis-in-Astro', '在移动端触控交互中，惯性滚动带来的丝滑体验已成为标配，但鼠标滚轮受限于机械结构，滚动时难免产生生硬的段落感。如何让传统滚轮操作也能获得如触控板般的阻尼反馈？Lenis库通过JavaScript模拟惯性算法，成功将"物理惯性"引入网页滚动，本文将解析其实现原理与实战应用。核心技术原理​滚轮事件拦截与目'),
('一组手机和电脑动态壁纸分享【分享】', '韩小韩博客', '2025-03-05', 'https://www.vvhan.com/article/pc-mobile-video-wallpaper', '本文精选一组电脑及手机动态壁纸，让你的设备秒变沉浸式视觉盛宴。壁纸下载壁纸下载壁纸下载'),
('Astro 添加 Twikoo 评论组件', '韩小韩博客', '2025-03-03', 'https://www.vvhan.com/article/astro-twikoo', 'Astro在使用视图过渡路由时，在跳转路由时，会导致JS文件只有在第一次进入页面时生效，所以Astro在使用视图过渡路由下Twikoo时无法正常使用的，我是单独写了一个评论组件，对Twikoo进行动态加载，然后在需要评论的页面引入的。创建Twikoo评论组件&lt;!--Comment.astr'),
('Astro主题-优雅的vhAstro-Theme【使用文档】', '韩小韩博客', '2025-03-02', 'https://www.vvhan.com/article/astro-theme-vhastro-theme', '🥝从Z-Blog到Emlog，从Typecho到Hexo，从动态博客到静态博客，作为一个前端，我深入了解了多种SSG工具，如Hexo、Vitepress、Hugo等，并最终锁定了Astro作为重构博客的选择。🍇Astro活跃的社区支持、广泛的现代框架兼容性、高效的性能优化、优秀的开发体验以及原生'),
('Fetch的GET、POST简单HTTP请求封装', '韩小韩博客', '2025-02-24', 'https://www.vvhan.com/article/fetch-get-post', '在现代Web开发中，FetchAPI已经可以完全替代Ajax，是处理HTTP请求的利器，且支持异步操作和Promise链式调用。本文将详细介绍如何使用FetchAPI封装GET和POST请求。通过封装，代码可复用性更高，逻辑更清晰，同时还能简化错误处理和请求配置，大大提升开发效率和代码质量。GET请');

-- 初始化配置
INSERT INTO configs (key, value) VALUES 
('title', '韩小韩博客'),
('site', 'https://www.vvhan.com'),
('subtitle', '不曾与你分享的时间,我在进步.'),
('description', '韩小韩博客 专注于前开发与相关技术的实战分享，涵盖Vue框架、Node.js、Serverless等，并涉及Node、Python、Linux、Docker等领域。同时，博客也分享作者的生活、音乐和旅行的热爱。'),
('author', '.𝙃𝙖𝙣'),
('avatar', 'https://q1.qlogo.cn/g?b=qq&nk=1655466387&s=640'),
('motto', '运气是计划之外的东西.'); 