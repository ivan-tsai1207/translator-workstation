import { useState } from "react";
import { t } from "../theme.js";
import Card from "../components/Card.jsx";
import Btn from "../components/Button.jsx";
import Pill from "../components/Pill.jsx";
import SectionTitle from "../components/SectionTitle.jsx";

export default function TextWork() {
  const [engine, setEngine] = useState("Claude");
  const [bilingual, setBilingual] = useState(true);
  const [from, setFrom] = useState("繁中");
  const [to, setTo] = useState("日文");
  const [input, setInput] = useState("今天天氣很好，適合散步去附近的公園走走。");
  const result = "今日は天気が良くて、近くの公園を散歩するのにぴったりです。";

  return (
    <div>
      <SectionTitle sub="貼上文字即時翻譯，支援雙語對照與純譯文模式">📝 文字翻譯</SectionTitle>

      <Card style={{ marginBottom: 10 }} p="12px 16px">
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11.5, color: t.textSub }}>引擎</span>
          {["Claude", "ChatGPT", "Gemini"].map(e => <Pill key={e} on={engine === e} onClick={() => setEngine(e)}>{e}</Pill>)}
          <div style={{ flex: 1 }}></div>
          <span style={{ fontSize: 11.5, color: t.textSub }}>顯示</span>
          <Pill on={bilingual} onClick={() => setBilingual(true)}>雙語對照</Pill>
          <Pill on={!bilingual} onClick={() => setBilingual(false)}>純譯文</Pill>
        </div>
      </Card>

      <Card style={{ marginBottom: 12 }} p="12px 16px">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select value={from} onChange={e => setFrom(e.target.value)} style={{ fontSize: 12, padding: "5px 10px", borderRadius: 8, border: `0.5px solid ${t.borderStrong}`, background: t.bg, color: t.text, fontFamily: "inherit" }}>
            <option>自動偵測</option><option>繁中</option><option>日文</option><option>英文</option>
          </select>
          <button onClick={() => { const tmp = from; setFrom(to); setTo(tmp); }} style={{ fontSize: 14, color: t.primary, background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}>⇄</button>
          <select value={to} onChange={e => setTo(e.target.value)} style={{ fontSize: 12, padding: "5px 10px", borderRadius: 8, border: `0.5px solid ${t.borderStrong}`, background: t.bg, color: t.text, fontFamily: "inherit" }}>
            <option>日文</option><option>繁中</option><option>英文</option>
          </select>
        </div>
      </Card>

      {bilingual ? (
        <Card style={{ minHeight: 200 }}>
          <div style={{ paddingBottom: 14, marginBottom: 14, borderBottom: `0.5px solid ${t.border}` }}>
            <div style={{ fontSize: 10.5, color: t.textSub, marginBottom: 6 }}>原文 · {from}</div>
            <textarea value={input} onChange={e => setInput(e.target.value)} style={{ width: "100%", border: "none", background: "transparent", fontSize: 14, lineHeight: 1.7, color: t.text, resize: "none", minHeight: 50, fontFamily: "inherit", outline: "none" }} />
          </div>
          <div>
            <div style={{ fontSize: 10.5, color: t.primary, marginBottom: 6 }}>譯文 · {to}</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: t.text }}>{result}</div>
          </div>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <Card style={{ minHeight: 160 }}>
            <div style={{ fontSize: 10.5, color: t.textSub, marginBottom: 6 }}>原文</div>
            <textarea value={input} onChange={e => setInput(e.target.value)} style={{ width: "100%", border: "none", background: "transparent", fontSize: 14, lineHeight: 1.7, color: t.text, resize: "none", minHeight: 120, fontFamily: "inherit", outline: "none" }} />
          </Card>
          <div style={{ background: t.stage, borderRadius: 12, padding: "16px 18px", minHeight: 160 }}>
            <div style={{ fontSize: 10.5, color: t.primary, marginBottom: 6 }}>譯文</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: t.text }}>{result}</div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
        <div style={{ fontSize: 11, color: t.textSub }}>{input.length} 字 · {engine}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn size="sm">清除</Btn>
          <Btn size="sm">★ 收藏</Btn>
          <Btn size="sm">📋 複製</Btn>
          <Btn primary>翻譯 →</Btn>
        </div>
      </div>
    </div>
  );
}
