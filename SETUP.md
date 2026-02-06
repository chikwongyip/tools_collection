# 工具导航网站 - 快速设置指南

## 前置要求

在开始之前，请确保您的系统已安装：

1. **Node.js** (v18 或更高版本)

   ```bash
   node --version
   ```

2. **MySQL** (v8 或更高版本)
   ```bash
   mysql --version
   ```

## 详细设置步骤

### 步骤 1: 创建 MySQL 数据库

1. 登录 MySQL:

   ```bash
   mysql -u root -p
   ```

2. 创建数据库:

   ```sql
   CREATE DATABASE tool_navigation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. 创建数据库用户（可选，推荐）:
   ```sql
   CREATE USER 'toolnav_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON tool_navigation.* TO 'toolnav_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

### 步骤 2: 配置环境变量

1. 在项目根目录找到 `.env.local` 文件

2. 修改数据库连接字符串:

   ```env
   # 如果使用 root 用户
   DATABASE_URL="mysql://root:你的密码@localhost:3306/tool_navigation"

   # 如果创建了专用用户
   DATABASE_URL="mysql://toolnav_user:your_password@localhost:3306/tool_navigation"
   ```

3. 生成安全的 NEXTAUTH_SECRET:

   ```bash
   openssl rand -base64 32
   ```

   将生成的字符串替换 `.env.local` 中的 `NEXTAUTH_SECRET` 值

### 步骤 3: 安装依赖

```bash
npm install
```

### 步骤 4: 初始化数据库

1. 推送数据库结构:

   ```bash
   npm run db:push
   ```

2. 初始化示例数据:

   ```bash
   npm run db:seed
   ```

   这将创建：

   - 管理员账号 (admin / admin123)
   - 4 个示例分类
   - 5 个示例工具

### 步骤 5: 启动开发服务器

```bash
npm run dev
```

服务器将在 [http://localhost:3000](http://localhost:3000) 启动

### 步骤 6: 测试功能

1. **访问前台**:

   - 打开 http://localhost:3000
   - 测试搜索功能
   - 测试分类筛选
   - 点击工具卡片

2. **登录后台**:

   - 访问 http://localhost:3000/admin/login
   - 用户名: `admin`
   - 密码: `admin123`

3. **测试后台功能**:
   - 查看仪表板统计
   - 添加新分类
   - 添加新工具
   - 编辑和删除功能

## 常见问题解决

### 问题 1: 数据库连接失败

**错误信息**: `Can't connect to MySQL server`

**解决方案**:

1. 确认 MySQL 服务正在运行:

   ```bash
   # macOS
   brew services list

   # 启动 MySQL
   brew services start mysql
   ```

2. 检查连接字符串格式是否正确
3. 确认用户名和密码正确

### 问题 2: Prisma 推送失败

**错误信息**: `P1001: Can't reach database server`

**解决方案**:

1. 检查数据库是否存在
2. 检查 `.env.local` 文件路径和内容
3. 尝试手动连接数据库测试

### 问题 3: 端口已被占用

**错误信息**: `Port 3000 is already in use`

**解决方案**:

```bash
# 方法 1: 使用其他端口
PORT=3001 npm run dev

# 方法 2: 停止占用端口的进程
lsof -ti:3000 | xargs kill
```

### 问题 4: 样式不显示

**解决方案**:

```bash
# 清除缓存
rm -rf .next
npm run dev
```

## 生产环境部署

### 使用 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量（DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL）
4. 部署

### 数据库选择

推荐的 MySQL 云服务：

1. **PlanetScale** (推荐)

   - 免费套餐可用
   - 自动扩展
   - 无需运行迁移

2. **Railway**

   - 简单易用
   - 按使用付费

3. **AWS RDS**

   - 企业级
   - 高可用性

4. **阿里云 RDS**
   - 国内访问快
   - 中文支持

## 下一步

- 修改默认管理员密码
- 添加您自己的工具和分类
- 自定义样式和品牌
- 配置域名
- 设置 SSL 证书

## 需要帮助？

如果遇到问题，请检查：

1. Node.js 和 MySQL 版本是否符合要求
2. 环境变量配置是否正确
3. 数据库连接是否正常
4. 查看终端错误信息

祝您使用愉快！ 🎉
