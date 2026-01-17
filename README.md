# 人生计数器 📊

一个极简的PWA（渐进式Web应用），记录生活中每一个有意义的数字。

![Life Counter](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![PWA](https://img.shields.io/badge/PWA-Enabled-green)

## 功能特点

- ✅ **创建/编辑/删除计数器** - 自定义名称、图标和颜色
- ✅ **灵活的计数方式** - 快速增减（+1/-1）或自定义输入
- ✅ **历史记录时间线** - 按日期分组显示所有操作
- ✅ **数据导出** - 导出CSV文件备份和分享
- ✅ **完全离线** - 本地存储，首次联网后可离线使用
- ✅ **PWA支持** - 可添加到手机主屏幕，像原生应用一样使用
- ✅ **极简UI** - 干净现代的设计，专注于核心功能

## 技术栈

- **React 18** - 用户界面框架
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 实用优先的CSS框架
- **React Router** - 客户端路由
- **vite-plugin-pwa** - PWA支持
- **localStorage** - 本地数据存储

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

## 部署到GitHub Pages

详细的部署说明请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

### 快速部署

1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择分支 `master` 和文件夹 `/dist`
4. 访问 `https://YOUR_USERNAME.github.io/life-counter/`

或者使用GitHub Actions自动部署（已配置 `.github/workflows/deploy.yml`）

## 使用说明

### 创建计数器

1. 点击右上角的 `+` 按钮
2. 输入计数器名称
3. 选择图标和颜色
4. 设置初始值（可选）
5. 点击保存

### 计数操作

- **快速增减**：点击计数器卡片上的 `+` 或 `-` 按钮
- **自定义输入**：进入详情页，点击"自定义"按钮
- **查看详情**：点击计数器卡片查看历史记录

### 导出数据

- **所有计数器**：首页右上角导出按钮
- **单个历史**：详情页的"导出CSV"按钮

### 添加到主屏幕（PWA）

#### iOS
1. 在Safari中访问应用
2. 点击底部的"分享"按钮
3. 选择"添加到主屏幕"
4. 点击"添加"

#### Android/Chrome
1. 在Chrome中访问应用
2. 点击浏览器菜单
3. 选择"添加到主屏幕"或"安装应用"

## 项目结构

```
life-counter/
├── public/              # 静态资源
│   └── icons/          # 应用图标
├── src/
│   ├── components/      # React组件
│   │   ├── CounterCard.jsx
│   │   ├── CounterDetail.jsx
│   │   ├── CounterForm.jsx
│   │   ├── Header.jsx
│   │   └── IconPicker.jsx
│   ├── hooks/          # 自定义Hooks
│   │   ├── useCounters.js
│   │   └── useHistory.js
│   ├── pages/          # 页面组件
│   │   └── Home.jsx
│   ├── utils/          # 工具函数
│   │   ├── csvExport.js
│   │   ├── dateFormat.js
│   │   ├── storage.js
│   │   └── uuid.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/workflows/  # GitHub Actions
│   └── deploy.yml
├── vite.config.js       # Vite配置
├── tailwind.config.js   # Tailwind配置
└── package.json
```

## 浏览器支持

- ✅ Chrome/Edge（推荐）
- ✅ Safari（iOS/macOS）
- ✅ Firefox
- ✅ 其他现代浏览器

## 注意事项

- 本地存储容量约5-10MB
- 数据不会在不同设备间同步
- 首次访问需要联网下载资源
- iOS Safari某些PWA功能受限

## License

MIT License

---

**开始记录你的人生数字吧！** 🎯
