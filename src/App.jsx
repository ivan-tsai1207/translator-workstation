import { useState } from "react";
import { t } from "./theme.js";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TextWork from "./pages/TextWork.jsx";
import DocWork from "./pages/DocWork.jsx";
import VideoWork from "./pages/VideoWork.jsx";
import ImageWork from "./pages/ImageWork.jsx";
import WebWork from "./pages/WebWork.jsx";
import Library from "./pages/Library.jsx";
import Settings from "./pages/Settings.jsx";
import Resources from "./pages/Resources.jsx";
import ChromeDemo from "./pages/ChromeDemo.jsx";

export default function App() {
  const [page, setPage] = useState("dashboard");

  const nav = [
    { sect: "Web 工作站", items: [
      { k: "login", i: "🔐", l: "登入頁" },
      { k: "dashboard", i: "🏠", l: "Dashboard" },
      { k: "text", i: "📝", l: "文字翻譯" },
      { k: "doc", i: "📄", l: "文件翻譯" },
      { k: "video", i: "🎬", l: "影片翻譯" },
      { k: "image", i: "🖼", l: "圖片翻譯" },
      { k: "web", i: "🌐", l: "網頁翻譯" },
      { k: "lib", i: "📚", l: "我的資料庫" },
      { k: "settings", i: "⚙", l: "設定中心" },
      { k: "resource", i: "📘", l: "資源中心" },
    ]},
    { sect: "Chrome 插件", items: [{ k: "chrome", i: "🧩", l: "插件互動 Demo" }]}
  ];

  const titleMap = {
    login: "登入 / 註冊", dashboard: "首頁 Dashboard", text: "文字翻譯", doc: "文件翻譯",
    video: "影片翻譯", image: "圖片翻譯", web: "網頁翻譯", lib: "我的資料庫",
    settings: "設定中心", resource: "資源中心", chrome: "Chrome 插件"
  };

  return (
    <div style={{ padding: "20px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ marginBottom: 20, paddingBottom: 14, borderBottom: `0.5px solid ${t.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: t.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>譯</div>
          <div style={{ fontSize: 18, fontWeight: 500 }}>翻譯工作站 · UI 完整預覽</div>
        </div>
        <div style={{ fontSize: 11.5, color: t.textSub, marginLeft: 38 }}>點擊左側導覽切換頁面 · 所有按鈕、開關、Tab 均可實際操作</div>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ width: 200, flexShrink: 0, background: t.card, borderRadius: 12, padding: "14px 10px", border: `0.5px solid ${t.border}`, height: "fit-content", position: "sticky", top: 20 }}>
          {nav.map(group => (
            <div key={group.sect} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 9.5, color: t.textSub, padding: "4px 6px", letterSpacing: 0.5, fontWeight: 500 }}>{group.sect.toUpperCase()}</div>
              {group.items.map(it => (
                <div key={it.k} onClick={() => setPage(it.k)} style={{ padding: "7px 8px", borderRadius: 6, cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 7, background: page === it.k ? t.stage : "transparent", color: t.text, fontWeight: page === it.k ? 500 : 400, marginBottom: 1 }}>
                  <span style={{ fontSize: 13 }}>{it.i}</span>{it.l}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: t.textSub, marginBottom: 8, letterSpacing: 0.5 }}>當前預覽 · {titleMap[page]}</div>
          {page === "login" ? <Login /> : (
            <div style={{ background: t.bg, borderRadius: 14, border: `0.5px solid ${t.border}`, overflow: "hidden" }}>
              <div style={{ background: t.card, padding: "10px 18px", borderBottom: `0.5px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, background: t.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600 }}>譯</div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: t.text }}>翻譯工作站</span>
                  </div>
                  {page !== "chrome" && (
                    <div style={{ display: "flex", gap: 0 }}>
                      {[
                        { k: "dashboard", l: "首頁" },
                        { k: "text", l: "翻譯", match: ["text", "doc", "video", "image", "web"] },
                        { k: "lib", l: "資料庫" },
                        { k: "settings", l: "設定" },
                        { k: "resource", l: "資源" }
                      ].map(t2 => {
                        const active = t2.k === page || (t2.match && t2.match.includes(page));
                        return <button key={t2.k} onClick={() => setPage(t2.k)} style={{ fontSize: 12, padding: "4px 12px", border: "none", background: "transparent", color: active ? t.primary : t.textSub, cursor: "pointer", fontWeight: active ? 500 : 400, fontFamily: "inherit", borderBottom: active ? `2px solid ${t.primary}` : "2px solid transparent" }}>{t2.l}</button>;
                      })}
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ display: "flex", background: t.stage, borderRadius: 100, padding: 2 }}>
                    {["繁中", "日本語", "EN"].map((l, i) => (
                      <button key={l} style={{ fontSize: 10, padding: "3px 9px", borderRadius: 100, border: "none", background: i === 0 ? t.text : "transparent", color: i === 0 ? "#fff" : t.textSub, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
                    ))}
                  </div>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: t.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500 }}>I</div>
                </div>
              </div>
              <div style={{ padding: 22, color: t.text }}>
                {page === "dashboard" && <Dashboard go={setPage} />}
                {page === "text" && <TextWork />}
                {page === "doc" && <DocWork />}
                {page === "video" && <VideoWork />}
                {page === "image" && <ImageWork />}
                {page === "web" && <WebWork />}
                {page === "lib" && <Library />}
                {page === "settings" && <Settings />}
                {page === "resource" && <Resources />}
                {page === "chrome" && <ChromeDemo />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
