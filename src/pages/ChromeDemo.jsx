import { useState, useEffect } from "react";
import { t } from "../theme.js";
import { isMac, MOD_KEY } from "../platform.js";
import Toggle from "../components/Toggle.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function ChromeDemo() {
  const [pageMode, setPageMode] = useState("original");
  const [hoverEnabled, setHoverEnabled] = useState(true);
  const [selectionEnabled, setSelectionEnabled] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [hoverParaId, setHoverParaId] = useState(null);
  const [modPressed, setModPressed] = useState(false);
  const [hoveredAndTranslated, setHoveredAndTranslated] = useState(new Set());
  const [selectedText, setSelectedText] = useState("");
  const [bubblePos, setBubblePos] = useState({ x: 0, y: 0 });
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const down = (e) => { if (isMac ? e.metaKey : e.ctrlKey) setModPressed(true); };
    const up = (e) => { if (isMac ? !e.metaKey : !e.ctrlKey) setModPressed(false); };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useEffect(() => {
    if (hoverEnabled && modPressed && hoverParaId !== null) {
      setHoveredAndTranslated(prev => new Set(prev).add(hoverParaId));
    }
  }, [modPressed, hoverParaId, hoverEnabled]);

  const article = [
    { id: 1, num: "1.", en: "Navigate to Claude (claude.ai) in a web browser.", zh: "在網頁瀏覽器中打開 Claude (claude.ai)。" },
    { id: 2, num: "2.", en: "Enter your email address and click \"Continue with email\".", zh: "請輸入您的電子郵件地址，然後點擊「繼續使用電子郵件」。" },
    { id: 3, num: "3.", en: "Follow the Google prompts to access your new Claude account.", zh: "按照 Google 的提示操作來進入你的新 Claude 帳戶。" },
    { id: 4, num: "4.", en: "Click on your initials in the lower left corner and select \"Settings\".", zh: "在左下角點擊您的姓名首字母，然後從選單中選擇「設定」。" },
  ];

  const handleMouseUp = (e) => {
    if (!selectionEnabled) return;
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text.length > 0 && text.length < 200) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const containerRect = e.currentTarget.getBoundingClientRect();
      setSelectedText(text);
      setBubblePos({ x: rect.left - containerRect.left + rect.width / 2, y: rect.bottom - containerRect.top + 8 });
      setShowBubble(true);
    }
  };

  return (
    <div>
      <SectionTitle sub="模擬真實 Chrome 環境，試試三種沉浸式互動">🧩 Chrome 插件 · 互動 Demo</SectionTitle>

      <div style={{ background: t.stage, borderRadius: 14, overflow: "hidden", border: `0.5px solid ${t.borderStrong}` }}>
        <div style={{ background: "#CFE0E8", padding: "8px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: `0.5px solid ${t.borderStrong}` }}>
          <div style={{ display: "flex", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF6058" }}></div>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }}></div>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }}></div>
          </div>
          <div style={{ flex: 1, background: t.card, borderRadius: 6, padding: "4px 12px", fontSize: 11, color: t.textSub }}>🔒 docs.claude.com/getting-started</div>
          <button onClick={() => setShowPopup(!showPopup)} style={{ width: 28, height: 28, borderRadius: 6, background: showPopup ? t.primary : t.card, border: `0.5px solid ${showPopup ? t.primary : t.borderStrong}`, color: showPopup ? "#fff" : t.text, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>譯</button>
        </div>

        <div style={{ background: t.card, padding: "20px 26px", position: "relative", minHeight: 360 }} onMouseUp={handleMouseUp}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingBottom: 10, borderBottom: `0.5px solid ${t.border}` }}>
            <div style={{ fontSize: 11, color: t.textSub }}>
              {pageMode === "original" && "🌐 原文模式"}
              {pageMode === "bilingual" && "✨ 雙語對照模式"}
              {pageMode === "translated" && "📝 純譯文模式"}
            </div>
            {modPressed && hoverEnabled && (
              <div style={{ fontSize: 10.5, color: t.primaryDark, background: t.primaryLight, padding: "3px 10px", borderRadius: 100, border: `0.5px solid ${t.primary}` }}>
                {MOD_KEY} 已按住 · 滑鼠移到段落上即翻譯
              </div>
            )}
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 16px", color: t.text }}>
            Instructions for new users
            {(pageMode !== "original") && <div style={{ fontSize: 14, fontWeight: 500, color: t.primaryDark, marginTop: 4 }}>新使用者指南</div>}
          </h2>

          {article.map(item => {
            const isHovered = hoverParaId === item.id;
            const isHoverTranslated = hoveredAndTranslated.has(item.id) && hoverEnabled;
            const showZh = pageMode === "bilingual" || pageMode === "translated" || isHoverTranslated;
            const showEn = pageMode !== "translated";
            const isHoverHint = isHovered && hoverEnabled && modPressed && !isHoverTranslated;
            return (
              <div key={item.id} onMouseEnter={() => setHoverParaId(item.id)} onMouseLeave={() => setHoverParaId(null)} style={{ display: "flex", gap: 10, marginBottom: 12, padding: "6px 10px", marginLeft: -10, marginRight: -10, borderRadius: 8, background: isHoverHint ? t.primaryLight : "transparent", transition: "background 0.15s" }}>
                <span style={{ fontSize: 13, color: t.textSub, flexShrink: 0, paddingTop: 1 }}>{item.num}</span>
                <div style={{ flex: 1 }}>
                  {showEn && <div style={{ fontSize: 13, lineHeight: 1.65, color: t.text }}>{item.en}</div>}
                  {showZh && <div style={{ fontSize: 13, lineHeight: 1.7, color: pageMode === "translated" ? t.text : t.primaryDark, marginTop: showEn ? 4 : 0, paddingLeft: showEn && pageMode === "bilingual" ? 10 : 0, borderLeft: showEn && pageMode === "bilingual" ? `2px solid ${t.primary}` : "none" }}>{item.zh}</div>}
                </div>
              </div>
            );
          })}

          {showBubble && (
            <div style={{ position: "absolute", left: bubblePos.x, top: bubblePos.y, transform: "translateX(-50%)", background: t.card, border: `0.5px solid ${t.borderStrong}`, borderRadius: 12, padding: 12, minWidth: 240, maxWidth: 320, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", zIndex: 100 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: t.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600 }}>譯</div>
                  <span style={{ fontSize: 10, color: t.textSub }}>Claude · EN→繁中</span>
                </div>
                <button onClick={() => { setShowBubble(false); window.getSelection()?.removeAllRanges(); }} style={{ background: "none", border: "none", color: t.textSub, cursor: "pointer", fontSize: 14 }}>×</button>
              </div>
              <div style={{ fontSize: 11, color: t.textSub, marginBottom: 4, fontStyle: "italic" }}>{selectedText}</div>
              <div style={{ fontSize: 13, color: t.text, lineHeight: 1.6, marginBottom: 10, paddingLeft: 8, borderLeft: `2px solid ${t.primary}` }}>(譯文示意) 對應翻譯</div>
            </div>
          )}

          {showPopup && (
            <div style={{ position: "absolute", top: 4, right: 8, width: 280, background: t.bg, borderRadius: 12, border: `0.5px solid ${t.borderStrong}`, boxShadow: "0 6px 24px rgba(0,0,0,0.1)", overflow: "hidden", zIndex: 200 }}>
              <div style={{ background: t.card, padding: "10px 12px", borderBottom: `0.5px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, background: t.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600 }}>譯</div>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>翻譯工作站</span>
                </div>
                <button onClick={() => setShowPopup(false)} style={{ background: "none", border: "none", color: t.textSub, cursor: "pointer", fontSize: 14 }}>×</button>
              </div>
              <div style={{ padding: 12, borderBottom: `0.5px solid ${t.border}` }}>
                <div style={{ fontSize: 9.5, color: t.textSub, marginBottom: 6 }}>頁面模式</div>
                <div style={{ display: "flex", gap: 4, background: t.card, padding: 3, borderRadius: 8, border: `0.5px solid ${t.border}` }}>
                  {[{ v: "original", l: "原文" }, { v: "bilingual", l: "雙語" }, { v: "translated", l: "純譯文" }].map(m => (
                    <button key={m.v} onClick={() => setPageMode(m.v)} style={{ flex: 1, padding: "6px", fontSize: 11, borderRadius: 6, border: "none", background: pageMode === m.v ? t.primary : "transparent", color: pageMode === m.v ? "#fff" : t.textSub, cursor: "pointer" }}>{m.l}</button>
                  ))}
                </div>
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 9.5, color: t.textSub, marginBottom: 6 }}>頁面增強</div>
                <div style={{ background: t.card, borderRadius: 8, border: `0.5px solid ${t.border}` }}>
                  <div style={{ padding: "8px 10px", borderBottom: `0.5px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 11 }}>滑鼠懸停翻譯</div>
                      <div style={{ fontSize: 9, color: t.textSub }}>{MOD_KEY} + 懸停段落</div>
                    </div>
                    <Toggle on={hoverEnabled} onClick={() => setHoverEnabled(!hoverEnabled)} />
                  </div>
                  <div style={{ padding: "8px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 11 }}>劃詞翻譯</div>
                      <div style={{ fontSize: 9, color: t.textSub }}>選取文字即顯示</div>
                    </div>
                    <Toggle on={selectionEnabled} onClick={() => setSelectionEnabled(!selectionEnabled)} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: 14, background: t.primaryLight, border: `0.5px solid ${t.primary}`, borderRadius: 10, padding: "12px 14px", fontSize: 11.5, color: t.text, lineHeight: 1.7 }}>
        <div style={{ fontWeight: 500, marginBottom: 4, color: t.primaryDark }}>🖱 三種沉浸式交互（系統偵測為 {isMac ? "macOS" : "Windows / Linux"}）：</div>
        <div>① 點右上「譯」 → 切換頁面模式</div>
        <div>② 按住 <kbd>{MOD_KEY}</kbd>，滑鼠移到段落 → 該段插入譯文</div>
        <div>③ 用滑鼠選取任何文字 → 浮現翻譯泡泡</div>
      </div>
    </div>
  );
}
