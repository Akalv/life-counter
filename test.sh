#!/bin/bash

# 生命记录器 - 自动化测试脚本
# 用于执行核心功能测试

echo "🚀 开始生命记录器自动化测试"

# 测试1: 构建测试
echo "📦 测试1: 应用构建"
npm run build
if [ $? -eq 0 ]; then
    echo "✅ 构建成功"
else
    echo "❌ 构建失败"
    exit 1
fi

# 测试2: 启动开发服务器
echo "🌐 测试2: 开发服务器启动"
npm run dev > /dev/null 2>&1 &
SERVER_PID=$!
sleep 5

# 检查服务器是否运行
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ 服务器启动成功"
else
    echo "❌ 服务器启动失败"
    kill $SERVER_PID
    exit 1
fi

# 测试3: 基础功能检查 (使用简单的curl检查)
echo "🔍 测试3: 基础响应检查"
if curl -s http://localhost:5173/life-counter/ | grep -q "Life Recorder"; then
    echo "✅ 页面内容正确"
else
    echo "❌ 页面内容异常"
fi

# 清理
kill $SERVER_PID
echo "🧹 清理完成"

echo "🎉 自动化测试完成"
echo "📋 详细手动测试请参考 TEST_CASES.md"