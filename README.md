# 亲戚称呼计算器 H5 版

这是 iOS SwiftUI App 的纯网页版实现，不依赖 WebView、Flutter、React Native 或构建工具。

## 运行

直接打开 `index.html` 即可运行。

也可以在 `H5` 目录启动任意静态服务器，例如：

```bash
python3 -m http.server 5173
```

然后访问 `http://localhost:5173`。

## 文件结构

- `index.html`：页面结构
- `styles.css`：iOS 风格视觉与响应式布局
- `app.js`：关系路径、称呼计算、示例、历史记录逻辑

历史记录使用浏览器 `localStorage` 保存最近 20 条。
