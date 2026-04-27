# 翻譯工作站 (Translator Workstation)

跨 Web + Chrome 插件的 AI 翻譯工作站，日系夏天清爽風格 UI。

## 技術棧

- **Frontend**: React 18 + Vite
- **Styling**: 內聯 CSS Variables (Theme Token)
- **Deploy**: Vercel

## 開發

```bash
npm install
npm run dev
```

## 建置

```bash
npm run build
```

## 設計規格

- **配色**: C · 海水藍主調 (`#5BA8CC` 主色 + 杏色點綴)
- **字體**: 系統字 + PingFang TC / Noto Sans TC
- **圓角**: 卡片 12px / 按鈕膠囊 100px
- **介面語言**: 繁中 / 日本語 / English 三語切換

## 功能模組

### Web 工作站
- Dashboard 用量統計
- 5 大翻譯工具（文字 / 文件 / 影片 / 圖片 / 網頁）
- 我的資料庫（歷史 / 收藏 / 文件 / 術語庫 / 自訂 Prompt）
- 設定中心 8 分頁
- 資源中心

### Chrome 插件
- 整頁雙語對照翻譯
- 滑鼠懸停 + Ctrl/⌘ 段落翻譯
- 劃詞翻譯泡泡
- Popup 即時設定

## 開發路線圖

- [ ] P0 文字翻譯接 Claude API
- [ ] P0 使用者登入系統 (Supabase Auth)
- [ ] P1 Chrome 插件三大交互
- [ ] P2 文件翻譯 + OCR
- [ ] P2 翻譯歷史記錄資料庫
- [ ] P3 影片字幕 + 圖片 OCR
