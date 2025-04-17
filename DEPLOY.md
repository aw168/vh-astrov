# vhAstro-Theme 博客部署指南

本项目是基于 Astro 的博客主题，已增强支持 Cloudflare D1 数据库和后台管理功能。以下是部署步骤：

## 前提条件

1. 一个 Cloudflare 账号
2. 安装了 Node.js 和 npm/yarn/pnpm
3. 全局安装 Wrangler CLI: `npm install -g wrangler`

## 部署步骤

### 1. 登录到 Cloudflare

```bash
wrangler login
```

### 2. 创建 D1 数据库

```bash
# 创建数据库
wrangler d1 create vh_astro_db

# 输出将显示类似以下内容：
# ✅ Successfully created DB 'vh_astro_db' in your account!
# Created D1 database 'vh_astro_db' with id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 3. 更新配置文件

将上面生成的数据库 ID 添加到 `wrangler.jsonc` 文件中：

```jsonc
{
  "name": "vh-astro",
  "compatibility_date": "2025-03-31",
  "assets": {
    "directory": "./dist"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "vh_astro_db",
      "database_id": "填入你的数据库ID",
      "migrations_dir": "./migrations"
    }
  ]
}
```

### 4. 安装项目依赖

```bash
npm install
# 或
yarn
# 或
pnpm install
```

### 5. 应用数据库迁移（创建表和初始数据）

```bash
wrangler d1 migrations apply vh_astro_db
```

### 6. 在本地开发和测试项目

```bash
# 本地开发
npm run dev

# 预览时绑定 D1 数据库
npx wrangler pages dev ./dist --binding DB=vh_astro_db --remote
```

### 7. 构建项目

```bash
npm run build
```

### 8. 部署到 Cloudflare Pages

```bash
# 直接部署
wrangler pages deploy dist

# 或者通过 Cloudflare Dashboard 的 Git 集成部署
# 1. 在 Cloudflare Pages 中创建新项目
# 2. 连接你的 Git 仓库
# 3. 设置构建命令: npm run build
# 4. 设置输出目录: dist
# 5. 添加环境变量绑定: 在 Pages 项目设置中，添加 D1 数据库绑定
```

### 9. 访问后台管理

部署完成后，访问 `你的域名/admin` 可以进入后台管理页面。

默认登录凭据：
- 用户名: `admin`
- 密码: `password`

> **重要安全提示**：首次登录后，请立即修改默认密码，或者修改 `src/pages/admin/index.astro` 中的验证逻辑，改为更安全的认证方式。

## 其他说明

1. 数据库迁移文件位于 `migrations` 目录，包含初始化表结构和初始数据。
2. 后台管理功能路径：
   - 网站配置: `/admin/config`
   - 友情链接: `/admin/links`
   - 说说管理: `/admin/talking`
   - 朋友圈: `/admin/friends`
3. 本项目修改了以下主要文件：
   - 配置文件: `src/page_data/*.ts` - 从数据库读取
   - 数据操作: `src/utils/db.ts` - 数据库交互函数
   - 后台页面: `src/pages/admin/*.astro` - 后台管理界面
   - 布局组件: `src/layouts/Layout/Layout.astro` - 传递环境变量
   - 侧边栏: `src/components/Aside/Aside.astro` - 数据库读取配置

## 常见问题

1. **数据库连接失败**
   - 检查 `wrangler.jsonc` 中的数据库 ID 是否正确
   - 确保已正确应用迁移：`wrangler d1 migrations apply vh_astro_db`

2. **后台登录失败**
   - 默认用户名是 `admin`，密码是 `password`
   - 检查浏览器 Cookie 是否正常工作

3. **页面加载了但数据没有更新**
   - 可能是缓存问题，尝试清除浏览器缓存或使用隐私模式打开
   - 检查网络请求是否有错误

4. **样式或布局问题**
   - 检查是否有CSS冲突
   - 查看浏览器控制台中的错误

5. **部署问题**
   - 确保 Cloudflare Pages 上的环境变量绑定已正确设置
   - 检查 Wrangler 版本是否最新 