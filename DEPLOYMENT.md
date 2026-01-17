# 人生计数器 PWA 部署说明

## 项目简介

这是一个基于React的PWA（渐进式Web应用）人生计数器，可以记录生活中任何事项的完成次数。

## 功能特点

- ✅ 创建/编辑/删除计数器
- ✅ 增加或减少计数（+1/-1或自定义数值）
- ✅ 历史记录时间线
- ✅ 导出CSV文件
- ✅ 本地存储（离线可用）
- ✅ PWA支持（可添加到主屏幕）
- ✅ 极简UI设计

## 技术栈

- React 18
- Vite
- Tailwind CSS
- React Router
- PWA (vite-plugin-pwa)
- localStorage

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 部署到GitHub Pages

### 方法1：使用GitHub CLI（推荐）

```bash
# 登录GitHub
gh auth login

# 创建GitHub仓库
gh repo create life-counter --public --source=. --push

# 启用GitHub Pages
gh api repos/:owner/:repo/pages -X POST -f source.branch=master -f source.path=/dist

# 部署完成！访问 https://yourname.github.io/life-counter/
```

### 方法2：手动部署

1. **创建GitHub仓库**
   - 访问 https://github.com/new
   - 仓库名：`life-counter`
   - 设置为公开
   - 不要初始化README
   - 点击"Create repository"

2. **推送代码到GitHub**

```bash
# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/life-counter.git

# 推送代码
git branch -M master
git push -u origin master
```

3. **配置GitHub Pages**

   - 访问仓库的Settings
   - 找到"Pages"（在左侧菜单）
   - 在"Source"中选择：
     - Branch: `master`
     - Folder: `/dist`
   - 点击"Save"
   - 等待几分钟，访问 https://YOUR_USERNAME.github.io/life-counter/

### 部署脚本（自动部署）

如果你想每次推送都自动部署，可以创建GitHub Actions：

1. 在仓库中创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. 推送到GitHub后，GitHub Actions会自动构建和部署

## 使用说明

### 首次使用

1. 访问应用网址
2. 点击右上角的"+"按钮创建计数器
3. 输入名称、选择图标和颜色
4. 点击"保存"

### 添加到主屏幕（iOS）

1. 在Safari中访问应用
2. 点击底部的"分享"按钮
3. 向下滑动，点击"添加到主屏幕"
4. 点击"添加"

### 添加到主屏幕（Android/Chrome）

1. 在Chrome中访问应用
2. 点击浏览器菜单（三点）
3. 点击"添加到主屏幕"或"安装应用"

### 导出数据

- **导出所有计数器**：在首页点击导出按钮
- **导出单个计数器历史**：在详情页点击"导出CSV"

## 离线使用

首次联网访问应用后，所有资源会被缓存。之后可以完全离线使用，所有数据保存在本地。

## 数据迁移

如果需要在其他设备使用，可以导出CSV文件手动迁移。

## 浏览器支持

- Chrome/Edge（推荐）
- Safari（iOS）
- Firefox
- 其他现代浏览器

## 注意事项

- 本地存储有容量限制（约5-10MB）
- 换设备数据不会自动同步
- 首次访问需要联网
- iOS Safari某些PWA功能受限

## License

MIT
