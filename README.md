# Life Fun! Habit Tracker 🎉

A joyful habit tracking app with cartoon fun design and animated celebrations!

![Habit Tracker](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![PWA](https://img.shields.io/badge/PWA-Enabled-green)

## 功能特点

- ✅ **Create Fun Habits** - Add habits with daily goals and track progress
- ✅ **Celebration Effects** - Confetti and particle animations for achievements
- ✅ **Achievement Timeline** - View your habit success stories
- ✅ **Mobile-First Design** - Responsive design optimized for mobile devices
- ✅ **Animated UI** - Floating FAB, gradient backgrounds, and smooth transitions
- ✅ **Data Persistence** - Local storage keeps your habits safe
- ✅ **PWA Support** - Install as a native app on your phone
- ✅ **Comic Sans Fun** - Playful typography and bright colors

## 技术栈

- **React 19** - 用户界面框架
- **Vite** - 快速的构建工具
- **Custom CSS** - Hand-crafted animations and gradients
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

### 创建习惯

1. 点击右下角的 ✨ FAB 按钮
2. 输入习惯名称（如 "Drink Water 💧"）
3. 设置每日目标数量
4. 点击"Create Habit! 🎉"

### 追踪习惯

- **增减计数**：点击习惯卡片上的 ➕ 或 ➖ 按钮
- **庆祝效果**：每次增加时会出现 ✨ 粒子效果
- **查看进度**：卡片显示当前进度/目标（如 8/8）

### 查看成就

- **仪表板**：查看统计数据（快乐天数、成就数量等）
- **故事时间线**：点击底部导航的"Story 📖"查看成就故事
- **设置**：访问应用设置和重置选项

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
│   │   ├── Dashboard.jsx    # 主仪表板
│   │   ├── AddHabit.jsx     # 添加习惯表单
│   │   ├── Timeline.jsx     # 成就时间线
│   │   └── Settings.jsx     # 设置页面
│   ├── hooks/          # 自定义Hooks
│   │   └── useCounters.js   # 习惯数据管理
│   ├── utils/          # 工具函数
│   │   ├── storage.js       # 本地存储
│   │   └── uuid.js          # ID生成
│   ├── App.jsx         # 主应用组件
│   ├── main.jsx        # React入口
│   └── index.css       # 自定义样式
├── vite.config.js       # Vite配置
└── package.json
```

## 浏览器支持

- ✅ Chrome/Edge（推荐）
- ✅ Safari（iOS/macOS）
- ✅ Firefox
- ✅ 其他现代浏览器

## 注意事项

- 数据保存在本地存储中
- 不会在不同设备间同步
- 首次访问需要联网下载资源
- iOS Safari某些PWA功能受限

## License

MIT License

---

**开始你的习惯追踪之旅，让每一天都充满欢乐！** 🎉
