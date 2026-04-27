import { useState } from "react";
import { t } from "./theme.js";
import Sidebar from "./components/Sidebar.jsx";
import TopBar from "./components/TopBar.jsx";
import TextTranslator from "./pages/TextTranslator.jsx";
import DocTranslator from "./pages/DocTranslator.jsx";
import VideoTranslator from "./pages/VideoTranslator.jsx";
import ImageTranslator from "./pages/ImageTranslator.jsx";
import WebTranslator from "./pages/WebTranslator.jsx";
import Library from "./pages/Library.jsx";
import Settings from "./pages/Settings.jsx";

const PAGE_TITLES = {
  text: "文字翻譯",
  doc: "文件翻譯",
  video: "影片翻譯",
  image: "圖片翻譯",
  web: "網頁翻譯",
  lib: "資料庫",
  settings: "設定"
};

export default function App() {
  const [page, setPage] = useState("text");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <Sidebar page={page} setPage={setPage} />
      <div style={{ flex: 1, marginLeft: 64, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <TopBar page={page} />
        <main style={{ flex: 1, padding: "24px 28px", marginTop: 44, maxWidth: 1100, width: "100%", boxSizing: "border-box" }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: t.text, marginBottom: 20 }}>
            {PAGE_TITLES[page]}
          </div>
          {page === "text" && <TextTranslator />}
          {page === "doc" && <DocTranslator />}
          {page === "video" && <VideoTranslator />}
          {page === "image" && <ImageTranslator />}
          {page === "web" && <WebTranslator />}
          {page === "lib" && <Library />}
          {page === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
}
