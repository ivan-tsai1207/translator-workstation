import { useState } from "react";
import { t } from "../theme.js";
import Card from "../components/Card.jsx";
import Btn from "../components/Button.jsx";
import Pill from "../components/Pill.jsx";
import Toggle from "../components/Toggle.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Library() {
  const [tab, setTab] = useState("history");
  const tabs = [
    { k: "history", l: "📚 翻譯歷史" },
    { k: "fav", l: "⭐ 收藏" },
    { k: "docs", l: "📑 我的文件" },
    { k: "term", l: "📖 術語庫" },
    { k: "prompt", l: "🎨 自訂 Prompt" }
  ];

  return (
    <div>
      <SectionTitle sub="管理你所有翻譯記錄、收藏、文件、術語庫與自訂 Prompt">📚 我的資料庫</SectionTitle>

      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {tabs.map(tt => <Pill key={tt.k} on={tab === tt.k} onClick={() => setTab(tt.k)}>{tt.l}</Pill>)}
      </div>

      {tab === "history" && (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input placeholder="🔍 搜尋翻譯內容..." style={{ flex: 1, padding: "8px 14px", fontSize: 12, borderRadius: 100, border: `0.5px solid ${t.borderStrong}`, background: t.card, fontFamily: "inherit", color: t.text }} />
            <select style={{ fontSize: 12, padding: "6px 12px", borderRadius: 100, border: `0.5px solid ${t.borderStrong}`, background: t.card, fontFamily: "inherit" }}><option>全部類型</option></select>
            <select style={{ fontSize: 12, padding: "6px 12px", borderRadius: 100, border: `0.5px solid ${t.borderStrong}`, background: t.card, fontFamily: "inherit" }}><option>全部引擎</option></select>
          </div>
          <Card p="4px 16px">
            {[
              { src: "Today's weather is great, perfect for a walk in the park.", trans: "今天天氣很好，適合到公園散步。", from: "EN", to: "繁中", e: "Claude", time: "5 分鐘前" },
              { src: "プロジェクトの進捗を共有させてください。", trans: "讓我分享專案進度。", from: "JA", to: "繁中", e: "Claude", time: "2 小時前" },
              { src: "We need to align on Q3 priorities.", trans: "我們需要對齊 Q3 優先事項。", from: "EN", to: "繁中", e: "GPT", time: "昨天" }
            ].map((h, i, a) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i === a.length - 1 ? "none" : `0.5px solid ${t.border}` }}>
                <div style={{ fontSize: 10.5, color: t.textSub, marginBottom: 4 }}>{h.from} → {h.to} · {h.e} · {h.time}</div>
                <div style={{ fontSize: 12.5, color: t.textSub, marginBottom: 3 }}>{h.src}</div>
                <div style={{ fontSize: 12.5, color: t.text }}>{h.trans}</div>
              </div>
            ))}
          </Card>
        </>
      )}

      {tab === "term" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <input placeholder="🔍 搜尋術語..." style={{ flex: 1, marginRight: 8, padding: "8px 14px", fontSize: 12, borderRadius: 100, border: `0.5px solid ${t.borderStrong}`, background: t.card, fontFamily: "inherit", color: t.text }} />
            <Btn primary>+ 新增術語</Btn>
          </div>
          <Card p="4px 16px">
            {[
              { src: "Anthropic", trans: "Anthropic", lang: "EN→繁中", note: "公司名，不翻譯" },
              { src: "プロンプト", trans: "提示詞", lang: "JA→繁中", note: "AI 領域用語" },
              { src: "alignment", trans: "對齊", lang: "EN→繁中", note: "AI 安全領域" }
            ].map((tm, i, a) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i === a.length - 1 ? "none" : `0.5px solid ${t.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                    <span style={{ fontSize: 13, color: t.text, fontWeight: 500 }}>{tm.src}</span>
                    <span style={{ fontSize: 12, color: t.textSub }}>→</span>
                    <span style={{ fontSize: 13, color: t.primaryDark }}>{tm.trans}</span>
                  </div>
                  <div style={{ fontSize: 10.5, color: t.textSub }}>{tm.lang} · {tm.note}</div>
                </div>
                <Btn size="sm">編輯</Btn>
              </div>
            ))}
          </Card>
        </>
      )}

      {tab === "prompt" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: t.textSub, alignSelf: "center" }}>使用 Prompt 模板讓 AI 翻譯更符合特定場景</div>
            <Btn primary>+ 新增 Prompt</Btn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { n: "商務正式體", d: "適用於合約、報告、提案等正式場合", on: true, c: t.primary },
              { n: "日系敬語", d: "翻成日文時自動使用敬語（です・ます調）", on: false, c: t.accent },
              { n: "技術文件", d: "保留專業術語，簡潔直接", on: false, c: t.success },
              { n: "口語對話", d: "輕鬆自然，適合 IM 與社群", on: false, c: t.warm }
            ].map((p, i) => (
              <Card key={i} style={{ position: "relative" }}>
                <div style={{ width: 4, height: 28, background: p.c, borderRadius: 2, position: "absolute", left: 0, top: 18 }}></div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: t.text }}>{p.n}</div>
                  <Toggle on={p.on} onClick={() => {}} />
                </div>
                <div style={{ fontSize: 11.5, color: t.textSub, lineHeight: 1.6 }}>{p.d}</div>
              </Card>
            ))}
          </div>
        </>
      )}

      {tab === "fav" && <Card><div style={{ textAlign: "center", padding: 30, color: t.textSub, fontSize: 12 }}>⭐ 你的收藏會顯示在這裡</div></Card>}
      {tab === "docs" && <Card><div style={{ textAlign: "center", padding: 30, color: t.textSub, fontSize: 12 }}>📑 已翻譯的文件會顯示在這裡</div></Card>}
    </div>
  );
}
